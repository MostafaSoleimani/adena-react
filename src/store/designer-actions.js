import { loadState } from "../core/tools/browser-storage";
import { designerActions } from "./designer-slice";

export const SaveForm = () => {
    return async (dispatch) => {
    }
}

export const loadForm = async (id) => {
    return async (dispatch) => {
        const data = await loadState();
        const form = data.find(x => x.id === id);
        console.log('form:    ', form);
        if (form) {
            dispatch(designerActions.setForm(form))
        }
    }
}