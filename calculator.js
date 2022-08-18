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
let operand2 = '0';
let setOperand = 'off';
let clickedEqual = '';
const operatorList = ['+', '-', '*', '/'];
let operator = '';
let displayReset = '';
let start = '';
let formula = '';
let inputTimeOfMulti = '';

const judgeOneSideFormula  = /^\-*(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-|\*|\/)$/;
const getFirstOperandAndOperator = /^\-*(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-|\*|\/)/
const judgeSimpleFormula = /^\-*(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-|\*|\/)(\d{1,9}|\d{1,9}\.\d{1,9})$/;
const judgeOperatorAndSecondOperand  = /(\+|\-|\*|\/)(\d{1,9}|\d{1,9}\.\d{1,9})$/;
const judgeSecondOperandAndOperator  = /(\+|\-|\*|\/\d{1,9}|\d{1,9}\.\d{1,9}\*|\/).*$/;
const judgeComplexFormula = 
/^\-*(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-|\*|\/)(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-|\*|\/)$/;
const judgeFirstOperatorMultiOrDiv =
/^\-*(\d{1,9}|\d{1,9}\.\d{1,9})(\*|\/)(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-)$/;
const judgeFirstOperatorAddOrSub =
/^\-*(\d{1,9}|\d{1,9}\.\d{1,9})(\+|\-)(\d{1,9}|\d{1,9}\.\d{1,9})(\*|\/)$/;
const includeAddOrSub = /\+|\-/;
const includeMultiOrDiv = /\*|\//;
const includeOperator = /^(?=.*\+|\-|\*|\/).*$/;
const containDecimal = /^(?=.*\.).*$/;
// return (Function('return ('+strFormula+');')() / fixOperand);
// -----------------------------------------------------------------------

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

// 数値区切り関数---------------------------------------------------------------
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
// -------------------------------------------------------------------------

const addDisplayNumber1 = (digit, clickNumber) => {
  if(displayReset === 'on') {
    display.value = '0';
    displayReset = 'off';
  }
  if(digit.replace(/,/g, '').replace(/\./g, '').length <= 8) {
    changeNumAppearance(clickNumber);
    setOperand = 'on';
  }
}

const changeNumAppearance = (inputNumber) => {
  start = 'on';
  if(inputNumber === isNaN(input)) {
    inputNumber = String(inputNumber);
  }
  input(inputNumber);
  display.value = addComma(display.value);
}

const separateFormula = (midwayFormula) => {
  if(judgeOneSideFormula.test(midwayFormula)) { //1+型
    let firstOperand = midwayFormula.slice(0, -1);
    console.log(firstOperand);
    let firstOperator = midwayFormula.slice(-1);
    console.log(firstOperator);
    return [firstOperand, firstOperator];
  } else if(judgeSimpleFormula.test(midwayFormula)) { //1+1型
    console.log(midwayFormula);
    let firstOperandAndOperator = midwayFormula.match(getFirstOperandAndOperator);
    console.log(firstOperandAndOperator[0]);
    let firstOperand = firstOperandAndOperator[0].slice(0, -1);
    console.log(firstOperand);
    let firstOperator = firstOperandAndOperator[0].slice(-1);
    console.log(firstOperator);
    let secondOperatorAndOperand = midwayFormula.match(judgeOperatorAndSecondOperand);
    console.log(secondOperatorAndOperand[0]);
    let secondOperand = secondOperatorAndOperand[0].slice(1);
    console.log(secondOperand);
    return [firstOperand, firstOperator, secondOperand];
  } else if(judgeComplexFormula.test(midwayFormula)) { //1+1+型
    let firstOperandAndOperator = midwayFormula.match(getFirstOperandAndOperator);
    console.log(firstOperandAndOperator[0]);
    let firstOperand = firstOperandAndOperator[0].slice(0, -1);
    console.log(firstOperand);
    let secondOperandAndOperator = midwayFormula.match(judgeSecondOperandAndOperator);
    console.log(secondOperandAndOperator[0]);
    let includeFirstOperator = secondOperandAndOperator[0].slice(0, 1);
    console.log(includeFirstOperator);
    let includeSecondOperator = secondOperandAndOperator[0].slice(-1);
    console.log(includeSecondOperator[0]);
    console.log(secondOperandAndOperator[0]);
    let secondOperand = secondOperandAndOperator[0].slice(1).slice(0, -1);
    console.log(secondOperand);
    return [firstOperand, includeFirstOperator[0], secondOperand, includeSecondOperator[0]];
  }
}

// 計算関数　-----------------------------------------------------------------------------
const calcTypeOnce = (originFormula, inputNum, operand) => {
  let [separatedOperand, separatedOperator] = separateFormula(originFormula);
  display.value = String(calculation(separatedOperand, inputNum, separatedOperator));
  formula = `${formula}${inputNum}${operand}`;
}

const calcTypeFromLeftTwice = (originFormula, inputNum ,lastOperand) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand1, separatedOperand2, separatedOperator1));
  display.value = String(calculation(separatedOperand2, inputNum, separatedOperator2));
  formula = `${separatedOperand2}${separatedOperator2}${inputNum}${lastOperand}`;
}

const calcTypeRightOnly = (originFormula, inputNum ,lastOperand) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  display.value = String(calculation(separatedOperand2, inputNum, separatedOperator2));
  formula = `${separatedOperand1}${separatedOperator1}${display.value}${lastOperand}`;
}

const calcTypeAll = (originFormula, inputNum ,lastOperand) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand2, inputNum, separatedOperator2));
  display.value = String(calculation(separatedOperand1, separatedOperand2, separatedOperator1));
  formula = `${separatedOperand1}${separatedOperator1}${separatedOperand2}${lastOperand}`;
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

  if(firstOperator === '+') {
    return (intFirstOperand + intSecondOperand) / fixOperand;   
  } else if(firstOperator === '-') {
    return (intFirstOperand - intSecondOperand) / fixOperand;   
  } else if(firstOperator === '*') {
    return (intFirstOperand * intSecondOperand) / fixOperand;   
  } else if(firstOperator === '/') {
    if((intFirstOperand === 0) || (intSecondOperand === 0) || (fixOperand === 0)) {
      return 0;
    } else {
      return (intFirstOperand / intSecondOperand) / fixOperand;
    }
  } else if (firstOperator === '') {
    return intSecondOperand;
  }
}

// -------------------------------------------------------------------------------------------

const allClear = () => {
  operand1 = '0';
  setOperand = 'off';
  operand2 = '0';
  clickedEqual = '';
  operator = '';
  displayReset = '';
  display.value = '0';
  start = '';
}

const addition = (inputResult) => {
  if(setOperand === 'off') { //数字未入力の場合
    formula = changeOperator(formula, operatorList[0]);
    if (judgeOneSideFormula.test(formula)) {
      let [separatedOperand, separatedOperator] = separateFormula(formula);
      display.value = separatedOperand;
    } else if(judgeComplexFormula.test(formula)) {
      let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] = separateFormula(formula);
      display.value = String(calculation(separatedOperand1, separatedOperand2, separatedOperator));
    }
  } else { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[0]}`;
    } else if(!includeMultiOrDiv.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) { 
        calcTypeOnce(formula, inputResult ,operatorList[0]);
      } else if(judgeComplexFormula.test(formula)) {
        calcTypeFromLeftTwice(formula, inputResult, operatorList[0]);
      }
    } else if(includeMultiOrDiv.test(formula)) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) {
        calcTypeOnce(formula, inputResult ,operatorList[0]);
      } else if(judgeComplexFormula.test(formula)) { //混在計算
        if(judgeFirstOperatorMultiOrDiv.test(formula)) {
          calcTypeFromLeftTwice(formula, inputResult, operatorList[0]);
        } else if(judgeFirstOperatorAddOrSub.test(formula)) {
          calcTypeAll(formula, inputResult, operatorList[0]);
        }
      }
    }
  }
  console.log(formula);
  inputTimeOfMulti = inputResult;
  setReEnter();
}

const subtraction = (inputResult) => {
  if(setOperand === 'off') { //数字未入力の場合
    formula = changeOperator(formula, operatorList[1]);
    if (judgeOneSideFormula.test(formula)) {
      let [separatedOperand, separatedOperator] = separateFormula(formula);
      display.value = separatedOperand;
    } else if(judgeComplexFormula.test(formula)) {
      let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] = separateFormula(formula);
      display.value = String(calculation(separatedOperand1, separatedOperand2, separatedOperator));
    }
  } else { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[1]}`;
    } else if(!includeMultiOrDiv.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) { 
        calcTypeOnce(formula, inputResult ,operatorList[1]);
      } else if(judgeComplexFormula.test(formula)) {
        calcTypeFromLeftTwice(formula, inputResult, operatorList[1]);
      }
    } else if(includeMultiOrDiv.test(formula)) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) {
        calcTypeOnce(formula, inputResult ,operatorList[1]);
      } else if(judgeComplexFormula.test(formula)) { //混在計算
        if(judgeFirstOperatorMultiOrDiv.test(formula)) {
          calcTypeFromLeftTwice(formula, inputResult, operatorList[1]);
        } else if(judgeFirstOperatorAddOrSub.test(formula)) {
          calcTypeAll(formula, inputResult, operatorList[1]);
        }
      }
    }
  }
  console.log(formula);
  inputTimeOfMulti = inputResult;
  setReEnter();
}

const multiplication = (inputResult) => {
  if(setOperand === 'off') { //数字未入力
    formula = changeOperator(formula, operatorList[2]);
    if(inputResult === '0') { //初回未入力でのオペレーター押下
      formula = `0${operatorList[2]}`;
    } else { //計算中、数字未入力でのオペレーター押下
      if(judgeOneSideFormula.test(formula)) { //計算式未完成時
        display.value = inputTimeOfMulti;
      } else if(judgeComplexFormula.test(formula)){ //計算式完成後
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
        = separateFormula(formula);
        display.value = separatedOperand2;
      }
    }
  } else if(setOperand === 'on') { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[2]}`;
    } else if(!includeAddOrSub.test(formula)) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) {
        calcTypeOnce(formula, inputResult, operatorList[2]);
      } else if(judgeComplexFormula.test(formula)) {
        calcTypeFromLeftTwice(formula, inputResult, operatorList[2]);
      }
    } else if(includeAddOrSub.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) {
        formula = `${formula}${inputResult}${operatorList[2]}`;
      } else if(judgeComplexFormula.test(formula)) { //複雑計算式
        calcTypeRightOnly(formula, inputResult, operatorList[2]);
      }
    }
  }
  console.log(formula);
  inputTimeOfMulti = inputResult;
  setReEnter();
}

const division = (inputResult) => {
  operator = operatorList[3];
  setValue(inputResult);
}

const setReEnter = () => {
  displayReset = 'on';
  setOperand = 'off';
}

const changeOperator = (originFormula, setOperator) => {
  originFormula = originFormula.slice(0, -1);
  originFormula = `${originFormula}${setOperator}`;
  return originFormula;
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
    addDisplayNumber1(display.value,buttonSeven.value);
});

buttonEight.addEventListener('click', () => {
     addDisplayNumber1(display.value,buttonEight.value);
});

buttonNine.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonNine.value);
});

buttonMultiplication.addEventListener('click', () => {
  multiplication(display.value);
});

buttonFour.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonFour.value);
});

buttonFive.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonFive.value);
});

buttonSix.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonSix.value);
});

buttonSubtraction.addEventListener('click', () => {
  if(start === '') {
    return;
  } else {
    subtraction(display.value);
  }
});

buttonOne.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonOne.value);
});

buttonTwo.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonTwo.value);
});

buttonThree.addEventListener('click', () => {
  addDisplayNumber1(display.value,buttonThree.value);
});

buttonAddition.addEventListener('click', () => {
  addition(display.value);
});

buttonZero.addEventListener('click', () => {
  addDisplayNumber1(display.value, buttonZero.value);
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