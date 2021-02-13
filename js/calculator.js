const display = document.querySelector('#jsCalculatorResult');
const numbers = document.querySelectorAll('#jsAppCalculator .number');
const ops = document.querySelectorAll('#jsAppCalculator .op');
const equals = document.querySelector('#jsEquals');
const clearBtn = document.querySelector('#jsControlClear');
const signBtn = document.querySelector('#jsControlSign');
const percentageBtn = document.querySelector('#jsControlPercentage');
const dot = document.querySelector('#jsNumberDot');
let number1 = 0;
let number2 = 0;

let operator__now = -1;//0 + 1 - 2 x 3 / 4 =



function writeNumber(event){
    const input = event.target.innerText;
    if(operator__now === -1){
        if(input === '.'){
            number1 += '.';
        }
        else if(number1 === 0){
            number1 = input;
        }else{
            number1 += input;
        }
        display.innerText = number1;
    }else{
        if(input === '.'){
            number2 += '.';
        }
        else if(number2 === 0){
            number2 = input;
        }else{
            number2 += input;
        }
        display.innerText = number2;
    }
}
function writeOp(event){
    if(operator__now != -1){
        if(operator__now === 0){
            number1 = parseFloat(number1) + parseFloat(number2);
        }else if(operator__now === 1){
            number1 = parseFloat(number1) - parseFloat(number2);
        }else if(operator__now === 2){
            number1 = parseFloat(number1) * parseFloat(number2);
        }else if(operator__now === 3){
            number1 = parseFloat(number1) / parseFloat(number2);
        }
        number2= 0;
        number1*=10000000;
        number1= Math.floor(number1);
        number1 /= 10000000;
        display.innerText = number1;
        operator__now = -1;
    }
    operator__now = parseInt(event.target.id);
}

const allClear = () => {
    number1 = 0;
    operator__now = -1;
    display.innerText = number1;
}
const handleEqualsClick = () => {
    if(operator__now != -1){
        if(operator__now === 0){
            number1 = parseFloat(number1) + parseFloat(number2);
        }else if(operator__now === 1){
            number1 = parseFloat(number1) - parseFloat(number2);
        }else if(operator__now === 2){
            number1 = parseFloat(number1) * parseFloat(number2);
        }else if(operator__now === 3){
            number1 = parseFloat(number1) / parseFloat(number2);
        }
        number2= 0;
        number1*=10000000;
        number1= Math.floor(number1);
        number1 /= 10000000;
        display.innerText = number1;
        operator__now = -1;
    }
}

const handleSign = () => {
    if(operator__now === -1){
        number1 = parseFloat(number1) * -1;
        display.innerText = number1;
    }else{
        number2 = parseFloat(number2) * -1;
        display.innerText = number2;
    }
}
const handlePercentage = () => {
    if(operator__now === -1){
        number1 = parseFloat(number1) * 0.01;
        console.log(number1);
        number1*=10000000;
        number1= Math.floor(number1);
        number1 /= 10000000;
        display.innerText = number1;
    }else{
        number2 = parseFloat(number2) * 0.01;
        console.log(number2);
        number2*=10000000;
        number2= Math.floor(number2);
        number2 /= 10000000;
        display.innerText = number2;
    } 
}

function init(){
    numbers.forEach(number => number.addEventListener('click', writeNumber));
    ops.forEach(op => op.addEventListener('click', writeOp));
    equals.addEventListener('click', handleEqualsClick);
    clearBtn.addEventListener('click', allClear);
    signBtn.addEventListener('click', handleSign);
    percentageBtn.addEventListener('click', handlePercentage);
}

init();