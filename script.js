const choices = {
    rock: { label: "Rock", icon: "✊", beats: "scissors" },
    paper: { label: "Paper", icon: "✋", beats: "rock" },
    scissors: { label: "Scissors", icon: "✌️", beats: "paper" },
};

const moveButtons = document.querySelectorAll("#buttons [data-choice]");
const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const playerChoiceElement = document.querySelector("#player-choice");
const computerChoiceElement = document.querySelector("#computer-choice");
const playerCaption = document.querySelector("#player-caption");
const computerCaption = document.querySelector("#computer-caption");
const resultElement = document.querySelector("#result");
const roundCountElement = document.querySelector("#round-count");
const historyList = document.querySelector("#history-list");
const historyCount = document.querySelector("#history-count");
const matchState = document.querySelector("#match-state");
const matchStateText = document.querySelector("#match-state-text");
const resetButton = document.querySelector("#reset-button");

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let gameOver = false;

moveButtons.forEach((button) => {
    button.addEventListener("click", () => playRound(button.dataset.choice));
});

resetButton.addEventListener("click", resetMatch);

function playRound(playerSelection) {
    if (gameOver) return;

    const computerSelection = getComputerChoice();
    const outcome = getRoundOutcome(playerSelection, computerSelection);
    roundsPlayed++;

    revealChoice(playerChoiceElement, playerSelection, playerCaption);
    revealChoice(computerChoiceElement, computerSelection, computerCaption);

    if (outcome === "win") playerScore++;
    if (outcome === "lose") computerScore++;

    updateScore();
    addHistory(playerSelection, computerSelection, outcome);
    roundCountElement.textContent = `ROUND ${String(roundsPlayed).padStart(2, "0")}`;
    matchState.dataset.status = "playing";
    matchStateText.textContent = "MATCH IN PLAY";
    resultElement.dataset.outcome = outcome;
    resultElement.textContent = getRoundMessage(playerSelection, computerSelection, outcome);

    if (playerScore === 5 || computerScore === 5) finishMatch();
}

function getRoundOutcome(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) return "tie";
    return choices[playerSelection].beats === computerSelection ? "win" : "lose";
}

function getRoundMessage(playerSelection, computerSelection, outcome) {
    if (outcome === "tie") return "A draw. No points this round.";

    const winner = outcome === "win" ? "You" : "Computer";
    const winningChoice = outcome === "win" ? playerSelection : computerSelection;
    const losingChoice = outcome === "win" ? computerSelection : playerSelection;
    return `${winner} take the round. ${choices[winningChoice].label} beats ${choices[losingChoice].label}.`;
}

function getComputerChoice() {
    const options = Object.keys(choices);
    return options[Math.floor(Math.random() * options.length)];
}

function revealChoice(element, selection, caption) {
    element.textContent = choices[selection].icon;
    element.setAttribute("aria-label", choices[selection].label);
    caption.textContent = choices[selection].label.toUpperCase();
    element.classList.remove("reveal");
    requestAnimationFrame(() => element.classList.add("reveal"));
}

function updateScore() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function addHistory(playerSelection, computerSelection, outcome) {
    const emptyMessage = document.querySelector("#history-empty");
    if (emptyMessage) emptyMessage.remove();

    const row = document.createElement("li");
    row.className = "history-row";

    const number = document.createElement("span");
    number.className = "history-number";
    number.textContent = String(roundsPlayed).padStart(2, "0");

    const matchup = document.createElement("span");
    matchup.className = "history-matchup";
    matchup.textContent = `${choices[playerSelection].label} / ${choices[computerSelection].label}`;

    const result = document.createElement("span");
    result.className = "history-outcome";
    result.dataset.outcome = outcome;
    result.textContent = outcome === "tie" ? "DRAW" : outcome.toUpperCase();

    row.append(number, matchup, result);
    historyList.prepend(row);
    historyCount.textContent = `${roundsPlayed} ${roundsPlayed === 1 ? "ROUND" : "ROUNDS"} PLAYED`;
}

function finishMatch() {
    gameOver = true;
    moveButtons.forEach((button) => { button.disabled = true; });
    matchState.dataset.status = "finished";
    matchStateText.textContent = "MATCH COMPLETE";
    resultElement.dataset.outcome = playerScore === 5 ? "win" : "lose";
    resultElement.textContent = playerScore === 5 ? "You win the match!" : "Computer wins the match!";
}

function resetMatch() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    gameOver = false;
    updateScore();

    moveButtons.forEach((button) => { button.disabled = false; });
    playerChoiceElement.textContent = "?";
    computerChoiceElement.textContent = "?";
    playerChoiceElement.setAttribute("aria-label", "No move yet");
    computerChoiceElement.setAttribute("aria-label", "No move yet");
    playerCaption.textContent = "YOUR HAND";
    computerCaption.textContent = "HIDDEN HAND";
    roundCountElement.textContent = "ROUND 01";
    resultElement.textContent = "The table is yours.";
    delete resultElement.dataset.outcome;
    matchState.dataset.status = "ready";
    matchStateText.textContent = "READY WHEN YOU ARE";
    historyCount.textContent = "NO ROUNDS YET";
    historyList.replaceChildren();

    const emptyMessage = document.createElement("li");
    emptyMessage.className = "history-empty";
    emptyMessage.id = "history-empty";
    emptyMessage.textContent = "Your match history will show up here.";
    historyList.append(emptyMessage);
}