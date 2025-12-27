export class Board {
    private grid: number[][];
    private rowLength: number;
    private colLength: number;
    private mineNum: number;

    constructor() {
        this.rowLength =  8;
        this.colLength =  10;
        this.mineNum = 10;
        this.grid = this.resetBoard(this.rowLength, this.colLength);
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

        this.fillBoardMines(arr);
        this.fillBoardNums(arr);
        return arr;
    }

    private fillBoardMines(grid: number[][]):void {
        const coordList: number[][] = [];

        for (let i=0; i<this.rowLength; i++) {
            for (let j=0; j<this.colLength; j++) {
                coordList.push([i, j]);
            }
        }

        let mineCount = 0;
        while (mineCount < this.mineNum) {
            const mineFreeCells = coordList.length;
            const randCoord = Math.floor(Math.random() * mineFreeCells);

            // .splice returns an array so the [0] at the end just removes the outer array
            //  since we only want one element from the array
            const mineCoord = coordList.splice(randCoord, 1)[0]; 
            grid[mineCoord[0]][mineCoord[1]] = -1;
            mineCount++;
        }
    }

    private fillBoardNums(board: number[][]): void {
        const getCoordsAroundMine = (row: number, col: number) => {
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

        const coordsToAddTo: number[][] = []

        for(let i=0; i<this.rowLength; i++) {
            for(let j=0; j<this.colLength; j++) {
                if (board[i][j] === -1) {
                    const tempList = getCoordsAroundMine(i, j); 
                    tempList.forEach((coords) => coordsToAddTo.push(coords))
                }
            }
        }

        coordsToAddTo.forEach((val) => {
            const yCoord = val[0]
            const xCoord = val[1]

            if (board[yCoord][xCoord] !== -1) {
                board[yCoord][xCoord]++;
            }
        })
    }

    public getBoard(): number[][] {
        return this.grid;
    }


}