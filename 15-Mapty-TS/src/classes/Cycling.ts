import { getMonth } from '../helper';
import { Workout } from './Workout';

class Cycling extends Workout {
  name: string;
  elevationGain: number;
  // speed: number;

  constructor(opts: {
    id?: number;
    distance: number;
    duration: number;
    coord: [number, number];
    name: string;
    elevationGain: number;
    // speed: number;
  }) {
    super({
      id: opts.id,
      distance: opts.distance,
      duration: opts.duration,
      coord: opts.coord,
    });
    this.name = opts.name;
    this.elevationGain = opts.elevationGain;
    // this.speed = opts.speed;
  }

  getTitle(): string {
    return `${this.name} on ${getMonth(
      this.date.getMonth()
    )} ${this.date.getDate()}`;
  }

  get speed() {
    return this.distance / this.duration;
  }
}

export { Cycling };
