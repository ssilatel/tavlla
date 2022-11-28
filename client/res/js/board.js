import KilledTile from "./killedTiles.js";
import Position from "./position.js";
import RollButton from "./rollButton.js";
import { PreGame, Rolling, Moving } from "./states.js";

export default class Board {
    constructor(canvas, image) {
        this.canvas = canvas
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.image = document.getElementById("board");
        this.currentPlayer = "";
        this.otherPlayer = "";
        this.direction = undefined;
        this.dice = [];
        this.positions = [];
        this.createPositions();
        this.killedTiles = [new KilledTile(this, 375, 225, "player2"), new KilledTile(this, 375, 425, "player1")];
        this.rollButton = new RollButton(this, 550, 325, 100, 50);
        this.states = [new PreGame(this), new Rolling(this), new Moving(this)];
        this.currentState = this.states[0];
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    createPositions() {
        for (let y = 50; y < this.canvas.height - 50; y += 350) {
            for (let x = 50; x < this.canvas.width - 50; x += 50) {
                if (x === 350) x += 100;
                this.positions.push(new Position(this, x, y));
            }
        }
        this.positions.reverse();
        this.positions = this.positions.splice(0, 12).concat(this.positions.reverse());
    }

    addPieceToPosition(position, player)  {
        this.positions[position].addPiece(player);
    }

    setBoard() {
        this.currentPlayer = "player1";
        this.otherPlayer = "player2";
        this.direction = 1;
        this.addPieceToPosition(0, this.currentPlayer);
        this.addPieceToPosition(0, this.currentPlayer);
        this.addPieceToPosition(5, this.otherPlayer);
        this.addPieceToPosition(5, this.otherPlayer);
        this.addPieceToPosition(5, this.otherPlayer);
        this.addPieceToPosition(5, this.otherPlayer);
        this.addPieceToPosition(5, this.otherPlayer);
        this.addPieceToPosition(7, this.otherPlayer);
        this.addPieceToPosition(7, this.otherPlayer);
        this.addPieceToPosition(7, this.otherPlayer);
        this.addPieceToPosition(11, this.currentPlayer);
        this.addPieceToPosition(11, this.currentPlayer);
        this.addPieceToPosition(11, this.currentPlayer);
        this.addPieceToPosition(11, this.currentPlayer);
        this.addPieceToPosition(11, this.currentPlayer);
        this.addPieceToPosition(12, this.otherPlayer);
        this.addPieceToPosition(12, this.otherPlayer);
        this.addPieceToPosition(12, this.otherPlayer);
        this.addPieceToPosition(12, this.otherPlayer);
        this.addPieceToPosition(12, this.otherPlayer);
        this.addPieceToPosition(16, this.currentPlayer);
        this.addPieceToPosition(16, this.currentPlayer);
        this.addPieceToPosition(16, this.currentPlayer);
        this.addPieceToPosition(18, this.currentPlayer);
        this.addPieceToPosition(18, this.currentPlayer);
        this.addPieceToPosition(18, this.currentPlayer);
        this.addPieceToPosition(18, this.currentPlayer);
        this.addPieceToPosition(18, this.currentPlayer);
        this.addPieceToPosition(23, this.otherPlayer);
        this.addPieceToPosition(23, this.otherPlayer);
    }

    rollDice() {
        this.dice = [];
        let firstDice = Math.floor(Math.random() * 6 + 1);
        let secondDice = Math.floor(Math.random() * 6 + 1);
        if (firstDice === secondDice) {
            for (let i = 0; i < 4; ++i) {
                this.dice.push(firstDice);
            }
        } else {
            this.dice.push(firstDice);
            this.dice.push(secondDice);
        }
    }

    changePlayer() {
        if (this.currentPlayer === "player1") {
            this.currentPlayer = "player2";
            this.otherPlayer = "player1";
            this.direction = -1;
        } else if (this.currentPlayer === "player2") {
            this.currentPlayer = "player1";
            this.otherPlayer = "player2";
            this.direction = 1;
        }
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.positions.length; ++i) {
            this.positions[i].draw(context);
        }
        for (let i = 0; i < this.killedTiles.length; ++i) {
            this.killedTiles[i].draw(context);
        }
        this.rollButton.draw(context);
    }

    update() {
        this.currentState.update();
    }
}