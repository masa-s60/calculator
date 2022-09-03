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

const operatorList = ['+', '-', '*', '/'];
let displayReset = '';
let formula = '';
let setOperand = 'off';
let numStorage = '';
let clickedEqual = 'off';

const getFirstOperandAndOperator = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)/;
const getExponentiationExcludedMinusAndDecimal = /\d+|e-*/;
const getSecondOperandAndOperator = /((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)$/;
const getOperandInteger = /^-*\d*/;
const getOperandDecimal = /\d*$/;
const getFirstAppearOneOver = /^-*0\.0+/;
const getExponentiation = /\d+$/;
const getAllocateExponentiation = /^-*\d+\.\d+/;
const judgeFirstOperandOnly = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))$/;
const judgeOneSideFormula = /^\-*(((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))|(\d+e\-*\d+))(\+|\-|\*|\/)$/;
const judgeSimpleFormula = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))$/;
const judgeOperatorAndSecondOperand  = /(\+|\-|\*|\/)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))$/;
const judgeMinusOperand  = /^\-/;
const judgeEndDecimal = /\.$/;
const judgeFirstOperatorDiv = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))\//;
const judgeFirstOperatorMulti = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))\*/;
const judgeComplexFormula = 
/^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)$/;
const judgeFirstOperatorMultiOrDiv =
/^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\*|\/)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)$/;
const judgeFirstOperatorAddOrSub =
/^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\*|\/)$/;
const includeAddOrSub = /\+|\-/;
const includeMultiOrDiv = /\*|\//;
const lastOperatorAddOrSub = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-)$/;
const lastOperatorMultiOrDiv = /^\-*((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\+|\-|\*|\/)((\d+|\d+\.\d+)|((\d+|\d+\.\d+)e\-*\d+))(\*|\/)$/;
const includeDecimal = /^(?=.*\.).*$/;
const includeFinalZero = /0+$/;
// return (Function('return ('+strFormula+');')() / fixOperand);
// -----------------------------------------------------------------------


// 数値区切り関数---------------------------------------------------------------
const addComma = (displayNum) => {
  if(includeDecimal.test(displayNum)) {
    let integer = displayNum.substr(0, displayNum.indexOf('.'));
    let float = displayNum.substr(displayNum.indexOf('.') + 1)
    display.value = checkDigit(integer);
    if (includeDecimal.test(display.value)) {
      return display.value + float;
    } else {
      return display.value + '.' + float;
    }
  } else {
    displayNum = displayNum.replace(/,/g, '');
    return checkDigit(displayNum);
  }
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
  if(displayReset === 'on') { //オペレーター押下後、もしくは初回入力
    display.value = '0';
    displayNum = '0';
    displayReset = 'off';
  }
  displayNum = removeComma(displayNum);
  if(displayNum.replace(/\./g, '').length >= 9) {
    return;
  } else {
    input(clickNumber);
    display.value = addComma(display.value);
    setOperand = 'on';
  }
}

  // if(inputNumber === isNaN(inputNumber)) {
  //   inputNumber = String(inputNumber);
  // }

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
    if(/^0$/.test(display.value)) { 
      display.value = display.value.replace(/^0/, ''); //数字初回入力時の表示0削除
    }
  display.value = `${display.value}${addNumber}`;
  }
}

// 式分離関数---------------------------------------------------------------
const sliceFormulaOneSide = (originFormula) => {
  let slicedOperand = originFormula.slice(0, -1);
  let slicedOperator = originFormula.slice(-1);
  return [slicedOperand, slicedOperator];
}

const sliceFormulaAll = (originFormula) => {
  let operand1AndOperator1 = originFormula.match(getFirstOperandAndOperator);
  let operand2AndOperator2 = originFormula.match(getSecondOperandAndOperator);
  let [operand1, operator1] = sliceFormulaOneSide(operand1AndOperator1[0]);
  let [operand2, operator2] = sliceFormulaOneSide(operand2AndOperator2[0]);
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
  } else if(judgeMinusOperand.test(midwayFormula)) { //-1-1-型
    midwayFormula = midwayFormula.slice(1);
    let [firstOperand, firstOperator, secondOperand, secondOperator]
    = sliceFormulaAll(midwayFormula);
    firstOperand = `${operatorList[1]}${firstOperand}`;
    return [firstOperand, firstOperator, secondOperand, secondOperator];
  } else if(judgeComplexFormula.test(midwayFormula)) { //1+1+型
    return sliceFormulaAll(midwayFormula);
  }
}
//-------------------------------------------------------------------------------------------

// 計算用関数　-----------------------------------------------------------------------------
const calcTypeOnce = (originFormula, inputNum, operator) => {
  let [separatedOperand, separatedOperator] = separateFormula(originFormula);
  display.value = String(calculation(separatedOperand, separatedOperator, inputNum));
  if(display.value === `エラー`) {
    return display.value;
  } else {
    formula = `${formula}${inputNum}${operator}`;
    return adjustResultForDisplay(display.value);
  }
}

const calcTypeNormalFlow = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand1, separatedOperator1, separatedOperand2));
  display.value = String(calculation(separatedOperand2, separatedOperator2, inputNum));
  if(display.value === `エラー`) {
    return display.value;
  } else {
    if(clickedEqual === 'on') {
      formula = `${display.value}${lastOperator}`;
      return adjustResultForDisplay(display.value);  
    } else {
      formula = `${separatedOperand2}${separatedOperator2}${inputNum}${lastOperator}`;
      return adjustResultForDisplay(display.value);  
    }
  }
}

const calcTypeRightOnly = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand2, separatedOperator2, inputNum));
  if(separatedOperand2 === `エラー`) {
    display.value = `エラー`;
    return display.value;
  } else {
    formula = `${separatedOperand1}${separatedOperator1}${separatedOperand2}${lastOperator}`;
    return adjustResultForDisplay(separatedOperand2); //右辺の計算結果を表示
  }
}

const calcTypeFormulaOnly = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand1, separatedOperator1, separatedOperand2));
  if(separatedOperand2 === `エラー`) {
    display.value = `エラー`;
    return display.value;
  } else {
  formula = `${separatedOperand2}${separatedOperator2}${inputNum}${lastOperator}`;
  return adjustResultForDisplay(inputNum); //入力数値をreturn
  }
}

const calcTypeAllFromRight = (originFormula, inputNum, lastOperator) => {
  let [separatedOperand1, separatedOperator1, separatedOperand2, separatedOperator2]
  = separateFormula(originFormula);
  separatedOperand2 = String(calculation(separatedOperand2, separatedOperator2, inputNum));
  display.value = String(calculation(separatedOperand1, separatedOperator1, separatedOperand2));
  if(display.value === `エラー`) {
    return display.value;
  } else {
    if(clickedEqual === 'on') {
      formula = `${display.value}${lastOperator}`;
      return adjustResultForDisplay(display.value);
    } else {
      formula = `${separatedOperand1}${separatedOperator1}${separatedOperand2}${lastOperator}`;
      return adjustResultForDisplay(display.value);  
    }
  }
}

const getDecimalPosition = (operand) => {
  if(includeDecimal.test(formula)) {
    let decimal = operand.substr(operand.indexOf('.') + 1);
    let decimalPosition = decimal.length; 
    return decimalPosition; 
  } else {
    return 1;
  }
}

const removeErrorDecimal = (operand, decimalVolume1, decimalVolume2) => {
  let operandFromDecimal = operand.match(getOperandDecimal);
  let errorDecimal = operandFromDecimal[0].slice(decimalVolume1 + decimalVolume2, operand.length);
  return operand.replace(errorDecimal, '');
}

const calculation = (strFirstOperand, operator, strSecondOperand) => {
  try {
    if(operator === '/') { //除算の場合
      // strFirstOperand = '1e-99';
      // operator = '*';
      // strSecondOperand = '10';
      let calcResult = String(Function('return ('+`${strFirstOperand}${operator}${strSecondOperand}`+');')());
      calcResult = exponentiationDecimalRound(calcResult);
      if((!/\d/.test(Number(calcResult)) || (Number(calcResult) > 9e160) || (Number(calcResult) < 1e-100))) { //エラー表示の場合
        allClear();
        throw 'エラー';
      } else {
        return calcResult;
      }
    } else { //除算以外の場合
      if((includeDecimal.test(strFirstOperand)) || (includeDecimal.test(strSecondOperand)) || (includeDecimal.test(display.value))) {
        let firstOperandDecimalVolume = getDecimalPosition(strFirstOperand);
        let secondOperandDecimalVolume = getDecimalPosition(strSecondOperand);
        let [fixedOperator, fixedSecondOperand] = fixOperator(operator, strSecondOperand);
        let calcResult = String(Function('return ('+`${strFirstOperand}${fixedOperator}${fixedSecondOperand}`+');')());
        if(includeDecimal.test(calcResult)) {
          calcResult = removeErrorDecimal(calcResult, firstOperandDecimalVolume, secondOperandDecimalVolume);
        }
        return String(Number(calcResult)); //小数点以下、末尾0削除
      } else {
        let [fixedOperator, fixedSecondOperand] = fixOperator(operator, strSecondOperand);
        return String(Function('return ('+`${strFirstOperand}${fixedOperator}${fixedSecondOperand}`+');')());
      }
    }
  } catch(error) {
    return error;
  }
}

//-------------------------

const adjustResultForDisplay = (calcResult) => {
  calcResult = '-1.2332e-9';
  if(!/\d/.test(Number(calcResult))) { //エラー時
    return calcResult;
  } else { //正規数値の取得時
    if(/e/.test(calcResult)) {
      if(/\+/.test(calcResult)) {
        calcResult = calcResult.replace('+', '');
      }
      let displayDigit = calcResult.match(getExponentiationExcludedMinus);
      if(Number(displayDigit[0].length) >= 9) {
        calcResult = exponentiationDecimalRound(calcResult);
      }
    } else {
      if(((Number(calcResult) < 0.00000001) && (Number(calcResult) > 0)) ||
      ((Number(calcResult) < 0) && (Number(calcResult) > -0.00000001))) {
        calcResult = exponentiationOneBillionth(calcResult);
      } else if((Number(calcResult) > 999999999) || (Number(calcResult) < -999999999)) {
        calcResult = exponentiationBillion(calcResult);
      } else {
        calcResult = decimalRound(calcResult);
        calcResult = addComma(calcResult);
      }
      return calcResult;
    }
  }
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
  let integer = calcResult.match(getOperandInteger);
  if(Number(exponentiation[0]) <= 8) {
    // calcResult = Number(calcResult).toFixed(Number(exponentiation[0]));
    return calcResult;
  } else {
    let displayDecimal = '';
    let allocateExponentiation = calcResult.match(getAllocateExponentiation);
    exponentiation[0] = calcResult.match(/e\-*\d+/);
    if(judgeMinusOperand.test(allocateExponentiation[0])) {
      displayDecimal = 9 - integer[0].length - exponentiation[0].length + 1;
    } else {
      displayDecimal = 9 - integer[0].length - exponentiation[0].length;
    }
    calcResult = Number(allocateExponentiation[0]).toFixed(displayDecimal);
    calcResult = String(Number(calcResult));
    return `${calcResult}${exponentiation[0]}`;
  }
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
  calcResult = ''
  let exponentiation = '';
  let integer = calcResult.match(getOperandInteger);
  if(judgeMinusOperand.test(integer[0])) {
    exponentiation = `e${integer[0].length - 2}`;
    calcResult = Number(integer[0]) / Math.pow(10, (integer[0].length - 2));
  } else {
    exponentiation = `e${integer[0].length - 1}`;
    calcResult = Number(integer[0]) / Math.pow(10, (integer[0].length - 1));
  }
  let displayDecimal = 8 - exponentiation.length;
  calcResult = Number(calcResult).toFixed(displayDecimal);
  calcResult = String(Number(calcResult));
  return `${String(calcResult)}${exponentiation}`;
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

// -------------------------------------------------------------------------------------------

const allClear = () => {
  operator = '';
  displayReset = '';
  display.value = '0';
  setOperand = 'off';
  formula = '';
  numStorage = '';
  clickedEqual = 'off';
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

const addition = (inputResult) => {
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
  }
  if(setOperand === 'off') { //数字未入力の場合
    if(formula === '') { //計算式なし
      formula = `0${operatorList[0]}`;
    } else { //計算式あり
      formula = changeOperator(formula, operatorList[0]); //演算子変更
      if (judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
        display.value = adjustOperand(display.value); //404行目のエラー対策として、未計算でも文字形式を計算用へ置換
      } else if(judgeComplexFormula.test(formula)) { //式の型：1(+|-|*|/)1(+|-|*|/)
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
        = separateFormula(formula);
        display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
      }
      display.value = adjustResultForDisplay(display.value);
    }
  } else { //数字入力済
    inputResult = adjustOperand(inputResult);
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
        if(judgeFirstOperatorMultiOrDiv.test(formula)) { //式の型：1(*|/)1(+|-|*|/)
          display.value = calcTypeNormalFlow(formula, inputResult, operatorList[0]);
        } else if(judgeFirstOperatorAddOrSub.test(formula)) { //式の型：1(+|-)1(+|-|*|/)
          display.value = calcTypeAllFromRight(formula, inputResult, operatorList[0]);
        }
      }
    }
  }
  if(display.value === `エラー`) {
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();  
  }
}

const subtraction = (inputResult) => {
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
  }
  if(setOperand === 'off') { //数字未入力の場合
    if(formula === '') { //計算式なし
      formula = `0${operatorList[1]}`;
    } else { //計算式あり
      formula = changeOperator(formula, operatorList[1]);
      if (judgeOneSideFormula.test(formula)) { //式の型：1+|-|*|/
        display.value = adjustOperand(display.value);
      } else if(judgeComplexFormula.test(formula)) {
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] = separateFormula(formula);
        display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
      }
      display.value = adjustResultForDisplay(display.value);
    }
  } else { //数字入力済
    inputResult = adjustOperand(inputResult);
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
        if(judgeFirstOperatorMultiOrDiv.test(formula)) {
          display.value = calcTypeNormalFlow(formula, inputResult, operatorList[1]);
        } else if(judgeFirstOperatorAddOrSub.test(formula)) {
          display.value = calcTypeAllFromRight(formula, inputResult, operatorList[1]);
        }
      }
    }
  }
  if(display.value === `エラー`) {
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();
  }
}

const multiplication = (inputResult) => {
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
  }
  if(setOperand === 'off') { //数字未入力
    if(formula === '') { //初回未入力でのオペレーター押下
      formula = `0${operatorList[2]}`;
    } else { //計算中、数字未入力でのオペレーター押下
      formula = changeOperator(formula, operatorList[2]);
      if(judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
        display.value = adjustOperand(display.value);
      } else if(judgeComplexFormula.test(formula)){ //計算式完成後
        if(includeAddOrSub.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = separatedOperand2;
        } else if(includeMultiOrDiv.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
        }
      }
      display.value = adjustResultForDisplay(display.value);
    }
  } else if(setOperand === 'on') { //数字入力済
    inputResult = adjustOperand(inputResult);
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[2]}`;
    } else if(!includeAddOrSub.test(formula)) { //乗算除算経由
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
  if(display.value === `エラー`) {
    return;
  } else {
    console.log(formula);
    numStorage = inputResult;
    setReEnter();
  }
}

const division = (inputResult) => {
  if(clickedEqual === 'on') {
    clickedEqual = 'off';
  }
  if(setOperand === 'off') { //数字未入力
    if(formula === '') { //初回未入力でのオペレーター押下
      formula = `0${operatorList[3]}`;
    } else { //計算中、数字未入力でのオペレーター押下
      formula = changeOperator(formula, operatorList[3]);
      if(judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
        display.value = adjustOperand(display.value);
      } else if(judgeComplexFormula.test(formula)){ //計算式完成後
        if(includeAddOrSub.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = separatedOperand2;
        } else if(includeMultiOrDiv.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = String(calculation(separatedOperand1, separatedOperator, separatedOperand2));
        }
      }
      display.value = adjustResultForDisplay(display.value);
    }
  } else if(setOperand === 'on') { //数字入力済
    inputResult = adjustOperand(inputResult);
    if(formula === '') { //初回押下
      formula = `${inputResult}${operatorList[3]}`;
    } else if(!includeAddOrSub.test(formula)) { //乗算除算経由
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
  if(display.value === `エラー`) {
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

const changeOperator = (originFormula, setOperator) => {
  originFormula = originFormula.slice(0, -1);
  originFormula = `${originFormula}${setOperator}`;
  return originFormula;
}

const equal = (inputResult) => {
  inputResult = adjustOperand(inputResult);
  if(clickedEqual !== 'on') { //計算式入力後の初回イコールクリック時のみ、表示の数値を保存
    numStorage = inputResult;
  }
  clickedEqual = 'on';
  if(setOperand === 'off') { //数字未入力の場合
    if(formula === '') { //計算式なし
      return;
    } else { //計算式あり
      if(judgeFirstOperandOnly.test(formula)) {
        return;
      } else if(judgeOneSideFormula.test(formula)) { //式の型：1(+|-|*|/)
          let [separatedOperand1, separatedOperator] = separateFormula(formula);
          display.value = String(calculation(separatedOperand1, separatedOperator, numStorage));
          formula = `${display.value}${separatedOperator}`;
          display.value = adjustResultForDisplay(display.value);
      // } else if(judgeSimpleFormula.test(formula)) { //式の型：1(+|-|*|/)1
      //     let [separatedOperand1, separatedOperator, separatedOperand2] = separateFormula(formula);
      //     display.value = String(calculation(separatedOperand1, separatedOperator, numStorage));
      //     formula = `${display.value}${separatedOperator}`;
      //     display.value = adjustResultForDisplay(display.value);
      } else if(judgeComplexFormula.test(formula)) { //式の型：1(+|-|*|/)1(+|-|*|/)
        if(judgeFirstOperatorAddOrSub.test(formula)) {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = calcTypeAllFromRight(formula, inputResult, separatedOperator2);
        } else {
          let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
          = separateFormula(formula);
          display.value = calcTypeNormalFlow(formula, inputResult, separatedOperator2);
        }
      }
    }
  } else { //数字入力済の場合
    if(judgeOneSideFormula.test(formula)) {
      let [separatedOperand1, separatedOperator] = separateFormula(formula);
      display.value = String(calculation(separatedOperand1, separatedOperator, inputResult));
      display.value = adjustResultForDisplay(display.value);
      formula = `${display.value}${separatedOperator}`;
    } else if(judgeComplexFormula.test(formula)) {
      if(judgeFirstOperatorAddOrSub.test(formula)) {
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
        = separateFormula(formula);
        display.value = calcTypeAllFromRight(formula, inputResult, separatedOperator2);
      } else {
        let [separatedOperand1, separatedOperator, separatedOperand2, separatedOperator2] 
        = separateFormula(formula);
        display.value = calcTypeNormalFlow(formula, inputResult, separatedOperator2);
      }
    }
  }
  console.log(formula);
  setReEnter();
}

buttonAllClear.addEventListener('click', () => {
  allClear();
});

buttonPlusMinus.addEventListener('click', () => {
  adjustResultForDisplay(display.value);
});

buttonPercent.addEventListener('click', () => {
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

buttonZero.addEventListener('click', () => {
  addDisplayNumber(display.value, buttonZero.value);
});

buttonDecimal.addEventListener('click', () => {
    addDisplayNumber(display.value, buttonDecimal.value);
});

buttonEqual.addEventListener('click', () => {
  equal(display.value);
});