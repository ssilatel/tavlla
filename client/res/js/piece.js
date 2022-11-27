export default class Piece {
    constructor(board, position, owner, tile) {
        this.board = board;
        this.position = this.board.positions[this.board.positions.indexOf(position)];
        this.owner = owner;
        this.image = undefined;
        if (this.owner === "player1") {
            this.image = document.getElementById("whitePiece");
        } else {
            this.image = document.getElementById("blackPiece");
        }
        this.x = tile.x;
        this.y = tile.y;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.position.pieceSize, this.position.pieceSize);
    }
}