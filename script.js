const myRe = /d(b+)d/g;

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

let operatorArr = [
    // add
    {value: 0},

    // subtract
    {value: 0},

    // multiply
    {value: 0},

    // divide
    {value: 0}
];



const displayEl = document.querySelector('.display');
const keypadEl = document.querySelector('.keypad');


let lastClickedKey = null;
function populateDisplay(str) {
    if(displayEl.innerText.split('').length >= 13) {
        return
    } else if(str == '.' && displayEl.innerText == '0') {
        return
    } else if(displayEl.innerText != '.' && str == '.' && lastClickedKey.search("[0-9]") != 0) {
        return
    }  else if(displayEl.innerText == '0' || displayEl.innerText == numberA || displayEl.innerText == numberB) {
        displayEl.innerText = str;
    } else if(str === '.' && displayEl.innerText.split('').includes('.')) {
        return
    } else {
        displayEl.innerText += str;
    }
}

// Operation Function

function operationStart(targetValue) {
    if(displayEl.innerText === '0' || displayEl.innerText.split('').length <= 0) {} else {
        if(lastClickedKey == '+' || lastClickedKey == '-' || lastClickedKey == 'x' || lastClickedKey == '/') {
            switch(targetValue) {
                case '+':
                    operationOperator = '+';
                break;
                case '-':
                    operationOperator = '-';
                break;
                case 'x':
                    operationOperator = '*';
                break;
                case '/':
                    operationOperator = '/';
                break;
            }
            return
        }
        switch(targetValue) {
            case '+':
                operatorArr[0].value++;
            break;
            case '-':
                operatorArr[1].value++;
            break;
            case 'x':
                operatorArr[2].value++;
            break;
            case '/':
                operatorArr[3].value++;
            break;
        }

        let sumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);
        if(sumOfOperators == 1) {
            numberA = Number(displayEl.innerText);
        } else {
            numberB = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            if(result.toString().length > 14) {
                result = Number(result.toString().split('').toSpliced(12).join(''));
            }
            displayEl.innerText = result;
            numberA = Number(displayEl.innerText);
        }

        switch(targetValue) {
            case '+':
                operationOperator = '+';
            break;
            case '-':
                operationOperator = '-';
            break;
            case 'x':
                operationOperator = '*';
            break;
            case '/':
                operationOperator = '/';
            break;
        }
    }
}

keypadEl.addEventListener('click', e => {
    let eventTargetClass = e.target.className;
    let eventTargetValue = e.target.innerText;
    if(eventTargetClass === 'operate') {
        console.log('operate');
    } else if(eventTargetClass === 'clear') {
        console.log('clear')
    } else if(eventTargetClass === 'delete') {
        console.log('delete')
    } else if(eventTargetClass === 'keypad') {} else if(eventTargetClass.includes('digit') || eventTargetClass.includes('dot')) {
        populateDisplay(eventTargetValue);
    } else {
        operationStart(eventTargetValue);
    }
    lastClickedKey = eventTargetValue;
})
////////////////////////////////////////////////////////////////