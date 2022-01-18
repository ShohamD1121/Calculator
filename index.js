var clicks = 0;

$(".theme-dot").click(function () {
    if (clicks === 0) {
        $(".theme-dot").removeClass("p").addClass("switch-loc");
        $("body").css("background-color", "hsl(0, 0%, 90%)");
        $(".container").css("background-color", "hsl(0, 0%, 90%)");
        $(".title").css("background-color", "hsl(0, 0%, 90%)");
        $(".nav .pnav").css("color", "hsl(221, 14%, 31%)");
        $(".switch").css("background-color", "hsl(0, 5%, 81%)");
        $(".calc-body").css("background-color", "hsl(0, 5%, 81%)");
        $(".result").css("background-color", "white").css("color", "hsl(221, 14%, 31%)");;
        $(".num-op").css("background-color", "hsl(45, 7%, 89%)");
        $(".word").css("background-color", "hsl(185, 42%, 37%)");
        $(".equal").css("background-color", "hsl(25, 98%, 40%)");
    }
    else if (clicks === 1) {
        $(".theme-dot").removeClass("switch-loc").addClass("switch-loc-color");
        $("body").css("background-color", "hsl(268, 75%, 9%)");
        $(".container").css("background-color", "hsl(268, 75%, 9%)");
        $(".title").css("background-color", "hsl(268, 75%, 9%)");
        $(".nav .pnav").css("color", "hsl(52, 100%, 62%)");
        $(".switch").css("background-color", " hsl(268, 71%, 12%)");
        $(".calc-body").css("background-color", " hsl(268, 71%, 12%)");
        $(".result").css("background-color", " hsl(268, 71%, 12%)").css("color", "hsl(52, 100%, 62%)");;
        $(".num-op").css("background-color", "hsl(268, 47%, 21%)").css("color", "hsl(52, 100%, 62%)");
        $(".word").css("background-color", "hsl(281, 89%, 26%)");
        $(".equal").css("background-color", "hsl(176, 100%, 44%)").css("color","black");
    }
    else if (clicks === 2) {
        $(".theme-dot").removeClass("switch-loc-color").addClass("switch-loc");
        $("body").css("background-color", "hsl(0, 0%, 90%)");
        $(".container").css("background-color", "hsl(0, 0%, 90%)");
        $(".title").css("background-color", "hsl(0, 0%, 90%)");
        $(".nav .pnav").css("color", "hsl(221, 14%, 31%)");
        $(".switch").css("background-color", "hsl(0, 5%, 81%)");
        $(".calc-body").css("background-color", "hsl(0, 5%, 81%)");
        $(".result").css("background-color", "white").css("color", "hsl(221, 14%, 31%)");;
        $(".num-op").css("background-color", "hsl(45, 7%, 89%)").css("color", "hsl(221, 14%, 31%)");
        $(".word").css("background-color", "hsl(185, 42%, 37%)");
        $(".equal").css("background-color", "hsl(25, 98%, 40%)").css("color", "white");
    }
    else if (clicks === 3) {
        $(".theme-dot").removeClass("switch-loc").addClass("p");
        $("body").css("background-color", "hsl(222, 26%, 31%)");
        $(".container").css("background-color", "hsl(222, 26%, 31%)");
        $(".title").css("background-color", "hsl(222, 26%, 31%)");
        $(".nav .pnav").css("color", "white");
        $(".switch").css("background-color", "hsl(223, 31%, 20%)");
        $(".calc-body").css("background-color", "hsl(223, 31%, 20%)");
        $(".result").css("background-color", "hsl(224, 36%, 15%)").css("color", "white");;
        $(".num-op").css("background-color", "hsl(30, 25%, 89%)");
        $(".word").css("background-color", "hsl(225, 21%, 49%)");
        $(".equal").css("background-color", "hsl(6, 63%, 50%)");
        clicks = -1;
    }
    clicks++;
});

class Calculator {
    constructor(previousOperandText,currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'X':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;

        if (this.operation !== '') {
            this.previousOperandText.innerText = this.previousOperand.toString() + this.operation.toString(); // Another cool way of writitng it : `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]'); //num 0-9
const operationButtons = document.querySelectorAll('[data-operation]'); // oper + - X /
const equalsButton = document.querySelector('[data-equals]'); // =
const deleteButton = document.querySelector('[data-delete]'); // DEL
const resetButton = document.querySelector('[data-reset]'); // RESET
const previousOperandText = document.querySelector('[data-previous-operand]'); // 
const currentOperandText = document.querySelector('[data-current-operand]'); // 

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

resetButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

