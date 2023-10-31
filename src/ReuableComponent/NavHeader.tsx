import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import { Header } from "react-native-elements";
import { Images } from "../Assets";
import withConnect from "./withConnect";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";
import { COLORS, FONT_FAMILIES, FONT_SIZES, METRICS } from "../Configration";
import {
  responsiveHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
import { Dropdown } from "react-native-element-dropdown";
import * as Constant from "../Constant";
import { ActionType } from "../Redux/Type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
const { ACCOUNTINFO } = Constant.SCREENS;
const { height, width } = Dimensions.get("screen");
const { RECYCLE_SBU_HEAD_DEPARTMENT } = ActionType;
const data = [
  { label: "All", value: "All" },
  { label: "RECYCLE-PLASTIC", value: "RECYCLE-PLASTIC" },
  { label: "RECYCLE-CND", value: "RECYCLE-CND" },
  { label: "RECYCLE-CRM", value: "RECYCLE-CRM" },
];
const NavHeader = (props: any) => {
  const dispatch = useDispatch();
  const {
    bc,
    isBack,
    isBackHide,
    isRightAction,
    user,
    value,
    setValue,
    valueBmw,
    setValueBmw,
    valueIwm,
    setValueIwm,
    plastic,
    setPlastic,
    cndbusiness,
    setCndBusiness,
    setCrmBusiness,
    crmbusiness,
    city,
    setCity,
    setSiteSbuHead,
  } = props;
  const navigation = useNavigation();
  let sbuhead;
  const siteName = user
    ? user.siteName.map((item) => {
        return {
          label: item.siteName,
          value: item.siteName,
        };
      })
    : [];
  const siteName1 = user
    ? user.siteName.map((item) => {
        return {
          label: item.siteName,
          value: item.siteName,
        };
      })
    : [];
  const dropdown = siteName;
  const dropdown2 = siteName1;
  const dropdown3 = data;
  const dropdown1 = user.siteName[0].siteName;
  // const [modalVisible, setModalVisible] = useState(false);
  // UseEffect Of Department Save In Async Storage
  useEffect(() => {
    // @ts-ignore
    AsyncStorage.setItem("Department", sbuhead);
  }, [sbuhead]);
  // Method Of Drawer to Open
  const openDrawer = () => {
    if (isBack) {
      navigation.goBack();
      return;
    }
    // @ts-ignore
    navigation.openDrawer();
  };
  // Open Camera Method
  // const EditProfileScreen = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     // eslint-disable-next-line no-unused-vars
  //   }).then((image) => {
  //     setModalVisible(!modalVisible);
  //     // setMyImages(image.path);
  //   });
  // };
  // Open Gallery Method
  // const ChoosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     // eslint-disable-next-line no-unused-vars
  //   }).then((image) => {
  //     setModalVisible(!modalVisible);
  //     // setMyImages(image.path);
  //   });
  // };
  // Left Component Render Method
  const leftComponent = () => {
    if (isBack && !isBackHide) {
      return (
        <TouchableOpacity onPress={openDrawer} style={styles.leftComponent}>
          <Image
            source={Images.back}
            style={[styles.menubar, { height: 30, width: 30 }]}
          />
        </TouchableOpacity>
      );
    } else if (isBackHide) {
      return null;
    } else {
      return (
        <TouchableOpacity onPress={openDrawer} style={styles.leftComponent}>
          <Image source={Images.drawer} style={styles.menubar} />
        </TouchableOpacity>
      );
    }
  };
  // Right Component Render Method
  const rightComponent = () => {
    if (isRightAction === undefined) {
      return (
        <View style={styles.rightComponent}>
          <TouchableOpacity />
        </View>
      );
    }
    return (
      <View style={styles.rightComponent}>
        <TouchableOpacity
          style={styles.rightComponentMainView}
          // @ts-ignore
          onPress={() => navigation.navigate(ACCOUNTINFO)}
        >
          <Image source={Images.Defaultdp} style={styles.menubar1} />
        </TouchableOpacity>
      </View>
    );
  };
  // Center Component Render Method
  const centerComponent = () => {
    return (
      <View>
        <View style={styles.header1}>
          {/* <View>
      <TouchableOpacity  onPress={() => navigation.navigate(NOTIFICATION)}>
        <Image source={Images.notification1} style={{height:27,width:20,top:14,right:10}}/>
      </TouchableOpacity>
    </View> */}
          <View style={styles.header2}>
            {user.roles[0] === "ROLE_MSW-P&D" ? (
              <View style={styles.mswpd}>
                <Text style={styles.mswpd1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_MSW-WTE" ? (
              <View style={styles.mswwte}>
                <Text style={styles.mswwte1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_MSW-C&T" ? (
              <View style={styles.mswct}>
                <Text style={styles.mswct1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_MSW-SITEHEAD" ? (
              <View style={styles.mswsitehead}>
                <Text style={styles.mswsitehead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_MSW-SBUHEAD" ? (
              <View style={{ right: 40, top: -4 }}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.mswsbuhead}
                  iconStyle={styles.iconStyle}
                  data={[{ label: "All", value: "All" }, ...dropdown]}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                />
              </View>
            ) : user.roles[0] === "ROLE_BMW-P&D" ? (
              <View style={styles.bmwpd}>
                <Text style={styles.bmwpd1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_BMW-SITEHEAD" ? (
              <View style={styles.bmwsitehead}>
                <Text style={styles.bmwsitehead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_BMW-SBUHEAD" ? (
              <View style={{ right: 25, top: -4 }}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.bmwsbuhead}
                  iconStyle={styles.iconStyle}
                  data={[{ label: "All", value: "All" }, ...dropdown]}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={valueBmw}
                  onChange={(item) => {
                    setValueBmw(item.value);
                  }}
                />
              </View>
            ) : user.roles[0] === "ROLE_IWM-P&D" ? (
              <View style={styles.iwmpd}>
                <Text style={styles.iwmpd1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_IWM-SITEHEAD" ? (
              <View style={styles.iwmsitehead}>
                <Text style={styles.iwmsitehead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_IWM-SBUHEAD" ? (
              <View style={{ right: 20 }}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.iwmsbuhead}
                  iconStyle={styles.iconStyle}
                  data={[{ label: "All", value: "All" }, ...dropdown]}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={valueIwm}
                  onChange={(item) => {
                    setValueIwm(item.value);
                  }}
                />
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-PLASTIC-P&D" ? (
              <View style={styles.plasticpd}>
                <Text style={styles.plasticpd1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-PLASTIC-SITEHEAD" ? (
              <View style={styles.plasticsitehead}>
                <Text style={styles.plasticsitehead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-ALL-SBUHEAD" ? (
              <View style={styles.plasticbusiness}>
                <Dropdown
                  style={[styles.dropdown1]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.plasticbusiness1}
                  iconStyle={styles.iconStyle}
                  data={dropdown3}
                  placeholder={"Department"}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={city}
                  onChange={(item) => {
                    setCity(item.value),
                      setSiteSbuHead("All"),
                      dispatch({
                        type: RECYCLE_SBU_HEAD_DEPARTMENT,
                        payload: item.value,
                      });
                  }}
                />
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-PLASTIC-BUSINESSHEAD" ? (
              <View style={styles.plasticbusinesshead}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.plasticbusinesshead1}
                  iconStyle={styles.iconStyle}
                  data={[{ label: "All", value: "All" }, ...dropdown2]}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={plastic}
                  onChange={(item) => setPlastic(item.value)}
                />
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CND-P&D" ? (
              <View style={styles.recyclecnd}>
                <Text style={styles.recyclecnd1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CND-SITEHEAD" ? (
              <View style={styles.cndsitehead}>
                <Text style={styles.cndsitehead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CND-BUSINESSHEAD" ? (
              <View style={styles.cndbusinesshead}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.cndbusinesshead1}
                  iconStyle={styles.iconStyle}
                  data={[{ label: "All", value: "All" }, ...dropdown2]}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={cndbusiness}
                  onChange={(item) => setCndBusiness(item.value)}
                />
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CND-SBUHEAD" ? (
              <View style={styles.sbuhead}>
                <Text style={styles.sbuhead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CRM-P&D" ? (
              <View style={styles.crmpd}>
                <Text style={styles.crmpd1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CRM-SITEHEAD" ? (
              <View style={styles.crmsitehead}>
                <Text style={styles.crmsitehead1}>{dropdown1}</Text>
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CRM-BUSINESSHEAD" ? (
              <View style={styles.businesshead}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.businesshead1}
                  iconStyle={styles.iconStyle}
                  data={[{ label: "All", value: "All" }, ...dropdown2]}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={crmbusiness}
                  onChange={(item) => {
                    setCrmBusiness(item.value);
                  }}
                />
              </View>
            ) : user.roles[0] === "ROLE_RECYCLE-CRM-SBUHEAD" ? (
              <View style={styles.crmbusinesshead}>
                <Text style={styles.crmbusinesshead1}>{dropdown1}</Text>
              </View>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      {/* @ts-ignore */}
      <Header
        statusBarProps={{
          barStyle: "light-content",
          translucent: true,
          backgroundColor: "transparent",
        }}
        containerStyle={styles.container}
        placement={"center"}
        centerComponent={centerComponent}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        backgroundColor={bc ? "transparent" : "white"}
      />
    </View>
  );
};
export default withConnect(NavHeader);
const styles = StyleSheet.create({
  rightComponentMainView: {
    flex: 1,
  },
  mainView: {
    marginTop: Platform.OS === "ios" ? 0 : -20,
  },
  container: {
    borderBottomColor: "transparent",
  },
  header1: {
    height: 50,
    marginLeft: 120,
    justifyContent: "center",
    flexDirection: "row",
  },
  leftComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  crmbusinesshead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  crmsitehead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  businesshead1: {
    width: 150,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -32,
    borderRadius: 10,
  },
  businesshead: {
    height: 36,
    width: 130,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 0.8,
    justifyContent: "center",
    marginHorizontal: 40,
    right: 50,
  },
  crmbusinesshead: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
  },
  crmsitehead: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 10,
  },
  crmpd: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  crmpd1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  plasticbusinesshead: {
    height: 36,
    width: 130,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 0.8,
    justifyContent: "center",
    marginHorizontal: 40,
    right: 50,
  },
  sbuhead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  plasticbusinesshead1: {
    width: 150,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -30,
    borderRadius: 10,
  },
  plasticbusiness: {
    height: 36,
    width: 160,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 0.8,
    justifyContent: "center",
    right: 50,
  },
  cndbusinesshead: {
    height: 36,
    width: 130,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 0.8,
    justifyContent: "center",
    right: 50,
  },
  cndbusinesshead1: {
    width: 150,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -30,
    borderRadius: 10,
  },
  sbuhead: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
  },
  plasticbusiness1: {
    width: 170,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -25,
    borderRadius: 10,
  },
  recyclecnd: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  cndsitehead: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 10,
  },
  cndsitehead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  recyclecnd1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  plasticpd: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  plasticpd1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  bmwsitehead: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  iwmsitehead: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  iwmsitehead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    color: "black",
  },
  plasticsitehead: {
    height: 36,
    width: 120,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  plasticsitehead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  iwmsbuhead: {
    width: 150,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -30,
    borderRadius: 10,
  },
  bmwsitehead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    color: "black",
  },
  iwmpd: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  bmwsbuhead: {
    width: 150,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -30,
    borderRadius: 10,
  },
  mswsbuhead: {
    width: 150,
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? 0 : -32,
    borderRadius: 10,
  },
  iwmpd1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  mswct: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  mswct1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  mswsitehead: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  mswwte: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  bmwpd: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  bmwpd1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  mswpd: {
    height: 36,
    width: 135,
    top: -3,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    right: 20,
  },
  mswsitehead1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  header2: {
    margin: 2,
    paddingHorizontal: 8,
    top: 10,
  },
  centerComponent: {
    flex: 1,
  },
  menuImage: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  profileImage: {
    height: 30,
    width: 40,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
    marginTop: 3,
  },
  mswpd1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  backbar: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  mswwte1: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: "center",
    color: "black",
  },
  menubar: {
    height: 35,
    width: 35,
    resizeMode: "contain",
  },
  menubar1: {
    height: 40,
    width: 40,
    borderRadius: 25,
    top: 3,
  },
  text: {
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: "center",
  },
  rightComponent: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    width: 50,
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
  modalText: {
    fontSize: FONT_SIZES.H6,
    // @ts-ignore
    color: COLORS.BLACK_LOGIN,
    textAlign: "center",
    // @ts-ignore
    fontFamily: FONT_FAMILIES.MEDIUM,
  },
  buttonViewCancel: {
    height: height / 15,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: METRICS.MAR_10,
    height: responsiveHeight(7),
    width: 150,
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: METRICS.MAR_5,
    paddingHorizontal: METRICS.MAR_10,
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    fontSize: 17,
    color: COLORS.BLACK,
    height: METRICS.MAR_60,
  },
  firstthreeView: {
    height: height / 13,
    width: width / 3.36,
    justifyContent: "center",
    alignItems: "center",
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
  subTitle: {
    fontSize: responsiveHeight(1.5),
    color: COLORS.WHITE,
    textAlign: "center",
  },
  dropdown: {
    height: 36,
    width: 154,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    paddingHorizontal: 8,
    borderColor: "#E41F45",
    borderWidth: 2,
  },
  dropdown1: {
    height: 36,
    width: 174,
    backgroundColor: "#FFF0F1",
    borderRadius: 25,
    paddingHorizontal: 8,
    borderColor: "#E41F45",
    borderWidth: 2,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft: 8,
    color: "black",
    marginStart: 30,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "#E41F45",
  },
});
