import {
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import "./withConnect";
import React, { useState, useEffect } from "react";
import { Images } from "../../../../Assets";
import _ from "lodash";
import Network from "../../../../Network";
import { showMessage } from "react-native-flash-message";
import ApiClient from '../../../../Network';
import withConnect from "./withConnect";
import {
  COLORS,
  FONT_FAMILIES,
  METRICS,
} from "../../../../Configration";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import { Dropdown } from "react-native-material-dropdown-v2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import StepIndicator from "react-native-step-indicator";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { ActionType } from '../../../../Redux/Type';
import { VALIDATE_FORM } from "../../../../Constant";
const { height, width } = Dimensions.get("screen");

const { DASHBOARD_WTE_COLLECTION_DATA, DASHBOARD_WTE_DISTRIBUTION_DATA, DASHBOARD_WTE_PROCESSING_DATA } = ActionType;
const Footer = (props: any) => {
  const { user } = props;
  const currentPosition = 1;
  const currentPosition1 = 2;
  const currentPosition2 = 3;
  const email = user.email;
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
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [isSelected, setSelected] = useState(0);
  const [wteuser, setWteUser] = useState({
    location: city, quantitymeasure: 'MT', quantitymeasure1: 'MT', quantitymeasure2: 'MT', quantitymeasure3: 'TPD',
    quantitymeasure4: 'MW', quantitymeasure5: 'MW', quantitymeasure6: 'MW', quantitymeasure7: 'KWH',
    siteName: siteName, rdf: "", combusted: "", ash: "", steam: "", power: "", powerexport: "", comment: "",
  });
  const [auxilary, setAuxilary] = useState("");
  const [receiptValidationMessage, setReceiptValidationMessage] = useState(false);
  const [combustedValidationMessage, setCombustedValidationMessage] = useState(false);
  const [ashValidationMessage, setAshValidationMessage] = useState(false);
  const [streamValidationMessage, setSteamValidationMessage] = useState(false);
  const [producedValidationMessage, setProducedValidationMessage] = useState(false);
  const [exportValidationMessage, setExportValidationMessage] = useState(false);
  const [commentValidationMessage, setCommentValidationMessage] = useState(false);
  const data = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const data2 = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  // *******************Validation Method********************************
  const validationWTE = () => {
    if (_.isEmpty(wteuser.rdf.trim())) {
      setReceiptValidationMessage(true);
      initialController();
      return false;
    } else if (_.isEmpty(wteuser.combusted.trim())) {
      setCombustedValidationMessage(true);
      initialController();
      return false;
    } else if (_.isEmpty(wteuser.ash.trim())) {
      setAshValidationMessage(true);
      initialController();
      return false;
    } else if (_.isEmpty(wteuser.steam.trim())) {
      setSteamValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(wteuser.power.trim())) {
      setProducedValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(wteuser.powerexport.trim())) {
      setExportValidationMessage(true);
      initialController1();
      return false;
    } else if (_.isEmpty(wteuser.comment.trim())) {
      setCommentValidationMessage(true);
      initialController2();
      return false;
    }
    return true;
  };
  const wteSaveValidation = () => {
    if (validationWTE()) {
      setShowModal1(false);
      wteDataSave();
      clearWteData();
      initialController();
    }
  };
  // ****************************WTE Subtract Method**********************
  const addTogether = () => {
    {/* @ts-ignore */ }
    const result = wteuser?.power && wteuser?.powerexport ? wteuser?.power - wteuser?.powerexport : "Weight";
    {/* @ts-ignore */ }
    let roundOff = typeof result === "string" ? result : parseFloat(result).toFixed(2).replace(".00", " ");
    setAuxilary(roundOff);
  };
  // *******************Date Selection Method For WTE*****************
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(date);
    //  @ts-ignore 
    setWteUser({ ...wteuser, date });
    hideDatePicker();
  };
  //**********************UseEffect***************************
  useEffect(() => {
    addTogether();
  }, [wteuser]);
  // **********************Modal Going Next Page*******************
  const processStepsController = () => {
    setSelected(isSelected + 1);
  };
  // **********************Modal Going Previous Page*******************
  const processStepsBackController = () => {
    setSelected(isSelected - 1);
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController = () => {
    setSelected(0);
  };
  // ********************************Modal Redirect To Blank Field********************
  const initialController1 = () => {
    setSelected(1);
  };
  const initialController2 = () => {
    setSelected(2);
  };
  // ***********************WTE GET API's******************
  const getProcessingApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().getrdfprocessing(params);
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
          var rdfReceipt = 0;
          filterDateArr.forEach(item => {
            rdfReceipt = rdfReceipt + item.rdfReceipt ?? 0;
          });
          {/* @ts-ignore */ }
          displayArr.push({ splitDate: element, rdfReceipt });
        });
      }
      // @ts-ignore 
      dispatch({ type: DASHBOARD_WTE_COLLECTION_DATA, payload: displayArr });
    }
  };

  const getCollectionApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().getashprocessing(params);
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
          var ashGenerated = 0;
          filterDateArr.forEach(item => {
            ashGenerated = ashGenerated + item.ashGenerated ?? 0;
          });
          {/* @ts-ignore */ }
          displayArr.push({ splitDate: element, ashGenerated });
        });
      }
      {/* @ts-ignore */ }
      dispatch({ type: DASHBOARD_WTE_DISTRIBUTION_DATA, payload: displayArr });
    }
  };

  const getWteEnergyApi = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().getwteenergygenerated(params);
    {/* @ts-ignore */ }
    if (result.status && result.data.status === true) {
      // c(result.data.data)
      {/* @ts-ignore */ }
      if ((result?.data?.data ?? []).length > 0) {
        {/* @ts-ignore */ }
        const arr = (result?.data?.data ?? []);
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
          var steamGeneration = 0;
          var powerProduced = 0;
          var powerExport = 0;
          var auxiliaryConsumption = 0;
          filterDateArr.forEach(item => {
            steamGeneration = steamGeneration + item.steamGeneration ?? 0;
            powerProduced = powerProduced + item.powerProduction ?? 0;
            powerExport = powerExport + item.powerExport ?? 0;
            auxiliaryConsumption = auxiliaryConsumption + item.auxiliaryConsumption ?? 0;
          });
          {/* @ts-ignore */ }
          displayArr.push({ splitDate: element, steamGeneration, powerProduced, powerExport, auxiliaryConsumption });
        });
      }
      // @ts-ignore 
      dispatch({ type: DASHBOARD_WTE_PROCESSING_DATA, payload: displayArr });
    }
  };
  // ***********************WTE Save API******************
  const wteDataSave = async () => {
    {/* @ts-ignore */ }
    var time = (moment(wteuser?.date).format(`YYYY-MM-DD`));
    var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
    var dateTime1 = time + " " + dateTime;
    const body = {
      // @ts-ignore 
      rdfReceipt: wteuser?.rdf + " " + (wteuser?.quantitymeasure),
      // @ts-ignore 
      rdfCombusted: wteuser?.combusted + " " + (wteuser?.quantitymeasure1),
      // @ts-ignore 
      ashGenerated: wteuser?.ash + " " + (wteuser?.quantitymeasure2),
      // @ts-ignore 
      steamGeneration: wteuser?.steam + " " + (wteuser?.quantitymeasure3),
      // @ts-ignore 
      powerProduced: wteuser?.power + " " + (wteuser?.quantitymeasure4),
      // @ts-ignore 
      powerExport: wteuser?.powerexport + " " + (wteuser?.quantitymeasure5),
      auxiliaryConsumption: auxilary + " " + (wteuser?.quantitymeasure6),
      date: dateTime1,
      location: wteuser?.location,
      siteName: [{ siteName: wteuser?.siteName }],
      userEmail: email,
      // @ts-ignore 
      comments: wteuser?.comment,
    };
    const result = await Network.createApiClient().postwtesavesorting(body);
    // @ts-ignore 
    if (result.data && result.data.status === true) {
      // @ts-ignore 
      showMessage({ message: result.data.message, type: "success" });
      timeOut = setTimeout(getProcessingApi, 200);
      getCollectionApi();
      getWteEnergyApi();
    } else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Clear Modal Data On Cancel And Submission******************
  const clearWteData = () => {
    setWteUser({
      ...wteuser, rdf: "", combusted: "", ash: "",
      // @ts-ignore
      steam: "", power: "", powerexport: "", currentload: "", currentexport: "", comment: "", quantitymeasure: 'MT', quantitymeasure1: 'MT', quantitymeasure2: "MT",
      quantitymeasure3: 'TPD', quantitymeasure4: "MW", quantitymeasure5: "MW", quantitymeasure6: "MW",
    });
    // @ts-ignore 
    setDate(null);
    setReceiptValidationMessage(false);
    setCombustedValidationMessage(false);
    setAshValidationMessage(false);
    setSteamValidationMessage(false);
    setProducedValidationMessage(false);
    setExportValidationMessage(false);
    setCommentValidationMessage(false);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => setShowModal1(!showModal1)}>
        <View style={styles.SecondiconView}>

          <Image
            source={Images.energy}
            style={styles.mainFooterImage}
          />
          <Text style={styles.mainFooterText}>WTE</Text>
        </View>
      </TouchableOpacity>

      {/*  Waste of Energy ....... Modal */}
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
                style={styles.newview1}
              >
                <View>
                  {isSelected == 0 &&
                    <View
                      style={styles.sheeet}
                    >
                      <TouchableOpacity onPress={() => { setShowModal1(false), clearWteData(), initialController(); }}>
                        <View style={styles.sheeet1}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected >= 1 ? (
                        <View
                          style={styles.sheeet2}
                        >
                          <View
                            style={styles.sheeet3}
                          >
                            <TouchableOpacity onPress={() => setShowModal1(false)}>
                              <Image
                                source={Images.back1}
                                style={styles.sheeet4}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={styles.sheeet5}
                          >
                            <Text
                              style={styles.sheeet7}
                            >
                              Waste To Energy
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={styles.sheeet2}
                        >
                          <View
                            style={styles.sheeet3}
                          >
                            <TouchableOpacity onPress={() => { setShowModal1(false), clearWteData(); }}>
                              <Image
                                source={Images.back1}
                                style={styles.sheeet4}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={styles.sheeet5}
                          >
                            <Text
                              style={styles.sheeet7}
                            >
                              Waste To Energy
                            </Text>
                          </View>
                        </View>
                      )}

                      <View
                        style={styles.sheeet6}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition}
                          stepCount={3}
                        />
                      </View>

                      <View style={styles.newview2}>
                        <View
                          style={styles.sheeet8}
                        >
                          <View
                            style={styles.sheeet9}
                          >
                            <Text style={[styles.newtext1, { top: 10 }]}>
                              RDF Receipt
                              <Text style={styles.receiptAstring}>*</Text>
                            </Text>
                          </View>

                          <View
                            style={styles.sheeet10}
                          >
                            <View
                              style={styles.sheeet11}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.newinput3}
                                placeholder="Weight"
                                value={wteuser?.rdf ?? ""}
                                onChangeText={(text) => {
                                  setReceiptValidationMessage(false);
                                  setWteUser({ ...wteuser, rdf: text });
                                }}
                              ></TextInput>
                            </View>
                          </View>

                          <View style={styles.collectfirstsectiondropdownmainview}>
                            <View style={styles.collectfirstsectiondropdownview}>
                              <Dropdown
                                placeholder="MW"
                                data={data}
                                value={wteuser?.quantitymeasure ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure: text,
                                  })
                                }
                                underlineColor="transparent"
                                inputContainerStyle={styles.newinput1}
                                containerStyle={styles.newview3}
                              />
                              <Image
                                source={Images.footerDropdown}
                                style={styles.newimg1}
                              />
                            </View>
                          </View>
                        </View>
                        {receiptValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.WTERECEIPT}</Text>}
                        <View
                          style={styles.sheeet14}
                        >
                          <View
                            style={styles.sheeet15}
                          >
                            <Text style={[styles.newtext1, { top: 10 }]}>
                              RDF Combusted
                              <Text style={styles.combustedAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.sheeet16}
                          >
                            <View
                              style={styles.sheeet18}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.newinput3}
                                placeholder="Weight"
                                value={wteuser?.combusted ?? ""}
                                onChangeText={(text) => {
                                  setCombustedValidationMessage(false);
                                  setWteUser({
                                    ...wteuser,
                                    combusted: text,
                                  });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                          <View
                            style={styles.newview4}
                          >
                            <View
                              style={styles.sheeet19}
                            >
                              <Dropdown
                                placeholder="MT"
                                value={wteuser?.quantitymeasure1 ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure1: text,
                                  })
                                }

                                underlineColor="transparent"
                                inputContainerStyle={styles.newinput1}
                                containerStyle={styles.newview5}
                              />
                            </View>
                          </View>
                        </View>
                        {combustedValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.WTECOMBUSTED}</Text>}
                        <View
                          style={styles.sheeet21}
                        >
                          <View
                            style={styles.sheeet22}
                          >
                            <Text style={styles.newtext11}>
                              Ash Generated
                              <Text style={styles.ashAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.sheeet23}
                          >
                            <View
                              style={styles.sheeet25}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.newinput3}
                                placeholder="Weight"
                                value={wteuser?.ash ?? ""}
                                onChangeText={(text) => {
                                  setAshValidationMessage(false);
                                  setWteUser({
                                    ...wteuser,
                                    ash: text,
                                  });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                          <View
                            style={styles.newview11}
                          >
                            <View
                              style={styles.sheeet26}
                            >
                              <Dropdown
                                placeholder="MW"
                                data={data2}
                                value={wteuser?.quantitymeasure2 ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure2: text,
                                  })
                                }
                                underlineColor="transparent"
                                inputContainerStyle={styles.newinput4}
                                containerStyle={styles.newview7}
                              />
                              <Image
                                source={Images.footerDropdown}
                                style={styles.sheeet13}
                              />
                            </View>
                          </View>
                        </View>
                        {ashValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.WTEASH}</Text>}
                      </View>
                    </View>
                  }
                  {isSelected == 1 &&
                    <View
                      style={styles.newview8}
                    >
                      <TouchableOpacity onPress={() => { setShowModal1(false), clearWteData(), initialController(); }}>
                        <View style={styles.newview9}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected >= 1 ? (
                        <View
                          style={styles.newview12}
                        >
                          <View
                            style={styles.newview13}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController()}>
                              <Image
                                source={Images.back1}
                                style={styles.newimg2}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => setShowModal1(false)}>
                            <View
                              style={styles.newview14}
                            >
                              <Text
                                style={styles.newtext4}
                              >
                                Waste To Energy
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
                            <ModalHeader title={"Waste To Energy"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={styles.sheeet6}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition1}
                          stepCount={3}
                        />
                      </View>
                      <View
                        style={styles.newview2}
                      >
                        <View
                          style={styles.sheeet8}
                        >
                          <View
                            style={styles.sheeet9}
                          >
                            <Text style={[styles.newtext1, { top: 10 }]}>
                              Steam Generation
                              <Text style={styles.steamAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.sheeet16}
                          >
                            <View
                              style={styles.sheeet18}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.newinput3}
                                placeholder="Weight"
                                value={wteuser?.steam ?? ""}
                                onChangeText={(text) => {
                                  setSteamValidationMessage(false);
                                  setWteUser({
                                    ...wteuser,
                                    steam: text,
                                  });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                          <View
                            style={styles.newview11}
                          >
                            <View
                              pointerEvents="none"
                              style={styles.sheeet26}
                            >
                              <Dropdown
                                placeholder="TPD"
                                value={wteuser?.quantitymeasure3 ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure3: text,
                                  })
                                }
                                underlineColor="transparent"
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.inputContainerStyle}
                              />
                            </View>
                          </View>
                        </View>
                        {streamValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.STEAM}</Text>}
                        <View
                          style={styles.sheeet8}
                        >
                          <View
                            style={styles.sheeet9}
                          >
                            <Text style={[styles.newtext1, { top: 10 }]}>
                              Power Produced
                              <Text style={styles.producedAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.sheeet16}
                          >
                            <View
                              style={styles.sheeet18}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.newinput3}
                                placeholder="Weight"
                                value={wteuser?.power ?? ""}
                                onChangeText={(text) => {
                                  setProducedValidationMessage(false);
                                  setWteUser({
                                    ...wteuser,
                                    power: text,
                                  });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                          <View
                            style={styles.newview11}
                          >
                            <View
                              pointerEvents="none"
                              style={styles.sheeet26}
                            >
                              <Dropdown
                                placeholder="KWH"
                                value={wteuser?.quantitymeasure4 ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure4: text,
                                  })
                                }
                                underlineColor="transparent"
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.inputContainerStyle}
                              />
                            </View>
                          </View>
                        </View>
                        {producedValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PRODUCED}</Text>}
                        <View
                          style={styles.sheeet8}
                        >
                          <View
                            style={styles.sheeet9}
                          >
                            <Text style={[styles.newtext1, { top: 10 }]}>
                              Power Export
                              <Text style={styles.exportAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.sheeet16}
                          >
                            <View
                              style={styles.sheeet18}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                keyboardType="number-pad"
                                style={styles.newinput3}
                                placeholder="Weight"
                                value={wteuser?.powerexport ?? ""}
                                onChangeText={(text) => {
                                  setExportValidationMessage(false);
                                  setWteUser({
                                    ...wteuser,
                                    powerexport: text,
                                  });
                                }}
                              ></TextInput>
                            </View>
                          </View>
                          <View
                            style={styles.newview11}
                          >
                            <View
                              pointerEvents="none"
                              style={styles.sheeet26}
                            >
                              <Dropdown
                                placeholder="KWH"
                                value={wteuser?.quantitymeasure5 ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure5: text,
                                  })
                                }
                                underlineColor="transparent"
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.inputContainerStyle}
                              />
                            </View>
                          </View>
                        </View>
                        {exportValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.EXPORT}</Text>}
                        <View
                          style={styles.sheeet8}
                        >
                          <View
                            style={styles.sheeet9}
                          >
                            <Text style={[styles.newtext1, { top: 10 }]}>
                              Auxiliary Consumption
                              <Text style={styles.auxiliaryAstring}>*</Text>
                            </Text>

                          </View>
                          <View
                            style={styles.sheeet16}
                          >
                            {
                              Platform.OS === 'ios' ?
                                <View style={styles.auxiliaryIosView}>
                                  <Text style={styles.auxiliaryText} >{auxilary}</Text>
                                </View>
                                :
                                <View style={styles.auxiliaryView}>
                                  <Text style={styles.auxiliaryText} >{auxilary}</Text>
                                </View>
                            }
                          </View>
                          <View
                            style={styles.newview11}
                          >
                            <View
                              pointerEvents="none"
                              style={styles.sheeet26}
                            >
                              <Dropdown
                                placeholder="KWH"
                                value={wteuser?.quantitymeasure6 ?? ""}
                                onChangeText={(text) =>
                                  setWteUser({
                                    ...wteuser,
                                    quantitymeasure6: text,
                                  })
                                }
                                underlineColor="transparent"
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.inputContainerStyle}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                  {isSelected == 2 &&
                    <View
                      style={styles.newview8}
                    >
                      <TouchableOpacity onPress={() => { setShowModal1(false), clearWteData(), initialController(); }}>
                        <View style={styles.newview9}>
                          <Image source={Images.closebar} />
                        </View>
                      </TouchableOpacity>
                      {isSelected >= 1 ? (
                        <View
                          style={styles.newview12}
                        >
                          <View
                            style={styles.newview13}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController()}>
                              <Image
                                source={Images.back1}
                                style={styles.newimg2}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => setShowModal1(false)}>
                            <View
                              style={styles.newview14}
                            >
                              <Text
                                style={styles.newtext4}
                              >
                                Waste To Energy
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
                            <ModalHeader title={"Waste To Energy"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={styles.sheeet6}
                      >
                        <StepIndicator
                          customStyles={customStyles}
                          currentPosition={currentPosition2}
                          stepCount={3}
                        />
                      </View>
                      <View
                        style={styles.dateView}
                      >
                        <View
                          style={styles.sheeet8}
                        >
                          <View
                            style={styles.dateView1}
                          >
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
                              <TouchableOpacity
                                onPress={showDatePicker}
                              >
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
                                  value={wteuser?.dateselection ?? ""}
                                  onChangeText={(text) =>
                                    setWteUser({
                                      ...wteuser,
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
                        <View
                          style={styles.collectsecondsectionlocationmainview}
                        >
                          <View
                            style={styles.collectsecondsectionlocationview}
                          >
                            <Text style={styles.collectmodallocationtext}>Location</Text>
                          </View>

                          <View
                            style={styles.collectsecondsectiontextinputlocationmainview}
                          >
                            <View
                              style={styles.collectsecondsectiontextinputlocationview}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                style={styles.collectmodallocationtextinput}
                                editable={false}
                                value={wteuser?.location ?? ""}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        <View
                          style={styles.collectsecondsectionlocationmainview}
                        >
                          <View
                            style={styles.collectsecondsectionlocationview}
                          >
                            <Text style={styles.collectmodallocationtext}>Site Name</Text>
                          </View>

                          <View
                            style={styles.collectsecondsectiontextinputlocationmainview}
                          >
                            <View
                              style={styles.collectsecondsectiontextinputlocationview1}
                            >
                              <TextInput
                                placeholderTextColor={"#000000"}
                                style={[styles.collectmodallocationtextinput, { fontSize: responsiveFontSize(1.6) }]}
                                editable={false}
                                value={wteuser?.siteName ?? ""}
                              ></TextInput>
                            </View>
                          </View>
                        </View>
                        <View
                          style={styles.commentView}
                        >
                          <TextInput
                            style={!wteuser.comment ? styles.commentTextField : styles.commentTextField1}
                            placeholder={"Comments"}
                            placeholderTextColor={COLORS.BLACK}
                            keyboardType="email-address"
                            selectionColor={COLORS.BLACK}
                            value={wteuser?.comment ?? ""}
                            onChangeText={(text) => {
                              setCommentValidationMessage(false);
                              setWteUser({ ...wteuser, comment: text });
                            }}
                          />
                          {!wteuser.comment && <Text style={styles.commentAstring}>*</Text>}
                        </View>
                        {commentValidationMessage && <Text style={styles.validationCommentMessageStyle}>{VALIDATE_FORM.WTECOMMENT}</Text>}
                      </View>
                    </View>
                  }
                </View>
                <View>
                  {isSelected == 3 &&
                    <View
                      style={styles.newview8}
                    >
                      <View style={styles.newview9}>
                        <TouchableOpacity onPress={() => { setShowModal1(false), initialController(), clearWteData(); }}>
                          <View style={styles.sheeet1}>
                            <Image source={Images.closebar} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      {isSelected >= 1 ? (
                        <View
                          style={styles.newview12}
                        >
                          <View
                            style={styles.newview13}
                          >
                            <TouchableOpacity onPress={() => processStepsBackController()}>
                              <Image
                                source={Images.back1}
                                style={styles.newimg2}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={styles.newview14}
                          >
                            <Text
                              style={styles.newtext4}
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
                            <ModalHeader title={"Review"} isRightAction={true} />
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={styles.collectthirdsectionmainflatlistview}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                          <View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>RDF Receipt - </Text>
                              <Text style={styles.receiptText}> {wteuser?.rdf}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure}
                              </Text>
                            </View>

                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>RDF Combusted - </Text>
                              <Text style={styles.receiptText}> {wteuser?.combusted}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure1}
                              </Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Total Ash Generated - </Text>
                              <Text style={styles.receiptText}> {wteuser?.ash}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure2}
                              </Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Steam Generated - </Text>
                              <Text style={styles.receiptText}> {wteuser?.steam}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure3}
                              </Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Power Produced - </Text>
                              <Text style={styles.receiptText}> {wteuser?.power}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure4}
                              </Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Power Export - </Text>
                              <Text style={styles.receiptText}> {wteuser?.powerexport}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure5}
                              </Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Auxiliary Consumption- </Text>
                              <Text style={styles.receiptText}> {auxilary}</Text>
                              <Text style={styles.receiptQuantityMeasure}>
                                {wteuser?.quantitymeasure6}
                              </Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Date & Time - </Text>
                              {/* @ts-ignore */}
                              <Text style={styles.receiptText}>{(moment(wteuser?.date).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}</Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Site Name - </Text>
                              <Text style={styles.receiptText}> {wteuser?.siteName}</Text>
                            </View>
                            <View style={styles.receiptView}>
                              <Text style={styles.receiptText}>Comments - </Text>
                              <Text style={styles.receiptTextcomm}>
                                {wteuser?.comment}</Text>
                            </View>
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  }
                </View>
                <View
                  style={styles.collectmodalsecondpagemaineview}
                >
                  {isSelected < 3 ? (
                    <TouchableOpacity
                      style={styles.collectmodalsecondpageTouchable}
                      onPress={() => {
                        processStepsController();
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
                        <TouchableOpacity onPress={() => {
                          setShowModal1(false),
                            clearWteData(),
                            initialController();
                        }}>
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
                        <TouchableOpacity onPress={() => {
                          wteSaveValidation();
                        }}>
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
    height: height / 14,
  },
  firsticonView: {
    height: height / 14,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondiconView: {
    height: height / 14,
    backgroundColor: "red",
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
  sheeet: {
    height: height / 1.65,
    width: width / 1,
  },
  sheeet1: {
    height: height / 22,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sheeet2: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  sheeet3: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sheeet4: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: "black",
  },
  sheeet5: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  sheeet6: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
  },
  sheeet7: {
    fontSize: 17,
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  sheeet8: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  sheeet9: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
  },
  sheeet10: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  sheeet11: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  sheeet12: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  sheeet13: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 15 : 13,
  },
  sheeet14: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  sheeet15: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 6 : 0,
  },
  sheeet16: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  sheeet18: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  auxiliaryView: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  auxiliaryIosView: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: 'center',
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  sheeet19: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
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
  sheeet21: {
    height: height / 15,
    justifyContent: "center",
    width: width / 1,
    flexDirection: "row",
  },
  sheeet22: {
    height: height / 15,
    width: width / 3.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 4 : 0,
  },
  sheeet23: {
    height: height / 15,
    width: width / 3.49,
    justifyContent: "center",
    alignItems: "center",
  },
  sheeet25: {
    height: height / 18,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  sheeet26: {
    height: height / 19,
    width: width / 3.9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
  sheeet27: {
    tintColor: "gray",
    height: height / 50,
    width: width / 28,
    alignSelf: "center",
    marginBottom: 8,
  },
  item: {
    width: width / 1.2,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 23,
  },
  newview1: {
    height: height / 1.6,
    width: width / 1,
  },
  newview2: {
    height: height / 3,
    width: width / 1,
  },
  newtext1: {
    paddingLeft: 4,
    color: "#606060",
    top: 9,
  },
  newinput1: {
    height: height / 28,
    width: width / 3,
  },
  newview3: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
    top: Platform.OS === 'ios' ? 12 : 12,
  },
  newimg1: {
    top: Platform.OS === 'ios' ? 14 : 13,
    // marginTop: Platform.OS==='ios'?10,
    justifyContent: "center",
  },
  newinput3: {
    color: "black",
    top: 13,
  },
  newview4: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  newview5: {
    width: width / 4.2,
    justifyContent: "flex-start",
    height: height / 13,
    top: Platform.OS === 'ios' ? 12 : 10,
  },
  newtext11: { paddingLeft: 4.5, color: "#606060", top: 10 },
  newview11: {
    height: height / 15,
    width: width / 3.8,
    justifyContent: "center",
  },
  newinput4: {
    height: height / 28,
    width: width / 3,
  },
  newview7: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
    top: Platform.OS === 'ios' ? 12 : 12,
  },
  newview8: {
    height: height / 1.65,
    width: width / 1,
  },
  newview9: {
    height: height / 22, width: width / 1,
    alignItems: "center", justifyContent: "center",
  },
  newview12: {
    height: height / 11.4,
    width: width / 1,
    flexDirection: "row",
    alignItems: "center",
  },
  newview13: {
    height: height / 11.4,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  newimg2: {
    height: 30, width: 30, resizeMode: 'contain',
    tintColor: "black",
  },
  newview14: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  newtext4: {
    fontSize: 17,
    fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  mainFooterImage: {
    tintColor: "#FFFFFF",
    height: height / 45,
    width: width / 18,
    justifyContent: "center",
    alignSelf: "center",
  },
  mainFooterText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    height: height / 28,
    width: width / 3,
  },
  inputContainerStyle: {
    top: Platform.OS === 'ios' ? 12 : 12,
    height: height / 13,
  },
  auxiliaryText: {
    color: "black",
    paddingLeft: Platform.OS === "ios" ? "5%" : "23%",
    top: 13,
  },
  dateView: {
    height: height / 6,
    width: width / 1,
    alignItems: "center",
  },
  dateView1: {
    height: height / 13,
    width: width / 2.5,
    justifyContent: "center",
    top: Platform.OS === 'ios' ? 5 : 0,
  },
  dateText: {
    color: "#606060",
    top: 10,
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
  collectmodalselecrdatevaluetext: {
    color: "#000000",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 18 : 18,
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
  collectmodallocationtext: {
    color: "#606060",
    top: 7,
  },
  collectmodallocationtextinput: {
    color: "black",
    top: Platform.OS === 'ios' ? 15 : 14,
  },
  collectsecondsectiontextinputlocationview1: {
    height: height / 18,
    width: width / 2.2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.7,
  },
  commentView: {
    height: height / 13,
    width: width / 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
    borderBottomWidth: 0.7,
    top: -15,
  },
  commentTextField: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'ios' ? 33 : 33,
  },
  commentTextField1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'ios' ? 24 : 24,
  },
  collectthirdsectionmainflatlistview: {
    height: height / 2.2,
    width: width / 1,
  },
  receiptView: {
    marginLeft: 30,
    marginTop: 10,
    flexDirection: "row",
  },
  receiptText: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "400",
  },
  receiptTextcomm: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "400",
    width: width / 0.2,
  },
  receiptQuantityMeasure: {
    marginLeft: 10,
    color: "#000000",
    fontWeight: "600",
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
  receiptAstring: {
    left: Platform.OS === 'android' ? "78%" : "77%",
    color: 'red',
    bottom: "6%",
    fontSize: 15,
  },
  combustedAstring: {
    left: Platform.OS === 'android' ? "74%" : "100%",
    color: 'red',
    bottom: "6%",
    fontSize: 15,
  },
  ashAstring: {
    left: Platform.OS === 'android' ? "93%" : "93%",
    color: 'red',
    bottom: "7%",
    fontSize: 15,
  },
  steamAstring: {
    left: Platform.OS === 'android' ? "69%" : "69%",
    color: 'red',
    bottom: "2%",
    fontSize: 15,
  },
  producedAstring: {
    left: Platform.OS === 'android' ? "62%" : "100%",
    color: 'red',
    bottom: "7%",
    fontSize: 15,
  },
  exportAstring: {
    left: Platform.OS === 'android' ? "85%" : "83%",
    color: 'red',
    bottom: "4%",
    fontSize: 15,
  },
  auxiliaryAstring: {
    left: Platform.OS === 'android' ? "85%" : "83%",
    color: 'red',
    bottom: "4%",
    fontSize: 15,
  },
  dateAstring: {
    left: Platform.OS === 'android' ? "49%" : "49%",
    color: 'red',
    bottom: "9%",
    fontSize: 15,
  },
  commentAstring: {
    left: Platform.OS === 'ios' ? "24.3%" : "24%",
    color: 'red',
    bottom: Platform.OS === 'android' ? "10%" : "-10%",
    fontSize: 15,
    top: Platform.OS === 'ios' ? 14 : -3,
  },
  validationMessageStyle: {
    color: 'red',
    left: Platform.OS === 'android' ? "9%" : "9.5%",
  },
  validationCommentMessageStyle: {
    color: 'red',
    right: Platform.OS === 'android' ? "20%" : "19.5%",
    bottom: Platform.OS === 'android' ? 0 : "7%",
  },
});
