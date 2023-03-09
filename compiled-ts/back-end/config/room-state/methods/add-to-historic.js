export function addToHistoric(message) {
    this.historic.push(message);
    const historicLimitExceeded = this.historic.length > this.historicLengthLimit;
    if (historicLimitExceeded) {
        const numberOfSuppression = this.historic.length - this.historicLengthLimit;
        this.historic.splice(0, numberOfSuppression);
    }
}
