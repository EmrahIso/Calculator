// imported regex
const myRe = /d(b+)d/g;

//////////////////////////////////////
// MAIN OPERATIONS

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
// THREE MAIN VARIABLES

let numberA = 0;
let numberB = 0;
let operationOperator = '';

//////////////////////////////////////
// OPERATE FUNCTION

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


//////////////////////////////////////////////////////////
// OPERATORS ARR  (counts how many times the operators clicked)

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


///////////////////////////////////////////////////////////////////////////////////////////////////////
// POPULATE FUNCTION

const displayEl = document.querySelector('.display');
const keypadEl = document.querySelector('.keypad');

let lastClickedKey = null;
function populateDisplay(str) {
    if(displayEl.innerText.split('').length >= 11) {
        return
    } else if (str == '.'  && (lastClickedKey == '.' || lastClickedKey == '+' || lastClickedKey == '-' || lastClickedKey == 'x' || lastClickedKey == '/')) {
        displayEl.innerText = '0.';
    } else if(str == '.' && lastClickedKey == 'DEL') {
        displayEl.innerText = '0.';
    } else if(lastClickedKey != null && displayEl.innerText != '.' && str == '.' && lastClickedKey.search("[0-9]") != 0) {
        return
    } else if(displayEl.innerText == '0') {
        displayEl.innerText = str;
    } else if(lastClickedKey == '+' || lastClickedKey == '-' || lastClickedKey == 'x' || lastClickedKey == '/') {
        displayEl.innerText = str;
    } else if (displayEl.innerText == numberA || displayEl.innerText == numberB) {
        displayEl.innerText += str;
    } else if(str == '.' && displayEl.innerText.split('').includes('.')) {
        return
    }  else {
        displayEl.innerText += str;
    }
    if(displayEl.innerText[0] == '.') {
        let newValue = displayEl.innerText.split('').toSpliced(0, 0, '0').join('');
        displayEl.innerText = newValue;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
// OPERATION FUNCTION

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
            console.log(numberA);
        } else if(lastClickedKey == 'DEL') {
            let result = operate(numberA, numberB, operationOperator);
            displayEl.innerText = result;
        } else {
            numberB = Number(displayEl.innerText);
            console.log(numberB);
            let result = operate(numberA, numberB, operationOperator);
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

///////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE FUNCTION

function deleteFunction() {
    let newValue = displayEl.innerText.split('');
    let sumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);
    if(newValue.includes('.')) {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
    } else if(sumOfOperators > 0) {
        if(newValue[1] == '.') {
            displayEl.innerText = '0';
            numberB = 0;
        } else {
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
              displayEl.innerText = '0';
            }
            numberA = Number(displayEl.innerText);
            numberB = 0;
        }
    } else {
        if(newValue[1] == '.') {
            displayEl.innerText = '0';
        } else {
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
                displayEl.innerText = '0';
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS

keypadEl.addEventListener('click', e => {
    let eventTargetClass = e.target.className;
    let eventTargetValue = e.target.innerText;
    if(eventTargetClass === 'operate') {
        console.log('operate');
    } else if(eventTargetClass === 'clear') {
        console.log('clear');
    } else if(eventTargetClass === 'delete') {
        deleteFunction()
    } else if(eventTargetClass === 'keypad') {} else if(eventTargetClass.includes('digit') || eventTargetClass.includes('dot')) {
        populateDisplay(eventTargetValue);
    } else {
        operationStart(eventTargetValue);
    }
    if(displayEl.innerText.length >= 11) {
        let result = displayEl.innerText.split('').toSpliced(10).join('');
        displayEl.innerText = result;
    }
    lastClickedKey = eventTargetValue;
})
////////////////////////////////////////////////////////////////