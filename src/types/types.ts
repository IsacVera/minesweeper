export type GameState = "in progress" | "not started" | "finished";

type CellState = "open" | "unopened" | "flagged";

export type Cell = {
    state: CellState,
    value: number, 
}