import Position from "./position.js";

export default class Board {
    constructor(canvas, image) {
        this.canvas = canvas
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.image = document.getElementById("board");
        this.positions = [];
        this.createPositions();
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
        this.addPieceToPosition(0, "player1");
        this.addPieceToPosition(0, "player1");
        this.addPieceToPosition(5, "player2");
        this.addPieceToPosition(5, "player2");
        this.addPieceToPosition(5, "player2");
        this.addPieceToPosition(5, "player2");
        this.addPieceToPosition(5, "player2");
        this.addPieceToPosition(7, "player2");
        this.addPieceToPosition(7, "player2");
        this.addPieceToPosition(7, "player2");
        this.addPieceToPosition(11, "player1");
        this.addPieceToPosition(11, "player1");
        this.addPieceToPosition(11, "player1");
        this.addPieceToPosition(11, "player1");
        this.addPieceToPosition(11, "player1");
        this.addPieceToPosition(12, "player2");
        this.addPieceToPosition(12, "player2");
        this.addPieceToPosition(12, "player2");
        this.addPieceToPosition(12, "player2");
        this.addPieceToPosition(12, "player2");
        this.addPieceToPosition(16, "player1");
        this.addPieceToPosition(16, "player1");
        this.addPieceToPosition(16, "player1");
        this.addPieceToPosition(18, "player1");
        this.addPieceToPosition(18, "player1");
        this.addPieceToPosition(18, "player1");
        this.addPieceToPosition(18, "player1");
        this.addPieceToPosition(18, "player1");
        this.addPieceToPosition(23, "player2");
        this.addPieceToPosition(23, "player2");
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.positions.length; ++i) {
            this.positions[i].draw(context);
        }
    }

    update() {
        for (let i = 0; i < this.positions.length; ++i) {
            this.positions[i].update();
        }
    }
}