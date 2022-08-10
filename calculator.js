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

let operand1 = '0';
let setOperand1 = 'off';
let operand2 = '0';
let setOperand2 = 'off';
let clickedEqual = '';
const operatorList = ['+', '-', '*', '/'];
let operator = '';
let displayReset = '';
const containDecimal = /^(?=.*\.).*$/;
let start = '';

const changeNumAppearance = (inputNumber) => {
  start = 'on';
  if(inputNumber === isNaN(input)) {
    inputNumber = String(inputNumber);
  }
  input(inputNumber);
  display.value = addComma(display.value);
}

const input = (addNumber) => {
  if((addNumber === '0') && (display.value === '0')) {
    return;
  } else if((addNumber === '.') && (containDecimal.test(display.value))) {
    return;
  } else if(containDecimal.test(display.value)) {
    display.value = `${display.value}${addNumber}`;
  } else if((/^0/) && (!containDecimal.test(display.value))) {
    if(addNumber === '\.') {
      display.value = `${display.value}${addNumber}`;
    } else {
      display.value = display.value.replace(/^0/, '');
      display.value = `${display.value}${addNumber}`;  
    }
  }
}

const addComma = (displayNum) => {
  if(containDecimal.test(displayNum)) {
    displayNum = displayNum.replace(/,/g, '');
    console.log(displayNum);
    let integer = displayNum.substr(0, displayNum.indexOf('.'));
    let float = displayNum.substr(displayNum.indexOf('.') + 1)
    console.log(float);
    display.value = checkDigit(integer);
    if (containDecimal.test(display.value)) {
      return display.value + float;
    } else {
      return display.value + '.' + float;
    }
  } else {
    displayNum = displayNum.replace(/,/g, '');
    return checkDigit(displayNum);
  }
  // display.value = `${originNumber.match(/.{1,3}/g).join(',')}`;
  // display.value = Number(originNumber.replace(/,/g, "")).toLocaleString(undefined,
  // {maximumFractionDigits: 8});
}

const removeComma = (originNumber) => {
  return originNumber.replace(/,/g, '');
}

const checkDigit = (originNumber) => {
  if(originNumber.length >= 4) {
    let lastThreeDigit = originNumber.slice(-3);
    let cutOrigin = originNumber.slice(0, -3);
    originNumber = cutOrigin + ',' + lastThreeDigit;
    console.log(originNumber);
  }
  if(originNumber.length >= 8) {
    let lastSevenDigit = originNumber.slice(-7);
    let cutOrigin = originNumber.slice(0, -7);
    originNumber = cutOrigin + ',' + lastSevenDigit;
    return originNumber;
  }
  return originNumber;
}

const addDisplayNumber1 = (digit, clickNumber) => {
  if(digit.replace(/,/g, '').replace(/\./g, '').length <= 8) {
    changeNumAppearance(clickNumber);
  }
}

const addDisplayNumber2 = (digit, clickNumber) => {
  if(displayReset === 'on') {
    display.value = '0';
  }
  if(digit.replace(/,/g, '').length <= 8) {
    changeNumAppearance(clickNumber);
    setOperand2 = 'on';
    displayReset = 'off';
  }
}

const setValue = (inputNumber) => {
  //初回セット
  if((setOperand1 === 'off') || (clickedEqual === 'clicked')) {
    operand1 = removeComma(inputNumber);
    clickedEqual = '';
    operand2 = '0';
  } else if((setOperand1 === 'on') && (setOperand2 === 'on')) {
    operand2 = removeComma(inputNumber);
    operand1 = calculation(operand1, operand2, operator);
    operand1 = String(operand1);
    // console.log(operand1);
    // console.log(operand2);
  }
  if(setOperand1 === 'on') {
    
  }
  display.value = addComma(operand1);
  interimResult = '';
  setOperand1 = 'on';
  setOperand2 = 'off';
  operand2 = '0';
  displayReset = 'on';
}

function getDotPosition(operand){
  var strVal = String(operand);
  var dotPosition = 0;
  if(strVal.lastIndexOf('.') !== -1){
    dotPosition = strVal.length - (strVal.lastIndexOf('.') + 1);
  }
  return dotPosition;
}

function calculation(value1, value2, operator) {
  let dotPosition1 = getDotPosition(value1);
  let dotPosition2 = getDotPosition(value2);
  let max = Math.max(dotPosition1,dotPosition2);
  value1 = Number(value1);
  value2 = Number(value2);
  let intValue1 = parseInt((value1.toFixed(max) + '').replace('.', ''));
  let intValue2 = parseInt((value2.toFixed(max) + '').replace('.', ''));
  let power = Math.pow(10,max);
  if(operator === '+') {
    return (intValue1 + intValue2) / power;   
  } else if(operator === '-') {
    return (intValue1 - intValue2) / power;   
  } else if(operator === '*') {
    return (intValue1 * intValue2) / power;   
  } else if(operator === '/') {
    if((intValue1 === 0) || (intValue2 === 0) || (power === 0)) {
      return 0;
    } else {
      return (intValue1 / intValue2) / power;
    }
  } else if (operator === '') {
    return intValue2;
  }
}

const allClear = () => {
  operand1 = '0';
  setOperand1 = 'off';
  operand2 = '0';
  setOperand2 = 'off';
  clickedEqual = '';
  operator = '';
  displayReset = '';
  display.value = '0';
  start = '';
}

const addition = (inputResult) => {
  operator = operatorList[0];
  setValue(inputResult);
  setOperand1 = 'on'; 
}

const subtraction = (inputResult) => {
  operator = operatorList[1];
  setValue(inputResult);
  setOperand1 = 'on';
}

const multiplication = (inputResult) => {
  operator = operatorList[2];
  setValue(inputResult);
  setOperand1 = 'on';
}

const division = (inputResult) => {
  operator = operatorList[3];
  setValue(inputResult);
  setOperand1 = 'on';
}

const equal = (inputNumber) => {
  if(clickedEqual === 'clicked') {
    operand1 = calculation(operand1, operand2, operator);
    operand1 = String(operand1);
    display.value = addComma(operand1);
    displayReset = 'on';
  } else {
  operand2 = removeComma(inputNumber);
  operand1 = calculation(operand1, operand2, operator);
  operand1 = String(operand1);
  display.value = addComma(operand1);
  displayReset = 'on';
  clickedEqual = 'clicked';
  console.log(operand2);
  }
}

buttonAllClear.addEventListener('click', () => {
  allClear();
});

buttonPlusMinus.addEventListener('click', () => {
});

buttonPercent.addEventListener('click', () => {
  if(start === '') {
    return;
  } else {
  }
});

buttonDivision.addEventListener('click', () => {
  if(start === '') {
    return;
  } else {
    division(display.value);
  }
});

const checkDecimal = (originNumber, decimal) => {
  if(/^(?=.*\.).*$/.test(originNumber)) {
    return;
  } else {
    display.value = `${originNumber}${decimal}`;
  }
}

buttonSeven.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value,buttonSeven.value);
  } else { 
    addDisplayNumber2(display.value,buttonSeven.value);
  }
});

buttonEight.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonEight.value);
  } else {
    addDisplayNumber2(display.value, buttonEight.value);
  }
});

buttonNine.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonNine.value);
  } else {
    addDisplayNumber2(display.value, buttonNine.value);
  }});

buttonMultiplication.addEventListener('click', () => {
  if(start === '') {
    return;
  } else {
    multiplication(display.value);
  }
});

buttonFour.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonFour.value);
  } else {
    addDisplayNumber2(display.value, buttonFour.value);
  }
});

buttonFive.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonFive.value);
  } else {
    addDisplayNumber2(display.value, buttonFive.value);
  }
});

buttonSix.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonSix.value);
  } else {
    addDisplayNumber2(display.value, buttonSix.value);
  }
});

buttonSubtraction.addEventListener('click', () => {
  if(start === '') {
    return;
  } else {
    subtraction(display.value);
  }
});

buttonOne.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonOne.value);
  } else {
    addDisplayNumber2(display.value, buttonOne.value);
  }
});

buttonTwo.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonTwo.value);
  } else {
    addDisplayNumber2(display.value, buttonTwo.value);
  }
});

buttonThree.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonThree.value);
  } else {
    addDisplayNumber2(display.value, buttonThree.value);
  }
});

buttonAddition.addEventListener('click', () => {
  if(start === '') {
    return;
  } else {
    addition(display.value);
  }
});

buttonZero.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonZero.value);
  } else {
    addDisplayNumber2(display.value, buttonZero.value);
  }
});

buttonDecimal.addEventListener('click', () => {
  if(setOperand1 === 'off') {
    addDisplayNumber1(display.value, buttonDecimal.value);
    // checkDecimal(display.value, buttonDecimal.value);
  } else {
    addDisplayNumber2(display.value, buttonDecimal.value);
    // if(/^(?=.*\.).*$/.test(operand2)) {
    //   return;
    // } else {
    //   addDisplayNumber2(operand2, buttonDecimal.value);
    // }
  }
});

buttonEqual.addEventListener('click', () => {
  equal(display.value);
});