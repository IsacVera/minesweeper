import { GameState, Cell } from "./types/types"
import { Board } from "./Board"

export class Game {
    private gameState: GameState;
    private pressedCell: HTMLElement | null = null;
    private gameBoard: Board;

    constructor (board: Board) {
        this.gameState = "not started";
        this.pressedCell = null;
        this.gameBoard = board;
    }

    public resetGame() {
        //reset board

        //reset game state

        //reset click Events to adjust to new cells
    }

    public displayBoard(board: Cell[][]): HTMLElement {
        const addClickEvents = (element: HTMLElement) => {
            element.addEventListener("pointerdown", (e) => {
                if (!(e.target instanceof Element)) return;
                e.preventDefault();

                const cell = e.target.closest<HTMLDivElement>(".cell") 
                if (!cell) return;

                this.pressedCell = cell;
            })

            element.addEventListener("pointerup", (e) => {
                if (!(e.target instanceof Element)) {
                    this.pressedCell = null;
                    return;
                }
                const cell = e.target.closest<HTMLDivElement>(".cell") 

                //(cell) to check if cell is not a null
                if ((cell) && cell === this.pressedCell) {
                    this.openCell(cell)
                }
                this.pressedCell = null;
            })
        }


        const boardDiv = document.createElement("div");

        board.forEach((row, y) => {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row") // used to help navigate the boardDiv
            row.forEach((cell, x) => {
                const cellElement = document.createElement("div");
                addClickEvents(cellElement)

                cellElement.classList.add("cell");
                if (cell.value === -1) { cellElement.classList.add("mine")}
                else if (cell.value === 1) cellElement.classList.add("one");
                else if (cell.value === 2) cellElement.classList.add("two");
                else if (cell.value === 3) cellElement.classList.add("three");
                else if (cell.value === 4) cellElement.classList.add("four");
                else if (cell.value === 5) cellElement.classList.add("five");
                else if (cell.value === 6) cellElement.classList.add("six");
                else if (cell.value === 7) cellElement.classList.add("seven");
                else if (cell.value === 8) cellElement.classList.add("eight");
                
                cellElement.dataset.x = String(x);
                cellElement.dataset.y = String(y);
                cellElement.dataset.value = `${cell.value}`;
                boardDiv.appendChild(cellElement);
            })
        });
        return boardDiv;
    }

    // Todo: Finish openCell 
    private openCell(cell: HTMLDivElement) {
        if (!cell.dataset.value || cell.classList.contains("revealed")) return
        // -1 = mine
        if (Number(cell.dataset.value) === -1) {
            // ! Add Game Over
            this.gameState = "finished";
        }

        if (this.gameState === "not started") this.gameState = "in progress";

        this.gameBoard.addOpenCellCount();

        // Todo: finish this
        if (this.gameBoard.getOpenCellCount() === (this.gameBoard.getNumOfCells() - this.gameBoard.getNumOfMines())) {
            this.gameState = "finished";
            console.log("you won!")
        }

        if (Number(cell.dataset.value) > 0) {
            cell.textContent = cell.dataset.value  ;
        }

        if (Number(cell.dataset.value) === 0) {
            
        }
        cell.classList.add("revealed");

        console.log(cell)
        console.log(cell.dataset)
    }

    private openZeros(cell: HTMLDivElement, map: number[][]) {

    }

    private addClickEvents(element: HTMLElement) {
        element.addEventListener("pointerdown", (e) => {
            if (!(e.target instanceof Element)) return;
            e.preventDefault();

            const cell = e.target.closest<HTMLDivElement>(".cell") 
            if (!cell) return;

            this.pressedCell = cell;
        })

        element.addEventListener("pointerup", (e) => {
            if (!(e.target instanceof Element)) {
                this.pressedCell = null;
                return;
            }
            const cell = e.target.closest<HTMLDivElement>(".cell") 

            //(cell) to check if cell is not a null
            if ((cell) && cell === this.pressedCell) {
                this.openCell(cell)
            }
            this.pressedCell = null;
        })
    }
}