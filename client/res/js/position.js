import Tile from "./tile.js";
import Piece from "./piece.js";

export default class Position {
    constructor(board, x, y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 250;
        this.pieceSize = 50;
        this.tiles = [];
        this.createTiles();
        this.pieces = [];
        this.ownedBy = "";
    }
    
    createTiles() {
        if (this.y < this.board.h / 2) {
            for (let y = this.y; y < this.y + this.h; y += this.pieceSize) {
                this.tiles.push(new Tile(this, this.x, y));
            }
        } else if (this.y > this.board.h / 2) {
            for (let y = this.y + this.h - this.pieceSize; y >= this.y; y -= this.pieceSize) {
                this.tiles.push(new Tile(this, this.x, y));
            }
        }
    }

    addPiece(player) {
        if (this.pieces.length <= 4) {
            this.pieces.push(new Piece(this.board, this, player, this.tiles[this.pieces.length]));
        } else {
            this.pieces.push(new Piece(this.board, this, player, this.tiles[4]));
        }
    }

    movePiece() {
        const targetPos = this.board.positions[this.board.positions.indexOf(this) + (this.board.dice[0] * this.board.direction)];

        if ((this.ownedBy === this.board.currentPlayer || (this.pieces.length === 1 && this.pieces[0].owner === this.board.currentPlayer)) 
            && this.pieces.length > 0
            && (targetPos.ownedBy !== this.board.otherPlayer)
        ) {
            if (targetPos.pieces.length === 1 && targetPos.pieces[0].owner !== this.board.currentPlayer) {
                targetPos.killPiece();
            }
            
            this.pieces.pop();
            targetPos.addPiece(this.board.currentPlayer);
            this.board.dice.shift();
        }
    }
    
    killPiece() {
        this.pieces.pop();
        if (this.board.otherPlayer === "player1") {
            this.board.killedTiles[1].pieces++;
        } else if (this.board.otherPlayer === "player2") {
            this.board.killedTiles[0].pieces++;
        }
    }

    clickPosition(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
            this.movePiece();
        }
    }

    draw(context) {
        if (this.pieces.length <= 5) {
            for (let i = 0; i < this.pieces.length; ++i) {
                this.pieces[i].draw(context);
            }
        } else {
            for (let i = 0; i < 5; ++i) {
                this.pieces[i].draw(context);
            }
            context.save();
            context.font = "30px Roboto";
            if (this.ownedBy === "player1") {
                context.fillStyle = "rgb(0, 0, 0)";
            } else if (this.ownedBy === "player2") {
                context.fillStyle = "rgb(255, 255, 255)";
            }
            context.fillText(this.pieces.length, this.pieces[4].x + 20, this.pieces[4].y + 35);
            context.restore();
        }
    }

    update() {
        if (this.pieces.length > 1) {
            this.ownedBy = this.pieces[0].owner;
        } else {
            this.ownedBy = "";
        }
    }
}