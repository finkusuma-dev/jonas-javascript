class Workout {
  id: number;
  distance: number;
  duration: number;
  coord: [number, number];
  date: Date;

  static lastId: number;

  constructor(opts: {
    id?: number;
    distance: number;
    duration: number;
    coord: [number, number];
    date?: number | string | Date;
  }) {
    this.id = opts.id || Workout.lastId + 1 || 1;
    // console.log('this.id', this.id);
    if (this.id > Workout.lastId || !Workout.lastId) Workout.lastId = this.id;
    // console.log('Workout.lastId', Workout.lastId);

    this.distance = opts.distance;
    this.duration = opts.duration;
    this.coord = opts.coord;
    this.date = opts.date ? new Date(opts.date) : new Date();
  }
}

export { Workout };
