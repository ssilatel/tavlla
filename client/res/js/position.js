import Tile from "./tile.js";
import Piece from "./piece.js";

export default class Position {
    constructor(board, x, y, pos) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 250;
        this.pieceSize = 50;
        this.tiles = [];
        this.createTiles();
        this.pieces = [];
        this.clicked = false;
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
        this.pieces.push(new Piece(this.board, this, player, this.tiles[this.pieces.length]));
    }

    movePiece() {
        if (this.pieces.length > 0) {
            this.pieces.pop();
            this.board.positions[this.board.positions.indexOf(this) + 1].addPiece();
        }
    }

    clickPosition(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
            this.clicked = true;
        }
    }

    draw(context) {
        for (let i = 0; i < this.pieces.length; ++i) {
            this.pieces[i].draw(context);
        }
    }

    update() {
        if (this.clicked) {
            this.movePiece();
            this.clicked = false;
        }
    }
}