const display = document.getElementById("display");
const numberBtn = document.querySelectorAll(".btn.number");
const operatorBtn = document.querySelectorAll(".btn.operator");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");
const dotBtn = document.getElementById('dot');
const backspaceBtn = document.getElementById("backspace");

backspaceBtn.addEventListener("click", () => {
  if (resetDisplay) return;

  display.textContent = display.textContent.slice(0, -1) || '0';

  
  dotBtn.disabled = display.textContent.includes('.');
});


let firstNumber = '';
let operator = null;
let secondNumber = '';
let resetDisplay = false;

numberBtn.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));

});

function appendNumber(number){
    if(display.textContent === '0' || resetDisplay){
        display.textContent = number;
        resetDisplay = false;
    }else{
        display.textContent += number;
    }

    dotBtn.disabled = display.textContent.includes('.');
}

operatorBtn.forEach(button => {
  button.addEventListener('click',() => {

    if (operator !== null && !resetDisplay){
      secondNumber = display.textContent;

      const value = operate(operator,firstNumber,secondNumber);
      
      display.textContent = value;
      firstNumber = value;
    }else {
      firstNumber = display.textContent;
    }

  operator = button.textContent;
  resetDisplay = true;
  dotBtn.disabled = false; 
  });
} );

equalsBtn.addEventListener('click', () => {
  if (operator == null || resetDisplay) return;

  secondNumber = display.textContent;

  const result = operate(operator,firstNumber,secondNumber);
  display.textContent = result;

  firstNumber = result;
  operator = null;
  resetDisplay = true;
})

clearBtn.addEventListener("click", clearCalculator);

function clearCalculator() {
  display.textContent = '0';    
  firstNumber = '';             
  secondNumber = '';            
  operator = null;              
  resetDisplay = false;         
}

dotBtn.addEventListener('click', appendDot);

function appendDot() {
  if (resetDisplay){
    display.textContent = '0';
    resetDisplay = false;
  }

  if(!display.textContent.includes('.')){
    display.textContent += '.';
  }

  if (display.textContent.includes('.')) {
    dotBtn.disabled = true;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Can't divide by zero!";
  }
  return a / b;
}


function operate(operator,a,b){
    a = Number(a);
    b = Number(b);

    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}