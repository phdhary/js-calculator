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
  bottomScreen = document.querySelector(".bottom"),
  deleteButton = document.querySelector(".delete"),
  operatorButtons = document.querySelectorAll("button.operator"),
  topScreen = document.querySelector(".top"),
  equalButton = document.querySelector(".equal");

function onClickEqual() {
  if (bottomScreenFlag || bottomScreen.textContent === "0" || operator === null)
    return;
  secondNumber = bottomScreen.textContent;
  const result = operate(
    operator,
    parseInt(firstNumber),
    parseInt(secondNumber)
  );
  bottomScreen.textContent = result;
  topScreen.textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
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
  if (operator !== null) {
    if (bottomScreenFlag) return;
    secondNumber = bottomScreen.textContent;
    const result = operate(
      operator,
      parseInt(firstNumber),
      parseInt(secondNumber)
    );
    bottomScreen.textContent = result;
    operator = null;
    // console.table({ firstNumber, operator, secondNumber, bottomScreenFlag });
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
