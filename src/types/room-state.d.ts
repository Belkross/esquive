export type Team = "one" | "two"
export type Role = "guesser" | "orator"

export type RoundPhase =
  | "pre round"
  | "trapping"
  | "pre guessing one"
  | "guessing one"
  | "pre guessing two"
  | "guessing two"

export type RoundSettingsStructure<Type> = {  trapSlotProvided: Type
  guessAttemptProvided: Type
  winCondition: Type
  trappingDuration: Type
  guessingDuration: Type}

export type RoundSettings = RoundSettingsStructure<number>
