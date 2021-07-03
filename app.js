const display = document.getElementById('calc_display');
const digitButtons = document.querySelectorAll('.operand');
const clearBtn = document.querySelector('button[value=clear]');
const clearAllBtn = document.querySelector('button[value=clearAll]');
const equalSign = document.querySelector('.equalSign');
const operatorSigns = document.querySelectorAll('.operator');
const sqrtBtn = document.querySelector('button[value=sqrt]');
const decimal = document.querySelector('.decimal');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let operatorPressed = false;
let equalPressed = false;
let sqrtPresed = false;



digitButtons.forEach((button) => {
    button.addEventListener('click', (e) => {

        let result = button.value;

        if(display.textContent == '0') {
            display.textContent = '';
        } 

        if(operatorPressed) {
            operatorPressed = false;
            if(display.textContent !== '0.'){
                display.textContent = '';
            }
        }

        if(equalPressed || sqrtPresed){
            equalPressed = false;
            sqrtPresed = false;
            display.textContent = '';
        }
        
        if(display.textContent.length < 16){
            display.textContent += result;
        }
    });
});


clearBtn.addEventListener('click', deleteOneDigit);


function deleteOneDigit (e){
    if(display.textContent.length > 1){
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    } 
}


clearAllBtn.addEventListener('click', (e) => {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
});


operatorSigns.forEach((sign) => {
    sign.addEventListener('click', (e) => {
        operator = sign.value;
        firstOperand = display.textContent;
        operatorPressed = true;
    });
});


function fixLength(num){
    num = num.toString();
    if(num.length > 16){
        num = num.slice(0, 16);
    }
    return num;
}


equalSign.addEventListener('click', function(){

    secondOperand = display.textContent;
    
    if(firstOperand === ''){
        display.textContent = secondOperand
    } else {
        let result = operate(firstOperand, operator, secondOperand);
        firstOperand = '';
        secondOperand = '';
        equalPressed = true;

        if(Math.abs(result) > 1e+15 || Math.abs(result) < 1e-15){
            result = result.toExponential(4);
        } 

        display.textContent = fixLength(result);
    } 
});


sqrtBtn.addEventListener('click', function(){
    sqrtPresed = true;
    let result = display.textContent;
    result = Math.sqrt(result);
    display.textContent = fixLength(result);
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
    if(b == 0){
        return NaN;
    }
    return a / b;
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

function checkDecimalPoint(input) {

    let arrOfDecimal = input.match(/\./g);
    
    if(arrOfDecimal === null){
        return false;
    }
    return true;
}

decimal.addEventListener('click', function(){

    let result = display.textContent;

    if(checkDecimalPoint(result)) {
        if (operatorPressed) {
            result = '0.';
        }
    } else {
        result += '.';
    }

    if(equalPressed){
        equalPressed = false;
        result = '0.';
    }


    display.textContent = result;
});


window.addEventListener('keydown', function(event){
    
    const keys = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        ".", "+", "-", "*", "/", "=",
        "Enter", "Backspace", "Delete",
      ];
      const key = event.key;

      if (!keys.includes(event.key)){
          return;
      } else {
        switch (key){
            case "Backspace":
            deleteOneDigit();
        }
      }   
});


// let exp;
//     if (event.key == "Enter") {
//         exp = document.querySelector(`button[value="="]`);    
//     } else if (event.key == "Backspace") {
//         exp = document.querySelector(`button[value="clear"]`);
//     } else if (event.key == "Delete") {
//         exp = document.querySelector(`button[value="clearAll"]`);
//     } else {
//         exp = document.querySelector(`button[value="${event.key}"]`);
//     }

//     if(!exp) return;
//     display.textContent += exp.value;