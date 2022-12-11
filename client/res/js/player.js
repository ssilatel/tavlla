export default class Player {
    constructor(board, name) {
        this.board = board;
        this.name = name;
        this.hasMoved = false;
        this.movedDice = [];
        this.lastMove = [];
        this.killedPieces = []
    }
}