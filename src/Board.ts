import { Cell } from "./types/types";

export class Board {
    private grid: Cell[][];
    private rowLength: number;
    private colLength: number;
    private numOfMines: number;
    private cellsFlagged: number;
    private openCellCount: number;

    constructor() {
        this.rowLength =  8;
        this.colLength =  10;
        this.numOfMines = 10;
        this.cellsFlagged = 0;
        this.openCellCount = 0;
        this.grid = this.makeBoard(this.rowLength, this.colLength);
    }

    public getBoard(): Cell[][] {
        return this.grid;
    }

    public getNumOfCells(): number {
        return this.colLength * this.rowLength;
    }

    public getNumOfMines(): number {
        return this.numOfMines;
    }

    public getNumOfCellsFlagged(): number {
        return this.cellsFlagged;
    }

    public addCellsFlagged(): void {
        this.cellsFlagged++;
    }

    public subtractCellsFlagged(): void {
        this.cellsFlagged--;
    }

    public getOpenCellCount(): number {
        return this.openCellCount;
    }

    public addOpenCellCount(): void {
        this.openCellCount++;
    }

    private resetOpenCellCount(): void {
        this.openCellCount = 0;
    }

    public makeBoard(rowLen: number, colLen: number) {
        this.resetOpenCellCount()
        const arr: Cell[][] = []; 

        for (let i=0; i < rowLen; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < colLen; j++) {
                const cell: Cell = {state: "unopened", value: 0}
                row.push(cell);
            }
            arr.push(row);
        } 

        this.fillBoardMines(arr);
        this.fillBoardNums(arr);
        return arr;
    }

    private fillBoardMines(grid: Cell[][]):void {
        const coordList: number[][] = [];

        for (let i=0; i<this.rowLength; i++) {
            for (let j=0; j<this.colLength; j++) {
                coordList.push([i, j]);
            }
        }

        let mineCount = 0;
        while (mineCount < this.numOfMines) {
            const mineFreeCells = coordList.length;
            const randCoord = Math.floor(Math.random() * mineFreeCells);

            // .splice returns an array so the [0] at the end just removes the outer array
            //  since we only want one element from the array
            const mineCoord = coordList.splice(randCoord, 1)[0]; 
            grid[mineCoord[0]][mineCoord[1]].value = -1;
            mineCount++;
        }
    }

    private getCoordsAroundMine(row: number, col: number): number[][] {
        const coordList: number[][] = []
        for(let i=-1; i<2; i++) {
            for(let j=-1; j<2; j++) {
                if (i === 0 && j === 0) continue;
                if (row + i < 0 || row + i > this.rowLength-1) continue;
                if (col + j < 0 || col + j > this.colLength-1) continue;

                coordList.push([row + i, col + j])
            }
        } 
        return coordList
    }

    private fillBoardNums(board: Cell[][]): void {
        const coordsToAddTo: number[][] = []

        for(let i=0; i<this.rowLength; i++) {
            for(let j=0; j<this.colLength; j++) {
                if (board[i][j].value === -1) {
                    const tempList = this.getCoordsAroundMine(i, j); 
                    tempList.forEach((coords) => coordsToAddTo.push(coords))
                }
            }
        }

        coordsToAddTo.forEach((val) => {
            const yCoord = val[0]
            const xCoord = val[1]

            if (board[yCoord][xCoord].value !== -1) {
                board[yCoord][xCoord].value++;
            }
        })
    }
}