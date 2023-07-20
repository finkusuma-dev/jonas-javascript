'use strict';

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(' ');
  return [firstWord.toUpperCase(), ...others].join(' ');
};

/// fn is the callback function
const transformString = function (str, fn) {
  return `
      Original str: ${str} \n
      Transformed by fn: ${fn.name} \n
      Result: ${fn(str)}
    `;
};

console.log(transformString('Javascript is the best', upperFirstWord));
//> Original str: Javascript is the best
//> Transformed by fn: upperFirstWord
//> Result: JAVASCRIPT is the best

console.log(transformString('Javascript is the best', oneWord));
//> Original str: Javascript is the best
//> Transformed by fn: upperFirstWord
//> Result: javascriptisthebest

//////////////// Functions returning other functions

function greet(greeting) {
  return function (name) {
    return `${greeting} ${name}`;
  };
}

const greeter = greet('Hey');

console.log(greeter('doni'));
console.log(greet('hello')('gogon'));

/// arrow function
const greet2 = greeting => name => `${greeting} ${name}`;

console.log(greet2('halo')('cika'));

/////////////////////////////////////////// Call, apply, and bind

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
    return `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`;
  },
};

console.log(lufthansa.book('134', 'Heri'));

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
/// doesn't work because this is undefined
//console.log(book('135', 'Joel'));

/// Using Call method, this keyword will be set on eurowings
console.log(book.call(eurowings, 135, 'Joel'));

///Using apply method, same with call method but parameters should be on array
console.log(book.apply(eurowings, [245, 'Roni']));

console.log(eurowings.bookings);

const flightData = [523, 'Gina'];
console.log(book.apply(eurowings, flightData));
console.log(book.call(lufthansa, ...flightData));

/// Using bind. Set this keyword only once.
/// Then we can use the returned function repeatedly.
const bookEW = book.bind(eurowings);
console.log(bookEW(42, 'Rima'));

/// We can also set the first parameter directly.
/// Then we can use the returned function without the first parameter.
const bookEW32 = book.bind(eurowings, 32);
console.log(bookEW32('Endang'));

//// How it's used in partial application, for example: calculate tax
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

/// Challange: make bind using function returns function
const bind = (rate, addTax) => value => addTax(rate, value);

const addVAT2 = bind(0.23, addTax);

console.log(addVAT2(100));

/////////////// Using bind with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log('this', this);
  this.planes++;
  console.log('lufthansa.planes', lufthansa.planes);
};

/// IIFE

(function () {
  console.log('this is run inside IIFE');
})();

{
  var var1 = 'this is var1';
  let var2 = 'this is var2';
}

console.log(var1);
// console.log(var2);

////////////////////////////// Closure

function parentFunction(param1) {
  let parentVar1 = 0;

  return function () {
    parentVar1++;

    // console.log(parentVar1+' '+param1);
    return parentVar1 + '. ' + param1;
  };
}

const childFunction = parentFunction('this is a parent param');
console.log(childFunction());
console.log(childFunction());
console.log(childFunction());

console.dir(childFunction);

/// closure also used in this example with timer

function timerFunction() {
  // let a = 10;

  setTimeout(function () {
    console.log(`a x 2 = ${a * 2}`);
  }, 3000);
}

let a = 100;
timerFunction();

// this keyword points to the button
//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//////

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['1: Javascript', '2: Python', '3. Rust', '4. C++'],
  answers: new Array(4).fill(0),
  displayResults(type = 'array') {
    if (type === 'string') {
      return 'Poll result are ' + this.answers.join(', ');
    } else if (type === 'array') {
      return this.answers;
    }
  },
  registerNewAnswer() {
    const options = this.options.join('\n    ');
    // console.log('options', options);
    const pollResult = prompt(
      `
      ${this.question} \n ${options} \n (Write option number)
      `
    );

    // console.log(typeof pollResult);

    if (!(Number(pollResult) >= 1 && Number(pollResult) <= 4)) {
      console.log('Sorry, wrong answer');
      return;
    }

    this.answers[pollResult - 1]++;
    console.log(this.displayResults('string'));
    console.log(this.displayResults('array'));
  },
};

/// fin's solution

console.log(
  'displayResult2',
  poll.displayResults.call({
    answers: [5, 2, 3],
  })
);

console.log(
  'displayResult2',
  poll.displayResults.call({
    answers: [1, 5, 3, 9, 6, 1],
  })
);

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
