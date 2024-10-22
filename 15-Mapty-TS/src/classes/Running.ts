import { getMonth, sentenceCase } from '../helper';
import { Workout } from './Workout';

class Running extends Workout {
  cadence: number;
  type = 'running';

  constructor(opts: {
    id?: number;
    distance: number;
    duration: number;
    coord: [number, number];
    cadence: number;
  }) {
    super({
      id: opts.id,
      distance: opts.distance,
      duration: opts.duration,
      coord: opts.coord,
    });
    this.cadence = opts.cadence;
  }

  get pace() {
    return this.duration / this.distance;
  }
}

export { Running };
