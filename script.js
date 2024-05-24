// imported regex
const myRe = /d(b+)d/g;

//////////////////////////////////////
// THREE MAIN VARIABLES

let numberA = 0;
let numberB = 0;
let operationOperator = '';

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
// OPERATE FUNCTION

function operate(numA, numB, operator) {
    switch(operator) {
        case '+':
            return add(numB, numA)
        break;
        case '-':
            return subtract(numB, numA)
        break;
        case '*':
            return multiply(numB, numA)
        break;
        case '/':
            return divide(numB, numA)
        break;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
// POPULATE FUNCTION

const displayEl = document.querySelector('.display-inner');
const displayOperationInfoEl = document.querySelector('.display-operation-info');
const keypadEl = document.querySelector('.keypad');

let lastClickedKey = null;
function populateDisplay(str) {
    if(displayEl.innerText == 'WHY 0?') {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
    }
    if(displayEl.innerText.split('').length >= 11) {
        displayEl.innerText = 0;
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
    }  else if(displayEl.innerText.split('').includes('.') && (displayEl.innerText.split('').slice(displayEl.innerText.split('').indexOf('.') + 1).length > 2)) {
        let oldValue = displayEl.innerText.split('');
        let indexOfDot = oldValue.indexOf('.');
        let newValue = oldValue.splice(0, indexOfDot + 3);
        displayEl.innerText = newValue.join('');
        return
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
// OPERATION FUNCTION

function operationStart(targetValue) {
    console.log('pokrenuto')
    let oldSumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);
    let stupid = false; // We use this variable to display a message when the user tries to divide or multiply by 0 
    if(displayEl.innerText == 'WHY 0?') {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
        displayOperationInfoEl.innerHTML = '&nbsp';
    }
    if(displayEl.innerText.split('').length <= 0) {
        stupid = false;
    } else if(lastClickedKey == '=' && targetValue == '=') {} else if(targetValue == '=' && oldSumOfOperators == 0) {} else {
        stupid = false;
        if(lastClickedKey == '+' || lastClickedKey == '-' || lastClickedKey == 'x' || lastClickedKey == '/') {
            //We use this block of code to show operationOperator to users when lastClickedKEy is one of operators
            if(targetValue != '=') {
                let oldOperationInfoValueArr = displayOperationInfoEl.innerText.split('');
                let lastClickedKeyIndex = oldOperationInfoValueArr.indexOf(lastClickedKey);
                let newOperationInfoValueArr = oldOperationInfoValueArr.splice(0, lastClickedKeyIndex);
                newOperationInfoValueArr.push(targetValue);
                displayOperationInfoEl.innerText = newOperationInfoValueArr.join('');
            } else {
                let oldOperationInfoValueArr = displayOperationInfoEl.innerText.split('');
                let lastClickedKeyIndex = oldOperationInfoValueArr.indexOf(lastClickedKey);
                let newOperationInfoValueArr = oldOperationInfoValueArr.splice(0, lastClickedKeyIndex);
                displayOperationInfoEl.innerText = newOperationInfoValueArr.join('');
            }
            //
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

        if(Number(displayEl.innerText) == 0 && (operationOperator == '/' || operationOperator == '*')) {
            stupid = true;
        }

        let sumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);

        if(lastClickedKey == '=') {} else if(sumOfOperators == 1 && targetValue == '=') {
            numberA = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            numberA = 0;
            if(result == 'WHY 0?') {
                displayEl.innerText = result;
            } else {
                displayEl.innerText = result;
                numberB = Number(displayEl.innerText);
            }
            displayOperationInfoEl.innerText = `${numberB}`;
        } else if(sumOfOperators > 1 && targetValue == '=') {
            numberA = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            if(result == 'WHY 0?') {
                displayEl.innerText = result;
            } else {
                displayEl.innerText = result;
                numberB = Number(displayEl.innerText);
            }
            numberA = 0;
            numberB = Number(displayEl.innerText);
            displayOperationInfoEl.innerText = `${numberB}`;
            operatorArr.forEach(item => item = 0);
        } else if(sumOfOperators == 1) {
            numberB = Number(displayEl.innerText);
            displayOperationInfoEl.innerText = `${numberB}`;
        } else if(lastClickedKey == 'DEL') {
            let result = operate(numberA, numberB, operationOperator);
            displayEl.innerText = result;
            displayOperationInfoEl.innerText = `${result}`;
        } else {
            numberA = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            if(result == 'WHY 0?') {
                displayEl.innerText = result;
            } else {
                displayEl.innerText = result;
                numberB = Number(displayEl.innerText);
            }
            displayOperationInfoEl.innerText = `${numberB}`;
        }
        numberB = Number(displayEl.innerText);
        if(targetValue != '=') {
            displayOperationInfoEl.innerText += `${targetValue}`;
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

    if(lastClickedKey == 'DEL' && (operationOperator == '/' || operationOperator == '*')) {
        stupid = false;
    } else if(Number(displayEl.innerText) == 0 && (operationOperator == '/' || operationOperator == '*')) {
        stupid = true;
    }
    if(stupid) {
        displayEl.innerText = 'WHY 0?';
        displayOperationInfoEl.innerHTML = '&nbsp';
        numberA = 0;
        numberB = 0;
        operatorArr.forEach(item => item.value = 0);
    } else if(displayEl.innerText.split('').includes('.') && (displayEl.innerText.split('').slice(displayEl.innerText.split('').indexOf('.') + 1).length > 2)) {
        let oldValue = displayEl.innerText.split('');
        let indexOfDot = oldValue.indexOf('.');
        let newValue = oldValue.splice(0, indexOfDot + 3);
        displayEl.innerText = newValue.join('');
        displayOperationInfoEl.innerText = newValue.join('');
        return
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE FUNCTION

function deleteFunction() {
    let newValue = displayEl.innerText.split('');
    let sumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);
    if(displayEl.innerText == 'WHY 0?') {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
    } else if(newValue.includes('.')) {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
        displayOperationInfoEl.innerHTML = '&nbsp';
        operatorArr.forEach(item => item.value = 0);
    } else if(sumOfOperators == 0 && lastClickedKey == '=') {} else if(sumOfOperators == 1) {
        if(newValue[1] == '.') {
            displayEl.innerText = '0';
            numberB = 0;
        } else if(lastClickedKey == '=' && (operationOperator == '-' || operationOperator == '+')) {
            numberA = 0;
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
              displayEl.innerText = '0';
            }
            numberB = Number(displayEl.innerText); 
        } else if(lastClickedKey == '=' && operationOperator == '/' || operationOperator == '*') {
            numberA = 1;
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
              displayEl.innerText = '0';
            }
            numberB = Number(displayEl.innerText); 
        } else {
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
              displayEl.innerText = '0';
            }
            numberA = Number(displayEl.innerText);
        }
    } else if(sumOfOperators > 1 && (operationOperator == '/' || operationOperator == '*')) {
        if(newValue[1] == '.') {
            displayEl.innerText = '0';
            numberB = 0;
        } else {
            if(lastClickedKey == '=') {
                numberB = 1;
            } else if(lastClickedKey == '+' || lastClickedKey == '-' || lastClickedKey == 'x' || lastClickedKey == '/') {
                numberB = 1;
            }
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
              displayEl.innerText = '0';
            }
            numberA = Number(displayEl.innerText);  
        }
    } else if(sumOfOperators > 1) {
        if(newValue[1] == '.') {
            displayEl.innerText = '0';
            numberB = 0;
        } else {
            if(lastClickedKey == '=') {
                numberB = 0;
            } else if(lastClickedKey == '+' || lastClickedKey == '-' || lastClickedKey == 'x' || lastClickedKey == '/') {
                numberB = 0;
            }
            newValue.pop();
            displayEl.innerText = newValue.join('');
            if(displayEl.innerText == '') {
              displayEl.innerText = '0';
            }
            numberA = Number(displayEl.innerText);  
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
// CLEAR FUNCTION

function clearFunction() {
    displayEl.innerText = '0';
    displayOperationInfoEl.innerHTML = '&nbsp'; 
    numberA = 0;
    numberB = 0;
    operatorArr.forEach(item => item.value = 0);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS

keypadEl.addEventListener('click', e => {
    let eventTargetClass = e.target.className;
    let eventTargetValue = e.target.innerText;

    if(eventTargetClass === 'clear') {
        clearFunction();
        lastClickedKey = eventTargetValue;
    } else if(eventTargetClass === 'delete') {
        deleteFunction();
        lastClickedKey = eventTargetValue;
    } else if(eventTargetClass === 'keypad') {} else if(lastClickedKey == '=' && (eventTargetClass.includes('digit') || eventTargetClass.includes('dot')) && displayEl.innerText == 'WHY 0?') {
        populateDisplay(eventTargetValue);
        operationStart('+');
        displayOperationInfoEl.innerHTML = "&nbsp";
        numberA = 0;
        numberB = 0;
        lastClickedKey = eventTargetValue;
    } else if(lastClickedKey == '=' && (eventTargetClass.includes('digit') || eventTargetClass.includes('dot'))) {} else if(eventTargetClass.includes('digit') || eventTargetClass.includes('dot')) {
        populateDisplay(eventTargetValue);
        lastClickedKey = eventTargetValue;
    } else {
        operationStart(eventTargetValue);
        lastClickedKey = eventTargetValue;
    }
    if(displayEl.innerText.length >= 11) {
        let result = displayEl.innerText.split('').toSpliced(10).join('');
        displayEl.innerText = result;
    }
    e.target.blur();
})

////////////////////////////////////////////////////////////////
// KEYBOARD SUPPORT

window.addEventListener('keydown', e => {
    let eventTargetKeyCode = e.keyCode;
    let eventTargetKeyValue = e.key;

    if(eventTargetKeyCode === 13) {
        eventTargetKeyCode = 187;
        eventTargetKeyValue = '=';
    }
    if(eventTargetKeyCode === 8) {
        deleteFunction();
        lastClickedKey = 'DEL';
    } else if((eventTargetKeyCode === 48 || eventTargetKeyCode === 96) ||
                (eventTargetKeyCode === 49 || eventTargetKeyCode === 97) ||
                (eventTargetKeyCode === 50 || eventTargetKeyCode === 98) ||
                (eventTargetKeyCode === 51 || eventTargetKeyCode === 99) ||
                (eventTargetKeyCode === 52 || eventTargetKeyCode === 100) ||
                (eventTargetKeyCode === 53 || eventTargetKeyCode === 101) ||
                (eventTargetKeyCode === 54 || eventTargetKeyCode === 102) ||
                (eventTargetKeyCode === 55 || eventTargetKeyCode === 103) ||
                (eventTargetKeyCode === 56 || eventTargetKeyCode === 104) ||
                (eventTargetKeyCode === 57 || eventTargetKeyCode === 105) ||
                (eventTargetKeyCode === 110 || eventTargetKeyCode === 190)) {
                    populateDisplay(eventTargetKeyValue);
                    lastClickedKey = eventTargetKeyValue;
    } else if(eventTargetKeyCode === 187) {
        operationStart(eventTargetKeyValue);
        lastClickedKey = eventTargetKeyValue;
    } else if(  eventTargetKeyCode === 107 ||
                eventTargetKeyCode === 109 ||
                eventTargetKeyCode === 111) {
                    operationStart(eventTargetKeyValue);
                    lastClickedKey = eventTargetKeyValue;
    }  else if(eventTargetKeyCode === 106) {
            operationStart('x');
            lastClickedKey = 'x';
    }

    if(displayEl.innerText.length >= 11) {
        let result = displayEl.innerText.split('').toSpliced(10).join('');
        displayEl.innerText = result;
    }
});