import KilledTile from "./killedTiles.js";
import Player from "./player.js";
import Position from "./position.js";
import RollButton from "./rollButton.js";
import UndoButton from "./undoButton.js";
import { PreGame, Rolling, Moving } from "./states.js";

export default class Board {
    constructor(canvas) {
        this.canvas = canvas
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.image = document.getElementById("board");
        this.players = [new Player(this, "player1"), new Player(this, "player2")];
        this.player1 = this.players[0].name;
        this.player2 = this.players[1].name;
        this.currentPlayer = this.players[0];
        this.otherPlayer = this.players[1];
        this.direction = 1;
        this.dice = [];
        this.positions = [];
        this.createPositions();
        this.killedTiles = [new KilledTile(this, 375, 225, this.player2), new KilledTile(this, 375, 425, this.player1)];
        this.rollButton = new RollButton(this, 550, 325, 100, 50);
        this.undoButton = new UndoButton(this, 150, 325, 100, 50);
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
        this.positions.unshift(new Position(this, 750, 400));
        this.positions.push(new Position(this, 750, 50));
    }

    addPieceToPosition(position, player)  {
        this.positions[position].addPiece(player);
    }

    setBoard() {
        this.currentPlayer = this.players[0];
        this.otherPlayer = this.players[1];
        this.direction = 1;
        this.addPieceToPosition(1, this.player1);
        this.addPieceToPosition(1, this.player1);
        this.addPieceToPosition(6, this.player2);
        this.addPieceToPosition(6, this.player2);
        this.addPieceToPosition(6, this.player2);
        this.addPieceToPosition(6, this.player2);
        this.addPieceToPosition(6, this.player2);
        this.addPieceToPosition(8, this.player2);
        this.addPieceToPosition(8, this.player2);
        this.addPieceToPosition(8, this.player2);
        this.addPieceToPosition(12, this.player1);
        this.addPieceToPosition(12, this.player1);
        this.addPieceToPosition(12, this.player1);
        this.addPieceToPosition(12, this.player1);
        this.addPieceToPosition(12, this.player1);
        this.addPieceToPosition(13, this.player2);
        this.addPieceToPosition(13, this.player2);
        this.addPieceToPosition(13, this.player2);
        this.addPieceToPosition(13, this.player2);
        this.addPieceToPosition(13, this.player2);
        this.addPieceToPosition(17, this.player1);
        this.addPieceToPosition(17, this.player1);
        this.addPieceToPosition(17, this.player1);
        this.addPieceToPosition(19, this.player1);
        this.addPieceToPosition(19, this.player1);
        this.addPieceToPosition(19, this.player1);
        this.addPieceToPosition(19, this.player1);
        this.addPieceToPosition(19, this.player1);
        this.addPieceToPosition(24, this.player2);
        this.addPieceToPosition(24, this.player2);
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
        this.currentPlayer.piecesKilledThisTurn = [];
        
        if (this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1];
            this.otherPlayer = this.players[0];
            this.direction = -1;
        } else if (this.currentPlayer === this.players[1]) {
            this.currentPlayer = this.players[0];
            this.otherPlayer = this.players[1];
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
        if (this.currentPlayer.hasMoved) {
            this.undoButton.draw(context);
        }
    }

    update() {
        this.currentState.update();
    }
}