import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
  Image,
  Modal,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  BackHandler,
} from "react-native";
import _ from "lodash";
// import Toast from 'react-native-simple-toast';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  METRICS,
} from "../../../../Configration";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import XLSX from "xlsx";
import ApiClient from "../../../../Network";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import NavHeader from "../../../../ReuableComponent/NavHeader";
import Collection from "./Collection";
import { Images } from "../../../../Assets";
import Processed from "./Proceesed";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Footer from "./Footer";
import withConnect from "./withConnect";
import Product from "./Product";
import RNFS from "react-native-fs";
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const DashboardPdUser = (props: any) => {
  const { route, user, recyclecdSiteOperatorProcessed, recyclecdSiteOperatorCollected, recyclecdSiteOperatorProduct } = props;
  const { params } = route;
  const location = user.siteName[0].siteName;
  const [date, setDate] = useState<any>();
  const [date1, setDate1] = useState<any>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isOpen, toggleOpen] = useState(false);
  const [value1, setValue1] = useState<any>();
  const [isOpen1, toggleOpen1] = useState(false);
  const [value2, setValue2] = useState<any>();
  const [isOpen2, toggleOpen2] = useState(false);
  const [isOpen3, toggleOpen3] = useState(false);
  const [value4, setValue4] = useState<any>();
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected1, setSelected1] = useState("away");
  const [filter, setFilter] = useState("Collection");
  const [filter1, setFilter1] = useState("Date");
  const [filter2, setFilter2] = useState("Date");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isSelected3, setSelected3] = useState("away");
  const [datetype, setDateType] = useState();
  const [date3, setDate3] = useState<any>();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isOpen4, toggleOpen4] = useState(false);
  const [value5, setValue5] = useState<any>();
  const [isOpen5, toggleOpen5] = useState(false);
  const [value6, setValue6] = useState<any>();
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [value3, setValue3] = useState<any>();
  const [activeSections, setActiveSections] = useState([]);
  const [productSummaryCatalogue, setProductSummaryCatalogue] = useState([]);
  const [processedSummaryCatalogue, setProcessedSummaryCatalogue] = useState([]);
  const [processedArray, setProcessedArray] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [materialCollected, setMaterialCollected] = useState([]);
  const [materialProcessed, setMaterialProcessed] = useState([]);
  const [collectionTrendValue, setCollectionTrendValue] = useState([]);
  const [processedTrendValue, setProcessedTrendValue] = useState([]);
  const [productTrendValue, setProductTrendValue] = useState([]);
  const [historyValue, setHistoryValue] = useState([]);
  const [date4, setDate4] = useState<any>();
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [datarefresh, setDataRefresh] = useState(3);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [datarefresh3, setDataRefresh3] = useState(3);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelectedd, setisSelectedd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [touch, setTouch] = useState(false);
  const [datetype1, setDateType1] = useState();
  const [refresh1, setRefresh1] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  const [faq, setFaq] = useState([]);
  // *************************** Tab Data For Tab Selection*****************
  const [birth, setBirth] = useState([
    { name: "Collection", isSelected: true },
    { name: "Processed", isSelected: false },
    { name: "Product", isSelected: false },
  ]);
  // *************************** Method For Tab Selection*****************
  const selectActionTab = (item) => {
    setFilter(item.name);
    const _birth = birth.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth(_birth);
  };
  // *************************** Tab Selection Methods*****************
  const tabButton = (collect, product, processed) => {
    if (filter === "Collection") {
      return (
        <View style={styles.tabButtonView}>
          <View>
            <View style={styles.titlecontainer}>
              <View style={styles.view1}>
                <Text style={styles.dataText}>Date</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.dataText}>Weight(MT)</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            {/* @ts-ignore */}
            <Collection collectRefresh={collect} />
          </ScrollView>
        </View>
      );
    } else if (filter === "Product") {
      return (
        <View style={styles.tabButtonContainer}>
          <View>
            <View style={styles.listView1}>
              <View style={styles.listView2}>
                <Text style={[styles.listText, { marginLeft: 15 }]}>Date</Text>
              </View>
              <View style={styles.listView3}>
                {Platform.OS === 'ios' ? <Text style={styles.listText}>      KS{'\n'}    (MT)</Text> :
                  <Text style={[styles.listText,{left:5}]}>  KS{'\n'} (MT)</Text>}
              </View>
              <View style={[styles.viewJustifyContent, { flex: 0.6 }]}>
                {Platform.OS === 'ios' ? <Text style={styles.listText}>   PB{'\n'} (MT)</Text> :
                  <Text style={styles.listText}>  PB{'\n'} (MT)</Text>}
              </View>
              <View style={[styles.viewJustifyContent, { flex: 0.7 }]}>
                {Platform.OS === 'ios' ? <Text style={[styles.listText, {}]}>   CB {'\n'} (MT)</Text> :
                  <Text style={styles.listText}>   CB {'\n'}  (MT)</Text>}
              </View>
              {Platform.OS === 'ios' ? <View style={[styles.viewJustifyContent, { flex: 0.5 }]}>
                <Text style={[styles.listText]}>Others{'\n'}  (MT)</Text>
              </View> :
                <View style={[styles.viewJustifyContent, { flex: 0.4 }]}>
                  <Text style={[styles.listText]}>Others{'\n'} (MT)</Text>
                </View>
              }
            </View>
          </View>
          <ScrollView>
            {/* @ts-ignore */}
            <Product productRefresh={product} />
          </ScrollView>
        </View>
      );
    }
    else if (filter === "Processed") {
      return (
        <View style={styles.tabButtonView}>
          <View>
            <View style={styles.secondContainerprocessed}>
              <View style={[styles.titleView, { flex: 1.2 }]}>
                <Text style={styles.titleText}>Date</Text>
              </View>
              <View style={[styles.titleView, { flex: 0.7, top: 8 }]}>
                {Platform.OS === 'ios' ? <Text style={[styles.titleText, { left: 5 }]}> Fine   (MT)</Text> :
             <Text style={[styles.titleText,{left:6}]}>Fine   (MT)</Text>}
              </View>
              <View style={[styles.titleView, { flex: 0.9 }]}>
                <Text style={styles.titleText}>Coarse {"\n"}S{"\n"} (MT)</Text>
              </View>
              <View style={[styles.titleView, { flex: 0.7, left: 2 }]}>
                <Text style={styles.titleText}>10 mm (MT)</Text>
              </View>
              <View style={[styles.titleView, { flex: 0.7, left: 5 }]}>
                <Text style={styles.titleText}>20 mm (MT)</Text>
              </View>
              <View style={[styles.titleView, { flex: 0.7, left: 8 }]}>
                <Text style={styles.titleText}>V sand (MT)</Text>
              </View>
              <View style={[styles.titleView, { flex: 0.8, left: 5, top: 8 }]}>
                {Platform.OS === 'ios' ? <Text style={styles.titleText}>GSB {"\n"}(MT)</Text> : <Text style={styles.titleText}> GSB {"\n"} (MT)</Text>}
              </View>
              <View style={[styles.titleView, { flex: 0.8, top: 8 }]}>
                {Platform.OS === 'ios' ? <Text style={styles.titleText}>Others {"\n"} (MT)</Text> :
                  <Text style={styles.titleText}> Others {"\n"} (MT)</Text>}
              </View>
            </View>
          </View>
          <ScrollView>
            {/* @ts-ignore */}
            <Processed processedRefresh={processed} />
          </ScrollView>
        </View>
      );
    }
  };
  // *************************** Method For Tab Selection Rendering*****************
  const tabButtonSwitches2 = () => {
    if (filter === "Collection") {
      return collectionTrendGraphUI();
    } else if (filter === "Product") {
      return productTrendGraphUI();
    } else if (filter === "Processed") {
      return processingTrendGraphUI();
    }
  };
  // ************************Max Data For Charts***********************************
  // @ts-ignore
  const maxdata = Math.max(...collectionTrendValue.map((o) => o.weight));
  // @ts-ignore
  const maxdata2 = Math.max(...processedTrendValue.map((o) => o.processed));
  // @ts-ignore
  const maxdata3 = Math.max(...productTrendValue.map((o) => o.product));
  // *************************************Use Effect**********************************
  // *************************************Use Effect For Max Data For Chart For Trend**********************************
  useEffect(() => {
    if (maxdata >= 1000) {
      setDataRefresh(100);
    } else if (maxdata <= 10) {
      setDataRefresh(10);
    } else if (maxdata <= 50) {
      setDataRefresh(50);
    } else if (maxdata <= 100) {
      setDataRefresh(100);
    } else if (maxdata <= 10000) {
      setDataRefresh(100);
    } else if (maxdata <= 1500) {
      setDataRefresh(100);
    } else if (maxdata <= 2000) {
      setDataRefresh(100);
    } else if (maxdata <= 3000) {
      setDataRefresh(100);
    } else if (maxdata <= 4000) {
      setDataRefresh(100);
    } else if (maxdata <= 5000) {
      setDataRefresh(100);
    } else if (maxdata <= 6000) {
      setDataRefresh(100);
    } else if (maxdata <= 7000) {
      setDataRefresh(100);
    } else if (maxdata <= 8000) {
      setDataRefresh(100);
    }
  }, [maxdata]);
  useEffect(() => {
    if (maxdata2 >= 1000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 10) {
      setDataRefresh2(10);
    } else if (maxdata2 <= 50) {
      setDataRefresh2(50);
    } else if (maxdata2 <= 100) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 10000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 1500) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 2000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 3000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 4000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 5000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 6000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 7000) {
      setDataRefresh2(100);
    } else if (maxdata2 <= 8000) {
      setDataRefresh2(100);
    }
  }, [maxdata2]);
  useEffect(() => {
    if (maxdata3 >= 1000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 10) {
      setDataRefresh3(10);
    } else if (maxdata3 <= 50) {
      setDataRefresh3(50);
    } else if (maxdata3 <= 100) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 10000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 1500) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 2000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 3000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 4000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 5000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 6000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 7000) {
      setDataRefresh3(100);
    } else if (maxdata3 <= 8000) {
      setDataRefresh3(100);
    }
  }, [maxdata3]);
  // *************************************Use Effect For All API Calender**********************************
  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        materialSummary(date, date1, "date");
        collectionTrendApiChart(date, date1, "date");
        productTrendApiChart(date, date1, "date");
        processedTrendApiChart(date, date1, "date");
        productSummary(date, date1, "date");
        processedSummary(date, date1, "date");
      } else if (datetype == "Month") {
        materialSummary(value1, value2, "month");
        collectionTrendApiChart(value1, value2, "month");
        productTrendApiChart(value1, value2, "month");
        processedTrendApiChart(value1, value2, "month");
        productSummary(value1, value2, "month");
        processedSummary(value1, value2, "month");
      } else if (datetype == "Year") {
        materialSummary(value3, value4, "year");
        collectionTrendApiChart(value3, value4, "year");
        productTrendApiChart(value3, value4, "year");
        processedTrendApiChart(value3, value4, "year");
        productSummary(value3, value4, "year");
        processedSummary(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);
  // *************************************Use Effect For Help Center And History Modal Navigation*********
  useEffect(() => {
    if ((params?.name ?? "") == "History") {
      setShowModal(true);
      loadDefaultHistory();
    } else if ((params?.name ?? "") == "Help Center") {
      setShowModal1(true);
    }
  }, [params]);
  // *************************************Use Effect For Chart Refresh On Data Entry*********
  useEffect(() => {
    callingApi();
    setCheck(true);
    setCheck1(true);
  }, [recyclecdSiteOperatorCollected, recyclecdSiteOperatorProduct, recyclecdSiteOperatorProcessed]);
  // *************************************Use Effect For History API Calender**********************************
  useEffect(() => {
    if (check1 && !refresh1) {
      if (datetype1 == "Date") {
        historyApi(date3, date4, "date");
      } else if (datetype1 == "Month") {
        historyApi(value5, value6, "month");
      }
    }
  }, [datetype1, refresh1, check1]);
   // *************************************Use Effect For Reminder****************************************** 
  //  useEffect(() => {
  //   {user?.noFilledDataDates?.length == null ? setShowModal2(false) : setShowModal2(true);}
  // }, []);

   //******************************** Back handler ****************/
   useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );
  //  **************** Calling Api Method For Calling Api In First Time ***************************
  const callingApi = () => {
    loadDefaultMaterialSummary();
    loadDefaultCollectionTrendGraph();
    loadDefaultProductTrendGraph();
    loadDefaultProcessedTrendGraph();
    loadDefaultProductSummary();
    loadDefaultProcessedSummary();
  };
  // ************************Default Data Methods***********************************
  const loadDefaultMaterialSummary = () => {
    materialSummary(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultProductSummary = () => {
    productSummary(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultProcessedSummary = () => {
    processedSummary(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultCollectionTrendGraph = () => {
    collectionTrendApiChart(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultProductTrendGraph = () => {
    productTrendApiChart(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultProcessedTrendGraph = () => {
    processedTrendApiChart(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultHistory = () => {
    historyApi(
      moment(new Date()).subtract(6, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultHistoryDownloadData = () => {
    if (datetype1 == "Date") {
      historyDownloadApi(date3, date4, "date");
    } else if (datetype1 == "Month") {
      historyDownloadApi(value5, value6, "month");
    } else {
      historyDownloadApi(
        moment(new Date()).subtract(6, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  //****************** Processed Summary API **************/
  // eslint-disable-next-line no-unused-vars
  const processedSummary = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result: any =
      await ApiClient.createApiClient().recycleSiteOperatorProcessedSummary(
        payload
      );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result: any =
    //   await ApiClient.createApiClient().recycleSiteOperatorProcessedSummary(
    //     params
    //   );
    if (result.status && result.data.status === true) {
      const collected = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(collected)
        .map(([key, value]) => {
          return {
            title: key,
            value: value,
          };
        })
        .filter((item) => item.value !== 0);
      console.log("product catalog", catalogue);
      // @ts-ignore
      setProcessedSummaryCatalogue(catalogue);
      var array1 = [];
      var array2 = [];
      var index = 0;
      for (var i = 0; i < catalogue.length / 3; i++) {
        // @ts-ignore
        array1.push(catalogue[index]);
        // @ts-ignore
        array1.push(catalogue[index + 1]);
        // @ts-ignore
        array1.push(catalogue[index + 2]);
        index = index + 3;
        // @ts-ignore
        array2.push(array1);
        array1 = [];
      }
      setProcessedArray(array2);
    } else {
      setProcessedSummaryCatalogue([]);
    }
  };
  //****************** Product Summary API **************/
  // eslint-disable-next-line no-unused-vars
  const productSummary = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result: any =
      await ApiClient.createApiClient().recycleSiteOperatorProductSummary(
        payload
      );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result: any =
    //   await ApiClient.createApiClient().recycleSiteOperatorProductSummary(
    //     params
    //   );
    if (result.status && result.data.status === true) {
      const collected = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(collected)
        .map(([key, value]) => {
          return {
            title: key,
            value: value,
          };
        })
        .filter((item) => item.value !== 0);
      // @ts-ignore
      setProductSummaryCatalogue(catalogue);
      var array1 = [];
      var array2 = [];
      var index = 0;
      for (var i = 0; i < catalogue.length / 3; i++) {
        // @ts-ignore
        array1.push(catalogue[index]);
        // @ts-ignore
        array1.push(catalogue[index + 1]);
        // @ts-ignore
        array1.push(catalogue[index + 2]);
        index = index + 3;
        // @ts-ignore
        array2.push(array1);
        array1 = [];
      }
      setProductArray(array2);
    } else {
      setProductSummaryCatalogue([]);
    }
  };
  //**************** Collection Trend Graph API***************************/
  // eslint-disable-next-line no-unused-vars
  const collectionTrendApiChart = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result =
      await ApiClient.createApiClient().recycleSiteOperatorCollectedGraph(
        payload
      );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result =
    //   await ApiClient.createApiClient().recycleSiteOperatorCollectedGraph(
    //     params
    //   );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        const format =
          datetype == "Date"
            ? "YYYY-MM-DD"
            : datetype == "Month"
              ? "YYYY-MM"
              : datetype == "Year"
                ? "YYYY"
                : "YYYY-MM-DD";
        var dateArr = _.uniq(
          arr.map((item) =>
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) ===
              moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)
          );
          var weight = 0;
          filterDateArr.forEach((item) => {
            weight = weight + item.totalWeight ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, weight });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.date) - new Date(b.date);
      });
      setCollectionTrendValue(sortedData);
    } else {
      setCollectionTrendValue([]);
    }
  };
  //******************** Product Trend Graph API***************************/
  // eslint-disable-next-line no-unused-vars
  const productTrendApiChart = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result =
      await ApiClient.createApiClient().recycleSiteOperatorProductGraph(
        payload
      );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result =
    //   await ApiClient.createApiClient().recycleSiteOperatorProductGraph(
    //     params
    //   );
    console.log("result", result);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        const format =
          datetype == "Date"
            ? "YYYY-MM-DD"
            : datetype == "Month"
              ? "YYYY-MM"
              : datetype == "Year"
                ? "YYYY"
                : "YYYY-MM-DD";
        var dateArr = _.uniq(
          arr.map((item) =>
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) ===
              moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)
          );
          var product = 0;
          filterDateArr.forEach((item) => {
            product = product + item.productWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, product });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.date) - new Date(b.date);
      });
      setProductTrendValue(sortedData);
    } else {
      setProductTrendValue([]);
    }
  };
  //******************** Processed Trend Graph API**************/
  // eslint-disable-next-line no-unused-vars
  const processedTrendApiChart = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result =
      await ApiClient.createApiClient().recycleSiteOperatorProcessedGraph(
        payload
      );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result =
    //   await ApiClient.createApiClient().recycleSiteOperatorProcessedGraph(
    //     params
    //   );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        const format =
          datetype == "Date"
            ? "YYYY-MM-DD"
            : datetype == "Month"
              ? "YYYY-MM"
              : datetype == "Year"
                ? "YYYY"
                : "YYYY-MM-DD";
        var dateArr = _.uniq(
          arr.map((item) =>
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) ===
              moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)
          );
          var processed = 0;
          filterDateArr.forEach((item) => {
            processed = processed + item.processedWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, processed });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.date) - new Date(b.date);
      });
      setProcessedTrendValue(sortedData);
    } else {
      setProcessedTrendValue([]);
    }
  };
  // ******************** Material Summary api ****************
  // eslint-disable-next-line no-unused-vars
  const materialSummary = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
  
    const result =
      await ApiClient.createApiClient().recycleSiteOperatorMaterialSummary(
        payload
      );
    // const params={start:previousDay,end:time1,siteName:location};
    // const result =
    //   await ApiClient.createApiClient().recycleSiteOperatorMaterialSummary(
    //     params
    //   );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      setMaterialCollected(result.data.data[0]);
      // @ts-ignore
      setMaterialProcessed(result.data.data[0]);
    } else {
      setMaterialCollected([]);
      setMaterialProcessed([]);
    }
  };
  //*************** History Api *****************/
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay =
      moment(date3).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date4).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
 
    const result = await ApiClient.createApiClient().recycleSiteOperatorHistory(
      payload
    );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().recycleSiteOperatorHistory(
    //   params
    // );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setHistoryValue(arr);
      }
    } else {
      setHistoryValue([]);
    }
  };
  //************ history download api *************/
  // eslint-disable-next-line no-unused-vars
  const historyDownloadApi = async (date3, date4, date2) => {
    var previousDay = moment(date3).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date4).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);

    const result = await ApiClient.createApiClient().recycleSiteOperatorHistory(
      payload
    );
    //   const params={start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().recycleSiteOperatorHistory(
    //   params
    // );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Weight": d?.totalWeight,
            "Fine": d?.fine,
            "Coarse S": d?.coarseS,
            "10 mm": d?.tenMm,
            "20 mm": d?.twentyMm,
            "V sand": d?.vSand,
            "Gsb": d?.gsb,
            "Others": d?.others,
            "Krebs Stones": d?.krebsStones,
            "Paver Blocks": d?.paverBlocks,
            "Cement Bricks": d?.cementBricks,
            "Others Product": d?.othersProduct,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        historyPermissionDownload(printArr);
      }
    }
  };
  // ***********************Help Center API Methods******************
  const helpCenterContactUs = async () => {
    const result = await ApiClient.createApiClient().contactus();
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setHelpLineNo1(arr[0].helpLineNumber1);
        setHelpLineNo2(arr[0].helpLineNumber2);
      }
    }
  };
  const helpCenterFaqs = async () => {
    const result = await ApiClient.createApiClient().faqs();
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setFaq(arr);
      }
    }
  };
  // ***********************History Download Excel Sheet Methods******************
  const historyPermissionDownload = async (downloadHistoryData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportHistoryDataToExcelDownload(downloadHistoryData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportHistoryDataToExcelDownload(downloadHistoryData);
        } else {
          // If permission denied then show alert
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const exportHistoryDataToExcelDownload = (downloadHistoryData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadHistoryData);
    XLSX.utils.book_append_sheet(wb, ws, "History Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    // Write generated excel to Storage
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/recycle_cd_pd_history_data.xlsx",
      wbout,
      "ascii"
    )
      .then(() => {
        {
          Platform.OS === 'android' ?
            ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
            Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  // *************************** Help Center Extended Method*****************
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true;
    setTouch(!touch);
  };
  // *************************** Collection Trend Calender Methods*****************
  const [birth1, setBirth1] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
    { name: "Year", isSelected: false },
  ]);
  const selectActionTab1 = (item) => {
    setFilter1(item.name);
    const _birth1 = birth1.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth1(_birth1);
    setSelected1("away");
  };
  const dataFilter = () => {
    const filterData = _.filter(birth1, (item: any) => {
      return item.isSelected;
    });
    setDateType(filterData[0].name);
    setRefresh(false);
  };
  const calendarModal = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.calenderview}>
              <View style={styles.calenderview1}>
                <FlatList
                  style={styles.calenderflatlist}
                  extraData={birth1}
                  horizontal
                  data={birth1}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab1(item)}>
                        <View
                          style={[
                            styles.calenderflatlistview12,
                            {
                              backgroundColor: isSelected
                                ? "#DB0D15"
                                : "#F8F8F8",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.card1headingtext1,
                              {
                                color: isSelected ? "#FFFFFF" : "#626362",
                              },
                            ]}
                          >
                            {name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={styles.calenderflatlistview1}>
                <TouchableOpacity
                  onPress={() => { setModalVisible(!modalVisible), clearCollectionTrendCalender(); }}
                >
                  <View style={styles.calenderflatlistview2}>
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calenderview}>
              <View style={styles.calenderflatlistview3}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected1("away");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview4,
                      {
                        backgroundColor:
                          isSelected1 === "away" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected1 === "away" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      Start
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.calenderflatlistview5}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected1("home");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview6,
                      {
                        backgroundColor:
                          isSelected1 === "home" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected1 === "home" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      End
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calenderflatlistview7}>
              {tabButtonSwitches1()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const clearCollectionTrendCalender = () => {
    setDate(""), setDate1(""), setValue1(""), setValue2(""), setValue3(""), setValue4(""), setSelected1("away"),
      setBirth1([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
        { name: "Year", isSelected: false },
      ]), setFilter1("Date"), setRefresh(true);
  };
  const dateData = () => {
    return (
      <View style={styles.dateview}>
        {isSelected1 === "away" ? (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.datethirdview}>
                {date ? moment(date).format("DD-MMM") : "Select Start Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker1}>
              <Text style={styles.datethirdview}>
                {date1 ? moment(date1).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
                minimumDate={date || new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              dataFilter();
            }}
          >
            <View style={styles.datesubmitsecondview}>
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData = () => {
    return (
      <View style={styles.monthdataView1}>
        {isSelected1 === "away" ? (
          <View
            style={{
              height: height / 15,
              width: width / 2,
            }}
          >
            <TouchableOpacity
              onPress={() => toggleOpen(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value1
                  ? moment(value1).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value1 || new Date()}
                    onMonthChange={(date) => {
                      setValue1(date), setRefresh(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value1) ? setValue1(moment().startOf("month")) : null; }
                      toggleOpen(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={styles.monthdataView2}>
            <TouchableOpacity
              onPress={() => toggleOpen1(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value2
                  ? moment(value2).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen1}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value2 || new Date()}
                    minDate={value1 || new Date()}
                    onMonthChange={(date) => {
                      setValue2(
                        // @ts-ignore
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value2) ? setValue2(moment()) : null; }
                      toggleOpen1(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.monthdataView3}>
          <TouchableOpacity
            onPress={() => {
              dataFilter();
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.monthdataView4}>
              <Text style={styles.monthSubmit}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const yearData = () => {
    return (
      <View style={styles.yearView1}>
        {isSelected1 === "away" ? (
          <View style={styles.yearView2}>
            <TouchableOpacity
              onPress={() => toggleOpen2(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value3 ? moment(value3).format("YYYY") : "Select Start Year"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen2}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value3 || new Date()}
                    onMonthChange={(date) => {
                      setValue3(date), setRefresh(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value3) ? setValue3(moment().startOf("month")) : null, setRefresh(true); }
                      toggleOpen2(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={styles.yearView2}>
            <TouchableOpacity
              onPress={() => toggleOpen3(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value4 ? moment(value4).format("YYYY") : "Select End Year"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen3}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value4 || new Date()}
                    minDate={value3 || new Date()}
                    onMonthChange={(date) => {
                      setValue4(
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value4) ? setValue4(moment()) : null; }
                      toggleOpen3(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.yearView3}>
          <TouchableOpacity
            onPress={() => {
              dataFilter();
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.yearView4}>
              <Text style={styles.monthSubmit}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(date);
    setRefresh(true);
    hideDatePicker();
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = (date1) => {
    setDate1(date1);
    setRefresh(true);
    hideDatePicker1();
  };
  const tabButtonSwitches1 = () => {
    if (filter1 === "Date") {
      return dateData();
    } else if (filter1 === "Month") {
      return monthData();
    } else if (filter1 === "Year") {
      return yearData();
    }
  };
  // *************************** History Calender Methods*****************
  const [birth2, setBirth2] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const dataFilter1 = () => {
    const filterData = _.filter(birth2, (item: any) => {
      return item.isSelected;
    });
    setDateType1(filterData[0].name);
    setRefresh1(false);
  };
  const selectActionTab2 = (item) => {
    setFilter2(item.name);
    const _birth1 = birth2.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth2(_birth1);
    setSelected3("away");
  };
  const calenderModal1 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.calenderview}>
              <View style={styles.calenderview1}>
                <FlatList
                  style={styles.calenderflatlist}
                  extraData={birth2}
                  horizontal
                  data={birth2}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab2(item)}>
                        <View
                          style={[
                            styles.calenderflatlistview12,
                            {
                              backgroundColor: isSelected
                                ? "#DB0D15"
                                : "#F8F8F8",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.card1headingtext,
                              {
                                color: isSelected ? "#FFFFFF" : "#626362",
                              },
                            ]}
                          >
                            {name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={styles.calenderflatlistview1}>
                <TouchableOpacity
                  onPress={() => { setModalVisible1(!modalVisible1), clearHistoryCalender(); }}
                >
                  <View style={styles.calenderflatlistview2}>
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calenderview}>
              <View style={styles.calenderflatlistview3}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected3("away");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview4,
                      {
                        backgroundColor:
                          isSelected3 === "away" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected3 === "away" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      Start
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.calenderflatlistview5}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected3("home");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview6,
                      {
                        backgroundColor:
                          isSelected3 === "home" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected3 === "home" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      End
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calenderflatlistview7}>
              {tabButtonSwitches3()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const clearHistoryCalender = () => {
    setDate3(""), setDate4(""), setValue5(""), setValue6(""), setSelected3("away"),
      setBirth2([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter2("Date"), setRefresh1(true);
  };
  const dateData1 = () => {
    return (
      <View style={styles.datedataView1}>
        {isSelected3 === "away" ? (
          <View style={styles.datedataView2}>
            <TouchableOpacity onPress={showDatePicker2}>
              <Text style={styles.datedataText1}>
                {date3 ? moment(date3).format("DD-MMM") : "Select Start Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.datedataView3}>
            <TouchableOpacity onPress={showDatePicker3}>
              <Text style={styles.datedataText2}>
                {date4 ? moment(date4).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible3}
                mode="date"
                onConfirm={handleConfirm3}
                onCancel={hideDatePicker3}
                maximumDate={new Date()}
                minimumDate={date3 || new Date()}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.datedataView4}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible1(!modalVisible1);
              dataFilter1();
            }}
          >
            <View style={styles.datedataView5}>
              <Text style={{ color: "white", fontSize: 14 }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData1 = () => {
    return (
      <View style={styles.yearView1}>
        {isSelected3 === "away" ? (
          <View style={styles.yearView2}>
            <TouchableOpacity
              onPress={() => toggleOpen4(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value5
                  ? moment(value5).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen4}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value5 || new Date()}
                    onMonthChange={(date) => {
                      setValue5(date), setRefresh1(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value5) ? setValue5(moment().startOf("month")) : null; }
                      toggleOpen4(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={styles.yearView2}>
            <TouchableOpacity
              onPress={() => toggleOpen5(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value6
                  ? moment(value6).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen5}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value6 || new Date()}
                    minDate={value1 || new Date()}
                    onMonthChange={(date) => {
                      setValue6(
                        // @ts-ignore
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh1(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value6) ? setValue6(moment()) : null; }
                      toggleOpen5(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.yearView3}>
          <TouchableOpacity
            onPress={() => {
              dataFilter1();
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.yearView4}>
              <Text style={styles.monthSubmit}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const showDatePicker3 = () => {
    setDatePickerVisibility3(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };
  const handleConfirm2 = (date2) => {
    setDate3(date2);
    setRefresh1(true);
    hideDatePicker2();
  };
  const handleConfirm3 = (date3) => {
    setDate4(date3);
    setRefresh1(true);
    hideDatePicker3();
  };
  const tabButtonSwitches3 = () => {
    if (filter2 === "Date") {
      return dateData1();
    } else if (filter2 === "Month") {
      return monthData1();
    }
  };
  // *************************** Date Month Year Selection Method on Chart*****************
  const getDateString = (date) => {
    return moment(date, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
      datetype == "Date"
        ? "DD"
        : datetype == "Month"
          ? "MMM"
          : datetype == "Year"
            ? "YYYY"
            : "DD"
    );
  };
  //**************************** Collection Trend Graph UI *****************************/
  const collectionTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Collection Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View style={styles.yeardropNew1}>
                  <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                    <Image source={Images.calender1} style={styles.img}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {collectionTrendValue.length > 0 ? (
                <VictoryChart
                  width={width / 0.99}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={{
                    x:
                      collectionTrendValue.length < 3
                        ? 160
                        : collectionTrendValue.length < 5
                          ? 85
                          : 8,
                  }}
                  domain={{
                    y: [0, Math.ceil(maxdata / 100) * datarefresh || 10],
                  }}
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                    tickFormat={(t) => getDateString(t)}
                    tickLabelComponent={<VictoryLabel />}
                    style={{ tickLabels: { fontSize: 10 } }}
                  />
                  <VictoryAxis
                    dependentAxis={true}
                    tickLabelComponent={<VictoryLabel />}
                  />
                  <VictoryBar
                    barRatio={1}
                    style={{ data: { fill: "#E87818" } }}
                    data={collectionTrendValue}
                    barWidth={8}
                    x="date"
                    y="weight"
                  />
                </VictoryChart>
              ) : (
                <View style={styles.detailsNotFoundViewChart}>
                  <Text style={styles.detailsNotFoundTextChart}>
                    {"Data Is Not Found."}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View style={styles.weightinmeticview}>
                <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  // *************************** Product Trend Rendering Methods*****************
  const productTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Product Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View
                  style={{
                    height: height / 21,
                    width: width / 7,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                    <Image
                      source={Images.calender1}
                      style={{ height: 33, width: 33 }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {productTrendValue.length > 0 ? (
                <VictoryChart
                  width={width / 0.99}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={{
                    x:
                      productTrendValue.length < 3
                        ? 160
                        : productTrendValue.length < 5
                          ? 85
                          : 8,
                  }}
                  domain={{
                    y: [0, Math.ceil(maxdata3 / 100) * datarefresh3 || 10],
                  }}
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                    tickFormat={(t) => getDateString(t)}
                    tickLabelComponent={<VictoryLabel />}
                    style={{ tickLabels: { fontSize: 10 } }}
                  />
                  <VictoryAxis
                    dependentAxis={true}
                    tickLabelComponent={<VictoryLabel />}
                  />
                  <VictoryBar
                    barRatio={1}
                    style={{ data: { fill: "#E87818" } }}
                    data={productTrendValue}
                    barWidth={8}
                    x="date"
                    y="product"
                  />
                </VictoryChart>
              ) : (
                <View style={styles.detailsNotFoundViewChart}>
                  <Text style={styles.detailsNotFoundTextChart}>
                    {"Data Is Not Found."}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View style={styles.weightinmeticview}>
                <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  //**************************** Processing Trend Graph UI *****************************/
  const processingTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Processed Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View style={styles.yeardropNew3}>
                  <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                    <Image
                      source={Images.calender1}
                      style={styles.img3}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {processedTrendValue.length > 0 ? (
                <VictoryChart
                  width={width / 0.99}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={{
                    x:
                      processedTrendValue.length < 3
                        ? 160
                        : processedTrendValue.length < 5
                          ? 85
                          : 8,
                  }}
                  domain={{
                    y: [0, Math.ceil(maxdata2 / 100) * datarefresh2 || 10],
                  }}
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                    tickFormat={(t) => getDateString(t)}
                    tickLabelComponent={<VictoryLabel />}
                    style={{ tickLabels: { fontSize: 10 } }}
                  />
                  <VictoryAxis
                    dependentAxis={true}
                    tickLabelComponent={<VictoryLabel />}
                  />
                  <VictoryBar
                    barRatio={1}
                    style={{ data: { fill: "#E87818" } }}
                    data={processedTrendValue}
                    barWidth={8}
                    x="date"
                    y="processed"
                  />
                </VictoryChart>
              ) : (
                <View style={styles.detailsNotFoundViewChart}>
                  <Text style={styles.detailsNotFoundTextChart}>
                    {"Data Is Not Found."}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View style={styles.weightinmeticview}>
                <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  // *************************Acordion Sections Selection Method************
  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  // ***********************Accordion In History Methods******************
  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText1}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
        <Image
          style={{ marginTop: 7, tintColor: "black", marginRight: 30 }}
          source={isActive ? Images.dropdown : Images.Upword}
        ></Image>
      </Animatable.View>
    );
  };
  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.contentHistory,
          isActive ? styles.activee : styles.inactivee,
        ]}
        transition="backgroundColor"
      >
        {Object.entries(section).map(([key, value]) => {
          if (key === "splitDate") return null;
          if (key === "siteName")
            return (
              <View style={[styles.ans]}>
                <Animatable.Text style={styles.segregationTitleText}>
                  {key
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                    .replace(/([a-zA-Z])([A-Z])([a-z])/g, "$1 $2$3")}
                </Animatable.Text>
                <Animatable.Text style={styles.segregationTitleValue}>
                  {/* @ts-ignore */}
                  {value[0].siteName}
                </Animatable.Text>
              </View>
            );
          return (
            <View style={[styles.ans]} key={key}>
              <Animatable.Text style={styles.segregationTitleText}>
                {key
                  .replace(/\b\w/g, (l) => l.toUpperCase())
                  .replace(/([a-zA-Z])([A-Z])([a-z])/g, "$1 $2$3")}
              </Animatable.Text>
              <Animatable.Text style={styles.segregationTitleValue}>
                {/* @ts-ignore */}
                {value}
              </Animatable.Text>
            </View>
          );
        })}
      </Animatable.View>
    );
  };
   // ***********************Reminder Modal*************************************
  //  const reminderModal = () => {
  //   return (
  //     <Modal
  //       style={{ zIndex: 10 }}
  //       animationType="slide"
  //       transparent={true}
  //       visible={showModal2}
  //       onRequestClose={() => {
  //         setShowModal2(false);
  //       }}>
  //       <View style={styles.reminderMainView}>
  //         <View style={styles.reminderModalView}>
  //           <View style={styles.reminderModalView1}>
  //             <View style={styles.reminderTextView}>
  //               { user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='RECYCLE-CD-Collect';
  //               }).length ? 
  //                 <Text style={styles.reminderInputText}>Please input the data for collect</Text>:null}
  //               {user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='RECYCLE-CD-Collect';
  //               }).map(d=>{
  //                 return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
  //               })}
  //               { user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='RECYCLE-CD-Processed';
  //               }).length ?
  //                 <Text style={styles.reminderInputText}>Please input the data for processed</Text>:null}
  //               {user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='RECYCLE-CD-Processed';
  //               }).map(d=>{
  //                 return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
  //               })}
  //               { user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='RECYCLE-CD-Product';
  //               }).length ?
  //                 <Text style={styles.reminderInputText}>Please input the data for product</Text>:null}
  //               {user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='RECYCLE-CD-Product';
  //               }).map(d=>{
  //                 return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
  //               })}
  //             </View>
  //             <View style={styles.reminderButtonMainView}>
  //               <TouchableOpacity onPress={() => setShowModal2(false)}>
  //                 <View style={styles.reminderButtonTextView}>
  //                   <Text style={styles.reminderButtonText}>Ok</Text>
  //                 </View>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };
  //*********************** History UI Modal ******************/
  const client4 = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalHistoryView1}>
            <View style={styles.historyView}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setActiveSections([]);
                }}
              >
                <View>
                  <Image
                    source={Images.backarrow}
                    style={styles.historybackImage}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.historyText}>History</Text>
            </View>

            <View style={styles.firstView}>
              <TouchableOpacity
                onPress={() => { clearHistoryCalender(), setModalVisible1(!modalVisible1); }}
              >
                <Image source={Images.calender1} style={styles.client4image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => loadDefaultHistoryDownloadData()}>
                <Image
                  source={Images.download}
                  style={styles.historyDownloadImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={historyValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader}
                  renderContent={renderContent}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  //******************* Faq Modal **************/
  const client5 = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal1}
        onRequestClose={() => {
          setShowModal1(false);
        }}
      >
        <View style={[styles.centeredView1, { flex: 1 }]}>
          <View style={styles.modalView1}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal1(false);
                }}
              >
                <Image
                  source={Images.backarrow}
                  style={styles.helpCenterBackImage}
                />
              </TouchableOpacity>
              <View style={styles.helpCenterView}>
                <ModalHeader title={"Help Center"} />
              </View>
            </View>
            <ScrollView>
              <View style={styles.secondView}>
                <TouchableOpacity
                  onPress={() => {
                    setisSelected2(!isSelected2), helpCenterContactUs();
                  }}
                  style={styles.contactUsTouchableOpcacity}
                >
                  <View style={styles.connectView}>
                    <Text style={[styles.headerText, { left: 10 }]}>
                      {"Contact us"}
                    </Text>
                    <Image
                      style={styles.helpCenterDownImage}
                      source={isSelected2 ? Images.dropdown : Images.Upword}
                    />
                  </View>
                </TouchableOpacity>
                {isSelected2 ? (
                  <View style={styles.helpCenterView1}>
                    <View style={styles.anss}>
                      <View style={styles.textinputView}>
                        <Text style={styles.secureInput}>{helpLineNo1}</Text>
                      </View>
                      <View style={styles.imgView}>
                        <Image
                          style={styles.helpCenterCallImage}
                          source={Images.Call}
                        />
                      </View>
                    </View>
                    <View style={styles.anss}>
                      <View style={styles.textinputView}>
                        <Text style={styles.secureInput}>{helpLineno2}</Text>
                      </View>
                      <View style={styles.imgView}>
                        <Image
                          style={styles.helpCenterCallImage}
                          source={Images.Call}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setisSelectedd(!isSelectedd), helpCenterFaqs();
                    }}
                    style={[
                      styles.contactUsTouchableOpcacity,
                      { marginTop: 10 },
                    ]}
                  >
                    <View style={[styles.connectView]}>
                      <Text style={[styles.headerText, { left: 10 }]}>
                        {"FAQ's"}
                      </Text>
                      <Image
                        style={styles.helpCenterDownImage}
                        source={isSelectedd ? Images.dropdown : Images.Upword}
                      />
                    </View>
                  </TouchableOpacity>
                  {isSelectedd ? (
                    <View style={styles.helpCenterFaqView}>
                      <View>
                        {faq.map((item) => {
                          return (
                            <View key={item}>
                              <TouchableOpacity
                                style={styles.anss}
                                onPress={() => onPressExtend(item)}
                              >
                                <View style={styles.textinputView}>
                                  <Text style={styles.quesText}>
                                    {/* @ts-ignore */}
                                    {item.question}
                                  </Text>
                                </View>
                                <View style={styles.imgView}>
                                  <Image
                                    style={styles.helpCenterFaqDownImage1}
                                    source={
                                      // @ts-ignore
                                      item.isExpend
                                        ? Images.dropdown
                                        : Images.Upword
                                    }
                                  />
                                </View>
                              </TouchableOpacity>
                              {/* @ts-ignore */}
                              {item.isExpend ? (
                                //  @ts-ignore
                                <View style={styles.textinputView1}>
                                  <Text style={styles.quesText}>
                                    {/* @ts-ignore */}
                                    {item.answer}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <NavHeader business="Dashboard" centerComponent isRightAction={true} />
      <ScrollView>
        <View style={styles.firstContainer}>
          <View style={styles.firstcardContainer}>
            <View style={styles.firstcardmainView}>
              <FlatList
                style={{ marginLeft: 10, marginTop: 10 }}
                extraData={birth}
                horizontal
                data={birth}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                  const { name, isSelected } = item;
                  return (
                    <TouchableOpacity
                      onPress={() => selectActionTab(item)}
                    >
                      <View
                        style={[
                          styles.headingmainview,
                          {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.card1headingtext,
                            {
                              color: isSelected ? "#FFFFFF" : "#626362",
                            },
                          ]}
                        >
                          {name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={styles.secondcardmainView}>
              {tabButton(recyclecdSiteOperatorCollected, recyclecdSiteOperatorProduct, recyclecdSiteOperatorProcessed)}
            </View>
          </View>
        </View>
        <View>{tabButtonSwitches2()}</View>
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <Text style={styles.processedwasteText}>Material Summary</Text>
            </View>
            <View style={styles.thirdcardFirstTwoView1}>
              <View style={styles.materialSummaryView}>
                <Text style={styles.materialSummaryText}>
                  Collected Material
                </Text>
                {/* @ts-ignore */}
                <Text style={styles.materialSummaryText1}>
                  {/* @ts-ignore */}
                  {materialCollected && materialCollected.wasteCollected} MT
                </Text>
              </View>

              <View style={styles.materialSummaryView1}>
                <Text style={styles.materialSummaryText}>
                  Processed Material
                </Text>
                {/* @ts-ignore */}
                <Text style={styles.materialSummaryText1}>
                  {/* @ts-ignore */}
                  {materialProcessed && materialProcessed.wasteProcessed} MT
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <Text style={styles.processedwasteText}>Processed Summary</Text>
            </View>
            {processedSummaryCatalogue.length > 0 ? (
              <View style={styles.mainreturnview3}>
                <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor="red"
                  paginationDefaultColor="grey"
                  showPagination={true}
                  paginationStyle={styles.paginationStyle}
                  paginationStyleItem={styles.paginationStyleItem}
                  data={processedArray}
                  // @ts-ignore
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => {
                    return (
                      <>
                        {item[0]?.title && (
                          <View style={styles.processedSummaryView}>
                            <Text style={[styles.processedSummaryText12]}>
                              {item[0]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.processedSummaryText1}>
                              {item[0]?.value} MT
                            </Text>
                          </View>
                        )}
                        {item[1]?.title ? (
                          <View style={styles.processedSummaryView1}>
                            <Text style={styles.processedSummaryText}>
                              {item[1]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.processedSummaryText1}>
                              {item[1]?.value} MT
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.processedSummaryView3}></View>
                        )}
                        {item[2]?.title ? (
                          <View style={styles.processedSummaryView4}>
                            <Text style={styles.processedSummaryText}>
                              {item[2]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.processedSummaryText1}>
                              {item[2]?.value} MT
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.processedSummaryView3}></View>
                        )}
                      </>
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.detailsNotFoundViewProcessed}>
                <Text style={styles.detailsNotFoundTextChart}>
                  {"Data Is Not Found."}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={[styles.ThirdContainer, { marginTop: 30, marginBottom: 40 }]}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <Text style={styles.processedwasteText}>Product Summary</Text>
            </View>
            {productSummaryCatalogue.length > 0 ? (
              <View style={styles.mainreturnview3}>
                <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor="red"
                  paginationDefaultColor="grey"
                  showPagination={true}
                  paginationStyle={styles.paginationStyle}
                  paginationStyleItem={styles.paginationStyleItem}
                  data={productArray}
                  // @ts-ignore
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => {
                    return (
                      <>
                        {item[0]?.title && (
                          <View style={styles.processedSummaryView}>
                            <Text style={[styles.processedSummaryText12]}>
                              {item[0]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.processedSummaryText1}>
                              {item[0]?.value} MT
                            </Text>
                          </View>
                        )}
                        {item[1]?.title ? (
                          <View style={styles.processedSummaryView1}>
                            <Text style={styles.processedSummaryText}>
                              {item[1]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.processedSummaryText1}>
                              {item[1]?.value} MT
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.processedSummaryView3}></View>
                        )}
                        {item[2]?.title ? (
                          <View style={styles.processedSummaryView2}>
                            <Text style={styles.processedSummaryText}>
                              {item[2]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.processedSummaryText1}>
                              {item[2]?.value} MT
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.processedSummaryView3}></View>
                        )}
                      </>
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.detailsNotFoundViewProcessed}>
                <Text style={styles.detailsNotFoundTextChart}>
                  {"Data Is Not Found."}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <Footer />
      </View>
      {calendarModal()}
      {calenderModal1()}
      {/* {reminderModal()} */}
      {client4()}
      {client5()}
    </View>
  );
};

export default withConnect(DashboardPdUser);

const styles = StyleSheet.create({
  yearView4: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  yearView3: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  yearView2: {
    height: height / 15,
    width: width / 2,
  },
  yearView1: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  flatlistdetail4: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  flatlistdetail3: {
    fontSize: height / 74,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  flatlistdetail2: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  flatlistdetail1: {
    fontSize: height / 74,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  monthSubmit: {
    color: "white",
    fontSize: 14,
  },
  monthdataView4: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  monthdataView3: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  monthdataView2: {
    height: height / 15,
    width: width / 2,
  },
  monthdataView1: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  datedataView5: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  datedataView4: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  datedataText2: {
    color: "#606060",
    fontSize: 15,
    top: 16,
    marginHorizontal: METRICS.MAR_20,
  },
  datedataView3: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datedataText1: {
    color: "#606060",
    fontSize: 15,
    top: 16,
    marginHorizontal: METRICS.MAR_20,
  },
  datedataView2: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datedataView1: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  img3: {
    height: 33,
    width: 33,
    marginLeft: 30,
  },
  yeardropNew3: {
    height: height / 21,
    width: width / 5,
    justifyContent: "center",
    alignItems: "flex-start",
    right: -11,
  },
  img2: {
    height: 33,
    width: 33,
    marginRight: 20,
  },
  yeardropNew2: {
    height: height / 21,
    width: width / 5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  img: {
    height: 33,
    width: 33,
    marginLeft: 25,
  },
  yeardropNew1: {
    height: height / 21,
    width: width / 5.5,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistNew3: {
    fontSize: height / 87,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  flatlistNew2: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  flatlistNew1: {
    fontSize: height / 78,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  centeredView: {
    height: height / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000070",
  },
  modalView: {
    height: height / 3,
    width: width / 1.14,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    fontSize: FONT_SIZES.H1,
    color: COLORS.WHITE,
    textAlign: "center",
  },
  inputBox: {
    height: 50,
    backgroundColor: "white",
    // @ts-ignore
    paddingHorizontal: METRICS.MARGIN,
    // @ts-ignore
    marginVertical: METRICS.PADDING_COMMON,
  },
  firstContainer: {
    height: height / 2.5,
    width: width / 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  firstcardContainer: {
    height: height / 2.8,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    width: width / 1.06,
  },
  firstcardmainView: {
    height: height / 14,
    flexDirection: "row",
    width: width / 1.25,
  },
  secondcardmainView: {
    height: height / 3.8,
    width: width / 1.06,
  },
  firstoneView: {
    height: height / 13,
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  firsttwoView: {
    height: height / 13,
    width: width / 3.5,
    justifyContent: "center",
    alignItems: "center",
  },
  firstthreeView: {
    height: height / 13,
    width: width / 3.36,
    justifyContent: "center",
    alignItems: "center",
  },
  secondButtonView: {
    height: height / 25,
    width: width / 4.77,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  thirdButtonView: {
    height: height / 25,
    width: width / 4.77,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  collectionText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  processingText: {
    fontSize: 13,
    color: "#626362",
    fontWeight: "600",
  },
  distributionText: {
    fontSize: 13,
    color: "#626362",
    fontWeight: "600",
  },
  SecondContainer: {
    height: height / 1.9,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondcardContainer: {
    height: height / 2.5,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 1,
    width: width / 1.06,
    borderRadius: 10,
  },
  SecondContainer1: {
    height: height / 2.3,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondcardContainer1: {
    height: height / 2.5,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    width: width / 1.06,
    borderRadius: 10,
  },
  SecondfirstcardmainView: {
    height: height / 16,
    width: width / 1.12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondTwocardmainView: {
    height: height / 4,
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  secondThreecardmaibView: {
    height: height / 15,
    width: width / 1.12,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdContainer: {
    height: height / 3.9,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdcardContainer: {
    height: height / 4.5,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
  },
  thirdcardFirstOneView: {
    height: height / 24,
    width: width / 1.13,
    marginLeft: 10,
    marginTop: 10,
  },
  thirdcardFirstTwoView: {
    height: height / 3.5,
    width: width / 1.06,
    alignItems: "center",
  },
  headingmainview: {
    height: height / 25,
    width: width / 4.2,
    borderRadius: 20,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  card1headingtext: {
    fontSize: 12,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  collectiontrendview: {
    height: height / 16,
    justifyContent: "center",
    alignItems: "center",
  },
  collectionTrendtext: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E41F45",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    marginLeft: 10,
  },
  yeardropdownview: {
    height: height / 16,
    width: width / 2.07,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  yeardropdownview1: {
    height: height / 16,
    width: width / 2.07,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 30,
  },
  weightinmeticview: {
    height: height / 20,
    width: width / 2.5,
    backgroundColor: "#FFF0F1",
    borderRadius: 20,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  weightmeticText: {
    fontSize: 12,
    color: "#2D2D2D",
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  processedwasteText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#DA0D14",
  },
  flatlistmainview: {
    width: width / 2.3,
    margin: 5,
    alignItems: "center",
    height: height / 8,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginLeft: 8,
  },
  flatlistmainview1: {
    width: width / 3.4,
    margin: 2,
    alignItems: "center",
    height: height / 9,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginLeft: 5,
  },
  flatlistdetailsview: {
    height: height / 30,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistvalueview: {
    height: height / 30,
    width: width / 4.5,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: height / 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFF0F1",
    borderRadius: METRICS.MAR_5,
    paddingHorizontal: METRICS.MAR_10,
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    fontSize: 17,
    color: COLORS.BLACK,
    width: width / 4,
    alignSelf: "flex-end",
  },
  input: {
    height: height / 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#A6A2A1",
    borderRadius: 5,
    width: "100%",
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 15,
    top: 10,
    color: "#606060",
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "#fff",
    marginVertical: 2,
  },
  confirmButton: {
    borderWidth: 0.3,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: width / 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  anss: {
    marginTop: 15,
    backgroundColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
  },
  active: {
    backgroundColor: "#F8F8F8",
    marginLeft: -20,
    paddingLeft: 50,
  },
  inactive: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    marginLeft: -20,
    paddingLeft: 50,
    borderColor: "#A6A6A6",
  },
  inactivee: {
    backgroundColor: "#F8F8F8",
  },
  activee: {
    backgroundColor: "#DEFDFB",
    borderBottomWidth: 1,
    borderColor: "#A6A6A6",
    marginHorizontal: 1,
  },
  headerText: {
    color: "#606060",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  firstView: {
    height: height / 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  secondView: {
    flex: 0.8,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  centeredView1: {
    height: height / 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView1: {
    height: height / 1,
    top: height * 0.16,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  modalHistoryView1: {
    height: height / 1.15,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  connectView: {
    height: height / 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textinputView: {
    width: width / 1.2,
    alignItems: "flex-start",
  },
  imgView: {
    height: height / 25,
    width: width / 9.2,
    justifyContent: "center",
    alignItems: "center",
    left: 25,
  },
  quesText: {
    color: "#606060",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  ansss: {
    marginTop: 15,
    height: height / 17,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
  },
  secureInput: {
    color: "#000000",
    fontSize: 16,
    marginLeft: 10,
  },
  ans: {
    height: height / 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#a8d5e5",
  },
  headerText1: {
    color: "#606060",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: -15,
  },
  calenderview: {
    height: height / 15,
    width: width / 1.16,
    flexDirection: "row",
  },
  calenderview1: {
    height: height / 15,
    width: width / 1.4,
  },
  calenderflatlist: {
    padding: 5,
    marginLeft: 8,
    marginTop: 5,
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
  },
  calenderflatlistview: {
    height: height / 28,
    width: width / 6.5,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  calenderflatlistview12: {
    height: height / 28,
    width: width / 6,
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  calenderflatlistview1: {
    height: height / 15,
    width: width / 9,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
  },
  calenderflatlistview2: {
    height: height / 31,
    width: width / 14,
    backgroundColor: "#F8F8F8",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  calenderflatlistview2image: {
    height: 13,
    width: 13,
    tintColor: "#828282",
  },
  calenderflatlistview3: {
    height: height / 15,
    width: width / 2.32,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  calenderflatlistview4: {
    height: height / 25,
    width: width / 7,
    top: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#DA0D14",
  },
  calenderflatlistview5: {
    height: height / 15,
    width: width / 2.32,
    justifyContent: "center",
  },
  calenderflatlistview6: {
    height: height / 25,
    width: width / 7,
    top: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 0.8,
    borderColor: "#DA0D14",
  },
  calenderflatlistview7: {
    height: height / 7,
    width: width / 1.16,
  },
  card1headingtext1: {
    fontSize: 13,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  dateview: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  datesecondview: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datethirdview: {
    color: "#606060",
    top: 16,
    fontSize: 15,
    marginHorizontal: METRICS.MAR_20,
  },
  datesubmitview: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  datesubmitsecondview: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  datesubmittext: {
    color: "white",
    fontSize: 14,
  },
  monthview: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  monthsecondview: {
    height: height / 15,
    width: width / 2,
  },
  historyView: {
    flexDirection: "row",
  },
  historybackImage: {
    marginLeft: 30,
    marginTop: 25,
  },
  historyText: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    marginTop: 22,
    marginLeft: 20,
  },
  historyDownloadImage: {
    height: 18,
    width: 20,
    marginRight: 30,
    marginLeft: 10,
    tintColor: "black",
  },
  client4image: {
    height: 24,
    width: 24,
    marginLeft: 274,
  },
  helpCenterBackImage: {
    marginLeft: 30,
    marginTop: 25,
  },
  helpCenterDownImage: {
    tintColor: "black",
    marginRight: 8,
  },
  helpCenterView: {
    marginLeft: 60,
    marginTop: 10,
  },
  helpCenterView1: {
    height: height / 7,
  },
  helpCenterCallImage: {
    height: 13,
    width: 10,
    marginLeft: -75,
  },
  helpCenterFaqDownImage: {
    height: 10,
    tintColor: "black",
    marginRight: 18,
  },
  helpCenterFaqDownImage1: {
    height: 10,
    tintColor: "black",
    marginLeft: -79,
  },
  helpCenterFaqView: {
    marginBottom: 30,
  },
  contactUsTouchableOpcacity: {
    borderRadius: 10,
  },
  titlecontainer: {
    height: height / 17,
    width: width / 1.16,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  view2: {
    width: width / 1,
    height: height / 17,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  dataText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
  },
  view1: {
    height: height / 17,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },

  tabButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainerprocessed: {
    height: height / 17,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  titleView: {
    height: height / 17,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
    textAlign: "center",
  },
  mainreturnview3: {
    height: height / 8,
    width: width / 1.102,
    justifyContent: "center",
    alignSelf: "center",
  },
  paginationStyle: {
    top: Platform.OS === 'ios'?150: 140,
  },
  paginationStyleItem: {
    width: 8,
    height: 8,
    marginLeft: -4,
  },
  processedSummaryView: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    marginRight: 5,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryView1: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#D0BDE7",
    marginRight: 5,
    borderWidth: 2,
    backgroundColor: "#F1E5FF",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryView2: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#BEDEEA",
    borderWidth: 2,
    marginRight: 5,
    backgroundColor: "#E5F8FF",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryView4: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#BEDEEA",
    borderWidth: 2,
    backgroundColor: "#E5F8FF",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryView3: {
    height: height / 9,
    width: width / 3.4,
    alignItems: "center",
  },
  processedSummaryText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    textAlign: "center",
    marginTop: 17,
    color: "#2D2D2D",
    fontWeight: "600",
  },
  processedSummaryText12: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    textAlign: "center",
    marginTop: 15,
    color: "#2D2D2D",
    fontWeight: "600",
  },
  processedSummaryText1: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    fontWeight: "700",
    marginTop: 5,
  },
  detailsNotFoundViewProcessed: {
    height: height / 8,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsNotFoundTextChart: {
    textAlign: "center",
    fontSize: 18,
    color: "#2D2D2D",
  },
  materialSummaryView: {
    height: height / 7,
    width: width / 2.5,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  materialSummaryView1: {
    height: height / 7,
    width: width / 2.5,
    borderColor: "#D0BDE7",
    borderWidth: 2,
    backgroundColor: "#F1E5FF",
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  materialSummaryText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    marginTop: 30,
    color: "#2D2D2D",
    fontWeight: "600",
  },
  materialSummaryText1: {
    fontSize: height / 65,
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    fontWeight: "700",
    color: "#2D2D2D",
    marginTop: 10,
  },
  thirdcardFirstTwoView1: {
    height: height / 7,
    justifyContent: "center",
    paddingVertical: 30,
    flexDirection: "row",
  },
  detailsNotFoundViewChart: {
    height: height / 4.3,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHistory: {
    backgroundColor: "#fff",
  },
  segregationTitleText: {
    textAlign: "center",
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: "center",
    marginRight: 20,
  },
  historyHeaderComponent: {
    marginTop: 7,
    tintColor: "black",
  },
  tabButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  listView1: {
    height: height / 21,
    width: width / 1.16,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    paddingHorizontal: 5,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  listView2: {
    flex: 0.8,
    justifyContent: "center",
  },
  listView3: {
    flex: 0.7,
    marginLeft: -6,
    justifyContent: "center",
  },
  viewJustifyContent: {
    justifyContent: "center",
  },
  listText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#606060",
  },
  reminderModalView: {
    left: 20,
    width: width / 1.1,
    height: height / 1.23,
    justifyContent: "flex-end",
  },
  reminderModalView1: {
    height: height / 1.35,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reminderButtonMainView: {
    flex: 1,
    top:Platform.OS === 'ios' ?75:49,
    justifyContent: "center",
    alignSelf: "center",
  },
  reminderButtonTextView: {
    height: height / 22,
    width: width / 5,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  reminderButtonText: {
    color: "white",
    fontSize: 20,
  },
  reminderMainView: {
    backgroundColor: '#00000070',
    flex: 1,
  },
  reminderTextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInputText: {
    fontSize: 18,
    color: 'black',
    marginTop: 30,
  },
  reminderDateText: {
    fontSize: 18,
    top: 5,
    color: 'black',
  },
});
