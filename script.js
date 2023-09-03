const add = (a, b) => a + b,
  subtract = (a, b) => a - b,
  multiply = (a, b) => a * b,
  divide = (a, b) => a / b;

let operator = null,
  firstNumber = null,
  secondNumber = null;

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
};

const numberButtons = document.querySelectorAll("button.number"),
  operatorButtons = document.querySelectorAll("button.operator"),
  topScreen = document.getElementById("top"),
  bottomScreen = document.getElementById("bottom"),
  deleteButton = document.getElementById("delete"),
  equalButton = document.getElementById("equal"),
  clearButton = document.getElementById("clear"),
  dotButton = document.getElementById("dot");

function onClickDot() {
  if (!bottomScreen.textContent.includes(".")) {
    bottomScreen.textContent += this.textContent;
  }
}

function onClickClear() {
  operator = null;
  firstNumber = null;
  secondNumber = null;
  bottomScreen.textContent = "0";
  topScreen.textContent = "";
}

function onClickEqual() {
  getResult(true);
}

function getResult(displaySummary) {
  if (bottomScreenFlag || operator === null) return;
  secondNumber = bottomScreen.textContent;
  if (operator === "÷" && (firstNumber === "0" || secondNumber === "0")) {
    const a = document.createElement("a");
    a.href = "https://en.wikipedia.org/wiki/Division_by_zero";
    a.target = "_blank";
    if (window.confirm("You can't do that, wanna see why?")) a.click();
    onClickClear();
    return;
  }

  let result = operate(
    operator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );

  if (result - Math.floor(result) !== 0) {
    result = result.toPrecision(5);
  }

  bottomScreen.textContent = result;
  if (displaySummary) {
    topScreen.textContent = `${firstNumber} ${operator} ${secondNumber} = `;
  }
  operator = null;
}

function onClickNumber() {
  if (bottomScreen.textContent === "0" || bottomScreenFlag) {
    bottomScreen.textContent = "";
    bottomScreenFlag = false;
  }
  bottomScreen.textContent += this.textContent;
}

function onClickDelete() {
  bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
}

let bottomScreenFlag = false;
function onClickOperator() {
  if (bottomScreen.textContent === "0") return;
  if (operator !== null) {
    getResult();
  }
  firstNumber = bottomScreen.textContent;
  operator = this.textContent;
  topScreen.textContent = `${firstNumber} ${operator}`;
  bottomScreenFlag = true;
  console.table({ firstNumber, operator, secondNumber, bottomScreenFlag });
}

numberButtons.forEach((button) => {
  button.onclick = onClickNumber;
});
operatorButtons.forEach((button) => {
  button.onclick = onClickOperator;
});

deleteButton.onclick = onClickDelete;

equalButton.onclick = onClickEqual;
clearButton.onclick = onClickClear;
dotButton.onclick = onClickDot;
