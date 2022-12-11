export default class RollButton {
    constructor(board, x, y, w, h) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rolling = true;
        this.showingDice = false;
        this.confirming = false;
        this.diceNumbers = [];
    }

    clickButton(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
            if (this.rolling) {
                this.rolling = false;
                this.showingDice = true;
                this.diceNumbers = [];
                this.board.setState(2);
                this.diceNumbers.push(this.board.dice[0]);
                this.diceNumbers.push(this.board.dice[1]);
            }
        }

        if (mouseX >= this.x && mouseX <= this.x + this.w + 50 && mouseY >= this.y && mouseY <= this.y + this.h) {
            if (this.showingDice && this.board.dice.length === 2) {
                let tmp = this.board.dice[0];
                this.board.dice[0] = this.board.dice[1];
                this.board.dice[1] = tmp;
                this.diceNumbers[0] = this.board.dice[0];
                this.diceNumbers[1] = this.board.dice[1];
            }
        }

        if (mouseX >= this.x && mouseX <= this.x + this.w + 50 && mouseY >= this.y && mouseY <= this.y + this.h) {
            if (this.confirming) {
                this.board.currentPlayer.movedDice = [];
                this.board.currentPlayer.lastMove = [];
                this.board.currentPlayer.hasMoved = false;
                this.board.changePlayer();
                this.board.setState(1);
                this.confirming = false;
                this.rolling = true;
            }
        }
    }

    drawRolling(context) {
        if (this.rolling) {
            context.save();
            context.fillStyle = "rgb(255, 255, 255)";
            context.fillRect(this.x, this.y, this.w, this.h);
            context.font = "30px Roboto";
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillText("Roll", this.x + (this.w * 0.2), this.y + (this.h * 0.7));
            context.restore();
        }
    }

    drawDice(context) {
        if (this.showingDice) {
            context.save();
            context.fillStyle = "rgb(255, 255, 255)";
            context.fillRect(this.x, this.y, 50, 50);
            context.fillRect(this.x + 75, this.y, 50, 50);
            context.font = "30px Roboto";
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillText(this.diceNumbers[0], this.x + (this.w * 0.2), this.y + (this.h * 0.7));
            context.fillText(this.diceNumbers[1], this.x + 75 + (this.w * 0.2), this.y + (this.h * 0.7));
            context.restore();
        }
    }

    drawConfirming(context) {
        if (this.confirming) {
            context.save();
            context.fillStyle = "rgb(255, 255, 255)";
            context.fillRect(this.x, this.y, 150, 50);
            context.font = "30px Roboto";
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillText("Confirm", this.x + 10, this.y + (this.h * 0.7));
            context.restore();
        }
    }

    draw(context) {
        if (this.rolling) {
            this.drawRolling(context);
        } else if (this.showingDice) {
            this.drawDice(context);
        } else if (this.confirming) {
            this.drawConfirming(context);
        }
    }
}