import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  COLORS,
  FONT_FAMILIES,
  METRICS,
} from "../../../Configration";
import withConnect from "./withConnect";
import { Images } from "../../../Assets";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SCREENS, VALIDATE_FORM } from "../../../Constant";
import { EmailValidator } from "../../../Common/Common";
const { height} = Dimensions.get("screen");
import Loader from "../../../ReuableComponent/Loader";
import _ from "lodash";
import { showMessage } from "react-native-flash-message";
const { FORGOT_NUMBER } = SCREENS;
const Login = (props: any) => {
  const { navigation, loginAction, loading } = props;
  const [userid, setUserId] = useState("");
  const [isSecure, setSecure] = useState(true);
  const [password, setPassword] = useState("");

  //**************************** Validation Method ******************/
  const validation = () => {
    var message = "";
    if (_.isEmpty(userid.trim())) {
      message = VALIDATE_FORM.EMAIL;
    }
    else if (!EmailValidator(userid)) {
      message = VALIDATE_FORM.EMAIL_VALID;
    }
    else if (_.isEmpty(password.trim())) {
      message = VALIDATE_FORM.PASSWORD;
    }
    if (!_.isEmpty(message)) {
      showMessage({ message: message, type: "danger" });
      return false;
    }
    return true;
  };
  //**********************loginMethod *******************/
  const userLogin = async () => {  
    if (validation()) {
      const body = {
        emailId: userid,
        password: password,
      };
      loginAction({ body: body, isLogin: true, navigation: navigation });
    }
  };//*******************Password action ***************/
  const passwordVisibleAction = () => {
    setSecure(!isSecure);
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.bottomView}>
          <Image source={Images.backlogin} style={{}} />
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
          <Text style={styles.footerText}>
            Enter your official email ID and password to use the application.{" "}
          </Text>
          <View style={styles.login}>
            <View style={styles.emailinput}>
              <Image
                resizeMode="contain"
                source={Images.email}
                style={styles.email}
              />
              <TextInput
                style={[styles.secureInput, { backgroundColor: "#EEEEEE" }]}
                autoCapitalize="none"
                placeholderTextColor={COLORS.LIGHT_GRAY}
                maxLength={60}
                selectionColor={COLORS.BLACK}
                placeholder="Email ID"
                keyboardType="email-address"
                onChangeText={setUserId}
              />
            </View>
            <View style={styles.loginpassword}>
              <Image
                resizeMode="contain"
                source={Images.lock}
                style={styles.email1}
              />
              <TextInput
                style={styles.secureInput}
                keyboardType="default"
                placeholder={"Password"}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                secureTextEntry={isSecure}
                selectionColor={COLORS.BLACK}
                maxLength={30}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.secure}
                onPress={() => passwordVisibleAction()}
              >
                <Image
                  style={{ tintColor: isSecure ? COLORS.GRAY : COLORS.BLACK }}
                  source={Images.eye}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(FORGOT_NUMBER)}>
            <Text style={styles.itallicText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() => {
              userLogin();
            }}
          >
            <Text style={styles.text2}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default withConnect(Login);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    flex: 0.3,
    marginTop: 100,
    alignSelf: "center",
  },
  email: {
    marginVertical: METRICS.MAR_18,
    marginHorizontal: METRICS.MAR_19,
    height: METRICS.MAR_19,
    width: METRICS.MAR_25,
  },
  email1: {
    marginVertical: METRICS.MAR_18,
    marginHorizontal: METRICS.MAR_19,
    height: METRICS.MAR_23,
    width: METRICS.MAR_25,
  },
  text2: {
    fontSize: responsiveFontSize(2),
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
  },
  text: {
    borderRadius: 5,
    backgroundColor: "#DB0D15",
    height: 50,
    width: 310,
    marginTop: 80,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: responsiveFontSize(3),
    color: COLORS.BLACK,
    textAlign: "center",
    marginTop: 200,
    marginHorizontal: METRICS.MAR_55,
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  loginpassword:{ flexDirection: "row",
  backgroundColor: "#EEEEEE", marginTop: 10,
   width: 330, height: 50, alignItems: "center",
    justifyContent: "center", borderRadius: 5 },
  login:{
    height: height / 4.5,
     justifyContent: "center", 
     alignItems: 'center', 
  },
  itallicText: {
    fontSize: responsiveFontSize(1.8),
    color: "#999999",
    marginLeft: 20,
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    paddingHorizontal: METRICS.MAR_12,
    color: COLORS.BLACK,
    height: METRICS.MAR_50,
    fontSize: responsiveFontSize(2),
  },
  button: {
    flex: 1,
    padding: 15,
  },
  buttonText: {
    fontSize: responsiveFontSize(3.5),
    color: "#DB0D15",
    marginLeft: 15,
    margin: 7,
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
  },
  footerText: {
    fontSize: responsiveFontSize(2),
    color: "#6B6B6B",
    marginLeft: 17,
    marginRight: 16,
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  secureView: {
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    height: 55,
    marginTop: 60,
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
  secure: {
    position: "absolute",
    right: 15,
  },
  secureInput: {
    color: COLORS.BLACK,
    fontSize: 16,
    height: 50,
    width: 270,
  },
  emailinput:{
    flexDirection: "row",
     backgroundColor: "#EEEEEE", 
     margin: 10, width: 330,
    height: 50, alignItems: "center", 
    justifyContent: "center", borderRadius: 5,
  },
});
