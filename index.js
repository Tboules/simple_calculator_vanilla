class Calculator {
  constructor(total, temp) {
    (this.total = total), (this.temp = temp);
    this.clear();
  }

  clear() {
    this.curTotal = "";
    this.curTemp = "";
    this.curOp = undefined;
  }

  delete() {
    if (this.curTemp.length != 0) {
      this.curTemp = this.curTemp.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === "." && this.curTemp.includes(".")) return;
    this.curTemp = this.curTemp.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.curOp !== undefined) {
      this.compute();
      this.curTotal += " " + operation;
    } else {
      this.curTotal = this.curTemp + " " + operation;
    }
    this.curOp = operation;
    this.curTemp = "";
  }

  compute() {
    const operations = {
      "+": (x, y) => x + y,
      "-": (x, y) => x - y,
      "/": (x, y) => x / y,
      "*": (x, y) => x * y,
    };
    let totalNum = this.curTotal.split(" ")[0];

    this.curTotal = operations[this.curOp](
      Number(totalNum),
      Number(this.curTemp)
    );
    this.curTemp = "";
  }

  updateDisplay() {
    this.temp.innerText = this.curTemp;
    this.total.innerText = this.curTotal;
  }
}

const total = document.getElementById("total");
const temp = document.getElementById("temp");

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const allClear = document.querySelector("[data-all-clear]");
const remove = document.querySelector("[data-delete]");
const equals = document.querySelector("[data-equals]");

const calc = new Calculator(total, temp);

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    calc.appendNumber(num.innerText);
    calc.updateDisplay();
  });
});

remove.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});

allClear.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    calc.chooseOperation(operation.innerText);
    calc.updateDisplay();
  });
});

equals.addEventListener("click", () => {
  calc.compute();
  calc.updateDisplay();
});
