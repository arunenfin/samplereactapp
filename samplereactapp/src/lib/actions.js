import { SET_STATE, RESET_STATE } from './constants';

export const changeState = (value) => ({ type: SET_STATE, value });
export const resetState = () => ({ type: RESET_STATE });