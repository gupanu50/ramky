import {
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Images } from "../../../../../Assets";
import { Dropdown } from "react-native-material-dropdown-v2";
import ModalHeader from "../../../../../ReuableComponent/ModalHeader";
import StepIndicator from "react-native-step-indicator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from "lodash";
import { ActionType } from "../../../../../Redux/Type";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";
import { COLORS, FONT_FAMILIES, METRICS } from "../../../../../Configration";
import withConnect from "./withConnect";
import { useDispatch } from "react-redux";
import ApiClient from '../../../../../Network';
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("screen");
import { VALIDATE_FORM } from "../../../../../Constant";
// @ts-ignore
const { RECYCLE_CRM_COLLECTION, RECYCLE_CRM_SEGREGATION, RECYCLE_CRM_PROCESSED } = ActionType;
const Footer = (props: any) => {
  const { user } = props;
  const dispatch = useDispatch();
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "gray",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "gray",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "gray",
    stepIndicatorCurrentColor: "gray",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const currentPosition = 1;
  const currentPosition1 = 2;
  const currentPosition2 = 1;
  const currentPosition3 = 2;
  const currentPosition4 = 3;
  const currentPosition5 = 4;
  const currentPosition6 = 5;
  const currentPosition7 = 6;
  const currentPosition8 = 1;
  const currentPosition9 = 2;
  const [isSelected, setSelected] = useState(0);
  const city = user.cities[0].city;
  const siteName = user.siteName[0].siteName;
  const email = user.email;
  const [collectwaste, setCollectedWaste] = useState({
    waste: "Recycle",
    location: city,
    quantitymeasure: "MT",
    siteName: siteName,
    comment: "",
    quantity: "",
  });
  const [segregationWaste, setSegregationWaste] = useState({
    location1: city,
    siteName: siteName,
    plastic: "",
    hdpe: "",
    ldpe: "",
    pet: "",
    pp: "",
    other: "",
    comment1: "",
    paper: "",
    cardboard: "",
    mixedpaper: "",
    onp: "",
    metal: "",
    glass: "",
    wood: "",
    quantitymeasure1: "MT",
    quantitymeasure2: "MT",
    quantitymeasure3: "MT",
    quantitymeasure4: "MT",
    quantitymeasure5: "MT",
    quantitymeasure11: "MT",
    quantitymeasure12: "MT",
    quantitymeasure13: "MT",
    quantitymeasure14: "MT",
    quantitymeasure15: "MT",
    quantitymeasure16: "MT",
    quantitymeasure17: "MT",
    quantitymeasure18: "MT",
  });
  const [processed, setProcessed] = useState({
    location2: city,
    siteName: siteName,
    totalwaste: "",
    regrints: "",
    ldpe: "",
    granules: "",
    others: "",
    comment2: "",
    quantitymeasure6: "MT",
    quantitymeasure7: "MT",
    quantitymeasure21: "MT",
    quantitymeasure8: "MT",
    quantitymeasure22: "MT",
    quantitymeasure9: "MT",
    quantitymeasure10: "MT",
  });

  const data = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [date1, setDate1] = useState();
  const [collectedValidationMessage, setcollectedValidationMessage] = useState(false);
  const [collectedCommentValidationMessage, setcollectedCommentValidationMessage] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const [totalPlasticMsg, setTotalPlasticMsg] = useState(false);
  const [hdpePlastic, setHdpePlastic] = useState(false);
  const [ldpePlasticMsg, setLdpePlasticMsg] = useState(false);
  const [ppPlasticMsg, setPpPlasticMsg] = useState(false);
  const [petPlasticMsg, setPetPlasticMsg] = useState(false);
  const [otherPlasticMsg, setOtherPlasticMsg] = useState(false);
  const [totalPaperMsg, setTotalPaperMsg] = useState(false);
  const [cardBoardMsg, setCardBoardMsg] = useState(false);
  const [mixedPaperMsg, setMixedPaperMsg] = useState(false);
  const [onpMsg, setOnpMsg] = useState(false);
  const [totalMetalmsg, setTotalMetalMsg] = useState(false);
  const [totalGlassMsg, setTotalGlassMsg] = useState(false);
  const [othersProductMsg, setOtherProductMsg] = useState(false);
  const [segregatedCommentValidationMessage, setSegregatedCommentValidationMessage] = useState(false);

  const [processedpet, setProcessedpet] = useState(false);
  const [processedHdpe, setProcessedHdpe] = useState(false);
  const [processedLdpe, setprocessedLdpe] = useState(false);
  const [ProcessedPp, setProcessedPp] = useState(false);
  const [Processedother, setProcessedother] = useState(false);
  const [processedCommentValidationMessage, setprocessedCommentValidationMessage] = useState(false);

  const [isSelected1, setSelected1] = useState(0);

  const data1 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data2 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isSelected2, setSelected2] = useState(0);
  const [date2, setDate2] = useState();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  const data3 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data4 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data5 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data6 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data7 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data21 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data8 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];

  const data22 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];

  // *******************Collect Validation Method********************************
  let validationMessage;

  const validationCollect = () => {
    if (_.isEmpty(collectwaste?.waste.trim())) {
      initialController();
      return false;
    }
    else if (_.isEmpty(collectwaste?.quantity.trim())) {
      setcollectedValidationMessage(true);
      initialController();
      return false;
    }
    else if (_.isEmpty(collectwaste.comment.trim())) {
      setcollectedValidationMessage(false);
      setcollectedCommentValidationMessage(true);
      initialControllersecond();
      return false;
    }
    if (!_.isEmpty(validationMessage)) {
      showMessage({ message: validationMessage, type: "danger" });
      return false;
    }
    return true;
  };
  const collectSaveValidation = () => {
    if (validationCollect()) {
      setShowModal(false);
      collectDataSave();
      clearCollectData();
      initialController();
    }
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController = () => {
    setSelected(0);
  };
  const initialControllersecond = () => {
    setSelected(1);
  };
  // *******************Segregation Validation Method********************************

  const validationSegregation = () => {
    if (_.isEmpty(segregationWaste?.plastic.trim())) {
      setTotalPlasticMsg(true);
      initialController1(0);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.hdpe.trim())) {
      setTotalPlasticMsg(false);
      setHdpePlastic(true);
      initialController1(0);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.ldpe.trim())) {
      setHdpePlastic(false);
      setLdpePlasticMsg(true);
      initialController1(0);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.pp.trim())) {
      setLdpePlasticMsg(false);
      setPpPlasticMsg(true);
      initialController1(0);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.pet.trim())) {
      setPpPlasticMsg(false);
      setPetPlasticMsg(true);
      initialController1(0);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.other.trim())) {
      setPetPlasticMsg(false);
      setOtherPlasticMsg(true);
      initialController1(0);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.paper.trim())) {
      setOtherPlasticMsg(false);
      setTotalPaperMsg(true);
      initialController1(1);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.cardboard.trim())) {
      setTotalPaperMsg(false);
      setCardBoardMsg(true);
      initialController1(1);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.mixedpaper.trim())) {
      setCardBoardMsg(false);
      setMixedPaperMsg(true);
      initialController1(1);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.onp.trim())) {
      setMixedPaperMsg(false);
      setOnpMsg(true);
      initialController1(1);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.metal.trim())) {
      setOnpMsg(false);
      setTotalMetalMsg(true);
      initialController1(2);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.glass.trim())) {
      setTotalMetalMsg(false);
      setTotalGlassMsg(true);
      initialController1(3);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.wood.trim())) {
      setTotalGlassMsg(false);
      setOtherProductMsg(true);
      initialController1(4);
      return false;
    }
    else if (_.isEmpty(segregationWaste?.comment1.trim())) {
      setOtherProductMsg(false);
      setSegregatedCommentValidationMessage(true);
      initialController1(5);
      return false;
    }
    if (!_.isEmpty(validationMessage)) {
      showMessage({ message: validationMessage, type: "danger" });
      return false;
    }
    return true;
  };
  const SegregationSaveValidation = () => {
    if (validationSegregation()) {
      setShowModal1(false),
        segregationDataSave();
      clearSegregationData(),
        InitialController1();
    }
  };

  // ********************************Modal Starting From 0 Index Method***************
  const initialController1 = (page: any) => {
    setSelected1(page);
  };

  // *******************Processed Validation Method********************************

  const validationProcessed = () => {
    if (_.isEmpty(processed?.totalwaste.trim())) {
      setProcessedpet(true);
      initialController2(0);
      return false;
    }
    else if (_.isEmpty(processed?.regrints.trim())) {
      setProcessedpet(false);
      setProcessedHdpe(true);
      initialController2(0);
      return false;
    }
    else if (_.isEmpty(processed?.ldpe.trim())) {
      setProcessedHdpe(false);
      setprocessedLdpe(true);
      initialController2(0);
      return false;
    }
    else if (_.isEmpty(processed?.granules.trim())) {
      setprocessedLdpe(false);
      setProcessedPp(true);
      initialController2(0);
      return false;
    }
    else if (_.isEmpty(processed?.others.trim())) {
      setProcessedPp(false);
      setProcessedother(true);
      initialController2(0);
      return false;
    }
    else if (_.isEmpty(processed?.comment2.trim())) {
      setProcessedother(false);
      setprocessedCommentValidationMessage(true);
      initialController2(1);
      return false;
    }
    return true;
  };
  const ProcessedSaveValidation = () => {
    if (validationProcessed()) {
      setShowModal2(false),
        processedDataSave(),
        clearProcessedData(),
        InitialController2();
    }
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController2 = (page: any) => {
    setSelected2(page);
  };

  // ***********************Collect Save And GET API******************
  const collectDataSave = async () => {
    // @ts-ignore
    var time = (moment(collectwaste?.date).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      comments: collectwaste?.comment,
      date: dateTime1,
      location: collectwaste?.location,
      // @ts-ignore 
      siteName: [{ siteName: collectwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      totalScrap: (collectwaste?.quantity) + " " + (collectwaste?.quantitymeasure),

      wasteType: collectwaste?.waste,
    };
    console.log("colectsavedata", body);
    const result = await ApiClient.createApiClient().recycleCrmSaveCollectionData(body);
    console.log("colectsavedataresult", result);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      getCollectionApi();
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  const getCollectionApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().recyclecrmCollectedTable(params);
    //  @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
          var quantity = 0;
          filterDateArr.forEach(item => {
            quantity = quantity + item.totalScrap ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, quantity });
        });
      }
      // @ts-ignore
      dispatch({ type: RECYCLE_CRM_COLLECTION, payload: displayArr });
    }
  };
  // ***********************Segregation Save And GET API******************
  const segregationDataSave = async () => {
    // @ts-ignore
    var time = (moment(segregationWaste?.date1).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      cardboard: (segregationWaste?.cardboard) + " " + (segregationWaste?.quantitymeasure13),
      // @ts-ignore
      comments: segregationWaste?.comment1,
      // @ts-ignore
      date: dateTime1,
      userEmail: email,
      // @ts-ignore
      hdpePlastic: (segregationWaste?.hdpe) + " " + (segregationWaste?.quantitymeasure2),
      // @ts-ignore
      ldpePlastic: (segregationWaste?.ldpe) + " " + (segregationWaste?.quantitymeasure3),
      location: segregationWaste?.location1,
      mixedPaper: (segregationWaste?.mixedpaper) + " " + (segregationWaste?.quantitymeasure14),
      onp: (segregationWaste?.onp) + " " + (segregationWaste?.quantitymeasure15),
      // @ts-ignore
      othersPlastic: (segregationWaste?.other) + " " + (segregationWaste?.quantitymeasure11),
      // @ts-ignore
      petPlastic: (segregationWaste?.pet) + " " + (segregationWaste?.quantitymeasure5),
      // @ts-ignore
      ppPlastic: (segregationWaste?.pp) + " " + (segregationWaste?.quantitymeasure4),
      // @ts-ignore
      siteName: [{ siteName: segregationWaste?.siteName }],
      totalGlass: (segregationWaste?.glass) + " " + (segregationWaste?.quantitymeasure17),
      totalMetal: (segregationWaste?.metal) + " " + (segregationWaste?.quantitymeasure16),
      totalPaper: (segregationWaste?.paper) + " " + (segregationWaste?.quantitymeasure12),
      totalPlastic: (segregationWaste?.plastic) + " " + (segregationWaste?.quantitymeasure1),
      othersProduct: (segregationWaste?.wood) + " " + (segregationWaste?.quantitymeasure18),
    };
    console.log("mynew", body);
    const result = await ApiClient.createApiClient().recycleCrmSaveSegregatedData(body);
    console.log("Seg Result", result);
    // @ts-ignore
    if (result.data && result.data.status === true) {

      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      getSegregationData();
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  const getSegregationData = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().recyclecrmsegregatedtable(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
          var plastic = 0;
          var paper = 0;
          var metal = 0;
          var glass = 0;
          var others = 0;
          filterDateArr.forEach(item => {
            plastic = plastic + item.totalPlastic ?? 0;
            paper = paper + item.totalPaper ?? 0;
            metal = metal + item.totalMetal ?? 0;
            glass = glass + item.totalGlass ?? 0;
            others = others + item.othersProduct ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, plastic, paper, metal, glass, others });
        });
      }
      // @ts-ignore
      dispatch({ type: RECYCLE_CRM_SEGREGATION, payload: displayArr });
    }
  };
  // ***********************Processed Save And GET API******************
  const processedDataSave = async () => {
    // @ts-ignore
    var time = (moment(processed?.date2).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      comments: processed?.comment2,
      date: dateTime1,
      location: processed?.location2,
      pet: (processed?.totalwaste) + " " + (processed?.quantitymeasure6),
      hdpe: (processed?.regrints) + " " + (processed?.quantitymeasure7),
      ldpe: (processed?.ldpe) + " " + (processed?.quantitymeasure21),
      pp: (processed?.granules) + " " + (processed?.quantitymeasure8),
      others: (processed?.others) + " " + (processed?.quantitymeasure22),
      siteName: [{ siteName: processed?.siteName }],
      userEmail: email,
    };

    console.log("newlogs", body);
    const result = await ApiClient.createApiClient().recycleCrmSaveProcessedData(body);
    console.log("newdataddd", result);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      getProcessedData();
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  const getProcessedData = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().recyclecrmprocessedtable(params);
    {/* @ts-ignore */ }
    if (result.status && result.data.status === true) {
      {/* @ts-ignore */ }
      if ((result?.data?.data ?? []).length > 0) {
        {/* @ts-ignore */ }
        const arr = (result?.data?.data ?? []);
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
          var pet = 0;
          var hdpe = 0;
          var ldpe = 0;
          var pp = 0;
          var others = 0;
          filterDateArr.forEach(item => {
            pet = pet + item.pet ?? 0;
            hdpe = hdpe + item.hdpe ?? 0;
            ldpe = ldpe + item.ldpe ?? 0;
            pp = pp + item.pp ?? 0;
            others = others + item.others ?? 0;

          });
          // @ts-ignore
          displayArr.push({ date: element, pet, hdpe, ldpe, pp, others });
        });
      }
      // @ts-ignore
      dispatch({ type: RECYCLE_CRM_PROCESSED, payload: displayArr });
    }
  };
  // *******************Date Selection Method For Collect*****************
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(date);
    // @ts-ignore
    setCollectedWaste({ ...collectwaste, date });
    hideDatePicker();
  };
  // *******************Date Selection Method For Segregation*****************
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = (date1) => {
    setDate1(date1);
    // @ts-ignore
    setSegregationWaste({ ...segregationWaste, date1 });
    hideDatePicker1();
  };
  // *******************Date Selection Method For Processed*****************
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = (date2) => {
    setDate2(date2);
    // @ts-ignore
    setProcessed({ ...processed, date2 });
    hideDatePicker2();
  };
  // **********************Collect Modal Going Next Page*******************
  const ProcessstepsController = () => {
    setSelected(isSelected + 1);
  };
  // **********************Segregation Modal Going Next Page*******************
  const ProcessstepsController1 = () => {
    setSelected1(isSelected1 + 1);
  };
  // **********************Processed Modal Going Next Page*******************
  const ProcessstepsController2 = () => {
    setSelected2(isSelected2 + 1);
  };
  // **********************Collect Modal Going Previous Page*******************
  const ProcessstepsbackController = () => {
    setSelected(isSelected - 1);
  };
  // **********************Segregation Modal Going Previous Page*******************
  const ProcessstepsbackController1 = () => {
    setSelected1(isSelected1 - 1);
  };
  // **********************Processed Modal Going Previous Page*******************
  const ProcessstepsbackController2 = () => {
    setSelected2(isSelected2 - 1);
  };
  //************************ Data Clearing Methods***************
  const clearCollectData = () => {
    setCollectedWaste({
      ...collectwaste,
      // @ts-ignore
      quantity: "",
      comment: "",
      quantitymeasure: "MT",
    });
    // @ts-ignore
    setDate(null),
      setcollectedValidationMessage(false),
      setcollectedCommentValidationMessage(false);
  };
  const clearSegregationData = () => {
    setSegregationWaste({
      ...segregationWaste,
      // @ts-ignore
      plastic: "",
      hdpe: "",
      ldpe: "",
      pet: "",
      pp: "",
      other: "",
      comment1: "",
      paper: "",
      cardboard: "",
      mixedpaper: "",
      onp: "",
      metal: "",
      glass: "",
      wood: "",
      quantitymeasure1: "MT",
      quantitymeasure2: "MT",
      quantitymeasure3: "MT",
      quantitymeasure4: "MT",
      quantitymeasure5: "MT",
      quantitymeasure11: "MT",
      quantitymeasure12: "MT",
      quantitymeasure13: "MT",
      quantitymeasure14: "MT",
      quantitymeasure15: "MT",
      quantitymeasure16: "MT",
      quantitymeasure17: "MT",
      quantitymeasure18: "MT",
    });
    // @ts-ignore
    setDate1(null),
      setPetPlasticMsg(false),
      setPpPlasticMsg(false),
      setLdpePlasticMsg(false),
      setHdpePlastic(false),
      setTotalPlasticMsg(false),
      setOtherPlasticMsg(false),
      setOtherProductMsg(false),
      setTotalGlassMsg(false),
      setTotalMetalMsg(false),
      setOnpMsg(false),
      setMixedPaperMsg(false),
      setCardBoardMsg(false),
      setTotalPaperMsg(false),
      setSegregatedCommentValidationMessage(false);
  };

  const clearProcessedData = () => {
    setProcessed({

      ...processed,
      // @ts-ignore
      totalwaste: "",
      regrints: "",
      ldpe: "",
      granules: "",
      others: "",
      // @ts-ignore
      comment2: "",
      quantitymeasure6: "MT",
      quantitymeasure7: "MT",
      quantitymeasure21: "MT",
      quantitymeasure8: "MT",
      quantitymeasure22: "MT",
      quantitymeasure9: "MT",
      quantitymeasure10: "MT",
    });
    // @ts-ignore
    setDate2(null),
      setProcessedother(false),
      setProcessedPp(false),
      setprocessedLdpe(false),
      setProcessedHdpe(false),
      setProcessedpet(false),
      setprocessedCommentValidationMessage(false);
  };
  // ************************* Modal Open At Starting After Submission Methods*********
  const InitialController = () => {
    setSelected(0);
  };

  const InitialController1 = () => {
    setSelected1(0);
  };

  const InitialController2 = () => {
    setSelected2(0);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firsticonView}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Image source={Images.collect} style={styles.mainimage} />
          <Text style={styles.maintext}>Collect </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondiconView}>
        <TouchableOpacity onPress={() => setShowModal1(!showModal1)}>
          <Image source={Images.sorting} style={styles.mainimage1} />
          <Text style={styles.maintext}>Segregation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ThirdiconView}>
        <TouchableOpacity onPress={() => setShowModal2(!showModal2)}>
          <Image source={Images.distribute} style={styles.mainimage2} />
          <Text style={styles.maintext}>Processed</Text>
        </TouchableOpacity>
      </View>
      {/* Collect......Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);

        }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.progressstep1view}>
                {isSelected == 0 && (
                  <View style={styles.collectfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
                      <View style={styles.collectfirstsectiontopbarview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected >= 1 ? (
                      <View style={styles.collectmodalheadermainview}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false), clearCollectData();
                          }}
                        >
                          <Image source={Images.backarrow} />
                        </TouchableOpacity>
                        <Text style={styles.collectsecondsectionheadertext}>
                          Collect
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => {
                              setShowModal(false), clearCollectData();
                            }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.collectsecondsectionheadertext}>
                              Collect
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={[
                        styles.collectfirstsectionstepindicatorview,
                        { top: 0 },
                      ]}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        stepCount={2}
                      />
                    </View>
                    <View
                      style={[
                        styles.collectfirstsectiondatamaincontainerview,
                        { top: 0 },
                      ]}
                    >
                      <View
                        style={styles.collectfirstsectionTotalwastemainview}
                      >
                        <View style={styles.collectfirstsectionTotalwasteview}>
                          <Text style={styles.collectWasteType}>
                            Waste Type
                          </Text>
                        </View>
                        <View style={styles.collectfirstsectionwastemainview}>
                          <View
                            pointerEvents="none"
                            style={styles.collectfirstsectionwasteview}
                          >
                            <TextInput
                              style={styles.collectWasteTypeTextInput}
                              editable={false}
                              value={collectwaste?.waste ?? ""}
                            />
                          </View>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.collectfirstsectionquantitymainview,
                          { top: 0 },
                        ]}
                      >
                        <View style={styles.collectfirstsectionquantityview}>
                          <Text style={styles.segregationMainText}>
                            Total Scrap
                            <Text style={styles.dateAstring12}>*</Text>
                          </Text>
                        </View>
                        <View style={styles.collectfirstsectionweightmainview}>
                          <View style={styles.collectfirstsectionweightview}>
                            <TextInput
                              keyboardType="number-pad"
                              placeholder={"Weight"}
                              style={styles.collectQuantityTextInput}
                              //   @ts-ignore
                              value={collectwaste?.quantity ?? ""}
                              placeholderTextColor={COLORS.BLACK}
                              selectionColor={COLORS.BLACK}
                              onChangeText={(text) => {
                                setcollectedValidationMessage(false);
                                //   @ts-ignore
                                setCollectedWaste({
                                  ...collectwaste,
                                  // @ts-ignore
                                  quantity: text,
                                });
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={styles.collectfirstsectiondropdownmainview}
                        >
                          <View style={styles.collectfirstsectiondropdownview}>
                            <Dropdown
                              data={data}
                              value={collectwaste?.quantitymeasure ?? ""}
                              onChangeText={(text) =>
                                setCollectedWaste({
                                  ...collectwaste,
                                  quantitymeasure: text,
                                })
                              }
                              underlineColor="transparent"
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmImage}
                            />
                          </View>
                        </View>
                      </View>
                      {collectedValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.TOTALSCRAP}</Text>}
                    </View>
                  </View>
                )}
                {isSelected == 1 && (
                  <View style={styles.collectsecondsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
                      <View style={styles.collectsecondsectiontopbarview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected >= 1 ? (
                      <View style={styles.collectsecondsectionheadermainview}>
                        <View style={styles.collectsecondsectionheaderbackview}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.collectsecondsectionheadercollectview}
                        >
                          <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={styles.collectsecondsectionheadertext}>
                              Collect
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false);
                          }}
                        >
                          <ModalHeader title={"Collect"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.collectsecondsectionstepindicatorview}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition1}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.collectsecondsectionmaininputsview}>
                      <View style={styles.collectsecondsectiondatemainview}>
                        <View style={styles.collectsecondsectiondateview}>
                          <Text style={styles.dateText}>Select Date
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={styles.collectsecondsectiondatepickermainview}
                        >
                          <View
                            style={styles.collectsecondsectiondatepickerview}
                          >
                            <TouchableOpacity onPress={showDatePicker}>
                              <Text style={styles.sortingModelDateText}>
                                {date
                                  ? moment(date).format("DD-MM-YYYY")
                                  : "Select Date"}
                              </Text>

                              <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                maximumDate={new Date()}
                                // @ts-ignore
                                value={collectwaste?.dateselection ?? ""}
                                onChangeText={(text) =>
                                  setCollectedWaste({
                                    ...collectwaste,
                                    // @ts-ignore
                                    dateselection: text,
                                  })
                                }
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.locationMainText}>Location

                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.collectLocationTextField}
                              editable={false}
                              value={collectwaste?.location ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.locationMainText}>Site Name
                          </Text>
                        </View>
                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview123}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.segregationLocationTextField}
                              editable={false}
                              value={collectwaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectioncommentview}>
                        <TextInput
                          style={!collectwaste?.comment ? styles.commentTextInput : styles.commentTextInput1}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          // @ts-ignore
                          value={collectwaste?.comment ?? ""}
                          onChangeText={(text) => {
                            setcollectedCommentValidationMessage(false);
                            // @ts-ignore
                            setCollectedWaste({
                              ...collectwaste,
                              // @ts-ignore
                              comment: text,
                            });
                          }}
                        />
                        {!collectwaste?.comment && <Text style={styles.commentAstring1234}>*</Text>}
                      </View>
                      {collectedCommentValidationMessage && <Text style={styles.validationMessageStyleComment}>{VALIDATE_FORM.PROCESSINGCOMMENT}</Text>}
                    </View>
                  </View>
                )}
                {isSelected == 2 && (
                  <View style={styles.collectthirdsectionmainview}>
                    <View style={styles.collectthirdsectiontopbarview}>
                      <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
                        <View style={styles.collectfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected >= 1 ? (
                      <View style={styles.collectthirdsectionheadermainview}>
                        <View style={styles.collectthirdsectionbackimageview}>
                          <TouchableOpacity
                            onPress={() => { ProcessstepsbackController(); }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.collectthirdsectionheadertextview}>
                          <Text style={styles.collectthirdsectionheadertext}>
                            Review
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false);
                          }}
                        >
                          <ModalHeader title={"Collect"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.collectthirdsectionmainflatlistview}>
                      <View style={styles.collectreviewmaininputview}>
                        <View style={styles.collectwastetypeview}>
                          <Text style={styles.collectwastetext}>
                            Waste Type -{" "}
                          </Text>
                          <Text style={styles.collectwasteresponsetext}>
                            {collectwaste?.waste}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.collectquantityview,
                            { flexDirection: "row" },
                          ]}
                        >
                          <Text style={styles.collectquantitytext}>
                            Quantity -{" "}
                          </Text>
                          <Text style={styles.collectquantityresponsetext}>
                            {/* @ts-ignore */}
                            {collectwaste?.quantity}
                          </Text>
                          <Text
                            style={styles.collectquantitymeasuresresponsetext}
                          >
                            {" "}
                            {collectwaste?.quantitymeasure}
                          </Text>
                        </View>
                        <View style={styles.collectdatetimeview}>
                          <Text style={styles.collectdatetimetext}>
                            Date & Time -{" "}
                          </Text>
                          <Text style={styles.collectdatetimeresponsetext}>
                            {/* @ts-ignore */}
                            {moment(collectwaste?.date).format("YYYY-MM-DD") +
                              " " +
                              moment().format(`HH:mm:ss`)}
                          </Text>
                        </View>
                        <View style={styles.collectlocationview}>
                          <Text style={styles.collectlocationtext}>
                            Site Name -{" "}
                          </Text>
                          <Text style={styles.collectlocationresponsetext}>
                            {collectwaste?.siteName}
                          </Text>
                        </View>
                        <View style={styles.collectcommentview}>
                          <Text style={styles.collectcommenttext}>
                            Comments -{" "}
                          </Text>
                          <Text style={styles.collectcommentresponsetext}>
                            {/* @ts-ignore */}
                            {collectwaste?.comment}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.mainview}>
                  {isSelected < 2 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacity}
                      onPress={() => {
                        ProcessstepsController();
                      }}
                    >
                      <Text style={styles.maintouchableopacitytext}>Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.mainview1}>
                      <View style={styles.mainview2}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false),
                              clearCollectData(),
                              InitialController();
                          }}
                        >
                          <View style={styles.mainview3}>
                            <Text style={styles.maintext1}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.mainview4}>
                        <TouchableOpacity
                          onPress={() => {
                            collectSaveValidation();
                          }}
                        >
                          <View style={styles.mainview5}>
                            <Text style={styles.maintext1}>Submit</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      {/*  Segregation ....... Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal1}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setShowModal1(false);
        }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <View style={styles.progressstep1view}>
                {isSelected1 == 0 && (
                  <View style={styles.segregationfirstsectionmainview}>
                    <TouchableOpacity onPress={() => {
                      setShowModal1(false), clearSegregationData(), InitialController1();
                    }}>
                      <View style={styles.processingfirstsectiontopbarview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View
                          style={
                            styles.processingfirstsectionheaderbackimagrview
                          }
                        >
                          <TouchableOpacity
                            onPress={() => setShowModal1(false)}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Segregation
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View
                          style={
                            styles.processingfirstsectionheaderbackimagrview
                          }
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setShowModal1(false), clearSegregationData();

                            }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Product - Plastic
                          </Text>
                        </View>
                      </View>
                    )}
                    <View style={styles.segregationPicView}>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Plastics}
                      >
                        <Text style={styles.segragationImageText}>Plastics</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Paper}
                      >
                        <Text style={styles.segragationImageText1}>Paper</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Metal}
                      >
                        <Text style={styles.segragationImageText1}>Metal</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Glass}
                      >
                        <Text style={styles.segragationImageText1}>Glass</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Wood}
                      >
                        <Text style={styles.segragationImageText1}>Others</Text>
                      </ImageBackground>
                    </View>
                    <View
                      style={styles.processingfirstsectionstepindicatopview}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition2}
                        stepCount={6}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainplasticview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Total Plastic
                            <Text style={styles.dateAstringplastic}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.plastic ?? ""}
                              onChangeText={(text) => {
                                setTotalPlasticMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  plastic: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data1}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure1 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure1: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalPlasticMsg && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.SEGTOTALPLASTIC}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainplasticview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            HDPE Plastic
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.hdpe ?? ""}
                              onChangeText={(text) => {
                                setHdpePlastic(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  hdpe: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data1}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure2 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure2: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {hdpePlastic && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.SEGHDPE}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainplasticview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            LDPE Plastic
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.ldpe ?? ""}
                              onChangeText={(text) => {
                                setLdpePlasticMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  ldpe: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data1}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure3 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure3: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>

                      </View>
                      {ldpePlasticMsg && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.SEGLDPE}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainplasticview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            PP Plastic
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.pp ?? ""}
                              onChangeText={(text) => {
                                setPpPlasticMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  pp: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data1}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure4 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure4: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {ppPlasticMsg && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.SEGPP}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainplasticview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            PET Plastic
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              editable={true}
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.pet ?? ""}
                              onChangeText={(text) => {
                                setPetPlasticMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  pet: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data1}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure5 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure5: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {petPlasticMsg && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.SEGPET}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainplasticview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Others Plastic
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.other ?? ""}
                              onChangeText={(text) => {
                                setOtherPlasticMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  other: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data1}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure11 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure11: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {otherPlasticMsg && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.SEGOTHERPLASTIC}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 1 && (
                  <View style={styles.processedfirstsectionmainview}>
                    <TouchableOpacity onPress={() => {
                      setShowModal1(false), clearSegregationData(), InitialController1();
                    }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.sortingModelText}>
                              Product - Paper
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader
                            title={"Segregation"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.segregationPicView}>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Plastics}
                      >
                        <Text style={styles.segragationImageText1}>Plastics</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Paper}
                      >
                        <Text style={styles.segragationImageText}>Paper</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Metal}
                      >
                        <Text style={styles.segragationImageText1}>Metal</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Glass}
                      >
                        <Text style={styles.segragationImageText1}>Glass</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Wood}
                      >
                        <Text style={styles.segragationImageText1}>Others</Text>
                      </ImageBackground>
                    </View>
                    <View style={styles.sortingModelView9}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition3}
                        stepCount={6}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainpaperview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Total Paper
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.paper ?? ""}
                              onChangeText={(text) => {
                                setTotalPaperMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  paper: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data2}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure12 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure12: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />

                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalPaperMsg && <Text style={styles.validationMessagePaperStyle}>{VALIDATE_FORM.SEGTOTALPAPER}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainpaperview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Card Board
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.cardboard ?? ""}
                              onChangeText={(text) => {
                                setCardBoardMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  cardboard: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data2}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure13 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure13: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {cardBoardMsg && <Text style={styles.validationMessagePaperStyle}>{VALIDATE_FORM.SEGCARDBOARD}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainpaperview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Mixed Paper
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.mixedpaper ?? ""}
                              onChangeText={(text) => {
                                setMixedPaperMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  mixedpaper: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data2}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure14 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure14: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {mixedPaperMsg && <Text style={styles.validationMessagePaperStyle}>{VALIDATE_FORM.SEGMIXEDPAPAER}</Text>}
                      <View
                        style={styles.processingfirstsectiomtotalwastemainpaperview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            ONP
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.onp ?? ""}
                              onChangeText={(text) => {
                                setOnpMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  onp: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data2}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure15 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure15: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {onpMsg && <Text style={styles.validationMessagePaperStyle}>{VALIDATE_FORM.SEGONP}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 2 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity onPress={() => {
                      setShowModal1(false), clearSegregationData(), InitialController1();
                    }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.sortingModelText}>
                              Product - Metal
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader
                            title={"Segregation"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.segregationPicView}>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Plastics}
                      >
                        <Text style={styles.segragationImageText1}>Plastics</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Paper}
                      >
                        <Text style={styles.segragationImageText1}>Paper</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Metal}
                      >
                        <Text style={styles.segragationImageText}>Metal</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Glass}
                      >
                        <Text style={styles.segragationImageText1}>Glass</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Wood}
                      >
                        <Text style={styles.segragationImageText1}>Others</Text>
                      </ImageBackground>
                    </View>
                    <View style={styles.sortingModelView9}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition4}
                        stepCount={6}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Total Metal
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.metal ?? ""}
                              onChangeText={(text) => {
                                setTotalMetalMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  metal: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data3}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure16 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure16: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalMetalmsg && <Text style={styles.validationMessagemetalStyle}>{VALIDATE_FORM.SEGTOTALMETAL}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 3 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity onPress={() => {
                      setShowModal1(false), clearSegregationData(), InitialController1();
                    }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.sortingModelText}>
                              Product - Glass

                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader
                            title={"Segregation"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.segregationPicView}>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Plastics}
                      >
                        <Text style={styles.segragationImageText1}>Plastics</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Paper}
                      >
                        <Text style={styles.segragationImageText1}>Paper</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Metal}
                      >
                        <Text style={styles.segragationImageText1}>Metal</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Glass}
                      >
                        <Text style={styles.segragationImageText}>Glass</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Wood}
                      >
                        <Text style={styles.segragationImageText1}>Others</Text>
                      </ImageBackground>
                    </View>
                    <View style={styles.sortingModelView9}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition5}
                        stepCount={6}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            Total Glass
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.glass ?? ""}
                              onChangeText={(text) => {
                                setTotalGlassMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  glass: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data4}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure17 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure17: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalGlassMsg && <Text style={styles.validationMessagemetalStyle}>{VALIDATE_FORM.SEGTOTALGLASS}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 4 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity onPress={() => {
                      setShowModal1(false), clearSegregationData(), InitialController1();
                    }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.sortingModelText}>
                              Product - Others
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader
                            title={"Segregation"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.segregationPicView}>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Plastics}
                      >
                        <Text style={styles.segragationImageText1}>Plastics</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Paper}
                      >
                        <Text style={styles.segragationImageText1}>Paper</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Metal}
                      >
                        <Text style={styles.segragationImageText1}>Metal</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Glass}
                      >
                        <Text style={styles.segragationImageText1}>Glass</Text>
                      </ImageBackground>

                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Wood}
                      >
                        <Text style={styles.segragationImageText}>Others</Text>
                      </ImageBackground>
                    </View>
                    <View style={styles.sortingModelView9}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition6}
                        stepCount={6}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={[styles.segregationMainText, { top: Platform.OS === 'ios' ? 10 : 10 }]}>
                            Others Product
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.segregationTextInput}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={segregationWaste?.wood ?? ""}
                              onChangeText={(text) => {
                                setOtherProductMsg(false);
                                setSegregationWaste({
                                  ...segregationWaste,
                                  // @ts-ignore
                                  wood: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data5}
                              underlineColor="transparent"
                              value={segregationWaste?.quantitymeasure18 ?? ""}
                              onChangeText={(text) =>
                                setSegregationWaste({
                                  ...segregationWaste,
                                  quantitymeasure18: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>

                      </View>
                      {othersProductMsg && <Text style={styles.validationMessagemetalStyle}>{VALIDATE_FORM.SEGWOOD}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 5 && (
                  <View
                    style={{
                      height: height / 1.65,
                      width: width / 1,
                    }}
                  >
                    <TouchableOpacity onPress={() => {
                      setShowModal1(false), clearSegregationData(), InitialController1();
                    }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.sortingModelText}>
                              Product
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader
                            title={"Segregation"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.sortingModelView9}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition7}
                        stepCount={6}
                      />
                    </View>
                    <View style={styles.sortingModelView10}>
                      <View style={styles.sortingModelView5}>
                        <View style={styles.sortingModelView11}>
                          <Text style={styles.dateText}>Select Date
                            <Text style={styles.dateAstringselect}> *</Text>
                          </Text>
                        </View>

                        <View style={styles.sortingModelView12}>
                          <View style={styles.sortingModelView13}>
                            <TouchableOpacity onPress={showDatePicker1}>
                              <Text style={styles.sortingModelDateText}>
                                {date1
                                  ? moment(date1).format("DD-MM-YYYY")
                                  : "Select Date"}
                              </Text>

                              <DateTimePickerModal
                                isVisible={isDatePickerVisible1}
                                mode="date"
                                maximumDate={new Date()}
                                onConfirm={handleConfirm1}
                                onCancel={hideDatePicker1}
                                // @ts-ignore
                                value={segregationWaste?.dateselection1 ?? ""}
                                onChangeText={(text) =>
                                  setSegregationWaste({
                                    ...segregationWaste,
                                    // @ts-ignore
                                    dateselection1: text,
                                  })
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.locationMainText}>Location

                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.segregationLocationTextField}
                              editable={false}
                              value={segregationWaste?.location1 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.locationMainText}>Site Name
                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview123
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.collectLocationTextField}
                              editable={false}
                              value={segregationWaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.sortingModelView15}>
                        <TextInput
                          style={!segregationWaste?.comment1 ? styles.commentTextInput : styles.commentTextInput1}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          // @ts-ignore
                          value={segregationWaste?.comment1 ?? ""}
                          onChangeText={(text) => {
                            setSegregatedCommentValidationMessage(false);
                            setSegregationWaste({
                              ...segregationWaste,
                              // @ts-ignore
                              comment1: text,
                            });
                          }}
                        />
                        {!segregationWaste.comment1 && <Text style={styles.commentAstringsegregation}>*</Text>}
                      </View>
                      {segregatedCommentValidationMessage && <Text style={styles.validationMessageStyleComment}>{VALIDATE_FORM.PROCESSINGCOMMENT}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 6 && (
                  <View style={styles.sortingModelView7}>
                    <View style={styles.sortingModelView8}>
                      <TouchableOpacity onPress={() => {
                        setShowModal1(false), clearSegregationData(), InitialController1();
                      }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.collectModelView2}>
                          <Text style={styles.sortingModelReview}>Review</Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader
                            title={"Segregation"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.sortingModelView16}>
                      <View>
                        <View style={styles.collectreviewmaininputview}>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Plastic -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {segregationWaste?.plastic}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {segregationWaste?.quantitymeasure1}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Paper -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {segregationWaste?.paper}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {segregationWaste?.quantitymeasure2}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Metal -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {segregationWaste?.metal}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {segregationWaste?.quantitymeasure3}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Glass -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore  */}
                                {segregationWaste?.glass}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {segregationWaste?.quantitymeasure4}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Others Product-{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {segregationWaste?.wood}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {segregationWaste?.quantitymeasure5}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.collectdatetimeview}>
                            <Text style={styles.collectdatetimetext}>
                              Date & Time -{" "}
                            </Text>
                            <Text style={styles.collectdatetimeresponsetext}>
                              {/* @ts-ignore */}
                              {moment(segregationWaste?.date1).format(
                                "YYYY-MM-DD"
                              ) +
                                " " +
                                moment().format(`HH:mm:ss`)}
                            </Text>
                          </View>
                          <View style={styles.collectlocationview}>
                            <Text style={styles.collectlocationtext}>
                              Site Name -{" "}
                            </Text>
                            <Text style={styles.collectlocationresponsetext}>
                              {segregationWaste?.siteName}
                            </Text>
                          </View>
                          <View style={styles.collectcommentview}>
                            <Text style={styles.collectcommenttext}>
                              Comments -{" "}
                            </Text>
                            <Text style={styles.collectcommentresponsetext}>
                              {/* @ts-ignore */}
                              {segregationWaste?.comment1}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={[styles.mainSegregationNextButtonView, {
                  height: Platform.OS === 'ios' && isSelected1 == 0 ? height / 40 :
                    Platform.OS === 'ios' && isSelected1 == 1 ? height / 20 : height / 10,
                }]}>
                  {isSelected1 < 6 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacitySegregation}
                      onPress={() => {
                        ProcessstepsController1();
                      }}
                    >
                      <Text style={styles.maintouchableopacitytext}>Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.mainview1}>
                      <View style={styles.mainview2}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false),
                              clearSegregationData(),
                              InitialController1();
                          }}
                        >
                          <View style={styles.mainview3}>
                            <Text style={styles.maintouchableopacitytext}>
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.mainview4}>
                        <TouchableOpacity
                          onPress={() => {
                            SegregationSaveValidation();
                          }}
                        >
                          <View style={styles.mainview5}>
                            <Text style={styles.maintouchableopacitytext}>
                              Submit
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      {/* Processed .... Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={showModal2}
        onRequestClose={() => {
          setShowModal2(false);
        }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <View style={styles.progressstep1view}>
                {isSelected2 == 0 && (
                  <View style={styles.processingfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal2(false), clearProcessedData(), InitialController2(); }}>
                      <View style={styles.processingfirstsectiontopbarview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected2 >= 1 ? (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View
                          style={
                            styles.processingfirstsectionheaderbackimagrview
                          }
                        >
                          <TouchableOpacity
                            onPress={() => setShowModal2(false)}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Processed
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View
                          style={
                            styles.processingfirstsectionheaderbackimagrview
                          }
                        >
                          <TouchableOpacity
                            onPress={() => { setShowModal2(false), clearProcessedData(); }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Processed
                          </Text>
                        </View>
                      </View>
                    )}
                    <View
                      style={styles.processingfirstsectionstepindicatopview}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition8}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview1}>
                      <View
                        style={styles.processedFirstSectionTotalWasteMainView}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.processedMainText}>
                            PET
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight1textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight1textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{ color: "black", top: Platform.OS === 'ios' ? 13 : 13 }}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              // @ts-ignore
                              value={processed?.totalwaste ?? ""}
                              onChangeText={(text) => {
                                setProcessedpet(false);
                                setProcessed({
                                  ...processed,
                                  // @ts-ignore
                                  totalwaste: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown1mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown1view}
                          >
                            <Dropdown
                              data={data6}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure6 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure6: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>

                      </View>
                      {processedpet && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PROCESSEDPET}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={styles.processedMainText}>HDPE
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight2textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight2textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{ color: "black", top: Platform.OS === 'ios' ? 13 : 13 }}
                              placeholder="Weight"
                              // @ts-ignore
                              value={processed?.regrints ?? ""}
                              onChangeText={(text) => {
                                setProcessedHdpe(false);
                                // @ts-ignore
                                setProcessed({ ...processed, regrints: text });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown2mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown2view}
                          >
                            <Dropdown
                              data={data7}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure7 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure7: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {processedHdpe && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PROCESSEDHDPE}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={styles.processedMainText}>LDPE
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={
                            styles.processingfirstsectionweight2textinputmainview
                          }
                        >
                          <View
                            style={
                              styles.processingfirstsectionweight2textinputview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{ color: "black", top: Platform.OS === 'ios' ? 13 : 13 }}
                              placeholder="Weight"
                              // @ts-ignore
                              value={processed?.ldpe ?? ""}
                              onChangeText={(text) => {
                                setprocessedLdpe(false);
                                // @ts-ignore
                                setProcessed({ ...processed, ldpe: text });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.processingfirstsectiondropdown2mainview}
                        >
                          <View
                            style={styles.processingfirstsectiondropdown2view}
                          >
                            <Dropdown
                              data={data21}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure21 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure21: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {processedLdpe && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PROCESSEDLDPE}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.sortingModelView6}>
                          <Text style={styles.processedMainText}>PP
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View style={styles.sortingModelView1}>
                          <View style={styles.sortingModelView2}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{ color: "black", top: Platform.OS === 'ios' ? 13 : 13 }}
                              placeholder="Weight"
                              // @ts-ignore
                              value={processed?.granules ?? ""}
                              onChangeText={(text) => {
                                setProcessedPp(false);
                                setProcessed({
                                  ...processed,
                                  // @ts-ignore
                                  granules: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.sortingModelView3}>
                          <View style={styles.sortingModelView4}>
                            <Dropdown
                              data={data8}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure8 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure8: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {ProcessedPp && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PROCESSEDPP}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.sortingModelView6}>
                          <Text style={styles.processedMainText}>Others

                            <Text style={styles.dateAstring}>*</Text></Text>
                        </View>
                        <View style={styles.sortingModelView1}>
                          <View style={styles.sortingModelView2}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{ color: "black", top: Platform.OS === 'ios' ? 13 : 13 }}
                              placeholder="Weight"
                              // @ts-ignore
                              value={processed?.others ?? ""}
                              onChangeText={(text) => {
                                setProcessedother(false);
                                setProcessed({
                                  ...processed,
                                  // @ts-ignore
                                  others: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.sortingModelView3}>
                          <View style={styles.sortingModelView4}>
                            <Dropdown
                              data={data22}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure22 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure22: text,
                                })
                              }
                              inputContainerStyle={
                                styles.modelDropdowmInputContainerStyle
                              }
                              containerStyle={
                                styles.modelDropdowmWasteContainerStyle
                              }
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {Processedother && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PROCESSEDOTHER}</Text>}
                    </View>
                  </View>
                )}
                {isSelected2 == 1 && (
                  <View style={styles.sortingModelView7}>
                    <TouchableOpacity onPress={() => { setShowModal2(false), clearProcessedData(), InitialController2(); }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected2 >= 1 ? (
                      <View style={styles.distributeModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController2()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal2(false)}>
                          <View style={styles.collectModelView2}>
                            <Text style={styles.sortingModelText}>
                              Processed
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false);
                          }}
                        >
                          <ModalHeader
                            title={"Processed"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.sortingModelView9}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition9}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.sortingModelView10}>
                      <View style={styles.sortingModelView5}>
                        <View style={styles.sortingModelView11}>
                          <Text style={styles.dateText}>Select Date
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>
                        </View>
                        <View style={styles.sortingModelView12}>
                          <View style={styles.sortingModelView13}>
                            <TouchableOpacity onPress={showDatePicker2}>
                              <Text style={styles.sortingModelDateText}>
                                {date2
                                  ? moment(date2).format("DD-MM-YYYY")
                                  : "Select Date"}
                              </Text>
                              <DateTimePickerModal
                                isVisible={isDatePickerVisible2}
                                mode="date"
                                maximumDate={new Date()}
                                onConfirm={handleConfirm2}
                                onCancel={hideDatePicker2}
                                // @ts-ignore
                                value={processed?.dateselection2 ?? ""}
                                onChangeText={(text) =>
                                  setProcessed({
                                    ...processed,
                                    // @ts-ignore
                                    dateselection2: text,
                                  })
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.locationMainText}>Location
                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.processedLocationTextField}
                              editable={false}
                              value={processed?.location2 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.locationMainText}>Site Name

                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview123
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.collectLocationTextField}
                              editable={false}
                              value={processed?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.sortingModelView15}>
                        <TextInput
                          style={!processed?.comment2 ? styles.commentTextInput : styles.commentTextInput1}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          // @ts-ignore
                          value={processed?.comment2 ?? ""}
                          onChangeText={(text) => {
                            setprocessedCommentValidationMessage(false);
                            // @ts-ignore
                            setProcessed({ ...processed, comment2: text });
                          }}
                        />
                        {!processed.comment2 && <Text style={styles.commentAstring}>*</Text>}
                      </View>
                      {processedCommentValidationMessage && <Text style={styles.validationMessageStyleComment}>{VALIDATE_FORM.PROCESSINGCOMMENT}</Text>}
                    </View>
                  </View>
                )}
                {isSelected2 == 2 && (
                  <View style={styles.sortingModelView7}>
                    <View style={styles.sortingModelView8}>
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearProcessedData(), InitialController2(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected2 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => ProcessstepsbackController2()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.collectModelView2}>
                          <Text style={styles.sortingModelText}>Review</Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false);
                          }}
                        >
                          <ModalHeader
                            title={"Processed"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.sortingModelView16}>
                      <View>
                        <View style={styles.collectreviewmaininputview}>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                PET -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {processed?.totalwaste}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure6}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                HDPE -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {processed?.regrints}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure7}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                LDPE -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {processed?.ldpe}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure21}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                PP -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {processed?.granules}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure8}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Others -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {/* @ts-ignore */}
                                {processed?.others}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure22}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.collectdatetimeview}>
                            <Text style={styles.collectdatetimetext}>
                              Date & Time -{" "}
                            </Text>
                            <Text style={styles.collectdatetimeresponsetext}>
                              {/* @ts-ignore */}
                              {moment(processed?.date2).format("YYYY-MM-DD") +
                                " " +
                                moment().format(`HH:mm:ss`)}
                            </Text>
                          </View>
                          <View style={styles.collectlocationview}>
                            <Text style={styles.collectlocationtext}>
                              Site Name -{" "}
                            </Text>
                            <Text style={styles.collectlocationresponsetext}>
                              {processed?.siteName}
                            </Text>
                          </View>
                          <View style={styles.collectcommentview}>
                            <Text style={styles.collectcommenttext}>
                              Comments -{" "}
                            </Text>
                            <Text style={styles.collectcommentresponsetext}>
                              {/* @ts-ignore */}
                              {processed?.comment2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.mainview}>
                  {isSelected2 < 2 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacity}
                      onPress={() => {
                        ProcessstepsController2();
                      }}
                    >
                      <Text style={styles.maintouchableopacitytext}>Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.mainview1}>
                      <View style={styles.mainview2}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false),
                              clearProcessedData(),
                              InitialController2();
                          }}
                        >
                          <View style={styles.mainview3}>
                            <Text style={styles.maintouchableopacitytext}>
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.mainview4}>
                        <TouchableOpacity
                          onPress={() => {
                            ProcessedSaveValidation();
                          }}
                        >
                          <View style={styles.mainview5}>
                            <Text style={styles.maintouchableopacitytext}>
                              Submit
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </View>
  );
};

export default withConnect(Footer);

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 13,
    backgroundColor: "#DA0D14",
    flexDirection: "row",
  },
  firsticonView: {
    height: height / 14,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondiconView: {
    height: height / 14,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdiconView: {
    height: height / 14,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    height: height / 1,
    width: width / 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: height / 1.2,
    width: width / 1,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  centeredView1: {
    height: Platform.OS === 'ios' ? height / 1 : height / 1.04,
    width: width / 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView1: {
    height: height / 1.1,
    width: width / 1,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  centeredView2: {
    height: height / 1,
    width: width / 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView2: {
    height: height / 1.2,
    width: width / 1,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  secureInput8: {
    color: "white",
    fontSize: 16,
    marginLeft: -10,
    textAlign: "center",
    alignSelf: "center",
  },
  secureView1: {
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "RED",
    height: METRICS.MAR_60,
    width: "90%",
    marginTop: METRICS.MAR_10,
    alignSelf: "center",
  },
  email1: {
    marginVertical: METRICS.MAR_19,
    marginHorizontal: METRICS.MAR_19,
  },
  secureInput9: {
    color: "gray",
    fontSize: 16,
    marginVertical: METRICS.MAR_20,
  },
  item: {
    width: width / 1.2,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: height / 19,
  },
  item1: {
    width: width / 1.2,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: height / 24,
  },
  item2: {
    width: width / 1.2,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: height / 20,
  },
  progressstep1view: {
    height: height / 1.65,
    width: width / 1,
  },
  progressstep1view1: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressstep1view2: {
    height: height / 11,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  progressstep1text: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  progressstep1text1: { paddingLeft: 4, color: "#606060" },
  progressstep1view3: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  progressstep1view4: {
    height: height / 3,
    width: width / 1,
  },
  progressstep1view5: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  progressstep1view6: {
    height: height / 13,
    width: width / 2.4,
    justifyContent: "center",
  },
  progressstep1view7: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  progressstep1view8: {
    height: height / 18,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  progressstep1view9: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  progressstep1view10: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
  },
  progressstep1view11: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  progressstep1view12: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  progressstep1view13: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  progressstep1view14: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  progressstep1dropdowninput: {
    height: height / 28,
    width: width / 3,
  },
  progressstep1dropdowncontainer: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
  },
  progressstep1dropdownimage: {
    tintColor: "gray",
    height: height / 50,
    width: width / 28,
    alignSelf: "center",
    marginBottom: 8,
  },
  progressstep2view: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  progressstep2view1: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  progressstep2image: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  progressstep2view2: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  progressstep2view3: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  progressstep2view4: {
    height: height / 3,
    width: width / 1,
    alignItems: "center",
  },
  progressstep2view5: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1.13,
    flexDirection: "row",
  },
  progressstep2view6: {
    height: height / 13,
    width: width / 2.5,
    justifyContent: "center",
  },
  progressstep2view7: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  progressstep2view8: {
    height: height / 15,
    width: width / 3.5,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  progressstep2text: {
    color: "#000000",
    fontSize: 14,
  },
  progressstep2view9: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
  },
  progressstep2view10: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  progressstep2view11: {
    height: height / 12,
    width: width / 1.2,
  },
  mainfloatingcontainerstyle: {
    borderBottomWidth: 1,
    width: width / 3,
    height: height / 17,
    borderBottomColor: "#D8D8D8",
  },
  progressstep3view: {
    height: height / 2.2,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressstep3view1: {
    height: height / 2.5,
    width: width / 1.12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  progressstepsorting1view: {
    height: height / 11.4,
    width: width / 1,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  progressstepsorting1text: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  progressstepsorting1view1: {
    height: height / 4,
    justifyContent: "center",
    width: width / 1,
  },
  progressstepsorting1view2: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  dropdowninput: {
    height: height / 28,
    width: width / 3,
  },
  dropdowncontainer: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
  },
  progressstepsorting1image: {
    tintColor: "gray",
    height: height / 50,
    width: width / 28,
    alignSelf: "center",
    marginBottom: 8,
  },
  progressstepsorting1text1: { paddingLeft: 4, color: "#606060" },
  progressstepsorting1view3: {
    height: height / 12,
    width: width / 1.19,
  },
  mainfloatingcontainerstyle1: {
    borderBottomWidth: 1,
    width: width / 3,
    height: height / 12,
    borderBottomColor: "#D8D8D8",
  },
  progressstepdistribute1view: {
    height: height / 2.5,
    alignItems: "center",
    width: width / 1,
  },
  progressstepdistribute2view: {
    height: height / 5,
    width: width / 1,
  },
  maintext: { color: "white" },
  mainimage: {
    tintColor: "#FFFFFF",
    height: height / 40,
    width: width / 17,
    marginLeft: 10,
  },
  mainimage1: {
    tintColor: "#FFFFFF",
    height: height / 55,
    width: width / 8,
    marginLeft: "10%",
  },
  mainimage2: {
    tintColor: "#FFFFFF",
    height: height / 40,
    width: width / 17,
    marginLeft: "15%",
  },
  mainview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainSegregationNextButtonView: {
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maintouchableopacity: {
    height: height / 17,
    width: width / 1.2,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  collectsecondsectiontextinputlocationview123: {
    height: height / 18,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  maintouchableopacitySegregation: {
    top: '150%',
    height: height / 17,
    width: width / 1.2,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  maintouchableopacitytext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  mainview1: {
    height: height / 15,
    width: width / 1,
    flexDirection: "row",
  },
  mainview2: {
    height: height / 15,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview3: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#B5B5B5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  maintext1: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  mainview4: {
    height: height / 15,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview5: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  collectfirstsectionTotalwastemainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  collectfirstsectionTotalwasteview: {
    height: height / 13,
    width: width / 2.4,
    justifyContent: "center",
  },
  collectsecondsectioncommentview: {
    height: height / 19,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
    top: 10,
  },
  collectthirdsectionmainview: {
    height: height / 1.65,
    width: width / 1,
  },
  collectfirstsectionwastemainview: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectmodalheadermainview: {
    height: height / 11,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  collectfirstsectiontopbarview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  collectfirstsectionText: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  collectsecondsectionlocationview: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
  },
  collectsecondsectiontextinputlocationmainview: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectsecondsectiontextinputlocationview: {
    height: height / 18,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  collectsecondsectiontextinputsitenameview: {
    height: height / 18,
    width: width / 2.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  collectfirstsectionmainview: {
    height: height / 1.65,
    width: width / 1,
  },
  collectsecondsectionheadertext: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  collectfirstsectionstepindicatorview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  collectfirstsectiondatamaincontainerview: {
    height: height / 3,
    width: width / 1,
  },
  collectfirstsectionwasteview: {
    height: height / 18,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  collectfirstsectionquantitymainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  collectfirstsectionquantityview: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
    bottom:Platform.OS === 'ios'?-2:0,
  },
  collectfirstsectionweightmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  collectfirstsectionweightview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  collectfirstsectiondropdownmainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  collectfirstsectiondropdownview: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  collectsecondsectionmainview: {
    height: height / 1.65,
    width: width / 1,
  },
  collectsecondsectiontopbarview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  collectsecondsectionheadermainview: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  collectsecondsectionheaderbackview: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectquantityview: {
    flexDirection: "row",
    height: height / 18,
    alignItems: "center",
  },
  collectsecondsectionheadercollectview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  collectsecondsectionstepindicatorview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  collectsecondsectionmaininputsview: {
    height: height / 3,
    width: width / 1,
    alignItems: "center",
  },
  collectsecondsectiondatemainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1.13,
    flexDirection: "row",
  },
  collectsecondsectiondateview: {
    height: height / 13,
    width: width / 2.5,
    justifyContent: "center",
  },
  collectsecondsectiondatepickermainview: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectsecondsectiondatepickerview: {
    height: height / 15,
    width: width / 3.5,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  collectsecondsectionlocationmainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1.13,
    flexDirection: "row",
  },
  collectthirdsectiontopbarview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  collectthirdsectionheadermainview: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  collectthirdsectionbackimageview: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectthirdsectionheadertextview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  collectthirdsectionheadertext: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  collectthirdsectionmainflatlistview: {
    height: height / 2.2,
    width: width / 0.5,
    marginLeft: 30,
  },
  collectthirdsectionflatlistview: {
    height: height / 2.5,
    width: width / 1.12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  collectreviewmaininputview: {
    marginTop: 25,
    width: width / 1.38,
  },
  collectwastetypeview: {
    flexDirection: "row",
    height: height / 25,
    alignItems: "center",
  },
  collectwastetext: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#606060",
    fontWeight: "400",
  },
  collectwasteresponsetext: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
  },
  collectquantitytext: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#606060",
    fontWeight: "400",
  },
  collectquantityresponsetext: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
  },
  collectquantitymeasuretext: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#606060",
    fontWeight: "400",
  },
  collectquantitymeasuresresponsetext: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
  },
  collectdatetimetext: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#606060",
    fontWeight: "400",
  },
  collectdatetimeresponsetext: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
  },
  collectlocationtext: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#606060",
    fontWeight: "400",
  },
  collectlocationresponsetext: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
  },
  collectcommenttext: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#606060",
    fontWeight: "400",
  },
  collectdatetimeview: {
    flexDirection: "row",
    height: height / 18,
    alignItems: "center",
  },
  collectdatetimeview1: {
    flexDirection: "row",
    top: -30,
    alignItems: "center",
  },
  collectlocationview: {
    flexDirection: "row",
    height: height / 18,
    alignItems: "center",
  },
  collectcommentview: {
    flexDirection: "row",
    marginTop: 10,
    height: height / 10,
  },
  collectcommentresponsetext: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
  },
  segregationfirstsectionmainview: {
    height: Platform.OS === 'android' ? height / 1.65 : height / 1.3,
    width: width / 1,
  },
  processedfirstsectionmainview: {
    height: Platform.OS === 'android' ? height / 1.65 : height / 1.4,
    width: width / 1,
  },
  processingfirstsectionmainview: {
    height: height / 1.65,
    width: width / 1,
  },
  processingfirstsectiontopbarview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  processingfirstsectionheadermainview: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  processingfirstsectionheaderbackimagrview: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  processingfirstsectionheadertextview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  processingfirstsectionheadertext: {
    textAlignVertical: "center",
    fontSize: responsiveFontSize(2.4),
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  processingfirstsectionstepindicatopview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  processingfirstsectioninputmainview: {
    height: height / 2.7,
    justifyContent: "center",
    width: width / 1,

  },
  processingfirstsectioninputmainview1: {
    height: height / 3,
    justifyContent: "center",
    width: width / 1,
  },
  processingfirstsectiomtotalwastemainview: {
    height: height / 2.5,
    justifyContent: "center",
    flexDirection: "row",
  },
  processingfirstsectiomtotalwastemainplasticview: {
    height: height / 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  processingfirstsectiomtotalwastemainpaperview: {
    height: height / 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  processingfirstsectiomtotalwastemainview1: {
    height: height / 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  processedFirstSectionTotalWasteMainView: {
    height: height / 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  processingfirstsectiontotalwasteview: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
  },
  processingfirstsectionweight1textinputmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  processingfirstsectionweight1textinputview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  processingfirstsectiondropdown1view: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  processingfirstsectiondropdown1mainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  processingfirstsectiontotalrdfmainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  processingfirstsectiontotalrdfview: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
  },
  processingfirstsectionweight2textinputmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  processingfirstsectionweight2textinputview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  processingfirstsectiondropdown2mainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  processingfirstsectiondropdown2view: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  processingfirstsectiontotalinertsmainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  collectquantitymeasureview: {
    flexDirection: "row",
    height: height / 22,
    alignItems: "center",
  },
  collectModelView: {
    height: height / 11.4,
    width: width / 1,

    flexDirection: "row",
    alignItems: "center",
  },
  collectModelView1: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectModelView2: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  collectModelImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  modelDropdowmInputContainerStyle: {
    height: height / 28,
    width: width / 3,
  },
  modelDropdowmContainerStyle: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
    top: Platform.OS === 'ios' ? 11 : 10,
  },
  modelDropdowmImage: {
    alignSelf: "center",
    top: 13,
  },
  collectModelDateText: {
    color: "black",
    fontSize: 14,
  },
  sortingModelView: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
  },
  sortingModelView1: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingModelView2: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  sortingModelView3: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  sortingModelView4: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  sortingModelView5: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  sortingModelView6: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
  },
  sortingModelView7: {
    height: height / 1.65,
    width: width / 1,
  },
  sortingModelView8: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sortingModelText: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  sortingModelView9: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  sortingModelView10: {
    height: height / 3,
    width: width / 1,
    alignItems: "center",
  },
  sortingModelView11: {
    height: height / 13,
    width: width / 2.5,
    justifyContent: "center",
  },
  sortingModelView12: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sortingModelView13: {
    height: height / 15,
    width: width / 3.5,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  sortingModelDateText: {
    color: "#000000",
    fontSize: 14,
    top: 16,
  },
  sortingModelView15: {
    height: height / 18,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
  },
  sortingModelReview: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  sortingModelView16: {
    height: height / 2.2,
    width: width / 1,
    marginLeft: 30,
  },
  distributeModelView: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  modelDropdowmWasteContainerStyle: {
    width: width / 5,
    justifyContent: "flex-start",
    top: Platform.OS === 'ios' ? 13 : 10,
    height: height / 13,
  },
  modelDropdowmWasteDropdownImage: {
    alignSelf: "center",
    top: 13,
  },
  segregationPicView: {
    height: height / 8,
    width: width / 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  segragationImageView: {
    borderRadius: 10,
    marginHorizontal: 5,
    width: 60,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  segragationImageView1: {
    borderRadius: 10,
    marginHorizontal: 5,
    width: 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  segragationImageText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.8),
    marginTop: 50,
  },
  segragationImageText1: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.4),
    marginTop: 40,
  },
  dateText: {
    color: "#606060",
    top: 10,
  },
  segregationTextInput: {
    color: "black",
    top: Platform.OS === 'ios' ? 13 : 13,
  },
  commentTextInput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: 20,
  },
  commentTextInput1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: 12,
  },
  segregationMainText: {
    paddingLeft: 4,
    color: "#606060",
    top: 11,
  },
  locationMainText: {
    color: "#606060",
    top: 7,
  },
  segregationReview: {
    flexDirection: "row",
  },
  processedMainText: {
    paddingLeft: 4,
    color: "#606060",
    top: 10,
  },
  collectWasteType: {
    color: "#606060",
    top: 3,
  },
  collectWasteTypeTextInput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    top: 14,
  },
  collectQuantityTextInput: {
    color: COLORS.BLACK,
    fontSize: responsiveFontSize(1.9),
    top: Platform.OS === 'ios' ? 13 : 13,
  },
  collectLocationTextField: {
    color: "black",
    top: 14,
  },
  segregationLocationTextField: {
    color: "black",
    top: 14,
  },
  processedLocationTextField: {
    color: "black",
    top: 12,
  },
  dateAstring: {
    color: 'red',
    left: 74,
    bottom: 3,
  },
  dateAstringselect: {
    color: 'red',
    left: 74,
    bottom: 3,
  },
  dateAstringplastic: {
    color: 'red',
    left: 74,
    bottom: Platform.OS === 'ios' ? -1 : 3,
  },
  dateAstring12: {
    color: 'red',
    left: Platform.OS === 'ios' ? 70 : 74,
    bottom: 3,
  },
  dateAstring1234: {
    color: 'red',
    left: 74,
    bottom: 3,
  },
  commentAstring: {
    color: 'red',
    left: Platform.OS === 'ios' ? 79 : 75,
    bottom: Platform.OS === 'ios' ? -1.5 : 11,
  },
  commentAstringsegregation: {
    color: 'red',
    left: Platform.OS === 'ios' ? 79 : 75,
    bottom: Platform.OS === 'ios' ? -1.5 : 11,
  },
  commentAstring1234: {
    color: 'red',
    left: Platform.OS === 'ios' ? 79 : 75,
    bottom: Platform.OS === 'ios' ? -2 : 11,
  },
  validationMessageStyle: {
    color: 'red',
    left: 34,
  },
  validationMessagePaperStyle: {
    color: 'red',
    left: 34,
    bottom: 11,
  },
  validationMessagemetalStyle: {
    color: 'red',
    left: 34,
    bottom: "89%",
  },
  validationMessageStyleComment: {
    color: 'red',
    top: 9,
    left: Platform.OS === 'ios' ? -85 : -70,
  },
});
