const display = document.getElementById('display');
const buttonClear = document.getElementById('AC');
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
const operatorButtons = [buttonDivision, buttonMultiplication, buttonSubtraction, buttonAddition];
const buttons = document.querySelectorAll('tbody > tr > td > input');


const operatorList = ['+', '-', '*', '/'];
let displayReset = '';
let formula = '';
let setOperand = 'off';
let numStorage = '';
let clickedEqual = 'off';
let clickedPercent = 'off';

const getFirstOperandAndOperator = /^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)/;//
const getLastOperandAndOperator = /\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)$/;//
const getOperandInteger = /\d+/;
const getOperandDecimal = /\d*$/;
const getFirstAppearOneOver = /^-*0\.0+/;
const getExponentiation = /\d+$/;
const getExponentiationIncludeOperator = /(\-|\+)*\d+$/;
const getAllocateExponentiation = /^-*\d+\.\d+/;
const judgeOperandOnly = /^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))$/;
const judgeOneSideFormula = /^\-*(((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))|(\d+e(\-|\+)*\d+))(\+|\-|\*|\/)$/;//
const judgeOneSideFormulaOperatorMultiOrDiv = 
/^\-*(((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))|(\d+e(\-|\+)*\d+))(\*|\/)$/;//
const judgeSimpleFormula = 
/^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))$/;//
const judgeOperatorAndSecondOperand = /(\+|\-|\*|\/)\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e(\-|\+)*\d+))$/;//
const judgeMinusOperand = /^\-/;
const judgeEndDecimal = /\.$/;
const judgeFirstOperatorMulti = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e(\-|\+)*\d+))\*/;//
const judgeComplexFormula = //
/^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)$/;
const judgeComplexFormulaFirstOperatorMultiOrDiv =//
/^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\*|\/)\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)$/;
const judgeFirstOperatorAddOrSub =//
/^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-)\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\*|\/)$/;
const includeAddOrSub = /\+|\-/;
const includeMultiOrDiv = /\*|\//;
const lastOperatorAddOrSub =
/^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-)$/;//
const lastOperatorMultiOrDiv = 
/^\-*((\d+|\d+\.\d+)|^\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\+|\-|\*|\/)\-*((\d+|\d+\.\d+)|\-*((\d+|\d+\.\d+)e(\-|\+)*\d+))(\*|\/)$/;//
const includeDecimal = /^(?=.*\.).*$/;
const includeDecimalAndNotExponentiation = /^(?=.*\.)(?!.*e).*$/;
// -----------------------------------------------------------------------


// 数値区切り関数---------------------------------------------------------------
const addComma = (displayNum) => {
  if(/,/g.test(displayNum)) {
    displayNum = displayNum.replace(/,/g, '');
  }
  let integerDigit = displayNum.match(getOperandInteger);
  if((integerDigit[0].length >= 4) && (!/e/.test(displayNum))) {
    if(includeDecimal.test(displayNum)) { //小数点を含む場合
      let integer = displayNum.substr(0, displayNum.indexOf('.'));
      let float = displayNum.substr(displayNum.indexOf('.') + 1)
      display.value = checkDigit(integer);
      if (includeDecimal.test(display.value)) {
        return display.value + float;
      } else {
        return display.value + '.' + float;
      }
    } else {
      displayNum = checkDigit(displayNum);
    }
  }
  return displayNum;
}

const removeComma = (originOperand) => {
  return originOperand.replace(/,/g, '');
}

const checkDigit = (originNumber) => {
  let integer = originNumber.match(/\d+/);
  if(integer[0].length >= 4) {
    let lastThreeDigit = originNumber.slice(-3);
    let cutOrigin = originNumber.slice(0, -3);
    originNumber = cutOrigin + ',' + lastThreeDigit;
  }
  if(integer[0].length >= 7) {
    let lastSevenDigit = originNumber.slice(-7);
    let cutOrigin = originNumber.slice(0, -7);
    originNumber = cutOrigin + ',' + lastSevenDigit;
    return originNumber;
  }
  return originNumber;
}
// -------------------------------------------------------------------------

const addDisplayNumber = (displayNum, clickNumber) => {
  changeCharacterToC();
  removeOperatorClassActive();
  if((displayReset === 'on') || (clickedPercent === 'on')) { //オペレーター押下後、もしくは初回入力
    display.value = '0';
    displayNum = '0';
    displayReset = 'off';
    clickedPercent = 'off';
  }
  displayNum = removeComma(displayNum);
  let displayNumDigit = displayNum.match(/\d/g);
  if(displayNumDigit.length >= 9) {
    return;
  } else {
    input(clickNumber);
    display.value = addComma(display.value);
    displayFontSize(display.value);
    setOperand = 'on';
  }
}

const changeCharacterToC = () => {
  buttonClear.style.transition = '0s';
  buttonClear.value = 'C';
  buttonClear.style.padding = '14px 18px';
}

const input = (addNumber) => {
  if((addNumber === '0') && (display.value === '0')) { //表示0時、0連続入力
    return;
  } else if(addNumber === '\.') { //小数点入力
    if(includeDecimal.test(display.value)) { //既に小数点がある場合
      return;
    } else if(!includeDecimal.test(display.value)) { //小数点がなく、表示が0の場合
      display.value = `${display.value}${addNumber}`;
      return;
    } 
  } else if(addNumber !== '\.') { //小数点以外入力
    if(/^\-*0$/.test(display.value)) { 
      display.value = display.value.slice(0, -1); //数字初回入力時の表示0削除
    }
  display.value = `${display.value}${addNumber}`;
  }
}

const displayFontSize = (displayNumber) => {
  console.log(displayNumber.length);
  if(displayNumber.length <= 6) {
    display.style.fontSize = '60px';
  } else if(displayNumber.length === 6) {
    display.style.fontSize = '59px';
  } else if(displayNumber.length === 7) {
    display.style.fontSize = '57px';
  } else if(displayNumber.length === 8) {
    display.style.fontSize = '53px';
  } else if(displayNumber.length === 9) {
    display.style.fontSize = '47px';
  } else if(displayNumber.length === 10) {
    display.style.fontSize = '42px';
  } else if(displayNumber.length === 11) {
    display.style.fontSize = '39px';
  } else if(displayNumber.length === 12) {
    display.style.fontSize = '35px';
  } else if(displayNumber.length === 13) {
    display.style.fontSize = '34px';
  }
}

// 式分離関数---------------------------------------------------------------
const sliceFormulaOneSide = (originFormula) => {
  let slicedOperand = originFormula.slice(0, -1);
  let slicedOperator = originFormula.slice(-1);
  return [slicedOperand, slicedOperator];
}

const sliceFormulaAll = (originFormula) => {
  // originFormula = '10/-3.5*';
  let operand1AndOperator1 = originFormula.match(getFirstOperandAndOperator);
  let operand2AndOperator2 = originFormula.replace(operand1AndOperator1[0], '');
  let [operand1, operator1] = sliceFormulaOneSide(operand1AndOperator1[0]);
  let [operand2, operator2] = sliceFormulaOneSide(operand2AndOperator2);
  return [operand1, operator1, operand2, operator2];
}

const separateFormula = (midwayFormula) => {
  if(judgeOneSideFormula.test(midwayFormula)) { //1+型
    let [firstOperand, firstOperator] = sliceFormulaOneSide(midwayFormula);
    return [firstOperand, firstOperator];
  } else if(judgeSimpleFormula.test(midwayFormula)) { //1+1型
    let firstOperandAndOperator = midwayFormula.match(getFirstOperandAndOperator);
    let [firstOperand, firstOperator] = sliceFormulaOneSide(firstOperandAndOperator[0]);
    let secondOperatorAndOperand = midwayFormula.match(judgeOperatorAndSecondOperand);
    let secondOperand = secondOperatorAndOperand[0].slice(1);
    return [firstOperand, firstOperator, secondOperand];
  } else if(judgeComplexFormula.test(midwayFormula)) { //1+1+型
    return sliceFormulaAll(midwayFormula);
  }
}
//-------------------------------------------------------------------------------------------

// 計算用関数　-----------------------------------------------------------------------------
const calcTypeNormal = (firstOperand, operator, secondOperand) => { 
  let calcResult = String(calculation(firstOperand, operator, secondOperand));
  if(calcResult === 'エラー') {
    return calcResult;
  } else {
    formula = `${secondOperand}${operator}`;
    return adjustResultForDisplay(calcResult);
  }
}

const calcTypeOnce = (originFormula, inputNum, operator) => { 
  let [separatedOperand, separatedOperator] = separateFormula(originFormula);
  let calcResult = String(calculation(separatedOperand, separatedOperator, inputNum));
  if(calcResult === 'エラー') {
    return calcResult;
  } else {
    formula = `${formula}${inputNum}${operator}`;
    return adjustResultForDisplay(calcResult);
  }
}

const calcTypeNormalFlow = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  let midwayResult = String(calculation(separatedOperand1, separatedOperator1, separatedOperand2));
  let calcResult = String(calculation(midwayResult, separatedOperator2, inputNum));
  if(calcResult === 'エラー') {
    return calcResult;
  } else {
    if(clickedEqual === 'on') {
      formula = `${inputNum}${lastOperator}`;
      return adjustResultForDisplay(calcResult);
    } else {
      formula = `${midwayResult}${separatedOperator2}${inputNum}${lastOperator}`;
      return adjustResultForDisplay(calcResult);
    }
  }
}

const calcTypeRightOnly = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand2, separatedOperator2, inputNum));
  if(separatedOperand2 === 'エラー') {
    return separatedOperand2;
  } else {
    formula = `${separatedOperand1}${separatedOperator1}${separatedOperand2}${lastOperator}`;
    return adjustResultForDisplay(separatedOperand2); //右辺の計算結果を表示
  }
}

const calcTypeFormulaOnly = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand1, separatedOperator1, separatedOperand2));
  if(separatedOperand2 === 'エラー') {
    return separatedOperand2;
  } else {
  formula = `${separatedOperand2}${separatedOperator2}${inputNum}${lastOperator}`;
  return adjustResultForDisplay(inputNum); //入力数値をreturn
  }
}

const calcTypeAllFromRight = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand2, separatedOperator2, inputNum));
  let calcResult = String(calculation(separatedOperand1, separatedOperator1, separatedOperand2));
  if(calcResult === 'エラー') {
    return calcResult;
  } else {
    if(clickedEqual === 'on') {
      formula = `${inputNum}${lastOperator}`;
      return adjustResultForDisplay(calcResult);
    } else {
      formula = `${separatedOperand1}${separatedOperator1}${separatedOperand2}${lastOperator}`;
      return adjustResultForDisplay(calcResult);
    }
  }
}

const getDecimalValue = (operand) => {
  let decimal = operand.substr(operand.indexOf('.') + 1);
  return decimal.length;
}
// ---
const getDecimalPosition = (operand) => {
  return (operand.length - 1) - operand.lastIndexOf('.');
}

const adjustFix = (originOperand, decimalDigit) => {
  let changedOperand = 0;
  if(!/e/.test(originOperand)) {
    changedOperand = parseInt((Number(originOperand).toFixed(decimalDigit) + '').replace('.', ''));
  } else {
    changedOperand = originOperand;
  }
  return changedOperand;
}

const integerCalculation = (operand1, operator, operand2) => {
  try {
    let decimalPosition1 = 0;
    let decimalPosition2 = 0;
    let intOperand1 = 0;
    let intOperand2 = 0;
    let calcResult = '';
    if((!/e/.test(operand1)) && (/\./.test(operand1))) {
      decimalPosition1 = getDecimalPosition(operand1);
    }
    if((!/e/.test(operand2)) && (/\./.test(operand2))) {
      decimalPosition2 = getDecimalPosition(operand2);
    }
    if((includeAddOrSub.test(operator)) || (operator === '/')) {
      let largerDecimalLength = Math.max(decimalPosition1,decimalPosition2);
      let powerPlusOrMinus = Math.pow(10,largerDecimalLength);
      intOperand1 = adjustFix(operand1, largerDecimalLength);
      intOperand2 = adjustFix(operand2, largerDecimalLength);
      if(operator === '+') {
        calcResult = (intOperand1 + intOperand2) / powerPlusOrMinus;
      } else if(operator === '-') {
        calcResult = (intOperand1 - intOperand2) / powerPlusOrMinus;
      } else if(operator === '/') {
        calcResult = intOperand1 / intOperand2;
      }
    } else if(includeMultiOrDiv.test(operator)) {
      let addDecimalLength = decimalPosition1 + decimalPosition2;
      let powerMultiOrDiv = Math.pow(10,addDecimalLength);
      intOperand1 = adjustFix(operand1, decimalPosition1);
      intOperand2 = adjustFix(operand2, decimalPosition2);
      if(operator === '*') {
        calcResult = (intOperand1 * intOperand2) / powerMultiOrDiv;
      }
    }
    return calcResult;  
  } catch(error) {
    return error.message;
  }
}
// ---
const calculation = (strFirstOperand, operator, strSecondOperand) => {
  // strSecondOperand = '(-5)';
  try {
    if((strFirstOperand === 'エラー') || (strSecondOperand === 'エラー')) {
      throw new Error('エラー');
    } else {
      let calcResult = '';
      let [fixedOperator, fixedSecondOperand] = fixOperator(operator, strSecondOperand);
      if((/e/.test(strFirstOperand)) || (/e/.test(fixedSecondOperand))) { //eを含む計算
        calcResult = String(Function('return ('+`${strFirstOperand}${fixedOperator}${fixedSecondOperand}`+');')());
      } else {
        if((includeDecimalAndNotExponentiation.test(strFirstOperand)) 
        || (includeDecimalAndNotExponentiation.test(fixedSecondOperand))) { //いずれかのオペランドが小数点を含み、且つeがない
          calcResult = String(integerCalculation(strFirstOperand, fixedOperator, fixedSecondOperand));
        } else { //整数どうしの計算
          calcResult = String(Function('return ('+`${strFirstOperand}${fixedOperator}${fixedSecondOperand}`+');')());
        }
      }
      if((!judgeOperandOnly.test(calcResult)) || (checkNumLimit(calcResult))) {
        throw new Error('エラー');
      } else {
        return calcResult;
      }
    }
  } catch(error) {
    return error.message;
  }
}

//-------------------------

const adjustResultForDisplay = (calcResult) => {
  if(!/\d/.test(Number(calcResult))) { //エラー時
    return calcResult;
  } else { //正規数値の取得時
    if(/e/.test(calcResult)) {
      calcResult = removeExponentiationWithPlus(calcResult);
      let displayDigit = exponentiationExcludedMinusAndDecimal(calcResult);
      if(displayDigit.length >= 9) {
        calcResult = exponentiationDecimalRound(calcResult);
      }
    } else {
      if(((Number(calcResult) < 0.00000001) && (Number(calcResult) > 0)) ||
      ((Number(calcResult) < 0) && (Number(calcResult) > -0.00000001))) {
        calcResult = exponentiationOneBillionth(calcResult);
      } else if((Number(calcResult) > 999999999) || (Number(calcResult) < -999999999)) {
        calcResult = exponentiationBillion(calcResult);
      } else { //eなし
        calcResult = decimalRound(calcResult);
        calcResult = addComma(calcResult);
      }
    }
    displayFontSize(calcResult);
    return calcResult;
  }
}

const removeExponentiationWithPlus = (originExponentiation) => {
  if(/\+/.test(originExponentiation)) {
    originExponentiation = originExponentiation.replace('+', '');
  }
  return originExponentiation;
}

const exponentiationExcludedMinusAndDecimal = (originExponentiation) => {
  let changedExponentiation = '';
  let displayExponentiations = originExponentiation.match(/\d+|e\-*/g); //先頭のマイナスと小数点を除いた文字数を取得
  displayExponentiations.forEach( (digit, length) => { //lengthいらない
    changedExponentiation = `${changedExponentiation}${digit}`;
  });
  return changedExponentiation;
}

const decimalRound = (calcResult) => {
  let displayDecimal ='';
  let integer = calcResult.match(getOperandInteger);
  if(judgeMinusOperand.test(integer[0])) {
    displayDecimal = 9 - (integer[0].length - 1);
  } else {
    displayDecimal = 9 - integer[0].length;
  }
  calcResult = Number(calcResult).toFixed(displayDecimal); //問題、２回目の丸め込みによる指数形式化
  return String(Number(calcResult));
}

const exponentiationDecimalRound = (calcResult) => {
  let exponentiation = calcResult.match(getExponentiation);
  let exponentiationDisplay = calcResult.match(/e(\-|\+)*\d+/);
  let integer = calcResult.match(getOperandInteger); //マイナス含むとあやしい
  if(Number(exponentiation[0]) <= 8) {
    calcResult = Number(calcResult).toFixed(8);
    calcResult = fixDecimal(calcResult);
    return calcResult;
  } else {
    let displayDecimal = '';
    let allocateExponentiation = calcResult.match(getAllocateExponentiation);
    if(judgeMinusOperand.test(allocateExponentiation[0])) {
      displayDecimal = 9 - integer[0].length - (exponentiation[0].length + 1) + 1; //(exponentiation[0].length + 1) eとi乗分のlengthを表示領域9から引く、末尾+1はマイナス分のlength
    } else {
      displayDecimal = 9 - integer[0].length - (exponentiation[0].length + 1);
    }
    calcResult = Number(allocateExponentiation[0]).toFixed(displayDecimal);
    calcResult = String(Number(calcResult));
    let [newCalcResult, newExponentiationDisplay] = adjustExponentiation(calcResult, exponentiationDisplay[0]);
    return `${String(newCalcResult)}${newExponentiationDisplay}`;  
  }
}

const fixDecimal = (originCalcResult) => {
  if(/0+$/.test(originCalcResult)) {
    let zero = originCalcResult.match(/0+$/);
    let removeZero = -zero[0].length;
    originCalcResult = originCalcResult.slice(0, removeZero);
  }
  return originCalcResult;
}

const fixOperator = (originOperator, originNum) => {
  if(/\-\-/.test(`${originOperator}${originNum}`)) {
    originOperator = '+';
    originNum = originNum.slice(1);
  } else if(/\+\-/.test(`${originOperator}${originNum}`)) {
    originOperator = '-';
    originNum = originNum.slice(1);
  }
  return [originOperator, originNum];
}

const exponentiationBillion = (calcResult) => {//2962959997.03704 = 2.96296e9
  // calcResult = '9999999999888800000';
  let includeMinus = calcResult.match(/^\-*/);
  let integer = calcResult.match(getOperandInteger);
  let exponentiation = `e${integer[0].length - 1}`;
  calcResult = Number(integer[0]) / Math.pow(10, (integer[0].length - 1));
  let displayDecimal = 9 - exponentiation.length;
  calcResult = Number(calcResult).toFixed(displayDecimal - 1);
  calcResult = String(Number(calcResult));
  let [newCalcResult, newExponentiation] = adjustExponentiation(calcResult, exponentiation);
  return `${includeMinus[0]}${String(newCalcResult)}${newExponentiation}`;
}

const exponentiationOneBillionth = (calcResult) => {
  let exponentiation = calcResult.match(getFirstAppearOneOver);
  let decimalPointNum = calcResult.replace(exponentiation, '');
  if(judgeMinusOperand.test(calcResult)) {
    calcResult = Number(calcResult) * Math.pow(10, (exponentiation[0].length - 2)); //小数点以下、0の個数分
    calcResult = Number(calcResult).toFixed(decimalPointNum.length - 1);
    exponentiation[0] = `e-${exponentiation[0].length - 2}`; //値マイナス時のe生成
  } else {
    calcResult = Number(calcResult) * Math.pow(10, (exponentiation[0].length - 1));
    calcResult = Number(calcResult).toFixed(decimalPointNum.length);
    exponentiation[0] = `e-${exponentiation[0].length - 1}`; //値プラス時のe生成
  }
  calcResult = String(Number(calcResult));
  return `${String(calcResult)}${exponentiation[0]}`;
}

const adjustExponentiation = (originCalcResult, exponentiation) => {
  let checkInteger = originCalcResult.match(getOperandInteger);
  let newExponentiation = 0;
  if(checkInteger[0].length >= 2) { //四捨五入時の桁数繰上り修正
    originCalcResult = Number(originCalcResult) / 10;
    let originExponentiation = exponentiation.match(getExponentiation);
    if(/\-/.test(exponentiation)) {
      newExponentiation = Number(originExponentiation[0]) - 1;
    } else {
      newExponentiation = Number(originExponentiation[0]) + 1;
    }
    exponentiation = exponentiation.replace(originExponentiation[0], String(newExponentiation));
  }
  return [originCalcResult, exponentiation];
}

const checkNumLimit = (originCalcResult) => {
  if(/e/.test(originCalcResult)) {
    let exponentiation = originCalcResult.match(getExponentiationIncludeOperator);
    exponentiation[0] = Number(exponentiation[0]);
    if((exponentiation[0] <= -100) || (exponentiation[0] >= 161)) {
      return true;
    }
  }
  return false;
}

// -------------------------------------------------------------------------------------------

const allClear = () => {
  displayReset = '';
  formula = '';
  setOperand = 'off';
  numStorage = '';
  clickedEqual = 'off';
  clickedPercent = 'off';
  display.value = 0;
  displayFontSize(display.value);
  buttonClear.classList.remove('is-MouseUp');
  buttonClear.classList.remove('is-MouseDown');
  removeOperatorClassActive();
}

const removeOperatorClassActive = () => {
  operatorButtons.forEach((operator, length) => {
    operator.classList.remove('is-active');
  });
}

const resetOnError = () => {
  displayReset = '';
  formula = '';
  setOperand = 'off';
  numStorage = '';
  clickedEqual = 'off';
  clickedPercent = 'off';
  displayFontSize(display.value);
  setReEnter();
}

const adjustOperand = (operand) => {
  operand = removeComma(operand);
  operand = removeEndDecimal(operand);
  return operand;
}

const removeEndDecimal = (operand) => {
  if(judgeEndDecimal.test(operand)) {
    operand = operand.slice(0, -1);
  }
  return operand;
}

const displayNineDigitOrLess = (displayNum) => {
  // displayNum = '2.36476368224e-10';
  if(/e/.test(displayNum)) {
    let numDigit = exponentiationExcludedMinusAndDecimal(displayNum);
    if(numDigit.length >= 10) {
      return adjustResultForDisplay(displayNum);
    } else {
      return displayNum;
    }
  } else {
    displayNum = adjustResultForDisplay(displayNum);
    return displayNum;
  }
}

const addition = (inputResult) => {
  if(display.value === 'エラー') {
    return;
  }
  inputResult = adjustOperand(inputResult);
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
    formula = `${inputResult}${operatorList[0]}`;
    setReEnter();
    return;
  }
  if(setOperand === 'off') { //数字未入力の場合
    if(formula === '') { //計算式なし
      formula = `0${operatorList[0]}`;
    } else { //計算式あり
      formula = setOperator(formula, operatorList[0]); //演算子変更
      if (judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
        display.value = adjustResultForDisplay(inputResult); 
      } else if(judgeComplexFormula.test(formula)) { //式の型：1(+|-|*|/)1+
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
        = separateFormula(formula);
        display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
        display.value = displayNineDigitOrLess(display.value);
      }
    }
  } else { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[0]}`;
    } else if(!includeMultiOrDiv.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) { 
        display.value = calcTypeOnce(formula, inputResult ,operatorList[0]);
      } else if(judgeComplexFormula.test(formula)) {
        display.value = calcTypeNormalFlow(formula, inputResult, operatorList[0]);
      }
    } else if(includeMultiOrDiv.test(formula)) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) { //式の型：1(*|/)
        display.value = calcTypeOnce(formula, inputResult ,operatorList[0]);
      } else if(judgeComplexFormula.test(formula)) { //式の型：1(+|-|*|/)1(+|-|*|/)
        if(judgeComplexFormulaFirstOperatorMultiOrDiv.test(formula)) { //式の型：1(*|/)1(+|-|*|/)
          display.value = calcTypeNormalFlow(formula, inputResult, operatorList[0]);
        } else if(judgeFirstOperatorAddOrSub.test(formula)) { //式の型：1(+|-)1(+|-|*|/)
          display.value = calcTypeAllFromRight(formula, inputResult, operatorList[0]);
        }
      }
    }
  }
  if(display.value === 'エラー') {
    resetOnError();
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();  
  }
}

const subtraction = (inputResult) => {
  if(display.value === 'エラー') {
    return;
  }
  inputResult = adjustOperand(inputResult);
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
    formula = `${inputResult}${operatorList[1]}`;
    setReEnter();
    return;
  }
  if(setOperand === 'off') { //数字未入力の場合
    if(formula === '') { //計算式なし
      formula = `0${operatorList[1]}`;
    } else { //計算式あり
      formula = setOperator(formula, operatorList[1]);
      if (judgeOneSideFormula.test(formula)) { //式の型：1+|-|*|/
        display.value = adjustResultForDisplay(inputResult);
      } else if(judgeComplexFormula.test(formula)) {
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] = separateFormula(formula);
        display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
        display.value = displayNineDigitOrLess(display.value);
      }
    }
  } else { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[1]}`;
    } else if(!includeMultiOrDiv.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) { 
        display.value = calcTypeOnce(formula, inputResult ,operatorList[1]);
      } else if(judgeComplexFormula.test(formula)) {
        display.value = calcTypeNormalFlow(formula, inputResult, operatorList[1]);
      }
    } else if(includeMultiOrDiv.test(formula)) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) {
        display.value = calcTypeOnce(formula, inputResult ,operatorList[1]);
      } else if(judgeComplexFormula.test(formula)) { //式の型：1(+|-|*|/)1(+|-|*|/)
        if(judgeComplexFormulaFirstOperatorMultiOrDiv.test(formula)) {
          display.value = calcTypeNormalFlow(formula, inputResult, operatorList[1]);
        } else if(judgeFirstOperatorAddOrSub.test(formula)) {
          display.value = calcTypeAllFromRight(formula, inputResult, operatorList[1]);
        }
      }
    }
  }
  if(display.value === 'エラー') {
    resetOnError();
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();
  }
}

const multiplication = (inputResult) => {
  if(display.value === 'エラー') {
    return;
  }
  inputResult = adjustOperand(inputResult);
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
    formula = `${inputResult}${operatorList[2]}`;
    setReEnter();
    console.log(formula);
    return;
  }
  if(setOperand === 'off') { //数字未入力
    if(formula === '') { //初回未入力でのオペレーター押下
      formula = `0${operatorList[2]}`;
    } else { //計算中、数字未入力でのオペレーター押下
      formula = setOperator(formula, operatorList[2]);
      if(judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
        display.value = adjustResultForDisplay(inputResult);
      } else if(judgeComplexFormula.test(formula)){ //計算式完成後
        if(judgeFirstOperatorAddOrSub.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = separatedOperand2;
          display.value = displayNineDigitOrLess(display.value);
        } else if(includeMultiOrDiv.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
          display.value = displayNineDigitOrLess(display.value);
        }
      }
    }
  } else if(setOperand === 'on') { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[2]}`;
    } else if((judgeComplexFormulaFirstOperatorMultiOrDiv.test(formula)) 
    || (judgeOneSideFormulaOperatorMultiOrDiv.test(formula))) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) {
        display.value = calcTypeOnce(formula, inputResult, operatorList[2]);
      } else if(judgeComplexFormula.test(formula)) {
        display.value = calcTypeNormalFlow(formula, inputResult, operatorList[2]);
      }
    } else if(includeAddOrSub.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) {
        formula = `${formula}${inputResult}${operatorList[2]}`;
      } else if(judgeComplexFormula.test(formula)) { //式の型：1(+|-|*|/)1(+|-|*|/)
        if(lastOperatorAddOrSub.test(formula)) { 
          display.value = calcTypeFormulaOnly(formula, inputResult, operatorList[2]);
        } else if(lastOperatorMultiOrDiv.test(formula)) {
          display.value = calcTypeRightOnly(formula, inputResult, operatorList[2]);
        }
      }
    }
  }
  if(display.value === 'エラー') {
    resetOnError();
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();
  }
}

const division = (inputResult) => {
  if(display.value === 'エラー') {
    return;
  }
  inputResult = adjustOperand(inputResult);
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
    formula = `${inputResult}${operatorList[3]}`;
    setReEnter();
    return;
  }
  if(setOperand === 'off') { //数字未入力
    if(formula === '') { //初回未入力でのオペレーター押下
      formula = `0${operatorList[3]}`;
    } else { //計算中、数字未入力でのオペレーター押下
      formula = setOperator(formula, operatorList[3]);
      if(judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
        display.value = adjustResultForDisplay(inputResult);
      } else if(judgeComplexFormula.test(formula)){ //式の型：1(+|-|*|/)1(+|-|*|/)
        if(judgeFirstOperatorAddOrSub.test(formula)) { //式の型：1(+|-)1/
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = separatedOperand2;
          display.value = displayNineDigitOrLess(display.value);
        } else if(includeMultiOrDiv.test(formula)) { //式の型：1(*|/)1/
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
          display.value = displayNineDigitOrLess(display.value);
        }
      }
    }
  } else if(setOperand === 'on') { //数字入力済
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[3]}`;
    } else if((judgeComplexFormulaFirstOperatorMultiOrDiv.test(formula)) 
    || (judgeOneSideFormulaOperatorMultiOrDiv.test(formula))) { //乗算除算経由
      if(judgeOneSideFormula.test(formula)) {
        display.value = calcTypeOnce(formula, inputResult, operatorList[3]);
      } else if(judgeComplexFormula.test(formula)) {
        display.value = calcTypeNormalFlow(formula, inputResult, operatorList[3]);
      }
    } else if(includeAddOrSub.test(formula)) { //加算減算経由
      if(judgeOneSideFormula.test(formula)) {
        formula = `${formula}${inputResult}${operatorList[3]}`;
      } else if(judgeComplexFormula.test(formula)) { //複雑計算式
        if(lastOperatorAddOrSub.test(formula)) { 
          display.value = calcTypeFormulaOnly(formula, inputResult, operatorList[3]);
        } else if(lastOperatorMultiOrDiv.test(formula)) {
          display.value = calcTypeRightOnly(formula, inputResult, operatorList[3]);
        }
      }
    }
  }
  if(display.value === 'エラー') {
    resetOnError();
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();
  }
}

const setReEnter = () => {
  displayReset = 'on';
  setOperand = 'off';
}

const setOperator = (originFormula, operator) => {
  originFormula = originFormula.slice(0, -1);
  originFormula = `${originFormula}${operator}`;
  return originFormula;
}

const equal = (inputResult) => {
  if((display.value === 'エラー') || (formula === '')) {
    return;
  }
  inputResult = adjustOperand(inputResult);
  if(clickedEqual !== 'on') { //数字未入力の場合
    numStorage = inputResult;
  }
  if(setOperand === 'off') { //数字未入力の場合
    if(clickedEqual === 'on') {
      let [separatedOperand1, separatedOperator] = separateFormula(formula);
      display.value = calcTypeNormal(inputResult, separatedOperator, numStorage);
    } else {
      clickedEqual = 'on';
      if(judgeOneSideFormula.test(formula)){ //式の型：1(+|-|*|/)
        let [separatedOperand1, separatedOperator] = separateFormula(formula);
        display.value = calcTypeNormal(separatedOperand1, separatedOperator, inputResult);  
      } else {
        if(judgeFirstOperatorAddOrSub.test(formula)) {
          let secondOperator = formula.match(/(\+|\-|\*|\/)$/);
          display.value = calcTypeAllFromRight(formula, inputResult, secondOperator[0]);
        } else {
          let secondOperator = formula.match(/(\+|\-|\*|\/)$/);
          display.value = calcTypeNormalFlow(formula, inputResult, secondOperator[0]);
        }
      }
    }
  } else { //数字入力済の場合
    if(clickedEqual === 'on') { //計算式なし
      let [separatedOperand1, separatedOperator] = separateFormula(formula);
      display.value = calcTypeNormal(numStorage, separatedOperator, display.value);
    } else {
      clickedEqual = 'on';
      if(judgeOneSideFormula.test(formula)) {
        let [separatedOperand1, separatedOperator] = separateFormula(formula);
        display.value = calcTypeNormal(separatedOperand1, separatedOperator, inputResult);
      } else if(judgeComplexFormula.test(formula)) {
        if(judgeFirstOperatorAddOrSub.test(formula)) {
          let secondOperator = formula.match(/(\+|\-|\*|\/)$/);
          display.value = calcTypeAllFromRight(formula, inputResult, secondOperator[0]);
        } else {
          let secondOperator = formula.match(/(\+|\-|\*|\/)$/);
          display.value = calcTypeNormalFlow(formula, inputResult, secondOperator[0]);
        }
      }
    }
  }
  if(display.value === 'エラー') {
    resetOnError();
    return;
  } else {
    console.log(formula);
    setReEnter();
    displayFontSize(display.value);
    removeOperatorClassActive();
  }
}

const oneHundredth = (inputResult) => {
  try {
    if(display.value === 'エラー') {
      return;
    }
    clickedPercent = 'on';
    inputResult = adjustOperand(inputResult);
    inputResult = String(integerCalculation(inputResult, operatorList[3], '100'));
    let numDigit = String(inputResult).match(getOperandInteger);
    if(numDigit[0].length >= 4) {
      display.value = addComma(String(inputResult));
    } else {
      display.value = inputResult;
    }
    display.value = adjustResultForDisplay(display.value);
    if(checkNumLimit(display.value)) {
      throw new Error('エラー');
    } else {
      return;
    }
  } catch(error) {
    display.value = error.message;
  }
}

const changePlusMinus = (inputResult) => {
  if(display.value === 'エラー') {
    return;
  }
  if((setOperand === 'off') && (clickedEqual === 'off')) {
    inputResult = '0';
    displayReset = 'off';
  }
  if(/^\-/.test(inputResult)) {
    display.value = inputResult.slice(1);
  } else {
    display.value = `-${inputResult}`;
  }
  displayFontSize(display.value);
}

// 各種ボタン機能------------------------------------------------------
buttons.forEach((button, length) => {
  button.addEventListener('mousedown', () => {
    button.classList.remove('is-mouseUp');
    button.classList.add('is-mouseDown');
  });
});

buttons.forEach((button, length) => {
  button.addEventListener('mouseup', () => {
    button.classList.remove('is-mouseDown');
    button.classList.add('is-mouseUp');
    });
});

operatorButtons.forEach((operator, length) => {
  operator.addEventListener('mouseup', () => {
    removeOperatorClassActive();
    changeOperatorButtonStyle(operator);
  });
});

const changeOperatorButtonStyle = (operatorButton) => {
  operatorButton.classList.add('is-active');
}

buttonClear.addEventListener('click', () => {
  if(buttonClear.value !== 'C') { //数字未入力の場合
    allClear();
  } else {
    changeCharacterToAC();
    displayFontSize(display.value);
    setReEnter();
  }
});

const changeCharacterToAC = () => {
  display.value = '0';
  buttonClear.value = 'AC';
  buttonClear.style.padding = '14px 12px';
}

buttonPlusMinus.addEventListener('click', () => {
  changePlusMinus(display.value);
});

buttonPercent.addEventListener('click', () => {
  oneHundredth(display.value);
});


buttonDivision.addEventListener('click', () => {
  division(display.value);
});

buttonSeven.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonSeven.value);
});

buttonEight.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonEight.value);
});

buttonNine.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonNine.value);
});

buttonMultiplication.addEventListener('click', () => {
  multiplication(display.value);
});
buttonMultiplication.addEventListener('mouseup', () => {
  changeOperatorButtonStyle(buttonMultiplication);
});

buttonFour.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonFour.value);
});

buttonFive.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonFive.value);
});

buttonSix.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonSix.value);
});

buttonSubtraction.addEventListener('click', () => {
  subtraction(display.value);
});
buttonSubtraction.addEventListener('mouseup', () => {
  changeOperatorButtonStyle(buttonSubtraction);
});

buttonOne.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonOne.value);
});

buttonTwo.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonTwo.value);
});

buttonThree.addEventListener('click', () => {
  addDisplayNumber(display.value,buttonThree.value);
});

buttonAddition.addEventListener('click', () => {
  addition(display.value);
});
buttonAddition.addEventListener('mouseup', () => {
  changeOperatorButtonStyle(buttonAddition);
});

buttonZero.addEventListener('click', () => {
  addDisplayNumber(display.value, buttonZero.value);
});

buttonDecimal.addEventListener('click', () => {
    addDisplayNumber(display.value, buttonDecimal.value);
});

buttonEqual.addEventListener('click', () => {
  equal(display.value);
});