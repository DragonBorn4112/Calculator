//GLOBAL VARIABLE START

let currentNum = "";
let previousNum = "";
let operator = "";

//CURRENT DISPLAY NUMBER START

const currentDisplayNumber = document.querySelector('.currentNumber');

//CURRENT DISPLAY NUMBER END

//PREVIOUS DISPLAY NUMBER START

const previousDisplayNumber = document.querySelector('.previousNumber');

//PREVIOUS DISPLAY NUMBER END

//ADD KEYPRESS START

window.addEventListener('keydown', handleKeyPress);

//ADD KEYPRESS END

//EQUAL START

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
  if(currentNum != "" && previousNum != ""){
    calculate();
  }
});

//EQUAL END

//DECIMAL START

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
  addDecimal();
});

//DECIMAL END

//CLEAR START

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCalulator);

//CLEAR END

//NUMBER BUTTONS START

const numberButtons = document.querySelectorAll('.number');

//NUMBER BUTTONS END

//OPERATORS START

const operators = document.querySelectorAll('.operator');

//OPERATORS END

//GLOBAL VARIABLE END

//BUTTONS START

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number){
  if(previousNum !== "" && currentNum !== "" && operator === ""){
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;

  }
  if(currentNum.length <= 11){
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

//BUTTONS END

//OPERATORS START

operators.forEach((btn) => {
  btn.addEventListener("click", (e) =>{
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op){
  if(previousNum === ""){
    previousNum = currentNum;
    operatorCheck(op);
  } else if(currentNum === ""){
    operatorCheck(op);
  }
  else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = 0;
    previousDisplayNumber.textContent = previousNum + " " + operator;
  }
}

//OPERATORS END

//OPERATOR CHECK START

function operatorCheck(text){
  operator = text;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentDisplayNumber.textContent = "";
  currentNum = "";
}

//OPERATOR CHECK END

//EQUAL START

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if(operator === "+"){
    previousNum += currentNum;
  }

  else if(operator === "-"){
    previousNum -= currentNum;
  }

  else if(operator === "*"){
    previousNum *= currentNum;
  }

  else if(operator === "/"){
  if(currentNum <= 0){
    previousNum = "Error"
    displayResults();
    return;
  }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();

}

//EQUAL END

//ROUND NUMBER START

function roundNumber(num) {
  return Math.round(num * 100000) / 100000
}

//ROUND NUMBER END

//FIX NUMBER RANGE START

function displayResults() {
  if(previousNum.length <= 11){
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0,11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

//FIX NUMBER RANGE END

//CLEAR START

function clearCalulator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDisplayNumber.textContent = 0;
  previousDisplayNumber.textContent = "";
}

//CLEAR END

//ADD DECIMAL START

function addDecimal() {
  if(!currentNum.includes(".")){
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

//ADD DECIMAL END

//KEYPRESS START

function handleKeyPress(e){
  e.preventDefault();
  if(e.key >= 0 && e.key <= 9){
    handleNumber(e.key);
  }
  if(e.key === "Enter" || e.key === "=" && currentNum != "" && previousNum != ""){
    calculate();
  }
  if(e.key === "+" || e.key === "-" || e.key === "/"){
    handleOperator(e.key)
  }
  if(e.key === "*" || e.key === "x"){
    handleOperator("*");
  }
  if(e.key === ".") {
    addDecimal();
  }
  if(e.key === "Backspace"){
    handleDelete();
  }
}

//KEYPRESS END

//DELETE START

function handleDelete() {
  if(currentNum != ""){
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if(currentNum === ""){
      currentDisplayNumber.textContent = 0;
    }
  }
  if(currentNum === "" && previousNum !== "" && operator === ""){
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}

//DELETE END