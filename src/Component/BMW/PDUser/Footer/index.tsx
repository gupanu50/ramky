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
import withConnect from "./withConnect";
import React, { useState } from "react";
import { Images } from "../../../../Assets";
import { Dropdown } from "react-native-material-dropdown-v2";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import StepIndicator from "react-native-step-indicator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";
import _ from "lodash";
import { useDispatch } from "react-redux";
import Network from "../../../../Network";
import ApiClient from "../../../../Network";
import { showMessage } from "react-native-flash-message";
import { COLORS, FONT_FAMILIES, METRICS } from "../../../../Configration";
import { ActionType } from "../../../../Redux/Type";
import { VALIDATE_FORM } from "../../../../Constant";
const { height, width } = Dimensions.get("screen");
const {
  DASHBOARD_BMW_DATA,
  DASHBOARD_BMW_PROCESSING_DATA,
  DASHBOARD_BMW_DISTRIBUTE_DATA,
} = ActionType;

const Footer = (props: any) => {
  const { user } = props;
  const dispatch = useDispatch();
  let validationMessage;
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

  // ******************** Collect state *******************************
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const currentPosition = 1;
  const currentPosition1 = 2;
  const currentPosition2 = 1;
  const currentPosition3 = 2;
  const [isSelected, setSelected] = useState(0);
  const city = user.cities[0].city;
  const siteName = user.siteName[0].siteName;
  const email = user.email;
  let timeOut;
  let timeOut1;
  let timeOut2;
  const [collectwaste, setCollectedWaste] = useState({
    waste: "BMW",
    location: city,
    quantitymeasure: "MT",
    siteName: siteName,
    quantity: "",
    comment: "",
  });
  const [totalWasteValidationMessage, setTotalWasteValidationMessage] = useState(false);
  const [collectCommentValidationMessage, setCollectCommentValidationMessage] = useState(false);
  const [totalWaste1ValidationMessage, setTotalWaste1ValidationMessage] = useState(false);
  const [totalIncineration, setTotalIncineration] = useState(false);
  const [totalAutoclave, setTotalAutoclave] = useState(false);
  const [processingcomment, setProcessingComment] = useState(false);
  const [totalMaterialValidationShow, setTotalMaterialValidationShow] = useState(false);
  const [recyclablesValidationShow, setRecyclablesValidationShow] = useState(false);
  const [plasticsValidationShow, setPlasticsValidationShow] = useState(false);
  const [glassValidationShow, setGlassValidationShow] = useState(false);
  const [bagsValidationShow, setBagsValidationShow] = useState(false);
  const [cardboardValidationShow, setCardboardValidationShow] = useState(false);
  const [distributeCommentValidationShow, setDistributeCommentValidationShow] = useState(false);
  const [sortingWaste, setSortingWaste] = useState({
    location2: city,
    quantitymeasure1: "MT",
    quantitymeasure2: "MT",
    quantitymeasure3: "MT",
    siteName: siteName,
    totalwaste: "",
    incineration: "",
    autoclave: "",
    comment2: "",
  });
  const [distributeWate, setDistributeWaste] = useState({
    location3: city,
    quantitymeasure4: "MT",
    quantitymeasure5: "MT",
    quantitymeasure6: "MT",
    quantitymeasure7: "MT",
    quantitymeasure8: "MT",
    quantitymeasure9: "MT",
    siteName: siteName,
    comment3: "",
    totalMaterial: "",
    recyclables: "",
    plastics: "",
    bags: "",
    glass: "",
    cardboard: "",
  });
  const data = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [date1, setDate1] = useState();
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isSelected1, setSelected1] = useState(0);
  const data2 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data3 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [date2, setDate2] = useState();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
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
  // *******************Date Selection Method For Processing*****************
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = (date1) => {
    setDate1(date1);
    // @ts-ignore
    setSortingWaste({ ...sortingWaste, date1 });
    hideDatePicker1();
  };
  // *******************Date Selection Method For Distribute*****************
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = (date2) => {
    setDate2(date2);
    // @ts-ignore
    setDistributeWaste({ ...distributeWate, date2 });
    hideDatePicker2();
  };
  // **********************Collect Modal Going Next Page*******************
  const processStepsController = () => {
    setSelected(isSelected + 1);
  };
  // **********************Processing Distribute Modal Going Next Page*******************
  const processStepsController1 = () => {
    setSelected1(isSelected1 + 1);
  };
  // **********************Collect Modal Going Previos Page*******************
  const processStepsBackController = () => {
    setSelected(isSelected - 1);
  };
  // **********************Processing Distribute Modal Going Previos Page*******************
  const processStepsBackController1 = () => {
    setSelected1(isSelected1 - 1);
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

  // ******************* ProcessingValidation Method********************************
  const validationprocessing = () => {
    if (_.isEmpty(sortingWaste.totalwaste.trim())) {
      setTotalWaste1ValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(sortingWaste.incineration.trim())) {
      setTotalWaste1ValidationMessage(false);
      setTotalIncineration(true);
      initialController1();
      return false;
    } else if (_.isEmpty(sortingWaste.autoclave.trim())) {
      setTotalIncineration(false);
      setTotalAutoclave(true);
      initialController1();
      return false;
    } else if (_.isEmpty(sortingWaste.comment2.trim())) {
      setProcessingComment(true);
      setSelected1(1);
      return false;
    }

    return true;
  };
  const processingSaveValidation = () => {
    if (validationprocessing()) {
      setShowModal1(false);
      processingDataSave();
      clearSortingData();
      initialController1();
    }
  };
  // ******************* ProcessingValidation Method********************************
  const validationDistribution = () => {
    if (_.isEmpty(distributeWate.totalMaterial.trim())) {
      setTotalMaterialValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(distributeWate.recyclables.trim())) {
      setTotalMaterialValidationShow(false);
      setRecyclablesValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(distributeWate.plastics.trim())) {
      setRecyclablesValidationShow(false);
      setPlasticsValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(distributeWate.bags.trim())) {
      setPlasticsValidationShow(false);
      setBagsValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(distributeWate.glass.trim())) {
      setBagsValidationShow(false);
      setGlassValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(distributeWate.cardboard.trim())) {
      setGlassValidationShow(false);
      setCardboardValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(distributeWate.comment3.trim())) {
      setCardboardValidationShow(false);
      setDistributeCommentValidationShow(true);
      setSelected1(1);
      return false;
    }
    return true;
  };
  const distributionSaveValidation = () => {
    if (validationDistribution()) {
      setShowModal2(false);
      distributeDataSave();
      clearDistributeData();
      initialController1();
    }
  };
  // ***********************Collect GET API******************
  const getCollectionBmwApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().BMWcollectdashboard(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        var dateArr = _.uniq(
          arr.map((item) =>
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
              "YYYY-MM-DD"
            )
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                "YYYY-MM-DD"
              ) ===
              moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                "YYYY-MM-DD"
              )
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
      dispatch({ type: DASHBOARD_BMW_DATA, payload: displayArr });
    }
  };
  // ***********************Processing GET API******************
  const getProcessingApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().BMWprocessdashboard(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        var dateArr = _.uniq(
          arr.map((item) =>
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
              "YYYY-MM-DD"
            )
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                "YYYY-MM-DD"
              ) ===
              moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                "YYYY-MM-DD"
              )
          );
          var totalIncineration = 0;
          var totalAutoclave = 0;
          var totalWaste = 0;
          filterDateArr.forEach((item) => {
            totalIncineration = totalIncineration + item.totalIncineration ?? 0;
            totalAutoclave = totalAutoclave + item.totalAutoclave ?? 0;
            totalWaste = totalWaste + item.totalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({
            // @ts-ignore
            splitDate: element,
            // @ts-ignore
            totalIncineration,
            // @ts-ignore
            totalAutoclave,
            // @ts-ignore
            totalWaste,
          });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_BMW_PROCESSING_DATA, payload: displayArr });
    }
  };
  // ***********************Distribute GET API******************
  const getDistributionApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().BMWrecycledashboard(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        var dateArr = _.uniq(
          arr.map((item) =>
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
              "YYYY-MM-DD"
            )
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                "YYYY-MM-DD"
              ) ===
              moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                "YYYY-MM-DD"
              )
          );
          var totalRecyclable = 0;
          var totalPlastics = 0;
          var totalBags = 0;
          var totalGlass = 0;
          var totalCardboard = 0;
          filterDateArr.forEach((item) => {
            totalRecyclable = totalRecyclable + item.totalRecyclable ?? 0;
            totalPlastics = totalPlastics + item.totalPlastics ?? 0;
            totalBags = totalBags + item.totalBags ?? 0;
            totalGlass = totalGlass + item.totalGlass ?? 0;
            totalCardboard = totalCardboard + item.totalCardboard ?? 0;
          });
          // @ts-ignore
          displayArr.push({
            // @ts-ignore
            splitDate: element,
            // @ts-ignore
            totalRecyclable,
            // @ts-ignore
            totalPlastics,
            // @ts-ignore
            totalBags,
            // @ts-ignore
            totalGlass,
            // @ts-ignore
            totalCardboard,
          });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_BMW_DISTRIBUTE_DATA, payload: displayArr });
    }
  };
  // ***********************Collect Save API******************
  const collectDataSave = async () => {
    // @ts-ignore
    var time = moment(collectwaste?.date).format(`YYYY-MM-DD`);
    var dateTime = moment().format(`HH:mm:ss:SSS Z`);
    var dateTime1 = time + " " + dateTime;
    const body = {
      wasteType: collectwaste?.waste,
      // @ts-ignore
      quantity: collectwaste?.quantity + " " + collectwaste?.quantitymeasure,
      date: dateTime1,
      location: collectwaste?.location,
      siteName: [{ siteName: collectwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: collectwaste?.comment,
    };
    const result = await Network.createApiClient().postbmwsavecollect(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut = setInterval(getCollectionBmwApi, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Processing Save API******************
  const processingDataSave = async () => {
    // @ts-ignore
    var time = moment(sortingWaste?.date1).format(`YYYY-MM-DD`);
    var dateTime = moment().format(`HH:mm:ss:SSS Z`);
    var dateTime1 = time + " " + dateTime;
    const body = {
      totalWaste:
        // @ts-ignore
        sortingWaste?.totalwaste + " " + sortingWaste?.quantitymeasure1,
      totalIncineration:
        // @ts-ignore
        sortingWaste?.incineration + " " + sortingWaste?.quantitymeasure2,
      totalAutoclave:
        // @ts-ignore
        sortingWaste?.autoclave + " " + sortingWaste?.quantitymeasure3,
      date: dateTime1,
      location: sortingWaste?.location2,
      siteName: [{ siteName: sortingWaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: sortingWaste?.comment2,
    };
    const result = await Network.createApiClient().postbmwsaveprocess(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut1 = setInterval(getProcessingApi, 200);
    } else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Distribute Save API******************
  const distributeDataSave = async () => {
    // @ts-ignore
    var time = moment(distributeWate?.date2).format(`YYYY-MM-DD`);
    var dateTime = moment().format(`HH:mm:ss:SSS Z`);
    var dateTime1 = time + " " + dateTime;
    const body = {
      totalMaterials:
        // @ts-ignore
        distributeWate?.totalMaterial + " " + distributeWate?.quantitymeasure4,
      totalRecyclable:
        // @ts-ignore
        distributeWate?.recyclables + " " + distributeWate?.quantitymeasure5,
      totalPlastics:
        // @ts-ignore
        distributeWate?.plastics + " " + distributeWate?.quantitymeasure6,
      // @ts-ignore
      totalBags: distributeWate?.bags + " " + distributeWate?.quantitymeasure7,
      totalGlass:
        // @ts-ignore
        distributeWate?.glass + " " + distributeWate?.quantitymeasure8,
      totalCardboard:
        // @ts-ignore
        distributeWate?.cardboard + " " + distributeWate?.quantitymeasure9,
      date: dateTime1,
      location: distributeWate?.location3,
      siteName: [{ siteName: distributeWate?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: distributeWate?.comment3,
    };
    const result = await Network.createApiClient().postbmwsavedistribute(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut2 = setInterval(getDistributionApi, 200);
    } else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController = () => {
    setSelected(0);
  };
  const initialController1 = () => {
    setSelected1(0);
  };
  // ***********************Clear Modal Data On Cancel And Submission******************
  const clearCollectData = () => {
    setCollectedWaste({
      ...collectwaste,
      // @ts-ignore
      quantity: "",
      comment: "",
      quantitymeasure: "MT",
    });
    setTotalWasteValidationMessage(false);
    setCollectCommentValidationMessage(false);
    // @ts-ignore
    setDate(null);
  };

  const clearSortingData = () => {
    setSortingWaste({
      // @ts-ignore
      ...sortingWaste,
      // @ts-ignore
      totalwaste: "",
      incineration: "",
      autoclave: "",
      comment2: "",
      quantitymeasure1: "MT",
      quantitymeasure2: "MT",
      quantitymeasure3: "MT",

    });
    setTotalWaste1ValidationMessage(false);
    setProcessingComment(false);
    setTotalIncineration(false);
    setTotalAutoclave(false);
    // @ts-ignore
    setDate1(null);
  };

  const clearDistributeData = () => {
    setDistributeWaste({
      ...distributeWate,
      // @ts-ignore
      totalMaterial: "",
      recyclables: "",
      plastics: "",
      bags: "",
      glass: "",
      cardboard: "",
      comment3: "",
      quantitymeasure4: "MT",
      quantitymeasure5: "MT",
      quantitymeasure6: "MT",
      quantitymeasure7: "MT",
      quantitymeasure8: "MT",
      quantitymeasure9: "MT",
    });
    // @ts-ignore
    setDate2(null);
    setDistributeCommentValidationShow(false);
    setTotalMaterialValidationShow(false);
    setRecyclablesValidationShow(false);
    setPlasticsValidationShow(false);
    setGlassValidationShow(false);
    setCardboardValidationShow(false);
    setBagsValidationShow(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.firsticonView}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Image
            source={Images.collect}
            style={[styles.mainimage, { marginLeft: 10 }]}
          />
          <Text style={styles.maintext}>Collect</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondiconView}>
        <TouchableOpacity onPress={() => setShowModal1(!showModal1)}>
          <Image source={Images.sorting} style={styles.mainimage1} />
          <Text style={styles.maintext}>Processing</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ThirdiconView}>
        <TouchableOpacity onPress={() => setShowModal2(!showModal2)}>
          <Image source={Images.distribute} style={styles.mainimage2} />
          <Text style={styles.maintext}>Distribute</Text>
        </TouchableOpacity>
      </View>

      {/* ************************    Collect Modal     ************************* */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.collectmodalmainview}>
                {isSelected == 0 && (
                  <View style={styles.collectfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
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
                      <View style={styles.collectmodaltouchablemainview}>
                        <View style={styles.collectmodaltouchablesubview}>
                          <TouchableOpacity
                            onPress={() => {
                              setShowModal(false), clearCollectData();
                            }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.sortingviewimage1}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                          <View style={styles.collectmodalcollecttextview}>
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
                          <Text style={styles.collectmodalwastetypetext}>
                            Waste Type
                          </Text>
                        </View>
                        <View style={styles.collectfirstsectionwastemainview}>
                          <KeyboardAwareScrollView>
                            <View
                              pointerEvents="none"
                              style={styles.collectfirstsectionwasteview}
                            >
                              <TextInput
                                style={styles.wasteTypeTextField}
                                editable={false}
                                value={collectwaste?.waste ?? ""}
                              />
                            </View>
                          </KeyboardAwareScrollView>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.collectfirstsectionquantitymainview,
                          { top: 0 },
                        ]}
                      >
                        <View style={styles.collectfirstsectionquantityview}>
                          <Text style={styles.collectmodalquantitytext}>
                            Quantity
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
                                setCollectedWaste({
                                  ...collectwaste,
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
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.sortingmodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalWasteValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.MSWCTQUANTITY}</Text>}
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
                            onPress={() => processStepsBackController()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectmodalimage1}
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
                          <Text style={styles.collectmodalselectdatetext}>
                            Select Date
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
                              <Text
                                style={styles.collectmodalselecrdatevaluetext}
                              >
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
                          <Text style={styles.collectmodallocationtext}>
                            Location
                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview1234
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.collectmodallocationtextinput}
                              editable={false}
                              value={collectwaste?.location ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.collectmodalsitenametext}>
                            Site Name
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
                              style={styles.collectmodalsitenametextinput}
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
                          // @ts-ignore
                          value={collectwaste?.comment ?? ""}
                          onChangeText={(text) => {
                            setCollectCommentValidationMessage(false);
                            setCollectedWaste({
                              ...collectwaste,
                              // @ts-ignore
                              comment: text,
                            });
                          }}
                        />
                        {/* @ts-ignore */}
                        {!collectwaste?.comment && <Text style={styles.commentAstring}>*</Text>}
                      </View>
                      {collectCommentValidationMessage && <Text style={styles.validationMessageStyle1}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
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
                            onPress={() => processStepsBackController()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.collectmodalimage2}
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

                <View style={styles.collectmodalsecondpagemaineview}>
                  {isSelected < 2 ? (
                    <TouchableOpacity
                      style={styles.collectmodalsecondpageTouchable}
                      onPress={() => {
                        processStepsController();
                      }}
                    >
                      <Text style={styles.collectmodalsecondpagenextText}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.collectmodalcancelbuttonmainview}>
                      <View style={styles.collectmodalcancelbuttonsubview}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false),
                              clearCollectData(),
                              initialController();
                          }}
                        >
                          <View style={styles.collectmodalcancelmainview1}>
                            <Text style={styles.collectmodalcanceltext}>
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.collectmodalsubmitTouchableview}>
                        <TouchableOpacity
                          onPress={() => {
                            {
                              collectSaveValidation();
                            }
                          }}
                        >
                          <View style={styles.collectmodalsubmitview}>
                            <Text style={styles.collectmodalsubmittext}>
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
      {/* ************************    Collect Modal     ************************* */}

      {/* ************************    Processing Modal     ************************* */}

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
              <View style={styles.sortingmainview}>
                {isSelected1 == 0 && (
                  <View style={styles.processingfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearSortingData(), initialController1(); }}>
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
                              style={styles.sortingviewimage1}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Processing
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
                              setShowModal1(false), clearSortingData();
                            }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.sortingviewimage2}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Processing
                          </Text>
                        </View>
                      </View>
                    )}

                    <View style={styles.sortingfirstsectionstepindicatopview}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition2}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.sortingmodaltotalwastetext}>
                            Total Waste
                            <Text style={styles.quantityAstringp}>*</Text>
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
                              style={styles.processingTextField}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              value={sortingWaste?.totalwaste ?? ""}
                              onChangeText={(text) => {
                                setTotalWaste1ValidationMessage(false);
                                setSortingWaste({
                                  ...sortingWaste,
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
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={sortingWaste?.quantitymeasure1 ?? ""}
                              onChangeText={(text) =>
                                setSortingWaste({
                                  ...sortingWaste,
                                  quantitymeasure1: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.sortingmodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalWaste1ValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PROCESSINGTOTALWASTE}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={styles.sortingmodalincinerationtext}>
                            Incineration
                            <Text style={styles.quantityAstringp2}>*</Text>
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
                              style={styles.processingTextField}
                              placeholder="Weight"
                              value={sortingWaste?.incineration ?? ""}
                              onChangeText={(text) => {
                                setTotalIncineration(false);
                                setSortingWaste({
                                  ...sortingWaste,
                                  incineration: text,
                                });
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
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={sortingWaste?.quantitymeasure2 ?? ""}
                              onChangeText={(text) =>
                                setSortingWaste({
                                  ...sortingWaste,
                                  quantitymeasure2: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />

                            <Image
                              source={Images.footerDropdown}
                              style={styles.sortingmodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalIncineration && <Text style={styles.validationIncinerationMessageStyle}>{VALIDATE_FORM.PROCESSINGINCINERATION}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.sortingmodalautoclaveview}>
                          <Text style={styles.sortingmodalautoclavetext}>
                            Autoclave
                            <Text style={styles.quantityAstringp3}>*</Text>
                          </Text>

                        </View>
                        <View
                          style={styles.sortingmodalautoclavetextinputmainview}
                        >
                          <View
                            style={styles.sortingmodalautoclavetextinputsubview}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.processingTextField}
                              placeholder="Weight"
                              value={sortingWaste?.autoclave ?? ""}
                              onChangeText={(text) => {
                                setTotalAutoclave(false);
                                setSortingWaste({
                                  ...sortingWaste,
                                  autoclave: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.sortingmodalquantity1mainview}>
                          <View style={styles.sortingmodalquanity1subview}>
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={sortingWaste?.quantitymeasure3 ?? ""}
                              onChangeText={(text) =>
                                setSortingWaste({
                                  ...sortingWaste,
                                  quantitymeasure3: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.sortingmodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalAutoclave && <Text style={styles.validationIncinerationMessageStyle}>{VALIDATE_FORM.PROCESSINGAUTOCLAVE}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 1 && (
                  <View style={styles.sortingmodalmainviewsecondpage}>
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearSortingData(), initialController1(); }}>
                      <View style={styles.sortingmodalclosebarimageview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.sortingmodalheadermainview}>
                        <View
                          style={styles.sortingmodalheadersTouchableimageview}
                        >
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.sortingmodalbackimage1}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View
                            style={styles.sortingmodalprocessingtextheaderview}
                          >
                            <Text style={styles.sortingmodalprocessingtext}>
                              Processing
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
                          <ModalHeader title={"Sorting"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.sortingmodalstepindicatorview}>
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition3}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.sortingmodalsecondpagecontentmainview}>
                      <View style={styles.sortingmodalselectdatemainview}>
                        <View style={styles.sortingmodalselecteddatesubview}>
                          <Text style={{ color: "#606060", top: 5 }}>
                            Select Date
                            <Text style={styles.quantityAstringp4}>*</Text>
                          </Text>

                        </View>

                        <View
                          style={styles.sortingmodalselecteddateInputmainview}
                        >
                          <View
                            style={
                              styles.sortingmodalselecteddateinputTouchableview
                            }
                          >
                            <TouchableOpacity onPress={showDatePicker1}>
                              <Text style={styles.sortingmodaldatetext}>
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
                                value={sortingWaste?.dateselection1 ?? ""}
                                onChangeText={(text) =>
                                  setSortingWaste({
                                    ...sortingWaste,
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
                          <Text style={styles.sortingmodallocationtext}>
                            Location
                          </Text>
                        </View>

                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview1234
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.locationSiteNameTextField}
                              editable={false}
                              value={sortingWaste?.location2 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>

                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.sortingmodalsitenameText}>
                            Site Name
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
                              style={styles.locationSiteNameTextField}
                              editable={false}
                              value={sortingWaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.sortingmodalcommenttextinput}>
                        <TextInput
                          style={!sortingWaste?.comment2 ? styles.collectmodalcommenttextinput : styles.collectmodalcommenttextinput1}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={sortingWaste?.comment2 ?? ""}
                          onChangeText={(text) => {
                            setProcessingComment(false);
                            setSortingWaste({
                              ...sortingWaste,
                              comment2: text,
                            });
                          }}
                        />
                        {!sortingWaste?.comment2 && <Text style={styles.commentAstring}>*</Text>}
                      </View>
                      {processingcomment && <Text style={styles.validationMessageStyle1}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                    </View>

                  </View>
                )}
                {isSelected1 == 2 && (
                  <View style={styles.sortingmodalmainviewthirdpage}>
                    <View style={styles.sortingmodalclosebarimageview}>
                      <TouchableOpacity onPress={() => { setShowModal1(false), clearSortingData(), initialController1(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected1 >= 1 ? (
                      <View style={styles.sortingmodalheadermainview}>
                        <View
                          style={styles.sortingmodalheadersTouchableimageview}
                        >
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.sortingmodalbackimage1}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.sortingmodalreviewview}>
                          <Text style={styles.sortingmodalreviewtext}>
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
                          <ModalHeader title={"Sorting"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.sortingmodalthirdpagecontentmainview}>
                      <View style={{}}>
                        <View style={styles.sortingreviewmaininputview}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {sortingWaste?.totalwaste}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {sortingWaste?.quantitymeasure1}
                              </Text>
                            </View>
                          </View>

                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Incineration -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {sortingWaste?.incineration}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {sortingWaste?.quantitymeasure2}
                              </Text>
                            </View>
                          </View>

                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Autoclave -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {sortingWaste?.autoclave}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {sortingWaste?.quantitymeasure3}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.collectdatetimeview}>
                            <Text style={styles.collectdatetimetext}>
                              Date & Time -{" "}
                            </Text>
                            <Text style={styles.collectdatetimeresponsetext}>
                              {/* @ts-ignore */}
                              {moment(sortingWaste?.date1).format(
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
                              {sortingWaste?.siteName}
                            </Text>
                          </View>

                          <View style={styles.collectcommentview}>
                            <Text style={styles.collectcommenttext}>
                              Comments -{" "}
                            </Text>
                            <Text style={styles.collectcommentresponsetext}>
                              {sortingWaste?.comment2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.sortingmodalbottombuttonmainview}>
                  {isSelected1 < 2 ? (
                    <TouchableOpacity
                      style={styles.sortingmodalthirdpagenextbuttontouchable}
                      onPress={() => {
                        processStepsController1();
                      }}
                    >
                      <Text style={styles.sortingmodalthirdpagenexttext}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.sortingmodalbottommainview2}>
                      <View style={styles.sortingmodalnextbuttonmainview}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false),
                              clearSortingData(),
                              initialController1();
                          }}
                        >
                          <View style={styles.sortingmodalcancelbuttonmainview}>
                            <Text style={styles.sortingmodalcanceltext}>
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          height: height / 15,
                          width: width / 2,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            processingSaveValidation();
                          }}
                        >
                          <View style={styles.sortingmodalsubmitview}>
                            <Text style={styles.sortingmodalsubmittext}>
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
      {/* ************************    Processing Modal     ************************* */}

      {/* ************************    Distribute Modal     ************************* */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal2}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setShowModal2(false);
        }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <View style={styles.distributemodalmainview}>
                {isSelected1 == 0 && (
                  <View style={styles.processingfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController1(); }}>
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
                            onPress={() => {
                              setShowModal2(false), clearDistributeData();
                            }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.distributemodalbackimage1}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Distribute - Autoclave
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
                              setShowModal2(false), clearDistributeData();
                            }}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.distributemodalbackimage2}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
                            Distribute - Autoclave
                          </Text>
                        </View>
                      </View>
                    )}

                    <View
                      style={styles.processingfirstsectionstepindicatopview}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition2}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.distributefirstsectioninputmainview}>
                      <View
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview1}
                        >
                          <Text style={styles.totalmaterialtext}>
                            Total Material
                            <Text style={styles.quantityAstringpdistribute}>*</Text>
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
                              style={styles.distributionTextField}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              value={distributeWate?.totalMaterial ?? ""}
                              onChangeText={(text) => {
                                setTotalMaterialValidationShow(false);
                                setDistributeWaste({
                                  ...distributeWate,
                                  totalMaterial: text,
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
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={distributeWate?.quantitymeasure4 ?? ""}
                              onChangeText={(text) =>
                                setDistributeWaste({
                                  ...distributeWate,
                                  quantitymeasure4: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.distributemodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalMaterialValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.BMWDISTRIBUTETOTALMATERIAL}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View style={styles.processingfirstsectiontotalrdfview1}>
                          <Text style={styles.distributemodalrecyclablestext}>
                            Recyclables
                            <Text style={styles.quantityAstringprdf}>*</Text>
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
                              style={styles.distributionTextField}
                              placeholder="Weight"
                              value={distributeWate?.recyclables ?? ""}
                              onChangeText={(text) => {
                                setRecyclablesValidationShow(false);
                                setDistributeWaste({
                                  ...distributeWate,
                                  recyclables: text,
                                });
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
                              placeholder="MT"
                              data={data2}
                              underlineColor="transparent"
                              value={distributeWate?.quantitymeasure5 ?? ""}
                              onChangeText={(text) =>
                                setDistributeWaste({
                                  ...distributeWate,
                                  quantitymeasure5: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />

                            <Image
                              source={Images.footerDropdown}
                              style={styles.distributemodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {recyclablesValidationShow && <Text style={styles.validationMessageStyle2}>{VALIDATE_FORM.BMWDISTRIBUTERECYCLABLES}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.plasticsmainview}>
                          <Text style={styles.plasticstextdistribute}>
                            Plactics
                            <Text style={styles.quantityAstringplastic}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.plasticstextinputmainview}>
                          <View style={styles.plasticstextinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.distributionTextField}
                              placeholder="Weight"
                              value={distributeWate?.plastics ?? ""}
                              onChangeText={(text) => {
                                setPlasticsValidationShow(false);
                                setDistributeWaste({
                                  ...distributeWate,
                                  plastics: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.plasticsdropdownmainview}>
                          <View style={styles.plasticsdropdownview}>
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={distributeWate?.quantitymeasure6 ?? ""}
                              onChangeText={(text) =>
                                setDistributeWaste({
                                  ...distributeWate,
                                  quantitymeasure6: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />

                            <Image
                              source={Images.footerDropdown}
                              style={styles.distributemodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {plasticsValidationShow && <Text style={styles.validationMessageStyle2}>{VALIDATE_FORM.BMWDISTRIBUTEPLASTICS}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.Bagsmainview}>
                          <Text style={styles.Bagstext}>Bags
                            <Text style={styles.quantityAstringbag}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.BagsTextinputmainview}>
                          <View style={styles.BagsTextinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.distributionTextField}
                              placeholder="Weight"
                              value={distributeWate?.bags ?? ""}
                              onChangeText={(text) => {
                                setBagsValidationShow(false);
                                setDistributeWaste({
                                  ...distributeWate,
                                  bags: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.Bagsdropdownmainview}>
                          <View style={styles.Bagsdropdownview}>
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={distributeWate?.quantitymeasure7 ?? ""}
                              onChangeText={(text) =>
                                setDistributeWaste({
                                  ...distributeWate,
                                  quantitymeasure7: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />

                            <Image
                              source={Images.footerDropdown}
                              style={styles.distributemodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {bagsValidationShow && <Text style={styles.validationMessageStyle2}>{VALIDATE_FORM.BMWDISTRIBUTEBAGS}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.Glassmainview}>
                          <Text style={styles.Glasstext}>Glass
                            <Text style={styles.quantityAstringglass}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.Glasstextinputmainview}>
                          <View style={styles.Glasstextinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.distributionTextField}
                              placeholder="Weight"
                              value={distributeWate?.glass ?? ""}
                              onChangeText={(text) => {
                                setGlassValidationShow(false);
                                setDistributeWaste({
                                  ...distributeWate,
                                  glass: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.Glassdropdownmainview}>
                          <View style={styles.Glassdropdownview}>
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={distributeWate?.quantitymeasure8 ?? ""}
                              onChangeText={(text) =>
                                setDistributeWaste({
                                  ...distributeWate,
                                  quantitymeasure8: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.distributemodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {glassValidationShow && <Text style={styles.validationMessageStyle2}>{VALIDATE_FORM.BMWDISTRIBUTEGLASS}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.cardboardmainview}>
                          <Text style={styles.cardboardtext}>Cardboard
                            <Text style={styles.quantityAstringcardboard}>*</Text>
                          </Text>
                        </View>

                        <View style={styles.cardboardtextinputmainview}>
                          <View style={styles.cardboardinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.distributionTextField}
                              placeholder="Weight"
                              value={distributeWate?.cardboard ?? ""}
                              onChangeText={(text) => {
                                setCardboardValidationShow(false);
                                setDistributeWaste({
                                  ...distributeWate,
                                  cardboard: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.cardboarddropdownmainview}>
                          <View style={styles.cardboarddropdownview}>
                            <Dropdown
                              placeholder="MT"
                              data={data3}
                              underlineColor="transparent"
                              value={distributeWate?.quantitymeasure9 ?? ""}
                              onChangeText={(text) =>
                                setDistributeWaste({
                                  ...distributeWate,
                                  quantitymeasure9: text,
                                })
                              }
                              inputContainerStyle={styles.inputContainerStyle}
                              containerStyle={styles.containerStyle}
                            />

                            <Image
                              source={Images.footerDropdown}
                              style={styles.distributemodalfooterdropdownimage}
                            />
                          </View>
                        </View>
                      </View>
                      {cardboardValidationShow && <Text style={styles.validationMessageStyle2}>{VALIDATE_FORM.BMWDISTRIBUTECATRDBOARD}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 1 && (
                  <View style={styles.distributemodalmainview}>
                    <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController1(); }}>
                      <View style={styles.distributemodalclosebarview}>
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
                            onPress={() => processStepsBackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.distributemodalbackimage2}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal2(false)}>
                          <View
                            style={styles.processingfirstsectionheadertextview}
                          >
                            <Text
                              style={styles.processingfirstsectionheadertext}
                            >
                              Distribute - Autoclave
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
                            title={"Distribute - Autoclave"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={styles.processingfirstsectionstepindicatopview}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition3}
                        stepCount={2}
                      />
                    </View>
                    <View style={styles.distributemaincontent}>
                      <View style={styles.distributeselectdatemainview}>
                        <View style={styles.distributeselectdateview}>
                          <Text style={styles.selectedatetextdistribute}>
                            Select Date
                            <Text style={styles.quantityAstringp4}>*</Text>
                          </Text>

                        </View>
                        <View style={styles.selectdatetextinputmainview}>
                          <View style={styles.selectdatetextinputview}>
                            <TouchableOpacity onPress={showDatePicker2}>
                              <Text style={styles.selectdatetextinput}>
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
                                value={distributeWate?.dateselection2 ?? ""}
                                onChangeText={(text) =>
                                  setDistributeWaste({
                                    ...distributeWate,
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
                          <Text style={styles.locationtextdistribute}>
                            Location
                          </Text>
                        </View>
                        <View
                          style={
                            styles.collectsecondsectiontextinputlocationmainview
                          }
                        >
                          <View
                            style={
                              styles.collectsecondsectiontextinputlocationview1234
                            }
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.locationSiteNameTextField}
                              editable={false}
                              value={distributeWate?.location3 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.SiteNametextdistribute}>
                            Site Name
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
                              style={styles.distributionTextField}
                              editable={false}
                              value={distributeWate?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>

                      <View style={styles.sitenametextinputview}>
                        <TextInput
                          style={!distributeWate?.comment3 ? styles.collectmodalcommenttextinput : styles.collectmodalcommenttextinput1}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={distributeWate?.comment3 ?? ""}
                          onChangeText={(text) => {
                            setDistributeCommentValidationShow(false);
                            setDistributeWaste({
                              ...distributeWate,
                              comment3: text,
                            });
                          }}
                        />
                        {!distributeWate?.comment3 && <Text style={styles.commentAstring}>*</Text>}
                      </View>
                      {distributeCommentValidationShow && <Text style={styles.validationMessageStyle1}>{VALIDATE_FORM.BMWDISTRIBUTECOMMENT}</Text>}
                    </View>
                  </View>
                )}
                {isSelected1 == 2 && (
                  <View style={styles.distributemodalmainview}>
                    <View style={styles.distributemodalclosebarview}>
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController1(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected1 >= 1 ? (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View
                          style={
                            styles.processingfirstsectionheaderbackimagrview
                          }
                        >
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
                          >
                            <Image
                              source={Images.back1}
                              style={styles.distributemodalbackimage2}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.processingfirstsectionheadertextview}
                        >
                          <Text style={styles.processingfirstsectionheadertext}>
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
                          <ModalHeader
                            title={"Distribute - Autoclave"}
                            isRightAction={true}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.reviewpagedistributecontentmainview}>
                      <View style={{}}>
                        <View style={styles.collectreviewmaininputview}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Total Material -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {distributeWate?.totalMaterial}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {distributeWate?.quantitymeasure4}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Recyclables -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {distributeWate?.recyclables}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {distributeWate?.quantitymeasure5}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Plactics -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {distributeWate?.plastics}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {distributeWate?.quantitymeasure6}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Bags -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {distributeWate?.bags}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {distributeWate?.quantitymeasure7}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Glass -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {distributeWate?.glass}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {distributeWate?.quantitymeasure8}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Cardboard -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {distributeWate?.cardboard}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {distributeWate?.quantitymeasure9}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.collectdatetimeview}>
                            <Text style={styles.collectdatetimetext}>
                              Date & Time -{" "}
                            </Text>
                            <Text style={styles.collectdatetimeresponsetext}>
                              {/* @ts-ignore */}
                              {moment(distributeWate?.date2).format(
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
                              {distributeWate?.siteName}
                            </Text>
                          </View>
                          <View style={styles.collectcommentview}>
                            <Text style={styles.collectcommenttext}>
                              Comments -{" "}
                            </Text>
                            <Text style={styles.collectcommentresponsetext}>
                              {distributeWate?.comment3}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.distibutebottommainview}>
                  {isSelected1 < 2 ? (
                    <TouchableOpacity
                      style={styles.distributeNextTouchableview}
                      onPress={() => processStepsController1()}
                    >
                      <Text style={styles.distributenexttext}>Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.distributebottommainview1}>
                      <View style={styles.distributebottonsubview}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false),
                              clearDistributeData(),
                              initialController1();
                          }}
                        >
                          <View style={styles.canceltextview}>
                            <Text style={styles.canceltext}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.submittouchableview}>
                        <TouchableOpacity
                          onPress={() => {
                            distributionSaveValidation();
                          }}
                        >
                          <View style={styles.submitmainview}>
                            <Text style={styles.submitText}>Submit</Text>
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
      {/* ************************    Distribute Modal     ************************* */}
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
  collectfirstsectionTotalwastemainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  collectfirstsectionTotalwasteview: {
    height: height / 11,
    width: width / 2.4,
    justifyContent: "center",
  },
  collectsecondsectioncommentview: {
    height: height / 18,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
  },
  collectthirdsectionmainview: {
    height: height / 2,
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
    width: width / 2.2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  collectsecondsectiontextinputlocationview1234: {
    height: height / 18,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  collectmodalcommenttextinput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 23 : 20,
  },
  collectmodalcommenttextinput1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 15 : 12,
  },
  centeredView: {
    height: height / 1,
    width: width / 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  collectthirdsectiontopbarview: {
    height: height / 20,
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
    width: width / 1,
    alignItems: "center",
  },
  collectthirdsectionflatlistview: {
    height: height / 2.5,
    width: width / 1.12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  collectsecondsectionheadertext: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
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
  modalView1: {
    height: height / 1.2,
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
  collectfirstsectionstepindicatorview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  collectfirstsectiondatamaincontainerview: {
    height: height / 3,
    width: width / 1,
  },
  secureInput8: {
    color: "white",
    fontSize: 16,
    marginLeft: -10,
    textAlign: "center",
    alignSelf: "center",
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
  quantityAstring: {
    left: 75,
    color: 'red',
    bottom: 16,
    fontSize: 15,
  },
  quantityAstringp: {
    left: 80,
    color: 'red',
    bottom: 14,
    fontSize: 15,
  },
  quantityAstringpdistribute: {
    left: 92,
    color: 'red',
    bottom: Platform.OS === 'android' ? 14 : "15%",
    fontSize: 15,
  },
  quantityAstringprdf: {
    left: 80,
    color: 'red',
    bottom: Platform.OS === 'android' ? 13 : "15%",
    fontSize: 15,
  },
  quantityAstringplastic: {
    left: 54,
    color: 'red',
    bottom: Platform.OS === 'android' ? 12 : "13%",
    fontSize: 15,
  },
  quantityAstringbag: {
    left: 37,
    color: 'red',
    bottom: Platform.OS === 'android' ? 12 : "13%",
    fontSize: 15,
  },
  quantityAstringglass: {
    left: Platform.OS === 'android' ? 39 : "37%",
    color: 'red',
    bottom: Platform.OS === 'android' ? 12 : "13%",
    fontSize: 15,
  },
  quantityAstringcardboard: {
    left: Platform.OS === 'android' ? 71 : "66%",
    color: 'red',
    bottom: Platform.OS === 'android' ? 14 : "18%",
    fontSize: 15,
  },
  quantityAstringp2: {
    left: 80,
    color: 'red',
    bottom: 14,
    fontSize: 15,
  },
  quantityAstringp3: {
    left: 68,
    color: 'red',
    bottom: 14,
    fontSize: 15,
  },
  quantityAstringp4: {
    left: Platform.OS === 'android' ? 73 : "49%",
    color: 'red',
    bottom: Platform.OS === 'android' ? 10 : "15%",
    fontSize: 15,
  },
  quantityAstring1: {
    left: Platform.OS === 'android' ? 57 : "55%",
    color: 'red',
    bottom: 14,
    fontSize: 15,
  },
  dateAstring: {
    color: 'red',
    left: Platform.OS === 'android' ? 74 : "48%",
    bottom: 11,
  },
  validationMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? 34 : "10%",
  },
  validationIncinerationMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? 34 : "9.5%",
  },
  validationMessageStyle1: {
    color: 'red',
    left: Platform.OS === 'android' ? -70 : "-20%",
  },
  validationMessageStyle2: {
    color: 'red',
    left: Platform.OS === 'android' ? 34 : "9.5%",
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
  collectsecondsectionheadercollectview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
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
  commentAstring: {
    color: 'red',
    left: Platform.OS === 'android' ? 74 : "24.3%",
    bottom: Platform.OS === 'android' ? 12 : "3%",
    top: Platform.OS === 'ios' ? 1 : -12,
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
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 3 : 0,
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
  collectreviewmaininputview: {
    marginTop: 25,
    width: width / 1.18,
  },
  sortingreviewmaininputview: {
    width: width / 1.18,
  },
  collectwastetypeview: {
    flexDirection: "row",
    height: height / 25,
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
  collectquantitymeasureview: {
    flexDirection: "row",
    height: height / 22,
    alignItems: "center",
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
    height: height / 8,
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
  collectcommentresponsetext: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
    width: width / 1.5,
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
  collectfirstsectionmainview: {
    height: height / 1.65,
    width: width / 1,
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
  },
  mainimage1: {
    tintColor: "#FFFFFF",
    justifyContent: "center",
    alignSelf: "center",
    height: height / 55,
    width: width / 8,
  },
  mainimage2: {
    tintColor: "#FFFFFF",
    height: height / 40,
    width: width / 17,
    marginLeft: 18,
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
    width: width / 1.16,
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
  },
  sortingfirstsectionstepindicatopview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  processingfirstsectioninputmainview: {
    height: height / 5,
    justifyContent: "center",
    width: width / 1,
  },
  distributefirstsectioninputmainview: {
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
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
  },
  processingfirstsectiontotalwasteview1: {
    height: height / 10,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
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
    height: height / 12,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
  },
  processingfirstsectiontotalrdfview1: {
    height: height / 10.5,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
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
  collectmodalmainview: {
    height: height / 1.6,
    width: width / 1,
  },
  collectmodaltouchablemainview: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  collectmodaltouchablesubview: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  collectmodalcollecttextview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  collectmodalwastetypetext: {
    color: "#606060",
    // top: Platform.OS==='ios'?:5,
  },
  collectmodalquantitytext: {
    paddingLeft: 4,
    color: "#606060",
    // top: 8,
  },
  collectmodalselectdatetext: {
    color: "#606060",
    // top: 9,
  },
  collectmodalimage1: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  collectmodalselecrdatevaluetext: {
    color: "black",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 20 : 17,
  },
  collectmodallocationtext: {
    color: "#606060",
    top: Platform.OS === 'ios' ? 10 : 7,
  },
  collectmodallocationtextinput: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 14,
  },
  collectmodalsitenametext: {
    color: "#606060",
    top: 7,
  },
  collectmodalsitenametextinput: {
    color: "black",
    top: Platform.OS === 'ios' ? 15 : 14,
    fontSize: responsiveFontSize(1.6),
  },
  collectmodalcommenttextinput12: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 23 : 20,
  },
  collectmodalcommenttextinput123: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 13 : 12,
  },
  collectmodalimage2: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  collectmodalsecondpagemaineview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  collectmodalsecondpageTouchable: {
    height: height / 17,
    width: width / 1.2,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  collectmodalsecondpagenextText: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  collectmodalcancelbuttonmainview: {
    height: height / 15,
    width: width / 1,
    flexDirection: "row",
  },
  collectmodalcancelbuttonsubview: {
    height: height / 15,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  collectmodalcancelmainview1: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#B5B5B5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  collectmodalcanceltext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  collectmodalsubmitTouchableview: {
    height: height / 15,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  collectmodalsubmitview: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  collectmodalsubmittext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sortingmainview: {
    height: height / 1.6,
    width: width / 1,
  },
  sortingviewimage1: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  sortingviewimage2: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  sortingmodaltotalwastetext: {
    paddingLeft: 4,
    color: "#606060",
    // top: 8,
  },
  sortingmodalfooterdropdownimage: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 14 : 13,
  },
  distributemodalfooterdropdownimage: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 15 : 13,
  },
  sortingmodalincinerationtext: {
    paddingLeft: 4,
    color: "#606060",
    top: 4,
  },
  sortingmodalautoclaveview: {
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
  },
  sortingmodalautoclavetext: {
    paddingLeft: 4,
    color: "#606060",
    // top: 8,
  },
  sortingmodalautoclavetextinputmainview: {
    height: height / 15,
    width: width / 3.49,

    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalautoclavetextinputsubview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  sortingmodalquantity1mainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  sortingmodalquanity1subview: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  sortingmodalmainviewsecondpage: {
    height: height / 1.65,
    width: width / 1,
  },
  sortingmodalclosebarimageview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sortingmodalheadermainview: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  sortingmodalheadersTouchableimageview: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sortingmodalbackimage1: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  sortingmodalprocessingtextheaderview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  sortingmodalprocessingtext: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  sortingmodalstepindicatorview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  sortingmodalsecondpagecontentmainview: {
    height: height / 3,
    width: width / 1,
    alignItems: "center",
  },
  sortingmodalselectdatemainview: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  sortingmodalselecteddatesubview: {
    height: height / 11,
    width: width / 2.5,
    justifyContent: "center",
  },
  sortingmodalselecteddateInputmainview: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sortingmodalselecteddateinputTouchableview: {
    height: height / 15,
    width: width / 3.5,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodaldatetext: {
    color: "#000000",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 19 : 19,
  },
  sortingmodallocationtext: { color: "#606060", top: 8 },
  sortingmodalsitenameText: { color: "#606060", top: 8 },
  sortingmodalcommenttextinput: {
    height: height / 18,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
  },
  sortingmodalmainviewthirdpage: {
    height: height / 1.65,
    width: width / 1,
  },
  sortingmodalreviewview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  sortingmodalreviewtext: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  sortingmodalthirdpagecontentmainview: {
    height: height / 2.7,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalbottombuttonmainview: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalthirdpagenextbuttontouchable: {
    height: height / 17,
    width: width / 1.2,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalthirdpagenexttext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sortingmodalbottommainview2: {
    height: height / 15,
    width: width / 1,
    flexDirection: "row",
  },
  sortingmodalnextbuttonmainview: {
    height: height / 15,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalcancelbuttonmainview: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#B5B5B5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalcanceltext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sortingmodalsubmitview: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sortingmodalsubmittext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  distributemodalmainview: {
    height: height / 1.6,
    width: width / 1,
  },
  distributemodalbackimage1: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  distributemodalbackimage2: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  totalmaterialtext: { paddingLeft: 4, color: "#606060", bottom: 3 },
  distributemodalrecyclablestext: { paddingLeft: 4, color: "#606060", bottom: 1 },
  plasticsmainview: {
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
  },
  plasticstextdistribute: {
    paddingLeft: 4,
    color: "#606060",
    top: 2,
  },
  plasticstextinputmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  plasticstextinputview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  plasticsdropdownmainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  plasticsdropdownview: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  Bagsmainview: {
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
  },
  Bagstext: { paddingLeft: 4, color: "#606060", top: 2 },
  BagsTextinputmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  BagsTextinputview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  Bagsdropdownmainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  Bagsdropdownview: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  Glassmainview: {
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
  },
  Glasstext: { paddingLeft: 4, color: "#606060", top: 2 },
  Glasstextinputmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  Glasstextinputview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  Glassdropdownmainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  Glassdropdownview: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  cardboardmainview: {
    height: height / 11,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
  },
  cardboardtext: { paddingLeft: 4, color: "#606060" },
  cardboardtextinputmainview: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  cardboardinputview: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  cardboarddropdownmainview: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  cardboarddropdownview: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  distributemodalclosebarview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  distributemaincontent: {
    height: height / 3,
    width: width / 1,

    alignItems: "center",
  },
  distributeselectdatemainview: {
    height: height / 15,

    justifyContent: "center",

    width: width / 1,
    flexDirection: "row",
  },
  distributeselectdateview: {
    height: height / 13,
    width: width / 2.5,

    justifyContent: "center",
  },
  selectedatetextdistribute: {
    color: "#606060",
    top: Platform.OS === 'ios' ? 14 : 14,
  },
  selectdatetextinputmainview: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  selectdatetextinputview: {
    height: height / 15,
    width: width / 3.5,

    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },
  selectdatetextinput: {
    color: "#000000",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 19 : 19,
  },
  locationtextdistribute: { color: "#606060", top: Platform.OS === 'ios' ? 11 : 10, },
  SiteNametextdistribute: { color: "#606060", top: Platform.OS === 'ios' ? 11 : 10, },
  sitenametextinputview: {
    height: height / 18,
    width: width / 1.2,

    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
  },
  reviewpagedistributecontentmainview: {
    height: height / 2.2,

    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  distibutebottommainview: {
    height: height / 10,
    width: width / 1,

    justifyContent: "center",
    alignItems: "center",
  },
  distributeNextTouchableview: {
    height: height / 17,
    width: width / 1.2,
    marginTop: 20,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  distributenexttext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  distributebottommainview1: {
    height: height / 15,
    width: width / 1,

    flexDirection: "row",
  },
  distributebottonsubview: {
    height: height / 15,
    width: width / 2,

    justifyContent: "center",
    alignItems: "center",
  },
  canceltextview: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#B5B5B5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  canceltext: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  submittouchableview: {
    height: height / 15,
    width: width / 2,

    justifyContent: "center",
    alignItems: "center",
  },
  submitmainview: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: "#DA0D14",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: responsiveFontSize(2.0),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  inputContainerStyle: {
    height: height / 28,
    width: width / 3,
  },
  containerStyle: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
    top: Platform.OS === 'ios' ? 12 : 12,
  },
  wasteTypeTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 15 : 15,
    fontSize: responsiveFontSize(1.9),
  },
  quantityTextField: {
    color: COLORS.BLACK,
    top: Platform.OS === 'ios' ? 14 : 14,
    fontSize: responsiveFontSize(1.9),
  },
  processingTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 14,
  },
  locationSiteNameTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 15,
  },
  distributionTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 13 : 13,
  },
});
