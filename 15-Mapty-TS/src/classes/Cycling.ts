import { getMonth } from '../helper';
import { Workout } from './Workout';

class Cycling extends Workout {
  elevationGain: number;
  type = 'cycling';

  constructor(opts: {
    id?: number;
    distance: number;
    duration: number;
    coord: [number, number];
    elevationGain: number;
  }) {
    super({
      id: opts.id,
      distance: opts.distance,
      duration: opts.duration,
      coord: opts.coord,
    });
    this.elevationGain = opts.elevationGain;
  }

  get speed() {
    return this.distance / this.duration;
  }
}

export { Cycling };
