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

let numberA = 4;
let numberB = 2;
let operationOperator = '/';

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

console.log(operate(numberA, numberB, operationOperator))