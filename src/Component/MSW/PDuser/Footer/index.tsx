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
import "./withConnect";
import React, { useState } from "react";
import { Images } from "../../../../Assets";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";
import StepIndicator from "react-native-step-indicator";
import { Dropdown } from "react-native-material-dropdown-v2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from "lodash";
import Network from "../../../../Network";
import {
  COLORS,
  FONT_FAMILIES,
  METRICS,
} from "../../../../Configration";
import withConnect from "./withConnect";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ApiClient from '../../../../Network';
import { useDispatch } from "react-redux";
import { ActionType } from '../../../../Redux/Type';
import { VALIDATE_FORM } from "../../../../Constant";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("screen");

const { DASHBOARD_PROCESSING_DATA, DASHBOARD_DISTRIBUTE_DATA } = ActionType;
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
  const currentPosition2 = 1;
  const currentPosition3 = 2;
  const currentPosition4 = 1;
  const currentPosition5 = 2;
  const currentPosition6 = 3;
  const currentPosition7 = 4;
  const currentPosition8 = 5;
  const city = user.cities[0].city;
  const siteName = user.siteName[0].siteName;
  const email = user.email;
  let timeOut;
  let timeOut1;
  const [processingwaste, setProcessingWaste] = useState({
    location2: city, quantitymeasure1: 'MT', quantitymeasure2: 'MT', quantitymeasure3: 'MT',
    quantitymeasure4: 'MT', quantitymeasure5: 'MT', siteName: siteName, totalwaste: "", totalrdf: "",
    totalinerts: "", totalcompost: "", totalrecyclables: "", comment2: "",
  });
  const [distributewaste, setDistributeWaste] = useState({ comment6: "" });
  const [rdf, setRdf] = useState({ location2: city, rdfquantitymeasure1: 'MT', rdfvendorname: "", rdfquantity: "" });
  const [compost, setCompost] = useState({ location2: city, compostquantitymeasure1: 'MT', vendorname: "", compostquantity: "" });
  const [recyclables, setRecyclables] = useState({
    location2: city, recyclablequantitymeasure1: 'MT',
    recyclablevendorname: "", recyclablequantity: "",
  });
  const [inerts, setInerts] = useState({ location2: city, inertsquantitymeasure: 'MT', inertsvendorname: "", inertsquantity: "" });
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

  const data4 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data5 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isSelected2, setSelected2] = useState(0);
  const [date2, setDate2] = useState();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [totalWasteValidationMessage, setTotalWasteValidationMessage] = useState(false);
  const [totalRDFValidationMessage, setRDFValidationMessage] = useState(false);
  const [totalInertsValidationMessage, setInertsValidationMessage] = useState(false);
  const [totalCompostValidationMessage, setCompostValidationMessage] = useState(false);
  const [totalrecyclablesValidationMessage, setRecyclablesValidationMessage] = useState(false);
  const [processingCommentValidationMessage, setProcessingCommentValidationMessage] = useState(false);
  const [compostVenderNameValidationMessage, setCompostVenderNameValidationMessage] = useState(false);
  const [compostQuantityValidationMessage, setCompostQuantityValidationMessage] = useState(false);
  const [rdfVenderNameValidationMessage, setRdfVenderNameValidationMessage] = useState(false);
  const [rdfQuantityValidationMessage, setRdfQuantityValidationMessage] = useState(false);
  const [recyclablesVenderNameValidationMessage, setRecyclablesVenderNameValidationMessage] = useState(false);
  const [recyclablesQuantityValidationMessage, setRecyclablesQuantityValidationMessage] = useState(false);
  const [inertsVenderNameValidationMessage, setInertsVenderNameValidationMessage] = useState(false);
  const [inertsQuantityValidationMessage, setInertsQuantityValidationMessage] = useState(false);
  const [distributeCommentValidationMessage, setDistributeCommentValidationMessage] = useState(false);
  const data9 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data10 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data11 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data12 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  //*****************Validation Methods */
  const validationProcessing = () => {
    if (_.isEmpty(processingwaste.totalwaste.trim())) {
      setTotalWasteValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.totalrdf.trim())) {
      setRDFValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.totalinerts.trim())) {
      setInertsValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.totalcompost.trim())) {
      setCompostValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.totalrecyclables.trim())) {
      setRecyclablesValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(processingwaste.comment2.trim())) {
      setProcessingCommentValidationMessage(true);
      setSelected1(1);
      return false;
    }
    return true;
  };
  const processingSaveValidation = () => {
    if (validationProcessing()) {
      setShowModal1(false);
      processDataSave();
      clearProcessingData();
      initialController1();
    }
  };
  const validationDistribution = () => {
    if (_.isEmpty(compost.vendorname.trim())) {
      setCompostVenderNameValidationMessage(true);
      initialController2();
      return false;
    } else if (_.isEmpty(compost.compostquantity.trim())) {
      setCompostQuantityValidationMessage(true);
      initialController2();
      return false;
    }
    else if (_.isEmpty(rdf.rdfvendorname.trim())) {
      setRdfVenderNameValidationMessage(true);
      setSelected2(1);
      return false;
    }
    else if (_.isEmpty(rdf.rdfquantity.trim())) {
      setRdfQuantityValidationMessage(true);
      setSelected2(1);
      return false;
    }
    else if (_.isEmpty(recyclables.recyclablevendorname.trim())) {
      setRecyclablesVenderNameValidationMessage(true);
      setSelected2(2);
      return false;
    }
    else if (_.isEmpty(recyclables.recyclablequantity.trim())) {
      setRecyclablesQuantityValidationMessage(true);
      setSelected2(2);
      return false;
    }
    else if (_.isEmpty(inerts.inertsvendorname.trim())) {
      setInertsVenderNameValidationMessage(true);
      setSelected2(3);
      return false;
    }
    else if (_.isEmpty(inerts.inertsquantity.trim())) {
      setInertsQuantityValidationMessage(true);
      setSelected2(3);
      return false;
    }
    else if (_.isEmpty(distributewaste.comment6.trim())) {
      setDistributeCommentValidationMessage(true);
      setSelected2(4);
      return false;
    }
    return true;
  };
  const distributeSaveValidation = () => {
    if (validationDistribution()) {
      setShowModal2(false);
      distributeDataSave();
      clearDistributeData();
      initialController2();
    }
  };
  // ***********************Processing GET API******************
  const getProcessingApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().getprocessing(params);
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
          var totalCompost = 0;
          var totalRdf = 0;
          var totalInerts = 0;
          var totalRecyclables = 0;
          filterDateArr.forEach(item => {
            totalCompost = totalCompost + item.totalCompost ?? 0;
            totalRdf = totalRdf + item.totalRdf ?? 0;
            totalInerts = totalInerts + item.totalInerts ?? 0;
            totalRecyclables = totalRecyclables + item.totalRecyclables ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, totalCompost, totalRdf, totalInerts, totalRecyclables });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_PROCESSING_DATA, payload: displayArr });
    }
  };
  // ***********************Distribution GET API******************
  const getDistributionApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().getdistribution(params);
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
          var RDF = 0;
          var Recyclables = 0;
          var Compost = 0;
          var Inerts = 0;
          filterDateArr.forEach(item => {
            if (item.itemType == "RDF") {
              RDF = RDF + item.quantity ?? 0;
            }
            if (item.itemType == "Recyclables") {
              Recyclables = Recyclables + item.quantity ?? 0;
            }
            if (item.itemType == "Compost") {
              Compost = Compost + item.quantity ?? 0;
            }
            if (item.itemType == "Inerts") {
              Inerts = Inerts + item.quantity ?? 0;
            }
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, RDF, Recyclables, Compost, Inerts });
        });
      }
      // @ts-ignore
      dispatch({ type: DASHBOARD_DISTRIBUTE_DATA, payload: displayArr });
    }
  };
  // ***********************Processing Save API******************
  const processDataSave = async () => {
    // @ts-ignore
    var time = (moment(processingwaste?.date1).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;

    const body = {
      // @ts-ignore
      totalWaste: (processingwaste?.totalwaste) + " " + (processingwaste?.quantitymeasure1),
      // @ts-ignore
      totalRdf: (processingwaste?.totalrdf) + " " + (processingwaste?.quantitymeasure2),
      // @ts-ignore
      totalInerts: (processingwaste?.totalinerts) + " " + (processingwaste?.quantitymeasure3),
      // @ts-ignore
      totalCompost: (processingwaste?.totalcompost) + " " + (processingwaste?.quantitymeasure4),
      // @ts-ignore
      totalRecyclables: (processingwaste?.totalrecyclables) + " " + (processingwaste?.quantitymeasure5),
      date: dateTime1,
      location: processingwaste?.location2,
      siteName: [{ siteName: processingwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: processingwaste?.comment2,
    };
    const result = await Network.createApiClient().postmswsavesorting(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut = setTimeout(getProcessingApi, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Distribution Save API******************
  const distributeDataSave = async () => {
    // @ts-ignore
    var time = (moment(distributewaste?.date2).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;

    const body = {
      // @ts-ignore
      rdf: (rdf?.rdfquantity) + " " + (rdf?.rdfquantitymeasure1),
      // @ts-ignore
      compost: (compost?.compostquantity) + " " + (compost?.compostquantitymeasure1),
      // @ts-ignore
      recyclables: recyclables?.recyclablequantity + " " + (recyclables?.recyclablequantitymeasure1),
      // @ts-ignore
      inerts: inerts?.inertsquantity + " " + (inerts?.inertsquantitymeasure),
      // @ts-ignore
      vendorNameRdf: rdf?.rdfvendorname,
      // @ts-ignore
      vendorNameCompost: compost?.vendorname,
      // @ts-ignore
      vendorNameRecyclables: recyclables?.recyclablevendorname,
      // @ts-ignore
      vendorNameInerts: inerts?.inertsvendorname,
      date: dateTime1,
      siteName: [{ siteName: processingwaste?.siteName }],
      location: processingwaste?.location2,
      userEmail: email,
      // @ts-ignore
      comments: distributewaste?.comment6,
    };
    const result = await Network.createApiClient().postmswsavedistribute(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut1 = setTimeout(getDistributionApi, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Clear Modal Data On Cancel And Submission******************
  const clearProcessingData = () => {
    setProcessingWaste({ ...processingwaste, totalwaste: "", totalrdf: "", totalinerts: "", totalcompost: "", totalrecyclables: "", comment2: "", quantitymeasure1: "MT", quantitymeasure2: 'MT', quantitymeasure3: 'MT', quantitymeasure4: "MT", quantitymeasure5: 'MT' });
    // @ts-ignore
    setDate1(null);
    setTotalWasteValidationMessage(false);
    setRDFValidationMessage(false);
    setInertsValidationMessage(false);
    setCompostValidationMessage(false);
    setRecyclablesValidationMessage(false);
    setProcessingCommentValidationMessage(false);
  };

  const clearDistributeData = () => {
    setCompost({ ...compost, vendorname: "", compostquantity: "", compostquantitymeasure1: 'MT' });
    setRdf({ ...rdf, rdfvendorname: "", rdfquantity: "", rdfquantitymeasure1: 'MT' });
    setRecyclables({ ...recyclables, recyclablevendorname: "", recyclablequantity: "", recyclablequantitymeasure1: 'MT' });
    setInerts({ ...inerts, inertsvendorname: "", inertsquantity: "", inertsquantitymeasure: 'MT' });
    setDistributeWaste({ ...distributewaste, comment6: "" });
    // @ts-ignore
    setDate2(null);
    setCompostVenderNameValidationMessage(false);
    setCompostQuantityValidationMessage(false);
    setRdfVenderNameValidationMessage(false);
    setRdfQuantityValidationMessage(false);
    setRecyclablesVenderNameValidationMessage(false);
    setRecyclablesQuantityValidationMessage(false);
    setInertsVenderNameValidationMessage(false);
    setInertsQuantityValidationMessage(false);
    setDistributeCommentValidationMessage(false);
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
    setProcessingWaste({ ...processingwaste, date1 });
    hideDatePicker1();
  };
  // *******************Date Selection Method For Distribution*****************
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = (date2) => {
    setDate2(date2);
    // @ts-ignore
    setDistributeWaste({ ...distributewaste, date2 });
    hideDatePicker2();
  };
  // **********************Modal Going Next Page*******************
  const processStepsController1 = () => {
    setSelected1(isSelected1 + 1);
  };
  const processStepsController2 = () => {
    setSelected2(isSelected2 + 1);
  };
  // **********************Modal Going Previous Page*******************
  const processStepsBackController1 = () => {
    setSelected1(isSelected1 - 1);
  };
  const processStepsBackController2 = () => {
    setSelected2(isSelected2 - 1);
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController1 = () => {
    setSelected1(0);
  };
  const initialController2 = () => {
    setSelected2(0);
  };
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.firsticonView} >
          <TouchableOpacity onPress={() =>
            setShowModal1(!showModal1)
          }>
            <Image
              source={Images.sorting}
              style={styles.processingFooterImage}
            />
            <Text style={styles.mainFooterText}>Processing</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <View style={styles.SecondiconView} >

        </View>
      </View>
      <View style={styles.ThirdiconView}>
        <TouchableOpacity onPress={() => setShowModal2(!showModal2)}>
          <Image
            source={Images.distribute}
            style={styles.distributionFooterImage}
          />
          <Text style={styles.mainFooterText}>Distribute</Text>
        </TouchableOpacity>
      </View>
      {/*  Processing ....... Modal */}
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
                style={styles.collectmodalmainview}
              >
                {isSelected1 == 0 &&
                  <View style={styles.processingfirstsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearProcessingData(), initialController1(); }}>
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
                              style={styles.modalBackImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.processingfirstsectionheadertextview}>
                          <Text style={styles.processingfirstsectionheadertext}>
                            Processing
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.processingfirstsectionheadermainview}>
                        <View style={styles.processingfirstsectionheaderbackimagrview}>
                          <TouchableOpacity onPress={() => { setShowModal1(false), clearProcessingData(); }}>
                            <Image
                              source={Images.back1}
                              style={styles.modalBackImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.processingfirstsectionheadertextview}>
                          <Text style={styles.processingfirstsectionheadertext}>
                            Processing
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
                          <Text style={[styles.processingTextLabel, { top: 10 }]}>
                            Total Waste
                            <Text style={styles.quantityAstring}>*</Text>
                          </Text>

                        </View>
                        <View style={styles.processingfirstsectionweight1textinputmainview}>
                          <View style={styles.processingfirstsectionweight1textinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.wasteTextField}
                              placeholder="Weight"
                              selectionColor={COLORS.BLACK}
                              value={processingwaste?.totalwaste ?? ""}
                              onChangeText={(text) => {
                                setTotalWasteValidationMessage(false);
                                setProcessingWaste({ ...processingwaste, totalwaste: text });
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
                              inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                              containerStyle={styles.wasteDropdownContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.wasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalWasteValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.TOTALWASTE}</Text>}
                      <View style={styles.processingfirstsectiontotalrdfmainview}>
                        <View style={styles.processingfirstsectiontotalrdfview}>
                          <Text style={[styles.processingTextLabel, { top: 10 }]}>
                            Total RDF
                            <Text style={styles.RdfAstring}>*</Text>
                          </Text>

                        </View>

                        <View style={styles.processingfirstsectionweight2textinputmainview}>
                          <View style={styles.processingfirstsectionweight2textinputview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.wasteTextField}
                              placeholder="Weight"
                              value={processingwaste?.totalrdf ?? ""}
                              onChangeText={(text) => {
                                setRDFValidationMessage(false);
                                setProcessingWaste({ ...processingwaste, totalrdf: text });
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
                              inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                              containerStyle={styles.wasteDropdownContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.wasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalRDFValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.TOTALRDF}</Text>}
                      <View style={styles.processingfirstsectiontotalinertsmainview}>
                        <View
                          style={styles.processingfirstsectiontotalrdfview}
                        >
                          <Text style={[styles.processingTextLabel, { top: 10 }]}>
                            Total Inerts
                            <Text style={styles.inertsAstring}>*</Text>
                          </Text>

                        </View>
                        <View
                          style={styles.processingfirstsectionweight2textinputmainview}
                        >
                          <View
                            style={styles.processingfirstsectionweight2textinputview}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.wasteTextField}
                              placeholder="Weight"
                              value={processingwaste?.totalinerts ?? ""}
                              onChangeText={(text) => {
                                setInertsValidationMessage(false);
                                setProcessingWaste({
                                  ...processingwaste,
                                  totalinerts: text,
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
                              data={data3}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure3 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure3: text,
                                })
                              }
                              inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                              containerStyle={styles.wasteDropdownContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.wasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalInertsValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.TOTALINERTS}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalrdfview}
                        >
                          <Text style={[styles.processingTextLabel, { top: 10 }]}>
                            Total Compost
                            <Text style={styles.compostAstring}>*</Text>
                          </Text>

                        </View>
                        <View
                          style={styles.processingfirstsectionweight2textinputmainview}
                        >
                          <View
                            style={styles.processingfirstsectionweight2textinputview}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.wasteTextField}
                              placeholder="Weight"
                              value={processingwaste?.totalcompost ?? ""}
                              onChangeText={(text) => {
                                setCompostValidationMessage(false);
                                setProcessingWaste({
                                  ...processingwaste,
                                  totalcompost: text,
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
                              data={data4}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure4 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure4: text,
                                })
                              }
                              inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                              containerStyle={styles.wasteDropdownContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.wasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalCompostValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.TOTALCOMPOST}</Text>}
                      <View
                        style={styles.processingfirstsectiontotalrdfmainview}
                      >
                        <View
                          style={styles.processingfirstsectiontotalrdfview}
                        >
                          <Text style={[styles.processingTextLabel, { top: 10 }]}>
                            Total Recyclables
                            <Text style={styles.recyclablesAstring}>*</Text>
                          </Text>

                        </View>
                        <View
                          style={styles.processingfirstsectionweight2textinputmainview}
                        >
                          <View
                            style={styles.processingfirstsectionweight2textinputview}
                          >
                            <TextInput
                              placeholderTextColor={"#000000"}
                              keyboardType="number-pad"
                              style={styles.wasteTextField}
                              placeholder="Weight"
                              value={processingwaste?.totalrecyclables ?? ""}
                              onChangeText={(text) => {
                                setRecyclablesValidationMessage(false);
                                setProcessingWaste({
                                  ...processingwaste,
                                  totalrecyclables: text,
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
                              data={data5}
                              underlineColor="transparent"
                              value={processingwaste?.quantitymeasure5 ?? ""}
                              onChangeText={(text) =>
                                setProcessingWaste({
                                  ...processingwaste,
                                  quantitymeasure5: text,
                                })
                              }
                              inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                              containerStyle={styles.wasteDropdownContainerStyle}
                            />
                            <Image
                              source={Images.footerDropdown}
                              style={styles.wasteDropdownImage}
                            />
                          </View>
                        </View>
                      </View>
                      {totalrecyclablesValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.TOTALRECYCLABLE}</Text>}
                    </View>
                  </View>
                }
                {isSelected1 == 1 &&
                  <View style={styles.collectsecondsectionmainview}>
                    <TouchableOpacity onPress={() => { setShowModal1(false), clearProcessingData(), initialController1(); }}>
                      <View
                        style={styles.collectsecondsectiontopbarview}
                      >
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                    {isSelected1 >= 1 ? (
                      <View
                        style={styles.collectsecondsectionheadermainview}
                      >
                        <View
                          style={styles.collectsecondsectionheaderbackview}
                        >
                          <TouchableOpacity onPress={() => processStepsBackController1()}>
                            <Image
                              source={Images.back1}
                              style={styles.modalBackImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal1(false)}>
                          <View
                            style={styles.collectsecondsectionheadercollectview}
                          >
                            <Text
                              style={styles.processingMainModelText}
                            >
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
                          <ModalHeader title={"Processing"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={styles.collectsecondsectionstepindicatorview}
                    >
                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition3}
                        stepCount={2}
                      />
                    </View>
                    <View
                      style={styles.collectsecondsectionmaininputsview}
                    >
                      <View
                        style={styles.collectsecondsectiondatemainview}
                      >
                        <View
                          style={styles.collectsecondsectiondateview}
                        >
                          <Text style={styles.collectmodalselectdatetext}>Select Date
                            <Text style={styles.dateAstring}>*</Text>
                          </Text>

                        </View>

                        <View
                          style={styles.collectsecondsectiondatepickermainview}
                        >
                          <View
                            style={styles.collectsecondsectiondatepickerview}
                          >
                            <TouchableOpacity
                              onPress={showDatePicker1}
                            >
                              <Text
                                style={styles.collectmodalselecrdatevaluetext}
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
                          <Text style={styles.collectmodallocationtext}>Location</Text>
                        </View>
                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={styles.collectmodallocationtextinput}
                              editable={false}
                              value={processingwaste?.location2 ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.collectsecondsectionlocationmainview}>
                        <View style={styles.collectsecondsectionlocationview}>
                          <Text style={styles.collectmodallocationtext}>Site Name</Text>
                        </View>
                        <View style={styles.collectsecondsectiontextinputlocationmainview}>
                          <View style={styles.collectsecondsectiontextinputlocationview1}>
                            <TextInput
                              placeholderTextColor={"#000000"}
                              style={[styles.collectmodallocationtextinput, { fontSize: responsiveFontSize(1.6) }]}
                              editable={false}
                              value={processingwaste?.siteName ?? ""}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <View
                        style={styles.collectsecondsectioncommentview}
                      >
                        <TextInput
                          style={!processingwaste?.comment2 ? styles.collectmodalcommenttextinput : styles.collectmodalcommenttextinput1}
                          placeholder={"Comments"}
                          placeholderTextColor={COLORS.BLACK}
                          keyboardType="default"
                          selectionColor={COLORS.BLACK}
                          maxLength={140}
                          value={processingwaste?.comment2 ?? ""}
                          onChangeText={(text) => {
                            setProcessingCommentValidationMessage(false);
                            setProcessingWaste({ ...processingwaste, comment2: text });
                          }}
                        />
                        {!processingwaste?.comment2 && <Text style={[styles.commentAstring, { top: Platform.OS === 'ios' ? 5 : -11 }]}>*</Text>}
                      </View>
                      {processingCommentValidationMessage && <Text style={styles.validationCommentMessageStyle}>{VALIDATE_FORM.PROCESSINGCOMMENT}</Text>}
                    </View>
                  </View>
                }
                {isSelected1 == 2 &&
                  <View
                    style={styles.collectthirdsectionmainview}
                  >
                    <View
                      style={styles.collectthirdsectiontopbarview}
                    >
                      <TouchableOpacity onPress={() => { setShowModal1(false), clearProcessingData(), initialController1(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isSelected1 >= 1 ? (
                      <View
                        style={styles.collectthirdsectionheadermainview}
                      >
                        <View
                          style={styles.collectthirdsectionbackimageview}
                        >
                          <TouchableOpacity onPress={() => processStepsBackController1()}>
                            <Image
                              source={Images.back1}
                              style={styles.modalBackImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.collectthirdsectionheadertextview}
                        >
                          <Text
                            style={styles.reviewText}
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
                          <ModalHeader title={"Processing"} isRightAction={true} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.collectthirdsectionmainflatlistview}>
                      <View>
                        <View style={styles.collectreviewmaininputview}>
                          <View style={styles.reviewTextLabelView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Waste - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.totalwaste}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure1}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.reviewTextLabelView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total RDF - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.totalrdf}
                              </Text>
                            </View>

                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure2}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.reviewTextLabelView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Compost - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.totalcompost}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure3}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.reviewTextLabelView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Inerts - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.totalinerts}
                              </Text>
                            </View>
                            <View style={styles.collectquantitymeasureview}>
                              <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                {processingwaste?.quantitymeasure4}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.reviewTextLabelView}>
                            <View style={styles.collectwastetypeview}>
                              <Text style={styles.collectwastetext}>Total Recyclables - </Text>
                              <Text style={styles.collectwasteresponsetext}>
                                {processingwaste?.totalrecyclables}
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
                            <Text style={styles.collectcommentresponsetext}>
                              {processingwaste?.comment2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                <View
                  style={styles.collectmodalsecondpagemaineview}
                >
                  {isSelected1 < 2 ? (
                    <TouchableOpacity
                      style={styles.collectmodalsecondpageTouchable}
                      onPress={() => {
                        processStepsController1();
                      }}
                    >
                      <Text
                        style={styles.collectmodalsecondpagenextText}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={styles.collectmodalcancelbuttonmainview}
                    >
                      <View
                        style={styles.collectmodalcancelbuttonsubview}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal1(false), clearProcessingData(), initialController1();
                          }}
                        >
                          <View
                            style={styles.collectmodalcancelmainview1}
                          >
                            <Text
                              style={styles.collectmodalcanceltext}
                            >
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={styles.collectmodalsubmitTouchableview}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            processingSaveValidation();
                          }}
                        >
                          <View
                            style={styles.collectmodalsubmitview}
                          >
                            <Text
                              style={styles.collectmodalsubmittext}
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

      {/* Distribute .... Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal2}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setShowModal2(false);
        }}>
        <KeyboardAwareScrollView scrollEnabled={false} enableOnAndroid={true} >
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <View style={styles.collectmodalmainview}>
                <View>
                  {isSelected2 == 0 &&
                    <View
                      style={styles.processingfirstsectionmainview}
                    >
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController2(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected2 >= 1 ? (
                        <View
                          style={styles.processingfirstsectionheadermainview}
                        >
                          <View
                            style={styles.processingfirstsectionheaderbackimagrview}
                          >
                            <TouchableOpacity onPress={() => setShowModal2(false)}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={styles.processingfirstsectionheadertextview}
                          >
                            <Text
                              style={styles.processingMainModelText}
                            >
                              Distribute
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={styles.processingfirstsectionheadermainview}
                        >
                          <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(); }}>
                            <View style={styles.processingfirstsectionheaderbackimagrview}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </View>
                          </TouchableOpacity>
                          <View
                            style={styles.processingfirstsectionheadertextview}
                          >
                            <Text
                              style={styles.processingMainModelText}
                            >
                              Distribute
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.distributionPicView}>
                        <ImageBackground
                          style={styles.distributionImageView}
                          source={Images.Compost}>
                          <Text style={styles.distributionImageText}>
                            Compost Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.RDF}>
                          <Text
                            style={styles.distributionImageText1}
                          >
                            RDF Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Recyclables}
                        >
                          <Text
                            style={styles.distributionImageText2}
                          >
                            Recyclable Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Inerts}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            Inerts Outflow
                          </Text>
                        </ImageBackground>
                      </View>
                      <View style={styles.distributionfirstsectionstepindicatopview}>
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition4}
                          stepCount={5}
                        />
                      </View>
                      <View
                        style={styles.distributionfirstsectioninputmainview}
                      >
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectiontotalwasteview}
                          >
                            <Text style={styles.venderCompostText}>Vendor Name
                              <Text style={styles.vendorDistributeCompostAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.distributionfirstsectionweight1textinputmainview}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview}
                            >
                              <TextInput
                                placeholderTextColor={"gray"}
                                style={styles.compostVenderTextField}
                                keyboardType="email-address"
                                value={compost?.vendorname ?? ""}
                                onChangeText={(text) => {
                                  setCompostVenderNameValidationMessage(false);
                                  setCompost({ ...compost, vendorname: text });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        {compostVenderNameValidationMessage && <Text style={styles.validationCompostMessageStyle}>{VALIDATE_FORM.COMPOSTVENDORNAME}</Text>}
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectionweight1textinputview1}
                          >
                            <Text style={styles.distributeCompostQuantity}>Compost
                              <Text style={styles.distributeCompostAstring}>*</Text>
                            </Text>

                          </View>

                          <View
                            style={styles.distributionfirstsectionweight1textinputview2}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview3}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.compostValueTextField}
                                placeholder="Weight"
                                value={compost?.compostquantity ?? ""}
                                onChangeText={(text) => {
                                  setCompostQuantityValidationMessage(false);
                                  setCompost({ ...compost, compostquantity: text });
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
                                data={data9}
                                underlineColor="transparent"
                                value={compost?.compostquantitymeasure1 ?? ""}
                                onChangeText={(text) =>
                                  setCompost({
                                    ...compost,
                                    compostquantitymeasure1: text,
                                  })
                                }
                                inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                containerStyle={styles.wasteDropdownContainerStyle}
                              />
                              <Image
                                source={Images.footerDropdown}
                                style={styles.wasteDropdownImage}
                              />
                            </View>
                          </View>
                        </View>
                        {compostQuantityValidationMessage && <Text style={styles.validationCompostQuantityMessageStyle}>{VALIDATE_FORM.COMPOSTQUANTITY}</Text>}
                      </View>
                    </View>
                  }
                  {isSelected2 == 1 &&
                    <View
                      style={styles.collectmodalmainview}
                    >
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController2(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected2 >= 1 ? (
                        <View
                          style={styles.processingfirstsectionheadermainview}
                        >
                          <View
                            style={styles.processingfirstsectionheaderbackimagrview}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController2()}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => setShowModal2(false)}>
                            <View style={styles.processingfirstsectionheadertextview}>
                              <Text style={styles.processingMainModelText}>
                                Distribute
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
                            <ModalHeader title={"Distribute"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={styles.distributionPicView}
                      >
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Compost}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            Compost Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView}
                          source={Images.RDF}
                        >
                          <Text
                            style={styles.distributionImageText}
                          >
                            RDF Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Recyclables}
                        >
                          <Text
                            style={styles.distributionImageText2}
                          >
                            Recyclable Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Inerts}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            Inerts Outflow
                          </Text>
                        </ImageBackground>
                      </View>
                      <View
                        style={styles.distributionfirstsectionstepindicatopview}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition5}
                          stepCount={5}
                        />
                      </View>
                      <View
                        style={styles.distributionsecondsectioninputmainview}
                      >
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectiontotalwasteview}
                          >
                            <Text style={styles.vendorDistributeRdfAstring}>Vendor Name
                              <Text style={styles.vendorDistributeCompostAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.distributionfirstsectionweight1textinputmainview1}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview}
                            >
                              <TextInput
                                placeholderTextColor={"gray"}
                                style={styles.compostVenderTextField}
                                keyboardType="email-address"
                                value={rdf?.rdfvendorname ?? ""}
                                onChangeText={(text) => {
                                  setRdfVenderNameValidationMessage(false);
                                  setRdf({ ...rdf, rdfvendorname: text });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        {rdfVenderNameValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RDFVENDORNAME}</Text>}
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectionweight1textinputview1}
                          >
                            <Text style={styles.distributeRdfAshtring}>RDF
                              <Text style={styles.vendorDistributRdfAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.distributionfirstsectionweight1textinputview2}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview3}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.compostValueTextField}
                                placeholder="Weight"
                                value={rdf?.rdfquantity ?? ""}
                                onChangeText={(text) => {
                                  setRdfQuantityValidationMessage(false);
                                  setRdf({ ...rdf, rdfquantity: text });
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
                                data={data10}
                                underlineColor="transparent"
                                value={rdf?.rdfquantitymeasure1 ?? ""}
                                onChangeText={(text) =>
                                  setRdf({ ...rdf, rdfquantitymeasure1: text })
                                }
                                inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                containerStyle={styles.wasteDropdownContainerStyle}
                              />
                              <Image
                                source={Images.footerDropdown}
                                style={styles.wasteDropdownImage}
                              />
                            </View>
                          </View>
                        </View>
                        {rdfQuantityValidationMessage && <Text style={styles.validationRDFQuantityMessageStyle}>{VALIDATE_FORM.RDFQUANTITY}</Text>}
                      </View>
                    </View>
                  }
                  {isSelected2 == 2 &&
                    <View
                      style={styles.collectmodalmainview}
                    >
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController2(); }}>
                        <View
                          style={styles.processingfirstsectiontopbarview}
                        >
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected2 >= 1 ? (
                        <View
                          style={styles.processingfirstsectionheadermainview}
                        >
                          <View
                            style={styles.processingfirstsectionheaderbackimagrview}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController2()}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => setShowModal2(false)}>
                            <View
                              style={styles.processingfirstsectionheadertextview}
                            >
                              <Text
                                style={styles.processingMainModelText}
                              >
                                Distribute
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
                            <ModalHeader title={"Distribute"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={styles.distributionPicView}
                      >
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Compost}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            Compost Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.RDF}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            RDF Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView}
                          source={Images.Recyclables}
                        >
                          <Text
                            style={styles.distributionImageText3}
                          >
                            Recyclable Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Inerts}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            Inerts Outflow
                          </Text>
                        </ImageBackground>
                      </View>
                      <View
                        style={styles.distributionfirstsectionstepindicatopview}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition6}
                          stepCount={5}
                        />
                      </View>
                      <View
                        style={styles.distributionsecondsectioninputmainview}
                      >
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectiontotalwasteview}
                          >
                            <Text style={styles.distributeRecyclablesAshtring}>Vendor Name
                              <Text style={styles.vendorDistributRecyclablesAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.distributionfirstsectionweight1textinputmainview1}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview}
                            >
                              <TextInput
                                placeholderTextColor={"gray"}
                                style={styles.compostVenderTextField}
                                keyboardType="email-address"
                                value={recyclables?.recyclablevendorname ?? ""}
                                onChangeText={(text) => {
                                  setRecyclablesVenderNameValidationMessage(false);
                                  setRecyclables({ ...recyclables, recyclablevendorname: text });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        {recyclablesVenderNameValidationMessage && <Text style={styles.recycleVenderName}>{VALIDATE_FORM.RECYCLABLEVENDORNAME}</Text>}
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectionweight1textinputview1}
                          >
                            <Text style={styles.distributeRecyclablesLabelAshtring}>Recyclable
                              <Text style={styles.vendorDistributRecyclablesQuantityAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.distributionfirstsectionweight1textinputview2}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview3}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.compostValueTextField}
                                placeholder="Weight"
                                value={recyclables?.recyclablequantity ?? ""}
                                onChangeText={(text) => {
                                  setRecyclablesQuantityValidationMessage(false);
                                  setRecyclables({ ...recyclables, recyclablequantity: text });
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
                                data={data11}
                                underlineColor="transparent"
                                value={recyclables?.recyclablequantitymeasure1 ?? ""}
                                onChangeText={(text) =>
                                  setRecyclables({ ...recyclables, recyclablequantitymeasure1: text })
                                }
                                inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                containerStyle={styles.wasteDropdownContainerStyle}
                              />
                              <Image
                                source={Images.footerDropdown}
                                style={styles.wasteDropdownImage}
                              />
                            </View>
                          </View>
                        </View>
                        {recyclablesQuantityValidationMessage && <Text style={styles.validationRecyclableQuantityMessageStyle}>{VALIDATE_FORM.RECYCLABLEQUANTITY}</Text>}
                      </View>
                    </View>
                  }
                  {isSelected2 == 3 &&
                    <View
                      style={styles.collectmodalmainview}
                    >
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController2(); }}>
                        <View
                          style={styles.processingfirstsectiontopbarview}
                        >
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected2 >= 1 ? (
                        <View
                          style={styles.processingfirstsectionheadermainview}
                        >
                          <View
                            style={styles.processingfirstsectionheaderbackimagrview}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController2()}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => setShowModal2(false)}>
                            <View
                              style={styles.processingfirstsectionheadertextview}
                            >
                              <Text
                                style={styles.processingMainModelText}
                              >
                                Distribute
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
                            <ModalHeader title={"Distribute"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={styles.distributionPicView}
                      >
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Compost}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            Compost Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.RDF}
                        >
                          <Text
                            style={styles.distributionImageText1}
                          >
                            RDF Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView1}
                          source={Images.Recyclables}
                        >
                          <Text
                            style={styles.distributionImageText2}
                          >
                            Recyclable Outflow
                          </Text>
                        </ImageBackground>
                        <ImageBackground
                          style={styles.distributionImageView}
                          source={Images.Inerts}
                        >
                          <Text
                            style={styles.distributionImageText}
                          >
                            Inerts Outflow
                          </Text>
                        </ImageBackground>
                      </View>
                      <View
                        style={styles.distributionfirstsectionstepindicatopview}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition7}
                          stepCount={5}
                        />
                      </View>
                      <View
                        style={styles.distributionsecondsectioninputmainview}
                      >
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectiontotalwasteview}
                          >
                            <Text style={styles.venderText}>Vendor Name
                              <Text style={styles.vendorDistributInertsVendorAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.distributionfirstsectionweight1textinputmainview1}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview}
                            >
                              <TextInput
                                placeholderTextColor={"gray"}
                                style={styles.compostVenderTextField}
                                keyboardType="email-address"
                                value={inerts?.inertsvendorname ?? ""}
                                onChangeText={(text) => {
                                  setInertsVenderNameValidationMessage(false);
                                  setInerts({ ...inerts, inertsvendorname: text });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        {inertsVenderNameValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.INERTSVENDORNAME}</Text>}
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectionweight1textinputview1}
                          >
                            <Text style={styles.compostText}>Inerts
                              <Text style={styles.vendorDistributInertsQuantityAstring}>*</Text>
                            </Text>

                          </View>

                          <View
                            style={styles.distributionfirstsectionweight1textinputview2}
                          >
                            <View
                              style={styles.distributionfirstsectionweight1textinputview3}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.compostValueTextField}
                                placeholder="Weight"
                                value={inerts?.inertsquantity ?? ""}
                                onChangeText={(text) => {
                                  setInertsQuantityValidationMessage(false);
                                  setInerts({ ...inerts, inertsquantity: text });
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
                                data={data12}
                                underlineColor="transparent"
                                value={inerts?.inertsquantitymeasure ?? ""}
                                onChangeText={(text) =>
                                  setInerts({ ...inerts, inertsquantitymeasure: text })
                                }
                                inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                containerStyle={styles.wasteDropdownContainerStyle}
                              />
                              <Image
                                source={Images.footerDropdown}
                                style={styles.wasteDropdownImage}
                              />
                            </View>
                          </View>
                        </View>
                        {inertsQuantityValidationMessage && <Text style={styles.validationInertsQuantityMessageStyle}>{VALIDATE_FORM.INERTSQUANTITY}</Text>}
                      </View>
                    </View>
                  }
                  {isSelected2 == 4 &&
                    <View
                      style={styles.collectmodalmainview}
                    >
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController2(); }}>
                        <View
                          style={styles.processingfirstsectiontopbarview}
                        >
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected2 >= 1 ? (
                        <View
                          style={styles.processingfirstsectionheadermainview}
                        >
                          <View
                            style={styles.processingfirstsectionheaderbackimagrview}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController2()}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => setShowModal2(false)}>
                            <View
                              style={styles.processingfirstsectionheadertextview}
                            >
                              <Text
                                style={styles.processingMainModelText}
                              >
                                Distribute
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
                            <ModalHeader title={"Distribute"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={styles.distributionfirstsectionstepindicatopview}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition8}
                          stepCount={5}
                        />
                      </View>
                      <View
                        style={styles.distributionsecondsectioninputmainview1}
                      >
                        <View
                          style={styles.processingfirstsectiomtotalwastemainview}
                        >
                          <View
                            style={styles.distributionfirstsectiontotalwasteview}
                          >
                            <Text style={styles.distributemodalselectdatetext}>Select Date
                              <Text style={styles.dateAstring}>*</Text>
                            </Text>

                          </View>

                          <View
                            style={styles.collectsecondsectiondatepickermainview}
                          >
                            <View
                              style={styles.collectsecondsectiondatepickerview}
                            >
                              <TouchableOpacity
                                onPress={showDatePicker2}
                              >
                                <Text
                                  style={styles.collectmodalselecrdatevaluetext}
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
                                  value={distributewaste?.dateselection3 ?? ""}
                                  onChangeText={(text) =>
                                    setDistributeWaste({
                                      ...distributewaste,
                                      // @ts-ignore
                                      dateselection3: text,
                                    })
                                  }
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        <View style={styles.collectsecondsectionlocationmainview}>
                          <View style={styles.collectsecondsectionlocationview}>
                            <Text style={styles.collectmodallocationtext}>Location</Text>
                          </View>
                          <View style={styles.collectsecondsectiontextinputlocationmainview}>
                            <View style={styles.collectsecondsectiontextinputlocationview}>
                              <TextInput
                                editable={false}
                                placeholderTextColor={"#000000"}
                                style={styles.collectmodallocationtextinput}
                                value={processingwaste?.location2 ?? ""}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        <View style={styles.collectsecondsectionlocationmainview}>
                          <View style={styles.collectsecondsectionlocationview}>
                            <Text style={styles.collectmodallocationtext}>Site Name</Text>
                          </View>
                          <View style={styles.collectsecondsectiontextinputlocationmainview}>
                            <View style={styles.collectsecondsectiontextinputlocationview1}>
                              <TextInput
                                editable={false}
                                placeholderTextColor={"#000000"}
                                style={[styles.collectmodallocationtextinput, { fontSize: responsiveFontSize(1.6) }]}
                                value={processingwaste?.siteName ?? ""}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        <View style={styles.collectsecondsectioncommentview}>
                          <TextInput
                            style={!distributewaste?.comment6 ? styles.distributemodalcommenttextinput : styles.distributemodalcommenttextinput1}
                            placeholder={"Comments"}
                            placeholderTextColor={COLORS.BLACK}
                            keyboardType="default"
                            selectionColor={COLORS.BLACK}
                            maxLength={140}
                            value={distributewaste?.comment6 ?? ""}
                            onChangeText={(text) => {
                              setDistributeCommentValidationMessage(false);
                              setDistributeWaste({ ...distributewaste, comment6: text });
                            }}
                          />
                          {!distributewaste?.comment6 && <Text style={styles.commentAstring}>*</Text>}
                        </View>
                        {distributeCommentValidationMessage && <Text style={styles.validationCommentMessageStyle}>{VALIDATE_FORM.DISTRIBUTECOMMENT}</Text>}
                      </View>
                    </View>
                  }
                </View>
                {isSelected2 == 5 &&
                  <View>
                    <View style={styles.collectthirdsectiontopbarview}>
                      <TouchableOpacity onPress={() => { setShowModal2(false), clearDistributeData(), initialController2(); }}>
                        <View style={styles.processingfirstsectiontopbarview}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      {isSelected2 >= 1 ? (
                        <View
                          style={styles.collectthirdsectionheadermainview}
                        >
                          <View
                            style={styles.collectthirdsectionbackimageview}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController2()}>
                              <Image
                                source={Images.back1}
                                style={styles.modalBackImage}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.collectthirdsectionheadertextview}>
                            <Text style={styles.reviewText}>
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
                            <ModalHeader title={"Review"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View style={styles.collectthirdsectionmainflatlistview}>
                        <View style={[styles.collectreviewmaininputview]}>
                          <KeyboardAwareScrollView scrollEnabled={true}>
                            <View >
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Item Type - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {"RDF"}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Vendor Name - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {rdf?.rdfvendorname}
                                </Text>
                              </View>
                              <View style={styles.collectquantitymeasureview}>
                                <Text style={styles.collectwastetext}>Quantity - </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {rdf?.rdfquantity}
                                </Text>

                              </View>
                              <View style={[styles.collectquantitymeasureview, { flexDirection: "row" }]}>
                                <Text style={styles.collectquantitymeasuretext}>
                                  QuantityMeasures -
                                </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {rdf?.rdfquantitymeasure1}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Item Type - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {"Compost"}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Vendor Name - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {compost?.vendorname}
                                </Text>
                              </View>
                              <View style={styles.collectquantitymeasureview}>
                                <Text style={styles.collectwastetext}>Quantity - </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {compost?.compostquantity}
                                </Text>
                              </View>
                              <View style={[styles.collectquantitymeasureview, { flexDirection: "row" }]}>
                                <Text style={styles.collectquantitymeasuretext}>
                                  QuantityMeasures -
                                </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {compost?.compostquantitymeasure1}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Item Type - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {"Recyclables"}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Vendor Name - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {recyclables?.recyclablevendorname}
                                </Text>
                              </View>
                              <View style={styles.collectquantitymeasureview}>
                                <Text style={styles.collectwastetext}>Quantity - </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {recyclables?.recyclablequantity}
                                </Text>
                              </View>
                              <View style={[styles.collectquantitymeasureview, { flexDirection: "row" }]}>
                                <Text style={styles.collectquantitymeasuretext}>
                                  QuantityMeasures -
                                </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {recyclables?.recyclablequantitymeasure1}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Item Type - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {"Inerts"}
                                </Text>
                              </View>
                              <View style={styles.collectwastetypeview}>
                                <Text style={styles.collectwastetext}>Vendor Name - </Text>
                                <Text style={styles.collectwasteresponsetext}>
                                  {/* @ts-ignore */}
                                  {inerts?.inertsvendorname}
                                </Text>
                              </View>
                              <View style={styles.collectquantitymeasureview}>
                                <Text style={styles.collectwastetext}>Quantity - </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {/* @ts-ignore */}
                                  {inerts?.inertsquantity}
                                </Text>
                              </View>
                              <View style={[styles.collectquantitymeasureview, { flexDirection: "row" }]}>
                                <Text style={styles.collectquantitymeasuretext}>
                                  QuantityMeasures -
                                </Text>
                                <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                  {inerts?.inertsquantitymeasure}
                                </Text>
                              </View>
                              <View style={styles.collectdatetimeview}>
                                <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                                <Text style={styles.collectdatetimeresponsetext}>
                                  {/* @ts-ignore */}
                                  {(moment(distributewaste?.date2).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}</Text>
                              </View>
                              <View style={styles.collectlocationview}>
                                <Text style={styles.collectlocationtext}>Site Name - </Text>
                                <Text style={styles.collectlocationresponsetext}>
                                  {processingwaste?.siteName}
                                </Text>
                              </View>
                              <View style={[styles.collectcommentview, { marginBottom: 50 }]}>
                                <Text style={styles.collectcommenttext}>Comments - </Text>
                                <Text style={styles.collectcommentresponsetextdist}>
                                  {/* @ts-ignore */}
                                  {distributewaste?.comment6}
                                </Text>
                              </View>
                            </View>
                          </KeyboardAwareScrollView>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                <View
                  style={styles.collectmodalsecondpagemaineview}
                >
                  {isSelected2 < 5 ? (
                    <TouchableOpacity
                      style={styles.collectmodalsecondpageTouchable}
                      onPress={() => {
                        processStepsController2();
                      }}>
                      <Text style={styles.collectmodalsecondpagenextText}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.distributemodalcancelbuttonmainview}>
                      <View style={styles.distributemodalcancelbuttonsubview}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal2(false), clearDistributeData(), initialController2();
                          }}
                        >
                          <View
                            style={styles.collectmodalcancelmainview1}
                          >
                            <Text
                              style={styles.collectmodalcanceltext}
                            >
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={styles.collectmodalsubmitTouchableview}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            distributeSaveValidation();
                          }}
                        >
                          <View
                            style={styles.collectmodalsubmitview}
                          >
                            <Text
                              style={styles.collectmodalsubmittext}
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
    backgroundColor: "#DB0D15",
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
  collectfirstsectionmainview: {
    height: height / 1.65,
    width: width / 1,
  },
  collectfirstsectiontopbarview: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  collectmodalheadermainview: {
    height: height / 11,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  collectfirstsectionText: {
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
  collectfirstsectionwastemainview: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
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
  collectsecondsectionheadercollectview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
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
    height: height / 13,
    width: width / 2.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 6 : 0,
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
  collectsecondsectionlocationview: {
    height: height / 15,
    width: width / 2.4,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
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
  collectsecondsectioncommentview: {
    height: height / 18,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
  },
  collectthirdsectionmainview: {
    height: height / 1.65,
    width: width / 1,
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
    width: width / 1,
    justifyContent: "center",
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
    height: height / 15,
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
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 6 : 0,
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
  collectreviewmaininputview: {
    width: width / 1.18,
  },
  collectwastetypeview: {
    flexDirection: "row",
    height: height / 25,
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
    // marginLeft:50,
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
  collectcommentresponsetext: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
    width: width / 1.5,
  },
  collectcommentresponsetextdist: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
    width: width / 1.6,
  },
  processingFooterImage: {
    tintColor: "#FFFFFF",
    height: height / 55,
    width: width / 8,
    marginLeft: 10,
  },
  distributionFooterImage: {
    tintColor: "#FFFFFF",
    height: height / 40,
    width: width / 17,
    marginLeft: 18,
  },
  mainFooterText: {
    color: "white",
  },
  collectmodalmainview: {
    height: height / 1.6,
    width: width / 1,
  },
  modalBackImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  processingTextLabel: {
    paddingLeft: 4,
    color: "#606060",
    top: 9,
  },
  wasteTextField: {
    color: "black",
    top: Platform.OS === 'android' ? 13 : 13,
  },
  wasteDropdownInputContainerStyle: {
    height: height / 28,
    width: width / 3,
  },
  wasteDropdownContainerStyle: {
    width: width / 5,
    justifyContent: "flex-start",
    top: Platform.OS === 'android' ? 10 : 12,
    height: height / 13,
  },
  wasteDropdownImage: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 14 : 12,
  },
  processingMainModelText: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  collectmodalselectdatetext: {
    color: "#606060",
    top: 10,
  },
  distributemodalselectdatetext: {
    color: "#606060",
    top: Platform.OS === 'android' ? 21 : 11,
  },
  collectmodalselecrdatevaluetext: {
    color: "#000000",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 19 : 19,
  },
  collectmodallocationtext: {
    color: "#606060",
    top: 7,
  },
  collectmodallocationtextinput: {
    color: "black",
    top: Platform.OS === 'ios' ? 15 : 14,
  },
  collectmodalcommenttextinput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'ios' ? 24 : 24,
  },
  collectmodalcommenttextinput1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 14 : 15,
  },
  distributemodalcommenttextinput: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'ios' ? 21 : 24,
  },
  distributemodalcommenttextinput1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 14 : 12,
  },
  reviewText: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  reviewTextLabelView: {
    flexDirection: "row",
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
  distributemodalcancelbuttonmainview: {
    height: height / 45,
    width: width / 1,
    flexDirection: "row",
  },
  distributemodalcancelbuttonsubview: {
    height: height / 17,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
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
  distributionfirstsectionstepindicatopview: {
    height: height / 12,
    width: width / 1,
    justifyContent: "center",
  },
  distributionfirstsectioninputmainview: {
    height: height / 3.5,
    alignItems: "center",
    width: width / 1,
  },
  distributionfirstsectiontotalwasteview: {
    height: height / 13,
    width: width / 2.4,
    justifyContent: "center",
    top: Platform.OS === 'android' ? -8 : 0,
  },
  distributionfirstsectionweight1textinputmainview: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionfirstsectionweight1textinputmainview1: {
    height: height / 18,
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  distributionfirstsectionweight1textinputview: {
    height: height / 18,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  distributionfirstsectionweight1textinputview1: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
  },
  distributionfirstsectionweight1textinputview2: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionfirstsectionweight1textinputview3: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  distributionsecondsectioninputmainview: {
    height: height / 4,
    width: width / 1,
  },
  distributionsecondsectioninputmainview1: {
    height: height / 4,
    alignItems: "center",
    width: width / 1,
  },
  distributionPicView: {
    height: height / 8,
    width: width / 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  distributionImageView: {
    borderRadius: 10,
    marginHorizontal: 5,
    width: 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionImageView1: {
    borderRadius: 10,
    marginHorizontal: 5,
    width: 60,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionImageText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.8),
  },
  distributionImageText1: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.4),
  },
  distributionImageText2: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.3),
  },
  distributionImageText3: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: responsiveFontSize(1.6),
  },
  venderCompostText: {
    color: "#606060",
    top: 10,
  },
  venderText: {
    color: "#606060",
    top: 8,
  },
  compostVenderTextField: {
    color: "black",
    width: "100%",
    textAlign: "center",
    top: Platform.OS === 'ios' ? 14 : 12,
  },
  compostText: {
    paddingLeft: 4,
    color: "#606060",
    top: 10,
  },
  compostValueTextField: {
    color: "black",
    top: Platform.OS === 'android' ? 14 : 14,
  },
  quantityAstring: {
    left: Platform.OS === 'android' ? "76%" : "73%",
    color: 'red',
    bottom: "6%",
    fontSize: 15,
  },
  RdfAstring: {
    left: Platform.OS === 'android' ? "63%" : "62%",
    color: 'red',
    bottom: "7%",
    fontSize: 15,
  },
  inertsAstring: {
    left: Platform.OS === 'android' ? "72%" : "68%",
    color: 'red',
    bottom: "7%",
    fontSize: 15,
  },
  compostAstring: {
    left: Platform.OS === 'android' ? "93%" : "90%",
    color: 'red',
    bottom: "2%",
    fontSize: 15,
  },
  recyclablesAstring: {
    left: Platform.OS === 'android' ? "76%" : "75%",
    color: 'red',
    bottom: "7%",
    fontSize: 15,
  },
  dateAstring: {
    color: 'red',
    left: Platform.OS === 'android' ? "49%" : "47%",
  },
  commentAstring: {
    color: 'red',
    left: Platform.OS === 'ios' ? "24.5%" : "24%",
    bottom: Platform.OS === 'android' ? "29%" : "5%",
    top: Platform.OS === 'ios' ? 1 : -11,
  },
  vendorDistributeCompostAstring: {
    left: Platform.OS === 'android' ? "57%" : "55%",
    color: 'red',
    bottom: "9%",
    fontSize: 15,
  },
  distributeCompostAstring: {
    left: Platform.OS === 'android' ? "59%" : "58%",
    color: 'red',
    bottom: "5%",
    fontSize: 15,
  },
  distributeCompostQuantity: {
    paddingLeft: 4,
    color: "#606060",
    top: 10,
  },
  vendorDistributeRdfAstring: {
    color: "#606060",
    top: 8,
  },
  vendorDistributRdfAstring: {
    left: "29%",
    color: 'red',
    bottom: "7%",
    fontSize: 15,
  },
  distributeRdfAshtring: {
    paddingLeft: 4,
    color: "#606060",
    top: 10,
  },
  vendorDistributRecyclablesAstring: {
    left: Platform.OS === 'android' ? "60%" : "58%",
    color: 'red',
    bottom: "6%",
    fontSize: 15,
  },
  distributeRecyclablesAshtring: {
    paddingLeft: 4,
    color: "#606060",
    top: 8,
  },
  vendorDistributRecyclablesQuantityAstring: {
    left: Platform.OS === 'android' ? "75%" : "72%",
    color: 'red',
    bottom: "4%",
    fontSize: 15,
  },
  distributeRecyclablesLabelAshtring: {
    paddingLeft: 10,
    color: "#606060",
    top: 10,
  },
  vendorDistributInertsVendorAstring: {
    left: Platform.OS === 'android' ? "57%" : "57%",
    color: 'red',
    bottom: "6%",
    fontSize: 15,
  },
  vendorDistributInertsQuantityAstring: {
    left: Platform.OS === 'android' ? "38%" : "38%",
    color: 'red',
    fontSize: 15,
  },
  recycleVenderName: {
    color: 'red',
    left: "10.6%",
  },
  validationMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? "9.5%" : "9.6%",
  },
  validationCommentMessageStyle: {
    color: 'red',
    right: Platform.OS === 'android' ? "19.5%" : "19.8%",
  },
  validationCompostMessageStyle: {
    color: 'red',
    right: Platform.OS === 'android' ? "10%" : "10%",
  },
  validationCompostQuantityMessageStyle: {
    color: 'red',
    right: Platform.OS === 'android' ? "14.5%" : "22%",
  },
  validationRDFQuantityMessageStyle: {
    color: 'red',
    left: "9.25%",
  },
  validationRecyclableQuantityMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? "10.5%" : "11%",
  },
  validationInertsQuantityMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? "9%" : "9.2%",
  },
});
