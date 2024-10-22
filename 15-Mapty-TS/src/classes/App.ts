import * as L from 'leaflet';
import { Workout } from './Workout';
import { Running } from './Running';
import { Cycling } from './Cycling';
import { invalidInputs } from '../helper';

const DEFAULT_COORD: L.LatLngTuple = [-6.18, 106.82];
const ZOOM = 14;
// prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const mapEl = document.querySelector('#map');
const form: HTMLElement = document.querySelector('.form')!;
const containerWorkouts = document.querySelector('.workouts')!;
const inputType: HTMLSelectElement =
  document.querySelector('.form__input--type')!;
const inputDistance: HTMLInputElement = document.querySelector(
  '.form__input--distance'
)!;
const inputDuration: HTMLInputElement = document.querySelector(
  '.form__input--duration'
)!;
const inputCadence: HTMLInputElement = document.querySelector(
  '.form__input--cadence'
)!;
const inputElevation: HTMLInputElement = document.querySelector(
  '.form__input--elevation'
)!;
const geoWarning: HTMLInputElement = document.querySelector('.geo-warning')!;
class App {
  #workouts: Workout[] = [];
  #map: L.Map;

  #tmpNewWorkout: { latLng: [number, number] } = {
    latLng: [0, 0],
  };

  constructor(opts: { mapElement: string | HTMLElement }) {
    this.#map = this.#createMap(opts.mapElement);

    this.#loadFromLocalStorage();

    this.#getGeoPosition();

    /// Input type change event
    inputType.addEventListener('change', (_) => this.#toggleElevationField());

    /// Form submit event
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#newWorkout();
    });

    /// workout element click event
    containerWorkouts.addEventListener(
      'click',
      this.#containerWorkoutsClick.bind(this)
    );
  }

  #createMap(mapElement: string | HTMLElement): L.Map {
    const map = L.map(mapElement).setView(DEFAULT_COORD, ZOOM);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    /// NOTE: map click event is set on get geolocation success.

    return map;
  }

  #setMapPosition(latlng: [number, number]) {
    this.#map.setView(latlng, ZOOM);
  }

  #getGeoPosition() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.#setMapPosition([latitude, longitude]);

        /// Map click event.
        /// So user cannot add workout if get geo position fails.
        this.#map.on('click', (e) => {
          this.#showForm([e.latlng.lat, e.latlng.lng]);
        });
      },
      function (_) {
        geoWarning.classList.remove('hidden');
        alert('Cannot access your current location!');
      }
    );
  }

  #hideForm() {
    /// Set display to none so it will dissapear immediately without animation.
    /// It will make the form looks like replaced by the new workout element.
    const tmpDisplay = form.style.display;
    form.style.display = 'none';

    /// Add hidden class, it will run the animation of hidden (css) for 1s.
    form.classList.add('hidden');
    /// Set the display back to the default value after 1s.
    setTimeout(() => (form.style.display = tmpDisplay), 1000);
  }

  #showForm(latlng: [number, number]) {
    /// Set latlng value on submit form
    this.#tmpNewWorkout.latLng = latlng;

    /// Show form
    form.classList.remove('hidden');

    /// Clear input values
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    /// Init elevation/cadence visibility
    const isRunning = inputType.value === 'running';
    const cadenceRow = inputCadence.closest('.form__row') as HTMLHtmlElement;
    const elevationRow = inputElevation.closest(
      '.form__row'
    ) as HTMLHtmlElement;

    if (isRunning) {
      cadenceRow.classList.remove('form__row--hidden');
      elevationRow.classList.add('form__row--hidden');
    } else {
      cadenceRow.classList.add('form__row--hidden');
      elevationRow.classList.remove('form__row--hidden');
    }

    inputDistance.focus();
  }

  #newWorkout() {
    const isRunning = inputType.value === 'running';
    let workout;

    /// Create workout object
    if (isRunning) {
      const distance = +inputDistance.value;
      const duration = +inputDuration.value;
      const cadence = +inputCadence.value;

      if (
        invalidInputs(
          { distance, duration, cadence },
          (value) =>
            value == null || !Number.isFinite(value) || Number(value) < 0,
          (key) => `${key} must be a positive number!`
        )
      ) {
        return;
      }

      workout = new Running({
        distance,
        duration,
        cadence,
        coord: this.#tmpNewWorkout.latLng,
      });
    } else {
      const distance = +inputDistance.value;
      const duration = +inputDuration.value;
      const elevationGain = +inputElevation.value;

      if (
        invalidInputs(
          { distance, duration, elevationGain },
          (value, key) =>
            key === 'elevationGain'
              ? value == null || !Number.isFinite(value)
              : value == null || !Number.isFinite(value) || Number(value) < 0,
          (key) =>
            key === 'elevationGain'
              ? `${key} must be a number!`
              : `${key} must be a positive number!`
        )
      ) {
        return;
      }

      workout = new Cycling({
        distance,
        duration,
        elevationGain,
        coord: this.#tmpNewWorkout.latLng,
      });
    }
    this.#workouts.push(workout);

    /// Store workouts
    this.#setLocalStorage('workouts', this.#workouts);
    console.log('this.workouts', this.#workouts);

    /// Create workout UI
    this.#renderWorkout(workout);

    /// Add map marker
    this.#renderWorkoutMarker(workout);

    /// Hide form
    this.#hideForm();
  }

  #toggleElevationField() {
    const cadenceRow = inputCadence.closest('.form__row') as HTMLHtmlElement;
    const elevationRow = inputElevation.closest(
      '.form__row'
    ) as HTMLHtmlElement;

    // console.log('cadenceContainer', cadenceRow);

    cadenceRow.classList.toggle('form__row--hidden');
    elevationRow.classList.toggle('form__row--hidden');

    inputDistance.focus();
  }

  #renderWorkoutMarker(workout: Workout) {
    const marker = L.marker(workout.coord);
    marker.addTo(this.#map);
    marker
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className:
            workout instanceof Running ? 'running-popup' : 'cycling-popup',
        }).setContent(
          `${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          } ${workout.getDescription()}`
        )
      )
      .openPopup();
  }

  #renderWorkout(workout: Workout) {
    function createDetails(
      icon: string,
      value: number,
      unit: string
    ): HTMLElement {
      const detailsEl = document.createElement('div');
      detailsEl.classList.add('workout__details');
      const iconEl = document.createElement('span');
      iconEl.classList.add('workout__icon');
      iconEl.textContent = icon;
      const valueEl = document.createElement('span');
      valueEl.classList.add('workout__value');
      // console.log('value % 1', value.toFixed(1), value.toString());
      if (value % 1 > 0) valueEl.textContent = value.toFixed(1);
      else valueEl.textContent = value.toString();
      const unitEl = document.createElement('span');
      unitEl.classList.add('workout__unit');
      unitEl.textContent = unit;

      detailsEl.append(iconEl, valueEl, unitEl);

      return detailsEl;
    }

    const li = document.createElement('li');
    li.classList.add('workout');
    li.dataset.id = workout.id.toString();
    const h2 = document.createElement('h2');
    h2.classList.add('workout__title');
    h2.textContent = workout.getDescription();
    li.append(h2);

    li.append(
      createDetails(
        workout.type === 'running' ? ' 🏃‍♂️' : '🚴‍♀️',
        workout.distance,
        'km'
      )
    );
    li.append(createDetails('⏱', workout.duration, 'min'));

    if (workout.type === 'running') {
      // console.log('instance of Running');
      li.classList.add('workout--running');
      const running = workout as Running;
      li.append(createDetails('⚡️', running.pace, 'min/km'));
      li.append(createDetails('🦶🏼', running.cadence, 'spm'));
    } else {
      // console.log('instance of Cycling');
      li.classList.add('workout--cycling');
      const cycling = workout as Cycling;
      li.append(createDetails('⚡️', cycling.speed, 'km/h'));
      li.append(createDetails('⛰', cycling.elevationGain, 'm'));
    }
    // li.addEventListener('click', () => {
    //   this.#map.setView(workout.coord, ZOOM);
    // });
    form.after(li);
  }

  #loadFromLocalStorage() {
    const workoutsJSON = this.#getLocalStorage('workouts');
    if (workoutsJSON) {
      // this.workouts = workouts as Workout[];
      console.log('load workouts json', workoutsJSON);

      (workoutsJSON as Array<Record<string, any>>).forEach((w) => {
        let workout: Workout;
        if (w.type === 'running') {
          workout = new Running(w as any);
          // console.log('running', running, running.getTitle());
        } else {
          workout = new Cycling(w as any);
          // console.log('cycling', cycling, cycling.getTitle());
        }
        this.#workouts.push(workout);

        this.#renderWorkout(workout);
        this.#renderWorkoutMarker(workout);
      });

      if (this.#workouts.length) {
        this.#map.setView(this.#workouts[this.#workouts.length - 1].coord);
      }

      console.log('this.workouts loaded', this.#workouts);
    }
  }

  #setLocalStorage(key: string, obj: Object) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  #getLocalStorage(key: string): any | null {
    const s = localStorage.getItem(key);
    if (s) {
      return JSON.parse(s);
    }
    return null;
  }

  #containerWorkoutsClick(e: Event) {
    const workoutEl = (e.target as Element).closest('.workout');

    if (!workoutEl) return;

    const dataId = Number((workoutEl as HTMLElement).dataset.id);
    const coord = this.#workouts.find((w) => w.id === dataId)?.coord;

    if (!coord) return;

    this.#map.setView(coord, ZOOM, {
      animate: true,
      duration: 1,
    });
  }
}

export default App;
