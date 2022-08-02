const display = document.getElementById('display');

const buttonAllClear = document.getElementById('AC');
const buttonPlusMinus = document.getElementById('plusMinus');
const buttonPercent = document.getElementById('percent');
const buttonDivision = document.getElementById('division');
const buttonSeven = document.getElementById('seven');
const buttonEight = document.getElementById('eight');
const buttonNine = document.getElementById('nine');
const buttonMultiplication = document.getElementById('mult');
const buttonFour = document.getElementById('four');
const buttonFive = document.getElementById('five');
const buttonSix = document.getElementById('six');
const buttonSubtraction = document.getElementById('sub');
const buttonOne = document.getElementById('one');
const buttonTwo = document.getElementById('two');
const buttonThree = document.getElementById('three');
const buttonAddition = document.getElementById('add');
const buttonZero = document.getElementById('zero');
const buttonDecimal = document.getElementById('decimal');
const buttonEqual = document.getElementById('equal');

// let num = '';
// console.log(num);
// console.log(typeof buttonSeven.value);
// num = num.concat(buttonSeven.value);

let operand1 = [];
let operand2 = [];
const operators = ['+', '-', '*', '/'];
let operator = '';

const addArray1 = (array, clickNumber) => {
  if(array <= 8) {
    operand1.push(clickNumber);
    let array1Text = operand1.join('');
    display.value = array1Text;
  }
}

const addArray2 = (array, clickNumber) => {
  if(array <= 8) {
    operand2.push(clickNumber);
    let array2Text = operand2.join('');
    display.value = array2Text;  
  }
}

const allClear = () => {
  operand1 = [];
  operand2 = [];
  operator = '';
  display.value = '0';  
}

const addition = () => {
  operator = operators[0];
  console.log(operator);
}

const subtraction = () => {
  operator = operators[1];
  console.log(operator);
}

const multiplication = () => {
  operator = operators[2];
}

const division = () => {
  operator = operators[3];
}

const equal = () => {
  let formula = `${operand1.join('')}${operator}${operand2.join('')}`;
  console.log(formula);
  display.value = Function('return ('+formula+');')();
}

// num = num.concat(buttonSeven);
// const numSeven = Number(buttonSeven.textContent);
// console.log(numSeven);

buttonAllClear.addEventListener('click', () => {
  allClear();
});

buttonSeven.addEventListener('click', () => {
  if(operator === '') {
    addArray1(operand1.length, buttonSeven.value);
  } else {
    addArray2(operand2.length, buttonSeven.value);
  }
});

buttonEight.addEventListener('click', () => {
  if(operator === '') {
    addArray1(operand1.length, buttonEight.value);
  } else {
    addArray2(operand2.length, buttonEight.value);
  }
});

buttonNine.addEventListener('click', () => {
  if(operator === '') {
    addArray1(operand1.length, buttonNine.value);
  } else {
    addArray2(operand2.length, buttonNine.value);
  }});

buttonMultiplication.addEventListener('click', () => {
  multiplication();
});

buttonFour.addEventListener('click', () => {
  addArray1(operand1.length, buttonFour.value);
});

buttonFive.addEventListener('click', () => {
  addArray1(operand1.length, buttonFive.value);
});

buttonSix.addEventListener('click', () => {
  addArray1(operand1.length, buttonSix.value);
});

buttonSubtraction.addEventListener('click', () => {
  subtraction();
});

buttonOne.addEventListener('click', () => {
  addArray1(operand1.length, buttonFour.value);
});

buttonTwo.addEventListener('click', () => {
  addArray1(operand1.length, buttonTwo.value);
});

buttonThree.addEventListener('click', () => {
  addArray1(operand1.length, buttonThree.value);
});

buttonAddition.addEventListener('click', () => {
  addition();
});

buttonZero.addEventListener('click', () => {
  addArray1(operand1.length, buttonZero.value);
});

buttonDecimal.addEventListener('click', () => {
});

buttonEqual.addEventListener('click', () => {
  equal();
});