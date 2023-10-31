import {
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Images } from "../../../../Assets";
import { Dropdown } from "react-native-material-dropdown-v2";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import StepIndicator from "react-native-step-indicator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Network from "../../../../Network";
import { VALIDATE_FORM } from "../../../../Constant";
import _ from "lodash";
import { showMessage } from "react-native-flash-message";
import { ActionType } from '../../../../Redux/Type';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";
import {
  COLORS,
  FONT_FAMILIES,
  METRICS,
} from "../../../../Configration";
import withConnect from "./withConnect";
import { useDispatch } from "react-redux";
const { height, width } = Dimensions.get("screen");
const { DASHBOARD_IWM_COLLECTION, DASHBOARD_IWM_ANALYSIS, DASHBOARD_IWM_LEFTOVERSTOCK } = ActionType;
const Footer = (props: any) => {
  const { user } = props;
  const dispatch = useDispatch();
  const city = user.cities[0].city;
  const siteName = user.siteName[0].siteName;
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
  let timeOut;
  let timeOut1;
  let timeOut2;
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const currentPosition = 1;
  const currentPosition1 = 2;
  const currentPosition2 = 1;
  const currentPosition3 = 2;
  const [isSelected, setSelected] = useState(0);
  const [collectwaste, setCollectedWaste] = useState({ waste: 'IWM', location: city, quantitymeasure: 'MT', siteName: siteName, comment: "", quantity: "" });
  const [processingwaste, setProcessingWaste] = useState({
    location2: city,
    quantitymeasure1: 'MT',
    quantitymeasure2: 'MT',
    quantitymeasure3: 'MT',
    quantitymeasure4: 'MT',
    quantitymeasure5: 'MT',
    quantitymeasure6: 'MT',
    siteName: siteName,
    comment2: "",
    totalWaste: "",
    dlf: "",
    lat: "",
    incineration: "",
    afrf: "",
  });
  const [leftoverStock, setLeftoverStock] = useState({

    location3: city,
    quantitymeasure7: 'MT',
    quantitymeasure8: 'MT',
    quantitymeasure9: 'MT',
    quantitymeasure10: 'MT',
    quantitymeasure11: 'MT',
    siteName: siteName,
    comment3: "",
    totalwaste: "",
    dlf: "",
    lat: "",
    incineration: "",
    afrf: "",

  });
  const [showModal, setShowModal] = useState(false);
  const [date1, setDate1] = useState();
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isSelected1, setSelected1] = useState(0);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isSelected2, setSelected2] = useState(0);
  const [date2, setDate2] = useState();
  const email = user.email;
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [totalWasteValidationMessage, setTotalWasteValidationMessage] = useState(false);
  const [collectCommentValidationMessage, setCollectCommentValidationMessage] = useState(false);
  const [totalWasteDisposal, setTotalWasteDisposal] = useState(false);
  const [totaldlf, setTotalDlf] = useState(false);
  const [totallat, setTotalLat] = useState(false);
  const [totalincineration, setTotalIncineration] = useState(false);
  const [totalafrf, setTotalAfrf] = useState(false);
  const [distributecomment, setDistributeComment] = useState(false);
  const [totalWasteleftOver, setTotalWasteleftOver] = useState(false);
  const [dlfleftOver, setdlfleftOver] = useState(false);
  const [latOver, setLatleftOver] = useState(false);
  const [incleftOver, setincleftOver] = useState(false);
  const [afrfleftOver, setafrfleftOver] = useState(false);
  const [commentleftOver, setcommentleftOver] = useState(false);
  const data = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data2 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
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
  //***************************Validation On Total Waste Field**********************
  // const validationWaste = () => {
  //   const totalFieldValue = parseInt(processingwaste?.dlf) + parseInt(processingwaste?.lat) + parseInt(processingwaste?.incineration) + parseInt(processingwaste?.afrf);
  //   console.log("totalFieldValue", totalFieldValue);
  //   console.log("totalWaste", parseInt(processingwaste?.totalWaste));
  //   if (parseInt(processingwaste?.totalWaste) == totalFieldValue || !processingwaste?.totalWaste || !processingwaste?.dlf || !processingwaste?.lat || !processingwaste?.incineration || !processingwaste?.afrf) {
  //     processStepsController1();
  //   }
  //   else {
  //     Alert.alert("The total of DLF, LAT, Incineration and AFRF is not equal to Total Waste");
  //   }
  // };
  // ***********************Collect Save API******************
  const collectDataSave = async () => {
    // @ts-ignore
    var time = (moment(collectwaste?.date).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      wasteType: collectwaste?.waste,
      // @ts-ignore
      quantity: (collectwaste?.quantity) + " " + (collectwaste?.quantitymeasure),
      date: dateTime1,
      // @ts-ignore
      location: collectwaste?.location,
      siteName: [{ siteName: collectwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: collectwaste?.comment,
    };
    const result = await Network.createApiClient().postiwmsavecollect(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut = setTimeout(getCollectionApi, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ********************** Disposal Save API******************
  const disposalDataSave = async () => {
    // @ts-ignore
    var time = (moment(processingwaste?.date1).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      disposalTotalWaste: (processingwaste?.totalWaste) + " " + (processingwaste?.quantitymeasure1),
      // @ts-ignore
      disposalDlf: (processingwaste?.dlf) + " " + (processingwaste?.quantitymeasure2),
      // @ts-ignore
      disposalLat: (processingwaste?.lat) + " " + (processingwaste?.quantitymeasure3),
      // @ts-ignore
      disposalIncineration: (processingwaste?.incineration) + " " + (processingwaste?.quantitymeasure4),
      // @ts-ignore
      disposalAfrf: (processingwaste?.afrf) + " " + (processingwaste?.quantitymeasure5),
      // @ts-ignore
      // disposalRecyclables: (processingwaste?.recyclables) + " " + (processingwaste?.quantitymeasure6),
      date: dateTime1,
      location: processingwaste?.location2,
      siteName: [{ siteName: processingwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: processingwaste?.comment2,
    };
    const result = await Network.createApiClient().postiwmsaveanalysis(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut1 = setTimeout(getDisposalApi, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************LeftOverStock Save API******************
  const leftOverStockDataSave = async () => {
    // @ts-ignore
    var time = (moment(leftoverStock?.date2).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      stockTotalWaste: (leftoverStock?.totalwaste) + " " + (leftoverStock?.quantitymeasure7),
      // @ts-ignore
      stockDlf: (leftoverStock?.dlf) + " " + (leftoverStock?.quantitymeasure8),
      // @ts-ignore
      stockLat: (leftoverStock?.lat) + " " + (leftoverStock?.quantitymeasure9),
      // @ts-ignore
      stockIncineration: (leftoverStock?.incineration) + " " + (leftoverStock?.quantitymeasure10),
      // @ts-ignore
      stockAfrf: (leftoverStock?.afrf) + " " + (leftoverStock?.quantitymeasure11),
      date: dateTime1,
      location: leftoverStock?.location3,
      siteName: [{ siteName: leftoverStock?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: leftoverStock?.comment3,
    };
    const result = await Network.createApiClient().postiwmsaveleftoverstock(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut2 = setTimeout(getleftOverStockApi, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Collect GET API******************
  const getCollectionApi = async () => {
    const params = { siteName: siteName };
    const result = await Network.createApiClient().IWMcollectdashboard(params);

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
          var quantity = 0;
          filterDateArr.forEach(item => {
            quantity = quantity + item.quantity ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, quantity });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_IWM_COLLECTION, payload: displayArr });
    }
  };
  // ***********************Disposal GET API******************
  const getDisposalApi = async () => {
    const params = { siteName: siteName };
    const result = await Network.createApiClient().IWManalysisdashboard(params);
    console.log("disposalfooter", result);
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
          var analysisTotalWaste = 0;
          var analysisDlf = 0;
          var analysisLat = 0;
          var analysisIncineration = 0;
          var analysisAfrf = 0;
          filterDateArr.forEach(item => {
            analysisTotalWaste = analysisTotalWaste + item.disposalTotalWaste ?? 0;
            analysisDlf = analysisDlf + item.disposalDlf ?? 0;
            analysisLat = analysisLat + item.disposalLat ?? 0;
            analysisIncineration = analysisIncineration + item.disposalIncineration ?? 0;
            analysisAfrf = analysisAfrf + item.disposalAfrf ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, analysisTotalWaste, analysisDlf, analysisLat, analysisIncineration, analysisAfrf });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_IWM_ANALYSIS, payload: displayArr });
    }
  };
  // ***********************LeftOverStock GET API******************
  const getleftOverStockApi = async () => {
    const params = { siteName: siteName };
    const result = await Network.createApiClient().IMWleftoverstockdashboard(params);
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
          var stockTotalWaste = 0;
          var stockDlf = 0;
          var stockLat = 0;
          var stockIncineration = 0;
          var stockAfrf = 0;
          filterDateArr.forEach(item => {
            stockTotalWaste = stockTotalWaste + item.stockTotalWaste ?? 0;
            stockDlf = stockDlf + item.stockDlf ?? 0;
            stockLat = stockLat + item.stockLat ?? 0;
            stockIncineration = stockIncineration + item.stockIncineration ?? 0;
            stockAfrf = stockAfrf + item.stockAfrf ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, stockTotalWaste, stockDlf, stockLat, stockIncineration, stockAfrf });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_IWM_LEFTOVERSTOCK, payload: displayArr });
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
  // *******************Date Selection Method For Disposal*****************
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = (date1) => {
    setDate1(date1);
    // @ts-ignore
    setProcessingWaste({ ...processingwaste, date1 });
    hideDatePicker1();
  };
  // *******************Date Selection Method For LeftOverStock*****************
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = (date2) => {
    setDate2(date2);
    // @ts-ignore
    setLeftoverStock({ ...leftoverStock, date2 });
    hideDatePicker2();
  };
  // **********************Collect Modal Going Next Page*******************
  const processStepsController = () => {
    setSelected(isSelected + 1);
  };
  // **********************Disposal Modal Going Next Page*******************
  const processStepsController1 = () => {
    setSelected1(isSelected1 + 1);
  };
  // **********************LeftOverStock Modal Going Next Page*******************
  const processStepsController2 = () => {
    setSelected2(isSelected2 + 1);
  };
  // **********************Collect Modal Going Previous Page*******************
  const processStepsBackController = () => {
    setSelected(isSelected - 1);
  };
  // **********************Disposal Modal Going Previous Page*******************
  const processStepsBackController1 = () => {
    setSelected1(isSelected1 - 1);
  };
  // **********************LeftOverStock Modal Going Previous Page*******************
  const processStepsBackController2 = () => {
    setSelected2(isSelected2 - 1);
  };
  // ***********************Clear Modal Data On Cancel And Submission******************
  const clearCollectData = () => {
    // @ts-ignore
    setCollectedWaste({ ...collectwaste, quantity: "", comment: "", quantitymeasure: "MT" });
    setTotalWasteValidationMessage(false);
    setCollectCommentValidationMessage(false);
    // @ts-ignore
    setDate(null);
  };
  const clearDisposalData = () => {
    setProcessingWaste({
      // @ts-ignore
      ...processingwaste,
      // @ts-ignore
      totalWaste: "",
      dlf: "",
      lat: "",
      incineration: "",
      afrf: "",
      comment2: "",
      quantitymeasure1: "MT",
      quantitymeasure2: "MT",
      quantitymeasure3: "MT",
      quantitymeasure4: "MT",
      quantitymeasure5: "MT",
      quantitymeasure6: "MT",
    });
    setTotalWasteDisposal(false);
    setTotalDlf(false);
    setTotalAfrf(false);
    setTotalLat(false);
    setTotalIncineration(false);
    setDistributeComment(false);
    // @ts-ignore
    setDate1(null);
  };
  const clearLeftoverStockData = () => {
    setcommentleftOver(false);
    setafrfleftOver(false);
    setincleftOver(false);
    setLatleftOver(false);
    setdlfleftOver(false);
    setTotalWasteleftOver(false);
    setLeftoverStock({
      // @ts-ignore
      ...leftoverStock,
      // @ts-ignore
      totalwaste: "",
      // @ts-ignore
      dlf: "",
      lat: "",
      incineration: "",

      afrf: "",
      comment3: "",
      quantitymeasure10: "MT",
      quantitymeasure11: "MT",
      quantitymeasure7: "MT",
      quantitymeasure8: "MT",
      quantitymeasure9: "MT",
    });
    // @ts-ignore
    setDate2(null);
  };
  // *******************Validation Method********************************
  const validationCollect = () => {
    if (_.isEmpty(collectwaste.quantity.trim())) {
      setTotalWasteValidationMessage(true);
      initialController();
      return false;
    } else if (_.isEmpty(collectwaste.comment.trim())) {
      setCollectCommentValidationMessage(true);
      setSelected(1);
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
  // ******************* Disposal Validation Method********************************
  const validationDipopsal = () => {
    if (_.isEmpty(processingwaste.totalWaste.trim())) {
      setTotalWasteDisposal(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.dlf.trim())) {
      setTotalDlf(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.lat.trim())) {
      setTotalLat(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.incineration.trim())) {
      setTotalIncineration(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.afrf.trim())) {
      setTotalAfrf(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.comment2.trim())) {
      setDistributeComment(true);
      setSelected1(1);
      return false;
    }
    return true;
  };
  const disposalSaveValidation = () => {
    if (validationDipopsal()) {
      setShowModal1(false);
      disposalDataSave();
      clearDisposalData();
      initialController1();
    }
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController = () => {
    setSelected(0);
  };
  const initialController1 = () => {
    setSelected1(0);
  };
  const initialController2 = () => {
    setSelected2(0);
  };
  //**********************************leftover stock validation*********** */
  const validationleftOver = () => {
    if (_.isEmpty(leftoverStock.totalwaste.trim())) {
      setTotalWasteleftOver(true);
      initialController4(0);
      return false;
    } else if (_.isEmpty(leftoverStock.dlf.trim())) {
      setTotalWasteleftOver(false);
      setdlfleftOver(true);
      initialController4(0);
      return false;
    } else if (_.isEmpty(leftoverStock.lat.trim())) {
      setdlfleftOver(false);
      setLatleftOver(true);
      initialController4(0);
      return false;
    } else if (_.isEmpty(leftoverStock.incineration.trim())) {
      setLatleftOver(false);
      setincleftOver(true);
      initialController4(0);
      return false;
    } else if (_.isEmpty(leftoverStock.afrf.trim())) {
      setincleftOver(false);
      setafrfleftOver(true);
      initialController4(0);
      return false;
    } else if (_.isEmpty(leftoverStock.comment3.trim())) {
      setafrfleftOver(false);
      setcommentleftOver(true);
      initialController4(1);
      return false;
    }
    return true;
  };
  const leftOverValidation = () => {
    if (validationleftOver()) {
      setShowModal2(false),
        leftOverStockDataSave(),
        clearLeftoverStockData(),
        initialController2();
    }
  };
  const initialController4 = (page: any) => {
    setSelected2(page);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.firsticonView}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Image
            source={Images.collect}
            style={styles.mainimage}
          />
          <Text style={styles.maintext}>Collect</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondiconView}>
        <TouchableOpacity onPress={() => setShowModal1(!showModal1)}>
          <Image
            source={Images.sorting}
            style={styles.mainimage1}
          />
          <Text style={styles.maintext}>Disposal</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ThirdiconView}>
        <TouchableOpacity onPress={() => setShowModal2(!showModal2)}>
          <Image
            source={Images.distribute}
            style={styles.mainimage2}
          />
          <Text style={styles.maintext}>Leftover Stock</Text>
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
        <KeyboardAwareScrollView enableOnAndroid={true} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={styles.progressstep1view}
              >
                {isSelected == 0 && <View style={styles.collectfirstsectionmainview}>
                  <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
                    <View style={styles.collectfirstsectiontopbarview}>
                      <Image source={Images.closebar} />
                    </View>
                  </TouchableOpacity>
                  {isSelected >= 1 ? (
                    <View style={styles.collectmodalheadermainview}>
                      <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
                        <Image source={Images.backarrow} />
                      </TouchableOpacity>
                      <Text style={styles.collectsecondsectionheadertext}>Collect</Text>
                    </View>
                  ) : (
                    <View
                      style={styles.collectModelView}
                    >
                      <View
                        style={styles.collectModelView1}
                      >
                        <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
                          <Image
                            source={Images.back1}
                            style={styles.collectModelImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => setShowModal(false)}>
                        <View
                          style={styles.collectModelView2}
                        >
                          <Text
                            style={styles.collectsecondsectionheadertext}
                          >
                            Collect
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={[styles.collectfirstsectionstepindicatorview, { top: 0 }]}>
                    <StepIndicator
                      customStyles={customStyles}
                      currentPosition={currentPosition}
                      stepCount={2}
                    />
                  </View>
                  <View style={[styles.collectfirstsectiondatamaincontainerview, { top: 0 }]}>
                    <View style={styles.collectfirstsectionTotalwastemainview}>
                      <View style={styles.collectfirstsectionTotalwasteview}>
                        <Text style={styles.collectLabelText}>Waste Type</Text>
                      </View>
                      <View style={styles.collectfirstsectionwastemainview}>
                        <View pointerEvents="none" style={styles.collectfirstsectionwasteview}>
                          <TextInput
                            style={styles.wasteTypeTextField}
                            editable={false}
                            value={collectwaste?.waste ?? ""}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.collectfirstsectionquantitymainview, { top: 0 }]}>
                      <View style={styles.collectfirstsectionquantityview}>
                        <Text style={styles.quantityText}>Quantity
                          <Text style={styles.quantityAstring1}>*</Text>
                        </Text>

                      </View>
                      <View style={styles.collectfirstsectionweightmainview}>
                        <View style={styles.collectfirstsectionweightview}>
                          <TextInput
                            keyboardType="number-pad"
                            placeholder={"Weight"}
                            style={styles.quantityTextField}
                            value={collectwaste?.quantity ?? ""}
                            placeholderTextColor={COLORS.BLACK}
                            selectionColor={COLORS.BLACK}
                            onChangeText={(text) => {
                              setTotalWasteValidationMessage(false);
                              setCollectedWaste({ ...collectwaste, quantity: text });
                            }}
                          />
                        </View>

                      </View>
                      <View style={styles.collectfirstsectiondropdownmainview}>
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
                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                            containerStyle={styles.modelDropdowmContainerStyle}
                          />
                          <Image
                            source={Images.footerDropdown}
                            style={styles.modelDropdowmImage}
                          />
                        </View>
                      </View>
                    </View>
                    {totalWasteValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.MSWCTQUANTITY}</Text>}
                  </View>
                </View>}
                {isSelected == 1 && <View style={styles.collectsecondsectionmainview}>
                  <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
                    <View style={styles.collectsecondsectiontopbarview}>
                      <Image source={Images.closebar} />
                    </View>
                  </TouchableOpacity>
                  {isSelected >= 1 ? (
                    <View style={styles.collectsecondsectionheadermainview}>
                      <View style={styles.collectsecondsectionheaderbackview}>
                        <TouchableOpacity onPress={() => processStepsBackController()}>
                          <Image
                            source={Images.back1}
                            style={styles.collectModelImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.collectsecondsectionheadercollectview}>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                          <Text style={styles.collectsecondsectionheadertext}>Collect</Text>
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
                        <Text style={styles.collectLabelDateText}>Select Date
                          <Text style={styles.quantityAstringp4}>*</Text>
                        </Text>

                      </View>
                      <View style={styles.collectsecondsectiondatepickermainview}>
                        <View style={styles.collectsecondsectiondatepickerview}>
                          <TouchableOpacity
                            onPress={showDatePicker}
                          >
                            <Text
                              style={styles.collectDateText}
                            >
                              {date ? moment(date).format("DD-MM-YYYY") : "Select Date"}
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
                        <Text style={styles.collectlocationText}>Location</Text>
                      </View>
                      <View style={styles.collectsecondsectiontextinputlocationmainview}>
                        <View style={styles.collectsecondsectiontextinputlocationview}>
                          <TextInput
                            placeholderTextColor={"#000000"}
                            style={styles.collectlocationTextField}
                            editable={false}
                            value={collectwaste?.location ?? ""}></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.collectsecondsectionlocationmainview}>
                      <View style={styles.collectsecondsectionlocationview}>
                        <Text style={styles.collectSiteNameText}>Site Name</Text>
                      </View>
                      <View style={styles.collectsecondsectiontextinputlocationmainview}>
                        <View style={styles.collectsecondsectiontextinputlocationview1}>
                          <TextInput
                            placeholderTextColor={"#000000"}
                            style={styles.collectSiteNameTextField}
                            editable={false}
                            value={collectwaste?.siteName ?? ""}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.collectsecondsectioncommentview}>
                      <TextInput
                        style={!collectwaste?.comment ? styles.collectmodalcommenttextinput12 : styles.collectmodalcommenttextinput123}
                        placeholder={"Comments"}
                        placeholderTextColor={COLORS.BLACK}
                        keyboardType="default"
                        selectionColor={COLORS.BLACK}
                        value={collectwaste?.comment ?? ""}
                        onChangeText={(text) => {
                          setCollectCommentValidationMessage(false);
                          setCollectedWaste({ ...collectwaste, comment: text });
                        }}
                      />
                      {!collectwaste?.comment && <Text style={styles.commentAstring}>*</Text>}
                    </View>
                    {collectCommentValidationMessage && <Text style={styles.validationMessageCollectStyle1}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                  </View>
                </View>
                }
                {isSelected == 2 && <View style={styles.collectthirdsectionmainview}>
                  <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
                    <View style={styles.collectthirdsectiontopbarview}>
                      <Image source={Images.closebar} />
                    </View>
                  </TouchableOpacity>
                  {isSelected >= 1 ? (
                    <View style={styles.collectthirdsectionheadermainview}>
                      <View style={styles.collectthirdsectionbackimageview}>
                        <TouchableOpacity onPress={() => processStepsBackController()}>
                          <Image
                            source={Images.back1}
                            style={styles.collectModelImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.collectthirdsectionheadertextview}>
                        <Text style={styles.collectthirdsectionheadertext}>Review</Text>
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
                        <Text style={styles.collectwastetext}>Waste Type - </Text>
                        <Text style={styles.collectwasteresponsetext}>
                          {collectwaste?.waste}
                        </Text>
                      </View>
                      <View style={[styles.collectquantityview, { flexDirection: "row" }]}>
                        <Text style={styles.collectquantitytext}>Quantity - </Text>
                        <Text style={styles.collectquantityresponsetext}>
                          {collectwaste?.quantity}
                        </Text>
                        <Text style={styles.collectquantitymeasuresresponsetext}>
                          {" "}{collectwaste?.quantitymeasure}
                        </Text>
                      </View>
                      <View style={styles.collectdatetimeview}>
                        <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                        <Text style={styles.collectdatetimeresponsetext}>
                          {/* @ts-ignore */}
                          {(moment(collectwaste?.date).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}
                        </Text>
                      </View>
                      <View style={styles.collectlocationview}>
                        <Text style={styles.collectlocationtext}>Site Name - </Text>
                        <Text style={styles.collectlocationresponsetext}>
                          {collectwaste?.siteName}
                        </Text>
                      </View>
                      <View style={styles.collectcommentview}>
                        <Text style={styles.collectcommenttext}>Comments - </Text>
                        <Text style={styles.collectcommentresponsetext}>
                          {collectwaste?.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                }
                <View
                  style={styles.mainview}
                >
                  {isSelected < 2 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacity}
                      onPress={() => {
                        processStepsController();
                      }}
                    >
                      <Text
                        style={styles.maintouchableopacitytext}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={styles.mainview1}
                    >
                      <View
                        style={styles.mainview2}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false), clearCollectData(), initialController();
                          }}
                        >
                          <View
                            style={styles.mainview3}
                          >
                            <Text
                              style={styles.maintext1}
                            >
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={styles.mainview4}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            collectSaveValidation();
                          }}
                        >
                          <View
                            style={styles.mainview5}
                          >
                            <Text
                              style={styles.maintext1}
                            >
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

      {/*  Disposal ....... Modal */}
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
              <View
                style={styles.progressstep1view}
              >
                {isSelected1 == 0 &&
                  <View style={styles.processingfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearDisposalData(), initialController1(); }}>
                      <View style={styles.processingfirstsectiontopbarview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View style={styles.processingfirstsectionheaderbackimagrview}>
                          <TouchableOpacity onPress={() => setShowModal1(false)}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.processingfirstsectionheadertextview}>
                          <Text style={styles.processingfirstsectionheadertext}>
                            Disposal
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View style={styles.processingfirstsectionheaderbackimagrview}>
                          <TouchableOpacity onPress={() => { setShowModal1(false), clearDisposalData(); }}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.processingfirstsectionheadertextview}>
                          <Text style={styles.processingfirstsectionheadertext}>
                            Disposal
                          </Text>
                        </View>
                      </View>
                    )}

                    <View style={styles.processingfirstsectionstepindicatopview}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition2}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View style={styles.processingfirstsectiomtotalwastemainview}>
                        <View style={styles.processingfirstsectiontotalwasteview}>
                          <Text style={styles.analysisLabelText}>
                            Total Waste
                            <Text style={styles.quantityAstringp}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.processingfirstsectionweight1textinputmainview}>
                          <View style={styles.processingfirstsectionweight1textinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              value={processingwaste?.totalWaste ?? ""}
                              onChangeText={(text) => {
                                setTotalWasteDisposal(false);
                                setProcessingWaste({ ...processingwaste, totalWaste: text });
                              }}
                            ></TextInput>
                          </View>

                        </View>
                        <View style={styles.processingfirstsectiondropdown1mainview}>
                          <View style={styles.processingfirstsectiondropdown1view}>
                            <Dropdown
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure1 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure1: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>

                      </View>
                      {totalWasteDisposal && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.IWMTOTALWASTE}</Text>}
                      <View style={styles.processingfirstsectiontotalrdfmainview}>
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={styles.analysisLabelText}>
                            DLF
                            <Text style={styles.quantityAstringpdlf}>*</Text>
                          </Text>

                        </View>
                        <View style={styles.processingfirstsectionweight2textinputmainview}>
                          <View style={styles.processingfirstsectionweight2textinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={processingwaste?.dlf ?? ""}
                              onChangeText={(text) => {
                                setTotalDlf(false);
                                setProcessingWaste({ ...processingwaste, dlf: text });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.processingfirstsectiondropdown2mainview}>
                          <View style={styles.processingfirstsectiondropdown2view}>
                            <Dropdown
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure2 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure2: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>

                      </View>
                      {totaldlf && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMDLF}</Text>}
                      <View style={styles.processingfirstsectiontotalinertsmainview}>
                        <View
                          style={styles.sortingModelView}
                        >
                          <Text style={styles.analysisLabelText}>
                            LAT
                            <Text style={styles.quantityAstringpdlf}>*</Text>
                          </Text>

                        </View>

                        <View
                          style={styles.sortingModelView1}
                        >
                          <View
                            style={styles.sortingModelView2}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={processingwaste?.lat ?? ""}
                              onChangeText={(text) => {
                                text != "" && setTotalLat(false);
                                setProcessingWaste({
                                  ...processingwaste,
                                  lat: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.sortingModelView3}
                        >
                          <View
                            style={styles.sortingModelView4}
                          >
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure3 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure3: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totallat && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMLAT}</Text>}
                      <View
                        style={styles.sortingModelView5}
                      >
                        <View
                          style={styles.sortingModelView6}
                        >
                          <Text style={[styles.analysisLabelText, { top: 2 }]}>
                            Incineration
                            <Text style={styles.quantityAstringpincineration}>*</Text>
                          </Text>

                        </View>
                        <View
                          style={styles.sortingModelView1}
                        >
                          <View
                            style={styles.sortingModelView2}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={processingwaste?.incineration ?? ""}
                              onChangeText={(text) => {
                                setTotalIncineration(false);
                                setProcessingWaste({
                                  ...processingwaste,
                                  incineration: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.sortingModelView3}
                        >
                          <View
                            style={styles.sortingModelView4}
                          >
                            <Dropdown
                              placeholder="MT"
                              data={data4}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure4 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure4: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalincineration && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMINCINERATION}</Text>}
                      <View
                        style={styles.sortingModelView5}
                      >
                        <View
                          style={styles.sortingModelView6}
                        >
                          <Text style={styles.analysisLabelText}>
                            AFRF
                            <Text style={styles.quantityAstringpafrf}>*</Text>
                          </Text>

                        </View>

                        <View
                          style={styles.sortingModelView1}
                        >
                          <View
                            style={styles.sortingModelView2}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={processingwaste?.afrf ?? ""}
                              onChangeText={(text) => {
                                text != "" && setTotalAfrf(false);
                                setProcessingWaste({
                                  ...processingwaste,
                                  afrf: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.sortingModelView3}
                        >
                          <View
                            style={styles.sortingModelView4}
                          >
                            <Dropdown
                              placeholder="MT"
                              data={data5}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure5 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure5: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    {totalafrf && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMAFRF}</Text>}
                  </View>
                }
                {isSelected1 == 1 &&
                  <View
                    style={styles.processingfirstsectionmainview}
                  >
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearDisposalData(), initialController1(); }}>
                      <View
                        style={styles.sortingModelView8}
                      >
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View
                        style={styles.collectModelView}
                      >
                        <View
                          style={styles.collectModelView1}
                        >
                          <TouchableOpacity onPress={() => processStepsBackController1()}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View
                            style={styles.collectModelView2}
                          >
                            <Text
                              style={styles.sortingModelText}
                            >
                              Disposal
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
                          <ModalHeader title={"Disposal"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={styles.sortingModelView9}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition3}
                        stepCount={2}
                      />
                    </View>
                    <View
                      style={styles.sortingModelView10}
                    >
                      <View
                        style={styles.sortingModelView5}
                      >
                        <View
                          style={styles.sortingModelView11}
                        >
                          <Text style={styles.collectLabelDateText}>Select Date
                            <Text style={styles.quantityAstringp4}>*</Text>
                          </Text>

                        </View>

                        <View
                          style={styles.sortingModelView12}
                        >
                          <View
                            style={styles.sortingModelView13}
                          >
                            <TouchableOpacity
                              onPress={showDatePicker1}
                            >
                              <Text
                                style={styles.sortingModelDateText}
                              >
                                {date1 ? moment(date1).format("DD-MM-YYYY") : "Select Date"}
                              </Text>
                              <DateTimePickerModal
                                isVisible={isDatePickerVisible1}
                                mode="date"
                                maximumDate={new Date()}
                                onConfirm={handleConfirm1}
                                onCancel={hideDatePicker1}
                                // @ts-ignore
                                value={processingwaste?.dateselection1 ?? ""}
                                onChangeText={(text) =>
                                  setProcessingWaste({
                                    ...processingwaste,
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
                          <Text style={[styles.collectLabelDateText, { top: 10 }]}>Location</Text>
                        </View>
                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.locationTextField}
                              editable={false}
                              value={processingwaste?.location2 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.collectSiteNameText}>Site Name</Text>
                        </View>

                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview1}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.collectSiteNameTextField}
                              editable={false}
                              value={processingwaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View
                        style={styles.sortingModelView15}
                      >
                        <TextInput

                          style={!processingwaste?.comment2 ? styles.collectmodalcommenttextinput12 : styles.collectmodalcommenttextinput123}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={processingwaste?.comment2 ?? ""}
                          onChangeText={(text) => {
                            setDistributeComment(false);
                            setProcessingWaste({ ...processingwaste, comment2: text });
                          }}
                        />
                        {!processingwaste?.comment2 && <Text style={styles.commentAstring}>*</Text>}
                      </View>
                      {distributecomment && <Text style={styles.validationMessageDisposalStyle}>{VALIDATE_FORM.PROCESSINGCOMMENT}</Text>}
                    </View>
                  </View>
                }
                {isSelected1 == 2 &&
                  <View
                    style={styles.sortingModelView7}
                  >
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearDisposalData(), initialController1(); }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>

                    {isSelected1 >= 1 ? (
                      <View
                        style={styles.collectModelView}
                      >
                        <View
                          style={styles.collectModelView1}
                        >
                          <TouchableOpacity onPress={() => processStepsBackController1()}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.collectModelView2}
                        >
                          <Text
                            style={styles.sortingModelReview}
                          >
                            Review
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false);
                          }}
                        >
                          <ModalHeader title={"Disposal"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={styles.sortingModelView16}
                    >
                      <View>
                        <View style={styles.collectreviewmaininputview}>
                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Waste - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.totalWaste}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure1}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>DLF - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.dlf}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure2}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>LAT - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.lat}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure3}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Incineration - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.incineration}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure4}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>AFRF - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.afrf}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure5}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.collectdatetimeview}>
                            <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                            <Text style={styles.collectdatetimeresponsetext}>
                              {/* @ts-ignore */}
                              {(moment(processingwaste?.date1).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}
                            </Text>
                          </View>
                          <View style={styles.collectlocationview}>
                            <Text style={styles.collectlocationtext}>Site Name - </Text>
                            <Text style={styles.collectlocationresponsetext}>
                              {processingwaste?.siteName}
                            </Text>
                          </View>

                          <View style={styles.collectcommentview}>
                            <Text style={styles.collectcommenttext}>Comments - </Text>
                            <Text style={styles.collectcommentresponsetext12}>
                              {processingwaste?.comment2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                <View
                  style={styles.mainview}
                >
                  {isSelected1 < 2 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacity}
                      onPress={() => {
                        processStepsController1();
                        // validationWaste();
                      }}
                    >
                      <Text
                        style={styles.maintouchableopacitytext}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={styles.mainview1}
                    >
                      <View
                        style={styles.mainview2}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false), clearDisposalData(), initialController1();
                          }}
                        >
                          <View
                            style={styles.mainview3}
                          >
                            <Text
                              style={styles.maintouchableopacitytext}
                            >
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={styles.mainview4}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            disposalSaveValidation();
                          }}
                        >
                          <View
                            style={styles.mainview5}
                          >
                            <Text
                              style={styles.maintouchableopacitytext}
                            >
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

      {/* LeftOverStock .... Modal */}
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
              <View
                style={styles.progressstep1view}
              >
                {isSelected2 == 0 &&
                  <View style={styles.processingfirstsectionmainview}>

                    <TouchableOpacity onPress={() => { setShowModal2(false), clearLeftoverStockData(), initialController2(); }}>
                      <View style={styles.processingfirstsectiontopbarview}>

                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected2 >= 1 ? (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View style={styles.processingfirstsectionheaderbackimagrview}>
                          <TouchableOpacity onPress={() => setShowModal2(false)}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.processingfirstsectionheadertextview}>
                          <Text style={styles.processingfirstsectionheadertext}>
                            Leftover Stock
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View style={styles.processingfirstsectionheaderbackimagrview}>
                          <TouchableOpacity onPress={() => { setShowModal2(false), clearLeftoverStockData(); }}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.processingfirstsectionheadertextview}>
                          <Text style={styles.processingfirstsectionheadertext}>
                            Leftover Stock
                          </Text>
                        </View>
                      </View>
                    )}
                    <View style={styles.processingfirstsectionstepindicatopview}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition2}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View style={styles.processingfirstsectiomtotalwastemainview}>
                        <View style={styles.processingfirstsectiontotalwasteview}>
                          <Text style={styles.analysisLabelText}>
                            Total Waste
                            <Text style={styles.quantityAstringp}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.processingfirstsectionweight1textinputmainview}>
                          <View style={styles.processingfirstsectionweight1textinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              value={leftoverStock?.totalwaste ?? ""}
                              onChangeText={(text) => {
                                setTotalWasteleftOver(false);
                                setLeftoverStock({ ...leftoverStock, totalwaste: text });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.processingfirstsectiondropdown1mainview}>
                          <View style={styles.processingfirstsectiondropdown1view}>
                            <Dropdown
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={leftoverStock?.quantitymeasure7 ?? ""}
                              onChangeText={(text) =>

                                setLeftoverStock({
                                  ...leftoverStock,
                                  quantitymeasure7: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalWasteleftOver && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.IWMTOTALWASTE}</Text>}

                      <View style={styles.processingfirstsectiontotalrdfmainview}>
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={styles.analysisLabelText}>
                            DLF
                            <Text style={styles.quantityAstringpdlf}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.processingfirstsectionweight2textinputmainview}>
                          <View style={styles.processingfirstsectionweight2textinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={leftoverStock?.dlf ?? ""}
                              onChangeText={(text) => {
                                setdlfleftOver(false);
                                setLeftoverStock({ ...leftoverStock, dlf: text });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.processingfirstsectiondropdown2mainview}>
                          <View style={styles.processingfirstsectiondropdown2view}>
                            <Dropdown
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={leftoverStock?.quantitymeasure8 ?? ""}
                              onChangeText={(text) =>
                                setLeftoverStock({
                                  ...leftoverStock,
                                  quantitymeasure8: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {dlfleftOver && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMDLF}</Text>}
                      <View style={styles.processingfirstsectiontotalinertsmainview}>
                        <View
                          style={styles.sortingModelView6}
                        >
                          <Text style={styles.analysisLabelText}>
                            LAT
                            <Text style={styles.quantityAstringpdlf}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={styles.sortingModelView1}
                        >
                          <View
                            style={styles.sortingModelView2}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={leftoverStock?.lat ?? ""}
                              onChangeText={(text) => {
                                setLatleftOver(false);
                                setLeftoverStock({
                                  ...leftoverStock,
                                  lat: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.sortingModelView3}
                        >
                          <View
                            style={styles.sortingModelView4}
                          >
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={leftoverStock?.quantitymeasure9 ?? ""}
                              onChangeText={(text) =>
                                setLeftoverStock({
                                  ...leftoverStock,
                                  quantitymeasure9: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {latOver && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMLAT}</Text>}
                      <View
                        style={styles.sortingModelView5}
                      >
                        <View
                          style={styles.sortingModelView6}
                        >
                          <Text style={[styles.analysisLabelText, { top: 2 }]}>
                            Incineration
                            <Text style={styles.quantityAstringpincineration}>*</Text>
                          </Text>
                        </View>

                        <View
                          style={styles.sortingModelView1}
                        >
                          <View
                            style={styles.sortingModelView2}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={leftoverStock?.incineration ?? ""}
                              onChangeText={(text) => {
                                setincleftOver(false);
                                setLeftoverStock({
                                  ...leftoverStock,
                                  incineration: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.sortingModelView3}
                        >
                          <View
                            style={styles.sortingModelView4}
                          >
                            <Dropdown
                              placeholder="MT"
                              data={data4}
                              underlineColor="transparent"
                              value={leftoverStock?.quantitymeasure10 ?? ""}
                              onChangeText={(text) =>
                                setLeftoverStock({
                                  ...leftoverStock,
                                  quantitymeasure10: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {incleftOver && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMINCINERATION}</Text>}
                      <View
                        style={styles.sortingModelView5}
                      >
                        <View
                          style={styles.sortingModelView6}
                        >
                          <Text style={styles.analysisLabelText}>
                            AFRF
                            <Text style={styles.quantityAstringpafrf}>*</Text>
                          </Text>
                        </View>
                        <View
                          style={styles.sortingModelView1}
                        >
                          <View
                            style={styles.sortingModelView2}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.analysisTextField}
                              placeholder="Weight"
                              value={leftoverStock?.afrf ?? ""}
                              onChangeText={(text) => {
                                setafrfleftOver(false);
                                setLeftoverStock({
                                  ...leftoverStock,
                                  afrf: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={styles.sortingModelView3}
                        >
                          <View
                            style={styles.sortingModelView4}
                          >
                            <Dropdown
                              placeholder="MT"
                              data={data5}
                              underlineColor="transparent"
                              value={leftoverStock?.quantitymeasure11 ?? ""}
                              onChangeText={(text) =>
                                setLeftoverStock({
                                  ...leftoverStock,
                                  quantitymeasure11: text,
                                })
                              }
                              inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                              containerStyle={styles.modelDropdowmWasteContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.modelDropdowmWasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {afrfleftOver && <Text style={styles.validationDisposalDLFMessageStyle}>{VALIDATE_FORM.IWMAFRF}</Text>}
                    </View>
                  </View>
                }
                {isSelected2 == 1 &&
                  <View
                    style={styles.sortingModelView7}
                  >
                    <TouchableOpacity onPress={() => { setShowModal2(false), clearLeftoverStockData(), initialController2(); }}>
                      <View
                        style={styles.sortingModelView8}
                      >
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected2 >= 1 ? (
                      <View
                        style={styles.distributeModelView}
                      >
                        <View
                          style={styles.collectModelView1}
                        >
                          <TouchableOpacity onPress={() => processStepsBackController2()}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal2(false)}>
                          <View
                            style={styles.collectModelView2}
                          >
                            <Text
                              style={styles.sortingModelText}
                            >
                              Leftover Stock
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
                          <ModalHeader title={"Leftover Stock"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={styles.sortingModelView9}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition3}
                        stepCount={2}
                      />
                    </View>
                    <View
                      style={styles.sortingModelView10}
                    >
                      <View
                        style={styles.sortingModelView5}
                      >
                        <View
                          style={styles.sortingModelView11}
                        >
                          <Text style={styles.collectLabelDateText}>Select Date
                            <Text style={styles.quantityAstringp4}>*</Text>
                          </Text>

                        </View>
                        <View
                          style={styles.sortingModelView12}
                        >
                          <View
                            style={styles.sortingModelView13}
                          >
                            <TouchableOpacity

                              onPress={showDatePicker2}
                            >
                              <Text
                                style={styles.sortingModelDateText}
                              >
                                {date2 ? moment(date2).format("DD-MM-YYYY") : "Select Date"}
                              </Text>
                              <DateTimePickerModal
                                isVisible={isDatePickerVisible2}
                                mode="date"
                                maximumDate={new Date()}
                                onConfirm={handleConfirm2}
                                onCancel={hideDatePicker2}
                                // @ts-ignore
                                value={processingwaste?.dateselection2 ?? ""}
                                onChangeText={(text) =>
                                  setProcessingWaste({
                                    ...processingwaste,
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
                          <Text style={[styles.collectLabelDateText, { top: Platform.OS === 'ios' ? 13 : 10 }]}>Location</Text>
                        </View>
                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={[styles.losLocationTextField]}
                              editable={false}
                              value={leftoverStock?.location3 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={[styles.collectLabelDateText, { top: Platform.OS === 'ios' ? 11 : 10 }]}>Site Name</Text>
                        </View>
                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview1}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.losSiteNameTextField}
                              editable={false}
                              value={leftoverStock?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View
                        style={styles.sortingModelView15}
                      >
                        <TextInput
                          style={!leftoverStock?.comment3 ? styles.collectmodalcommenttextinput12 : styles.collectmodalcommenttextinput123}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={leftoverStock?.comment3 ?? ""}
                          onChangeText={(text) => {
                            setcommentleftOver(false);
                            setLeftoverStock({ ...leftoverStock, comment3: text });
                          }}
                        />
                        {!leftoverStock?.comment3 && <Text style={styles.commentAstring}>*</Text>}
                      </View>
                      {commentleftOver && <Text style={styles.validationMessageStyle1}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                    </View>
                  </View>
                }
                {isSelected2 == 2 &&
                  <View
                    style={styles.sortingModelView7}
                  >
                    <TouchableOpacity onPress={() => { setShowModal2(false), clearLeftoverStockData(), initialController2(); }}>
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>

                    {isSelected2 >= 1 ? (
                      <View
                        style={styles.collectModelView}
                      >
                        <View
                          style={styles.collectModelView1}
                        >
                          <TouchableOpacity onPress={() => processStepsBackController2()}>
                            <Image
                              source={Images.back1}
                              style={styles.collectModelImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.collectModelView2}
                        >
                          <Text
                            style={styles.sortingModelText}
                          >
                            Review
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false);
                          }}
                        >
                          <ModalHeader title={"Leftover Stock"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={styles.sortingModelView16}
                    >
                      <View>
                        <View style={styles.collectreviewmaininputview}>
                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Waste - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {leftoverStock?.totalwaste}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>

                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {leftoverStock?.quantitymeasure7}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>DLF - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {leftoverStock?.dlf}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {leftoverStock?.quantitymeasure8}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>LAT - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {leftoverStock?.lat}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {leftoverStock?.quantitymeasure9}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Incineration - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {leftoverStock?.incineration}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {leftoverStock?.quantitymeasure10}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>AFRF - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {leftoverStock?.afrf}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {leftoverStock?.quantitymeasure11}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.collectdatetimeview}>
                            <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                            <Text style={styles.collectdatetimeresponsetext}>
                              {/* @ts-ignore */}
                              {(moment(leftoverStock?.date2).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}
                            </Text>
                          </View>
                          <View style={styles.collectlocationview}>
                            <Text style={styles.collectlocationtext}>Site Name - </Text>
                            <Text style={styles.collectlocationresponsetext}>
                              {leftoverStock?.siteName}
                            </Text>
                          </View>

                          <View style={styles.collectcommentview}>
                            <Text style={styles.collectcommenttext}>Comments - </Text>
                            <Text style={styles.collectcommentresponsetext}>
                              {leftoverStock?.comment3}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                <View
                  style={styles.mainview}
                >
                  {isSelected2 < 2 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacity}
                      onPress={() => {
                        processStepsController2();
                      }}
                    >
                      <Text
                        style={styles.maintouchableopacitytext}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={styles.mainview1}
                    >
                      <View
                        style={styles.mainview2}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false), clearLeftoverStockData(), initialController2();
                          }}
                        >
                          <View
                            style={styles.mainview3}
                          >
                            <Text
                              style={styles.maintouchableopacitytext}
                            >
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={styles.mainview4}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            leftOverValidation();
                          }}
                        >
                          <View
                            style={styles.mainview5}
                          >
                            <Text
                              style={styles.maintouchableopacitytext}
                            >
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
  quantityAstringp4: {
    left: Platform.OS === 'android' ? 71 : "48%",
    color: 'red',
    bottom: 11,
    fontSize: 15,
  },
  quantityAstringp: {
    left: Platform.OS === 'android' ? 78 : "72%",
    color: 'red',
    bottom: 9,
    fontSize: 15,
  },
  quantityAstringpdlf: {
    left: Platform.OS === 'android' ? 30 : "28%",
    color: 'red',
    bottom: Platform.OS === 'android' ? 11 : "12%",
    fontSize: 15,
  },
  quantityAstringpincineration: {
    left: Platform.OS === 'android' ? 77 : "72%",
    color: 'red',
    bottom: 9,
    fontSize: 15,
  },
  quantityAstringpafrf: {
    left: Platform.OS === 'android' ? 37 : "36%",
    color: 'red',
    bottom: Platform.OS === 'android' ? 12 : "15%",
    fontSize: 15,
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
    height: height / 1,
    width: width / 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView1: {
    height: height / 1.2,
    width: width / 1,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  quantityAstring1: {
    left: Platform.OS === 'android' ? 56 : "54%",
    color: 'red',
    bottom: 10,
    fontSize: 15,
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
  progressstep1view: {
    height: height / 1.65,
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
  },
  mainimage2: {
    tintColor: "#FFFFFF",
    height: height / 40,
    width: width / 17,
    marginLeft: "25%",
  },
  mainview: {
    height: height / 10,
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
    height: height / 20,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
  },
  collectthirdsectionmainview: {
    height: height / 1.65,
    width: width / 1,
  },
  validationMessageStyle1: {
    color: 'red',
    left: Platform.OS === 'android' ? -70 : "-20%",
    top: 2,
  },
  validationMessageCollectStyle1: {
    color: 'red',
    left: Platform.OS === 'android' ? -70 : "-19.8%",
    top: 2,
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
  collectsecondsectiontextinputlocationview1: {
    height: height / 18,
    width: width / 2.2,
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
    height: height / 20,
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
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
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
  commentAstring: {
    color: 'red',
    left: Platform.OS === 'android' ? 74 : "24%",
    bottom: Platform.OS === 'android' ? 11 : "3%",
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
    height: height / 10,
    width: width / 2.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
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
  collectmodalcommenttextinput12: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 22 : 20,
  },
  collectmodalcommenttextinput123: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 15 : 12,
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
    fontSize: responsiveFontSize(1.7),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "500",
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
  validationMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? 34 : "10%",
  },
  validationDisposalDLFMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? 34 : "9.5%",
  },
  validationMessageDisposalStyle: {
    color: 'red',
    right: Platform.OS === 'android' ? "20%" : "20%",
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
    width: width / 1.28,
  },
  collectcommentresponsetext12: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
    width: width / 1.5,
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
    height: height / 3,
    justifyContent: "center",
    width: width / 1,
  },
  processingfirstsectiomtotalwastemainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  processingfirstsectiontotalwasteview: {
    height: height / 12,
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
    height: height / 11,
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
    top: Platform.OS === 'android' ? 11 : 12,
  },
  modelDropdowmImage: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 14 : 12,
  },
  collectModelDateText: {
    color: "black",
    fontSize: 14,
  },
  sortingModelView: {
    height: height / 11,
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
    height: height / 11,
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
    height: height / 9,
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
    top: Platform.OS === 'ios' ? 18 : 19,
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
    top: Platform.OS === 'android' ? 12 : 12,
    height: height / 13,
  },
  modelDropdowmWasteDropdownImage: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 15 : 12,
  },
  collectLabelText: {
    color: "#606060",
    top: 3,
  },
  wasteTypeTextField: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    top: Platform.OS === 'ios' ? 13 : 13,
  },
  quantityText: {
    paddingLeft: 4,
    color: "#606060",
    top: 2,
  },
  quantityTextField: {
    color: COLORS.BLACK,
    fontSize: responsiveFontSize(1.9),
    top: Platform.OS === 'ios' ? 13 : 12,
  },
  collectLabelDateText: {
    color: "#606060",
  },
  collectDateText: {
    color: "black",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 18 : 18,
  },
  collectlocationText: {
    color: "#606060",
    top: Platform.OS === 'ios' ? 11 : 8,
  },
  collectlocationTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 14,
  },
  collectSiteNameText: {
    color: "#606060",
    top: Platform.OS === 'ios' ? 10 : 7,
  },
  collectSiteNameTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 16,
    fontSize: responsiveFontSize(1.6),
  },
  collectCommenttextField: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: 8,
  },
  analysisLabelText: {
    paddingLeft: 4,
    color: "#606060",
    top: 5,
  },
  analysisTextField: {
    color: "black",
    top: Platform.OS === 'android' ? 13 : 13,
  },
  losLocationTextField: {
    color: 'black',
    top: Platform.OS === 'ios' ? 14 : 12,
  },
  losSiteNameTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 16 : 15,
    fontSize: responsiveFontSize(1.6),
  },
  locationTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 16,
  },
  reviewView: {
    flexDirection: "row",
  },
});
