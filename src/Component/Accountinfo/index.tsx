import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT_FAMILIES, FONT_SIZES, METRICS } from "../../Configration";
import withConnect from "./withConnect";
const { height, width } = Dimensions.get("screen");
import { Images } from "../../Assets";
const { CHANGEPASS } = Constant.SCREENS;
import * as Constant from "../../Constant";
import ImagePicker from "react-native-image-crop-picker";
const AccountInfo = (props: any) => {
  const { navigation, user } = props;
  const userEmail = user.email;
  const userlocation = user.siteName[0].siteName;
  const usernamevalue = user.username;
  const usermobileno = user.phoneNumber;
  const [myimages, setMyImages] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const editProfileScreen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setModalVisible(!modalVisible);
      setMyImages(image.path);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setModalVisible(!modalVisible);
      setMyImages(image.path);
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backarrow} source={Images.backarrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.cameraView}>
          <View style={styles.firstView}>
            {/* @ts-ignore */}
            {myimages == 0 ? (
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.otp1} source={Images.Defaultdp} />
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <ImageBackground
                  source={{
                    uri: myimages,
                  }}
                  style={styles.otp2}
                  imageStyle={{ borderRadius: 15 }}
                ></ImageBackground>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image style={styles.camera} source={Images.Camera} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{usernamevalue}</Text>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameeText}>{userlocation}</Text>
          </View>
        </View>
        <View style={styles.lastView}>
          <View style={styles.ans}>
            <View style={styles.imgView}>
              <Image style={{ height: 19, width: 15 }} source={Images.Call} />
            </View>
            <View style={styles.textinputView}>
              <Text style={styles.secureInput}>{["+91-", usermobileno]}</Text>
            </View>
          </View>
          <View style={styles.ans}>
            <View style={styles.imgView}>
              <Image style={{ height: 16, width: 20 }} source={Images.email} />
            </View>
            <View style={styles.textinputView}>
              <Text style={styles.secureInput}>{userEmail}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.ans}
            onPress={() => navigation.navigate(CHANGEPASS)}
          >
            <View style={styles.imgView}>
              <Image style={{ height: 20, width: 17 }} source={Images.lock} />
            </View>
            <View style={styles.textinputtView}>
              <Text style={styles.changeText}>{"Change password"}</Text>
            </View>
            <View style={styles.lastImgView}>
              <Image
                style={{ height: 15, width: 11 }}
                source={Images.rightArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/*******************************************************/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => editProfileScreen()}>
                <View style={styles.buttonView}>
                  <Text style={styles.modalText}>Take Photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => choosePhotoFromLibrary()}>
                <View style={styles.buttonViewSecond}>
                  <Text style={styles.modalText}>Choose From Library</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.buttonViewCancel}>
                  <Text style={styles.modalText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/***************************************************************/}
      </View>
    </SafeAreaView>
  );
};

export default withConnect(AccountInfo);

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginTop: METRICS.MAR_10,
    width: 150,
    justifyContent: "center",
  },
  otp2: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  otp1: { height: 100, width: 100 },
  backarrow: { height: 20, width: 20, tintColor: "black" },
  modalText: {
    fontSize: FONT_SIZES.H6,
    color: COLORS.BLACK,
    textAlign: "center",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  camera: {
    height: 15,
    width: 15,
    tintColor: "#606060",
    position: "absolute",
    left: 0,
    top: 40,
  },
  buttonViewCancel: {
    height: height / 15,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  cancelView: {
    marginTop: 10,
    width: width / 5,
    height: height / 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width / 1.31,
  },
  buttonViewSecond: {
    height: height / 15,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderColor: "gray",
  },
  buttonView: {
    height: height / 15,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  centeredView: {
    height: height / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    height: height / 4,
    width: width / 1,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  changeText: {
    color: COLORS.TEXTINPUT,
    fontSize: 15,
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    marginLeft: 10,
  },
  secureInput: {
    color: COLORS.TEXTINPUT,
    fontSize: 13,
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    marginLeft: 8,
  },
  lastImgView: {
    height: height / 25,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imgView: {
    height: height / 25,
    width: width / 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textinputtView: {
    height: height / 25,
    width: width / 1.8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textinputView: {
    height: height / 25,
    width: width / 1.38,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  ans: {
    marginTop: 20,
    height: height / 17,
    backgroundColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 25,
  },
  lastView: {
    height: height / 2.5,
  },
  nameeText: {
    fontSize: 13,
    color: COLORS.NAME,
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  nameText: {
    fontSize: 16,
    color: COLORS.NAME,
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
  },
  nameView: {
    height: height / 40,
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  firstView: {
    height: height / 6.5,
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cameraView: {
    height: height / 4.5,
    marginHorizontal: 25,
    borderBottomWidth: 1,
    borderColor: "#AAAAAA",
  },
  backView: {
    height: height / 15,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginHorizontal: 25,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
