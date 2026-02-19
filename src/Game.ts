import { GameState, Cell } from "./types/types"
import { Board } from "./Board"

export class Game {
    private gameState: GameState;
    private pressedCell: HTMLElement | null = null;
    private board: Board;
    private cellElements: HTMLDivElement[][];

    constructor (gameBoard: Board) {
        this.gameState = "not started";
        this.pressedCell = null;
        this.board = gameBoard;
        this.cellElements = this.makeCellDisplay(gameBoard);
    }

    public resetGame() {
        //reset board

        //reset game state

        //reset click Events to adjust to new cells
    }

    private makeCellDisplay(board: Board): HTMLDivElement[][] {
        const grid = this.board.getBoard();
        const cellArr: HTMLDivElement[][] = [];

        grid.forEach((row, y) => {
            const cellArrRow: HTMLDivElement[] = []
            row.forEach((cell, x) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");

                this.addClickEvents(cellElement);
                cellElement.dataset.x = String(x);
                cellElement.dataset.y = String(y);
                cellArrRow.push(cellElement);
            }) 
            cellArr.push(cellArrRow);
        })
        return cellArr;
    }

    // ! convert to purely displaying the board (not adding classes -- do that in makeDisplayBoard)
    public displayGameBoard(boardGrid: Cell[][]): HTMLElement {
        const gameMenuDiv = document.createElement("div");
        gameMenuDiv.id = "gameMenu";

        const gameOptionsDiv = document.createElement("div");
        gameOptionsDiv.id = "gameOptions";
        gameOptionsDiv.textContent = "options";

        const boardDiv = document.createElement("div");
        boardDiv.id = "gameBoard";
        boardDiv.classList.add("gameBoard");
        //caps the num of columns so the next row begins
        boardDiv.style.gridTemplateColumns = `repeat(${boardGrid[0].length}, )`;

        this.cellElements.forEach((cellRow) => {
            cellRow.forEach((cellEl) => {
                boardDiv.appendChild(cellEl);
            })
        })

        gameMenuDiv.appendChild(gameOptionsDiv);
        gameMenuDiv.appendChild(boardDiv);
        return boardDiv;
    }

    // Todo: Finish openCell 
    private openCell(cell: HTMLDivElement) {
        const cellGrid = this.board.getBoard()
        const boardCell = cellGrid[Number(cell.dataset.y)][Number(cell.dataset.x)]
        if (!cellGrid || cell.classList.contains("revealed")) return
        // -1 = mine
        if (boardCell.value === -1) {
            // ! Add Game Over
            try {
                const boardDiv = document.querySelector("#gameBoard");
                if (!boardDiv) throw new Error("Cant find gameBoard Div")
                boardDiv.classList.add("finished")
            } catch (e) {
                console.log(e)
            }
            this.gameState = "finished";
            this.addStyles(boardCell, cell)
        }

        if (this.gameState === "not started") this.gameState = "in progress";

        // Todo: finish this
        if (this.board.getOpenCellCount() === (this.board.getNumOfCells() - this.board.getNumOfMines())) {
            this.gameState = "finished";
            console.log("you won!")
        }

        if (boardCell.value > 0) {
            this.board.addOpenCellCount();

            cell.textContent = String(boardCell.value);
            boardCell.state = 'open';
            this.addStyles(boardCell, cell)
        }

        // openZeros() method will add "revealed" class to the zeros
        cell.classList.add("revealed");

        if (boardCell.value === 0) {
            try {
                if (!(cell.dataset.x) && !(cell.dataset.y)) {
                    throw new Error("No dataset coordinates")
                }
                const groupdedZeros = this.findGroupedZerosAndBorder(cellGrid, Number(cell.dataset.x), Number(cell.dataset.y))
                this.openZeros(groupdedZeros, cellGrid);
            } catch (e) {
                console.log(e)
            }
        }
    }

    private openZeros(zerosAndBorderList: number[][], cellGrid: Cell[][]) {
        const cellDivs = this.cellElements
        zerosAndBorderList.forEach((cellCoordinate) => {
            this.board.addOpenCellCount();

            //zeroCoordinate => [x,y] structure
            const x = cellCoordinate[0];
            const y = cellCoordinate[1];

            const boardCell = cellGrid[y][x]
            const cellEl = cellDivs[y][x]

            boardCell.state = 'open';
            cellEl.classList.add("revealed");
            
            if (cellGrid[y][x].value !== 0) {
                cellEl.textContent = String(boardCell.value);
                this.addStyles(boardCell, cellEl)
            }
        })
    }

    private findGroupedZerosAndBorder(graph: Cell[][], startCellX: number, startCellY: number):number[][] {
        const foundZerosAndBorder: number[][] = [];
        const visited: number[][] = [];
        const queue: number[][] = [];

        const traversalNums: number[][] = [
            [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
        ]

        queue.push([startCellX, startCellY]);
        visited.push([startCellX, startCellY]);
        foundZerosAndBorder.push([startCellX, startCellY]);

        while (queue.length > 0) {
            // console.log(foundZerosAndBorder)
            const cellCoords = queue.shift();
            if (!cellCoords) throw new Error("No Cell Coordinates");

            traversalNums.forEach((travelNum) => {
                const nextCellX = cellCoords[0] + travelNum[0];
                const nextCellY = cellCoords[1] + travelNum[1];

                if (nextCellX < 0 || nextCellX > graph[0].length - 1  ||
                    nextCellY < 0 || nextCellY > graph.length - 1) {
                    return;
                }

                const hasXY = (element: number[]) => {
                    if (element[0] === nextCellX && element[1] === nextCellY) {
                        return true
                    }
                    return false
                }

                //checks if it is processed or in the process
                if (visited.some(hasXY) || queue.some(hasXY)) {
                    return;
                }

                if (graph[nextCellY][nextCellX].value !== 0) {
                    visited.push([nextCellX, nextCellY])
                    foundZerosAndBorder.push([nextCellX, nextCellY]);
                    return;
                }

                queue.push([nextCellX, nextCellY]);
                foundZerosAndBorder.push([nextCellX, nextCellY]);
            })

            visited.push([cellCoords[0], cellCoords[1]])
        }
        return foundZerosAndBorder;
    }


    private flagCell(cellEl: HTMLDivElement) {
        const cellGrid = this.board.getBoard()
        const cell = cellGrid[Number(cellEl.dataset.y)][Number(cellEl.dataset.x)]

        cell.state = "flagged";
        cellEl.classList.add("flagged");

        
    }


    private addClickEvents(element: HTMLElement) {
        element.addEventListener("mousedown", (e) => {
            if (!(e.button === 0)) return;

            if (!(e.target instanceof Element)) return;
            e.preventDefault();

            const cell = e.target.closest<HTMLDivElement>(".cell");
            if (!cell) return;

            this.pressedCell = cell;
        })

        element.addEventListener("mouseup", (e) => { //left click up
            if (!(e.button === 0)) return;

            if (!(e.target instanceof Element)) {
                this.pressedCell = null;
                return;
            }
            const cell = e.target.closest<HTMLDivElement>(".cell");

            //(cell) to check if cell is not a null
            if ((cell) && cell === this.pressedCell) {
                this.openCell(cell)
            }
            this.pressedCell = null;
        })

        //right click
        element.addEventListener("contextmenu", (e) => {
            if (!(e.target instanceof Element)) return;
            e.preventDefault();

            const cell = e.target.closest<HTMLDivElement>(".cell");

            this.flagCell(cell); 
        })
    }

    private addStyles(cell: Cell, cellEl: HTMLDivElement) {
        if (cell.value === -1) { cellEl.classList.add("mine")}
        else if (cell.value === 1) cellEl.classList.add("one");
        else if (cell.value === 2) cellEl.classList.add("two");
        else if (cell.value === 3) cellEl.classList.add("three");
        else if (cell.value === 4) cellEl.classList.add("four");
        else if (cell.value === 5) cellEl.classList.add("five");
        else if (cell.value === 6) cellEl.classList.add("six");
        else if (cell.value === 7) cellEl.classList.add("seven");
        else if (cell.value === 8) cellEl.classList.add("eight");
    }
}