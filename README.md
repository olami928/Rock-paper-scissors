# Rock Paper Scissors

A responsive browser game of Rock Paper Scissors against the computer. Reach five points first to win the match.

## Run the game

Open `index.html` in a web browser. If you are using a remote workspace or prefer to run a local server, start one from the project directory:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Keep the terminal running while you play; press Ctrl+C to stop the server.

## Play

- Choose Rock, Paper, or Scissors to play a round.
- A win gives you a point; a computer win gives it a point. Draws do not change the score.
- The first player to five points wins, and the round log keeps track of moves.
- Select **Reset** to start a new match.

## Checks

With Node.js installed, run the project's JavaScript syntax checks:

```bash
npm test
```

This checks `script.js` and `index.js` for syntax errors. It does not run automated gameplay tests.

## Project files

- `index.html` contains the browser game's structure.
- `styles.css` provides its responsive visual design.
- `script.js` runs the interactive browser game.
- `index.js` contains a separate prompt-and-console version.
- `package.json` defines the npm syntax-check command.
