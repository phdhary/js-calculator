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
    bottomScreen.textContent += ".";
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

function showDivideByZeroMessage() {
  const a = document.createElement("a");
  a.href = "https://en.wikipedia.org/wiki/Division_by_zero";
  a.target = "_blank";
  if (window.confirm("You can't do that, wanna see why?")) a.click();
  onClickClear();
}

function getResult(displaySummary) {
  if (shouldClearBottomScreen || operator === null) return;
  secondNumber = bottomScreen.textContent;
  if (operator === "÷" && (firstNumber === "0" || secondNumber === "0")) {
    showDivideByZeroMessage();
    return;
  }
  let result = operate(
    operator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );
  if (result - Math.floor(result) !== 0) {
    let resultLength = result.toString().length - 2;
    result = result.toPrecision(resultLength < 7 ? resultLength : 7);
  }
  bottomScreen.textContent = result;
  if (displaySummary) {
    topScreen.textContent = `${firstNumber} ${operator} ${secondNumber} = `;
  }
  operator = null;
}

function onClickNumber(number) {
  if (bottomScreen.textContent.length === 15) return;
  if (bottomScreen.textContent === "0" || shouldClearBottomScreen) {
    bottomScreen.textContent = "";
    shouldClearBottomScreen = false;
  }
  bottomScreen.textContent += number;
}

function onClickDelete() {
  bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
}

function onClickOperator(operatorSymbol) {
  if (bottomScreen.textContent === "0") return;
  if (operator !== null) {
    getResult();
  }
  firstNumber = bottomScreen.textContent;
  operator = operatorSymbol;
  topScreen.textContent = `${firstNumber} ${operator}`;
  shouldClearBottomScreen = true;
}

function assignNumberButtons(button) {
  button.onclick = () => onClickNumber(button.textContent);
  onKeyEvent(button, "button-active", button.textContent);
}

function assignOperatorButtons(button) {
  button.onclick = () => onClickOperator(button.textContent);
  switch (button.textContent) {
    case "×":
      onKeyEvent(button, "button-active", "*");
      break;
    case "÷":
      onKeyEvent(button, "button-active", "/");
      break;
    default:
      onKeyEvent(button, "button-active", button.textContent);
      break;
  }
}

function onKeyEvent(element, cssClass, ...keys) {
  element.title = `keyboard: ${keys}`;
  window.addEventListener("keydown", (event) => {
    keys.forEach((key) => {
      if (event.key === "/") event.preventDefault();
      if (event.key === key) {
        element.onclick();
        element.classList.add(cssClass);
      }
    });
  });
  window.addEventListener("keyup", (event) => {
    keys.forEach((key) => {
      if (event.key === key) element.classList.remove(cssClass);
    });
  });
}

onKeyEvent(deleteButton, "button-active", "Backspace");
onKeyEvent(clearButton, "button-active", "c", "Escape");
onKeyEvent(equalButton, "equal-active", "=", "Enter");
onKeyEvent(dotButton, "button-active", ".");

operatorButtons.forEach(assignOperatorButtons);
numberButtons.forEach(assignNumberButtons);
deleteButton.onclick = onClickDelete;
equalButton.onclick = onClickEqual;
clearButton.onclick = onClickClear;
dotButton.onclick = onClickDot;
