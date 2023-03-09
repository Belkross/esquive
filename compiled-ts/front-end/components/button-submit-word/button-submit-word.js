import { jsx as _jsx } from "react/jsx-runtime";
import { ButtonResponsive } from "../button-responsive.js";
import EditIcon from "@mui/icons-material/Edit";
import { getWhileModalAllowed } from "../interface-game/get-while-modal-allowed.js";
export function ButtonSubmitWord({ appState, openModal }) {
    const whileActivated = getWhileModalAllowed(appState);
    return (_jsx(ButtonResponsive, { icon: _jsx(EditIcon, {}), label: "Soumettre un mot", onClick: openModal, whileDisabled: !whileActivated }));
}
