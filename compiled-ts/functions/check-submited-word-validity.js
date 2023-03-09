import { RoomState } from "../back-end/config/room-state/room-state.js";
export function checkSubmitedWordValidity(word) {
    if (typeof word !== "string")
        return false;
    const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${RoomState.WORD_SUBMITION_MIN_LENGTH},${RoomState.WORD_SUBMITION_MAX_LENGTH}}$`;
    const regex = new RegExp(modele, "i");
    return regex.test(word);
}
