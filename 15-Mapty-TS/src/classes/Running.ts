import { getMonth } from '../helper';
import { Workout } from './Workout';

class Running extends Workout {
  name: string;
  cadence: number;
  // pace: number;

  constructor(opts: {
    id?: number;
    distance: number;
    duration: number;
    coord: [number, number];
    name: string;
    cadence: number;
    // pace: number;
  }) {
    super({
      id: opts.id,
      distance: opts.distance,
      duration: opts.duration,
      coord: opts.coord,
    });
    this.name = opts.name;
    this.cadence = opts.cadence;

    // this.pace = opts.pace;
  }

  getTitle(): string {
    return `${this.name} on ${getMonth(
      this.date.getMonth()
    )} ${this.date.getDate()}`;
  }

  get pace() {
    return this.duration / this.distance;
  }
}

export { Running };
