import { SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Images } from "../../../../Assets";
import { SCREENS, VALIDATE_FORM } from '../../../../Constant';
import {
  FONT_FAMILIES,
} from "../../../../Configration";
import "./withConnect";
import CountDown from 'react-native-countdown-component';
import CodeInput from 'react-native-confirmation-code-input';
import _ from 'lodash';
import Network from '../../../../Network';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../../../ReuableComponent/Loader';
const {height,width}=Dimensions.get("screen");
const { FORGOT_NUMBER,CONFIRM_PASSWORD} = SCREENS;
const otpVerify = (props :any) => {
  const { navigation,route } = props;
  const { params } = route;
 
  const [counter] = useState(30); // Set here your own timer configurable
  const [random, SetRandom] = useState(Math.random());
  const [disabled, setDisabled] = useState(true);
  const [otp,setOtp] =useState("");
  const [useidValue] = useState(params.useidValue);
  const [ setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  //***********Handle Resend otp action here */
  const handleResend = () => {
    SetRandom(Math.random());
    setDisabled(true);
  };
  //*************** validation message *************/
  const validation = () => {
    var message = "";
  if (_.isEmpty(otp)) {
        message = VALIDATE_FORM.OTP;  
    }
    else if(otp.length < 4){
      message = VALIDATE_FORM.OTP_LENGTH;
    }
    if (!_.isEmpty(message)) {
        showMessage({ message: message, type: 'danger' });
        return false;
    }
    return true;
  };

  //*********** OTP api FUNCTION ***********/
    const otpFunction = async () => {
      if (validation()) {
      const payload= `otp=${otp}`;
        const result : any= await Network.createApiClient().otpverify(payload);
        if (result.data && result.data.status === true) {
          showMessage({message: result.data.message, type: 'success'});
        //@ts-ignore
          // setSuccess(true);
          navigation.navigate(CONFIRM_PASSWORD,{ otpValue: otp });
        } else {
          showMessage({message: result.data.message, type: 'danger'});
        }
        setLoading(false);
      }
    };

    //************ RESENDOTP api FUNCTION ***********/
    const resendfunction = async () => {
      const payload= `email=${useidValue}`;
        const result : any= await Network.createApiClient().resendotp(payload);
        if (result.data && result.data.status === true) {
          showMessage({message: result.data.message, type: 'success'});
          //@ts-ignore
          setSuccess(true);
        } else {
          showMessage({message: result.data.message, type: 'danger'});
        }
        setLoading(false);
    };
  return (
      <SafeAreaView>
          <KeyboardAwareScrollView>
            <View style={styles.mainContainer}>
            <View style={styles.bottomView}>
            <Image source={Images.backlogin}/>
          </View>
          <View style={styles.backForgotView}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <View style={styles.backbuttonView}>
              <Image source={Images.back} style={styles.backimagestyle}></Image>
            </View>
            </TouchableOpacity>
            <View style={styles.ForgottextView}>
              <Text style={styles.buttonText}>Enter your 4 Digit otp</Text>
            </View>
          </View>
          <View style={{height:height/5,width:width/1,
          }}>
             { disabled &&  <View style={styles.counter}>
              <CountDown
                key={random}
                until={counter}
                size={15}
                onFinish={() => setDisabled(() => false)}
                separatorStyle={{ color: 'black' }}
                digitStyle={{ backgroundColor: '#E5E5E5' }}
                digitTxtStyle={{ color: 'black' }}
                timeToShow={['M', 'S']}
                showSeparator
                timeLabels={{ m: '', s: '' }}
              />
            </View>}
      
<View style={styles.setotp}>
  <View style={styles.setotp1}>
  <CodeInput
            className={'border-b'}
            activeColor='rgba(0, 0, 0, 1)'
            inactiveColor='rgba(0, 0, 0, 1)'
            space={26}
            keyboardType="number-pad"
            codeLength={4}
            size={20}
            onFulfill={(code) => setOtp(code)}
          />
  </View>
  </View>
  { !disabled && <View style={styles.resendotp}>
              <TouchableOpacity disabled={disabled} onPress={() => {handleResend(),resendfunction();}}>
                <Text
                  style={styles.resendotp1}
                >
                  Resend otp
                </Text>
              </TouchableOpacity>
            </View>}
            </View>
            <View
          style={styles.otpnew}
        >
          <TouchableOpacity onPress={()=> {otpFunction();}} >
          <View
            style={styles.otpnew1}
          >
            <Text
              style={styles.otpnew2}
            >
              Submit
            </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View
          style={styles.cancel}
        >
          <TouchableOpacity  onPress={()=>{navigation.navigate(FORGOT_NUMBER);}}>
          <Text
            style={styles.cancel1}
          >
            Cancel
          </Text>
          </TouchableOpacity>
        </View>
        {isLoading && <Loader/>}
    </View>
    </KeyboardAwareScrollView>
      </SafeAreaView>
  );
};

export default otpVerify;

const styles = StyleSheet.create({
    mainContainer: {
        height:height/1,
      },
      resendotp1:{
        fontSize: responsiveFontSize(1.7),
        color: "#000000",
        fontWeight: "500",
      },
      cancel1:{
        fontSize: responsiveFontSize(1.7),
        color: "#000000",
        fontWeight: "500",
      },
      cancel:{
        height: height / 30,
        width: width / 1,
        justifyContent: "center",
        alignItems: "center",
      },
      otpnew2:{
        fontSize: responsiveFontSize(2.0),
        color: "#FFFFFF",
        fontWeight: "700",
      },
      otpnew1:{
        height: height / 18,
        width: width / 1.30,
        backgroundColor: "#DA0D14",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
      },
      otpnew:{
        height: height / 9,
        width: width / 1,
        justifyContent: "center",
        alignItems: "center",
      },
      resendotp:{
        height: height / 12, width: width / 1,
        justifyContent: "center", alignItems: "center",
      },
      setotp:{height:height/12,width:width/1,
      justifyContent:"center",alignItems:"center"},
      bottomView: {
        height: height / 3.5,
        alignSelf: "center",
        justifyContent: "center",
      },
      setotp1:{height:height/16,
      width:width/2,
      backgroundColor:"#D6D0CF",
      justifyContent:"center",
      alignItems:"center"},
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
        width: width / 1.7,
        justifyContent: "center",
        alignItems: "flex-start",
      },
      buttonText: {
        fontSize: responsiveFontSize(1.9),
        color: "#000000",
        marginLeft: 29,
        fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
      },
      counter:{
          height: height / 15, width: width / 1,
          justifyContent: "center", alignItems: "center",
        },
});