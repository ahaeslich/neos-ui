import produce from 'immer';
import {action as createAction, ActionType} from 'typesafe-actions';
import {$get, $set} from 'plow-js';

import {actionTypes as system, InitAction, GlobalState} from '@neos-project/neos-ui-redux-store/src/System';

export interface State extends Readonly<{
    isOpen: boolean;
}> {}

export const defaultState: State = {
    isOpen: false
};


//
// Export the action types
//
export enum actionTypes {
    OPEN = '@neos/neos-ui/UI/KeyboardShortcutModal/OPEN',
    CLOSE = '@neos/neos-ui/UI/KeyboardShortcutModal/CLOSE'
}

/**
 * Opens the KeyboardShortcut Modal
 */
const open = () => createAction(actionTypes.OPEN);

/**
 * Closes the KeyboardShortcut Modal
 */
const close = () => createAction(actionTypes.CLOSE);

//
// Export the actions
//
export const actions = {
    open,
    close
};

export type Action = ActionType<typeof actions>;

//
// Export the reducer
//
export const subReducer = (state: State = defaultState, action: InitAction | Action) => produce(state, draft => {
    switch (action.type) {
        case system.INIT: {
            draft.isOpen = action.payload.ui.keyboardShortcutModal.isOpen || false;
            break;
        }
        case actionTypes.OPEN: {
            draft.isOpen = true;
            break;
        }
        case actionTypes.CLOSE: {
            draft.isOpen = false;
            break;
        }
    }
});

//
// Export the selectors
//
export const selectors = {};

export const reducer = (globalState: GlobalState, action: InitAction | Action) => {
    // TODO: substitute global state with State when conversion of all UI reducers is done
    const state = $get(['ui', 'keyboardShortcutModal'], globalState) || undefined;
    const newState = subReducer(state, action);
    return $set(['ui', 'keyboardShortcutModal'], newState, globalState);
};
