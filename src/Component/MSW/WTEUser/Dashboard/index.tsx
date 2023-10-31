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
import withConnect from "./withConnect";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  METRICS,
} from "../../../../Configration";
// import Toast from 'react-native-simple-toast';
// import Toast from 'react-native-root-toast';
import NavHeader from "../../../../ReuableComponent/NavHeader";
import RdfReceipt from "./RdfReceipt";
import Footer from "../Footer";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import { Images } from "../../../../Assets";
import RdfCombusted from "./RdfCombusted";
import moment from "moment";
import _ from 'lodash';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from "victory-native";
import AshGenerated from "./AshGenerated";
import MonthPicker from "react-native-month-picker";
import ApiClient from '../../../../Network';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const DashboardWTE = (props: any) => {
  const { route, user, dashboardWteCollectionData, dashboardWteDistributionData, dashboardWteProcessingData } = props;
  const { params } = route;
  const location = user.siteName[0].siteName;
  const [date, setDate] = useState<any>();
  const [date1, setDate1] = useState<any>();
  const [date3, setDate3] = useState<any>();
  const [date4, setDate4] = useState<any>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [filter, setFilter] = useState("RDF Receipt");
  const [filter1, setFilter1] = useState("Date");
  const [filter2, setFilter2] = useState("Date");
  const [isSelected1, setSelected1] = useState("away");
  const [isOpen, toggleOpen] = useState(false);
  const [value1, setValue1] = useState<any>();
  const [isOpen1, toggleOpen1] = useState(false);
  const [value2, setValue2] = useState<any>();
  const [isOpen2, toggleOpen2] = useState(false);
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [value3, setValue3] = useState<any>();
  const [isOpen3, toggleOpen3] = useState(false);
  const [isOpen4, toggleOpen4] = useState(false);
  const [isOpen5, toggleOpen5] = useState(false);
  const [value4, setValue4] = useState<any>();
  const [value5, setValue5] = useState<any>();
  const [value6, setValue6] = useState<any>();
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [rdftrendvalue, setRdftrendValue] = useState([]);
  const [energygeneratedvalue, setEnergygeneratedValue] = useState([]);
  const [ashgeneratedvalue, setAshgeneratedValue] = useState([]);
  const [historyValue, setHistoryValue] = useState([]);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelected3, setSelected3] = useState("away");
  const [isSelectedd, setisSelectedd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [datetype, setDateType] = useState();
  const [datetype1, setDateType1] = useState();
  const [datarefresh, setDataRefresh] = useState(3);
  const [datarefresh1, setDataRefresh1] = useState(3);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [touch, setTouch] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refresh1, setRefresh1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [faq, setFaq] = useState([]);
  // *************************** Tab Data For Tab Selection*****************
  const [birth, setBirth] = useState([
    { name: "RDF Receipt", isSelected: true },
    { name: "RDF Combusted", isSelected: false },
    { name: "Ash Generated", isSelected: false },
  ]);
  // *************************** RDF Receipt Trend Calender Methods*****************
  const [birth1, setBirth1] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
    { name: "Year", isSelected: false },
  ]);
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
            setModalVisible(!modalVisible);
            dataFilter();
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
            setModalVisible(!modalVisible);
            dataFilter();
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
            setModalVisible(!modalVisible);
            dataFilter();
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
                          style={[styles.calenderflatlistview12, {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
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
                  onPress={() => { setModalVisible(!modalVisible), clearCollectionTrendCalender(); }}
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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
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
  const clearHistoryCalender = () => {
    setDate3(""), setDate4(""), setValue5(""), setValue6(""), setSelected3("away"),
      setBirth2([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter2("Date"), setRefresh1(true);
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
                    minDate={value4}
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
  const tabButtonSwitches3 = () => {
    if (filter2 === "Date") {
      return dateData1();
    } else if (filter2 === "Month") {
      return monthData1();
    }
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
  // *************************** Help Center Extended Method*****************
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true;
    setTouch(!touch);
  };
  // *************************** Method For Tab Selection Rendering*****************
  const tabButtonSwitches2 = () => {
    if (filter === "RDF Receipt") {
      return rdfReceiptTrendGraphUI();
    } else if (filter === "RDF Combusted") {
      return rdfCombustedTrendGraphUI();
    } else if (filter === "Ash Generated") {
      return ashGeneratedTrendGraphUI();
    }
  };
  // ************************Default Data Methods***********************************
  const loadDefaultHistory = () => {
    historyApi(moment(new Date()).subtract(6, 'days'), moment(new Date()), "date");
  };
  const loadDefaultRdfReceiptData = () => {
    rdfReceiptTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultRdfCombustedData = () => {
    rdfCombustedTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultAshGenerationData = () => {
    ashGenerationTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
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
    await loadDefaultRdfReceiptData();
    await loadDefaultRdfCombustedData();
    await loadDefaultAshGenerationData();
  };
  // ***********************API Methods******************
  // ***********************RDF Receipt Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const rdfReceiptTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", location);
    // const result = await ApiClient.createApiClient().rdfgenerationtrendgraph(payload);
    const params = {start:previousDay,end:time1,siteName:location};
    const result = await ApiClient.createApiClient().rdfgenerationtrendgraph(params);
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
          var rdfReceipt = 0;
          filterDateArr.forEach(item => {
            rdfReceipt = rdfReceipt + item.rdfReceipt ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, rdfReceipt });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setRdftrendValue(sortedData);
    }
    else {
      setRdftrendValue([]);
    }
  };
  // ***********************RDF Combusted Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const rdfCombustedTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", location);
    // const result = await ApiClient.createApiClient().energygenerationtrendgraph(payload);
    const params = {start:previousDay,end:time1,siteName:location};
    const result = await ApiClient.createApiClient().energygenerationtrendgraph(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      //  @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        const format = datetype == "Date" ? "YYYY-MM-DD" : datetype == "Month" ? "YYYY-MM" : datetype == "Year" ? "YYYY" : "YYYY-MM-DD";
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format)));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format) === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(format));
          var rdfCombusted = 0;
          filterDateArr.forEach(item => {
            rdfCombusted = rdfCombusted + item.rdfCombusted ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, rdfCombusted });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setEnergygeneratedValue(sortedData);
    }
    else {
      setEnergygeneratedValue([]);
    }
  };
  // ***********************Ash generated Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const ashGenerationTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", location);
    // const result = await ApiClient.createApiClient().ashgenerationtrendgraph(payload);
    const params = {start:previousDay,end:time1,siteName:location};
    const result = await ApiClient.createApiClient().ashgenerationtrendgraph(params);
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
          var ashGenerated = 0;
          filterDateArr.forEach(item => {
            ashGenerated = ashGenerated + item.ashGenerated ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, ashGenerated });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setAshgeneratedValue(sortedData);
    }
    else {
      setAshgeneratedValue([]);
    }
  };
  // ***********************History Download API Methods******************
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
  // ***********************History API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay = (moment(date3).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date4).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    // const payload = new FormData();
    // payload.append("start", previousDay);
    // payload.append("end", time1);
    // payload.append("siteName", location);
    // const result = await ApiClient.createApiClient().mswwtehistory(payload);
    const params = {start:previousDay,end:time1,siteName:location};
    const result = await ApiClient.createApiClient().mswwtehistory(params);
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
    // payload.append("siteName", location);
    // const result = await ApiClient.createApiClient().mswwtehistory(payload);
    const params = {start:previousDay,end:time1,siteName:location};
    const result = await ApiClient.createApiClient().mswwtehistory(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
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
  };
  // *************************** Date Month Year Selection Method on Chart*****************
  const getDateString = date => {
    return moment(date, "YYYY-MM-DD HH:mm:ss:SSS Z").format(datetype == "Date" ? "DD" : datetype == "Month" ? "MMM" : datetype == "Year" ? "YYYY" : "DD");
  };
  // ************************Max Data For Charts***********************************
  // @ts-ignore
  const maxdata = Math.max(...rdftrendvalue.map(o => o.rdfReceipt));
  // @ts-ignore
  const maxdata1 = Math.max(...energygeneratedvalue.map(o => o.rdfCombusted));
  // @ts-ignore
  const maxdata2 = Math.max(...ashgeneratedvalue.map(o => o.ashGenerated));
  // *************************************Use Effect**********************************
  // *************************************Use Effect For Max Data For Chart For Trend***********************
  useEffect(() => {
    if (maxdata >= 1000) {
      setDataRefresh(100);
    } else if (maxdata <= 10) {
      setDataRefresh(5);
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
      setDataRefresh1(5);
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
      setDataRefresh2(5);
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
  // *************************************Use Effect For All API Calender**********************************
  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        rdfReceiptTrendApi(date, date1, "date");
        rdfCombustedTrendApi(date, date1, "date");
        ashGenerationTrendApi(date, date1, "date");
      } else if (datetype == "Month") {
        rdfReceiptTrendApi(value1, value2, "month");
        rdfCombustedTrendApi(value1, value2, "month");
        ashGenerationTrendApi(value1, value2, "month");
      } else if (datetype == "Year") {
        rdfReceiptTrendApi(value3, value4, "year");
        rdfCombustedTrendApi(value3, value4, "year");
        ashGenerationTrendApi(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);
  // *************************************Use Effect For Reminder****************************************** 
  useEffect(() => {
    { user?.isNotification ? setShowModal2(true) : setShowModal2(false); }
  }, []);
  // *************************************Use Effect For Chart Refresh On Data Entry*********
  useEffect(() => {
    setCheck(true);
    setCheck1(true);
    calledApis();
  }, [dashboardWteCollectionData, dashboardWteDistributionData, dashboardWteProcessingData]);
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
  // *************************************Use Effect For Help Center And History Modal Navigation*********
  useEffect(() => {
    if ((params?.name ?? "") == "History") {
      setShowModal(true);
      loadDefaultHistory();
    } else if ((params?.name ?? "") == "Help Center") {
      setShowModal1(true);
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
          exportHistoryDataToExcelDownload(downloadHistoryData);
        } else {
          Alert.alert('Error', 'Storage Permission Not Granted');
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
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/msw_wte_history_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
          ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
          Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  // *************************** RDF Receipt Trend Rendering Methods*****************
  const rdfReceiptTrendGraphUI = () => {
    return (
      <View style={styles.SecondContainer}>
        <View style={styles.SecondcardContainer}>
          <View style={styles.SecondfirstcardmainView}>
            <View style={styles.receiptTrendView}>
              <Text style={styles.receiptTrendText}>
                RDF Receipt Trends
              </Text>
            </View>
            <View style={styles.receiptTrendView1}>
              <View style={styles.receiptTrendView2}>
                <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                  <Image
                    source={Images.calender1}
                    style={styles.receiptTrendCalenderImage}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.secondTwocardmainView}>
            {rdftrendvalue.length > 0 ? <VictoryChart
              width={width / 0.97}
              height={height / 3.5}
              theme={VictoryTheme.material}
              domainPadding={{ x: rdftrendvalue.length < 3 ? 160 : rdftrendvalue.length < 5 ? 85 : 8 }}
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
                data={rdftrendvalue}
                barWidth={8}
                x="splitDate"
                y="rdfReceipt"
              />
            </VictoryChart> : <View style={styles.detailsNotFoundView}><Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text></View>}
          </View>
          <View style={styles.secondThreecardmaibView}>
            <View style={styles.receiptTrendWeightView}>
              <Text style={styles.receiptTrendWeightText}>
                RDF Receipt in MT
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // *************************** RDF Combusted Trend Rendering Methods*****************
  const rdfCombustedTrendGraphUI = () => {
    return (
      <View style={styles.SecondContainer}>
        <View style={styles.SecondcardContainer}>
          <View style={styles.SecondfirstcardmainView}>
            <View style={styles.combustedTrendView}>
              <Text style={styles.receiptTrendText}>
                RDF Combusted Trend
              </Text>
            </View>
            <View style={styles.combustedTrendView1}>
              <View style={styles.combustedTrendView2}>
                <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                  <Image
                    source={Images.calender1}
                    style={styles.receiptTrendCalenderImage}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.secondTwocardmainView}>
            {energygeneratedvalue.length > 0 ? <VictoryChart
              width={width / 0.97}
              height={height / 3.5}
              theme={VictoryTheme.material}
              domainPadding={{ x: energygeneratedvalue.length < 3 ? 160 : energygeneratedvalue.length < 5 ? 85 : 8 }}
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
                data={energygeneratedvalue}
                barWidth={8}
                x="splitDate"
                y="rdfCombusted"
              />
            </VictoryChart> : <View style={styles.detailsNotFoundView}><Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text></View>}
          </View>
          <View style={styles.secondThreecardmaibView}>
            <View style={styles.receiptTrendWeightView}>
              <Text style={styles.receiptTrendWeightText}>
                RDF Combusted in MT
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // *************************** Ash Generated Trend Rendering Methods*****************
  const ashGeneratedTrendGraphUI = () => {
    return (
      <View style={styles.SecondContainer}>
        <View style={styles.SecondcardContainer}>
          <View style={styles.SecondfirstcardmainView}>
            <View style={styles.combustedTrendView}>
              <Text style={styles.receiptTrendText}>
                Ash Generation Trend
              </Text>
            </View>
            <View style={styles.combustedTrendView1}>
              <View style={styles.combustedTrendView2}>
                <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                  <Image
                    source={Images.calender1}
                    style={styles.receiptTrendCalenderImage}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.secondTwocardmainView}>
            {ashgeneratedvalue.length > 0 ? <VictoryChart
              width={width / 0.97}
              height={height / 3.5}
              theme={VictoryTheme.material}
              domainPadding={{ x: ashgeneratedvalue.length < 3 ? 160 : ashgeneratedvalue.length < 5 ? 85 : 8 }}
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
                data={ashgeneratedvalue}
                barWidth={8}
                x="splitDate"
                y="ashGenerated"
              />
            </VictoryChart> : <View style={styles.detailsNotFoundView}><Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text></View>}
          </View>
          <View style={styles.secondThreecardmaibView}>
            <View style={styles.receiptTrendWeightView}>
              <Text style={styles.receiptTrendWeightText}>
                Ash Generation in MT
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // *************************** Tab Selection Methods*****************
  const tabButton = (collect, distribution, processing) => {
    if (filter === "RDF Receipt") {
      return (<View style={styles.tabMainView}>
        <View>
          <View style={styles.rdfMainView}>
            <View style={styles.rdfDateView}>
              <Text style={styles.rdfText}>Date</Text>
            </View>
            <View style={styles.rdfView}>
            </View>
            <View style={styles.rdfView}>
            </View>
            <View style={styles.rdfWeightView}>
              <Text style={styles.rdfText}>Weight(MT)</Text>
            </View>
          </View>
        </View>
        {/* @ts-ignore */}
        <RdfReceipt collect={collect} />
      </View>);
    } else if (filter === "RDF Combusted") {
      return (<View style={styles.tabMainView}>
        <View>
          <View style={styles.combustedMainView}>
            <View style={styles.combustedDateView}>
              <Text style={[styles.combustedText, { marginLeft: 17 }]}>Date</Text>
            </View>
            <View style={styles.combustedSteamView}>
              <Text style={styles.combustedText}>Steam Generation (TPD)</Text>
            </View>
            <View style={styles.combustedProducedView}>
              <Text style={styles.combustedText}>{'Power\nProduced\n(MW)'}</Text>
            </View>
            <View style={styles.combustedExportView}>
              <Text style={styles.combustedText}>Power Export (MW)</Text>
            </View>
            <View style={styles.combustedAuxiliaryView}>
              <Text style={styles.combustedText}>{"Auxiliary\nConsumption\n(MW)"}</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {/* @ts-ignore */}
          <RdfCombusted processing={processing} />
        </ScrollView>
      </View>
      );
    } else if (filter === "Ash Generated") {
      return (
        <View style={styles.tabMainView}>
          <View>
            <View style={styles.ashMainView}>
              <View style={styles.ashDateView}>
                <Text style={styles.ashText}>Date</Text>
              </View>
              <View style={styles.ashExtraView}>
              </View>
              <View style={styles.ashExtraView}>
              </View>
              <View style={styles.ashWeightView}>
                <Text style={styles.ashText}>Weight(MT)</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            {/* @ts-ignore */}
            <AshGenerated distribution={distribution} />
          </ScrollView>
        </View>);
    }
  };
  // *************************** Method For Tab Selection*****************
  const selectActionTab = (item) => {
    setFilter(item.name);
    const _birth = birth.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth(_birth);
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
        transition="backgroundColor"
      >
        <Text style={styles.headerText1}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
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
            // @ts-ignore
            <View style={styles.ans} key={value}>
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
  // ***********************Reminder Modal*************************************
  const reminderModal = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal2}
        onRequestClose={() => {
          setShowModal2(false);
        }}>
        <View style={styles.reminderMainView}>
          <View style={styles.reminderModalView}>
            <View style={styles.reminderModalView1}>
              <View style={styles.reminderTextView}>
                <Text style={styles.reminderInputText}>Please input the data for wte</Text>
                {user?.noFilledDataDates?.map(d => {
                  return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
                })}
              </View>
              <View style={styles.reminderButtonMainView}>
                <TouchableOpacity onPress={() => setShowModal2(false)}>
                  <View style={styles.reminderButtonTextView}>
                    <Text style={styles.reminderButtonText}>Ok</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  // ***********************Help Center Modal******************
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
                <View>
                  <TouchableOpacity onPress={() => { setisSelectedd(!isSelectedd), helpCenterFaqs(); }}
                    style={[styles.contactUsTouchableOpcacity, { marginTop: 10 }]}>
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
                              // @ts-ignore
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
      <NavHeader business="DashboardPt" centerComponent isRightAction={true} />
      <ScrollView>
        <View style={styles.firstContainer}>
          <View style={styles.firstcardContainer}>
            <View style={styles.firstcardmainView}>
              <FlatList
                style={styles.flatlist}
                extraData={birth}
                horizontal
                data={birth}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                  const { name, isSelected } = item;
                  return (
                    <TouchableOpacity onPress={() => selectActionTab(item)}>
                      <View
                        style={[styles.headingMainView, { backgroundColor: isSelected ? "#E41F45" : "#F8F8F8" }]}
                      >
                        <Text
                          style={[styles.card1headingtext3, { color: isSelected ? "#FFFFFF" : "#626362" }]}
                        >
                          {name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={styles.secondcardmainView}>{tabButton(
              props.dashboardWteCollectionData, props.dashboardWteDistributionData,
              props.dashboardWteProcessingData)}</View>
          </View>
        </View>
        <View>{tabButtonSwitches2()}</View>
      </ScrollView>
      <View>
        <Footer />
      </View>
      {calendarModal()}
      {reminderModal()}
      {client4()}
      {client5()}
    </View>
  );
};

export default withConnect(DashboardWTE);

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
  },
  firstcardmainView: {
    height: height / 12,
    flexDirection: "row",
  },
  secondcardmainView: {
    height: height / 3.7,
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
    height: height / 2.5,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondcardContainer: {
    height: height / 2.6,
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
    height: height / 3.9,
    width: width / 1.12,
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  secondView: {
    flex: 0.8,
    marginHorizontal: 20,
    borderRadius: 20,
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
  contentHistory: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
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
  contenthistory: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
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
  segregationTitleText: {
    textAlign: 'center',
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: 'center',
    marginRight: 20,
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
  },
  secondThreecardmaibView: {
    height: height / 15,
    width: width / 1.12,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdContainer: {
    height: height / 2.5,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdcardContainer: {
    height: height / 2.8,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  thirdcardFirstOneView: {
    height: height / 16,
    width: width / 1.13,
    justifyContent: "center",
  },
  thirdcardFirstTwoView: {
    height: height / 3.5,
    width: width / 1.11,
    alignItems: "center",
  },
  inputText: {
    fontSize: 15,
    top: Platform.OS === 'ios' ? 14 : 10,
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
    marginHorizontal: 14,
    marginVertical: 70,
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
  card1headingtext: {
    fontSize: 12,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  helpCenterBackImage: {
    marginLeft: 30, marginTop: 25,
  },
  helpCenterDownImage: {
    tintColor: "black",
    marginRight: Platform.OS === 'ios' ? 11 : 8,
  },
  helpCenterView: {
    marginLeft: 60, marginTop: 10,
  },
  helpCenterView1: {
    height: height / 7,
  },
  helpCenterCallImage: {
    height: 13, width: 10,
    marginLeft: Platform.OS === 'ios' ? -79 : -75,
  },
  helpCenterFaqDownImage: {
    marginRight: 12,
  },
  helpCenterFaqDownImage1: {
    marginLeft: Platform.OS === 'ios' ? -78 : -78,
  },
  helpCenterFaqView: {
    marginBottom: 40,
  },
  contactUsTouchableOpcacity: {
    borderRadius: 10,
  },
  faqTouchableOpcacity: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    top: 20,
  },
  client4image: {
    height: 22,
    width: 22,
    marginLeft: 280,
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
  calenderflatlistview12:
  {
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
    borderRadius: 12,
    top: 10,
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
  card1headingtext1: {
    fontSize: 13,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  headingMainView: {
    flex: 1,
    borderRadius: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card1headingtext3: {
    fontSize: 12,
    padding: 10,
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    fontWeight: "600",
  },
  flatlist: {
    padding: 5,
    marginLeft: 0,
    marginTop: 5,
  },
  tabMainView: {
    justifyContent: "center",
    alignItems: "center",
  },
  rdfMainView: {
    height: height / 21,
    width: width / 1.16,
    marginLeft: 20,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  rdfDateView: {
    height: height / 17,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
  },
  rdfText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
  },
  rdfView: {
    height: height / 17,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rdfWeightView: {
    height: height / 17,
    width: width / 4.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  combustedMainView: {
    height: height / 17,
    width: width / 1.13,
    borderColor: "black",
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
    marginLeft: 20,
  },
  combustedText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#606060",
  },
  combustedDateView: {
    height: height / 17,
    width: width / 5.7,
    justifyContent: "center",
  },
  combustedSteamView: {
    height: height / 21,
    width: width / 6,
    marginLeft: 12,
    justifyContent: "center",
  },
  combustedProducedView: {
    height: height / 19,
    width: width / 6.9,
    marginLeft: 6,
    justifyContent: "center",
  },
  combustedExportView: {
    height: height / 19,
    width: width / 10,
    marginLeft: 6,
    justifyContent: "center",
  },
  combustedAuxiliaryView: {
    marginLeft: 10,
    height: height / 13,
    width: width / 5.5,
    justifyContent: "center",
  },
  ashMainView: {
    height: height / 21,
    width: width / 1.16,
    marginLeft: 20,
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
  ashText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
  },
  ashDateView: {
    height: height / 17,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
  },
  ashExtraView: {
    height: height / 17,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ashWeightView: {
    height: height / 17,
    width: width / 4.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  receiptTrendView: {
    height: height / 16,
    width: width / 1.7,
    justifyContent: "center",
    marginLeft: 15,
  },
  receiptTrendText: {
    fontSize: 17,
    color: "#E41F45",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  receiptTrendView1: {
    height: height / 17,
    width: width / 3.8,
    alignItems: "center",
    justifyContent: "center",
  },
  receiptTrendView2: {
    height: height / 21,
    width: width / 4.9,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  receiptTrendCalenderImage: {
    height: 33,
    width: 33,
  },
  detailsNotFoundView: {
    height: height / 4.3,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsNotFoundText: {
    textAlign: "center",
    fontSize: 18,
    color: "#2D2D2D",
  },
  receiptTrendWeightView: {
    height: height / 20,
    width: width / 2.5,
    backgroundColor: "#FFF0F1",
    borderRadius: 20,
    borderColor: "#E41F45",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  receiptTrendWeightText: {
    fontSize: 12,
    color: "#2D2D2D",
    fontWeight: "700",
    fontFamily: FONT_FAMILIES.AVERTA_REGULAR,
  },
  combustedTrendView: {
    height: height / 16,
    width: width / 1.7,
    justifyContent: "center",
    alignItems: "center",
  },
  combustedTrendView1: {
    height: height / 17,
    width: width / 3.8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  combustedTrendView2: {
    height: height / 21,
    width: width / 4.9,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  reminderModalView: {
    padding: 10,
    flex: Platform.OS === 'ios' ? 0.65 : 0.65,
    justifyContent: "flex-end",
  },
  reminderModalView1: {
    flex: Platform.OS === 'ios' ? 0.55 : 0.55,
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
    flex: 0.8,
    top: Platform.OS === 'android' ? -15 : 0,
    justifyContent: "center",
    alignItems: "center",
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
    height: height / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInputText: {
    fontSize: 18,
    color: 'black',
    marginTop: -30,
  },
  reminderDateText: {
    fontSize: 18,
    top: 10,
    color: 'black',
  },
});
