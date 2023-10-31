import { put, takeLatest, call } from "redux-saga/effects";
import { ActionType } from "../../Type";
import { SCREENS } from "../../../Constant";
import Api from "../../../Network/Api";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SharedManager from "../../../Common/SharedManager.tsx";
import crypto from "crypto-js";
import { Credentials } from "../../../Constant";
const {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
} = ActionType;
const {
  MAIN1,
  MAIN2,
  MAIN3,
  MAIN4,
  MAIN5,
  MAIN6,
  MAIN7,
  MAIN0,
  MAIN9,
  MAIN10,
  MAIN11,
  MAIN12,
  MAIN13,
  MAIN14,
  MAIN15,
  MAIN16,
  MAIN17,
  MAIN18,
  MAIN20,
  MAIN21,
  MAIN22,
} = SCREENS;
// Generator Function For Login
function* loginSaga(data: { payload: any }) {
  yield put({ type: USER_LOGIN_LOADING, payload: true });
  var res: any = undefined;
  try {
    if (data?.payload?.isLogin ?? false) {
      const response = yield call(Api.loginApi, data.payload.body);
      res = response?.data ?? undefined;
    } else {
      res = data?.payload?.body?.res ?? undefined;
    }
    if (res?.email) {
      let encData = crypto.AES.encrypt(
        JSON.stringify({ res }),
        Credentials.Pass_key
      ).toString();
      yield AsyncStorage.setItem("user", encData);
      yield put({ type: USER_LOGIN_SUCCESS, payload: res });
      yield put({ type: USER_LOGIN_LOADING, payload: false });
      // If Else Condition For Login Dashboard Based On Roles Received In Login API
      if (res.roles[0] === "ROLE_MSW-P&D") {
        data.payload.navigation.navigate(MAIN1);
      } else if (res.roles[0] === "ROLE_MSW-WTE") {
        data.payload.navigation.navigate(MAIN2);
      } else if (res.roles[0] === "ROLE_MSW-SITEHEAD") {
        data.payload.navigation.navigate(MAIN3);
      } else if (res.roles[0] === "ROLE_MSW-SBUHEAD") {
        data.payload.navigation.navigate(MAIN4);
      } else if (res.roles[0] === "ROLE_MSW-C&T") {
        data.payload.navigation.navigate(MAIN0);
      } else if (res.roles[0] === "ROLE_BMW-P&D") {
        data.payload.navigation.navigate(MAIN5);
      } else if (res.roles[0] === "ROLE_BMW-SITEHEAD") {
        data.payload.navigation.navigate(MAIN6);
      } else if (res.roles[0] === "ROLE_BMW-SBUHEAD") {
        data.payload.navigation.navigate(MAIN7);
      } else if (res.roles[0] === "ROLE_IWM-P&D") {
        data.payload.navigation.navigate(MAIN9);
      } else if (res.roles[0] === "ROLE_IWM-SITEHEAD") {
        data.payload.navigation.navigate(MAIN10);
      } else if (res.roles[0] === "ROLE_IWM-SBUHEAD") {
        data.payload.navigation.navigate(MAIN11);
      } else if (res.roles[0] === "ROLE_RECYCLE-PLASTIC-P&D") {
        data.payload.navigation.navigate(MAIN12);
      } else if (res.roles[0] === "ROLE_RECYCLE-PLASTIC-SITEHEAD") {
        data.payload.navigation.navigate(MAIN13);
      } else if (res.roles[0] === "ROLE_RECYCLE-ALL-SBUHEAD") {
        data.payload.navigation.navigate(MAIN14);
      } else if (res.roles[0] === "ROLE_RECYCLE-PLASTIC-BUSINESSHEAD") {
        data.payload.navigation.navigate(MAIN15);
      } else if (res.roles[0] === "ROLE_RECYCLE-CND-P&D") {
        data.payload.navigation.navigate(MAIN16);
      } else if (res.roles[0] === "ROLE_RECYCLE-CND-SITEHEAD") {
        data.payload.navigation.navigate(MAIN17);
      } else if (res.roles[0] === "ROLE_RECYCLE-CND-BUSINESSHEAD") {
        data.payload.navigation.navigate(MAIN18);
      } else if (res.roles[0] === "ROLE_RECYCLE-CRM-P&D") {
        data.payload.navigation.navigate(MAIN20);
      } else if (res.roles[0] === "ROLE_RECYCLE-CRM-SITEHEAD") {
        data.payload.navigation.navigate(MAIN21);
      } else if (res.roles[0] === "ROLE_RECYCLE-CRM-BUSINESSHEAD") {
        data.payload.navigation.navigate(MAIN22);
      } else {
        null;
      }
      // Save Token And Roles In Private File
      //@ts-ignore
      SharedManager.getInstance().setRole(res.roles[0]);
      //@ts-ignore
      SharedManager.getInstance().setToken(
        res.tokenType + " " + res.accessToken
      );
    } else {
      // Throw Failed Message When User Enters Wrong Email Id And Password
      yield put({
        type: USER_LOGIN_FAILURE,
        payload: (res?.message ?? "").toString(),
      });
      yield put({ type: USER_LOGIN_LOADING, payload: false });
      showMessage({
        message: res?.message ?? "Invalid Email Id",
        type: "danger",
      });
    }
  } catch (error) {
    // Throw Error Message When Login API Does Not Work
    yield put({ type: USER_LOGIN_FAILURE, payload: error.toString() });
    yield put({ type: USER_LOGIN_LOADING, payload: false });
    showMessage({
      message: error ?? "Something went wrong please try again.",
      type: "danger",
    });
  }
}
function* LoginSagaAsync() {
  //@ts-ignore
  yield takeLatest(USER_LOGIN, loginSaga);
}
export default LoginSagaAsync;
