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
  topScreen = document.querySelector(".top");

function onClickNumber() {
  console.log(this.textContent);
  if (bottomScreen.textContent === "0") {
    bottomScreen.textContent = "";
  }
  bottomScreen.textContent += this.textContent;
}

function onClickDelete() {
  bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
}

function onClickOperator() {
  firstNumber = bottomScreen.textContent;
  operator = this.textContent;
  topScreen.textContent = `${firstNumber} ${operator}`;
}

numberButtons.forEach((button) => {
  button.onclick = onClickNumber;
});
operatorButtons.forEach((button) => {
  button.onclick = onClickOperator;
});

deleteButton.onclick = onClickDelete;