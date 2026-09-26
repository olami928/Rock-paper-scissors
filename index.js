function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors']
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase().trim();

    if (playerSelection === computerSelection) {
        return "It's a Tie!"
    }

    const beats = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    if (beats[playerSelection] === computerSelection) {
        return `You win ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    } else {
        return `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
    }
}

function capitalize(word) {
    return word.charAt[0].toUpperCase() + word.slice(1);
}


function playGame() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Rock, Paper, or Scissors?");
        const computerSelection = getComputerChoice();

        const result = playRound(playerSelection, computerSelection);
        console.log(result);

        if (result.startsWith("You Win")) {
            playerScore++;
        } else if (result.startsWith("You Lose")) {
            computerScore++;
        }
    }

    console.log(`Final Score - You: ${playerScore}, Computer: ${computerScore}`);
    if (playerScore > computerScore) {
        console.log("You won the game!");
    } else if (computerScore > playerScore) {
        comsole.log("The game is a tie");
    }
}

playGame();