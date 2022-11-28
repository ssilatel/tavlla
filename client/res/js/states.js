class State {
    constructor(board) {
        this.board = board;
    }
}

export class PreGame extends State {
    constructor(board) {
        super(board);
    }

    enter() {
    }
    
    update() {
        this.board.setBoard();
        this.board.setState(1);
    }
}

export class Rolling extends State {
    constructor(board) {
        super(board);
    }

    enter() {
        this.board.rollButton.rolling = true;
        this.board.rollButton.showingDice = false;
    }

    update() {}
}

export class Moving extends State {
    constructor(board) {
        super(board);
    }

    enter() {
        this.board.rollDice();
    }

    update() {
        for (let i = 0; i < this.board.positions.length; ++i) {
            this.board.positions[i].update();
        }

        if (this.board.dice.length === 0) {
            this.board.rollButton.showingDice = false;
            this.board.rollButton.confirming = true;
        }
    }
}