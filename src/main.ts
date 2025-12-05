import { Game } from './Game'

const gameBoard = document.createElement('div');
document.body.appendChild(gameBoard);

window.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    console.log(game.getBoard())

});