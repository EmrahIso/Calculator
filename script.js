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

const displayEl = document.querySelector('.display');
const keypadEl = document.querySelector('.keypad');

let lastClickedKey = null;
function populateDisplay(str) {
    if(displayEl.innerText == 'WHY 0?') {
        displayEl.innerText = 0;
    }
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
    let oldSumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);
    let stupid = false; // We use this variable to display a message when the user tries to divide or multiply by 0 
    if(displayEl.innerText.split('').length <= 0) {
        stupid = false;
    } else if(targetValue == '=' && oldSumOfOperators == 0) {
        numberB = Number(displayEl.innerText);
    } else {
        stupid = false;
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

        if(oldSumOfOperators >= 0 && displayEl.innerText === '0' && (operationOperator == '/' || operationOperator == '*')) {
            stupid = true;
        }

        let sumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);

        if(lastClickedKey == '=') {} else if(sumOfOperators == 1 && targetValue == '=') {
            numberA = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            if(result == 'WHY 0?') {
                displayEl.innerText = result;
            } else {
                displayEl.innerText = result;
                numberB = Number(displayEl.innerText);
            }
        } else if(sumOfOperators > 1 && targetValue == '=') {
            numberA = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            if(result == 'WHY 0?') {
                displayEl.innerText = result;
            } else {
                displayEl.innerText = result;
                numberB = Number(displayEl.innerText);
            }
            numberA = Number(displayEl.innerText);
            numberB = 0;
            operatorArr.forEach(item => item = 0);
        } else if(sumOfOperators == 1) {
            numberB = Number(displayEl.innerText);
        } else if(lastClickedKey == 'DEL') {
            let result = operate(numberA, numberB, operationOperator);
            displayEl.innerText = result;
        } else {
            numberA = Number(displayEl.innerText);
            let result = operate(numberA, numberB, operationOperator);
            if(result == 'WHY 0?') {
                displayEl.innerText = result;
            } else {
                displayEl.innerText = result;
                numberB = Number(displayEl.innerText);
            }
        }
        numberB = Number(displayEl.innerText);

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
    if(stupid) {
        displayEl.innerText = 'WHY 0?';
        numberA = 0;
        numberB = 0;
        operatorArr.forEach(item => item.value = 0);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE FUNCTION

function deleteFunction() {
    let newValue = displayEl.innerText.split('');
    let sumOfOperators = operatorArr.reduce((sum, currentItem) =>  sum + currentItem.value, 0);
    console.log(sumOfOperators);
    if(displayEl.innerText == 'WHY 0?') {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
    } else if(newValue.includes('.')) {
        numberA = 0;
        numberB = 0;
        displayEl.innerText = '0';
    } else if(sumOfOperators == 0 && lastClickedKey == '=') {} else if(sumOfOperators == 1) {
        if(newValue[1] == '.') {
            displayEl.innerText = '0';
            numberB = 0;
        } else if(lastClickedKey == '=') {
            numberA = 0;
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
    console.log('a', numberA)
    console.log('b', numberB)  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLEAR FUNCTION

function clearFunction() {
    displayEl.innerText = '0';
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
    } else if(eventTargetClass === 'delete') {
        deleteFunction();
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

/*
Vecina toga je gotovo samo napravi da jednako odnosno operate operator radi i kada je suma operatora 0 i 1
*/