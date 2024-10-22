import { getMonth, sentenceCase } from '../helper';
import { Workout } from './Workout';

class Cycling extends Workout {
  elevationGain: number;
  override type = 'cycling';

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

  override getDescription(): string {
    return `🚴‍♀️ ${sentenceCase(this.type || '')} on ${getMonth(
      this.date.getMonth()
    )} ${this.date.getDate()}`;
  }
}

export { Cycling };
