const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      // Clear the display
      currentInput = '';
      previousInput = '';
      operator = null;
      display.textContent = '0';
    } else if (value === '=') {
      // Perform calculation
      if (previousInput && operator) {
        currentInput = calculate(previousInput, currentInput, operator);
        display.textContent = currentInput;
        previousInput = '';
        operator = null;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Handle operator
      if (currentInput) {
        previousInput = currentInput;
        currentInput = '';
        operator = value;
        display.textContent = `${previousInput} ${operator}`;
      }
    } else {
      // Handle number or decimal
      currentInput += value;
      if (operator) {
        display.textContent = `${previousInput} ${operator} ${currentInput}`;
      } else {
        display.textContent = currentInput;
      }
    }
  });
});

function calculate(num1, num2, operator) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operator) {
    case '+': return n1 + n2;
    case '-': return n1 - n2;
    case '*': return n1 * n2;
    case '/': return n2 !== 0 ? n1 / n2 : 'Error';
    default: return '';
  }
}
