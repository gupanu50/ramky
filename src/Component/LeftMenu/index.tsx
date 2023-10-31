import React, {
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Platform
} from "react-native";
import "./withConnect";
import { Divider, ListItem } from "react-native-elements";
import {  FONT_FAMILIES } from "../../Configration";
import { Images } from "../../Assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Constant from "../../Constant";
import {
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import withConnect from "./withConnect";
const { height, width } = Dimensions.get("screen");
// @ts-ignore
const { MAIN1, MAIN2, MAIN3, MAIN4, MAIN5, MAIN6, MAIN7, MAIN9, MAIN10, MAIN11, MAIN0, LOGIN, MAIN12, MAIN13, MAIN14, MAIN15, MAIN16, MAIN17, MAIN18, MAIN19, MAIN20, MAIN21, MAIN22, MAIN23, ACCOUNTINFO } =
  Constant.SCREENS;
const LeftMenu = (props: any) => {
  const { navigation, user, department } = props;
  const menuArray1 =
    [
      {
        name: "History",
        screen: MAIN1,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN1,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray16 =
    [
      {
        name: "History",
        screen: MAIN11,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN11,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray23 =
    [
      {
        name: "History",
        screen: MAIN12,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN12,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray25 =
    [
      {
        name: "History",
        screen: MAIN13,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN13,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray24 =
    [
      {
        name: "History",
        screen: MAIN14,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN14,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray44 =
    [
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN14,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray26 =
    [
      {
        name: "History",
        screen: MAIN15,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN15,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray27 =
    [
      {
        name: "History",
        screen: MAIN16,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN16,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray28 =
    [
      {
        name: "History",
        screen: MAIN17,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN17,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray29 =
    [
      {
        name: "History",
        screen: MAIN18,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN18,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray30 =
    [
      {
        name: "History",
        screen: MAIN19,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN19,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray5 =
    [
      {
        name1: "   Collected Waste",
        isActive: true,
        screen: MAIN3,
      },
      {
        name1: "   Processed Waste",
        isActive: true,
        screen: MAIN3,
      },
      {
        name1: "   Distribute Waste",
        isActive: true,
        screen: MAIN3,
      },
      {
        name1: "   WTE",
        isActive: true,
        screen: MAIN3,
      },
    ];
  const menuArray11 =
    [
      {
        name1: "  Collected Waste",
        isActive: true,
        screen: MAIN4,
      },
      {
        name1: "  Processed Waste",
        isActive: true,
        screen: MAIN4,
      },
      {
        name1: "  Distribute Waste",
        isActive: true,
        screen: MAIN4,
      },
    ];
  const menuArray9 =
    [
      {
        name1: "  Collected Waste",
        isActive: true,
        screen: MAIN6,
      },
      {
        name1: "  Processed Waste",
        isActive: true,
        screen: MAIN6,
      },
      {
        name1: "  Distribute Waste",
        isActive: true,
        screen: MAIN6,
      },
    ];
  const menuArray17 =
    [
      {
        name1: "  Collected Waste",
        isActive: true,
        screen: MAIN10,
      },
      {
        name1: "  Disposal Waste",
        isActive: true,
        screen: MAIN10,
      },
      {
        name1: "  LeftOver Stock",
        isActive: true,
        screen: MAIN10,
      },
    ];
  const menuArray18 =
    [
      {
        name1: "  Collected Waste",
        isActive: true,
        screen: MAIN11,
      },
      {
        name1: "  Disposal Waste",
        isActive: true,
        screen: MAIN11,
      },
      {
        name1: "  LeftOver Stock",
        isActive: true,
        screen: MAIN11,
      },
    ];
  const menuArray35 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN21,
      },
      {
        name1: "  Segregated",
        isActive: true,
        screen: MAIN21,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN21,
      },
    ];
  const menuArray36 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN22,
      },
      {
        name1: "  Segregated",
        isActive: true,
        screen: MAIN22,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN22,
      },
    ];
  const menuArray37 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN23,
      },
      {
        name1: "  Segregated",
        isActive: true,
        screen: MAIN23,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN23,
      },
    ];
  const menuArray38 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN17,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN17,
      },
      {
        name1: "  Product",
        isActive: true,
        screen: MAIN17,
      },
    ];
  const menuArray39 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN18,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN18,
      },
      {
        name1: "  Product",
        isActive: true,
        screen: MAIN18,
      },
    ];
  const menuArray40 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN19,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN19,
      },
    ];
  const menuArray41 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN13,
      },
      {
        name1: "  Segregated",
        isActive: true,
        screen: MAIN13,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN13,
      },
    ];
  const menuArray42 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN14,
      },
      {
        name1: department === "RECYCLE-CND" ? "  Processed" :"  Segregated" ,
        isActive: true,
        screen: MAIN14,
      },
      {
        name1: department === "RECYCLE-CND" ? "  Product" :"  Processed",
        isActive: true,
        screen: MAIN14,
      },
    ];
  const menuArray43 =
    [
      {
        name1: "  Collected",
        isActive: true,
        screen: MAIN15,
      },
      {
        name1: "  Segregated",
        isActive: true,
        screen: MAIN15,
      },
      {
        name1: "  Processed",
        isActive: true,
        screen: MAIN15,
      },
    ];
  const menuArray10 =

    [
      {
        name1: "  Collected Waste",
        isActive: true,
        screen: MAIN7,
      },
      {
        name1: "  Processed Waste",
        isActive: true,
        screen: MAIN7,
      },
      {
        name1: "  Distribute Waste",
        isActive: true,
        screen: MAIN7,
      },
    ];

  const menuArray =

    [

      {
        name: "History",
        isActive: true,
        screen: MAIN2,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN2,
      },

      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray3 =
    [
      {
        name: "History",
        isActive: true,
        screen: MAIN3,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN3,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray15 =

    [
      {
        name: "History",
        isActive: true,
        screen: MAIN10,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN10,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray4 =
    [
      {
        name: "WTE",
        isActive: true,
        screen: MAIN4,
      },
      {
        name: "History",
        isActive: true,
        screen: MAIN4,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN4,
      },

      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray6 =

    [

      {
        name: "History",
        isActive: true,
        screen: MAIN5,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN5,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray7 =
    [
      {
        name: "History",
        isActive: true,
        screen: MAIN6,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN6,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray8 =
    [
      {
        name: "History",
        isActive: true,
        screen: MAIN7,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN7,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray14 =
    [
      {
        name: "History",
        isActive: true,
        screen: MAIN9,
      },
      {
        name: `Account Info`,
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN9,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray12 =
    [
      {
        name: "History",
        screen: MAIN0,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN0,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray31 =
    [
      {
        name: "History",
        screen: MAIN20,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN20,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray32 =
    [
      {
        name: "History",
        screen: MAIN21,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN21,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];

  const menuArray33 =
    [
      {
        name: "History",
        screen: MAIN22,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN22,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const menuArray34 =
    [
      {
        name: "History",
        screen: MAIN23,
      },
      {
        name: "Account Info",
        isActive: true,
        screen: ACCOUNTINFO,
      },
      {
        name: "Help Center",
        isActive: true,
        screen: MAIN23,
      },
      {
        name: "Sign Out",
        isActive: true,
        screen: LOGIN,
      },
    ];
  const [isSelected, setisSelected] = useState(true);

  const logoutApi = () => {
    AsyncStorage.removeItem("user");
    navigation.reset({
      index: 0,
      routes: [{ name: LOGIN }]
    })
  };
  const onSelectMenu = (data: any) => {
    const { screen, name, name1, name3, name4 } = data;
    navigation.closeDrawer();
    //============ Logout ===============//
    if (name === "Sign Out") {
      const actions = [
        {
          text: "No",
          onPress: () => console.log("cancel Pressed"),
        },
        {
          text: "Yes",
          onPress: () => {
            logoutApi();
          },
        },
      ];
      Alert.alert("Logout", Constant.VALIDATE_FORM.LOGOUT, actions, {
        cancelable: false,
      });
    } else {
      navigation.navigate(screen, { name, name1 });
    }
  };
  const renderMenu1 = (item: any) => {
    const { image, name1 } = item.item;
    return (
      <TouchableOpacity
        key={name1}
        onPress={(e) => {
          onSelectMenu(item.item);
        }}
        style={styles.menuItem}
      >
        {/* @ts-ignore */}
        <ListItem containerStyle={{ backgroundColor: "transparent" }}>
          <ListItem.Title style={styles.ListitemConatiner}>
            {name1}
          </ListItem.Title>
        </ListItem>
      </TouchableOpacity>
    );
  };
  const renderMenu2 = (item: any) => {
    const { image, name } = item.item;
    return (
      <TouchableOpacity
        key={name}
        onPress={(e) => {
          onSelectMenu(item.item);
        }}
        style={styles.menuItem}
      >
        {/* @ts-ignore */}
        <ListItem containerStyle={{ backgroundColor: "transparent" }}>

          <ListItem.Title style={styles.ListitemConatiner}>
            {name}
          </ListItem.Title>
        </ListItem>
      </TouchableOpacity>
    );
  };

  const renderSeprator = () => {
    return (
      <View style={styles.renderSepratorView}>
        <Divider
          style={styles.divider}
          orientation={"horizontal"}
          color="#979797"
          width={3}
        />
      </View>
    );
  };
  const getFilterArray = () => {
    switch (user.roles[0]) {
      case "ROLE_MSW-P&D":
        return menuArray1
      case "ROLE_MSW-C&T":
        return menuArray12
      case "ROLE_BMW-P&D":
        return menuArray6
      case "ROLE_BMW-SITEHEAD":
        return menuArray7
      case "ROLE_BMW-SBUHEAD":
        return menuArray8
      case "ROLE_IWM-P&D":
        return menuArray14
      case "ROLE_MSW-WTE":
        return menuArray
      case "ROLE_MSW-SITEHEAD":
        return menuArray3
      case "ROLE_IWM-SITEHEAD":
        return menuArray15
      case "ROLE_MSW-SBUHEAD":
        return menuArray4
      case "ROLE_IWM-SBUHEAD":
        return menuArray16
      case "ROLE_RECYCLE-PLASTIC-P&D":
        return menuArray23
      case "ROLE_RECYCLE-PLASTIC-SITEHEAD":
        return menuArray25
      case "ROLE_RECYCLE-ALL-SBUHEAD":
        return department === "All" ? menuArray44 : menuArray24
      case "ROLE_RECYCLE-PLASTIC-BUSINESSHEAD":
        return menuArray26
      case "ROLE_RECYCLE-CND-P&D":
        return menuArray27
      case "ROLE_RECYCLE-CND-SITEHEAD":
        return menuArray28
      case "ROLE_RECYCLE-CND-BUSINESSHEAD":
        return menuArray29
      case "ROLE_RECYCLE-CND-SBUHEAD":
        return menuArray30
      case "ROLE_RECYCLE-CRM-P&D":
        return menuArray31
      case "ROLE_RECYCLE-CRM-SITEHEAD":
        return menuArray32
      case "ROLE_RECYCLE-CRM-BUSINESSHEAD":
        return menuArray33
      case "ROLE_RECYCLE-CRM-SBUHEAD":
        return menuArray34
      default: return []
    }
  };
  const getFilterData = () => {
    switch (user.roles[0]) {
      case "ROLE_MSW-SITEHEAD":
        return menuArray5;
      case "ROLE_BMW-SITEHEAD":
        return menuArray9;
      case "ROLE_MSW-SBUHEAD":
        return menuArray11;
      case "ROLE_BMW-SBUHEAD":
        return menuArray10;
      case "ROLE_IWM-SITEHEAD":
        return menuArray17;
      case "ROLE_IWM-SBUHEAD":
        return menuArray18;
      case "ROLE_RECYCLE-CRM-SITEHEAD":
        return menuArray35;
      case "ROLE_RECYCLE-CRM-BUSINESSHEAD":
        return menuArray36;
      case "ROLE_RECYCLE-CRM-SBUHEAD":
        return menuArray37;
      case "ROLE_RECYCLE-CND-SITEHEAD":
        return menuArray38;
      case "ROLE_RECYCLE-CND-BUSINESSHEAD":
        return menuArray39;
      case "ROLE_RECYCLE-CND-SBUHEAD":
        return menuArray40;
      case "ROLE_RECYCLE-PLASTIC-SITEHEAD":
        return menuArray41;
      case "ROLE_RECYCLE-ALL-SBUHEAD":
        return department === "All" ?  null : menuArray42;
      case "ROLE_RECYCLE-PLASTIC-BUSINESSHEAD":
        return menuArray43;
      default: return [];
    }
  };
  return (
    <View style={styles.container}>
      {user.roles[0] === "ROLE_RECYCLE-PLASTIC-P&D" ? <View style={styles.backArrowView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'Recycle Plastic'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_RECYCLE-CND-P&D" ? <View style={styles.backArrowView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'Recycling C&D'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_RECYCLE-CRM-P&D" ? <View style={styles.backArrowView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'Recycling CRM'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_RECYCLE-PLASTIC-SITEHEAD" || user.roles[0] === "ROLE_RECYCLE-ALL-SBUHEAD" || user.roles[0] === "ROLE_RECYCLE-PLASTIC-BUSINESSHEAD" ? <View style={styles.headMainView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'Menu'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_RECYCLE-CND-SITEHEAD" || user.roles[0] === "ROLE_RECYCLE-CND-BUSINESSHEAD" || user.roles[0] === "ROLE_RECYCLE-CND-SBUHEAD" ? <View style={styles.headMainView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'Menu'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_RECYCLE-CRM-SITEHEAD" || user.roles[0] === "ROLE_RECYCLE-CRM-BUSINESSHEAD" || user.roles[0] === "ROLE_RECYCLE-CRM-SBUHEAD" ? <View style={styles.headMainView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'Menu'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_BMW-P&D" ? <View style={styles.backArrowView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'BMW'}</Text>
        </View>
      </View> : null}
      {user.roles[0] === "ROLE_IWM-P&D" ? <View style={styles.backArrowView}>
        <View style={styles.backArrowView1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back1} style={styles.Backimage} />
          </TouchableOpacity>
          <Text style={styles.leftMenuMainText}>{'IWM'}</Text>
        </View>
      </View> : null}
      <View>
        {user.roles[0] === "ROLE_MSW-P&D" ? <View style={styles.headMainView}>
          <View style={styles.backArrowView1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back1} style={styles.Backimage} />
            </TouchableOpacity>
            <Text style={styles.leftMenuMainText}>{'MSW'}</Text>
          </View>
        </View> : null}
        {user.roles[0] === "ROLE_MSW-C&T" ? <View style={styles.headMainView}>
          <View style={styles.backArrowView1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back1} style={styles.Backimage} />
            </TouchableOpacity>
            <Text style={styles.leftMenuMainText}>{'MSW'}</Text>
          </View>
        </View> : null}
        {user.roles[0] === "ROLE_MSW-WTE" ? <View style={styles.headMainView}>
          <View style={styles.backArrowView1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back1} style={styles.Backimage} />
            </TouchableOpacity>
            <Text style={styles.leftMenuMainText}>{'WTE'}</Text>
          </View>
        </View> : null}
        {user.roles[0] === "ROLE_MSW-SITEHEAD" || user.roles[0] === "ROLE_MSW-SBUHEAD" ? <View style={styles.headMainView}>
          <View style={styles.backArrowView1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back1} style={styles.Backimage} />
            </TouchableOpacity>
            <Text style={styles.leftMenuMainText}>{'Menu'}</Text>
          </View>
        </View> : null}
        {user.roles[0] === "ROLE_IWM-SITEHEAD" || user.roles[0] === "ROLE_IWM-SBUHEAD" ? <View style={styles.headMainView}>
          <View style={styles.backArrowView1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back1} style={styles.Backimage} />
            </TouchableOpacity>
            <Text style={styles.leftMenuMainText}>{'Menu'}</Text>
          </View>
        </View> : null}
        {user.roles[0] === "ROLE_BMW-SITEHEAD" || user.roles[0] === "ROLE_BMW-SBUHEAD" ? <View style={styles.bmwSbuHeadView}>
          <View style={styles.backArrowView1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back1} style={styles.Backimage1} />
            </TouchableOpacity>
            <Text style={styles.leftMenuMainText}>{'Menu'}</Text>
          </View>
        </View> : null}
        {user.roles[0] === "ROLE_MSW-SITEHEAD" || user.roles[0] === "ROLE_MSW-SBUHEAD" ? <View>
          <View style={styles.mswHeadview}>
            <View style={styles.mswHeadview1}>
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text style={styles.mswHeadText}>MSW</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mswHeadview2}>
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                {isSelected ? <Image
                  source={Images.Upword}
                  style={styles.downUpImage}
                ></Image> : <Image
                  source={Images.rightArrow}
                  style={styles.downUpImage}
                ></Image>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list1}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}
        </View> : null}
        {user.roles[0] === "ROLE_BMW-SITEHEAD" || user.roles[0] === "ROLE_BMW-SBUHEAD" ? <View>
          <View style={styles.mswHeadview}>
            <View style={styles.mswHeadview1}>
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text style={styles.mswHeadText}>BMW</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mswHeadview2}>
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                {isSelected ? <Image
                  source={Images.Upword}
                  style={styles.downUpImage}
                ></Image> : <Image
                  source={Images.rightArrow}
                  style={styles.downUpImage}
                ></Image>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list1}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}
        </View> : null}
        {user.roles[0] === "ROLE_IWM-SITEHEAD" || user.roles[0] === "ROLE_IWM-SBUHEAD" ? <View>
          <View style={styles.mswHeadview}>
            <View
              style={styles.mswHeadview1}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text
                  style={styles.mswHeadText}
                >
                  IWM
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.mswHeadview2}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                {isSelected ? <Image
                  source={Images.Upword}
                  style={styles.downUpImage}
                ></Image> : <Image
                  source={Images.rightArrow}
                  style={styles.downUpImage}
                ></Image>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list1}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}
        </View> : null}
        {user.roles[0] === "ROLE_RECYCLE-CRM-SITEHEAD" || user.roles[0] === "ROLE_RECYCLE-CRM-BUSINESSHEAD" || user.roles[0] === "ROLE_RECYCLE-CRM-SBUHEAD" ? <View>

          <View style={[styles.mswHeadview, { marginTop: -15 }]}>
            <View
              style={styles.mswHeadview3}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text
                  style={styles.mswHeadText1}
                >
                  Recycling CRM
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.mswHeadview4}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                {isSelected ? <Image
                  source={Images.Upword}
                  style={styles.downUpImage}
                ></Image> : <Image
                  source={Images.rightArrow}
                  style={styles.downUpImage}
                ></Image>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list5}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}
        </View> : null}
        {user.roles[0] === "ROLE_RECYCLE-CND-SITEHEAD" || user.roles[0] === "ROLE_RECYCLE-CND-BUSINESSHEAD" || user.roles[0] === "ROLE_RECYCLE-CND-SBUHEAD" ? <View>
          <View style={[styles.mswHeadview, { marginTop: -15 }]}>
            <View
              style={styles.mswHeadview3}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text
                  style={styles.mswHeadText1}
                >
                  Recycling C&D
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.mswHeadview4}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                {isSelected ? <Image
                  source={Images.Upword}
                  style={styles.downUpImage}
                ></Image> : <Image
                  source={Images.rightArrow}
                  style={styles.downUpImage}
                ></Image>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list5}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}
        </View> : null}
        {user.roles[0] === "ROLE_RECYCLE-PLASTIC-SITEHEAD" || user.roles[0] === "ROLE_RECYCLE-PLASTIC-BUSINESSHEAD" ? <View>
          <View style={[styles.mswHeadview, { marginTop: -15 }]}>
            <View
              style={styles.mswHeadview3}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text
                  style={styles.mswHeadText2}
                >
                  Recycling Plastic
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.mswHeadview4}
            >
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                {isSelected ? <Image
                  source={Images.Upword}
                  style={styles.downUpImage}
                ></Image> : <Image
                  source={Images.rightArrow}
                  style={styles.downUpImage}
                ></Image>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list5}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}
        </View> : null}
        {user.roles[0] === "ROLE_RECYCLE-ALL-SBUHEAD" ? <View>
          <View style={[styles.mswHeadview, { marginTop: -15 }]}>
            <View style={styles.mswHeadview3}>
              <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                <Text style={styles.mswHeadText2}>
                  Recycle SBU Head
                </Text>
              </TouchableOpacity>
            </View>
            {department === 'All' ? null :
              <View
                style={styles.mswHeadview4}
              >
                <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
                  {isSelected ? <Image
                    source={Images.Upword}
                    style={styles.downUpImage}
                  ></Image> : <Image
                    source={Images.rightArrow}
                    style={styles.downUpImage}
                  ></Image>}
                </TouchableOpacity>
              </View>}
          </View>
          <View style={styles.renderSepratorView1}>
            <Divider
              style={styles.divider}
              orientation={"horizontal"}
              color="#979797"
              width={3}
            />
          </View>
          {isSelected ? (
            <View>
              <FlatList
                style={styles.list5}
                data={getFilterData()}
                extraData={getFilterData()}
                renderItem={renderMenu1}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeprator}
              />
            </View>
          ) : null}

        </View> : null}
        <FlatList
          style={styles.list}
          data={getFilterArray()}
          extraData={getFilterArray()}
          renderItem={renderMenu2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeprator}
        />
      </View>
    </View>
  );
};
export default withConnect(LeftMenu);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB0D15",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    alignSelf: "center",
  },
  list1: {
    alignSelf: "center",
  },
  list5: {
    alignSelf: "center",
    paddingLeft: 5,
  },
  item: {
    width: width / 1.2,
    marginVertical: 7,
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    height: height / 22,
  },
  ListitemConatiner: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2.1),
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  renderSepratorView: {
    backgroundColor: "yellow",
    width: 220,
    marginLeft: 15,
  },
  renderSepratorView1: {
    backgroundColor: "yellow",
    width: 220,
    marginLeft: 38,
  },
  Backimage: {
    marginTop: 42,
  },
  Backimage1: {
    marginTop: Platform.OS === 'ios' ? 50:42,
  },
  divider: {},
  backArrowView: {
    flexDirection: "row",
    top: 10
  },
  backArrowView1: {
    marginLeft: 10,
  },
  leftMenuMainText: {
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    fontSize: 17,
    fontWeight: "400",
    color: "#FFFFFF",
    marginLeft: 20,
    top: Platform.OS === "ios" ? -15 : -18,
  },
  headMainView: {
    flexDirection: "row",
    marginTop: 25
  },
  bmwSbuHeadView: {
    flexDirection: "row"
  },
  mswHeadview: {
    height: height / 15,
    flexDirection: "row",
  },
  mswHeadview1: {
    height: height / 15,
    width: width / 3.4,
    justifyContent: "center",
    alignItems: "center",
  },
  mswHeadText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    marginLeft: "5%",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    marginTop: 15,
  },
  mswHeadview2: {
    height: height / 12,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  downUpImage: {
    height: 15,
    width: 17,
    marginLeft: 30,
    tintColor: "#FFFFFF",
  },
  mswHeadview3: {
    height: height / 15,
    width: width / 2.2,
    justifyContent: "center",
    alignItems: "center",
  },
  mswHeadText1: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    marginLeft: "12%",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    marginTop: 15,
  },
  mswHeadview4: {
    height: height / 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
  mswHeadText2: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    marginLeft: "18%",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    marginTop: 15,
  },
});
