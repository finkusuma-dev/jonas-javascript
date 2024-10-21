'use strict';

// import * as L from 'leaflet';/
import 'leaflet/dist/leaflet.css';
import App from './classes/App';

// // prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const mapEl = document.querySelector('#map');
// const form: HTMLElement = document.querySelector('.form')!;
// const containerWorkouts = document.querySelector('.workouts')!;
// const inputType: HTMLSelectElement =
//   document.querySelector('.form__input--type')!;
// const inputDistance: HTMLInputElement = document.querySelector(
//   '.form__input--distance'
// )!;
// const inputDuration: HTMLInputElement = document.querySelector(
//   '.form__input--duration'
// )!;
// const inputCadence: HTMLInputElement = document.querySelector(
//   '.form__input--cadence'
// )!;
// const inputElevation: HTMLInputElement = document.querySelector(
//   '.form__input--elevation'
// )!;

const app = new App({
  mapElement: 'map',
});

// let map = mapInit();
// let newWorkout: {
//   lat: number;
//   lng: number;
// }; /// = //{
// // lat: 1,
// // lng: 2,
// ///};
// let newWorkoutLat: number;
// let newWorkoutLng: number;
// let isRunning: boolean;

// navigator.geolocation.getCurrentPosition(
//   function (pos) {
//     console.log('pos', pos.coords);

//     const { latitude, longitude } = pos.coords;
//     map.setView([latitude, longitude], 14);

//     // L.marker([latitude, longitude])
//     //   .addTo(map)
//     //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     //   .openPopup();
//   },
//   function (_) {
//     alert('Cannot get your current position');
//   }
// );

// function mapInit() {
//   const defaultCoord: L.LatLngTuple = [-6.18, 106.82];
//   let map = L.map('map').setView(defaultCoord, 14);
//   L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   map.on('click', mapClick);

//   function mapClick(e: L.LeafletMouseEvent) {
//     // console.dir(e.latlng);
//     const { lat, lng } = e.latlng;
//     console.log('map click', lat, lng);
//     newWorkout = { lat, lng };
//     console.log('newWorkout', newWorkout);
//     newWorkoutLat = lat;
//     newWorkoutLng = lng;

//     form.classList.remove('hidden');
//     inputCadence.value = '';
//     inputDistance.value = '';
//     inputDuration.value = '';
//     inputElevation.value = '';

//     inputDistance.focus();
//   }

//   return map;
// }

// form.addEventListener('submit', function (e) {
// e.preventDefault();
// console.log('submit form', e);
// addMarker({
//   lat: newWorkoutLat,
//   lng: newWorkoutLng,
//   title: `${inputType.value} for ${inputDuration.value} minutes`,
// });
// form.classList.add('hidden');
// });

// inputType.addEventListener('change', function (e) {
// console.log('inputType change', (e.target! as HTMLSelectElement).value);
// isRunning = (e.target! as HTMLSelectElement).value === 'running';
// const cadenceRow = inputCadence.closest('.form__row') as HTMLHtmlElement;
// const elevationRow = inputElevation.closest('.form__row') as HTMLHtmlElement;
// console.log('cadenceContainer', cadenceRow);
// cadenceRow.classList.toggle('form__row--hidden');
// elevationRow.classList.toggle('form__row--hidden');
// });

// function addMarker({
//   lat,
//   lng,
//   title,
// }: {
//   lat: number;
//   lng: number;
//   title: string;
// }) {
//   const marker = L.marker([lat, lng]);
//   // marker.on('click', markerClick.bind(marker));
//   // marker.on('popupopen', markerPopupOpen.bind(marker));
//   marker.addTo(map);
//   marker
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       }).setContent(title)
//     )
//     .openPopup();
// }
