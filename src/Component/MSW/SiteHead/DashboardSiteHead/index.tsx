import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  Modal,
  Platform,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  BackHandler,
} from "react-native";
import XLSX from "xlsx";
import Share from "react-native-share";
import _ from "lodash";
import ApiClient from "../../../../Network";
// import Toast from 'react-native-simple-toast';
// import Toast from 'react-native-root-toast';
import Loader from "../../../../ReuableComponent/Loader";
import withConnect from "./withConnect";
import { COLORS, FONT_FAMILIES, METRICS } from "../../../../Configration";
import MonthPicker from "react-native-month-picker";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import NavHeader from "../../../../ReuableComponent/NavHeader";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Swiper from "react-native-swiper";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { Images } from "../../../../Assets";
import RNFS from "react-native-fs";
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const DashboardSiteHead = (props: any) => {
  const { route, user } = props;
  const { params } = route;
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [datetype, setDateType] = useState();
  const [datetype1, setDateType1] = useState();
  const [WastedCollected, setWastedCollected] = useState([0]);
  const [WastedProcessed, setWastedProcessed] = useState([1]);
  const [collectiontrendvalue, setCollectionTrendValue] = useState([]);
  const [processingtrendvalue, setProcessingTrendValue] = useState([]);
  const [wtetrendvalue, setWTEtrendvalue] = useState([]);
  const [distributecompostvalue, setDistributeCompostValue] = useState([]);
  const [distributerdfvalue, setDistributeRDFValue] = useState([]);
  const [distributerecyclablevalue, setDistributeRecyclableValue] = useState([]);
  const [distributeinertsvalue, setDistributeInertsValue] = useState([]);
  const [recyclableswaste, setRecyclablesWaste] = useState([]);
  const [historyValue, setHistoryValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [rdf, setRdf] = useState([]);
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [date3, setDate3] = useState<any>();
  const [date4, setDate4] = useState<any>();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isSelected1, setSelected1] = useState("away");
  const [isSelected3, setSelected3] = useState("away");
  const [filter1, setFilter1] = useState("Date");
  const [filter2, setFilter2] = useState("Date");
  const [refresh, setRefresh] = useState(false);
  const [refresh1, setRefresh1] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [date, setDate] = useState<any>();
  const [date1, setDate1] = useState<any>();
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
  const [isOpen8, toggleOpen8] = useState(false);
  const [isOpen9, toggleOpen9] = useState(false);
  const [isOpen10, toggleOpen10] = useState(false);
  const [isOpen11, toggleOpen11] = useState(false);
  const [isOpen12, toggleOpen12] = useState(false);
  const [isOpen13, toggleOpen13] = useState(false);
  const [value4, setValue4] = useState<any>();
  const [value5, setValue5] = useState<any>();
  const [value6, setValue6] = useState<any>();
  const [value7, setValue7] = useState<any>();
  const [value8, setValue8] = useState<any>();
  const [value9, setValue9] = useState<any>();
  const [value10, setValue10] = useState<any>();
  const [value11, setValue11] = useState<any>();
  const [value12, setValue12] = useState<any>();
  const [value13, setValue13] = useState<any>();
  const [value14, setValue14] = useState<any>();
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelectedd, setisSelectedd] = useState(false);
  const [touch, setTouch] = useState(false);
  const [faq, setFaq] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [filter3, setFilter3] = useState("Date");
  const [filter4, setFilter4] = useState("Date");
  const [filter5, setFilter5] = useState("Date");
  const [filter6, setFilter6] = useState("Date");
  const [isSelected4, setSelected4] = useState("away");
  const [isSelected5, setSelected5] = useState("away");
  const [isSelected6, setSelected6] = useState("away");
  const [isSelected7, setSelected7] = useState("away");
  const [date5, setDate5] = useState<any>();
  const [date6, setDate6] = useState<any>();
  const [date7, setDate7] = useState<any>();
  const [date8, setDate8] = useState<any>();
  const [date9, setDate9] = useState<any>();
  const [date10, setDate10] = useState<any>();
  const [date11, setDate11] = useState<any>();
  const [date12, setDate12] = useState<any>();
  const [datetype2, setDateType2] = useState();
  const [datetype3, setDateType3] = useState();
  const [datetype4, setDateType4] = useState();
  const [datetype5, setDateType5] = useState();
  const [refresh2, setRefresh2] = useState(false);
  const [refresh3, setRefresh3] = useState(false);
  const [refresh4, setRefresh4] = useState(false);
  const [refresh5, setRefresh5] = useState(false);
  const [datarefresh, setDataRefresh] = useState(3);
  const [datarefresh1, setDataRefresh1] = useState(3);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [datarefresh3, setDataRefresh3] = useState(3);
  const [datarefresh4, setDataRefresh4] = useState(3);
  const [datarefresh5, setDataRefresh5] = useState(3);
  const [datarefresh6, setDataRefresh6] = useState(3);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [isDatePickerVisible5, setDatePickerVisibility5] = useState(false);
  const [isDatePickerVisible6, setDatePickerVisibility6] = useState(false);
  const [isDatePickerVisible7, setDatePickerVisibility7] = useState(false);
  const [isDatePickerVisible8, setDatePickerVisibility8] = useState(false);
  const [isDatePickerVisible9, setDatePickerVisibility9] = useState(false);
  const [isDatePickerVisible10, setDatePickerVisibility10] = useState(false);
  const [isDatePickerVisible11, setDatePickerVisibility11] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [collectedLeftMenuValue, setCollectedLeftMenuValue] = useState([]);
  const [processedLeftMenuValue, setProcessedLeftMenuValue] = useState([]);
  const [distributeLeftMenuValue, setDistributeLeftMenuValue] = useState([]);
  const [wteLeftMenuValue, setWteLeftMenuValue] = useState([]);
  const [array, setArray] = useState([]);
  const city = user.siteName[0].siteName;
  // *************************** Help Center Extended Method*****************
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true;
    setTouch(!touch);
  };
  // *******************Calling API Method On Rendering********************************
  const calledApis = async () => {
    await loadDefaultWteProcessedData();
    await loadDefaultCollectionTrendData();
    await loadDefaultProcessingTrendData();
    await loadDefaultWTETrendData();
    await loadDefaultDistributionCompostTrendData();
    await loadDefaultDistributionRdfTrendData();
    await loadDefaultDistributionRecyclablesTrendData();
    await loadDefaultDistributionInertsTrendData();
    await loadDefaultWasteSummaryRecyclablesWasteData();
  };
  // **********************************Default Data Shown Methods**************************
  const loadDefaultHistory = () => {
    historyApi(
      moment(new Date()).subtract(6, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultCollectionData = () => {
    collectedWasteLeftMenuApi(
      moment(new Date()).subtract(29, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultProcessedData = () => {
    processedWasteLeftMenuApi(
      moment(new Date()).subtract(29, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultDistributeData = () => {
    distributeWasteLeftMenuApi(
      moment(new Date()).subtract(29, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultCollectionTrendData = () => {
    collectionTrendApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultProcessingTrendData = () => {
    processingTrendApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultDistributionCompostTrendData = () => {
    distributionTrendCompostApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultDistributionRdfTrendData = () => {
    distributionTrendRdfApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultDistributionRecyclablesTrendData = () => {
    distributionTrendRecyclabeApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultDistributionInertsTrendData = () => {
    distributionTrendInertsApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultWTETrendData = () => {
    wteTrendApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultWasteSummaryRecyclablesWasteData = () => {
    wasteSummaryRecyclablesWasteApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultWteData = () => {
    wteWasteLeftMenuApi(
      moment(new Date()).subtract(29, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultWteProcessedData = () => {
    wteProcessedApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultCollectionDownloadData = () => {
    if (datetype2 == "Date") {
      collectedWasteLeftMenuDownloadApi(date5, date6, "date");
    } else if (datetype2 == "Month") {
      collectedWasteLeftMenuDownloadApi(value7, value8, "month");
    } else {
      collectedWasteLeftMenuDownloadApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultCollectionSharingData = () => {
    if (datetype2 == "Date") {
      collectedWasteLeftMenuSharingApi(date5, date6, "date");
    } else if (datetype2 == "Month") {
      collectedWasteLeftMenuSharingApi(value7, value8, "month");
    } else {
      collectedWasteLeftMenuSharingApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultProcessingDownloadData = () => {
    if (datetype3 == "Date") {
      processedWasteLeftMenuDownloadApi(date7, date8, "date");
    } else if (datetype3 == "Month") {
      processedWasteLeftMenuDownloadApi(value9, value10, "month");
    } else {
      processedWasteLeftMenuDownloadApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultProcessingSharingData = () => {
    if (datetype3 == "Date") {
      processedWasteLeftMenuSharingApi(date7, date8, "date");
    } else if (datetype3 == "Month") {
      processedWasteLeftMenuSharingApi(date7, date8, "date");
    } else {
      processedWasteLeftMenuSharingApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultDistributionDownloadData = () => {
    if (datetype4 == "Date") {
      distributeWasteLeftMenuDownloadApi(date9, date10, "date");
    } else if (datetype4 == "Month") {
      distributeWasteLeftMenuDownloadApi(value11, value12, "month");
    } else {
      distributeWasteLeftMenuDownloadApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultDistributionSharingData = () => {
    if (datetype4 == "Date") {
      distributeWasteLeftMenuSharingApi(date9, date10, "date");
    } else if (datetype4 == "Month") {
      distributeWasteLeftMenuSharingApi(value11, value12, "month");
    } else {
      distributeWasteLeftMenuSharingApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultWteDownloadData = () => {
    if (datetype5 == "Date") {
      wteWasteLeftMenuDownloadApi(date11, date12, "date");
    } else if (datetype5 == "Month") {
      wteWasteLeftMenuDownloadApi(value13, value14, "month");
    } else {
      wteWasteLeftMenuDownloadApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
  };
  const loadDefaultWteSharingData = () => {
    if (datetype5 == "Date") {
      wteWasteLeftMenuSharingApi(date11, date12, "date");
    } else if (datetype5 == "Month") {
      wteWasteLeftMenuSharingApi(value13, value14, "month");
    } else {
      wteWasteLeftMenuSharingApi(
        moment(new Date()).subtract(29, "days"),
        moment(new Date()),
        "date"
      );
    }
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
  // *********************Max Data*******************************
  // @ts-ignore
  const maxdata = Math.max(...collectiontrendvalue.map((o) => o.quantity));
  // @ts-ignore
  const maxdata1 = Math.max(...processingtrendvalue.map((o) => o.totalWaste));
  // @ts-ignore
  const maxdata2 = Math.max(...distributecompostvalue.map((o) => o.compost));
  // @ts-ignore
  const maxdata3 = Math.max(...distributerdfvalue.map((o) => o.rdf));
  // @ts-ignore
  const maxdata4 = Math.max(...distributerecyclablevalue.map((o) => o.recyclables));
  // @ts-ignore
  const maxdata5 = Math.max(...distributeinertsvalue.map((o) => o.inerts));
  // @ts-ignore
  const maxdata6 = Math.max(...wtetrendvalue.map((o) => o.y));
  // ********************Use Effect******************************
  // *************************************Use Effect For All API Calender*********
  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        wasteSummaryRecyclablesWasteApi(date, date1, "date");
        collectionTrendApi(date, date1, "date");
        processingTrendApi(date, date1, "date");
        distributionTrendCompostApi(date, date1, "date");
        distributionTrendRdfApi(date, date1, "date");
        distributionTrendRecyclabeApi(date, date1, "date");
        distributionTrendInertsApi(date, date1, "date");
        wteProcessedApi(date, date1, "date");
        wteTrendApi(date, date1, "date");
      } else if (datetype == "Month") {
        wasteSummaryRecyclablesWasteApi(value1, value2, "month");
        collectionTrendApi(value1, value2, "month");
        processingTrendApi(value1, value2, "month");
        distributionTrendCompostApi(value1, value2, "month");
        distributionTrendRdfApi(value1, value2, "month");
        distributionTrendRecyclabeApi(value1, value2, "month");
        distributionTrendInertsApi(value1, value2, "month");
        wteProcessedApi(value1, value2, "month");
        wteTrendApi(value1, value2, "month");
      } else if (datetype == "Year") {
        wasteSummaryRecyclablesWasteApi(value3, value4, "year");
        collectionTrendApi(value3, value4, "year");
        processingTrendApi(value3, value4, "year");
        distributionTrendCompostApi(value3, value4, "year");
        distributionTrendRdfApi(value3, value4, "year");
        distributionTrendRecyclabeApi(value3, value4, "year");
        distributionTrendInertsApi(value3, value4, "year");
        wteProcessedApi(value3, value4, "year");
        wteTrendApi(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);
  // *************************************Use Effect For Hamburger Menu Navigation********************
  useEffect(() => {
    if ((params?.name ?? "") == "History") {
      setShowModal(true);
      loadDefaultHistory();
    } else if ((params?.name ?? "") == "Help Center") {
      setShowModal1(true);
    } else if ((params?.name1 ?? "") == "   Collected Waste") {
      setShowModal3(true);
      loadDefaultCollectionData();
    } else if ((params?.name1 ?? "") == "   Processed Waste") {
      setShowModal5(true);
      loadDefaultProcessedData();
    } else if ((params?.name1 ?? "") == "   Distribute Waste") {
      setShowModal6(true);
      loadDefaultDistributeData();
    } else if ((params?.name1 ?? "") == "   WTE") {
      setShowModal7(true);
      loadDefaultWteData();
    }
  }, [params]);
  // *************************************Use Effect With No Condition********************
  useEffect(() => {
    setCheck(true);
    setCheck1(true);
    setCheck2(true);
    setCheck3(true);
    setCheck4(true);
    setCheck5(true);
    calledApis();
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
      } else if (datetype2 == "Month") {
        collectedWasteLeftMenuApi(value7, value8, "month");
      }
    }
  }, [datetype2, refresh2, check2]);
  // *************************************Use Effect For Processed API Calender********************
  useEffect(() => {
    if (check3 && !refresh3) {
      if (datetype3 == "Date") {
        processedWasteLeftMenuApi(date7, date8, "date");
      } else if (datetype3 == "Month") {
        processedWasteLeftMenuApi(value9, value10, "month");
      }
    }
  }, [datetype3, refresh3, check3]);
  // *************************************Use Effect For Distribute API Calender********************
  useEffect(() => {
    if (check4 && !refresh4) {
      if (datetype4 == "Date") {
        distributeWasteLeftMenuApi(date9, date10, "date");
      } else if (datetype4 == "Month") {
        distributeWasteLeftMenuApi(value11, value12, "month");
      }
    }
  }, [datetype4, refresh4, check4]);
  // *************************************Use Effect For WTE API Calender********************
  useEffect(() => {
    if (check5 && !refresh5) {
      if (datetype5 == "Date") {
        wteWasteLeftMenuApi(date11, date12, "date");
      } else if (datetype5 == "Month") {
        wteWasteLeftMenuApi(value13, value14, "month");
      }
    }
  }, [datetype5, refresh5, check5]);
  // *******************************UseEffect Of Max Data************************
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
    } else if (maxdata1 <= 100) {
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
  useEffect(() => {
    if (maxdata4 >= 1000) {
      setDataRefresh4(100);
    } else if (maxdata4 <= 10) {
      setDataRefresh4(10);
    } else if (maxdata4 <= 50) {
      setDataRefresh4(50);
    } else if (maxdata4 <= 100) {
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
  useEffect(() => {
    if (maxdata6 >= 1000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 10) {
      setDataRefresh6(10);
    } else if (maxdata6 <= 50) {
      setDataRefresh6(50);
    } else if (maxdata6 <= 100) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 10000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 1500) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 2000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 3000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 4000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 5000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 6000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 7000) {
      setDataRefresh6(100);
    } else if (maxdata6 <= 8000) {
      setDataRefresh6(100);
    }
  }, [maxdata6]);

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
  // ******************************API Methods***********************************
  // ***********************Waste Summary And Recyclables API Methods******************
  // eslint-disable-next-line no-unused-vars
  const wasteSummaryRecyclablesWasteApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().postsitehead(payload);
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().postsitehead(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      setWastedCollected(result.data.data[0]);
      // @ts-ignore
      setWastedProcessed(result.data.data[0]);
      // @ts-ignore
      const quantityarr = result.data.data;
      const data = [
        {
          x: "Collected",
          y: quantityarr[0].quantity,
        },

        {
          x: "Processed",
          y: quantityarr[0].totalWaste,
        },
      ];
      // @ts-ignore
      setRecyclablesWaste(data);
    } else {
      setWastedCollected([]);
      setWastedProcessed([]);
      setRecyclablesWaste([]);
    }
    setLoading(false);
  };
  // ***********************Product Catalogue API Methods******************
  // eslint-disable-next-line no-unused-vars
  const wteProcessedApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().postsitewteprocessed(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().postsitewteprocessed(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const rdf = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(rdf)
        .map(([key, value]) => {
          return {
            title: key,
            value: value,
          };
        })
        .filter((item) => item.value !== 0);
      // @ts-ignore
      setRdf(catalogue);
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
    } else {
      setRdf([]);
    }
    setLoading(false);
  };
  // ***********************Collection Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectionTrendApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().siteheadcollectiontrend(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().siteheadcollectiontrend(
      params
    );
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

          var quantity = 0;

          filterDateArr.forEach((item) => {
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
      setCollectionTrendValue(sortedData);
    } else {
      setCollectionTrendValue([]);
    }
    setLoading(false);
  };
  // ***********************Processing Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const processingTrendApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().siteheadprocessingtrend(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().siteheadprocessingtrend(
      params
    );
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
          var totalWaste = 0;
          filterDateArr.forEach((item) => {
            totalWaste = totalWaste + item.totalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, totalWaste });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setProcessingTrendValue(sortedData);
    } else {
      setProcessingTrendValue([]);
    }
    setLoading(false);
  };
  // ***********************WTE Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const wteTrendApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().siteheadwtetrend(payload);
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().siteheadwtetrend(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const Wtevalue = result?.data?.data ?? [];
      if (Wtevalue.length > 0) {
        const wtebargraphvalue = Object.keys(Wtevalue[0]).map((key) => {
          return {
            x: key,
            y: Wtevalue[0][key],
          };
        });
        // @ts-ignore
        setWTEtrendvalue(wtebargraphvalue);
      }
    } else {
      setWTEtrendvalue([]);
    }
    setLoading(false);
  };
  // ***********************Distribute Trend Compost Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const distributionTrendCompostApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result =
    //   await ApiClient.createApiClient().siteheaddistributecomposttrendgraph(
    //     payload
    //   );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result =
      await ApiClient.createApiClient().siteheaddistributecomposttrendgraph(
        params
      );
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
          var compost = 0;
          filterDateArr.forEach((item) => {
            compost = compost + item.compost ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, compost });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setDistributeCompostValue(sortedData);
    } else {
      setDistributeCompostValue([]);
    }
    setLoading(false);
  };
  // ***********************Distribute Trend RDF Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const distributionTrendRdfApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result =
    //   await ApiClient.createApiClient().siteheaddistributerdftrendgraph(
    //     payload
    //   );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result =
      await ApiClient.createApiClient().siteheaddistributerdftrendgraph(
        params
      );
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
          var rdf = 0;
          filterDateArr.forEach((item) => {
            rdf = rdf + item.rdf ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, rdf });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setDistributeRDFValue(sortedData);
    } else {
      setDistributeRDFValue([]);
    }
    setLoading(false);
  };
  // ***********************Distribute Trend Recyclables Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const distributionTrendRecyclabeApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result =
    //   await ApiClient.createApiClient().siteheaddistributerecyclabletrendgraph(
    //     payload
    //   );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result =
      await ApiClient.createApiClient().siteheaddistributerecyclabletrendgraph(
        params
      );
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
          var recyclables = 0;
          filterDateArr.forEach((item) => {
            recyclables = recyclables + item.recyclables ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, recyclables });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setDistributeRecyclableValue(sortedData);
    } else {
      setDistributeRecyclableValue([]);
    }
    setLoading(false);
  };
  // ***********************Distribute Trend Inerts Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const distributionTrendInertsApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result =
    //   await ApiClient.createApiClient().siteheaddistributeinertstrendgraph(
    //     payload
    //   );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result =
      await ApiClient.createApiClient().siteheaddistributeinertstrendgraph(
        params
      );
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
          var inerts = 0;
          filterDateArr.forEach((item) => {
            inerts = inerts + item.inerts ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, inerts });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setDistributeInertsValue(sortedData);
    } else {
      setDistributeInertsValue([]);
    }
    setLoading(false);
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
  // ***********************History API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay =
      moment(date3).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date4).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadhistory(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadhistory(
      params
    );
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
    setLoading(false);
  };
  // ***********************History Download API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyDownloadApi = async (date3, date4, date2) => {
    var previousDay =
      moment(date3).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date4).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadhistory(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadhistory(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            Quantity: d?.quantity,
            "Total Waste": d?.totalWaste,
            "Total RDF": d?.totalRdf,
            "Total Compost": d?.totalCompost,
            "Total Inerts": d?.totalInerts,
            "Total Recyclables": d?.totalRecyclables,
            RDF: d?.rdf,
            Compost: d?.compost,
            Recyclables: d?.recyclables,
            Inerts: d?.inerts,
            "RDF Receipt": d?.rdfReceipt,
            "RDF Combusted": d?.rdfCombusted,
            "Ash Generated": d?.ashGenerated,
            "Steam Generation": d?.steamGeneration,
            "Power Produced": d?.powerProduced,
            "Power Export": d?.powerExport,
            "Auxiliary Consumption": d?.auxiliaryConsumption,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        historyPermissionDownload(printArr);
      }
    }
    setLoading(false);
  };
  // ***********************LeftMenu Segregation API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuApi = async (date5, date6, date2) => {
    var previousDay =
      moment(date5).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date6).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadcollection(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadcollection(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setCollectedLeftMenuValue(arr);
      }
    } else {
      setCollectedLeftMenuValue([]);
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const processedWasteLeftMenuApi = async (date7, date8, date2) => {
    var previousDay =
      moment(date7).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date8).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadprocessed(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadprocessed(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setProcessedLeftMenuValue(arr);
      }
    } else {
      setProcessedLeftMenuValue([]);
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const distributeWasteLeftMenuApi = async (date9, date10, date2) => {
    var previousDay =
      moment(date9).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date10).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheaddistribute(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheaddistribute(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setDistributeLeftMenuValue(arr);
      }
    } else {
      setDistributeLeftMenuValue([]);
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const wteWasteLeftMenuApi = async (date11, date12, date2) => {
    var previousDay =
      moment(date11).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date12).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadwte(payload);
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadwte(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        setWteLeftMenuValue(arr);
      }
    } else {
      setWteLeftMenuValue([]);
    }
    setLoading(false);
  };
  // ***********************LeftMenu Segregation Download API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuDownloadApi = async (date5, date6, date2) => {
    var previousDay =
      moment(date5).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date6).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadcollection(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadcollection(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            Quantity: d?.quantity,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuCollectionPermissionDownload(printArr);
      }
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const processedWasteLeftMenuDownloadApi = async (date7, date8, date2) => {
    var previousDay =
      moment(date7).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date8).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadprocessed(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadprocessed(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Waste": d?.totalWaste,
            "Total RDF": d?.totalRdf,
            "Total Compost": d?.totalCompost,
            "Total Inerts": d?.totalInerts,
            "Total Recyclables": d?.totalRecyclables,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuProcessingPermissionDownload(printArr);
      }
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const distributeWasteLeftMenuDownloadApi = async (date9, date10, date2) => {
    var previousDay =
      moment(date9).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date10).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheaddistribute(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheaddistribute(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            RDF: d?.rdf,
            Compost: d?.compost,
            Recyclables: d?.recyclables,
            Inerts: d?.inerts,
            "Vendor Name Rdf": d?.vendorNameRdf,
            "Vendor Name Compost": d?.vendorNameCompost,
            "Vendor Name Recyclables": d?.vendorNameRecyclables,
            "Vendor Name Inerts": d?.vendorNameInerts,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuDistributionPermissionDownload(printArr);
      }
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const wteWasteLeftMenuDownloadApi = async (date11, date12, date2) => {
    var previousDay =
      moment(date11).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date12).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadwte(payload);
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadwte(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            "RDF Receipt": d?.rdfReceipt,
            "RDF Combusted": d?.rdfCombusted,
            "Ash Generated": d?.ashGenerated,
            "Steam Generation": d?.steamGeneration,
            "Power Produced": d?.powerProduced,
            "Power Export": d?.powerExport,
            "Auxiliary Consumption": d?.auxiliaryConsumption,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuWtePermissionDownload(printArr);
      }
    }
    setLoading(false);
  };
  // ***********************LeftMenu SegregationSharing API Methods******************
  // eslint-disable-next-line no-unused-vars
  const processedWasteLeftMenuSharingApi = async (date7, date8, date2) => {
    var previousDay =
      moment(date7).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date8).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadprocessed(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadprocessed(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Waste": d?.totalWaste,
            "Total RDF": d?.totalRdf,
            "Total Compost": d?.totalCompost,
            "Total Inerts": d?.totalInerts,
            "Total Recyclables": d?.totalRecyclables,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuProcessingPermissionSharing(printArr);
      }
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const distributeWasteLeftMenuSharingApi = async (date9, date10, date2) => {
    var previousDay =
      moment(date9).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date10).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheaddistribute(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheaddistribute(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            RDF: d?.rdf,
            Compost: d?.compost,
            Recyclables: d?.recyclables,
            Inerts: d?.inerts,
            "Vendor Name Rdf": d?.vendorNameRdf,
            "Vendor Name Compost": d?.vendorNameCompost,
            "Vendor Name Recyclables": d?.vendorNameRecyclables,
            "Vendor Name Inerts": d?.vendorNameInerts,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuDistributionPermissionSharing(printArr);
      }
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuSharingApi = async (date5, date6, date2) => {
    var previousDay =
      moment(date5).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date6).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadcollection(
    //   payload
    // );
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadcollection(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            Quantity: d?.quantity,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuCollectionPermissionSharing(printArr);
      }
    }
    setLoading(false);
  };
  // eslint-disable-next-line no-unused-vars
  const wteWasteLeftMenuSharingApi = async (date11, date12, date2) => {
    var previousDay =
      moment(date11).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date12).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", city);
    // setLoading(true);
    // const result = await ApiClient.createApiClient().mswsiteheadwte(payload);
    const params = {start:previousDay,end:time1,siteName:city};
    setLoading(true);
    const result = await ApiClient.createApiClient().mswsiteheadwte(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date: moment(d?.splitDate).format("DD/MM/YYYY"),
            "RDF Receipt": d?.rdfReceipt,
            "RDF Combusted": d?.rdfCombusted,
            "Ash Generated": d?.ashGenerated,
            "Steam Generation": d?.steamGeneration,
            "Power Produced": d?.powerProduced,
            "Power Export": d?.powerExport,
            "Auxiliary Consumption": d?.auxiliaryConsumption,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuWtePermissionSharing(printArr);
      }
    }
    setLoading(false);
  };
  // ********************** On Graph SHowing Date, Month, Year****************
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
  // ***********************Left Menu Collection Download And Share Excel Sheet Methods************
  const exportCollectionDataToExcelDownload = (downloadCollectionData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadCollectionData);
    XLSX.utils.book_append_sheet(wb, ws, "Collection Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_collection_data_" + new Date().getTime() + ".xlsx",
      wbout,
      "ascii"
    )
      .then(() => {
        {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravityAndOffset(
              "Excel File Is Downloaded Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            )
            : Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  const exportCollectionDataToExcelSharing = (sharingCollectionData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingCollectionData);
    XLSX.utils.book_append_sheet(wb, ws, "Collection Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_collection_data_sharing.xlsx",
      wbout,
      "ascii"
    )
      .then(() => { })
      .catch((e) => {
        console.log("Error", e);
      });
    shareCollectionExcel();
  };
  const leftMenuCollectionPermissionDownload = async (
    downloadCollectionData
  ) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportCollectionDataToExcelDownload(downloadCollectionData);
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
          exportCollectionDataToExcelDownload(downloadCollectionData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
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
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportCollectionDataToExcelSharing(sharingCollectionData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };
  const shareCollectionExcel = async () => {
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    const dir = path + "/msw_site_head_collection_data_sharing.xlsx";
    const options = {
      url: Platform.OS === "android" ? `file://${dir}` : dir,
      message: "Sharing File", // By omitting the message, whatsapp shows the image
    };

    try {
      await Share.open(options);
    } catch (error) {
      console.log("error", error);
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
  // ***********************Left Menu Processed Download And Share Excel Sheet Methods************
  const exportProcessingDataToExcelDownload = (downloadProcessingData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadProcessingData);
    XLSX.utils.book_append_sheet(wb, ws, "Processing Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_processing_data_" + new Date().getTime() + ".xlsx",
      wbout,
      "ascii"
    )
      .then(() => {
        {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravityAndOffset(
              "Excel File Is Downloaded Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            )
            : Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  const exportProcessingDataToExcelSharing = (sharingProcessingData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingProcessingData);
    XLSX.utils.book_append_sheet(wb, ws, "Processing Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_processing_data_sharing.xlsx",
      wbout,
      "ascii"
    )
      .then(() => { })
      .catch((e) => {
        console.log("Error", e);
      });
    shareProcessingExcel();
  };
  const leftMenuProcessingPermissionDownload = async (
    downloadProcessingData
  ) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportProcessingDataToExcelDownload(downloadProcessingData);
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
          exportProcessingDataToExcelDownload(downloadProcessingData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };

  const leftMenuProcessingPermissionSharing = async (sharingProcessingData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportProcessingDataToExcelSharing(sharingProcessingData);
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
          exportProcessingDataToExcelSharing(sharingProcessingData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };
  const shareProcessingExcel = async () => {
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    const dir = path + "/msw_site_head_processing_data_sharing.xlsx";
    const options = {
      url: Platform.OS === "android" ? `file://${dir}` : dir,
      message: "Sharing File", // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log("error", error);
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
  // ***********************Left Menu Distribute Download And Share Excel Sheet Methods************
  const exportDistributionDataToExcelDownload = (downloadDistributionData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadDistributionData);
    XLSX.utils.book_append_sheet(wb, ws, "Distribution Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path +
      "/msw_site_head_distribution_data_" +
      new Date().getTime() +
      ".xlsx",
      wbout,
      "ascii"
    )
      .then(() => {
        {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravityAndOffset(
              "Excel File Is Downloaded Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            )
            : Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  const exportDistributionDataToExcelSharing = (sharingDistributionData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingDistributionData);
    XLSX.utils.book_append_sheet(wb, ws, "Distribution Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_distribution_data_sharing.xlsx",
      wbout,
      "ascii"
    )
      .then(() => { })
      .catch((e) => {
        console.log("Error", e);
      });
    shareDistributionExcel();
  };
  const leftMenuDistributionPermissionDownload = async (
    downloadDistributionData
  ) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportDistributionDataToExcelDownload(downloadDistributionData);
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
          exportDistributionDataToExcelDownload(downloadDistributionData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };

  const leftMenuDistributionPermissionSharing = async (
    sharingDistributionData
  ) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportDistributionDataToExcelSharing(sharingDistributionData);
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
          exportDistributionDataToExcelSharing(sharingDistributionData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };
  const shareDistributionExcel = async () => {
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    const dir = path + "/msw_site_head_distribution_data_sharing.xlsx";
    const options = {
      url: Platform.OS === "android" ? `file://${dir}` : dir,
      message: "Sharing File", // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log("error", error);
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
  // ***********************Left Menu WTE Download And Share Excel Sheet Methods************
  const exportWteDataToExcelDownload = (downloadWteData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadWteData);
    XLSX.utils.book_append_sheet(wb, ws, "Wte Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_wte_data_" + new Date().getTime() + ".xlsx",
      wbout,
      "ascii"
    )
      .then(() => {
        {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravityAndOffset(
              "Excel File Is Downloaded Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            )
            : Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  const exportWteDataToExcelSharing = (sharingWteData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingWteData);
    XLSX.utils.book_append_sheet(wb, ws, "Wte Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_wte_data_sharing.xlsx",
      wbout,
      "ascii"
    )
      .then(() => { })
      .catch((e) => {
        console.log("Error", e);
      });
    shareWteExcel();
  };
  const leftMenuWtePermissionDownload = async (downloadWteData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportWteDataToExcelDownload(downloadWteData);
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
          exportWteDataToExcelDownload(downloadWteData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };

  const leftMenuWtePermissionSharing = async (sharingWteData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportWteDataToExcelSharing(sharingWteData);
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
          exportWteDataToExcelSharing(sharingWteData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };
  const shareWteExcel = async () => {
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    const dir = path + "/msw_site_head_wte_data_sharing.xlsx";
    const options = {
      url: Platform.OS === "android" ? `file://${dir}` : dir,
      message: "Sharing File", // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log("error", error);
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
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportHistoryDataToExcelDownload(downloadHistoryData);
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };
  const exportHistoryDataToExcelDownload = (downloadHistoryData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadHistoryData);
    XLSX.utils.book_append_sheet(wb, ws, "History Data");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/msw_site_head_history_data_" + new Date().getTime() + ".xlsx",
      wbout,
      "ascii"
    )
      .then(() => {
        {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravityAndOffset(
              "Excel File Is Downloaded Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            )
            : Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  // *************************** Waste Summary Calender Methods*****************
  const [birth1, setBirth1] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
    { name: "Year", isSelected: false },
  ]);
  const clearWasteSummaryCalender = () => {
    setDate(""),
      setDate1(""),
      setValue1(""),
      setValue2(""),
      setValue3(""),
      setValue4(""),
      setSelected1("away"),
      setBirth1([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
        { name: "Year", isSelected: false },
      ]),
      setFilter1("Date"),
      setRefresh(true);
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
  const tabButtonSwitches1 = () => {
    if (filter1 === "Date") {
      return dateData();
    } else if (filter1 === "Month") {
      return monthData();
    } else if (filter1 === "Year") {
      return yearData();
    }
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
                minimumDate={date || new Date()}
                maximumDate={new Date()}
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
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
      <View style={styles.monthview}>
        {isSelected1 === "away" ? (
          <View style={styles.monthsecondview}>
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
                      {
                        !value1 ? setValue1(moment().startOf("month")) : null;
                      }
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
          <View style={styles.monthsecondview}>
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
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value2 ? setValue2(moment()) : null;
                      }
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter();
              setModalVisible(!modalVisible);
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
  const yearData = () => {
    return (
      <View style={styles.monthview}>
        {isSelected1 === "away" ? (
          <View style={styles.monthsecondview}>
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
                      {
                        !value3 ? setValue3(moment().startOf("month")) : null,
                          setRefresh(true);
                      }
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
          <View style={styles.monthsecondview}>
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
                      {
                        !value4 ? setValue4(moment()) : null;
                      }
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter();
              setModalVisible(!modalVisible);
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
                  onPress={() => {
                    setModalVisible(!modalVisible), clearWasteSummaryCalender();
                  }}
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
  // *************************** History Calender Methods*****************
  const [birth2, setBirth2] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const clearHistoryCalender = () => {
    setDate3(""),
      setDate4(""),
      setValue5(""),
      setValue6(""),
      setSelected3("away"),
      setBirth2([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]),
      setFilter2("Date"),
      setRefresh1(true);
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
  const tabButtonSwitches3 = () => {
    if (filter2 === "Date") {
      return dateData1();
    } else if (filter2 === "Month") {
      return monthData1();
    }
  };
  const dateData1 = () => {
    return (
      <View style={styles.dateview}>
        {isSelected3 === "away" ? (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker2}>
              <Text style={styles.datethirdview}>
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
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker3}>
              <Text style={styles.datethirdview}>
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible1(!modalVisible1);
              dataFilter1();
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
  const monthData1 = () => {
    return (
      <View style={styles.monthview}>
        {isSelected3 === "away" ? (
          <View style={styles.monthsecondview}>
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
                      {
                        !value5 ? setValue5(moment().startOf("month")) : null;
                      }
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
          <View style={styles.monthsecondview}>
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
                    minDate={value5 || new Date()}
                    onMonthChange={(date) => {
                      setValue6(
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh1(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value6 ? setValue6(moment()) : null;
                      }
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter1();
              setModalVisible1(!modalVisible1);
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
                  onPress={() => {
                    setModalVisible1(!modalVisible1), clearHistoryCalender();
                  }}
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
  // *************************** Collected Segregation Calender Methods*****************
  const [birth3, setBirth3] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const collectedClearCalender = () => {
    setDate5(""),
      setDate6(""),
      setValue7(""),
      setValue8(""),
      setSelected4("away"),
      setBirth3([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]),
      setFilter3("Date"),
      setRefresh2(true);
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
  const tabButtonSwitches4 = () => {
    if (filter3 === "Date") {
      return dateData2();
    } else if (filter3 === "Month") {
      return monthData2();
    }
  };
  const dateData2 = () => {
    return (
      <View style={styles.dateview}>
        {isSelected4 === "away" ? (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker4}>
              <Text style={styles.datethirdview}>
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
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker5}>
              <Text style={styles.datethirdview}>
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible2(!modalVisible2);
              dataFilter2();
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
  const monthData2 = () => {
    return (
      <View style={styles.monthview}>
        {isSelected4 === "away" ? (
          <View style={styles.monthsecondview}>
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
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value7 || new Date()}
                    onMonthChange={(date) => {
                      setValue7(date), setRefresh2(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value7 ? setValue7(moment().startOf("month")) : null;
                      }
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
          <View style={styles.monthsecondview}>
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
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value8 || new Date()}
                    minDate={value7 || new Date()}
                    onMonthChange={(date) => {
                      setValue8(
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh2(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value8 ? setValue8(moment()) : null;
                      }
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter2();
              setModalVisible2(!modalVisible2);
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
            <View style={styles.calenderview}>
              <View style={styles.calenderview1}>
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
                  onPress={() => {
                    setModalVisible2(!modalVisible2), collectedClearCalender();
                  }}
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
                    setSelected4("away");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview4,
                      {
                        backgroundColor:
                          isSelected4 === "away" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
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
              <View style={styles.calenderflatlistview5}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected4("home");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview6,
                      {
                        backgroundColor:
                          isSelected4 === "home" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
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
            <View style={styles.calenderflatlistview7}>
              {tabButtonSwitches4()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // *************************** Processed Segregation Calender Methods*****************
  const [birth4, setBirth4] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const showDatePicker6 = () => {
    setDatePickerVisibility6(true);
  };
  const processedClearCalender = () => {
    setDate7(""),
      setDate8(""),
      setValue9(""),
      setValue10(""),
      setSelected5("away"),
      setBirth4([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]),
      setFilter4("Date"),
      setRefresh3(true);
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
  const tabButtonSwitches5 = () => {
    if (filter4 === "Date") {
      return dateData3();
    } else if (filter4 === "Month") {
      return monthData3();
    }
  };
  const dateData3 = () => {
    return (
      <View style={styles.dateview}>
        {isSelected5 === "away" ? (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker6}>
              <Text style={styles.datethirdview}>
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
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker7}>
              <Text style={styles.datethirdview}>
                {date8 ? moment(date8).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible7}
                mode="date"
                onConfirm={handleConfirm7}
                onCancel={hideDatePicker7}
                minimumDate={date7 || new Date()}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible3(!modalVisible3);
              dataFilter3();
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
  const monthData3 = () => {
    return (
      <View style={styles.monthview}>
        {isSelected5 === "away" ? (
          <View style={styles.monthsecondview}>
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
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value9 || new Date()}
                    onMonthChange={(date) => {
                      setValue9(date), setRefresh3(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value9 ? setValue9(moment().startOf("month")) : null;
                      }
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
          <View style={styles.monthsecondview}>
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
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value10 || new Date()}
                    minDate={value9 || new Date()}
                    onMonthChange={(date) => {
                      setValue10(
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh3(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value10 ? setValue10(moment()) : null;
                      }
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter3();
              setModalVisible3(!modalVisible3);
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
            <View style={styles.calenderview}>
              <View style={styles.calenderview1}>
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
                  onPress={() => {
                    setModalVisible3(!modalVisible3), processedClearCalender();
                  }}
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
                    setSelected5("away");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview4,
                      {
                        backgroundColor:
                          isSelected5 === "away" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
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
              <View style={styles.calenderflatlistview5}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected5("home");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview6,
                      {
                        backgroundColor:
                          isSelected5 === "home" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
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
            <View style={styles.calenderflatlistview7}>
              {tabButtonSwitches5()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // *************************** Distribute Segregation Calender Methods*****************
  const [birth5, setBirth5] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const showDatePicker8 = () => {
    setDatePickerVisibility8(true);
  };
  const distributeClearCalender = () => {
    setDate9(""),
      setDate10(""),
      setValue11(""),
      setValue12(""),
      setSelected6("away"),
      setBirth5([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]),
      setFilter5("Date"),
      setRefresh4(true);
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
  const tabButtonSwitches6 = () => {
    if (filter5 === "Date") {
      return dateData4();
    } else if (filter5 === "Month") {
      return monthData4();
    }
  };
  const dateData4 = () => {
    return (
      <View style={styles.dateview}>
        {isSelected6 === "away" ? (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker8}>
              <Text style={styles.datethirdview}>
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
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker9}>
              <Text style={styles.datethirdview}>
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible4(!modalVisible4);
              dataFilter4();
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
  const monthData4 = () => {
    return (
      <View style={styles.monthview}>
        {isSelected6 === "away" ? (
          <View style={styles.monthsecondview}>
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
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value11 || new Date()}
                    onMonthChange={(date) => {
                      setValue11(date), setRefresh4(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value11 ? setValue11(moment().startOf("month")) : null;
                      }
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
          <View style={styles.monthsecondview}>
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
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value12 || new Date()}
                    minDate={value11 || new Date()}
                    onMonthChange={(date) => {
                      setValue12(
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh4(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value12 ? setValue12(moment()) : null;
                      }
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
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter4();
              setModalVisible4(!modalVisible4);
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
            <View style={styles.calenderview}>
              <View style={styles.calenderview1}>
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
                  onPress={() => {
                    setModalVisible4(!modalVisible4), distributeClearCalender();
                  }}
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
                    setSelected6("away");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview4,
                      {
                        backgroundColor:
                          isSelected6 === "away" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
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
              <View style={styles.calenderflatlistview5}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected6("home");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview6,
                      {
                        backgroundColor:
                          isSelected6 === "home" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
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
            <View style={styles.calenderflatlistview7}>
              {tabButtonSwitches6()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // *************************** WTE Segregation Calender Methods*****************
  const [birth6, setBirth6] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const wteClearCalender = () => {
    setDate11(""),
      setDate12(""),
      setValue13(""),
      setValue14(""),
      setSelected7("away"),
      setBirth6([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]),
      setFilter6("Date"),
      setRefresh5(true);
  };
  const showDatePicker10 = () => {
    setDatePickerVisibility10(true);
  };
  const showDatePicker11 = () => {
    setDatePickerVisibility11(true);
  };
  const hideDatePicker10 = () => {
    setDatePickerVisibility10(false);
  };
  const hideDatePicker11 = () => {
    setDatePickerVisibility11(false);
  };
  const handleConfirm10 = (date10) => {
    setDate11(date10);
    setRefresh5(true);
    hideDatePicker10();
  };
  const handleConfirm11 = (date11) => {
    setDate12(date11);
    setRefresh5(true);
    hideDatePicker11();
  };
  const dataFilter5 = () => {
    const filterData = _.filter(birth6, (item: any) => {
      return item.isSelected;
    });
    setDateType5(filterData[0].name);
    setRefresh5(false);
  };
  const selectActionTab6 = (item) => {
    setFilter6(item.name);
    const _birth1 = birth6.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth6(_birth1);
    setSelected7("away");
  };
  const tabButtonSwitches7 = () => {
    if (filter6 === "Date") {
      return dateData5();
    } else if (filter6 === "Month") {
      return monthData5();
    }
  };
  const dateData5 = () => {
    return (
      <View style={styles.dateview}>
        {isSelected7 === "away" ? (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker10}>
              <Text style={styles.datethirdview}>
                {date11 ? moment(date11).format("DD-MMM") : "Select Start Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible10}
                mode="date"
                onConfirm={handleConfirm10}
                onCancel={hideDatePicker10}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.datesecondview}>
            <TouchableOpacity onPress={showDatePicker11}>
              <Text style={styles.datethirdview}>
                {date12 ? moment(date12).format("DD-MMM") : "Select End Date"}
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible11}
                mode="date"
                onConfirm={handleConfirm11}
                onCancel={hideDatePicker11}
                minimumDate={date11 || new Date()}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible5(!modalVisible5);
              dataFilter5();
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
  const monthData5 = () => {
    return (
      <View style={styles.monthview}>
        {isSelected7 === "away" ? (
          <View style={styles.monthsecondview}>
            <TouchableOpacity
              onPress={() => toggleOpen12(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value13
                  ? moment(value13).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen12}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value13 || new Date()}
                    onMonthChange={(date) => {
                      setValue13(date), setRefresh5(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value13 ? setValue13(moment().startOf("month")) : null;
                      }
                      toggleOpen12(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={styles.monthsecondview}>
            <TouchableOpacity
              onPress={() => toggleOpen13(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value14
                  ? moment(value14).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen13}
              onRequestClose={() => { }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value14 || new Date()}
                    minDate={value13 || new Date()}
                    onMonthChange={(date) => {
                      setValue14(
                        moment(date).add(1, "month").subtract(1, "days")
                      ),
                        setRefresh5(true);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      {
                        !value14 ? setValue14(moment()) : null;
                      }
                      toggleOpen13(false);
                    }}
                  >
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.datesubmitview}>
          <TouchableOpacity
            onPress={() => {
              dataFilter5();
              setModalVisible5(!modalVisible5);
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
  const calenderModal5 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible5}
        onRequestClose={() => {
          setModalVisible5(!modalVisible5);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.calenderview}>
              <View style={styles.calenderview1}>
                <FlatList
                  style={styles.calenderflatlist}
                  extraData={birth6}
                  horizontal
                  data={birth6}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab6(item)}>
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
                  onPress={() => {
                    setModalVisible5(!modalVisible5), wteClearCalender();
                  }}
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
                    setSelected7("away");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview4,
                      {
                        backgroundColor:
                          isSelected7 === "away" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected7 === "away" ? "#FFFFFF" : "#626362",
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
                    setSelected7("home");
                  }}
                >
                  <View
                    style={[
                      styles.calenderflatlistview6,
                      {
                        backgroundColor:
                          isSelected7 === "home" ? "#DB0D15" : "#F8F8F8",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected7 === "home" ? "#FFFFFF" : "#626362",
                      }}
                    >
                      End
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calenderflatlistview7}>
              {tabButtonSwitches7()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // ***********************Accordion In History Methods******************
  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>
          {moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
            "DD/MM/YYYY"
          )}
        </Text>
        <Image
          style={{ marginTop: 7, tintColor: "black", marginRight: 60 }}
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
            // @ts-ignore
            <View style={styles.ans} key={value}>
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
  // ***********************Accordion Header In Collected Processed Distribure Modals******************
  const renderHeader1 = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>
          {moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
            "DD/MM/YYYY"
          )}
        </Text>
        <Image
          style={styles.renderheader1image2}
          source={isActive ? Images.dropdown : Images.Upword}
        ></Image>
      </Animatable.View>
    );
  };
  // ***********************Accordion Content In Collected Methods******************
  const renderContent1 = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.contentCollection,
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
            // @ts-ignore
            <View style={[styles.ans]} key={value}>
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
  // ***********************Accordion Content In Processed Methods******************
  const renderContent2 = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.contentProcessing,
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
            // @ts-ignore
            <View style={[styles.ans]} key={value}>
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
  // ***********************Accordion Content In Distribute Methods******************
  const renderContent3 = (section, _, isActive) => {
    return (
      <ScrollView>
        <Animatable.View
          duration={400}
          style={[
            styles.contentDistribute,
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
              // @ts-ignore
              <View style={[styles.ans]} key={value}>
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
      </ScrollView>
    );
  };
  // ***********************Accordion Content In WTE Methods******************
  const renderContent4 = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.contentWte,
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
            // @ts-ignore
            <View style={[styles.ans]} key={value}>
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
  // *************************Acordion Sections Selection Method************
  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
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
            <View style={styles.segregationCollectedView}>
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
              <Text style={styles.segregationCollectedText}>
                Collected Waste
              </Text>
            </View>
            <View style={styles.firstmodalmainView}>
              <View style={styles.clientview1}>
                <TouchableOpacity
                  onPress={() => {
                    collectedClearCalender(), setModalVisible2(!modalVisible2);
                  }}
                >
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loadDefaultCollectionSharingData()}
                >
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loadDefaultCollectionDownloadData()}
                >
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
  // ***********************Left Menu Processed Modal Methods******************
  const clientProcessed = () => {
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
            <View style={styles.segregationCollectedView}>
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
              <Text style={styles.segregationCollectedText}>
                Processed Waste
              </Text>
            </View>
            <View style={styles.firstmodalmainView}>
              <View style={styles.clientview1}>
                <TouchableOpacity
                  onPress={() => {
                    processedClearCalender(), setModalVisible3(!modalVisible3);
                  }}
                >
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loadDefaultProcessingSharingData()}
                >
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loadDefaultProcessingDownloadData()}
                >
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
                  sections={processedLeftMenuValue}
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
  // ***********************Left Menu Distribute Modal Methods******************
  const clientDistribute = () => {
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
            <View style={styles.segregationCollectedView}>
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
              <Text style={styles.segregationCollectedText}>
                Distribute Waste
              </Text>
            </View>
            <View style={styles.firstmodalmainView}>
              <View style={styles.clientview1}>
                <TouchableOpacity
                  onPress={() => {
                    distributeClearCalender(), setModalVisible4(!modalVisible4);
                  }}
                >
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loadDefaultDistributionSharingData()}
                >
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loadDefaultDistributionDownloadData()}
                >
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
                  sections={distributeLeftMenuValue}
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
  // ***********************Left Menu WTE Modal Methods******************
  const clientWTE = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal7}
        onRequestClose={() => {
          setShowModal7(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>
            <View style={styles.segregationCollectedView}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal7(false);
                  setActiveSections([]);
                }}
              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />
              </TouchableOpacity>
              <Text style={styles.segregationCollectedText}>WTE</Text>
            </View>
            <View style={styles.firstmodalmainView}>
              <View style={styles.clientview1}>
                <TouchableOpacity
                  onPress={() => {
                    wteClearCalender(), setModalVisible5(!modalVisible5);
                  }}
                >
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultWteSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultWteDownloadData()}>
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
                  sections={wteLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent4}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calenderModal5()}
      </Modal>
    );
  };
  // ******************History Modal***********************
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
                onPress={() => {
                  setModalVisible1(!modalVisible1), clearHistoryCalender();
                }}
              >
                <Image source={Images.calender1} style={styles.client4image} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => loadDefaultHistoryDownloadData()}
              >
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
  // ******************Help Center Modal***********************
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
                    <ScrollView>
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
                                      // @ts-ignore
                                      source={item.isExpend
                                        ? Images.dropdown
                                        : Images.Upword
                                      }
                                    />
                                  </View>
                                </TouchableOpacity>
                                {/* @ts-ignore */}
                                {item.isExpend ? (
                                  // @ts-ignore
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
                    </ScrollView>
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
      <NavHeader business="Dashboardsite"
        centerComponent
        isRightAction={true}
      />
      <ScrollView>
        <View style={styles.thirdContainer}>
          <View style={styles.thirdCardContainer}>
            <View style={styles.thirdCardFirstOneView}>
              <Text style={styles.wasteSummaryText}>MSW Waste Summary</Text>
            </View>
            <View style={styles.yearDropDownView}>
              <View style={styles.calenderView}>
                <TouchableOpacity
                  onPress={() => {
                    clearWasteSummaryCalender(), setModalVisible(true);
                  }}
                >
                  <Image
                    source={Images.calender1}
                    style={styles.calenderImage}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.thirdcardFirstTwoView}>
            <View style={styles.summary}>
              <Text style={styles.summary1}>Waste Collected</Text>
              {/* @ts-ignore */}
              <Text style={styles.wasteCollectedProcessedBoxText1}>{WastedCollected && WastedCollected.quantity} MT
              </Text>
            </View>
            <View style={[styles.summary, { marginLeft: 10 }]}>
              <Text style={styles.summary1}>Waste Processed</Text>
              {/* @ts-ignore */}
              <Text style={styles.wasteCollectedProcessedBoxText1}>{WastedProcessed && WastedProcessed.totalWaste} MT
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.SecondContainer}>
          <Swiper
            showsPagination={true}
            autoplay={false}
            paginationStyle={styles.swiperChart}
            dotColor="gray"
            activeDotColor="red"
          >
            <View>
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectionTrendView}>
                    <Text style={styles.wasteSummaryText}>
                      Collection Trend
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {collectiontrendvalue.length > 0 ? (
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{
                        x:
                          collectiontrendvalue.length < 3
                            ? 160
                            : collectiontrendvalue.length < 5
                              ? 85
                              : 8,
                      }}
                      domain={{
                        y: [0, Math.ceil(maxdata / 100) * datarefresh || 10],
                      }}
                    >
                      <VictoryAxis
                        fixLabelOverlap={false}
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
                        data={collectiontrendvalue}
                        barWidth={8}
                        x="splitDate"
                        y="quantity"
                      />
                    </VictoryChart>
                  ) : (
                    <View style={styles.dataIsNotFoundView}>
                      <Text style={styles.dataIsNotFoundText}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>
                  )}
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
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectionTrendView}>
                    <Text style={styles.wasteSummaryText}>
                      Processing Trend
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {processingtrendvalue.length > 0 ? (
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{
                        x:
                          processingtrendvalue.length < 3
                            ? 160
                            : processingtrendvalue.length < 5
                              ? 85
                              : 8,
                      }}
                      domain={{
                        y: [0, Math.ceil(maxdata1 / 100) * datarefresh1 || 10],
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
                        data={processingtrendvalue}
                        barWidth={8}
                        x="splitDate"
                        y="totalWaste"
                      />
                    </VictoryChart>
                  ) : (
                    <View style={styles.dataIsNotFoundView}>
                      <Text style={styles.dataIsNotFoundText}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>
                  )}
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
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectionTrendView}>
                    <Text style={[styles.wasteSummaryText, { marginLeft: 4 }]}>
                      Distribution Trend (Compost Outflow)
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {distributecompostvalue.length > 0 ? (
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{
                        x:
                          distributecompostvalue.length < 3
                            ? 160
                            : distributecompostvalue.length < 5
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
                        data={distributecompostvalue}
                        barWidth={8}
                        x="splitDate"
                        y="compost"
                      />
                    </VictoryChart>
                  ) : (
                    <View style={styles.dataIsNotFoundView}>
                      <Text style={styles.dataIsNotFoundText}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>
                  )}
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
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectionTrendView}>
                    <Text style={[styles.wasteSummaryText, { marginLeft: 4 }]}>
                      Distribution Trend (RDF Outflow)
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {distributerdfvalue.length > 0 ? (
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{
                        x:
                          distributerdfvalue.length < 3
                            ? 160
                            : distributerdfvalue.length < 5
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
                        data={distributerdfvalue}
                        barWidth={8}
                        x="splitDate"
                        y="rdf"
                      />
                    </VictoryChart>
                  ) : (
                    <View style={styles.dataIsNotFoundView}>
                      <Text style={styles.dataIsNotFoundText}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>
                  )}
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
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectionTrendView}>
                    <Text style={[styles.wasteSummaryText, { marginLeft: 4 }]}>
                      Distribution Trend (Recyclables Outflow)
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {distributerecyclablevalue.length > 0 ? (
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{
                        x:
                          distributerecyclablevalue.length < 3
                            ? 160
                            : distributerecyclablevalue.length < 5
                              ? 85
                              : 8,
                      }}
                      domain={{
                        y: [0, Math.ceil(maxdata4 / 100) * datarefresh4 || 10],
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
                        data={distributerecyclablevalue}
                        barWidth={8}
                        x="splitDate"
                        y="recyclables"
                      />
                    </VictoryChart>
                  ) : (
                    <View style={styles.dataIsNotFoundView}>
                      <Text style={styles.dataIsNotFoundText}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>
                  )}
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
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectionTrendView}>
                    <Text style={styles.wasteSummaryText}>
                      Distribution Trend ( Inerts Outflow)
                    </Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {distributeinertsvalue.length > 0 ? (
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{
                        x:
                          distributeinertsvalue.length < 3
                            ? 160
                            : distributeinertsvalue.length < 5
                              ? 85
                              : 8,
                      }}
                      domain={{
                        y: [0, Math.ceil(maxdata5 / 100) * datarefresh5 || 10],
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
                        data={distributeinertsvalue}
                        barWidth={8}
                        x="splitDate"
                        y="inerts"
                      />
                    </VictoryChart>
                  ) : (
                    <View style={styles.dataIsNotFoundView}>
                      <Text style={styles.dataIsNotFoundText}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>
                  )}
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
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <View style={styles.collectionTrendView}>
                <Text style={[styles.wasteSummaryText, { marginLeft: 10 }]}>
                  WTE Processed
                </Text>
              </View>
            </View>
            {rdf.length > 0 ? (
              <View>
                <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor="red"
                  paginationDefaultColor="grey"
                  showPagination={true}
                  paginationStyle={styles.paginationStyle}
                  paginationStyleItem={styles.paginationStyleItem}
                  data={array}
                  // @ts-ignore
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => {
                    return (
                      <>
                        {item[0]?.title && (
                          <View style={styles.flatlistmainview}>
                            <Text style={styles.swiperFlatlistText}>
                              {item[0]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            {item[0]?.title === "rdfReceipt" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} MT
                              </Text>
                            ) : item[0]?.title === "steamGeneration" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} TPD
                              </Text>
                            ) : item[0]?.title === "auxiliaryConsumption" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} MW
                              </Text>
                            ) : item[0]?.title === "powerProduced" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} MW
                              </Text>
                            ) : item[0]?.title === "ashGenerated" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} MT
                              </Text>
                            ) : item[0]?.title === "powerExport" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} MW
                              </Text>
                            ) : item[0]?.title === "rdfCombusted" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[0]?.value} MT
                              </Text>
                            ) : null}
                          </View>
                        )}
                        {item[1]?.title ? (
                          <View style={styles.flatlistmainview1}>
                            <Text style={styles.swiperFlatlistText}>
                              {item[1]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            {item[1]?.title === "rdfCombusted" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[1]?.value} MT
                              </Text>
                            ) : item[1]?.title === "powerProduced" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[1]?.value} MW
                              </Text>
                            ) : item[1]?.title === "ashGenerated" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[1]?.value} MT
                              </Text>
                            ) : item[1]?.title === "steamGeneration" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[1]?.value} TPD
                              </Text>
                            ) : item[1]?.title === "powerExport" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[1]?.value} MW
                              </Text>
                            ) : item[1]?.title === "auxiliaryConsumption" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[1]?.value} MW
                              </Text>
                            ) : null}
                          </View>
                        ) : (
                          <View style={styles.flatlistmainview3}></View>
                        )}
                        {item[2]?.title ? (
                          <View style={styles.flatlistmainview2}>
                            <Text style={styles.swiperFlatlistText}>
                              {item[2]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            {item[2]?.title === "ashGenerated" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[2]?.value} MT
                              </Text>
                            ) : item[2]?.title === "powerExport" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[2]?.value} MW
                              </Text>
                            ) : item[2]?.title === "powerProduced" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[2]?.value} MW
                              </Text>
                            ) : item[2]?.title === "auxiliaryConsumption" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[2]?.value} MW
                              </Text>
                            ) : item[2]?.title === "rdfCombusted" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[2]?.value} MT
                              </Text>
                            ) : item[2]?.title === "steamGeneration" ? (
                              <Text style={styles.swiperFlatlistText1}>
                                {item[2]?.value} TPD
                              </Text>
                            ) : null}
                          </View>
                        ) : (
                          <View style={styles.flatlistmainview3}></View>
                        )}
                      </>
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.dataIsNotFoundView1}>
                <Text style={styles.dataIsNotFoundText}>
                  {"Data Is Not Found."}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectionTrendView}>
                <Text style={styles.wasteSummaryText}>WTE Trend</Text>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {wtetrendvalue.length > 0 ? (
                <VictoryChart
                  width={width / 1.02}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={16}
                  domain={{
                    y: [0, Math.ceil(maxdata6 / 100) * datarefresh6 || 10],
                  }}
                >
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-13} />}
                  />
                  <VictoryAxis
                    dependentAxis={true}
                    tickLabelComponent={<VictoryLabel />}
                  />
                  <VictoryBar
                    barRatio={0.3}
                    style={{
                      data: {
                        fill: "#E87818",
                      },
                    }}
                    data={wtetrendvalue}
                  />
                </VictoryChart>
              ) : (
                <View style={styles.dataIsNotFoundView}>
                  <Text style={styles.dataIsNotFoundText}>
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
        <View style={styles.fourth}>
          <View>
            <View style={styles.fourthCardContainer}>
              <View style={styles.fourthRecycleView}>
                <Text style={styles.wasteSummaryText}>Recyclable Waste</Text>
              </View>
            </View>
          </View>
          <View style={styles.fourthRecycleView1}>
            {recyclableswaste.length > 0 ? (
              <VictoryPie
                colorScale={["#00B09E", "#E87818", "gold", "cyan", "navy"]}
                labels={({ datum }) => ` ${datum.x}\n${datum.y}`}
                data={recyclableswaste}
                width={width / 0.25}
                height={height / 2.6}
                animate={{
                  duration: 2000,
                }}
                labelComponent={<VictoryLabel angle={-20} />}
                style={{
                  labels: { fontSize: 10, fontWeight: "700", fill: "#DA0D14" },
                  data: {
                    fillOpacity: 0.9,
                    stroke: "white",
                    strokeWidth: 3,
                  },
                }}
              />
            ) : (
              <View style={styles.dataIsNotFoundView}>
                <Text style={styles.dataIsNotFoundText}>
                  {"Data Is Not Found."}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {calendarModal()}
      {clientCollected()}
      {clientProcessed()}
      {clientDistribute()}
      {clientWTE()}
      {client4()}
      {client5()}
      {isLoading && <Loader />}
    </View>
  );
};

export default withConnect(DashboardSiteHead);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  centeredView1: {
    height: height / 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  card1headingtext: {
    fontSize: 12,
    //  margin:5,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  modalView1: {
    height: height / 1.15,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "rgba(255, 255, 255, 0.8)",
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
  firstmodalmainView: {
    width: width / 1,
    marginTop: 30,
    alignItems: "center",
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
  contentCollection: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
  },
  SecondContainer1: {
    height: height / 2.2,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondContainer: {
    height: height / 2.1,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondcardContainer: {
    height: height / 2.4,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    width: width / 1.05,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
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
    color: "#606060",
    top: Platform.OS === 'ios' ? 14 : 10,
  },
  fourth: {
    height: height / 2.1,
    width: width / 1.05,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  SecondfirstcardmainView: {
    height: height / 16,
    width: width / 1.12,
    flexDirection: "row",
  },
  secondTwocardmainView: {
    height: height / 4,
    width: width / 1.12,
    // backgroundColor:"orange",
  },
  secondThreecardmaibView: {
    height: height / 10,
    width: width / 1.12,
    // backgroundColor:"pink",
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdContainer: {
    height: height / 3.7,
    width: width / 1,
    //  backgroundColor: COLORS.GREEN,
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
    height: height / 16,
    width: width / 1.13,
    // backgroundColor: "green",
    flexDirection: "row",
  },
  thirdcardFirstTwoView: {
    height: height / 4.3,
    width: width / 1.11,
    paddingVertical: 30,
    flexDirection: "row",
  },
  summary: {
    height: height / 7,
    width: width / 2.3,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  summary1: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    marginTop: 30,
    color: "#2D2D2D",
    fontWeight: "600",
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
    top: 10,
    flex: 0.8,
    marginHorizontal: 20,
    borderRadius: 20,
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
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
  secureInput: {
    color: "#000000",
    fontSize: 16,
    marginLeft: 10,
  },
  ans: {
    height: height / 20,
    backgroundColor: "#DEFDFB",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#a8d5e5",
  },
  clientview1: {
    width: width / 1.3,
    height: height / 28,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: "65%",
  },
  renderheader1image2: { tintColor: "black", top: 7, marginRight: 65 },
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
  client4image: {
    height: 22,
    width: 22,
    marginLeft: 280,
  },
  contentWte: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
  },
  helpCenterBackImage: {
    marginLeft: 30,
    marginTop: 25,
  },
  helpCenterDownImage: {
    tintColor: "black",
    marginRight: Platform.OS === 'ios' ? 10 : 8,
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
    marginLeft: Platform.OS === 'ios' ? -76 : -75,
  },
  helpCenterFaqDownImage: {
    marginRight: 12,
  },
  helpCenterFaqDownImage1: {
    marginLeft: Platform.OS === 'ios' ? -79 : -80,
  },
  helpCenterFaqView: {
    marginBottom: 30,
  },
  contactUsTouchableOpcacity: {
    borderRadius: 10,
  },
  faqTouchableOpcacity: {
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    top: 20,
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
    backgroundColor: "#D0FAE9",
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
    backgroundColor: "#F1E5FF",
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
    backgroundColor: "#E5F8FF",
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
  thirdContainer: {
    height: height / 3.5,
    backgroundColor: "#F8F8F8",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width / 1.05,
    borderRadius: 10,
  },
  thirdCardContainer: {
    height: height / 16,
    width: width / 1.12,
    flexDirection: "row",
  },
  thirdCardFirstOneView: {
    height: height / 16,
    width: width / 1.5,
    justifyContent: "center",
  },
  wasteSummaryText: {
    fontSize: 17,
    color: "#E41F45",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  yearDropDownView: {
    height: height / 16,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  calenderView: {
    height: height / 21,
    width: width / 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  calenderImage: {
    height: 33,
    width: 33,
  },
  wasteCollectedProcessedBoxText1: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    marginTop: 10,
  },
  collectionTrendView: {
    height: height / 16,
    width: width / 1.5,
    justifyContent: "center",
  },
  dataIsNotFoundView: {
    height: height / 4.3,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  dataIsNotFoundView1: {
    height: height / 6.7,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  dataIsNotFoundText: {
    textAlign: "center",
    fontSize: 18,
    color: "#2D2D2D",
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
    marginLeft: "13%",
  },
  weightmeticText: {
    fontSize: 12,
    color: "#2D2D2D",
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  fourthCardContainer: {
    height: height / 17,
    flexDirection: "row",
    width: width / 1.1,
  },
  fourthRecycleView: {
    height: height / 16,
    width: width / 1.5,
    justifyContent: "center",
  },
  fourthRecycleView1: {
    height: height / 2.5,
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiperChart: {
    position: "absolute",
    top: height / 2.3,
    right: 10,
    bottom: 0,
    left: 0,
  },
  paginationStyle: {
    top: Platform.OS === 'ios' ? 135 : 130,
  },
  paginationStyleItem: {
    width: 8,
    height: 8,
    marginLeft: -4,
  },
  segregationCollectedView: {
    flexDirection: "row",
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
    fontWeight: "700",
    color: "black",
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
    top: Platform.OS === 'ios' ? 18 : 16,
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
  segregationTitleText: {
    textAlign: "center",
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: "center",
    marginRight: 20,
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
});
