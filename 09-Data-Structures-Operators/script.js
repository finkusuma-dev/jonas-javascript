'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

// const { name, mainMenu, openingHours } = restaurant;
// // console.log(name, mainMenu, openingHours);

// /// assign properties to different names
// const {
//   name: name2,
//   mainMenu: mainMenu2,
//   openingHours: openingHours2,
// } = restaurant;
// console.log(name2, mainMenu2, openingHours2);

// /// assign default values. If it doesn't have default value,
// /// and property is not exist, it will be undefined
// const {
//   menu : menu3 = ['empty'],
//   mainMenu : mainMenu3 = ['empty']
// } = restaurant;
// console.log(menu3, mainMenu3);

// /// mutating variables
// let name3;
// ({name: name3} = restaurant);
// console.log('name3:', name3);

// /// nested destructuring object
// const {fri: {open, close}} = openingHours;
// console.log(open, close);

// /// destructuring object in function arguments
// const obj1 = {
//   prop: 'prop1',

//   function1({name1, address}) {
//     console.log({'name1:': name1, 'address:': address});
//   }
// }

// obj1.function1({'name1':'abc', 'address':'jl. xyz'});

// /// ask user's input and put into array
// console.log('# ask user\'s input and put into array');
// const arrNumbers = [prompt('enter 1st number'), prompt('enter 2st number'), prompt('enter 3st number') ];
// console.log('arrNumbers:', arrNumbers);
// /// = arrNumbers: (3) ['4', '5', '6']

/// spread operator ES6
/// three dot = taking all the elements out of the array put them on new variable
///   separated by comma.
console.log('\n# Spread operator');

const arr = [3, 4, 5];
const newArr = [1, 2, ...arr];
console.log('newArr', newArr);
console.log('newArr Elements:', ...newArr);

/// Spread operator works on all iterables: array, string, map, set (but NOT object).
const str = 'This is a string';
const varFromStrToArr = [...str];
console.log('varFromStrToArr:', varFromStrToArr);

/// Since ES2018 spread operator can also be used in object.
///
console.log('\n# Since ES2018 spread operator can also be used in object.');
// const personDetails = {'name': 'Doni', 'address': 'Solo'};
// const newPersonDetails = {...personDetails, 'phone' : '123456'};
// console.log('newPersonDetails:', newPersonDetails);
/// = newPersonDetails: {name: 'Doni', address: 'Solo', phone: '123456'}

/// Rest pattern = compact elements into single array.
///
console.log('\n# Rest Pattern');
// /// Three dots on the left side of destructuring array means the rest of elements will be put on that variable.
// const [a, b, ...others] = [1, 2, 3, 4];
// console.log('a:', a, 'b:', b,'others:', others);
// /// = a: 1 b: 2 others: (2) [3, 4]

/// Rest pattern won't include skipped elements.
///
const [a, , c, ...others] = [1, 2, 3, 4];
console.log('a:', a, 'c:', c, 'others:', others);
/// = a2: 1 c2: 3 others2: [4] // 2 is skipped and not put into others2 array.
/// so rest pattern should only be put in the end.

/// Rest pattern to destructuring object
///
const { name, ...otherPersonDetails } = {
  name: 'Doni',
  address: 'Solo',
  phone: '123456',
};
console.log('name:', name, 'otherPersonDetails:', otherPersonDetails);
/// = name: Doni otherPersonDetails: {address: 'Solo', phone: '123456'}

/// Rest parameters used in a function parameter make a function
///   can accept any number of parameters
///
console.log('\n# Rest parameters');
const addNumbers = function (...numbers) {
  console.log('numbers:', numbers);

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log('sum:', sum);
};
addNumbers(1, 2);
/// = numbers: (2) [1, 2]
/// = sum: 3
addNumbers(3, 4, 5);
/// = numbers: (3) [3, 4, 5]
/// = sum: 12

/// # Short Circuiting
console.log('\n# Short Circuiting');

/// Short circuit logical operator doesn't have to be used with boolean values.
/// Using short circuit "or" (||) means that if first value is true, the remaining values doesn't have to be computed.
console.log(3 || 'Some string');
/// = 3

/// If there is no true values, result is the last falsify value
let b = '' || undefined;
console.log(b);
/// = undefined
console.log('' || 'String');
/// = String
console.log(true || 0);
/// = true

///
console.log(undefined || null);
/// = null

/// using short-circuiting instead of ternary operation.
///
let breakfast = '';
let whatToEat = breakfast ? breakfast : 'nasi telur';
console.log('what to eat: ', whatToEat);
let whatToEat2 = breakfast || 'nasi telur';
console.log('what to eat2: ', whatToEat2);
/// both will result in the same output = what to eat:  nasi telur

///Logical assignment operators
// let user1 = {
// 	name: 'A',
//   car: 0
// }

// let user2 = {
// 	name: 'B',
//   age: 26,
// }

// /// or assignment operator
// user1.car = user1.car || 10;
// user1.car ||= 10;
// user2.car = user2.car || 10;
// user2.car ||= 10;
// user1; user2;

///nullish assignment operators
// let user1 = {
// 	name: 'A',
//   car: 0
// }

// let user2 = {
// 	name: 'B',
//   age: 26,
// }

// //nullish assignment operator
// user1.car = user1.car ?? 10;
// user1.car ??= 10;
// user2.car = user2.car ?? 10;
// user2.car ??= 10;
// user1; user2;

/// Logical AND assignment operator
let user1 = {
  name: 'A',
  car: 0,
};

let user2 = {
  name: 'B',
  parent: 'BBB',
};

user1.parent = user1.parent && '<ANONYMOUS>';
user1.parent &&= '<ANONYMOUS>';
user2.parent = user2.parent && '<ANONYMOUS>';
user2.parent &&= '<ANONYMOUS>';
user1;
user2;

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// Team 1: Bayern Munich

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

let [players1, players2] = game.players;
players1;
players2;

let [gk, ...fieldPlayers] = players1;
// players1 = {
//   gk : gk,
//   fieldPlayers: fieldPlayers
// }
players1;

let [gk2, ...fieldPlayers2] = players2;
// players2 = {
//   gk : gk2,
//   fieldPlayers: fieldPlayers2
// }
players2;

//let allPlayers = players1.fieldPlayers.concat(players1.gk).concat(players2.gk).concat(players2.fieldPlayers);
let allPlayers = [...players1, ...players2];
allPlayers;
// console.log('allplayer length', allPlayers.length, typeof(allPlayers));

let players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

players1Final;

let { team1, x: draw, team2 } = game.odds;
team1;
draw;
team2;

function printGoals(...players) {
  console.log(players);
  // const goals = game.scored.filter( p => p === player).length;
  // console.log(`${player} goals ${goals}`);
  let result = players.map(player => {
    return {
      player: player,
      goals: game.scored.filter(p => p === player).length,
    };
  });
  console.log(result);
}

printGoals('Lewandowski', 'Gnarby', 'Hummels');
// printGoals('Gnarby');

console.log((team1 < team2 && 'team1') || (team1 > team2 && 'team2'));

//////////////////////////////////////// For of loop
let foods = ['nasi goreng', 'ayam bakar', 'sate ayam'];

for (let food of foods) {
  console.log(food);
}
for (let food of foods.entries()) {
  console.log(`${food[0]}: ${food[1]}`);
  ///> 0: nasi goreng ​​​​
  ///> 1: ayam bakar ​​​​
  ///> 2: sate ayam ​​​​
}

for (let [idx, foodName] of foods.entries()) {
  console.log(`${idx}: ${foodName}`);
  ///> 0: nasi goreng ​​​​
  ///> 1: ayam bakar ​​​​
  ///> 2: sate ayam ​​​​
}

////////////////////////////////////// For in (Object)
const obj = { a: 1, b: 2, c: 3 };

for (let prop in obj) {
  console.log(`Property: ${prop}, Value: ${obj[prop]}`);
  ///> Property: a, Value: 1
  ///> Property: b, Value: 2
  ///> Property: c, Value: 3
}

for (const entry of Object.entries(obj)) {
  console.log(entry);
}

///////////////////////////////////// Enhanced Object Literal

///// make object/array to be inside another object
let foods2 = ['nasi goreng', 'ayam bakar', 'sate ayam'];
let myFavorites = {
  programmingLanguage: ['delphi', 'flutter'],
  foods2, /// make foods inside myFavories
};
console.log(myFavorites);
///> {
///>   programmingLanguage: [ 'delphi', 'flutter' ],
///>   foods: [ 'nasi goreng', 'ayam bakar', 'sate ayam' ]
///> }

/// function declaration inside object
const car = {
  brand: 'Toyota',

  /// before ES6
  getBrand: function () {
    return this.brand;
  },

  /// after ES6
  newGetBrand() {
    return this.brand;
  },
};
console.log(car.getBrand());
console.log(car.newGetBrand());

////// Properties calculation
const carBrands = [
  { id: 0, name: 'Toyota' },
  { id: 1, name: 'Honda' },
  { id: 2, name: 'Hyundai' },
];

/// Define & calculate property by using []
const carBrands2 = carBrands.map(brand => ({
  [brand.id + 1]: brand.name,
}));
console.log(carBrands2);
///> [ { 1: 'Toyota' }, { 2: 'Honda' }, { 3: 'Hyundai' } ]

/////////////////////////////////////// Optional chaining ?.
const user = {
  firstname: 'Haryono',
  phone: {
    mobile: '0812xxxxxx',
    home: '021xxxxxx',
  },
  printName(prefix) {
    return `User name: ${prefix} ${this.firstname}`;
  },
  favorites: {
    movies: [
      {
        title: 'Movie1',
      },
      {
        title: 'Movie2',
      },
    ],
  },
};

/// chaining properties
console.log(user.phone?.mobile);
/// chaining method
console.log(user.printName?.('Mr'));

const daysWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sun'];
const openingHours = {
  mon: {
    open: 12,
    close: 22,
  },
  tue: {
    open: 11,
    close: 23,
  },
  wed: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

for (const day of daysWeek) {
  console.log(
    `1. On ${day}, we're open at ${openingHours[day]?.open || 'closed'}`
  );
}
for (const day of daysWeek) {
  console.log(
    `2. On ${day}, we're open at ${openingHours[day]?.open ?? 'closed'}`
  );
}
/////////////////////////////////////// Looping Object, keys, values, entries
// const keys = ;
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

const openingHours2 = {
  mon: {
    open: 12,
    close: 22,
  },
  tue: {
    open: 11,
    close: 23,
  },
  wed: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(`We're open ${Object.keys(openingHours2).length} days a week`);
for (const [day, { open, close }] of Object.entries(openingHours2)) {
  console.log(`On ${day} from ${open} to ${close}`);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game2 = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/// 1
for (const [idx, scorer] of game2.scored.entries()) {
  console.log(`Goal ${idx + 1}: ${scorer}`);
}

/// 2
for (const value of Object.values(game2.odds)) {
  console.log(value);
}

const averageOdds =
  Object.values(game2.odds).reduce((sum, odd) => sum + odd, 0) /
  Object.entries(game2.odds).length;

console.log(averageOdds);

/// 3
for (const [teamName, odd] of Object.entries(game2.odds)) {
  console.log(
    `Odd of ${game2[teamName] ? 'victory ' : ''}${
      game2[teamName] ?? 'draw'
    } : ${odd}`
  );
  /// or
  console.log(
    `Odd of ${
      teamName === 'x' ? 'draw' : 'victory '.concat(game2[teamName])
    }: ${odd}`
  );
}

/// 4
const allPlayers2 = [...game2.players[0], ...game2.players[1]];

const scorers = allPlayers2.filter(player => game2.scored.includes(player));
scorers;

let scorerObj = {};
for (const scorer of scorers) {
  scorerObj = {
    ...scorerObj,
    [scorer]: game2.scored.filter(score => score === scorer).length,
  };
}
console.log(scorerObj);

/// Below is far more effective way
let scorerObj2 = {};
for (const scorer of game2.scored) {
  scorerObj2[scorer] ? scorerObj2[scorer]++ : (scorerObj2[scorer] = 1);
}
console.log(scorerObj2);
///////////////////////////////////////
// Sets
const orders = ['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza'];
const orderUnique = new Set(orders);
console.log(orderUnique);

///convert set into array
const orderArray = [...orderUnique];
console.log(orderArray);

console.log(new Set('Jonas'));

console.log(orderUnique.size);
console.log(orderUnique.has('Pizza'));
console.log(orderUnique.has('Bread'));
orderUnique.add('Garlic Bread');
orderUnique.add('Garlic Bread');
orderUnique.delete('Risotto');
// ordersSet.clear();
console.log(orderUnique);

for (const order of orderUnique) console.log(order);

const map1 = new Map();
map1.set('name', 'Toni').set(1, 'A').set(2, 'B');
map1.set('SD', true).set('SMP', true).set('SMA', true);
map1.set(true, 'Sudah SMA').set(false, 'Belum SMA');
console.log(map1);
console.log(map1.get('name'));
console.log(map1.get(map1.get('SMA') ?? false));

/// if we add an array directly as a key,
///   we will failed to get it because two arrays are not the same object
map1.set([1, 2], "It's an array");
console.log(map1.get([1, 2]));

/// to use an array as a key use it like this
const arr2 = [1, 2];
map1.set(arr2, 'This is array');
console.log(map1.get(arr2));

//> Map { 'name' => 'Toni',
//   1 => 'A',
//   2 => 'B',
//   'SD' => true,
//   'SMP' => true,
//   'SMA' => true,
//   true => 'Sudah SMA',
//   false => 'Belum SMA' }

/// how to create a Map directly on assigment
var map2 = new Map([
  ['name', 'abc'],
  ['age', 27],
]);
console.log(map2);

/// how to convert object into map
var obj1 = {
  name: 'abc',
  age: 27,
};

const obj1Map = new Map(Object.entries(obj1));
console.log(obj1Map);

/// iterating map
for (const [key, value] of map2) {
  console.log(`key: ${key} | value: ${value}`);
}

/// how to convert map to array
const mapToArray = [...map2];
console.log(mapToArray);
console.log([...map2.entries()]);
console.log([...map2.keys()]);
console.log([...map2.values()]);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/// 1.
/// create set from array
const events = new Set([...gameEvents.values()]);
console.log(events);
/// convert set to array
const eventsArray = [...events];
console.log(eventsArray);

/// 2.
gameEvents.delete(64);
console.log(gameEvents);

/// 3.
console.log(
  `An event happened on average every ${Math.ceil(
    90 / gameEvents.size
  )} minutes`
);
const time = [...gameEvents.keys()].pop();
console.log(time);

console.log(
  `An event happened on average every ${time / gameEvents.size} minutes`
);

/// 4.
for (const [minute, event] of gameEvents) {
  const half = minute <= 45 ? 'FIRST' : 'SECOND';

  console.log(`[${half} HALF] ${minute}: ${event}`);
}

////////////////////////////// Working with string;
const airline = 'Garuda Indonesia';
console.log(airline.indexOf('a'));
console.log(airline.lastIndexOf('a'));
console.log(airline.slice(2));
console.log(airline.slice(-3));
console.log(airline.slice(2, -3));

/// whenever we call a method from a string, javascript behind the scene
///   convert that string primitive into string object with the same content.
///   and then in that object the method are called. And this process called boxing
///   which take the string and put into a box that is object.
console.log(typeof airline);
console.log(typeof new String('This is string'));

/// the result of the method call, converted again into a string.
console.log(typeof new String('This is string').slice(4));

/// replace part of the string
const priceGB = '250.46£';
const priceUS = priceGB.replace('£', '$').replace('.', ',');
console.log(priceUS);

const price1 = '12.123.121';
console.log(price1.replaceAll('.', ','));

/// using regex
const announcement =
  'All passengers come to boarding door 23. Boarding door 23.';
console.log(announcement.replace(/door/g, 'gate'));

const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

console.log(plane.startsWith('Airbus') && plane.endsWith('neo'));

/// split and join
const myName = 'Teguh Raharjo';
const arrMyName = myName.split(' ');
console.log(arrMyName);

arrMyName.unshift('Mr. ');
const myNewName = arrMyName.join(' ');
console.log(myNewName);

/// practice
function titleCase(str) {
  const arr = str.split(' ');
  const arrResult = [];

  for (const s of arr) {
    arrResult.push(s[0].toUpperCase() + s.slice(1));
  }

  console.log(arrResult);

  return arrResult.join(' ');
}

console.log(titleCase('this is title'));

/// Padding
const message = 'Go to gate 23';
console.log(message.padStart(20, '='));
console.log(message.padEnd(20, '='));

/// real case application
function maskCreditCard(number) {
  number = number + ''; /// convert number to string
  return number.slice(-4).padStart(number.length, '*');
}

console.log(maskCreditCard(1111222233334234));

/// Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(3));

function planeInLine(n) {
  return `There are ${n} planes in line (${'✈️'.repeat(n)})`;
}

console.log(planeInLine(5));

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const arrFlights = flights.split('+_');

for (const flight of arrFlights) {
  const arrParts = flight.split(';');

  const msg = arrParts[0].replaceAll('_', ' ').trim();
  const from = arrParts[1].slice(0, 3).toUpperCase();
  const to = arrParts[2].slice(0, 3).toUpperCase();
  const time = arrParts[3].replace(':', 'h');

  console.log(`${msg} from ${from} to ${to} (${time})`);
}

//////////////////////////////////////
//// Process text on text area and convert underscore to camelcase

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

function processText() {
  console.log('process text');
}

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;

  /// split the lines into array
  const arrLines = text.split('\n');

  for (const [idxLines, lines] of arrLines.entries()) {
    /// split words into array
    const arrWords = lines.trim().split('_');
    const arrCamelCaseWords = [];

    for (const [idxWord, word] of arrWords.entries()) {
      let s = word.toLowerCase();

      /// create first case on word with idx > 0
      if (idxWord > 0) {
        s = s[0].toUpperCase() + s.slice(1);
      }

      arrCamelCaseWords.push(s);
    }

    let camelCaseText = arrCamelCaseWords.join('');

    /// create pad end using space (" ")
    camelCaseText = camelCaseText.padEnd(20, ' ');

    /// add repeating emoji
    camelCaseText += '✅'.repeat(idxLines + 1);

    console.log(camelCaseText);
  }
});
