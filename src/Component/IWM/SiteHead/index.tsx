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
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
} from "react-native";
import withConnect from "./withConnect";
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  METRICS,
} from "../../../Configration";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
} from "victory-native";
// import Toast from 'react-native-simple-toast';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ModalHeader from "../../../ReuableComponent/ModalHeader";
import NavHeader from "../../../ReuableComponent/NavHeader";
import { Images } from "../../../Assets";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../Network';
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import MonthPicker from "react-native-month-picker";
import Swiper from "react-native-swiper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const Dashboard = (props: any) => {
  const { route, user } = props;
  const { params } = route;
  const [date, setDate] = useState<any>();
  const [date1, setDate1] = useState<any>();
  const [date3, setDate3] = useState<any>();
  const [date4, setDate4] = useState<any>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [isOpen, toggleOpen] = useState(false);
  const [value1, setValue1] = useState<any>();
  const [isOpen1, toggleOpen1] = useState(false);
  const [value2, setValue2] = useState<any>();
  const [isOpen2, toggleOpen2] = useState(false);
  const [value3, setValue3] = useState<any>();
  const [isOpen3, toggleOpen3] = useState(false);
  const [isOpen4, toggleOpen4] = useState(false);
  const [isOpen5, toggleOpen5] = useState(false);
  const [isOpen6, toggleOpen6] = useState(false);
  const [isOpen7, toggleOpen7] = useState(false);
  const [value4, setValue4] = useState<any>();
  const [value5, setValue5] = useState<any>();
  const [value6, setValue6] = useState<any>();
  const [value7, setValue7] = useState<any>();
  const [value8, setValue8] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isSelected1, setSelected1] = useState("away");
  const [isSelected3, setSelected3] = useState("away");
  const [filter1, setFilter1] = useState("Date");
  const [filter2, setFilter2] = useState("Date");
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refresh1, setRefresh1] = useState(false);
  const city = user.siteName[0].siteName;
  const [WastedCollected, setWastedCollected] = useState([]);
  const [CatalogueIwm, setCatalogueIwm] = useState([]);
  const [WastedProcessed, setWastedProcessed] = useState([]);
  const [recyclabletrend, setRecyclableTrend] = useState([]);
  const [wtetrendvalue, setWTEtrendvalue] = useState([]);
  const [historyValue, setHistoryValue] = useState([]);
  const [datetype, setDateType] = useState();
  const [datetype1, setDateType1] = useState();
  const [datarefresh, setDataRefresh] = useState(3);
  const [datarefresh1, setDataRefresh1] = useState(3);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [datarefresh4, setDataRefresh4] = useState(3);
  const [datarefresh5, setDataRefresh5] = useState(3);
  const [collectiontrend, setCollectionTrend] = useState([]);
  const [sortingtrend, setSortingTrend] = useState([]);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelectedd, setisSelectedd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [touch, setTouch] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [faq, setFaq] = useState([]);
  const [date5, setDate5] = useState<any>();
  const [date6, setDate6] = useState<any>();
  const [date7, setDate7] = useState<any>();
  const [date8, setDate8] = useState<any>();
  const [date9, setDate9] = useState<any>();
  const [date10, setDate10] = useState<any>();
  const [datetype2, setDateType2] = useState();
  const [datetype3, setDateType3] = useState();
  const [datetype4, setDateType4] = useState();
  const [refresh2, setRefresh2] = useState(false);
  const [refresh3, setRefresh3] = useState(false);
  const [refresh4, setRefresh4] = useState(false);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [isDatePickerVisible5, setDatePickerVisibility5] = useState(false);
  const [isDatePickerVisible6, setDatePickerVisibility6] = useState(false);
  const [isDatePickerVisible7, setDatePickerVisibility7] = useState(false);
  const [isDatePickerVisible8, setDatePickerVisibility8] = useState(false);
  const [isDatePickerVisible9, setDatePickerVisibility9] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [filter3, setFilter3] = useState("Date");
  const [filter4, setFilter4] = useState("Date");
  const [filter5, setFilter5] = useState("Date");
  const [isSelected4, setSelected4] = useState("away");
  const [isSelected5, setSelected5] = useState("away");
  const [isSelected6, setSelected6] = useState("away");
  const [value9, setValue9] = useState<any>();
  const [value10, setValue10] = useState<any>();
  const [value11, setValue11] = useState<any>();
  const [value12, setValue12] = useState<any>();
  const [isOpen8, toggleOpen8] = useState(false);
  const [isOpen9, toggleOpen9] = useState(false);
  const [isOpen10, toggleOpen10] = useState(false);
  const [isOpen11, toggleOpen11] = useState(false);
  const [collectedLeftMenuValue, setCollectedLeftMenuValue] = useState([]);
  const [analysisLeftMenuValue, setAnalysisLeftMenuValue] = useState([]);
  const [leftOverStockLeftMenuValue, setLeftOverStockLeftMenuValue] = useState([]);
  const [recyclablesCollection, setRecyclablesCollection] = useState([]);
  const [recyclablesAnalysis, setRecyclablesAnalysis] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [array, setArray] = useState([]);
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true;
    setTouch(!touch);
  };
  // **********************Max data For Charts**********************************
  // @ts-ignore
  const maxdata = Math.max(...collectiontrend.map(o => o.quantity));
  // @ts-ignore
  const maxdata1 = Math.max(...sortingtrend.map(o => o.disposalTotalWaste));
  // @ts-ignore
  const maxdata2 = Math.max(...recyclabletrend.map(o => o.stockTotalWaste));
  // @ts-ignore
  const maxdata3 = Math.max(...wtetrendvalue.map(o => o.y));
  // @ts-ignore
  const maxdata4 = Math.max(...recyclablesCollection.map(o => o.quantity));
  // @ts-ignore
  const maxdata5 = Math.max(...recyclablesAnalysis.map(o => o.quantity));
  // *************************************Use Effect**********************************
  // *************************************Use Effect For Max Data For Chart For Trend***********
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
    if (maxdata1 >= 1000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 10) {
      setDataRefresh1(10);
    } else if (maxdata1 <= 50) {
      setDataRefresh1(50);
    } else if (maxdata1 >= 100) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 10000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 1500) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 2000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 3000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 4000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 5000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 6000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 7000) {
      setDataRefresh1(100);
    } else if (maxdata1 <= 8000) {
      setDataRefresh1(100);
    }
  }, [maxdata1]);
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
    if (maxdata4 >= 1000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 10) {
      setDataRefresh4(10);
    } else if (maxdata4 <= 50) {
      setDataRefresh4(50);
    } else if (maxdata4 >= 100) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 10000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 1500) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 2000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 3000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 4000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 5000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 6000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 7000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 8000) {
      setDataRefresh4(100);
    }
  }, [maxdata4]);
  useEffect(() => {
    if (maxdata5 >= 1000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 10) {
      setDataRefresh5(10);
    } else if (maxdata5 <= 50) {
      setDataRefresh5(50);
    } else if (maxdata5 <= 100) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 10000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 1500) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 2000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 3000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 4000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 5000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 6000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 7000) {
      setDataRefresh5(100);
    } else if (maxdata5 <= 8000) {
      setDataRefresh5(100);
    }
  }, [maxdata5]);
  // *************************************Use Effect For All API Calender*********
  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        wasteSummaryApi(date, date1, "date");
        collectionTrendApi(date, date1, "date");
        disposalTrendApi(date, date1, "date");
        leftOverStockTrendApi(date, date1, "date");
        iwmTrendApi(date, date1, "date");
        recyclablesIncomingWasteApi(date, date1, "date");
        recyclablesAnalysisWasteApi(date, date1, "date");
        iwmSummary(date, date1, "date");
      } else if (datetype == "Month") {
        wasteSummaryApi(value1, value2, "month");
        collectionTrendApi(value1, value2, "month");
        disposalTrendApi(value1, value2, "month");
        leftOverStockTrendApi(value1, value2, "month");
        iwmTrendApi(value1, value2, "month");
        recyclablesIncomingWasteApi(value1, value2, "month");
        recyclablesAnalysisWasteApi(value1, value2, "month");
        iwmSummary(value1, value2, "month");
      } else if (datetype == "Year") {
        wasteSummaryApi(value3, value4, "year");
        collectionTrendApi(value3, value4, "year");
        disposalTrendApi(value3, value4, "year");
        leftOverStockTrendApi(value3, value4, "year");
        iwmTrendApi(value3, value4, "year");
        recyclablesIncomingWasteApi(value3, value4, "year");
        recyclablesAnalysisWasteApi(value3, value4, "year");
        iwmSummary(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);
  // *************************************Use Effect With No Condition********************
  useEffect(() => {
    setCheck(true);
    calledApis();
    setCheck1(true);
    setCheck2(true);
    setCheck3(true);
    setCheck4(true);
  }, []);
  // *************************************Use Effect For History API Calender********************
  useEffect(() => {
    if (check1 && !refresh1) {
      if (datetype1 == "Date") {
        historyApi(date3, date4, "date");
      } else if (datetype1 == "Month") {
        historyApi(value5, value6, "month");
      }
    }
  }, [datetype1, refresh1, check1]);
  // *************************************Use Effect For Collected API Calender********************
  useEffect(() => {
    if (check2 && !refresh2) {
      if (datetype2 == "Date") {
        collectedWasteLeftMenuApi(date5, date6, "date");
      }
      else if (datetype2 == "Month") {
        collectedWasteLeftMenuApi(value7, value8, "month");
      }
    }
  }, [datetype2, refresh2, check2]);
  // *************************************Use Effect For Disposal API Calender********************
  useEffect(() => {
    if (check3 && !refresh3) {
      if (datetype3 == "Date") {
        disposalWasteLeftMenuApi(date7, date8, "date");
      }
      else if (datetype3 == "Month") {
        disposalWasteLeftMenuApi(value9, value10, "month");
      }
    }
  }, [datetype3, refresh3, check3]);
  // *************************************Use Effect For LeftOverStock API Calender********************
  useEffect(() => {
    if (check4 && !refresh4) {
      if (datetype4 == "Date") {
        leftOverStockWasteLeftMenuApi(date9, date10, "date");
      }
      else if (datetype4 == "Month") {
        leftOverStockWasteLeftMenuApi(value11, value12, "month");
      }
    }
  }, [datetype4, refresh4, check4]);
  // *************************************Use Effect For Hamburger Menu Navigation********************
  useEffect(() => {
    if ((params?.name ?? "") == "History") {
      setShowModal(true);
      loadDefaultHistory();
    } else if ((params?.name ?? "") == "Help Center") {
      setShowModal1(true);
    } else if ((params?.name1 ?? "") == "  Collected Waste") {
      setShowModal3(true);
      loadDefaultCollectionData();
    } else if ((params?.name1 ?? "") == "  Disposal Waste") {
      setShowModal5(true);
      loadDefaultDisposalData();
    } else if ((params?.name1 ?? "") == "  LeftOver Stock") {
      setShowModal6(true);
      loadDefaultLeftOverStockData();
    }
  }, [params]);
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
  // *************************** Date Month Year Selection Method on Chart*****************
  const getDateString = (date) => {
    return moment(date, "YYYY-MM-DD HH:mm:ss:SSS Z").format(datetype == "Date" ? "DD" : datetype == "Month" ? "MMM" : datetype == "Year" ? "YYYY" : "DD");
  };
  // *************************** Waste Summary Calender Methods*****************
  const [birth1, setBirth1] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
    { name: "Year", isSelected: false },
  ]);
  const clearWasteSummaryCalender = () => {
    setDate(""), setDate1(""), setValue1(""), setValue2(""), setValue3(""), setValue4(""), setSelected1("away"),
      setBirth1([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
        { name: "Year", isSelected: false },
      ]), setFilter1("Date"), setRefresh(true);
  };
  const dataFilter = () => {
    const filterData = _.filter(birth1, (item: any) => {
      return item.isSelected;
    });
    setDateType(filterData[0].name);
    setRefresh(false);
  };
  const selectActionTab1 = (item) => {
    setFilter1(item.name);
    const _birth1 = birth1.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth1(_birth1);
    setSelected1("away");
  };
  const dateData = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected1 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker}
            >
              <Text
                style={styles.datethirdview}
              >
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
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker1}
            >
              <Text
                style={styles.datethirdview}
              >
                {date1 ? moment(date1).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="date"
                minimumDate={date || new Date()}
                maximumDate={new Date()}
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter();
            setModalVisible(!modalVisible);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected1 === "away" ? (
          <View
            style={styles.monthsecondview}
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
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value1 || new Date()}
                    onMonthChange={(date) => { setValue1(date), setRefresh(true); }}
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
          <View
            style={styles.monthsecondview}
          >
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
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value2 || new Date()}
                    minDate={value1 || new Date()}
                    // @ts-ignore
                    onMonthChange={(date) => { setValue2(moment(date).add(1, "month").subtract(1, "days")), setRefresh(true); }}
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
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter();
            setModalVisible(!modalVisible);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const yearData = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected1 === "away" ? (
          <View
            style={styles.monthsecondview}
          >
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
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value3 || new Date()}
                    onMonthChange={(date) => { setValue3(date), setRefresh(true); }}
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
          <View
            style={styles.monthsecondview}
          >
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
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value4 || new Date()}
                    minDate={value3 || new Date()}
                    // @ts-ignore
                    onMonthChange={(date) => { setValue4(moment(date).add(1, "month").subtract(1, "days")), setRefresh(true); }}
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
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter();
            setModalVisible(!modalVisible);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const handleConfirm = (date) => {
    setDate(date);
    setRefresh(true);
    hideDatePicker();
  };
  const handleConfirm1 = (date1) => {
    setDate1(date1);
    setRefresh(true);
    hideDatePicker1();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
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
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderview1}
              >
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
                          style={[styles.calenderflatlistview, {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                          }]}
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
              <View
                style={styles.calenderflatlistview1}
              >
                <TouchableOpacity
                  onPress={() => { setModalVisible(!modalVisible), clearWasteSummaryCalender(); }}
                >
                  <View
                    style={styles.calenderflatlistview2}
                  >
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderflatlistview3}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected1("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected1 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
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
              <View
                style={styles.calenderflatlistview5}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected1("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected1 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
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
            <View
              style={styles.calenderflatlistview7}
            >
              {tabButtonSwitches1()}
            </View>
          </View>
        </View>
      </Modal>
    );
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
  const dateData1 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected3 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker2}
            >
              <Text
                style={styles.datethirdview}
              >
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
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker3}
            >
              <Text
                style={styles.datethirdview}
              >
                {date4 ? moment(date4).format("DD-MMM") : "Select End Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible3}
                mode="date"
                onConfirm={handleConfirm3}
                onCancel={hideDatePicker3}
                minimumDate={date3 || new Date()}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible1(!modalVisible1);
            dataFilter1();

          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData1 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected3 === "away" ? (
          <View
            style={styles.monthsecondview}
          >

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
              onRequestClose={() => {

              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value5 || new Date()}
                    onMonthChange={(date) => { setValue5(date), setRefresh1(true); }}
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
          <View
            style={styles.monthsecondview}
          >
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
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value6 || new Date()}
                    minDate={value5 || new Date()}
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue6(moment(date).add(1, "month").subtract(1, "days")), setRefresh1(true); }}
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
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter1();
            setModalVisible1(!modalVisible1);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
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
  const clearHistoryCalender = () => {
    setDate3(""), setDate4(""), setValue5(""), setValue6(""), setSelected3("away"),
      setBirth2([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter2("Date"), setRefresh1(true);
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
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderview1}
              >
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
                          style={[styles.calenderflatlistview12, {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                            // backgroundColor:"yellow"
                          }]}
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
              <View
                style={styles.calenderflatlistview1}
              >
                <TouchableOpacity
                  onPress={() => { setModalVisible1(!modalVisible1), clearHistoryCalender(); }}
                >
                  <View
                    style={styles.calenderflatlistview2}
                  >
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderflatlistview3}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected3("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected3 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
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
              <View
                style={styles.calenderflatlistview5}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected3("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected3 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
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
            <View
              style={styles.calenderflatlistview7}
            >
              {tabButtonSwitches3()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // *************************** Collected Segregation Calender Methods*****************
  const [birth3, setBirth3] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const dataFilter2 = () => {
    const filterData = _.filter(birth3, (item: any) => {
      return item.isSelected;
    });
    setDateType2(filterData[0].name);
    setRefresh2(false);
  };
  const selectActionTab3 = (item) => {
    setFilter3(item.name);
    const _birth1 = birth3.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth3(_birth1);
    setSelected4("away");
  };
  const dateData2 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected4 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity

              onPress={showDatePicker4}
            >
              <Text
                style={styles.datethirdview}
              >
                {date5 ? moment(date5).format("DD-MMM") : "Select Start Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible4}
                mode="date"
                onConfirm={handleConfirm4}
                onCancel={hideDatePicker4}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker5}
            >
              <Text
                style={styles.datethirdview}
              >
                {date6 ? moment(date6).format("DD-MMM") : "Select End Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible5}
                mode="date"
                onConfirm={handleConfirm5}
                onCancel={hideDatePicker5}
                minimumDate={date5 || new Date()}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible2(!modalVisible2);
            dataFilter2();
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData2 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected4 === "away" ? (
          <View
            style={styles.monthsecondview}
          >
            <TouchableOpacity
              onPress={() => toggleOpen6(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value7
                  ? moment(value7).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen6}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value7 || new Date()}
                    onMonthChange={(date) => { setValue7(date), setRefresh2(true); }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value7) ? setValue7(moment().startOf("month")) : null; }
                      toggleOpen6(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View
            style={styles.monthsecondview}
          >
            <TouchableOpacity
              onPress={() => toggleOpen7(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value8
                  ? moment(value8).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen7}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value8 || new Date()}
                    minDate={value7 || new Date()}
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue8(moment(date).add(1, "month").subtract(1, "days")), setRefresh2(true); }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value8) ? setValue8(moment()) : null; }
                      toggleOpen7(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter2();
            setModalVisible2(!modalVisible2);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const collectedClearCalender = () => {
    setDate5(""), setDate6(""), setValue7(""), setValue8(""), setSelected4("away"),
      setBirth3([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter3("Date"), setRefresh2(true);
  };
  const showDatePicker4 = () => {
    setDatePickerVisibility4(true);
  };
  const showDatePicker5 = () => {
    setDatePickerVisibility5(true);
  };
  const hideDatePicker4 = () => {
    setDatePickerVisibility4(false);
  };
  const hideDatePicker5 = () => {
    setDatePickerVisibility5(false);
  };
  const handleConfirm4 = (date4) => {
    setDate5(date4);
    setRefresh2(true);
    hideDatePicker4();
  };
  const handleConfirm5 = (date5) => {
    setDate6(date5);
    setRefresh2(true);
    hideDatePicker5();
  };
  const tabButtonSwitches4 = () => {
    if (filter3 === "Date") {
      return dateData2();
    } else if (filter3 === "Month") {
      return monthData2();
    }
  };
  const calendarModal2 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderview1}
              >
                <FlatList
                  style={styles.calenderflatlist}
                  extraData={birth3}
                  horizontal
                  data={birth3}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab3(item)}>
                        <View
                          style={[styles.calenderflatlistview12, {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                            // backgroundColor:"yellow"
                          }]}
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
              <View
                style={styles.calenderflatlistview1}
              >
                <TouchableOpacity
                  onPress={() => { setModalVisible2(!modalVisible2), collectedClearCalender(); }}
                >
                  <View
                    style={styles.calenderflatlistview2}
                  >
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderflatlistview3}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected4("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected4 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected4 === "away" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      Start
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={styles.calenderflatlistview5}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected4("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected4 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected4 === "home" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      End
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.calenderflatlistview7}
            >
              {tabButtonSwitches4()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // *************************** Analysis Segregation Calender Methods*****************
  const [birth4, setBirth4] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const dataFilter3 = () => {
    const filterData = _.filter(birth4, (item: any) => {
      return item.isSelected;
    });
    setDateType3(filterData[0].name);
    setRefresh3(false);
  };
  const selectActionTab4 = (item) => {
    setFilter4(item.name);
    const _birth1 = birth4.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth4(_birth1);
    setSelected5("away");
  };
  const dateData3 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected5 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity

              onPress={showDatePicker6}
            >
              <Text
                style={styles.datethirdview}
              >
                {date7 ? moment(date7).format("DD-MMM") : "Select Start Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible6}
                mode="date"
                onConfirm={handleConfirm6}
                onCancel={hideDatePicker6}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker7}
            >
              <Text
                style={styles.datethirdview}
              >
                {date8 ? moment(date8).format("DD-MMM") : "Select End Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible7}
                mode="date"
                onConfirm={handleConfirm7}
                onCancel={hideDatePicker7}
                maximumDate={new Date()}
                minimumDate={date7 || new Date()}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible3(!modalVisible3);
            dataFilter3();

          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData3 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected5 === "away" ? (
          <View
            style={styles.monthsecondview}
          >
            <TouchableOpacity
              onPress={() => toggleOpen8(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value9
                  ? moment(value9).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen8}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value9 || new Date()}
                    onMonthChange={(date) => { setValue9(date), setRefresh3(true); }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value9) ? setValue9(moment().startOf("month")) : null; }
                      toggleOpen8(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View
            style={styles.monthsecondview}
          >
            <TouchableOpacity
              onPress={() => toggleOpen9(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value10
                  ? moment(value10).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen9}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value10 || new Date()}
                    minDate={value9 || new Date()}
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue10(moment(date).add(1, "month").subtract(1, "days")), setRefresh3(true); }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value10) ? setValue10(moment()) : null; }
                      toggleOpen9(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter3();
            setModalVisible3(!modalVisible3);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const showDatePicker6 = () => {
    setDatePickerVisibility6(true);
  };
  const analysisClearCalender = () => {
    setDate7(""), setDate8(""), setValue9(""), setValue10(""), setSelected5("away"),
      setBirth4([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter4("Date"), setRefresh3(true);
  };
  const showDatePicker7 = () => {
    setDatePickerVisibility7(true);
  };
  const hideDatePicker6 = () => {
    setDatePickerVisibility6(false);
  };
  const hideDatePicker7 = () => {
    setDatePickerVisibility7(false);
  };
  const handleConfirm6 = (date6) => {
    setDate7(date6);
    setRefresh3(true);
    hideDatePicker6();
  };
  const handleConfirm7 = (date7) => {
    setDate8(date7);
    setRefresh3(true);
    hideDatePicker7();
  };
  const tabButtonSwitches5 = () => {
    if (filter4 === "Date") {
      return dateData3();
    } else if (filter4 === "Month") {
      return monthData3();
    }
  };
  const calenderModal3 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderview1}
              >
                <FlatList
                  style={styles.calenderflatlist}
                  extraData={birth4}
                  horizontal
                  data={birth4}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab4(item)}>
                        <View
                          style={[styles.calenderflatlistview12, {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                          }]}
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
              <View
                style={styles.calenderflatlistview1}
              >
                <TouchableOpacity
                  onPress={() => { setModalVisible3(!modalVisible3), analysisClearCalender(); }}
                >
                  <View
                    style={styles.calenderflatlistview2}
                  >
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderflatlistview3}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected5("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected5 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected5 === "away" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      Start
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={styles.calenderflatlistview5}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected5("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected5 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected5 === "home" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      End
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <View
              style={styles.calenderflatlistview7}
            >
              {tabButtonSwitches5()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // *************************** LeftOverStock Segregation Calender Methods*****************
  const [birth5, setBirth5] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const leftOverStockClearCalender = () => {
    setDate9(""), setDate10(""), setValue11(""), setValue12(""), setSelected6("away"),
      setBirth5([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter5("Date"), setRefresh4(true);
  };
  const dataFilter4 = () => {
    const filterData = _.filter(birth5, (item: any) => {
      return item.isSelected;
    });
    setDateType4(filterData[0].name);
    setRefresh4(false);
  };
  const selectActionTab5 = (item) => {
    setFilter5(item.name);
    const _birth1 = birth5.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth5(_birth1);
    setSelected6("away");
  };
  const dateData4 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected6 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity

              onPress={showDatePicker8}
            >
              <Text
                style={styles.datethirdview}
              >
                {date9 ? moment(date9).format("DD-MMM") : "Select Start Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible8}
                mode="date"
                onConfirm={handleConfirm8}
                onCancel={hideDatePicker8}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker9}
            >
              <Text
                style={styles.datethirdview}
              >
                {date10 ? moment(date10).format("DD-MMM") : "Select End Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible9}
                mode="date"
                onConfirm={handleConfirm9}
                onCancel={hideDatePicker9}
                minimumDate={date9 || new Date()}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible4(!modalVisible4);
            dataFilter4();

          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData4 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected6 === "away" ? (
          <View
            style={styles.monthsecondview}
          >

            <TouchableOpacity
              onPress={() => toggleOpen10(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value11
                  ? moment(value11).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen10}
              onRequestClose={() => {

              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value11 || new Date()}
                    onMonthChange={(date) => { setValue11(date), setRefresh4(true); }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value11) ? setValue11(moment().startOf("month")) : null; }
                      toggleOpen10(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View
            style={styles.monthsecondview}
          >

            <TouchableOpacity
              onPress={() => toggleOpen11(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value12
                  ? moment(value12).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen11}
              onRequestClose={() => {

              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value12 || new Date()}
                    minDate={value11 || new Date()}
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue12(moment(date).add(1, "month").subtract(1, "days")), setRefresh4(true); }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value12) ? setValue12(moment()) : null; }
                      toggleOpen11(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}

        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            dataFilter4();
            setModalVisible4(!modalVisible4);
          }}>
            <View
              style={styles.datesubmitsecondview}
            >
              <Text style={styles.datesubmittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const showDatePicker8 = () => {
    setDatePickerVisibility8(true);
  };
  const showDatePicker9 = () => {
    setDatePickerVisibility9(true);
  };
  const hideDatePicker8 = () => {
    setDatePickerVisibility8(false);
  };
  const hideDatePicker9 = () => {
    setDatePickerVisibility9(false);
  };
  const handleConfirm8 = (date8) => {
    setDate9(date8);
    setRefresh4(true);
    hideDatePicker8();
  };
  const handleConfirm9 = (date9) => {
    setDate10(date9);
    setRefresh4(true);
    hideDatePicker9();
  };
  const tabButtonSwitches6 = () => {
    if (filter5 === "Date") {
      return dateData4();
    } else if (filter5 === "Month") {
      return monthData4();
    }
  };
  const calenderModal4 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderview1}
              >
                <FlatList
                  style={styles.calenderflatlist}
                  extraData={birth5}
                  horizontal
                  data={birth5}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab5(item)}>
                        <View
                          style={[styles.calenderflatlistview12, {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                          }]}
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
              <View
                style={styles.calenderflatlistview1}
              >
                <TouchableOpacity
                  onPress={() => { setModalVisible4(!modalVisible4), leftOverStockClearCalender(); }}
                >
                  <View
                    style={styles.calenderflatlistview2}
                  >
                    <Image
                      source={Images.vector}
                      style={styles.calenderflatlistview2image}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.calenderview}
            >
              <View
                style={styles.calenderflatlistview3}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected6("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected6 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected6 === "away" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      Start
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={styles.calenderflatlistview5}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected6("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected6 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected6 === "home" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      End
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <View
              style={styles.calenderflatlistview7}
            >
              {tabButtonSwitches6()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // ************************Default Data Methods***********************************
  const loadDefaultHistory = () => {
    historyApi(moment(new Date()).subtract(6, 'days'), moment(new Date()), "date");
  };
  const loadDefaultCollectionData = () => {
    collectedWasteLeftMenuApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
  };
  const loadDefaultDisposalData = () => {
    disposalWasteLeftMenuApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
  };
  const loadDefaultLeftOverStockData = () => {
    leftOverStockWasteLeftMenuApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
  };
  const loadDefaultCollectionTrendData = () => {
    collectionTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultDisposalTrendData = () => {
    disposalTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultLOSTrendData = () => {
    leftOverStockTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultWasteSummaryData = () => {
    wasteSummaryApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultIWMTrendData = () => {
    iwmTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultRecyclablesCollectionData = () => {
    recyclablesIncomingWasteApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultRecyclablesAnalysisData = () => {
    recyclablesAnalysisWasteApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultIwmSummary = () => {
    iwmSummary(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultCollectionDownloadData = () => {
    if (datetype2 == "Date") {
      collectedWasteLeftMenuDownloadApi(date5, date6, "date");
    } else if (datetype2 == "Month") {
      collectedWasteLeftMenuDownloadApi(value7, value8, "month");
    } else {
      collectedWasteLeftMenuDownloadApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultCollectionSharingData = () => {
    if (datetype2 == "Date") {
      collectedWasteLeftMenuSharingApi(date5, date6, "date");
    } else if (datetype2 == "Month") {
      collectedWasteLeftMenuSharingApi(value7, value8, "month");
    } else {
      collectedWasteLeftMenuSharingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultDisposalDownloadData = () => {
    if (datetype3 == "Date") {
      disposalWasteLeftMenuDownloadingApi(date7, date8, "date");
    } else if (datetype3 == "Month") {
      disposalWasteLeftMenuDownloadingApi(value9, value10, "month");
    } else {
      disposalWasteLeftMenuDownloadingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultDisposalSharingData = () => {
    if (datetype3 == "Date") {
      disposalWasteLeftMenuSharingApi(date7, date8, "date");
    } else if (datetype3 == "Month") {
      disposalWasteLeftMenuSharingApi(value9, value10, "month");
    } else {
      disposalWasteLeftMenuSharingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultLosDownloadData = () => {
    if (datetype4 == "Date") {
      leftOverStockWasteLeftMenuDownloadingApi(date9, date10, "date");
    } else if (datetype4 == "Month") {
      leftOverStockWasteLeftMenuDownloadingApi(value11, value12, "month");
    } else {
      leftOverStockWasteLeftMenuDownloadingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultLosSharingData = () => {
    if (datetype4 == "Date") {
      leftOverStockWasteLeftMenuSharingApi(date9, date10, "date");
    } else if (datetype4 == "Month") {
      leftOverStockWasteLeftMenuSharingApi(value11, value12, "month");
    } else {
      leftOverStockWasteLeftMenuSharingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultHistoryDownloadData = () => {
    if (datetype1 == "Date") {
      historyDownloadApi(date3, date4, "date");
    } else if (datetype1 == "Month") {
      historyDownloadApi(value5, value6, "month");
    } else {
      historyDownloadApi(moment(new Date()).subtract(6, 'days'), moment(new Date()), "date");
    }
  };
  // ************************Calling Api Method***********************************
  const calledApis = async () => {
    await loadDefaultWasteSummaryData();
    await loadDefaultCollectionTrendData();
    await loadDefaultDisposalTrendData();
    await loadDefaultLOSTrendData();
    await loadDefaultIWMTrendData();
    await loadDefaultRecyclablesCollectionData();
    await loadDefaultRecyclablesAnalysisData();
    await loadDefaultIwmSummary();
  };
  // ***********************API Methods******************
  // ***********************IWM Summary Or Product Catalogue API Methods******************
  // eslint-disable-next-line no-unused-vars
  const iwmSummary = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().IWMproductcatalogue(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().IWMproductcatalogue(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore

      const collectediwm = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(collectediwm).map(([key, value]) => {
        return {
          title: key,
          value: value,
        };
      }).filter(item => item.value !== 0);
      // @ts-ignore
      setCatalogueIwm(catalogue);
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
      setArray(array2);
    }
    else {
      setCatalogueIwm([]);
    }
  };
  // ***********************Waste Summary API Methods******************
  // eslint-disable-next-line no-unused-vars
  const wasteSummaryApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmsiteheadpostsummary(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmsiteheadpostsummary(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      setWastedCollected(result.data.data[0]);
      // @ts-ignore
      setWastedProcessed(result.data.data[0]);
    }
    else {
      setWastedCollected([]);
      setWastedProcessed([]);
    }
  };
  // ***********************Collection Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectionTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmsiteheadcollectiontrend(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmsiteheadcollectiontrend(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        const format = datetype == "Date" ? "YYYY-MM-DD" : datetype == "Month" ? "YYYY-MM" : datetype == "Year" ? "YYYY" : "YYYY-MM-DD";
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format));
          var quantity = 0;
          filterDateArr.forEach(item => {
            quantity = quantity + item.quantity ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, quantity });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setCollectionTrend(sortedData);
    }
    else {
      setCollectionTrend([]);
    }
  };
  // ***********************Disposal Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const disposalTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmsiteheadanalysistrend(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmsiteheadanalysistrend(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        const format = datetype == "Date" ? "YYYY-MM-DD" : datetype == "Month" ? "YYYY-MM" : datetype == "Year" ? "YYYY" : "YYYY-MM-DD";
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format));
          var disposalTotalWaste = 0;
          filterDateArr.forEach(item => {
            disposalTotalWaste = disposalTotalWaste + item.disposalTotalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, disposalTotalWaste});
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setSortingTrend(sortedData);
    }
    else {
      setSortingTrend([]);
    }
  };
  // ***********************LeftOverStock Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const leftOverStockTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmsiteheadleftoverstocktrend(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmsiteheadleftoverstocktrend(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        const format = datetype == "Date" ? "YYYY-MM-DD" : datetype == "Month" ? "YYYY-MM" : datetype == "Year" ? "YYYY" : "YYYY-MM-DD";
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format));
          var stockTotalWaste = 0;
          filterDateArr.forEach(item => {
            stockTotalWaste = stockTotalWaste + item.stockTotalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, stockTotalWaste });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setRecyclableTrend(sortedData);
    }
    else {
      setRecyclableTrend([]);
    }
  };
  // ***********************IWM Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const iwmTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmtrend(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmtrend(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const Wtevalue = result?.data?.data ?? [];
      if (Wtevalue.length > 0) {
        const wtebargraphvalue = Object.entries(Wtevalue[0]).map(([key, value]) => {
          if (value === 0) {
            return null;
          }
          return {
            x: key.replace("total", "").toUpperCase(),
            y: value,
          };
        }).filter(items => items !== null);
        // @ts-ignore
        setWTEtrendvalue(wtebargraphvalue);
      }
    }
    else {
      setWTEtrendvalue([]);
    }
  };
  // ***********************History API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay = (moment(date3).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date4).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmsitehistory(payload);
 const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmsitehistory(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setHistoryValue(arr);
      }
    }
    else {
      setHistoryValue([]);
    }
  };
  // ***********************History Download API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyDownloadApi = async (date3, date4, date2) => {
    var previousDay = (moment(date3).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date4).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmsitehistory(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmsitehistory(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Quantity": d?.quantity,
            "Disposal Total Waste": d?.disposalTotalWaste,
            "Disposal DLF": d?.disposalDlf,
            "Disposal LAT": d?.disposalLat,
            "Disposal Incineration": d?.disposalIncineration,
            "Disposal Afrf": d?.disposalAfrf,
            "Stock Total Waste": d?.stockTotalWaste,
            "Stock DLF": d?.stockDlf,
            "Stock LAT": d?.stockLat,
            "Stock Incineration": d?.stockIncineration,
            "Stock Afrf": d?.stockAfrf,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        historyPermissionDownload(printArr);
      }
    }
  };
  // ***********************LeftMenu Segregation API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuApi = async (date5, date6, date2) => {
    var previousDay = (moment(date5).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date6).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadCollection(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadCollection(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setCollectedLeftMenuValue(arr);
      }
    }
    else {
      setCollectedLeftMenuValue([]);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const disposalWasteLeftMenuApi = async (date7, date8, date2) => {
    var previousDay = (moment(date7).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date8).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadAnalysis(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadAnalysis(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setAnalysisLeftMenuValue(arr);
      }
    }
    else {
      setAnalysisLeftMenuValue([]);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const leftOverStockWasteLeftMenuApi = async (date9, date10, date2) => {
    var previousDay = (moment(date9).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date10).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadLeftOverStock(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadLeftOverStock(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setLeftOverStockLeftMenuValue(arr);
      }
    }
    else {
      setLeftOverStockLeftMenuValue([]);
    }
  };
  // ***********************LeftMenu Segregation Download API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuDownloadApi = async (date5, date6, date2) => {
    var previousDay = (moment(date5).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date6).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadCollection(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadCollection(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Quantity": d?.quantity,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuCollectionPermissionDownload(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const disposalWasteLeftMenuDownloadingApi = async (date7, date8, date2) => {
    var previousDay = (moment(date7).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date8).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadAnalysis(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadAnalysis(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Disposal Total Waste": d?.disposalTotalWaste,
            "Disposal DLF": d?.disposalDlf,
            "Disposal LAT": d?.disposalLat,
            "Disposal Incineration": d?.disposalIncineration,
            "Disposal Afrf": d?.disposalAfrf,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuDisposalPermissionDownload(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const leftOverStockWasteLeftMenuDownloadingApi = async (date9, date10, date2) => {
    var previousDay = (moment(date9).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date10).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadLeftOverStock(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadLeftOverStock(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Stock Total Waste": d?.stockTotalWaste,
            "Stock DLF": d?.stockDlf,
            "Stock LAT": d?.stockLat,
            "Stock Incineration": d?.stockIncineration,
            "Stock Afrf": d?.stockAfrf,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuLOSPermissionDownload(printArr);
      }
    }
  };
  // ***********************LeftMenu SegregationSharing API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuSharingApi = async (date5, date6, date2) => {
    var previousDay = (moment(date5).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date6).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadCollection(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadCollection(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Quantity": d?.quantity,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuCollectionPermissionSharing(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const disposalWasteLeftMenuSharingApi = async (date7, date8, date2) => {
    var previousDay = (moment(date7).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date8).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadAnalysis(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadAnalysis(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Disposal Total Waste": d?.disposalTotalWaste,
            "Disposal DLF": d?.disposalDlf,
            "Disposal LAT": d?.disposalLat,
            "Disposal Incineration": d?.disposalIncineration,
            "Disposal Afrf": d?.disposalAfrf,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuDisposalPermissionSharing(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const leftOverStockWasteLeftMenuSharingApi = async (date9, date10, date2) => {
    var previousDay = (moment(date9).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date10).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadLeftOverStock(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadLeftOverStock(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Stock Total Waste": d?.stockTotalWaste,
            "Stock DLF": d?.stockDlf,
            "Stock LAT": d?.stockLat,
            "Stock Incineration": d?.stockIncineration,
            "Stock Afrf": d?.stockAfrf,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuLOSPermissionSharing(printArr);
      }
    }
  };
  // ***********************Recycleables Incoming Waste API Methods******************
  // eslint-disable-next-line no-unused-vars
  const recyclablesIncomingWasteApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadCollectionRecyclables(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadCollectionRecyclables(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        const format = datetype == "Date" ? "YYYY-MM-DD" : datetype == "Month" ? "YYYY-MM" : datetype == "Year" ? "YYYY" : "YYYY-MM-DD";
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format));
          var quantity = 0;
          filterDateArr.forEach(item => {
            quantity = quantity + item.quantity ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, quantity });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setRecyclablesCollection(sortedData);
    }
    else {
      setRecyclablesCollection([]);
    }
  };
  // ***********************Recycleables Analysis API Methods******************
  // eslint-disable-next-line no-unused-vars
  const recyclablesAnalysisWasteApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // const result = await ApiClient.createApiClient().iwmSiteHeadAnalysisRecyclables(payload);
     const params ={start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().iwmSiteHeadAnalysisRecyclables(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        const format = datetype == "Date" ? "YYYY-MM-DD" : datetype == "Month" ? "YYYY-MM" : datetype == "Year" ? "YYYY" : "YYYY-MM-DD";
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format));
          var quantity = 0;
          filterDateArr.forEach(item => {
            quantity = quantity + item.disposalTotalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, quantity });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setRecyclablesAnalysis(sortedData);
    }
    else {
      setRecyclablesAnalysis([]);
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
        const arr = (result?.data?.data ?? []);
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
        const arr = (result?.data?.data ?? []);
        setFaq(arr);
      }
    }
  };
  // ***********************Left Menu Collection Segreagation Download And Share Excel Sheet Methods************
  const exportCollectionDataToExcelDownload = (downloadCollectionData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadCollectionData);
    XLSX.utils.book_append_sheet(wb, ws, "Collection Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_collection_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
          ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
          Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });

  };
  const exportCollectionDataToExcelSharing = (sharingCollectionData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingCollectionData);
    XLSX.utils.book_append_sheet(wb, ws, "Collection Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_collection_data_sharing.xlsx', wbout, 'ascii').then(() => {
    }).catch((e) => {
      console.log('Error', e);
    });
    shareCollectionExcel();

  };
  const leftMenuCollectionPermissionDownload = async (downloadCollectionData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportCollectionDataToExcelDownload(downloadCollectionData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportCollectionDataToExcelDownload(downloadCollectionData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }

  };
  const leftMenuCollectionPermissionSharing = async (sharingCollectionData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportCollectionDataToExcelSharing(sharingCollectionData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportCollectionDataToExcelSharing(sharingCollectionData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const shareCollectionExcel = async () => {
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    const dir = path + '/iwm_site_head_collection_data_sharing.xlsx';
    const options = {
      url: Platform.OS === 'android' ? `file://${dir}` : dir,
      message: 'Sharing File', // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
    RNFS.unlink(dir)
      .then(() => {
        console.log("File Is Deleted");
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  };
  // ***********************Left Menu Disposal Segreagation Download And Share Excel Sheet Methods************
  const exportDisposalDataToExcelDownload = (downloadDisposalData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadDisposalData);
    XLSX.utils.book_append_sheet(wb, ws, "Disposal Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_disposal_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
          ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
          Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });

  };
  const exportDisposalDataToExcelSharing = (sharingDisposalData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingDisposalData);
    XLSX.utils.book_append_sheet(wb, ws, "Disposal Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_disposal_data_sharing.xlsx', wbout, 'ascii').then(() => {
    }).catch((e) => {
      console.log('Error', e);
    });
    shareDisposalExcel();
  };
  const leftMenuDisposalPermissionDownload = async (downloadDisposalData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportDisposalDataToExcelDownload(downloadDisposalData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportDisposalDataToExcelDownload(downloadDisposalData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const leftMenuDisposalPermissionSharing = async (sharingDisposalData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportDisposalDataToExcelSharing(sharingDisposalData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportDisposalDataToExcelSharing(sharingDisposalData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const shareDisposalExcel = async () => {
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    const dir = path + '/iwm_site_head_disposal_data_sharing.xlsx';
    const options = {
      url: Platform.OS === 'android' ? `file://${dir}` : dir,
      message: 'Sharing File', // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
    RNFS.unlink(dir)
      .then(() => {
        console.log("File Is Deleted");
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  };
  // ***********************Left Menu LeftOverStock Segreagation Download And Share Excel Sheet Methods************
  const exportLOSDataToExcelDownload = (downloadLOSData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadLOSData);
    XLSX.utils.book_append_sheet(wb, ws, "LeftOverStock Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_los_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
          ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
          Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  const exportLOSDataToExcelSharing = (sharingLOSData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingLOSData);
    XLSX.utils.book_append_sheet(wb, ws, "LeftOverStock Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_los_data_sharing.xlsx', wbout, 'ascii').then(() => {
    }).catch((e) => {
      console.log('Error', e);
    });
    shareLOSExcel();
  };
  const leftMenuLOSPermissionDownload = async (downloadLOSData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportLOSDataToExcelDownload(downloadLOSData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportLOSDataToExcelDownload(downloadLOSData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const leftMenuLOSPermissionSharing = async (sharingLOSData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportLOSDataToExcelSharing(sharingLOSData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // @ts-ignore
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportLOSDataToExcelSharing(sharingLOSData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const shareLOSExcel = async () => {
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    const dir = path + '/iwm_site_head_los_data_sharing.xlsx';
    const options = {
      url: Platform.OS === 'android' ? `file://${dir}` : dir,
      message: 'Sharing File', // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
    RNFS.unlink(dir)
      .then(() => {
        console.log("File Is Deleted");
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
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
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          exportHistoryDataToExcelDownload(downloadHistoryData);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
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
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/iwm_site_head_history_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
          ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
          Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  // *************************Acordion Sections Selection Method************
  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  // ***********************Accordion In History Methods******************
  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
        <Image
          style={{ marginTop: 7, tintColor: "black", marginRight: 60 }}
          source={isActive ? Images.dropdown : Images.Upword}
        ></Image>
      </Animatable.View>
    );
  };
  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.contentHistory, isActive ? styles.activee : styles.inactivee]}
        transition="backgroundColor">
        {Object.entries(section).map(([key, value]) => {
          if (key === "splitDate")
            return null;
          if (key === "siteName")
            return (
              <View style={[styles.ans]}>
                <Animatable.Text
                  style={styles.segregationTitleText}>
                  {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
                </Animatable.Text>
                <Animatable.Text
                  style={styles.segregationTitleValue}>
                  {/* @ts-ignore */}
                  {value[0].siteName}
                </Animatable.Text>
              </View>
            );
          return (
            <View style={[styles.ans]} key={key}>
              <Animatable.Text
                style={styles.segregationTitleText}>
                {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
              </Animatable.Text>
              <Animatable.Text
                style={styles.segregationTitleValue}>
                {/* @ts-ignore */}
                {value}
              </Animatable.Text>
            </View>
          );
        })}

      </Animatable.View>
    );
  };
  // ***********************Accordion Header In Collected Analysis leftOverStock Modals******************
  const renderHeader1 = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
        <Image
          style={styles.renderheader1image2}
          source={isActive ? Images.dropdown : Images.Upword}
        ></Image>
      </Animatable.View>
    );
  };
  // ***********************Accordion Content In Collected Methods******************
  const renderContent1 = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.contentCollection, isActive ? styles.activee : styles.inactivee]}
        transition="backgroundColor"
      >
        {Object.entries(section).map(([key, value]) => {
          if (key === "splitDate")
            return null;
          if (key === "siteName")
            return (
              <View style={[styles.ans]}>
                <Animatable.Text
                  style={styles.segregationTitleText}>
                  {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
                </Animatable.Text>
                <Animatable.Text
                  style={styles.segregationTitleValue}>
                  {/* @ts-ignore */}
                  {value[0].siteName}
                </Animatable.Text>
              </View>
            );
          return (
            <View style={[styles.ans]} key={key}>
              <Animatable.Text
                style={styles.segregationTitleText}>
                {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
              </Animatable.Text>
              <Animatable.Text
                style={styles.segregationTitleValue}>
                {/* @ts-ignore */}
                {value}
              </Animatable.Text>
            </View>
          );
        })}
      </Animatable.View>
    );
  };
  // ***********************Accordion Content In Analysis Methods******************
  const renderContent2 = (section, _, isActive) => {
  
    return (
      <Animatable.View
        duration={400}
        style={[styles.contentProcessing, isActive ? styles.activee : styles.inactivee]}
        transition="backgroundColor"
      >
        {Object.entries(section).map(([key, value]) => {
          if (key === "splitDate")
            return null;
          if (key === "siteName")
            return (
              <View style={[styles.ans]}>
                <Animatable.Text
                  style={styles.segregationTitleText}>
                  {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
                </Animatable.Text>
                <Animatable.Text
                  style={styles.segregationTitleValue}>
                  {/* @ts-ignore */}
                  {value[0].siteName}
                </Animatable.Text>
              </View>
            );
          return (
            <View style={[styles.ans]} key={key}>
              <Animatable.Text
                style={styles.segregationTitleText}>
                {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
              </Animatable.Text>
              <Animatable.Text
                style={styles.segregationTitleValue}>
                {/* @ts-ignore */}
                {value}
              </Animatable.Text>
            </View>
          );
        })}
      </Animatable.View>
    );
  };
  // ***********************Accordion Content In LeftOverStock Methods******************
  const renderContent3 = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.contentDistribute, isActive ? styles.activee : styles.inactivee]}
        transition="backgroundColor"
      >
        {Object.entries(section).map(([key, value]) => {
          if (key === "splitDate")
            return null;
          if (key === "siteName")
            return (
              <View style={[styles.ans]}>
                <Animatable.Text
                  style={styles.segregationTitleText}>
                  {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
                </Animatable.Text>
                <Animatable.Text
                  style={styles.segregationTitleValue}>
                  {/* @ts-ignore */}
                  {value[0].siteName}
                </Animatable.Text>
              </View>
            );
          return (
            <View style={[styles.ans]} key={key}>
              <Animatable.Text
                style={styles.segregationTitleText}>
                {key.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}
              </Animatable.Text>
              <Animatable.Text
                style={styles.segregationTitleValue}>
                {/* @ts-ignore */}
                {value}
              </Animatable.Text>
            </View>
          );
        })}
      </Animatable.View>
    );
  };
  // ***********************History Modal Methods******************
  const client4 = () => {

    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>

            <View style={styles.historyView}>
              <TouchableOpacity onPress={() => {
                setShowModal(false);
                setActiveSections([]);
              }}>
                <View>
                  <Image source={Images.backarrow} style={styles.historybackImage} />
                </View>

              </TouchableOpacity>
              <Text style={styles.historyText}>History</Text>
            </View>

            <View style={styles.firstView}>
              <TouchableOpacity onPress={() => { clearHistoryCalender(), setModalVisible1(!modalVisible1); }} >
                <Image
                  source={Images.calender1}
                  style={styles.client4image}
                />
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
        {calenderModal1()}
      </Modal>
    );
  };
  // ***********************Help Center Modal Methods******************
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
                  setisSelected2(false);
                  setisSelectedd(false);
                }}
              >
                <Image source={Images.backarrow} style={styles.helpCenterBackImage} />

              </TouchableOpacity>
              <View style={styles.helpCenterView}  >
                <ModalHeader title={"Help Center"} />
              </View>
            </View>

            <ScrollView>
              <View style={styles.secondView}>
                <TouchableOpacity onPress={() => { setisSelected2(!isSelected2), helpCenterContactUs(); }}
                  style={styles.contactUsTouchableOpcacity}>
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
                  <View
                    style={styles.helpCenterView1}
                  >
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
                <TouchableOpacity onPress={() => { setisSelectedd(!isSelectedd), helpCenterFaqs(); }}
                  style={[styles.contactUsTouchableOpcacity, { marginTop: 10 }]}>
                  <View style={styles.connectView}>
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
                  <View style={styles.helpCenterFaqView} >

                    <View>
                      {faq.map((item) => {
                        return <View key={item}>
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
                                    ? Images.dropdown : Images.Upword

                                }
                              />
                            </View>
                          </TouchableOpacity>
                          {/* @ts-ignore */}
                          {item.isExpend ? (
                            <View style={styles.textinputView1}>
                              <Text style={styles.quesText}>
                                {/* @ts-ignore */}
                                {item.answer}
                              </Text>
                            </View>
                          ) : null}
                        </View>;
                      })}
                    </View>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  // ***********************Left Menu Collected Modal Methods******************
  const clientCollected = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal3}
        onRequestClose={() => {
          setShowModal3(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>
            <View style={styles.segregationCollectedView} >
              <TouchableOpacity
                onPress={() => {
                  setShowModal3(false);
                  setActiveSections([]);
                }}

              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />

              </TouchableOpacity>
              <Text style={styles.segregationCollectedText} >Collected Waste</Text>
            </View>

            <View style={styles.firstmodalmainView}>
              <View
                style={styles.clientview1}
              >
                <TouchableOpacity onPress={() => { setModalVisible2(!modalVisible2), collectedClearCalender(); }}>
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultCollectionSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultCollectionDownloadData()}>
                  <Image
                    style={styles.segregatedCollectedDownload}
                    source={Images.download}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={collectedLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent1}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calendarModal2()}
      </Modal>
    );
  };
  // ***********************Left Menu Disposal Modal Methods******************
  const clientDisposal = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal5}
        onRequestClose={() => {
          setShowModal5(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>
            <View style={styles.segregationCollectedView} >
              <TouchableOpacity
                onPress={() => {
                  setShowModal5(false);
                  setActiveSections([]);
                }}
              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />

              </TouchableOpacity>
              <Text style={styles.segregationCollectedText} >Disposal Waste</Text>
            </View>

            <View style={styles.firstmodalmainView}>
              <View
                style={styles.clientview1}
              >

                <TouchableOpacity onPress={() => { setModalVisible3(!modalVisible3), analysisClearCalender(); }}>
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultDisposalSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultDisposalDownloadData()}>
                  <Image
                    style={styles.segregatedCollectedDownload}
                    source={Images.download}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={analysisLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent2}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calenderModal3()}
      </Modal>
    );
  };
  // ***********************Left Menu LeftOverStock Modal Methods******************
  const clientLeftOverStock = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal6}
        onRequestClose={() => {
          setShowModal6(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>
            <View style={styles.segregationCollectedView} >
              <TouchableOpacity
                onPress={() => {
                  setShowModal6(false);
                  setActiveSections([]);
                }}
              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />

              </TouchableOpacity>
              <Text style={styles.segregationCollectedText} >LeftOver Stock</Text>
            </View>

            <View style={styles.firstmodalmainView}>
              <View
                style={styles.clientview1}
              >
                <TouchableOpacity onPress={() => { setModalVisible4(!modalVisible4), leftOverStockClearCalender(); }}>
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultLosSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultLosDownloadData()}>
                  <Image
                    style={styles.segregatedCollectedDownload}
                    source={Images.download}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={leftOverStockLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent3}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calenderModal4()}
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <NavHeader business="Dashboard" centerComponent isRightAction={true} />
      <ScrollView>
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Waste Summary</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View
                  style={styles.mainreturnview}
                >
                  <TouchableOpacity onPress={() => { setModalVisible(true), clearWasteSummaryCalender(); }}>
                    <Image
                      source={Images.calender1}
                      style={styles.mainreturnimage}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.wasteCollectedProcessedBoxView}>
              <View style={styles.wasteCollectedProcessedBoxView1}>
                <Text style={styles.wasteCollectedProcessedBoxText}>Waste Collected</Text>
                {/* @ts-ignore */}
                <Text style={styles.wasteCollectedProcessedBoxText1}>{WastedCollected && WastedCollected.quantity}{" "}MT</Text>
              </View>

              <View style={styles.wasteCollectedProcessedBoxView2}>
                <Text style={styles.wasteCollectedProcessedBoxText}>Waste Processed</Text>
                {/* @ts-ignore */}
                <Text style={styles.wasteCollectedProcessedBoxText1}>{WastedProcessed && WastedProcessed.totalWaste}{" "}MT</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.SecondContainer1}>
          <Swiper
            showsPagination={true}
            paginationStyle={styles.swiperTrend}
            dotColor="gray" activeDotColor="red">
            <View>
              <View style={styles.SecondcardContainer1}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>
                      Collection Trend
                    </Text>
                  </View>

                </View>
                <View style={styles.secondTwocardmainView}>
                  {collectiontrend.length > 0 ?

                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{ x: collectiontrend.length < 3 ? 160 : collectiontrend.length < 5 ? 85 : 8 }}
                      domain={{ y: [0, Math.ceil(maxdata / 100) * datarefresh || 10] }}
                    >
                      <VictoryAxis
                        fixLabelOverlap={true}
                        tickFormat={t => getDateString(t)}
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
                        data={collectiontrend}
                        barWidth={10}
                        x="splitDate"
                        y="quantity"
                      />
                    </VictoryChart> :
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
                <View style={styles.secondThreecardmaibView}>
                  <View style={styles.weightinmeticview}>
                    <Text style={styles.weightmeticText}>
                      Weight in Metric Ton
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.SecondcardContainer1}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>
                      Disposal Trend
                    </Text>
                  </View>

                </View>
                <View style={styles.secondTwocardmainView}>
                  {sortingtrend.length > 0 ?
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{ x: sortingtrend.length < 3 ? 160 : sortingtrend.length < 5 ? 85 : 8 }}
                      domain={{ y: [0, Math.ceil(maxdata1 / 100) * datarefresh1 || 10] }}
                    >
                      <VictoryAxis
                        fixLabelOverlap={true}
                        tickFormat={t => getDateString(t)}
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
                        data={sortingtrend}
                        barWidth={10}
                        x="splitDate"
                        y="disposalTotalWaste"
                      />
                    </VictoryChart> :
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
                <View style={styles.secondThreecardmaibView}>
                  <View style={styles.weightinmeticview}>
                    <Text style={styles.weightmeticText}>
                      Weight in Metric Ton
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.SecondcardContainer1}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>
                      Leftover Stock Trend
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {recyclabletrend.length > 0 ? <VictoryChart
                    width={width / 0.99}
                    height={height / 3.5}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: recyclabletrend.length < 3 ? 160 : recyclabletrend.length < 5 ? 85 : 8 }}
                    domain={{ y: [0, Math.ceil(maxdata2 / 100) * datarefresh2 || 10] }}
                  >
                    <VictoryAxis
                      fixLabelOverlap={true}
                      tickFormat={t => getDateString(t)}
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
                      data={recyclabletrend}
                      barWidth={10}
                      x="splitDate"
                      y="stockTotalWaste"
                    />
                  </VictoryChart> :
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
                <View style={styles.secondThreecardmaibView}>
                  <View style={styles.weightinmeticview}>
                    <Text style={styles.weightmeticText}>
                      Weight in Metric Ton
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Swiper>
        </View>

        <View style={styles.SecondContainer2}>
          <View style={styles.SecondcardContainer2}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>
                  IWM Trend
                </Text>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {wtetrendvalue.length > 0 ? <VictoryChart
                width={width / 1}
                height={height / 3.5}
                padding={50}
                theme={VictoryTheme.material}
                domainPadding={{ x: 28 }}
                domain={{ y: [0, Math.ceil(maxdata3 / 100) * 120 || 10] }}
              >
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel style={{ fontSize: 10 }} />}
                />
                <VictoryAxis
                  dependentAxis={true}
                  tickLabelComponent={<VictoryLabel />}
                />
                <VictoryBar
                  barRatio={0.5}
                  style={{
                    data: {
                      fill: ({ datum }) => datum.x === "QUANTITY" ? "#CC9B42" : datum.x === "DLF" ? "#D75739" : datum.x === "LAT" ? "#84BA4C"
                        : datum.x === "INCINERATION" ? "#A9A7F0" : datum.x === "AFRF" ? "#3884C4" : "",
                    },
                  }}
                  data={wtetrendvalue}
                />
              </VictoryChart> : <View style={{ height: height / 4.3, width: width / 1.06, justifyContent: "center", alignItems: "center" }}><Text style={{ textAlign: "center", fontSize: 18, color: "#2D2D2D" }}>{'Data is not found.'}</Text></View>}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View
                style={styles.mainreturnview1}
              >
                <Text
                  style={styles.mainreturntext2}
                >
                  Weight in Metric Ton
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.ThirdContainer, { top: 40 }]}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>
                  IWM Summary
                </Text>
              </View>
            </View>
            {CatalogueIwm.length > 0 ? <View
              style={styles.mainreturnview3}
            >
              <SwiperFlatList
                autoplay={false}
                paginationActiveColor='red'
                paginationDefaultColor='grey'
                showPagination={true}
                paginationStyle={styles.paginationStyle}
                paginationStyleItem={styles.paginationStyleItem}
                data={array}
                // @ts-ignore
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  return (
                    <>
                      {item[0]?.title && <View style={styles.flatlistmainview}>
                        <Text style={styles.swiperFlatlistText}>{item[0]?.title.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}</Text>
                        <Text style={styles.swiperFlatlistText1}>{item[0]?.value} MT</Text>
                      </View>}

                      {item[1]?.title ? <View style={styles.flatlistmainview1}>
                        <Text style={styles.swiperFlatlistText}>{item[1]?.title.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}</Text>
                        <Text style={styles.swiperFlatlistText1}>{item[1]?.value} MT</Text>
                      </View> : <View style={styles.flatlistmainview3}></View>
                      }

                      {item[2]?.title ? <View style={styles.flatlistmainview2}>
                        <Text style={styles.swiperFlatlistText}>{item[2]?.title.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}</Text>
                        <Text style={styles.swiperFlatlistText1}>{item[2]?.value} MT</Text>
                      </View> : <View style={styles.flatlistmainview3}></View>
                      }

                    </>
                  );
                }}
              />
            </View> : <View style={styles.detailsNotFoundView}>
              <Text style={[styles.detailsNotFoundText, { top: -40 }]}>{'Data Is Not Found.'}</Text>
            </View>}

          </View>
        </View>

        <View style={[styles.SecondContainer13, { marginBottom: 100 }]}>
          <Swiper
            paginationStyle={styles.swiperRecyclebles}
            dotColor="gray" activeDotColor="red"
            autoplay={false} >
            <View >
              <View style={[styles.SecondcardContainer]}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Recyclables</Text>
                  </View>

                </View>

                <View
                  style={styles.mainreturnview4}
                >
                  <View
                    style={styles.mainreturnview5}
                  >

                    <View >
                      <View style={styles.mainreturnview6}>
                        <View
                          style={styles.mainincomingview}
                        ></View>
                        <Text
                          style={styles.mainreturntext3}
                        >
                          Incoming Waste
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={styles.mainreturnview9}
                >
                  {recyclablesCollection.length > 0 ? <VictoryChart
                    width={width / 0.99}
                    height={height / 3.5}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: recyclablesCollection.length < 3 ? 160 : recyclablesCollection.length < 5 ? 85 : 8 }}
                    domain={{ y: [0, Math.ceil(maxdata4 / 100) * datarefresh4 || 10] }}
                  >

                    <VictoryAxis
                      fixLabelOverlap={true}
                      tickFormat={t => getDateString(t)}
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
                      data={recyclablesCollection}
                      barWidth={10}
                      x="splitDate"
                      y="quantity"
                    />
                  </VictoryChart> :
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
              </View>
            </View>
            <View >
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Recyclables</Text>
                  </View>

                </View>

                <View
                  style={styles.mainreturnview4}
                >
                  <View
                    style={styles.mainreturnview5}
                  >

                    <View >
                      <View style={styles.mainreturnview6}>
                        <View
                          style={styles.mainprocessedview}
                        ></View>
                        <Text
                          style={styles.mainreturntext3}
                        >
                          Disposal Waste
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={styles.mainreturnview9}
                >
                  {recyclablesAnalysis.length > 0 ? <VictoryChart
                    width={width / 0.99}
                    height={height / 3.5}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: recyclablesAnalysis.length < 3 ? 160 : recyclablesAnalysis.length < 5 ? 85 : 8 }}
                    domain={{ y: [0, Math.ceil(maxdata5 / 100) * datarefresh5 || 10] }}
                  >
                    <VictoryAxis
                      fixLabelOverlap={true}
                      tickFormat={t => getDateString(t)}
                      tickLabelComponent={<VictoryLabel />}
                      style={{ tickLabels: { fontSize: 10 } }}
                    />
                    <VictoryAxis
                      dependentAxis={true}
                      tickLabelComponent={<VictoryLabel />}
                    />
                    <VictoryBar
                      barRatio={1}
                      style={{ data: { fill: "#00B09E" } }}
                      data={recyclablesAnalysis}
                      barWidth={10}
                      x="splitDate"
                      y="quantity"
                    />
                  </VictoryChart> :
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
              </View>
            </View>
          </Swiper>
        </View>
      </ScrollView>
      {clientCollected()}
      {clientDisposal()}
      {clientLeftOverStock()}
      {calendarModal()}
      {client4()}
      {client5()}
    </View>
  );
};

export default withConnect(Dashboard);

const styles = StyleSheet.create({
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
    width: width / 1.3,
    flexDirection: "row",
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
  SecondContainer2: {
    height: height / 2.4,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    top: 25,
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
  SecondContainer13: {
    height: height / 1.9,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    top: 75,
  },
  SecondcardContainer: {
    height: height / 2,
    backgroundColor: "#F8F8F8",
    marginHorizontal: 10,
    width: width / 1.06,
    borderRadius: 10,
  },
  SecondContainer1: {
    height: height / 2.3,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  SecondcardContainer1: {
    height: height / 2.5,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
    alignSelf: "center",
  },
  SecondcardContainer2: {
    height: height / 2.5,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
  },
  SecondfirstcardmainView: {
    height: height / 16,
    width: width / 1.12,
    flexDirection: "row",
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
    marginTop: 15,
    height: height / 3.8,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdcardContainer: {
    height: height / 4,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
  },
  thirdcardFirstOneView: {
    height: height / 16,
    width: width / 1.13,
    flexDirection: "row",
  },
  thirdcardFirstTwoView: {
    height: height / 3.5,
    width: width / 1.06,
    alignItems: "center",
  },
  item2: {
  },
  headingmainview: {
    height: height / 25,
    width: width / 4.5,
    borderRadius: 20,
    margin: 5,
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
    width: width / 1.3,
    justifyContent: "center",
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
    width: width / 7,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  yeardropdownview4: {
    height: height / 16,
    width: width / 2.07,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 40,
  },
  yeardropdownview1: {
    height: height / 16,
    width: width / 1.9,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 20,
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
    marginHorizontal: 10,
    marginVertical: 15,
  },
  thirdcardFirstTwoView12: {
    height: height / 4.3,
    width: width / 1.11,
    paddingVertical: 10,
    flexDirection: "row",
  },
  flatlistdetailsview: {
    height: height / 45,
    width: width / 4,
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
    top:Platform.OS==='ios'?14:10,
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
    marginHorizontal: 20,
    marginVertical: 70,
  },
  contentHistory: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
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
    backgroundColor: "#F5FCFF",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  inactive: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderColor: "#A6A6A6",
  },
  inactivee: {
    backgroundColor: "#F8F8F8",
  },
  activee: {
    backgroundColor: "#DEFDFB",
    borderBottomWidth: 1,
    borderColor: "#A6A6A6",
    marginHorizontal: 15,
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
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  centeredView1: {
    height: height / 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView1: {
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
  textinputView1: {
    alignItems: "flex-start",
  },

  imgView: {
    height: height / 25,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  quesText: {
    color: "#606060",
    fontSize: 14,
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
    backgroundColor: '#DEFDFB',
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
    marginLeft: 60,
  },
  firstmodalmainView: {
    width: width / 1,
    marginTop: 30,
    alignItems: "center",
  },
  dateView: {
    height: height / 28,
    width: width / 3,
  },
  renderheader1image2: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    tintColor: "black",
    marginRight: 65,
  },
  item: {
    width: width / 1.2,
    marginVertical: 7,
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    height: height / 18,
    borderRadius: 5,
  },

  flatlistTextView: {
    height: height / 8,
    width: width / 1.8,
    justifyContent: "center",
  },
  flatlistfirstimageView: {
    flex: 0.6,
    marginLeft: 10,
  },
  flatlistsecondimageView: {
    flex: 0.5,
  },
  flatlistThirdimageView: {
    flex: 0.5,
  },
  centeredView2: {
    height: height / 1,
    width: width / 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView2: {
    height: height / 1.25,
    width: width / 1,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  modalmainView: {
    height: height / 2,
    width: width / 1,
    alignItems: "center",
  },

  item1: {
    width: width / 1.2,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: height / 22,
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
    fontSize: 15,
    top:Platform.OS==='ios'?18:16,
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
  renderImagestyle: {
    top: 6,
    tintColor: "black",
  },
  rendercontentanimatetext: {
    textAlign: 'center',
  },
  rendercontent1animatetext: {
    textAlign: "center",
    marginLeft: 20,
  },
  rendercontent1animatetext1: {
    textAlign: "center",
    marginRight: 20,
  },
  client4view: {
    marginTop: 25,
  },
  client4image: {
    height: 22,
    width: 22,
    marginLeft: 280,
  },
  client4image1: {
    height: 22,
    width: 22,
    marginLeft: 20,
    tintColor: "black",
  },
  client5image: {
    height: 15,
    width: 15,
    tintColor: "black",
    marginRight: 15,
  },
  client5view: {
    height: height / 7,
  },
  client5image1: {
    height: 13,
    width: 10,
  },
  client5image2: {
    height: 15,
    width: 15,
    tintColor: "black",
    marginRight: 18,
    top: 8,
  },
  client5view1: {
    height: height / 1.7,
  },
  client5image3: {
    height: 15,
    width: 15,
    tintColor: "black",
    marginRight: 5,
  },
  client5view2: {
    width: width / 1.12,
    justifyContent: "center",
    marginLeft: 5,
  },
  clientview: {
    width: width / 1.2,
    height: height / 28,
    flexDirection: "row",
  },
  clientviewtext: {
    color: "black",
    fontSize: 18,
    fontWeight: "800",
  },
  clientview1: {
    width: width / 1.3,
    height: height / 28,
    alignItems: "flex-end",
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '65%',
  },
  clientviewimage: { height: 25, width: 25, marginLeft: 10 },
  clientviewtext1: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    color: "#606060",
    fontWeight: "600",
  },
  clientviewimage1: {
    height: 12,
    width: 20,
    tintColor: "#E41F25",
  },
  clientviewimage2: { height: 11, width: 13, tintColor: "#E41F25" },
  clientviewimage3: { height: 13, width: 14, tintColor: "#E41F25" },
  client1text: { marginLeft: 4, fontSize: 15, fontWeight: "600" },
  mainreturnview: {
    height: height / 21,
    width: width / 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mainreturnimage: {
    height: 33,
    width: 33,
  },
  mainreturntext: {
    fontSize: height / 78,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  mainreturntext1: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  mainreturnview1: {
    height: height / 20,
    width: width / 2.5,
    backgroundColor: "#FFF0F1",
    borderRadius: 20,
    borderColor: "#E41F25",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  mainreturntext2: {
    fontSize: 12,
    color: "#2D2D2D",
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  mainreturnview2: {
    height: height / 21,
    width: width / 3.3,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mainreturnview3: {
    height: height / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  mainreturnview4: {
    height: height / 9,
    width: width / 1.1,
    marginLeft: 70,
  },
  mainreturnview5: {
    marginTop: 30,
    flexDirection: "row",
    marginLeft: 60,
  },
  mainplasticview: {
    height: 13,
    width: 13,
    backgroundColor: "#00B09E",
    borderRadius: 30,
  },
  mainreturntext3: {
    color: "#000000",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
    fontSize: 16,
    marginLeft: 10,
    top: -2,
  },
  mainbagsview: {
    height: 13,
    width: 13,
    backgroundColor: "#E87818",
    borderRadius: 30,
  },
  mainincomingview: {
    height: 15,
    width: 15,
    backgroundColor: "#E87818",
    borderRadius: 30,
  },
  mainprocessedview: {
    height: 15,
    width: 15,
    backgroundColor: "#00B09E",
    borderRadius: 30,
  },
  mainreturnview6: {
    flexDirection: "row",
  },
  mainreturnview7: {
    flexDirection: "row",
    marginTop: 10,
  },
  mainreturnview8: {
    marginLeft: 20,
  },
  mainreturnview9: {
    height: height / 3.4,
    width: width / 1.06,
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
  calenderflatlistview:
  {
    height: height / 28,
    width: width / 6.5,
    borderRadius: 10,
    marginHorizontal: 10,
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
    top: 10,
    width: width / 7,
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
    borderRadius: 12,
    top: 10,
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
  contentCollection: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
  },
  contentProcessing: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
  },
  contentDistribute: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
  },
  helpCenterBackImage: {
    marginLeft: 30, marginTop: 25,
  },
  helpCenterDownImage: {
    marginRight: Platform.OS==='ios'?12:12,
  },
  helpCenterView: {
    marginLeft: 60, marginTop: 10,
  },
  helpCenterView1: {
    height: height / 7,
  },
  helpCenterCallImage: {
    height: 13, width: 10,
    marginLeft: Platform.OS==='ios'?-68:-67,
  },
  helpCenterFaqDownImage: {
    height: 10,
    tintColor: "black",
    marginRight: 18,
  },
  helpCenterFaqDownImage1: {
    marginLeft: Platform.OS==='ios'?-68:-66,
  },
  helpCenterFaqView: {
    marginBottom: 30,
  },
  contactUsTouchableOpcacity: {
    borderRadius: 10,
  },
  faqTouchableOpcacity: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    top: 20,
  },
  detailsNotFoundView: {
    height: height / 4.3, width: width / 1.06, justifyContent: "center", alignItems: "center",
  },
  detailsNotFoundText: {
    textAlign: "center", fontSize: 18, color: "#2D2D2D",
  },
  wasteCollectedProcessedBoxView: {
    marginTop: 10, flexDirection: "row", justifyContent: "center",
  },
  wasteCollectedProcessedBoxView1: {
    height: height / 7,
    width: width / 2.3,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  wasteCollectedProcessedBoxText: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    marginTop: 30,
    color: "#2D2D2D",
    fontWeight: '600',
  },
  wasteCollectedProcessedBoxText1: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    marginTop: 10,
  },
  wasteCollectedProcessedBoxView2: {
    height: height / 7,
    width: width / 2.3,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  wasteCollectedProcessedBoxText2: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    marginTop: 10,
  },
  iwmSummaryView: {
    height: height / 8,
    width: width / 3.3,
    backgroundColor: "#ECFFE5",
    borderColor: "#CBE4C2",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  iwmSummaryView1: {
    height: height / 8,
    width: width / 3.3,
    backgroundColor: "#D0FAE9",
    borderColor: "#A2DEC6",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  iwmSummaryView2: {
    height: height / 8,
    width: width / 3.3,
    backgroundColor: "#F1E5FF",
    borderColor: "#D0BDE7",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  segregationTitleText: {
    textAlign: 'center',
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: 'center',
    marginRight: 20,
  },
  iwmSummaryView3: {
    height: height / 8,
    width: width / 3.3,
    backgroundColor: "#FAF2D0",
    borderColor: "#EADFAF",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  iwmSummaryView4: {
    height: height / 8,
    width: width / 3.3,
    backgroundColor: "#FFE5E5",
    borderColor: "#EEC0C0",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  iwmSummaryView5: {
    height: height / 8,
    width: width / 3.3,
    backgroundColor: "#E5F8FF",
    borderColor: "#BEDEEA",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  iwmSummaryText: {
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#2D2D2D",
    fontWeight: '400',
  },
  iwmSummaryText1: {
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#2D2D2D",
    fontWeight: "700",
  },
  iwmSummaryText2: {
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#2D2D2D",
    fontWeight: '400',
    textAlign: "center",
  },
  flatlistmainview: {
    width: width / 3.35,
    margin: 3,
    alignItems: "center",
    height: height / 8.5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: '#D0FAE9',
    borderColor: "#A2DEC6",
  },
  flatlistmainview1: {
    width: width / 3.35,
    margin: 3,
    alignItems: "center",
    height: height / 8.5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: '#F1E5FF',
    borderColor: "#D0BDE7",
  },
  flatlistmainview2: {
    width: width / 3.35,
    margin: 3,
    alignItems: "center",
    height: height / 8.5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: '#E5F8FF',
    borderColor: "#BEDEEA",
  },
  flatlistmainview3: {
    width: width / 3.35,
    margin: 3,
    alignItems: "center",
    height: height / 8.5,
    marginTop: 10,
  },
  swiperFlatlistText: {
    fontSize: height / 70,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  swiperFlatlistText1: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  swiperTrend: {
    bottom: 0,
    left: 0,
    marginTop: 50,
  },
  paginationStyle: {
    top: Platform.OS==='ios'?170:155,
  },
  paginationStyleItem: {
    width: 8,
    height: 8,
    marginLeft: -4,
  },
  swiperRecyclebles: {
    bottom: 0,
    left: 0,
    marginTop: 10,
  },
  calenderflatlistview12: {
    height: height / 28,
    width: width / 6,
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  card1headingtext1: {
    fontSize: 13,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
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
  segregationCollectedView: {
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: 20,
  },
  segregationCollectedImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  segregationCollectedText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
    marginTop: 2,
  },
  segregationCollectedCalender: {
    height: 23,
    width: 23,
    alignItems: "center",
    justifyContent: "center",
    top: 2,
  },
  segregatedCollectedShare: {
    height: 15,
    width: 14,
    marginLeft: 10,
    marginRight: 14,
    tintColor: "black",
  },
  segregatedCollectedDownload: {
    height: 18,
    width: 20,
    marginRight: 10,
    tintColor: "black",
  },
});
