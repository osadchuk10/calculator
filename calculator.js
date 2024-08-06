document.addEventListener('DOMContentLoaded', function () {
  var switchCalc = false;
  const buttonOnOff = document.querySelector('.on-off-symb');
  var displayContent = document.querySelector('.calc-display');
  const clearButton = document.querySelector('.c-symb');
  const plusMinus = document.querySelector('.plus-minus-symb');
  const deleteSymb = document.querySelector('.delete-symb');
  const dotSymbol = document.querySelector('.dot-symb');
  const plusButton = document.querySelector('.plus-symb');
  const minusButton = document.querySelector('.minus-symb');
  const multiplyButton = document.querySelector('.multiply-symb');
  const divideButton = document.querySelector('.divide-symb');
  const equalButton = document.querySelector('.equal-symb');
  const mathOperators = document.querySelectorAll('.calc-operation');
  var numberButton = document.querySelectorAll('.number');
  let firstValue = '';
  let secondValue = '';
  let currentOperation = '';
  let isBlinking = false;
  let isSecondNumber = false;
  let result = 0;



  function clearDisplay() {
    displayContent.textContent = '0';
    firstValue = '';
    secondValue = '';
    currentOperation = '';
    isBlinking = false;
    isSecondNumber = false;
  }

  function deleteLastSymbol() {
    if (displayContent.textContent !== '0') {
      if (displayContent.textContent.length == 1) {
        displayContent.textContent = '0';
      } else {
        displayContent.textContent = displayContent.textContent.slice(0, -1);
      }
    }
  }

  function addSymbol(event) {
    if (displayContent.textContent === '0' || isBlinking) {
      displayContent.textContent = event.target.textContent;
      isBlinking = false;
      isSecondNumber = true;
    } else {
      if (Number(displayContent.textContent <= 999999999) && Number(displayContent.textContent >= 999999999 * (-1)) && displayContent.textContent.length < 11) {
        if (event.target.textContent != '.') {
          displayContent.textContent += event.target.textContent;
        }
      }
    }
  }


  function changeSign() {
    displayContent.textContent = Number(displayContent.textContent) * (-1);
  }

  function addDot() {

    if (!displayContent.textContent.includes('.')) {
      displayContent.textContent += '.';
    }
  }

  function calculateValue() {
    if(currentOperation && isSecondNumber){
      secondValue = displayContent.textContent;
      switch(currentOperation){
        case '+':
          result = Number(firstValue) + Number(secondValue);
          break;
        case '-':
          result = Number(firstValue) - Number(secondValue);
          break;
        case '/':
          result = Number(firstValue) / Number(secondValue);
          break;
        case '*':
          result = Number(firstValue) * Number(secondValue);
          break;
      }
      displayContent.textContent = result;
      isSecondNumber = false;
      secondValue = '';
      firstValue = result;
      currentOperation = '';

    }

  }

  function blinkAnimation(event) {
    const display = document.querySelector('.calc-display');
    display.classList.add('blink');

    display.addEventListener('animationend', () => {
      display.classList.remove('blink');
      if (!currentOperation) {
        firstValue = display.textContent;
        currentOperation = event.target.getAttribute('data-operator');
      } else if (isSecondNumber) {
        calculateValue();
        currentOperation = event.target.getAttribute('data-operator');
      }
      isBlinking = true;
    }, { once: true });
  }

  function addEventListeners() {
    clearButton.addEventListener('click', clearDisplay);
    deleteSymb.addEventListener('click', deleteLastSymbol);
    numberButton.forEach(item => item.addEventListener('click', addSymbol));
    mathOperators.forEach(item => item.addEventListener('click', blinkAnimation));
    plusMinus.addEventListener('click', changeSign);
    dotSymbol.addEventListener('click', addDot);
    equalButton.addEventListener('click', calculateValue);
  }

  function removeEventListeners() {
    clearButton.removeEventListener('click', clearDisplay);
    deleteSymb.removeEventListener('click', deleteLastSymbol);
    numberButton.forEach(item => item.removeEventListener('click', addSymbol));
    mathOperators.forEach(item => item.removeEventListener('click', blinkAnimation));
    plusMinus.removeEventListener('click', changeSign);
    dotSymbol.removeEventListener('click', addDot);
    equalButton.removeEventListener('click', calculateValue);
  }

  buttonOnOff.addEventListener('click', function () {
    if (switchCalc) {
      switchCalc = false;
      displayContent.textContent = '';
      removeEventListeners();
    } else {
      switchCalc = true;
      displayContent.textContent = '0';
      addEventListeners();
    }
  });

});