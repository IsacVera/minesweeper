type BoardState = "in progress" | "not started" | "finished";

type CellState = "open" | "unopened";

// ? These type mighnt not be needed
type CellContains = "bomb" | number;

export type Cell = {
    state: CellState,
    contains: CellContains, 
}