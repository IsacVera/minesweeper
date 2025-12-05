import { Board } from "./types/types"
export class Game {
    private board: Board = {
            state: "not started",
            grid: [[]],
            rowLength: 9,
            colLength: 9,
        };

    constructor() {
        this.board.grid = this.resetBoard(this.board.rowLength, this.board.colLength);
    }

    public resetBoard(row: number, col: number): number[][]{
        const arr: number[][] = []
        for (let i=0; i<row; i++) {
            const row: number[] = [];
            for (let j=0; j<col; j++) {
                row.push(0);
            }
            arr.push(row);
        }

        return arr;
    }

    public getBoard(): number[][] {
        return this.board.grid;
    }


}