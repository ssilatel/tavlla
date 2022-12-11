export default class UndoButton {
    constructor(board, x, y, w, h) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.showing = true;
    }

    undoMove() {
        this.board.dice.unshift(this.board.currentPlayer.movedDice[this.board.currentPlayer.movedDice.length - 1]);
        this.board.currentPlayer.movedDice.pop();
        this.board.positions[this.board.currentPlayer.lastMove[this.board.currentPlayer.lastMove.length - 1].from].addPiece(this.board.currentPlayer.name);
        this.board.positions[this.board.currentPlayer.lastMove[this.board.currentPlayer.lastMove.length - 1].to].removePiece();
        this.board.currentPlayer.lastMove.pop();
    
        if (this.board.currentPlayer.movedDice.length === 0) {
            this.board.currentPlayer.hasMoved = false;
        }

        if (this.board.currentPlayer.killedPieces[this.board.currentPlayer.killedPieces.length - 1].pos !== 0) {
            for (let i = 0; i < this.board.killedTiles.length; ++i) {
                if (this.board.killedTiles[i].owner === this.board.otherPlayer.name) {
                    this.board.killedTiles[i].removePiece();
                }
            }
            this.board.positions[this.board.currentPlayer.killedPieces[this.board.currentPlayer.killedPieces.length - 1].pos].addPiece(this.board.otherPlayer.name)
            this.board.currentPlayer.killedPieces.pop();
        } else {
            this.board.currentPlayer.killedPieces.pop();
            return;
        }
    }

    clickButton(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h && this.board.currentPlayer.hasMoved) {
            this.undoMove();
        }
    }

    draw(context) {
        context.save();
        context.fillStyle = "rgb(255, 255, 255)";
        context.fillRect(this.x, this.y, this.w, this.h);
        context.font = "30px Roboto";
        context.fillStyle = "rgb(0, 0, 0)";
        context.fillText("Undo", this.x + (this.w * 0.1), this.y + (this.h * 0.7));
        context.restore();
    }
}