class Calculator {
  constructor(previousNumberText, currentNumberText) {
    this.currentNumberText = currentNumberText;
    this.previousNumberText = previousNumberText;
    this.clear();
  }
  

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operation = undefined;
  }

  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentNumber.includes(".")) {
      return;
    }
    this.currentNumber = this.currentNumber.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentNumber === "") return;
    if (this.previousNumber !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousNumber);
    const curr = parseFloat(this.currentNumber);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;

      default:
        return;
    }
    this.previousNumber = "";
    this.operation = undefined;
    this.currentNumber = computation;
  }

  updateScreen() {
    this.currentNumberText.innerText = this.currentNumber;
    if (this.previousNumber != null) {
      this.previousNumberText.innerText = `${this.previousNumber} ${this.operation}`;
    }
  }
}

// Selecting DOM elements
const numberBtns = document.querySelectorAll("[data-number]");
const operandBtns = document.querySelectorAll("[data-operand]");
const equalsBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousNumberText = document.querySelector("[data-previous-entry]");
const currentNumberText = document.querySelector("[data-current-entry]");

// Create a calculator
const calculator = new Calculator(previousNumberText, currentNumberText);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateScreen();
  });
});

operandBtns.forEach((sign) => {
  sign.addEventListener("click", () => {
    calculator.chooseOperation(sign.innerText);
    calculator.updateScreen();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateScreen();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateScreen();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateScreen();
});
