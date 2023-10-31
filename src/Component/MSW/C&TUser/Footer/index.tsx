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
import "./withConnect";
import React, { useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from "../../../../Assets";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";
import StepIndicator from "react-native-step-indicator";
import { Dropdown } from "react-native-material-dropdown-v2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from "lodash";
import Network from "../../../../Network";
import { showMessage } from "react-native-flash-message";
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
const { height, width } = Dimensions.get("screen");
const { DASHBOARD_DATA } = ActionType;

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
  const city = user.cities[0].city;
  let timeOut;
  const siteName = user.siteName[0].siteName;
  const email = user.email;
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const currentPosition = 1;
  const currentPosition1 = 2;
  const [isSelected, setSelected] = useState(0);
  const [collectwaste, setCollectedWaste] = useState({
    waste: 'MSW', location: city,
    quantitymeasure: 'MT', siteName: siteName, quantity: "", comment: "",
  });
  const data = [
    { label: "MT", value: "MT" },
    { label: "KG", value: "KG" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [quantityValidationMessage, setQuantityValidationMessage] = useState(false);
  const [commentValidationMessage, setCommentValidationMessage] = useState(false);
  // *******************Validation Method********************************
  const validationCollect = () => {
    if (_.isEmpty(collectwaste.quantity.trim())) {
      setQuantityValidationMessage(true);
      initialController();
      return false;
    } else if (_.isEmpty(collectwaste.comment.trim())) {
      setCommentValidationMessage(true);
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
  // ***********************Collect GET API******************
  const getCollectionData = async () => {
    const params = { siteName: siteName };
    const result = await ApiClient.createApiClient().getcollectionct(params);
    console.log("Result", result);
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
      dispatch({ type: DASHBOARD_DATA, payload: displayArr });
    }
  };
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
      location: collectwaste?.location,
      siteName: [{ siteName: collectwaste?.siteName }],
      userEmail: email,
      // @ts-ignore
      comments: collectwaste?.comment,
    };
    const result = await Network.createApiClient().postmswsavecollectct(body);
    // @ts-ignore
    if (result.data && result.data.status === true) {
      // @ts-ignore
      showMessage({ message: result.data.message, type: "success" });
      timeOut = setTimeout(getCollectionData, 200);
    }
    else {
      showMessage({ message: "Data already exist for the selected Date", type: "danger" });
    }
  };
  // ***********************Clear Modal Data On Cancel And Submission******************
  const clearCollectData = () => {
    setCollectedWaste({ ...collectwaste, quantity: "", comment: "", quantitymeasure: "MT" });
    // @ts-ignore
    setDate(null);
    setQuantityValidationMessage(false);
    setCommentValidationMessage(false);
  };
  // **********************Collect Modal Going Next Page*******************
  const processStepsController = () => {
    setSelected(isSelected + 1);
  };
  // **********************Processing Distribute Modal Going Next Page*******************
  const processStepsBackController = () => {
    setSelected(isSelected - 1);
  };
  // ********************************Modal Starting From 0 Index Method***************
  const initialController = () => {
    setSelected(0);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.firsticonView} >
        </View>
      </View>
      <View >
        <View style={styles.SecondiconView} >
          <TouchableOpacity onPress={() =>
            setShowModal(!showModal)
          }>
            <Image
              source={Images.collect}
              style={styles.collectFooterImage}
            />
            <Text style={styles.collectFooterText}>Collect</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ThirdiconView}>
      </View>

      {/* Collect......Modal */}
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
              <View style={styles.collectModalMainView}>
                {isSelected == 0 && <View style={styles.collectfirstsectionmainview}>
                  <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
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
                    <View style={styles.collectmodaltouchablemainview}>
                      <View style={styles.collectmodaltouchablesubview}>
                        <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
                          <Image
                            source={Images.back1}
                            style={styles.modalBackImage}
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
                        <Text style={styles.wasteText}>Waste Type</Text>
                      </View>
                      <View style={styles.collectfirstsectionwastemainview}>
                        <KeyboardAwareScrollView enableOnAndroid={true}>
                          <View style={styles.collectfirstsectionwasteview}>
                            <TextInput
                              style={styles.wasteTextField}
                              editable={false}
                              value={collectwaste?.waste ?? ""}
                            />
                          </View>
                        </KeyboardAwareScrollView>
                      </View>
                    </View>
                    <View style={styles.collectfirstsectionquantitymainview}>
                      <View style={styles.collectfirstsectionquantityview}>
                        <Text style={styles.quantityText}>Quantity
                          <Text style={styles.quantityAstring}>*</Text>
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
                              setQuantityValidationMessage(false);
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
                            inputContainerStyle={styles.qunatityInputContainerStyle}
                            containerStyle={styles.qunatityContainerStyle}
                          />
                          <Image
                            source={Images.footerDropdown}
                            style={styles.quantityDropdownImage}
                          />
                        </View>
                      </View>
                    </View>
                    {quantityValidationMessage && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.MSWCTQUANTITY}</Text>}
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
                            style={styles.modalBackImage}
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
                        <Text style={styles.selectDateText}>Select Date
                          <Text style={styles.dateAstring}>*</Text>
                        </Text>
                      </View>
                      <View style={styles.collectsecondsectiondatepickermainview}>
                        <View style={styles.collectsecondsectiondatepickerview}>
                          <TouchableOpacity onPress={showDatePicker}>
                            <Text style={styles.selectDateTextPicker}>{date ? moment(date).format("DD-MM-YYYY") : "Select Date"}</Text>
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
                        <Text style={styles.locationText}>Location</Text>
                      </View>
                      <View style={styles.collectsecondsectiontextinputlocationmainview}>
                        <View style={styles.collectsecondsectiontextinputlocationview}>
                          <TextInput
                            placeholderTextColor={"#000000"}
                            style={styles.locationTextField}
                            editable={false}
                            value={collectwaste?.location ?? ""}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.collectsecondsectionlocationmainview}>
                      <View style={styles.collectsecondsectionlocationview}>
                        <Text style={styles.locationText}>Site Name</Text>
                      </View>
                      <View style={styles.collectsecondsectiontextinputlocationmainview}>
                        <View style={styles.collectsecondsectiontextinputlocationview1}>
                          <TextInput
                            placeholderTextColor={"#000000"}
                            style={[styles.locationTextField, { fontSize: responsiveFontSize(1.6) }]}
                            editable={false}
                            value={collectwaste?.siteName ?? ""}
                          ></TextInput>
                        </View>
                      </View>
                    </View>

                    <View style={styles.collectsecondsectioncommentview}>
                      <TextInput
                        style={!collectwaste?.comment ? styles.commentsTextField : styles.commentsTextField1}
                        placeholder={"Comments"}
                        placeholderTextColor={COLORS.BLACK}
                        keyboardType="default"
                        selectionColor={COLORS.BLACK}
                        value={collectwaste?.comment ?? ""}
                        onChangeText={(text) => {
                          setCommentValidationMessage(false);
                          setCollectedWaste({ ...collectwaste, comment: text });
                        }}
                      />
                      {!collectwaste?.comment && <Text style={styles.commentAstring}>*</Text>}
                    </View>

                    {commentValidationMessage && <Text style={styles.validationCommentMessageStyle}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                  </View>
                </View>
                }
                {isSelected == 2 && <View style={styles.collectthirdsectionmainview}>
                  <View style={styles.collectthirdsectiontopbarview}>
                    <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(), initialController(); }}>
                      <View style={styles.collectsecondsectiontopbarview}>
                        <Image source={Images.closebar} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {isSelected >= 1 ? (
                    <View style={styles.collectthirdsectionheadermainview}>
                      <View style={styles.collectthirdsectionbackimageview}>
                        <TouchableOpacity onPress={() => processStepsBackController()}>
                          <Image
                            source={Images.back1}
                            style={styles.modalBackImage}
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
                      <View>
                        <View style={styles.collectcommentview}>
                          <Text
                            style={styles.collectcommenttext}
                          >Comments - </Text>
                          <Text
                            style={styles.collectcommentresponsetext}
                          >
                            {collectwaste?.comment}
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
                  {isSelected < 2 ? (
                    <TouchableOpacity
                      style={styles.collectmodalsecondpageTouchable}
                      onPress={() => { processStepsController(); }}>
                      <Text style={styles.collectmodalsecondpagenextText}>
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
                            setShowModal(false), clearCollectData(), initialController();
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
                            {
                              collectSaveValidation();
                            }
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
    top: Platform.OS === 'ios' ? 4 : 0,
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
    top: Platform.OS === 'ios' ? 4 : 0,
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
    height: hp("5%"),
    width: wp("100%"),
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
    height: hp("5%"),
    width: wp("82%"),
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
  collectreviewmaininputview: {
    width: width / 1.18,

  },
  collectwastetypeview: {
    flexDirection: "row",
    height: height / 25,
    alignItems: "center",
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
    width: width / 1.1,
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
  collectcommentresponsetext: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    color: "#000000",
    fontWeight: "600",
    width: Platform.OS === 'ios' ? width / 1.30 : width / 1.26,
  },
  collectFooterImage: {
    tintColor: "#FFFFFF",
    height: height / 40,
    width: width / 17,
    marginLeft: 10,
  },
  collectFooterText: {
    color: "white",
  },
  collectModalMainView: {
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
  modalBackImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  collectmodalcollecttextview: {
    height: height / 11.4,
    width: width / 1.8,
    justifyContent: "center",
  },
  wasteText: {
    color: "#606060",
    top: 2,
  },
  wasteTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 14,
    fontSize: responsiveFontSize(1.9),
  },
  quantityText: {
    paddingLeft: 4,
    color: "#606060",
    top: 10,
  },
  quantityTextField: {
    color: COLORS.BLACK,
    top: Platform.OS === 'ios' ? 13 : 13,
    fontSize: responsiveFontSize(1.9),
  },
  qunatityInputContainerStyle: {
    height: height / 28,
    width: width / 3,
  },
  qunatityContainerStyle: {
    width: width / 5,
    justifyContent: "flex-start",
    height: height / 13,
    top: Platform.OS === 'ios' ? 12 : 10,
  },
  quantityDropdownImage: {
    alignSelf: "center",
    top: Platform.OS === 'ios' ? 14 : 13,
  },
  selectDateText: {
    color: "#606060",
    top: 10,
  },
  selectDateTextPicker: {
    color: "black",
    fontSize: 14,
    top: Platform.OS === 'ios' ? 18 : 17,
  },
  locationText: {
    color: "#606060",
    top: 7,
  },
  locationTextField: {
    color: "black",
    top: Platform.OS === 'ios' ? 14 : 14,
  },
  commentsTextField: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'ios' ? 21 : 21,
  },
  commentsTextField1: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    paddingLeft: 5,
    top: Platform.OS === 'android' ? 12 : 15,
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
  quantityAstring: {
    color: 'red',
    fontSize: 15,
  },
  dateAstring: {
    color: 'red',
  },
  commentAstring: {
    color: 'red',
    left: wp("20.5%"),
    bottom: hp("1.5%"),
    top: Platform.OS === 'ios' ? 0 : -11,
  },
  validationMessageStyle: {
    color: 'red',
    left: "10%",
  },
  validationCommentMessageStyle: {
    color: 'red',
    right: "20%",
  },
});
