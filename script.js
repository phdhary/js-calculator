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

const numberButtons = document.querySelectorAll("button.number");
const bottomScreen = document.querySelector(".bottom");

function onClickNumber() {
  console.log(this.textContent);
  if (bottomScreen.textContent === "0") {
    bottomScreen.textContent = "";
  }
  bottomScreen.textContent += this.textContent;
}

numberButtons.forEach((button) => {
  button.onclick = onClickNumber;
});
