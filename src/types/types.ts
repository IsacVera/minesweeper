type BoardState = "in progress" | "not started" | "finished";

export type Board = {
    state: BoardState,
    grid: number[][],
    rowLength: number;
    colLength: number;
    mineNum: number;
}

type CellState = "open" | "unopened";
type CellContains = "bomb" | number;

export type Cell = {
    state: CellState,
    contains: CellContains, 
}