import { Game } from './Game'
import { Board } from './Board'

window.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector("#app");

    const gameBoard = new Board();
    const game = new Game();

    const gameBoardDiv = game.displayBoard(gameBoard.getBoard());
    gameBoardDiv.id = "gameBoard";

    const board =  gameBoard.getBoard();
    //29px because cells are 25x25px plus the 2px boarder on each side
    gameBoardDiv.style.gridTemplateColumns = `repeat(${board[0].length}, 29px)`
    

    document.body.appendChild(gameBoardDiv);

    // game.displayBoard(gameBoard);
    console.log(gameBoard.getBoard());

});