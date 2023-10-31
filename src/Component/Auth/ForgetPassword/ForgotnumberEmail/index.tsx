import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import "./withConnect";
import React, { useState} from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Images } from "../../../../Assets";
import { SCREENS, VALIDATE_FORM } from '../../../../Constant';
import Loader from '../../../../ReuableComponent/Loader';
import {
  COLORS,
  FONT_FAMILIES,
} from "../../../../Configration";
import _ from 'lodash';
import { showMessage } from 'react-native-flash-message';
const { height, width } = Dimensions.get("screen");
import {EmailValidator} from "../../../../Common/Common";
import Network from '../../../../Network';
const {OTP_VERIFY,LOGIN } = SCREENS;
const forgotnumberEmail = (props:any) => {
  const { navigation} = props;
  const [userid, setUserId] = useState("");
  const [isSuccess,setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  //*****************validation  *********/
  const validation = () => {
    var message = "";
    if (_.isEmpty(userid.trim()) ) {
        message = VALIDATE_FORM.EMAIL;  
    } 
    else if (!EmailValidator(userid) ){
      message = VALIDATE_FORM.EMAIL_VALID;
   }
    if (!_.isEmpty(message)) {
        showMessage({ message: message, type: 'danger' });
        return false;
    }
    return true;
};
//*************** forgot api **********/
  const forgotValidate = async () => {
    if (validation()) {
      setLoading(true);   
    const payload= `email=${userid}`;
      const result: any = await Network.createApiClient().forgotemail(payload);
      if (result.data && result.data.status === true) {
        showMessage({message: result.data.message, type: 'success'});
        //@ts-ignore
        // setSuccess(true);
        navigation.navigate(OTP_VERIFY,{ useidValue: userid });
      } else {
        showMessage({message: result.data.message, type: 'danger'});
      }
      setLoading(false);
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
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <View style={styles.backbuttonView} >
              <Image source={Images.back} style={styles.backimagestyle}></Image>
            </View>
            </TouchableOpacity>
            <View style={styles.ForgottextView}>
              <Text style={styles.buttonText}>Forgot Password</Text>
            </View>
          </View>
          <View> 
            <View
          style={{
            height: height / 3.6,
            width: width / 1,
          }}
        >
          <View
            style={styles.email}
          >
            <Text style={{ color: "#606060" }}>
              Enter your registered e-mail id
            </Text>
          </View>
          <View  style={styles.email1}>
              <View  style={styles.email2}>
                  <TextInput
                  style={styles.Emailtextinput}
                  autoCapitalize={'none'}
                  placeholderTextColor={COLORS.TEXTINPUT}
                  maxLength={40}
                  selectionColor={COLORS.BLACK}
                  placeholder="Enter Your Email"
                  keyboardType={'email-address'}
                  onChangeText={txt => {
                     setUserId(txt);
                  }}
                />
                  </View> 
              </View>
              <View
            style={styles.email4}
          >
            <TouchableOpacity onPress={()=> {forgotValidate();}}>
            <View
              style={styles.email5}
            >
              <Text
                style={styles.email6}
              >
                Submit
              </Text>
            </View>
            </TouchableOpacity>
          </View>
          <View
            style={styles.email7}
          >
            <TouchableOpacity onPress={()=>{navigation.navigate(LOGIN);}}>
            <Text
              style={styles.email8}
            >
              Cancel
            </Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        {isLoading && <Loader/>}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default forgotnumberEmail;

const styles = StyleSheet.create({
  mainContainer: {
    height:height/1,
  },
  email8:{
    fontSize: responsiveFontSize(1.7),
    color: "#000000",
    fontWeight: "500",
  },
  email:{
    height: height / 16,
    width: width / 1.45,
    justifyContent: "center",
    alignItems: "center",
  },
  email7:{
    height: height / 30,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email6:{
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  email5:{
    height: height / 18,
    width: width / 1.30,
    backgroundColor: "#DA0D14",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  email4:{
    height: height / 12,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email2:{
    height: height / 17,
    width: width / 1.3,
    backgroundColor: COLORS.TEXT_INPUT1,
    borderRadius: 5,
    justifyContent: "center",
  },
  email1:{
    height: height / 12,
    width: width / 1,
    justifyContent:"center",
    alignItems:"center",
  },
  bottomView: {
    height: height / 3.5,
    alignSelf: "center",
    justifyContent: "center",
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
  cancelnew:{
    height: height / 3.6,
    width: width / 1,
  },
  backimagestyle: {
    height: height / 60,
    width: width / 21,
  },
  ForgottextView: {
    height: height / 20,
    width: width / 1.7,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  buttonText: {
    fontSize: responsiveFontSize(2.7),
    color: "#DB0D15",
    marginLeft: 12,
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
  },
  radiobuttonsmainView: {
    height: height / 14,
  },
  img: {
    height: 20,
    width: 20,
  },
  headingmainview: {
    height: height / 25,
    width: width / 2,
    marginLeft: 35,
    alignItems: "center",
  },
  card1headingtext: {
    fontSize: 12,
    padding: 4,
    fontWeight: "500",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  Emailtextinput:{
    fontSize: responsiveFontSize(2.2),
    color: "#000000",
    paddingLeft: 24,
  },
  Phonetextinput:{
    fontSize: responsiveFontSize(2.2),
    color: "#000000",
    paddingLeft: 24,
  },
  mobilenumber:{
    height: height / 16,
    width: width / 1.29,
    justifyContent: "center",
    alignItems: "center",
  },
});
