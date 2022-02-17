const deleteBtn = document.querySelector("[data-type=delete]");
const resetBtn = document.querySelector("[data-type=reset]");
const equalBtn = document.querySelector("[data-type=equal]");
const operatorBtns = document.querySelectorAll("[data-type=operator]");
const numberBtns = document.querySelectorAll("[data-type=number]");

const displayPrevious = document.querySelector("[data-display=previous]");
const displayCurrent = document.querySelector("[data-display=current]");


class Calculate {
  constructor(displayPrevious, displayCurrent) {
    this.displayPrevious = displayPrevious;
    this.displayCurrent = displayCurrent;
    this.clear ();
  }

  //displayes a number (toString method is used to prevent the default 
  //behavior of JS that would perform an addition operation on two numbers)
  appendNumber (number) {
    //prevents adding multiple dots
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //takes an operation symbol and performs it, if the user entered any value before
  //clicking on the operation button
  chooseOperation (operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  //perform calculation
  calculate () {
    let result;
    let firstValue = parseFloat(this.previousOperand);
    let secondValue = parseFloat(this.currentOperand);
    if (isNaN(firstValue) || isNaN(secondValue)) return;
    switch (this.operation) {
      case "+": result = firstValue + secondValue;
                break;
      case "-": result = firstValue - secondValue;
                break;
      case "×": result = firstValue * secondValue;
                      break;
      case "/": if(secondValue === 0){
                result = "You can't divide by 0!";
                break;
                }
                else {
                  result = firstValue / secondValue;
                  break;
                }

    }
    this.currentOperand = result;
    this.operation = null;
    this.previousOperand = "";
  }

  //update a field that displays entered data and result of the calculations
  updateDisplay () {
    this.displayCurrent.innerText = this.currentOperand;
    if(this.operation != null) {
      this.displayPrevious.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.displayPrevious.innerText = "";
    }
   
  }

  //deletes the last character
  delete () {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //clears the displayed field
  clear () {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

};


const calculator = new Calculate(displayPrevious, displayCurrent);

deleteBtn.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});

resetBtn.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

equalBtn.addEventListener("click", button => {
  calculator.calculate();
  calculator.updateDisplay();
});


operatorBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

numberBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});


