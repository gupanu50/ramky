import React, { useEffect, useState } from "react";
import { View, StyleSheet,ImageBackground,Dimensions,Text, TouchableOpacity } from "react-native";
import withConnect from "./withConnect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Constant from "../../Constant";
import crypto from "crypto-js";
import { Credentials } from "../../Constant";
import AppIntroSlider from 'react-native-app-intro-slider';
const {height,width} = Dimensions.get("screen");
const { MAIN, LOGIN,SPLASH } = Constant.SCREENS;

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',

    image: require('../../Assets/Splash/Splash2.png'),
    backgroundColor: '#59b2ab',
  },
];

const Splash = (props: any) => {
  const { navigation, loginAction } = props;
  const [showRealApp, setShowRealApp] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);

  const onDone = () => {
    setShowRealApp(true);
    navigation.navigate(LOGIN);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item }) => {
    return (
      <View>
        <ImageBackground style={styles.introImageStyle} source={item.image} >
          <View style={{height:height/21,width:width/2.05,backgroundColor:"white",marginTop:450,borderRadius:15,justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity onPress={()=>{onDone()}}>
          <Text style={{fontSize:15,fontWeight:"700",color:"red"}}>{"Getting Started"}</Text>
          </TouchableOpacity>
            </View>
          </ImageBackground>
    
      </View>
    );
  };

  const getUserData = async () => {
    try {
      let data = await AsyncStorage.getItem("user");
      let decData = crypto.AES.decrypt(data, Credentials.Pass_key).toString(
        crypto.enc.Utf8
      );

      const dataBlob = JSON.parse(decData);
      let data1 = await AsyncStorage.getItem('user');

      if (dataBlob) {
        loginAction({ body: dataBlob, isLogin: false, navigation: navigation });
        navigation.navigate(MAIN);
      } else {
        navigation.navigate(SPLASH);
      }
    }
     catch (error) {
      navigation.navigate(SPLASH);
    }
  };
  return (    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={false}
        showDoneButton={false}
        onSkip={onSkip}
      />
  </>);
};

export default withConnect(Splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignSelf: "center",
    height: 100,
    width: 100,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: width/1,
    height: height/1,
    justifyContent:"center",
    alignItems:"center",
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
