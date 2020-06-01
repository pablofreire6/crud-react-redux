import { SHOW_ALERT, HIDE_ALERT } from "../types";

export function showAlert(alert) {
  return (dispatch) => {
    dispatch(showAlertError(alert));
  };
}

const showAlertError = (alertData) => ({
  type: SHOW_ALERT,
  payload: alertData,
});
