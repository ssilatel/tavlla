import Board from "./board.js";

window.addEventListener("load", function () {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const board = new Board(canvas);
    board.setBoard();

    canvas.addEventListener("click", (event) => {
        const canvasRect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - canvasRect.left;
        const mouseY = event.clientY - canvasRect.top;
        for (let i = 0; i < board.positions.length; ++i) {
            board.positions[i].clickPosition(mouseX, mouseY);
        }
    });

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        board.draw(ctx);
        board.update();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
});