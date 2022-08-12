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
let previousOperator = '';
let displayReset = '';
const containDecimal = /^(?=.*\.).*$/;
const includeOperator = /^(?=.*\+|\-|\*|\/).*$/;
const includeDecimalOperand1  = /(^\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-)/;
const includeDecimalOperand2  = /(\+|\-\d{1,9}|\d{1,9}\.\d{1,9}\*|\/).*$/;
const includeAdditionOrSubtraction = /\+|\-/;
const includeMultiplicationOrDivision = /\*|\//;
let start = '';
let formula = '';

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
  }
  if(setOperand1 === 'on') {
    if(includeOperator.test(operand1)) {
      let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
        = separateIntoOperands(operand1);
      operand1 = calculateMidwayFormula(separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2);
      // let strFormula = `${separatedOperand1}${separatedOperator1}${separatedOperand2}${separatedOperator2}${inputNumber}`;
      // console.log(`${separatedOperand1}${separatedOperator1}${separatedOperand2}${separatedOperator2}${inputNumber}`);
      // console.log(strFormula);
      // operand1 = Function('return ('+strFormula+');')();
      console.log(typeof operand1);
      display.value = String(operand1);
      console.log(typeof operand1);
    } else {
      operand1 = calculation(operand1, operand2, operator);
      display.value = operand1;
      console.log(typeof operand1);
    }
    operand1 = String(operand1);
  }
  display.value = addComma(display.value);
  interimResult = '';
  setOperand1 = 'on';
  setOperand2 = 'off';
  operand2 = '0';
  displayReset = 'on';
}

const setFormula = (inputNumber, firstOperator) => {
  console.log(operand1);
  console.log(inputNumber);
  return `${operand1}${firstOperator}${inputNumber}${operator}`;
}

const separateIntoOperands = (midwayFormula) => {
  let firstOperandAndOperator = midwayFormula.match(includeDecimalOperand1);
  console.log(firstOperandAndOperator[0]);
  let firstOperand = firstOperandAndOperator[0].slice(0, -1);
  console.log(firstOperand);
  let secondOperandAndOperator = midwayFormula.match(includeDecimalOperand2);
  console.log(secondOperandAndOperator[0]);
  let secondOperand = secondOperandAndOperator[0].slice(1).slice(0, -1);
  console.log(secondOperand);
  let includeFirstOperator = midwayFormula.match(includeAdditionOrSubtraction);
  console.log(includeFirstOperator[0]);
  let includeSecondOperator = midwayFormula.match(includeMultiplicationOrDivision);
  console.log(includeSecondOperator[0]);
  return [firstOperand, includeFirstOperator[0], secondOperand, includeSecondOperator[0]];
}

function getDecimalPosition(operand){
  var strVal = String(operand);
  var decimalPosition = 0;
  if(strVal.lastIndexOf('.') !== -1){
    decimalPosition = strVal.length - (strVal.lastIndexOf('.') + 1);
  }
  return decimalPosition;
}

const calculation = (strFirstOperand, strSecondOperand, firstOperator) => {
  let firstOperandDecimalVolume = getDecimalPosition(strFirstOperand);
  let secondOperandDecimalVolume = getDecimalPosition(strSecondOperand);
  let maxVolume = Math.max(firstOperandDecimalVolume,secondOperandDecimalVolume);
  let numFirstOperand = Number(strFirstOperand);
  let numSecondOperand = Number(strSecondOperand);
  let intFirstOperand = parseInt((numFirstOperand.toFixed(maxVolume) + '').replace('.', ''));
  let intSecondOperand = parseInt((numSecondOperand.toFixed(maxVolume) + '').replace('.', ''));
  strFirstOperand = String(intFirstOperand);
  strSecondOperand = String(intSecondOperand);
  let fixOperand = Math.pow(10,maxVolume);
  let strFormula =`${strFirstOperand}${firstOperator}${strSecondOperand}`;
  return (Function('return ('+strFormula+');')() / fixOperand);
}

const calculateMidwayFormula = (strFirstOperand, firstOperator, strSecondOperand, secondOperator) => {
  let MultiplicationOrDivision = `${strSecondOperand}${secondOperator}${display.value}`;
  let midwayResult = String(Function('return ('+MultiplicationOrDivision+');')());
  return calculation(strFirstOperand, midwayResult, firstOperator);
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
  if(/./.test(operator)) {
    previousOperator = operator;
  }
  if((previousOperator === '-') || (previousOperator === '+')) {
    operator = operatorList[2];
    operand1 = setFormula(display.value, previousOperator);
    console.log(operand1);
  } else {
    setValue(inputResult);
  }
  operator = operatorList[2];
  setOperand1 = 'on';
  displayReset = 'on';
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