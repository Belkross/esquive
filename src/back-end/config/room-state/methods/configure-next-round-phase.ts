import { RoomState } from "../room-state.js"

export function configureNextRoundPhase(this: RoomState, username?: string) {
  this.progressToNextRoundPhase()

  //WARNING: for some functions, the apparition order matters
  switch (this.roundAdvancement) {
    //phase : pre round
    case 1: {
      this.announceEventualGuessFailure(this.getOpponentTeam(this.startingTeam))
      this.setTimer(this.trappingDuration)
      this.resetGuessAttemptsRemaining()
      this.resetGuessAttempts()
      this.resetSecretWordOpinions("bothTeam")
      this.resetAllTrapOpinions()
      this.applyRoundOutcome()
      this.switchStartingTeam()

      if (this.checkIfEndOfMatch()) this.announceMatchWinner()
      this.announceNextPhase()
      break
    }

    //phase : trapping
    case 2: {
      //in phase 2 to let users see round outcome
      if (this.checkIfEndOfMatch()) this.resetScores()
      this.resetTeamOutcomes() 

      this.resetSecretWordChangeRemaining()
      this.resetTraps()
      this.drawSecretWord("one")
      this.drawSecretWord("two")
      this.announceTimerStart(username)
      break
    }
    //phase : pre guessing one/two
    case 3: {
      this.makeSureTeamsHaveOrator()
      this.setTimer(this.guessingDuration)
      this.announceNextPhase()
      break
    }
    //phase : guessing one/two
    case 4: {
      this.announceTimerStart(username)
      break
    }
    //phase : pre guessing one/two
    case 5: {
      this.announceEventualGuessFailure(this.startingTeam)
      this.setTimer(this.guessingDuration)
      this.announceNextPhase()
      break
    }
    //phase : guessing one/two
    case 6: {
      this.announceTimerStart(username)
      break
    }
    // No default
  }
}
