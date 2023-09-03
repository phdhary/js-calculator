const add = (a, b) => a + b,
  subtract = (a, b) => a - b,
  multiply = (a, b) => a * b,
  divide = (a, b) => a / b;

let operator = null,
  firstNumber = null,
  secondNumber = null,
  shouldClearBottomScreen = false;

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

function divideByZero() {
  const a = document.createElement("a");
  a.href = "https://en.wikipedia.org/wiki/Division_by_zero";
  a.target = "_blank";
  if (window.confirm("You can't do that, wanna see why?")) a.click();
  onClickClear();
  return;
}

function getResult(displaySummary) {
  if (shouldClearBottomScreen || operator === null) return;

  secondNumber = bottomScreen.textContent;

  if (operator === "÷" && (firstNumber === "0" || secondNumber === "0")) {
    divideByZero();
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
  if (bottomScreen.textContent === "0" || shouldClearBottomScreen) {
    bottomScreen.textContent = "";
    shouldClearBottomScreen = false;
  }
  bottomScreen.textContent += this.textContent;
}

function onClickDelete() {
  bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
}

function onClickOperator() {
  if (bottomScreen.textContent === "0") return;
  if (operator !== null) {
    getResult();
  }
  firstNumber = bottomScreen.textContent;
  operator = this.textContent;
  topScreen.textContent = `${firstNumber} ${operator}`;
  shouldClearBottomScreen = true;
}

function assignNumberButtons(button) {
  button.onclick = onClickNumber;
}

function assignOperatorButtons(button) {
  button.onclick = onClickOperator;
}

operatorButtons.forEach(assignOperatorButtons);
numberButtons.forEach(assignNumberButtons);
deleteButton.onclick = onClickDelete;
equalButton.onclick = onClickEqual;
clearButton.onclick = onClickClear;
dotButton.onclick = onClickDot;
