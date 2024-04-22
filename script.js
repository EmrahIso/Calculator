function add(numA, numB) {
    return numA + numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB) {
    return numA / numB;
}

//////////////////////////////////////

let numberA = 0;
let numberB = 0;
let operationOperator = '';

//////////////////////////////////////

function operate(numA, numB, operator) {
    switch(operator) {
        case '+':
            return add(numA, numB)
        break;
        case '-':
            return subtract(numA, numB)
        break;
        case '*':
            return multiply(numA, numB)
        break;
        case '/':
            return divide(numA, numB)
        break;
    }
}

//console.log(operate(numberA, numberB, operationOperator))

//////////////////////////////////////////////////////////

const displayEl = document.querySelector('.display');
const keypadEl = document.querySelector('.keypad');

let displayValue = Number(displayEl.innerText);

function populateDisplay(str) {
    if(displayEl.innerText.split('').length >= 13) {
        return
    }  else if(displayEl.innerText == '0') {
        displayEl.innerText = str;
    } else if(str === '.' && displayEl.innerText.split('').includes('.')) {
        return
    } else {
        displayEl.innerText += str;
    }
    displayValue = Number(displayEl.innerText);
}

keypadEl.addEventListener('click', e => {
    let eventTarget = e.target.className;
    let eventTargetValue = e.target.innerText;
    if(eventTarget !== "keypad" && eventTarget !== 'dotBtn') { 
        populateDisplay(eventTargetValue);
    } else if(eventTarget === "dotBtn") {
        populateDisplay(eventTargetValue);
    }
})

