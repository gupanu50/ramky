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
import _ from "lodash";
import { Images } from "../../../../../Assets";
import { Dropdown } from "react-native-material-dropdown-v2";
import ModalHeader from "../../../../../ReuableComponent/ModalHeader";
import StepIndicator from "react-native-step-indicator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ApiClient from "../../../../../Network";
import { ActionType } from "../../../../../Redux/Type";
import moment from "moment";
import { COLORS, FONT_FAMILIES, METRICS } from "../../../../../Configration";
import withConnect from "./withConnect";
import { useDispatch } from "react-redux";
import { VALIDATE_FORM } from "../../../../../Constant";
const { height, width } = Dimensions.get("screen");
const {
  RECYCLE_PLASTIC_COLLECTION,
  RECYCLE_PLASTIC_SEGREGATION,
  RECYCLE_PLASTIC_PROCESSED,
} = ActionType;
const Footer = (props: any) => {
  const { user } = props;
  const dispatch = useDispatch();
  const city = user.cities[0].city;
  const siteName = user.siteName[0].siteName;
  const email = user.email;
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
  const [collectwaste, setCollectedWaste] = useState({
    waste: "Recycle",
    location: city,
    quantitymeasure: "MT",
    siteName: siteName,
    quantity: "",
    comment: "",
  });
  const [segregationWaste, setSegregationWaste] = useState({
    location1: city,
    quantitymeasure1: "MT",
    quantitymeasure2: "MT",
    quantitymeasure3: "MT",
    quantitymeasure4: "MT",
    quantitymeasure5: "MT",
    siteName: siteName,
    hdpe: "",
    ldpe: "",
    pet: "",
    pp: "",
    other: "",
    comment1: "",
  });
  const [processed, setProcessed] = useState({
    location2: city,
    quantitymeasure6: "MT",
    quantitymeasure7: "MT",
    quantitymeasure8: "MT",
    quantitymeasure9: "MT",
    quantitymeasure10: "MT",
    siteName: siteName,
    totalwaste: "",
    regrints: "",
    granules: "",
    bags: "",
    bales: "",
    comment2: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [date1, setDate1] = useState();
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isSelected1, setSelected1] = useState(0);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isSelected2, setSelected2] = useState(0);
  const [date2, setDate2] = useState();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [totalWeightValidationShow, setTotalWeightValidationShow] =
    useState(false);
  const [collectCommentValidationShow, setCollectCommentValidationShow] =
    useState(false);
  const [hdpeValidationShow, setHdpeValidationShow] = useState(false);
  const [ldpeValidationShow, setLdpeValidationShow] = useState(false);
  const [petValidationShow, setPetValidationShow] = useState(false);
  const [ppValidationShow, setPpValidationShow] = useState(false);
  const [otherValidationShow, setOtherValidationShow] = useState(false);
  const [
    segregationCommentValidationShow,
    setSegregationCommentValidationShow,
  ] = useState(false);
  const [totalWasteValidationShow, setTotalWasteValidationShow] =
    useState(false);
  const [regrindsValidationShow, setRegrindsValidationShow] = useState(false);
  const [granulesValidationShow, setGranulesValidationShow] = useState(false);
  const [bagsValidationShow, setBagsValidationShow] = useState(false);
  const [balesValidationShow, setBalesValidationShow] = useState(false);
  const [processedCommentValidationShow, setProcessedCommentValidationShow] =
    useState(false);
  // ********************** DropDown Data********************
  const data = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data1 = [
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
  const data6 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data7 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data8 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data9 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data10 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  // ***************************Validation Methods*****************************
  const validationCollect = () => {
    if (_.isEmpty(collectwaste.quantity.trim())) {
      setTotalWeightValidationShow(true);
      initialController();
      return false;
    } else if (_.isEmpty(collectwaste.comment.trim())) {
      setTotalWeightValidationShow(false);
      setCollectCommentValidationShow(true);
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
  const validationSegregation = () => {
    if (_.isEmpty(segregationWaste.hdpe.trim())) {
      setHdpeValidationShow(true);
      initialController1();
      return false;
    } else if (_.isEmpty(segregationWaste.ldpe.trim())) {
      setHdpeValidationShow(false);
      setLdpeValidationShow(true);
      setSelected1(1);
      return false;
    } else if (_.isEmpty(segregationWaste.pet.trim())) {
      setLdpeValidationShow(false);
      setPetValidationShow(true);
      setSelected1(2);
      return false;
    } else if (_.isEmpty(segregationWaste.pp.trim())) {
      setPetValidationShow(false);
      setPpValidationShow(true);
      setSelected1(3);
      return false;
    } else if (_.isEmpty(segregationWaste.other.trim())) {
      setPpValidationShow(false);
      setOtherValidationShow(true);
      setSelected1(4);
      return false;
    } else if (_.isEmpty(segregationWaste.comment1.trim())) {
      setOtherValidationShow(false);
      setSegregationCommentValidationShow(true);
      setSelected1(5);
      return false;
    }
    return true;
  };
  const segregationSaveValidation = () => {
    if (validationSegregation()) {
      setShowModal1(false);
      segregationDataSave();
      clearSegregationData();
      initialController1();
    }
  };
  const validationProcessed = () => {
    if (_.isEmpty(processed.totalwaste.trim())) {
      setTotalWasteValidationShow(true);
      initialController2();
      return false;
    } else if (_.isEmpty(processed.regrints.trim())) {
      setTotalWasteValidationShow(false);
      setRegrindsValidationShow(true);
      initialController2();
      return false;
    } else if (_.isEmpty(processed.granules.trim())) {
      setRegrindsValidationShow(false);
      setGranulesValidationShow(true);
      initialController2();
      return false;
    } else if (_.isEmpty(processed.bags.trim())) {
      setGranulesValidationShow(false);
      setBagsValidationShow(true);
      initialController2();
      return false;
    } else if (_.isEmpty(processed.bales.trim())) {
      setBagsValidationShow(false);
      setBalesValidationShow(true);
      initialController2();
      return false;
    } else if (_.isEmpty(processed.comment2.trim())) {
      setBalesValidationShow(false);
      setProcessedCommentValidationShow(true);
      setSelected2(1);
      return false;
    }
    return true;
  };
  const processedSaveValidation = () => {
    if (validationProcessed()) {
      setShowModal2(false);
      processedDataSave();
      clearProcessedData();
      initialController2();
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
      totalWeight: collectwaste?.quantity + " " + collectwaste?.quantitymeasure,
      date: dateTime1,
      // @ts-ignore
      location: collectwaste?.location,
      siteName: [{ siteName: collectwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: collectwaste?.comment,
    };
    const result =
      await ApiClient.createApiClient().recyclePlasticSaveCollectionData(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      getCollectionApi();
    } else {
      showMessage({
        message: "Data already exist for the selected Date",
        type: "danger",
      });
    }
  };
  // ***********************Segregation Save API******************
  const segregationDataSave = async () => {
    // @ts-ignore
    var time = moment(segregationWaste?.date1).format(`YYYY-MM-DD`);
    var dateTime = moment().format(`HH:mm:ss:SSS Z`);
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      hdpeWaste:
        segregationWaste?.hdpe + " " + segregationWaste?.quantitymeasure1,
      // @ts-ignore
      ldpeWaste:
        segregationWaste?.ldpe + " " + segregationWaste?.quantitymeasure2,
      // @ts-ignore
      petWaste:
        segregationWaste?.pet + " " + segregationWaste?.quantitymeasure3,
      // @ts-ignore
      ppWaste: segregationWaste?.pp + " " + segregationWaste?.quantitymeasure4,
      // @ts-ignore
      otherWaste:
        segregationWaste?.other + " " + segregationWaste?.quantitymeasure5,
      date: dateTime1,
      location: segregationWaste?.location1,
      siteName: [{ siteName: segregationWaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: segregationWaste?.comment1,
    };
    const result =
      await ApiClient.createApiClient().recyclePlasticSaveSegregationData(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      getSegregationData();
    } else {
      showMessage({
        message: "Data already exist for the selected Date",
        type: "danger",
      });
    }
  };
  // ***********************Processed Save API******************
  const processedDataSave = async () => {
    // @ts-ignore
    var time = moment(processed?.date2).format(`YYYY-MM-DD`);
    var dateTime = moment().format(`HH:mm:ss:SSS Z`);
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore
      processedTotalWaste:
        processed?.totalwaste + " " + processed?.quantitymeasure6,
      // @ts-ignore
      regrinds: processed?.regrints + " " + processed?.quantitymeasure7,
      // @ts-ignore
      granules: processed?.granules + " " + processed?.quantitymeasure8,
      // @ts-ignore
      bags: processed?.bags + " " + processed?.quantitymeasure9,
      // @ts-ignore
      bales: processed?.bales + " " + processed?.quantitymeasure10,
      date: dateTime1,
      location: processed?.location2,
      siteName: [{ siteName: processed?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: processed?.comment2,
    };
    const result =
      await ApiClient.createApiClient().recyclePlasticSaveProcessedData(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      getProcessedData();
    } else {
      showMessage({
        message: "Data already exist for the selected Date",
        type: "danger",
      });
    }
  };
  // ***********************Collect GET API******************
  const getCollectionApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().recyclePlasticCollection(
      params
    );
    //  @ts-ignore
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
            quantity = quantity + item.totalWeight ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, quantity });
        });
      }
      // @ts-ignore
      dispatch({ type: RECYCLE_PLASTIC_COLLECTION, payload: displayArr });
    }
  };
  // ***********************Processed GET API******************
  const getProcessedData = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().recyclePlasticProcessed(
      params
    );
    {
      /* @ts-ignore */
    }
    if (result.status && result.data.status === true) {
      {
        /* @ts-ignore */
      }
      if ((result?.data?.data ?? []).length > 0) {
        {
          /* @ts-ignore */
        }
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
          var regrints = 0;
          var granules = 0;
          var bags = 0;
          var bales = 0;
          filterDateArr.forEach((item) => {
            regrints = regrints + item.regrinds ?? 0;
            granules = granules + item.granules ?? 0;
            bags = bags + item.bags ?? 0;
            bales = bales + item.bales ?? 0;
          });
          {
            /* @ts-ignore */
          }
          displayArr.push({ date: element, regrints, granules, bags, bales });
        });
      }
      //   @ts-ignore
      dispatch({ type: RECYCLE_PLASTIC_PROCESSED, payload: displayArr });
    }
  };
  // ***********************Segregation GET API******************
  const getSegregationData = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().recyclePlasticSegragation(
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
          var hdpe = 0;
          var ldpe = 0;
          var pet = 0;
          var pp = 0;
          var other = 0;
          filterDateArr.forEach((item) => {
            hdpe = hdpe + item.hdpeWaste ?? 0;
            ldpe = ldpe + item.ldpeWaste ?? 0;
            pet = pet + item.petWaste ?? 0;
            pp = pp + item.ppWaste ?? 0;
            other = other + item.otherWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, hdpe, ldpe, pet, pp, other });
        });
      }
      // @ts-ignore
      dispatch({ type: RECYCLE_PLASTIC_SEGREGATION, payload: displayArr });
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
  const processStepsController = () => {
    setSelected(isSelected + 1);
  };
  // **********************Segregation Modal Going Next Page*******************
  const processStepsController1 = () => {
    setSelected1(isSelected1 + 1);
  };
  // **********************Processed Modal Going Next Page*******************
  const processStepsController2 = () => {
    setSelected2(isSelected2 + 1);
  };
  // **********************Collect Modal Going Previous Page*******************
  const processStepsBackController = () => {
    setSelected(isSelected - 1);
  };
  // **********************Segregation Modal Going Previous Page*******************
  const processStepsBackController1 = () => {
    setSelected1(isSelected1 - 1);
  };
  // **********************Processed Modal Going Previous Page*******************
  const processStepsBackController2 = () => {
    setSelected2(isSelected2 - 1);
  };
  //************************ Data Clearing Methods***************
  const clearCollectData = () => {
    setCollectedWaste({
      ...collectwaste,
      quantity: "",
      comment: "",
      quantitymeasure: "MT",
    });
    // @ts-ignore
    setDate(null);
    setTotalWeightValidationShow(false);
    setCollectCommentValidationShow(false);
  };
  const clearSegregationData = () => {
    setSegregationWaste({
      ...segregationWaste,
      hdpe: "",
      ldpe: "",
      pet: "",
      pp: "",
      other: "",
      comment1: "",
      quantitymeasure1: "MT",
      quantitymeasure2: "MT",
      quantitymeasure3: "MT",
      quantitymeasure4: "MT",
      quantitymeasure5: "MT",
    });
    // @ts-ignore
    setDate1(null);
    setHdpeValidationShow(false);
    setLdpeValidationShow(false);
    setPetValidationShow(false);
    setPpValidationShow(false);
    setOtherValidationShow(false);
    setSegregationCommentValidationShow(false);
  };
  const clearProcessedData = () => {
    setProcessed({
      ...processed,
      totalwaste: "",
      regrints: "",
      granules: "",
      bags: "",
      bales: "",
      comment2: "",
      quantitymeasure6: "MT",
      quantitymeasure7: "MT",
      quantitymeasure8: "MT",
      quantitymeasure9: "MT",
      quantitymeasure10: "MT",
    });
    // @ts-ignore
    setDate2(null);
    setTotalWasteValidationShow(false);
    setRegrindsValidationShow(false);
    setGranulesValidationShow(false);
    setBagsValidationShow(false);
    setBalesValidationShow(false);
    setProcessedCommentValidationShow(false);
  };
  // ************************* Modal Open At Starting After Submission Methods*********
  const initialController = () => {
    setSelected(0);
  };
  const initialController1 = () => {
    setSelected1(0);
  };
  const initialController2 = () => {
    setSelected2(0);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firsticonView}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Image source={Images.collect} style={styles.mainimage} />
          <Text style={styles.maintext}>Collect</Text>
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
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal(false),
                          clearCollectData(),
                          initialController();
                      }}
                    >
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
                          <Text
                            style={[styles.segregationMainText, { top: 10 }]}
                          >
                            Total Weight
                            <Text style={styles.quantityAstring}>*</Text>
                          </Text>
                        
                        </View>
                        <View style={styles.collectfirstsectionweightmainview}>
                          <View style={styles.collectfirstsectionweightview}>
                            <TextInput
                              keyboardType="number-pad"
                              placeholder={"Weight"}
                              style={styles.collectQuantityTextInput}
                              value={collectwaste?.quantity ?? ""}
                              placeholderTextColor={COLORS.BLACK}
                              selectionColor={COLORS.BLACK}
                              onChangeText={(text) => {
                                setTotalWeightValidationShow(false);
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
                      {totalWeightValidationShow && (
                        <Text style={styles.validationMessageStyle}>
                          {VALIDATE_FORM.PLASTICCOLLECTTOTALWEIGHT}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected == 1 && (
                  <View style={styles.collectsecondsectionmainview}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal(false),
                          clearCollectData(),
                          initialController();
                      }}
                    >
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
                          <Text style={styles.locationMainText}>Location</Text>
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
                          <Text style={styles.locationMainText}>Site Name</Text>
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
                              value={collectwaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectioncommentview}>
                        <TextInput
                          style={
                            !collectwaste?.comment
                              ? styles.commentCollectTextInput
                              : styles.commentCollectTextInput1
                          }
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={collectwaste?.comment ?? ""}
                          onChangeText={(text) => {
                            setCollectCommentValidationShow(false);
                            setCollectedWaste({
                              ...collectwaste,
                              comment: text,
                            });
                          }}
                        />
                        {!collectwaste?.comment && (
                          <Text style={styles.commentAstring}>*</Text>
                        )}
                      </View>
                      {collectCommentValidationShow && (
                        <Text style={styles.validationCommentMessageStyle}>
                          {VALIDATE_FORM.PLASTICCOLLECTCOMMENT}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected == 2 && (
                  <View style={styles.collectthirdsectionmainview}>
                    <View style={styles.collectthirdsectiontopbarview}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowModal(false),
                            initialController(),
                            clearCollectData();
                        }}
                      >
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
                            Total Weight -{" "}
                          </Text>
                          <Text style={styles.collectquantityresponsetext}>
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
                        processStepsController();
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
                              initialController();
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
                  <View style={styles.processingfirstsectionmainview}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal1(false),
                          clearSegregationData(),
                          initialController1();
                      }}
                    >
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
                            Segregation-HDPE
                          </Text>
                        </View>
                      </View>
                    )}
                    <View style={styles.segregationPicView}>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Hdpe}
                      >
                        <Text style={styles.segragationImageText}>HDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Ldpe}
                      >
                        <Text style={styles.segragationImageText1}>LDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pet}
                      >
                        <Text style={styles.segragationImageText1}>PET</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pp}
                      >
                        <Text style={styles.segragationImageText1}>PP</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Other}
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
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            HDPE Waste
                            <Text style={styles.hdpeAstring}>*</Text>
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
                              value={segregationWaste?.hdpe ?? ""}
                              onChangeText={(text) => {
                                setHdpeValidationShow(false);
                                setSegregationWaste({
                                  ...segregationWaste,
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
                      {hdpeValidationShow && (
                        <Text style={styles.validationHdpeMessageStyle}>
                          {VALIDATE_FORM.PLASTICSEGREGATIONHDPE}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected1 == 1 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal1(false),
                          clearSegregationData(),
                          initialController1();
                      }}
                    >
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
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
                              Segregation-LDPE
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
                        source={Images.Hdpe}
                      >
                        <Text style={styles.segragationImageText1}>HDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Ldpe}
                      >
                        <Text style={styles.segragationImageText}>LDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pet}
                      >
                        <Text style={styles.segragationImageText1}>PET</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pp}
                      >
                        <Text style={styles.segragationImageText1}>PP</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Other}
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
                        style={styles.processingfirstsectiomtotalwastemainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.segregationMainText}>
                            LDPE Waste
                            <Text style={styles.ldpeAstring}>*</Text>
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
                              value={segregationWaste?.ldpe ?? ""}
                              onChangeText={(text) => {
                                setLdpeValidationShow(false);
                                setSegregationWaste({
                                  ...segregationWaste,
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
                              data={data2}
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
                      {ldpeValidationShow && (
                        <Text style={styles.validationHdpeMessageStyle}>
                          {VALIDATE_FORM.PLASTICSEGREGATIONLDPE}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected1 == 2 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal1(false),
                          clearSegregationData(),
                          initialController1();
                      }}
                    >
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
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
                              Segregation-PET
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
                        source={Images.Hdpe}
                      >
                        <Text style={styles.segragationImageText1}>HDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Ldpe}
                      >
                        <Text style={styles.segragationImageText1}>LDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Pet}
                      >
                        <Text style={styles.segragationImageText}>PET</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pp}
                      >
                        <Text style={styles.segragationImageText1}>PP</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Other}
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
                            PET Waste
                            <Text style={styles.petAstring}>*</Text>
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
                              value={segregationWaste?.pet ?? ""}
                              onChangeText={(text) => {
                                setPetValidationShow(false);
                                setSegregationWaste({
                                  ...segregationWaste,
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
                              data={data3}
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
                      {petValidationShow && (
                        <Text style={styles.validationHdpeMessageStyle}>
                          {VALIDATE_FORM.PLASTICSEGREGATIONPET}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected1 == 3 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal1(false),
                          clearSegregationData(),
                          initialController1();
                      }}
                    >
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
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
                              Segregation-PP
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
                        source={Images.Hdpe}
                      >
                        <Text style={styles.segragationImageText1}>HDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Ldpe}
                      >
                        <Text style={styles.segragationImageText1}>LDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pet}
                      >
                        <Text style={styles.segragationImageText1}>PET</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Pp}
                      >
                        <Text style={styles.segragationImageText}>PP</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Other}
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
                            PP Waste
                            <Text style={styles.ppAstring}>*</Text>
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
                              value={segregationWaste?.pp ?? ""}
                              onChangeText={(text) => {
                                setPpValidationShow(false);
                                setSegregationWaste({
                                  ...segregationWaste,
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
                              data={data4}
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
                      {ppValidationShow && (
                        <Text style={styles.validationHdpeMessageStyle}>
                          {VALIDATE_FORM.PLASTICSEGREGATIONPP}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected1 == 4 && (
                  <View style={styles.progressstep1view}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal1(false),
                          clearSegregationData(),
                          initialController1();
                      }}
                    >
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
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
                              Segregation-Others
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
                        source={Images.Hdpe}
                      >
                        <Text style={styles.segragationImageText1}>HDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Ldpe}
                      >
                        <Text style={styles.segragationImageText1}>LDPE</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pet}
                      >
                        <Text style={styles.segragationImageText1}>PET</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView}
                        source={Images.Pp}
                      >
                        <Text style={styles.segragationImageText1}>PP</Text>
                      </ImageBackground>
                      <ImageBackground
                        style={styles.segragationImageView1}
                        source={Images.Other}
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
                          <Text style={styles.segregationMainText}>
                            Others Waste
                            <Text style={styles.otherAstring}>*</Text>
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
                              value={segregationWaste?.other ?? ""}
                              onChangeText={(text) => {
                                setOtherValidationShow(false);
                                setSegregationWaste({
                                  ...segregationWaste,
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
                              data={data5}
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
                      {otherValidationShow && (
                        <Text style={styles.validationHdpeMessageStyle}>
                          {VALIDATE_FORM.PLASTICSEGREGATIONOTHER}
                        </Text>
                      )}
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
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal1(false),
                          clearSegregationData(),
                          initialController1();
                      }}
                    >
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
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
                              Segregation
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
                          <Text style={styles.dateAstring12}>*</Text>
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
                          <Text style={styles.locationMainText}>Location</Text>
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
                          <Text style={styles.locationMainText}>Site Name</Text>
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
                              style={styles.segregationLocationTextField}
                              editable={false}
                              value={segregationWaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>

                      <View style={styles.sortingModelView15}>
                        <TextInput
                          style={
                            !segregationWaste?.comment1
                              ? styles.commentCollectTextInput
                              : styles.commentCollectTextInput1
                          }
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={segregationWaste?.comment1 ?? ""}
                          onChangeText={(text) => {
                            setSegregationCommentValidationShow(false);
                            setSegregationWaste({
                              ...segregationWaste,
                              comment1: text,
                            });
                          }}
                        />
                        {!segregationWaste?.comment1 && (
                          <Text style={styles.commentAstring}>*</Text>
                        )}
                      </View>
                      {segregationCommentValidationShow && (
                        <Text style={styles.validationCommentMessageStyle}>
                          {VALIDATE_FORM.PLASTICSEGREGATIONCOMMENT}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected1 == 6 && (
                  <View style={styles.sortingModelView7}>
                    <View style={styles.sortingModelView8}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowModal1(false),
                            clearSegregationData(),
                            initialController1();
                        }}
                      >
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected1 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController1()}
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
                                Hdpe Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {segregationWaste?.hdpe}
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
                                Ldpe Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {segregationWaste?.ldpe}
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
                                Pet Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {segregationWaste?.pet}
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
                                Pp Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {segregationWaste?.pp}
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
                                Other Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {segregationWaste?.other}
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
                              {segregationWaste?.comment1}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.mainview}>
                  {isSelected1 < 6 ? (
                    <TouchableOpacity
                      style={styles.maintouchableopacity}
                      onPress={() => {
                        processStepsController1();
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
                              initialController1();
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
                            segregationSaveValidation();
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
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal2(false),
                          clearProcessedData(),
                          initialController2();
                      }}
                    >
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
                            onPress={() => {
                              setShowModal2(false), clearProcessedData();
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
                    <View style={styles.processingfirstsectioninputmainview}>
                      <View
                        style={styles.processedFirstSectionTotalWasteMainView}
                      >
                        <View
                          style={styles.processingfirstsectiontotalwasteview}
                        >
                          <Text style={styles.processedMainText}>
                            Total Waste
                            <Text style={styles.wasteAstring}>*</Text>
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
                              style={{
                                color: "black",
                                top: Platform.OS === "ios" ? 13 : 12,
                              }}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              value={processed?.totalwaste ?? ""}
                              onChangeText={(text) => {
                                setTotalWasteValidationShow(false);
                                setProcessed({
                                  ...processed,
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
                      {totalWasteValidationShow && (
                        <Text style={styles.validationMessageStyle}>
                          {VALIDATE_FORM.PLASTICPROCESSEDTOTALWASTE}
                        </Text>
                      )}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={styles.processedMainText}>Regrinds
                          <Text style={styles.regrindsAstring}>*</Text>
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
                              style={{
                                color: "black",
                                top: Platform.OS === "ios" ? 13 : 12,
                              }}
                              placeholder="Weight"
                              value={processed?.regrints ?? ""}
                              onChangeText={(text) => {
                                setRegrindsValidationShow(false);
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
                      {regrindsValidationShow && (
                        <Text style={styles.validationMessageStyle}>
                          {VALIDATE_FORM.PLASTICPROCESSEDREGRINDS}
                        </Text>
                      )}
                      <View
                        style={styles.processingfirstsectiontotalinertsmainview}
                      >
                        <View style={styles.sortingModelView6}>
                          <Text style={styles.processedMainText}>Granules
                          <Text style={styles.granulesAstring}>*</Text>
                          </Text>
                      
                        </View>
                        <View style={styles.sortingModelView1}>
                          <View style={styles.sortingModelView2}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{
                                color: "black",
                                top: Platform.OS === "ios" ? 13 : 12,
                              }}
                              placeholder="Weight"
                              value={processed?.granules ?? ""}
                              onChangeText={(text) => {
                                setGranulesValidationShow(false);
                                setProcessed({
                                  ...processed,
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
                      {granulesValidationShow && (
                        <Text style={styles.validationMessageStyle}>
                          {VALIDATE_FORM.PLASTICPROCESSEDGRANULES}
                        </Text>
                      )}
                      <View style={styles.sortingModelView5}>
                        <View style={styles.sortingModelView6}>
                          <Text style={styles.processedMainText}>Bags
                          <Text style={styles.bagsAstring}>*</Text>
                          </Text>
                         
                        </View>

                        <View style={styles.sortingModelView1}>
                          <View style={styles.sortingModelView2}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{
                                color: "black",
                                top: Platform.OS === "ios" ? 13 : 12,
                              }}
                              placeholder="Weight"
                              value={processed?.bags ?? ""}
                              onChangeText={(text) => {
                                setBagsValidationShow(false);
                                setProcessed({
                                  ...processed,
                                  bags: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.sortingModelView3}>
                          <View style={styles.sortingModelView4}>
                            <Dropdown
                              data={data9}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure9 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure9: text,
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
                      {bagsValidationShow && (
                        <Text style={styles.validationMessageStyle}>
                          {VALIDATE_FORM.PLASTICPROCESSEDBAGS}
                        </Text>
                      )}
                      <View style={styles.sortingModelView5}>
                        <View style={styles.sortingModelView6}>
                          <Text style={styles.processedMainText}>Bales
                          <Text style={styles.balesAstring}>*</Text>
                          </Text>
                         
                        </View>
                        <View style={styles.sortingModelView1}>
                          <View style={styles.sortingModelView2}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={{
                                color: "black",
                                top: Platform.OS === "ios" ? 13 : 12,
                              }}
                              placeholder="Weight"
                              value={processed?.bales ?? ""}
                              onChangeText={(text) => {
                                setBalesValidationShow(false);
                                setProcessed({
                                  ...processed,
                                  bales: text,
                                });
                              }}
                            ></TextInput>
                          </View>
                        </View>
                        <View style={styles.sortingModelView3}>
                          <View style={styles.sortingModelView4}>
                            <Dropdown
                              data={data10}
                              underlineColor="transparent"
                              value={processed?.quantitymeasure10 ?? ""}
                              onChangeText={(text) =>
                                setProcessed({
                                  ...processed,
                                  quantitymeasure10: text,
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
                      {balesValidationShow && (
                        <Text style={styles.validationMessageStyle}>
                          {VALIDATE_FORM.PLASTICPROCESSEDBALES}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected2 == 1 && (
                  <View style={styles.sortingModelView7}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal2(false),
                          clearProcessedData(),
                          initialController2();
                      }}
                    >
                      <View style={styles.sortingModelView8}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected2 >= 1 ? (
                      <View style={styles.distributeModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController2()}
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
                          <Text style={styles.dateAstring12}>*</Text>
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
                          <Text style={styles.locationMainText}>Location</Text>
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
                          <Text style={styles.locationMainText}>Site Name</Text>
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
                              style={styles.processedLocationTextField}
                              editable={false}
                              value={processed?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>

                      <View style={styles.sortingModelView15}>
                        <TextInput
                          style={
                            !processed?.comment2
                              ? styles.commentCollectTextInput
                              : styles.commentCollectTextInput1
                          }
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          value={processed?.comment2 ?? ""}
                          onChangeText={(text) => {
                            setProcessedCommentValidationShow(false);
                            setProcessed({ ...processed, comment2: text });
                          }}
                        />
                        {!processed?.comment2 && (
                          <Text style={styles.commentAstring}>*</Text>
                        )}
                      </View>
                      {processedCommentValidationShow && (
                        <Text style={styles.validationCommentMessageStyle}>
                          {VALIDATE_FORM.PLASTICPROCESSEDCOMMENT}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {isSelected2 == 2 && (
                  <View style={styles.sortingModelView7}>
                    <View style={styles.sortingModelView8}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowModal2(false),
                            clearProcessedData(),
                            initialController2();
                        }}
                      >
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected2 >= 1 ? (
                      <View style={styles.collectModelView}>
                        <View style={styles.collectModelView1}>
                          <TouchableOpacity
                            onPress={() => processStepsBackController2()}
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
                                Total Waste -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
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
                                Regrints -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
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
                                Granules -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
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
                                Bags -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processed?.bags}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure9}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.segregationReview}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>
                                Bales -{" "}
                              </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processed?.bales}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text
                                style={[
                                  styles.collectquantitymeasuresresponsetext,
                                  { marginLeft: 10 },
                                ]}
                              >
                                {processed?.quantitymeasure10}
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
                        processStepsController2();
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
                              initialController2();
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
                            processedSaveValidation();
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
    height: height / 18,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
    top: 8,
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
  collectsecondsectiontextinputlocationview123: {
    height: height / 18,
    width: width / 2,
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
    bottom:5,
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
    fontSize: responsiveFontSize(1.8),
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
    height: height / 2.6,
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
    bottom:7,
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
    bottom:9,
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
    top: Platform.OS === "ios" ? 12 : 10,
  },
  modelDropdowmImage: {
    alignSelf: "center",
    top: 10,
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
    bottom:10,
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
    bottom:3,
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
    top: Platform.OS === "ios" ? 12 : 10,
    height: height / 13,
  },
  modelDropdowmWasteDropdownImage: {
    alignSelf: "center",
    top: 8,
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
  },
  segragationImageText1: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.4),
  },
  dateText: {
    color: "#606060",
    top: 20,
  },
  segregationTextInput: {
    color: "black",
    top: Platform.OS === "ios" ? 13 : 12,
  },
  commentTextInput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: 8,
  },
  commentCollectTextInput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: 22,
  },
  commentCollectTextInput1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: 12,
  },
  segregationMainText: {
    paddingLeft: 4,
    color: "#606060",
    top: 20,
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
    top: 20,
  },
  collectWasteType: {
    color: "#606060",
    top: 3,
    // bottom:3,
  },
  collectWasteTypeTextInput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    top: 14,
  },
  collectQuantityTextInput: {
    color: COLORS.BLACK,
    fontSize: responsiveFontSize(1.9),
    top: 14,
  },
  collectLocationTextField: {
    color: "black",
    top: 14,
  },
  segregationLocationTextField: {
    color: "black",
    top: 13,
  },
  processedLocationTextField: {
    color: "black",
    top: 13,
  },
  quantityAstring: {
    left: Platform.OS === "ios" ? 84 : 82,
    color: "red",
    bottom: 2,
    fontSize: Platform.OS === "ios" ? 17 : 15,
  },
  dateAstring: {
    left: Platform.OS === "ios" ? 73 : 71,
    color: "red",
    fontSize: 15,
  },
  dateAstring12: {
    left: Platform.OS === "ios" ? 73.5 : 71,
    color: "red",
    fontSize: 15,
    top: Platform.OS === "ios" ? 2 : 0,
  },
  commentAstring: {
    color: "red",
    left: Platform.OS === "ios" ? 78 : 75,
    bottom: Platform.OS === "ios" ? -3 : 10,
  },
  hdpeAstring: {
    color: "red",
    left: Platform.OS === "ios" ? 84 : 82,
    top: Platform.OS === "ios" ? 2 : 0,
  },
  ldpeAstring: {
    color: "red",
    left: Platform.OS === "ios" ? 82 : 80,
    top: Platform.OS === "ios" ? 2 : 0,
  },
  petAstring: {
    color: "red",
    left: Platform.OS === "ios" ? 72 : 72,
    top: Platform.OS === "ios" ? 2 : 0,
  },
  ppAstring: {
    color: "red",
    left: 65,
    top: Platform.OS === "ios" ? 3 : 0,
  },
  otherAstring: {
    color: "red",
    left: Platform.OS === "ios" ? 90 : 88,
    top: Platform.OS === "ios" ? 3 : 0,
  },
  wasteAstring: {
    left: Platform.OS === "ios" ? 78 : 78,
    color: "red",
    fontSize: 15,
    top: Platform.OS === "ios" ? 1.2 : 0,
  },
  regrindsAstring: {
    left: 60,
    color: "red",
    fontSize: 15,
    top: Platform.OS === "ios" ? 1.5 : 0,
  },
  granulesAstring: {
    left: 60,
    color: "red",
    fontSize: 15,
    top: Platform.OS === "ios" ? 1.5 : 0,
  },
  bagsAstring: {
    left: Platform.OS === "ios" ? 35 : 36,
    color: "red",
    fontSize: 15,
    top: Platform.OS === "ios" ? 2 : 0,
  },
  balesAstring: {
    left: 38,
    color: "red",
    fontSize: 15,
    top: Platform.OS === "ios" ? 2.5 : 0,
  },
  processingDateAstring: {
    left: 80,
    color: "red",
    bottom: 3,
    fontSize: 15,
  },
  validationMessageStyle: {
    color: "red",
    left: 35,
  },
  validationCommentMessageStyle: {
    top: 12,
    color: "red",
    right: Platform.OS === "ios" ? 85 : 70,
  },
  validationHdpeMessageStyle: {
    color: "red",
    left: 32,
    bottom: "95%",
  },
});
