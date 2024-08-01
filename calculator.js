document.addEventListener('DOMContentLoaded', function(){
  var switchCalc = false;
  const buttonOnOff = document.querySelector('.on-off-symb');
  var displayContent = document.querySelector('.calc-display');
  const clearButton = document.querySelector('.c-symb');
  const plusMinus = document.querySelector('.plus-minus-symb');
  const deleteSymb = document.querySelector('.delete-symb');
  const dotSymbol = document.querySelector('.dot-symb')
  var numberButton = document.querySelectorAll('.number');
  function clearDisplay(){
    displayContent.textContent = '0';
  }

  function deleteLastSymbol(){
    if(displayContent.textContent !== '0'){
      if(displayContent.textContent.length == 1){
        displayContent.textContent = '0';
      }else{
        displayContent.textContent = displayContent.textContent.slice(0, -1);
      }
    }
  }

  function addSymbol(event){
    if(displayContent.textContent === '0'){
      displayContent.textContent = event.target.textContent;
    }else{
      if(Number(displayContent.textContent <= 999999999 ) && Number(displayContent.textContent >= 999999999*(-1)) && displayContent.textContent.length < 11){
        displayContent.textContent += event.target.textContent 

      }
    }    
  }
  function changeSign(){
    displayContent.textContent = Number(displayContent.textContent)*(-1);
  }

  function addDot(){
    console.log('dot')
    console.log(displayContent.textContent)
    console.log(displayContent.textContent.includes('.'))
    if (displayContent.textContent.includes('.')) {
      displayContent.textContent += '.';
      console.log(displayContent.textContent);
    }
  }

  function addEventListeners() {
    clearButton.addEventListener('click', clearDisplay);
    deleteSymb.addEventListener('click', deleteLastSymbol);
    numberButton.forEach(item => item.addEventListener('click', addSymbol));
    plusMinus.addEventListener('click', changeSign);
    dotSymbol.addEventListener('click', addDot);
  }

  function removeEventListeners() {
    clearButton.removeEventListener('click', clearDisplay);
    deleteSymb.removeEventListener('click', deleteLastSymbol);
    numberButton.forEach(item => item.removeEventListener('click', addSymbol));
    plusMinus.removeEventListener('click', changeSign);
    dotSymbol.removeEventListener('click', addDot);
  }


  buttonOnOff.addEventListener('click', function(){
    if(switchCalc){
      switchCalc = false;
      displayContent.textContent = '';
      removeEventListeners();      
    }else{
      switchCalc = true;
      displayContent.textContent = '0';
      addEventListeners();
    }
  });
});