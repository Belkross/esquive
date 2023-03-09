export function resetSecretWordChangeRemaining() {
    this.teams.one.secretWordChangeRemaining = this.secretWordChangeLimit;
    this.teams.two.secretWordChangeRemaining = this.secretWordChangeLimit;
}
