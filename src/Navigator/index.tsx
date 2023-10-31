import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, BackHandler } from "react-native";
import Splash from "../Component/Splash";
import Login from "../Component/Auth/Login";

import DashboardMSWPdUser from "../Component/MSW/PDuser/Dashboard";
import DashboardMSWWteUser from "../Component/MSW/WTEUser/Dashboard";
import DashboardMSWSiteHead from '../Component/MSW/SiteHead/DashboardSiteHead';
import ForgotnumberEmail from "../Component/Auth/ForgetPassword/ForgotnumberEmail";
import Otpverify from "../Component/Auth/ForgetPassword/Otpverify";
import ConfirmPassword from "../Component/Auth/ForgetPassword/ConfirmPassword";
import AccountInfo from "../Component/Accountinfo";
import ChangePass from "../Component/ChangePass";
import DashboardMSWCtUser from "../Component/MSW/C&TUser/Dashboard";
import DashboardRecyclePlasticPdUser from "../Component/Recycle/PlasticComponent/PDUser";
import DashboardRecyclePlasticSiteHead from "../Component/Recycle/PlasticComponent/SiteHead";
import DashboardRecycleSbuHead from "../Component/Recycle/RecycleSbuHead";
import DashboardMSWBusinessHead from "../Component/MSW/BusinessHead/DashboardBusinessHead";
import DashboardRecycleCdPdUser from "../Component/Recycle/CDComponent/PDUser";
import DashboardRecyclePlasticBusinessHead from "../Component/Recycle/PlasticComponent/BusinessHead";
import DashboardRecycleCdSiteHead from "../Component/Recycle/CDComponent/SiteHead";
import DashboardRecycleCdBusinessHead from "../Component/Recycle/CDComponent/BusinessHead";
import LeftMenu from '../Component/LeftMenu';

import * as Constnt from "../Constant";
import DashboardBMWSiteHead from "../Component/BMW/SiteHead/DashboardSiteHead";
import DashboardBMWBusinessHead from '../Component/BMW/Businesshead';
import DashboardBMWPdUser from '../Component/BMW/PDUser';
import DashboardIWMPdUser from "../Component/IWM/PdUser";
import DashboardIWMSiteHead from "../Component/IWM/SiteHead";
import DashboardIWMBusinessHead from "../Component/IWM/BusinessHead";
import DashboardRecycleCrmPdUser from "../Component/Recycle/CrmComponent/PDUser";
import DashboardRecycleCrmSiteHead from "../Component/Recycle/CrmComponent/SiteHead";
import DashboardRecycleCrmBusinessHead from "../Component/Recycle/CrmComponent/BusinessHead";

const navigationRef = React.createRef();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { SPLASH, LOGIN, DASHBOARD, MAIN1, MAIN2, MAIN3, MAIN4, MAIN5, MAIN6, MAIN7, MAIN0, MAIN9, MAIN10, MAIN11, MAIN12, MAIN13, MAIN14, MAIN15, MAIN16, MAIN17, MAIN18, MAIN20, MAIN21, MAIN22, IMWOPERATIONUSER, IWMBUSINESSHEAD,
  DASHBOARDWTE, DASHBOAD_SITE, DASHBOARD_BUSINESS,
  FORGOT_NUMBER, OTP_VERIFY, CONFIRM_PASSWORD,
  ACCOUNTINFO, CHANGEPASS, 
  BMWBUSINESSHEAD, BMWSITEHEAD, IWMOPERATIONSITE, RECYCLEPLASTICUSER, RECYCLEPLASTICSITEUSER, RECYCLEPLASTICSBUHEADUSER, RECYCLEPLASTICBUSINESSHEAD,
  RECYCLECDUSER, RECYCLECDSITEUSER, RECYCLECDBUSINESSHEAD, RECYCLECRMCD, RECYCLECRMSITEHEAD, RECYCLECRMBUSINESSHEAD } = Constnt.SCREENS;

const Navigator = () => {
  //=======================================Use Effect =======================//
  React.useEffect(() => {
    function handleBackButton() {
      // @ts-ignore
      const routeInfo = navigationRef.current.getCurrentRoute();
      if (
        routeInfo.name.toLowerCase() === LOGIN ||
        routeInfo.name.toLowerCase() === DASHBOARD 
      ) {
        exitApp();
      } else {
        // @ts-ignore
        if (navigationRef.current.canGoBack()) {
          // @ts-ignore
          navigationRef.current.goBack();
        }
      }
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => backHandler.remove();
  }, []);

  const exitApp = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  //========================Drawer Navigator ====================================//
  const DrawerNavigatorPDuser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN1}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN1}
          component={DashboardMSWPdUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorCtuser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN0}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN0}
          component={DashboardMSWCtUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorWTEUSER = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN2}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN2}
          component={DashboardMSWWteUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorSiteHead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN3}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN3}
          component={DashboardMSWSiteHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorBusinessHead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN4}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN4}
          component={DashboardMSWBusinessHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorOperationUser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN5}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN5}
          component={DashboardBMWPdUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorBMWSiteHead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN6}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN6}
          component={DashboardBMWSiteHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorBMWBusinessHead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN7}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN7}
          component={DashboardBMWBusinessHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorIWMBusinessHead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN11}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN11}
          component={DashboardIWMBusinessHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorIWMOperationuser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN9}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN9}
          component={DashboardIWMPdUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorIWMsiteuser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN10}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN10}
          component={DashboardIWMSiteHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecycleplasticcduser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true }}
        initialRouteName={MAIN12}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN12}
          component={DashboardRecyclePlasticPdUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecycleplasticsiteuser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN13}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN13}
          component={DashboardRecyclePlasticSiteHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecycleplasticbusinessuser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN15}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN15}
          component={DashboardRecyclePlasticBusinessHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };
  const Drawerrecycleplasticsbuheaduser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN14}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN14}
          component={DashboardRecycleSbuHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecyclecduser = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN16}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN16}
          component={DashboardRecycleCdPdUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecyclecdsitehead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN17}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN17}
          component={DashboardRecycleCdSiteHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecyclecdbusinesshead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN18}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN18}
          component={DashboardRecycleCdBusinessHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecyclecrmcd = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN20}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN20}
          component={DashboardRecycleCrmPdUser}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecyclecrmsitehead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN21}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN21}
          component={DashboardRecycleCrmSiteHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Drawerrecyclecrmbusinesshead = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true}}
        initialRouteName={MAIN22}
        // @ts-ignore
        drawerType={'back'}
        drawerContent={(props: any) => <LeftMenu {...props} />}>
        <Drawer.Screen
          name={MAIN22}
          component={DashboardRecycleCrmBusinessHead}
          options={{
            headerShown: false,
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    // @ts-ignore
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator defaultScreenOptions={{ headerShown: false }}>
        <MainStack.Screen
          name={SPLASH}
          component={Splash}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
       
        <MainStack.Screen
          name={MAIN1}
          component={DrawerNavigatorPDuser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN2}
          component={DrawerNavigatorWTEUSER}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN3}
          component={DrawerNavigatorSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN4}
          component={DrawerNavigatorBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={DASHBOARDWTE}
          component={DashboardMSWWteUser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={DASHBOAD_SITE}
          component={DashboardMSWSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={DASHBOARD_BUSINESS}
          component={DashboardMSWBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={FORGOT_NUMBER}
          component={ForgotnumberEmail}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={OTP_VERIFY}
          component={Otpverify}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={CONFIRM_PASSWORD}
          component={ConfirmPassword}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={IWMOPERATIONSITE}
          component={DashboardIWMSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={IWMBUSINESSHEAD}
          component={DashboardIWMBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLECDSITEUSER}
          component={DashboardRecycleCdSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLECDBUSINESSHEAD}
          component={DashboardRecycleCdBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLECRMCD}
          component={DashboardRecycleCrmPdUser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLECRMSITEHEAD}
          component={DashboardRecycleCrmSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLECRMBUSINESSHEAD}
          component={DashboardRecycleCrmBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLECDUSER}
          component={DashboardRecycleCdPdUser}
          options={{ headerShown: false }}
        />
       
        <MainStack.Screen
          name={RECYCLEPLASTICUSER}
          component={DashboardRecyclePlasticPdUser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={ACCOUNTINFO}
          component={AccountInfo}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={CHANGEPASS}
          component={ChangePass}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={BMWSITEHEAD}
          component={DashboardBMWSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLEPLASTICSITEUSER}
          component={DashboardRecyclePlasticSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLEPLASTICBUSINESSHEAD}
          component={DashboardRecyclePlasticBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={RECYCLEPLASTICSBUHEADUSER}
          component={DashboardRecycleSbuHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={BMWBUSINESSHEAD}
          component={DashboardBMWBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={IMWOPERATIONUSER}
          component={DashboardIWMPdUser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN5}
          component={DrawerNavigatorOperationUser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN10}
          component={DrawerNavigatorIWMsiteuser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN20}
          component={Drawerrecyclecrmcd}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN21}
          component={Drawerrecyclecrmsitehead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN22}
          component={Drawerrecyclecrmbusinesshead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN12}
          component={Drawerrecycleplasticcduser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN13}
          component={Drawerrecycleplasticsiteuser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN14}
          component={Drawerrecycleplasticsbuheaduser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN15}
          component={Drawerrecycleplasticbusinessuser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN11}
          component={DrawerNavigatorIWMBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN16}
          component={Drawerrecyclecduser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN6}
          component={DrawerNavigatorBMWSiteHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN7}
          component={DrawerNavigatorBMWBusinessHead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN17}
          component={Drawerrecyclecdsitehead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN18}
          component={Drawerrecyclecdbusinesshead}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN9}
          component={DrawerNavigatorIWMOperationuser}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MAIN0}
          component={DrawerNavigatorCtuser}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
