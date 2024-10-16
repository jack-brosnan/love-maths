document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener('click', function() {
            if(this.getAttribute("data-type") === "submit") {
                checkAnswer();
            }

            else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    //Submits answer when 'Enter' key is pressed
    document.getElementById("answer-box").addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * The main game "loop", called when script is first loaded
 * and after the user's answer has been processed
 */

let runGame = (gameType) => {

    //Removes previous value in answer-box
    document.getElementById("answer-box").value = "";

    //Cursor automatically sets to answer-box for next question
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    }
    else if (gameType === "subtract") {
        displaySubtractionQuestion(num1, num2);
    }
    else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }
    else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    }
    else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */

let checkAnswer = () => {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if(isCorrect) {
        alert("Hey! You got it right! :D")
        incrementScore();
    }
    else {
        alert(`Awww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`)
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
    


}

/**
 * Gets the operands and the operator (plus, minus, multiply and divide)
 * directly from the dom, and returns the correct answer. * 
 */

let calculateCorrectAnswer = () => {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if(operator === "+") {
        return [operand1 + operand2, "addition"];
    }
    else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    }
    else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }
    else if (operator === "/") {
        return [operand1 / operand2, "division"];
    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increment it by 1
 */

let incrementScore = () => {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
    
}

/**
 * Gets the current INCORRECT score from the DOM and increment it by 1
 */

let incrementWrongAnswer = () => {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

let displayAdditionQuestion = (operand1, operand2) => {
    document.getElementById("operand1").innerText = operand1;
    document.getElementById("operand2").innerText = operand2;
    document.getElementById("operator").innerText = "+";
}

let displaySubtractionQuestion = (operand1, operand2) => {
    
    document.getElementById("operand1").innerText = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").innerText = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").innerText = "-";
    
}

let displayMultiplyQuestion = (operand1, operand2) => {
    document.getElementById("operand1").innerText = operand1;
    document.getElementById("operand2").innerText = operand2;
    document.getElementById("operator").innerText = "x";
}

let displayDivideQuestion = (operand1, operand2) => {
    document.getElementById("operand1").innerText = operand2 * operand1;
    document.getElementById("operand2").innerText = operand2;
    document.getElementById("operator").innerText = "/";
}

