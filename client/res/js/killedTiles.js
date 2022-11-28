export default class KilledTile {
    constructor(board, x, y, owner) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.pieces = 0;
        this.image = undefined;
        if (this.owner === "player1") {
            this.image = document.getElementById("whitePiece");
        } else {
            this.image = document.getElementById("blackPiece");
        }
    }

    draw(context) {
        if (this.pieces=== 1) {
            context.drawImage(this.image, this.x, this.y, 50, 50);
        } else if (this.pieces > 1) {
            context.drawImage(this.image, this.x, this.y, 50, 50);
            context.save();
            context.font = "30px Roboto";
            if (this.owner === "player1") {
                context.fillStyle = "rgb(0, 0, 0)";
            } else if (this.owner === "player2") {
                context.fillStyle = "rgb(255, 255, 255)";
            }
            context.fillText(this.pieces, this.x + 15, this.y + 35);
            context.restore();
        }
    }
}