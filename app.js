const display = document.getElementById('calc_display');
const digitButtons = document.querySelectorAll('.operand');
const clearBtn = document.querySelector('button[value=clear]');
const clearAllBtn = document.querySelector('button[value=clearAll]');
const equalSign = document.querySelector('.equalSign');
const operatorSigns = document.querySelectorAll('.operator');
const sqrtBtn = document.querySelector('button[value=sqrt]');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let operatorPressed = false;

digitButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let result = button.value;
        if(display.textContent == '0') {
            display.textContent = '';
        }
        if(operatorPressed) {
            operatorPressed = false;
            display.textContent = '';
        }
        if(display.textContent.length < 16){
            display.textContent += result;
        }
    });
});

clearBtn.addEventListener('click', (e) => {
    if(display.textContent.length > 1){
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    }
});

clearAllBtn.addEventListener('click', (e) => {
    display.textContent = '0';
});

operatorSigns.forEach((sign) => {
    sign.addEventListener('click', (e) => {
        operator = sign.value;
        firstOperand = display.textContent;
        operatorPressed = true;
    });
});

equalSign.addEventListener('click', function(){
    secondOperand = display.textContent;
    let result = operate(firstOperand, operator, secondOperand);
    if(result >= 1e+16) {
        result = result.toExponential(0);
        display.textContent = result;
    }
    display.textContent = result;
});


sqrtBtn.addEventListener('click', function(){
    let result = Math.sqrt(display.textContent).toFixed(14);
    if(result)
    display.textContent = result;

});


function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function sqrt(a){
    return Math.sqrt(a);
}

function operate(operand1, operator, operand2){
    switch(operator){
        case '+':
            return add(Number(operand1), Number(operand2));
        case '-':
            return subtract(operand1, operand2); 
        case '*':
            return multiply(operand1, operand2); 
        case '/':
            return divide(operand1, operand2);
    }
}

