import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import withConnect from './withConnect';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Images } from "../../../../Assets";
import _ from 'lodash';
import { showMessage } from 'react-native-flash-message';
import { SCREENS, VALIDATE_FORM } from '../../../../Constant';
import {
  COLORS,
  FONT_FAMILIES,
  METRICS,
} from "../../../../Configration";
import Network from '../../../../Network';
const { height, width } = Dimensions.get("screen");
const { LOGIN } = SCREENS;
const confirmPassword = (props: any) => {
  const { route, navigation } = props;
  const { params } = route;
  const [isSecure1, setSecure1] = useState(true);
  const [isSecure2, setSecure2] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [show, setShow] = useState(false);
  const [userid, setUserId] = useState("");
  const [otpValue] = useState(params.otpValue);
  const [ setSuccess] = useState(false);
  const [ setLoading] = useState(false);
  const refNew = useRef();
  const refConf = useRef();
  const passwordSecureAction = (index: number) => {
    if (index === 0) {
      setSecure1(!isSecure1);
    } else if (index === 1) {
      setSecure2(!isSecure2);
    }
  };
  //************ validation message **********/
  const validation = () => {
    var message = "";
    if (_.isEmpty(newPassword.trim())) {
      message = VALIDATE_FORM.NEW_PASSWORD;
    }
    else if (_.isEmpty(confPassword.trim())) {
      message = VALIDATE_FORM.C_PASSWORD;
    }
    else if (newPassword != confPassword) {
      message = VALIDATE_FORM.MISMATCH;
    }
    if (!_.isEmpty(message)) {
      showMessage({ message: message, type: 'danger' });
      return false;
    }
    return true;
  };
  //*************new password validation ************/
  const newPasswordValidation = (text) => {
    setNewPassword(text);
    let rjx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
    if (text === "") {
      setShow(false);
    } else if (!rjx.test(text)) {
      setShow(true);
    }
    else {
      setShow(false);
    }
  };
//******************new password api ************/
  const userConfirmpassword = async () => {
    if (validation()) {
      //@ts-ignore
      // setLoading(true);
      const payload = `password=${newPassword}&otp=${otpValue}`;
      const result = await Network.createApiClient().createnewpassword(payload);
      // @ts-ignore
      if (result.data && result.data.status === true) {
        // @ts-ignore
        showMessage({ message: result.data.message, type: 'success' });
        //@ts-ignore
        // setSuccess(true);
        navigation.navigate(LOGIN);
      } else {
        // @ts-ignore
        showMessage({ message: result.data.message, type: 'danger' });
      }
        // @ts-ignore
      // setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.bottomView}>
            <Image source={Images.backlogin} style={{}} />
          </View>
          <View style={styles.backForgotView}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <View style={styles.backbuttonView}>
                <Image source={Images.back} style={styles.backimagestyle}></Image>
              </View>
            </TouchableOpacity>
            <View style={styles.ForgottextView}>
              <Text style={styles.buttonText}>Create New Password</Text>
            </View>
          </View>
          <View style={{
            height: height / 4.5, width: width / 1,
         
          }}>
            <View style={styles.secureView1}>
              <Image
                resizeMode="contain"
                source={Images.lock}
                style={styles.email1}
              />
              <TextInput
                style={styles.secureInput}
                keyboardType='default'
                // @ts-ignore
                ref={refNew}
                onChangeText={(text) => newPasswordValidation(text)}
                returnKeyType='next'
                maxLength={30}
                placeholderTextColor={COLORS.BLACK}
                secureTextEntry={isSecure1}
                selectionColor={COLORS.BLACK}
                placeholder={"Enter New Password"}
              />
              <TouchableOpacity
                style={styles.secure}
                onPress={() => passwordSecureAction(0)}
              >
                <Image
                  style={{ tintColor: isSecure1 ? COLORS.GRAY : COLORS.BLACK }}
                  source={Images.eye}
                />
              </TouchableOpacity>
            </View>
            {show &&
              <Text style={styles.errorMessageStyle}>
                Password Should Contain One Number, One Alphabet And One {'\n'}Special Character</Text>}
            <View style={styles.secureView2}>
              <Image
                resizeMode="contain"
                source={Images.lock}
                style={styles.email2}
              />
              <TextInput
                style={styles.secureInput1}
                placeholder={"Re-Enter New Password"}
                placeholderTextColor={COLORS.BLACK}
                secureTextEntry={isSecure2}
                keyboardType='default'
                // @ts-ignore
                ref={refConf}
                onChangeText={setConfPassword}
                returnKeyType='next'
                maxLength={30}
              />
              <TouchableOpacity
                style={styles.secure1}
                onPress={() => passwordSecureAction(1)}
              >
                <Image
                  style={{ tintColor: isSecure2 ? COLORS.GRAY : COLORS.BLACK }}
                  source={Images.eye}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            height: height / 8, width: width / 1,
          }}>
            <View
              style={styles.confirm}
            >
              <TouchableOpacity onPress={() => userConfirmpassword()}>
                <View
                  style={styles.confirm1}
                >
                  <Text
                    style={styles.confirm2}
                  >
                    Confirm
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={styles.otp1}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={styles.otp2}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default withConnect(confirmPassword);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  otp2:{
    fontSize: responsiveFontSize(1.7),
    color: "#000000",
    fontWeight: "500",
  },
  otp1:{
    height: height / 30,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confirm2:{
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  bottomView: {
    height: height / 3.5,
    alignSelf: "center",
    justifyContent: "center",
  },
  confirm1:{
    height: height / 18,
    width: width / 1.2,
    backgroundColor: "#DA0D14",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  confirm:{
    height: height / 12,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backForgotView: {
    height: height / 20,
    flexDirection: "row",
  },
  backbuttonView: {
    height: height / 20,
    width: width / 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  backimagestyle: {
    height: height / 60,
    width: width / 21,
  },
  ForgottextView: {
    height: height / 20,
    width: width / 1.5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  buttonText: {
    fontSize: responsiveFontSize(2.25),
    color: "#000000",
    marginLeft: 29,
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  secureView1: {
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    width: 335,
    height: 55,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  secureView2: {
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    width: 335,
    height: 55,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  secure: {
    position: "absolute",
    right: 15,
  },
  secure1: {
    position: "absolute",
    right: 15,
  },
  secureInput: {
    color: COLORS.BLACK,
    fontSize: 16,
    height: 50,
  },
  secureInput1: {
    color: COLORS.BLACK,
    fontSize: 16,
    height: 50,
  },
  email1: {
    marginVertical: METRICS.MAR_18,
    marginHorizontal: METRICS.MAR_19,
    height: METRICS.MAR_23,
    width: METRICS.MAR_25,
  },
  email2: {
    marginVertical: METRICS.MAR_18,
    marginHorizontal: METRICS.MAR_19,
    height: METRICS.MAR_23,
    width: METRICS.MAR_25,
  },
  errorMessageStyle: {
    color: 'red',
    marginLeft: 30,
    fontSize: 10,
},
});