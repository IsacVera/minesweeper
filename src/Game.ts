import { BoardState } from "./types/types"
export class Game {
    private gameState: BoardState;

    constructor () {
        this.gameState = "not started"
    }

    public displayBoard(board: number[][]): HTMLElement {
        const boardDiv = document.createElement("div");
        console.log(board)

        board.forEach((row, y) => {
            const rowDiv = document.createElement("div");
            row.forEach((cellValue, x) => {
                const cell = document.createElement("div");
                cell.textContent = String(cellValue);

                cell.classList.add("cell");
                if (cellValue === -1) { cell.classList.add("mine"); cell.textContent = ""}
                else if (cellValue === 1) cell.classList.add("one")
                else if (cellValue === 2) cell.classList.add("two")
                else if (cellValue === 3) cell.classList.add("three")
                else if (cellValue === 4) cell.classList.add("four")
                else if (cellValue === 5) cell.classList.add("five")
                else if (cellValue === 6) cell.classList.add("six")
                else if (cellValue === 7) cell.classList.add("seven")
                else if (cellValue === 8) cell.classList.add("eight")
                
                cell.dataset.x = String(x)
                cell.dataset.y = String(y)
                boardDiv.appendChild(cell);
            })
        });

        return boardDiv;
    }
}