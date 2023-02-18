export type Team = "one" | "two"
export type Role = "guesser" | "orator"
export type Trap = { value: string; author: string }
export type RoundPhase =
  | "pre round"
  | "trapping"
  | "pre guessing one"
  | "guessing one"
  | "pre guessing two"
  | "guessing two"