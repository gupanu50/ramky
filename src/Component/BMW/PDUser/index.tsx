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
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  BackHandler,
} from "react-native";
import XLSX from 'xlsx';
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  METRICS,
} from "../../../Configration";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
// import Toast from 'react-native-simple-toast';
import ModalHeader from "../../../ReuableComponent/ModalHeader";
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import NavHeader from "../../../ReuableComponent/NavHeader";
import Collection from "./Collection";
import Footer from "./Footer";
import Processing from "./Processing";
import { Images } from "../../../Assets";
import Recyclables from "./Recyclables";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import withConnect from "./withConnect";
import Swiper from "react-native-swiper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from 'lodash';
import ApiClient from '../../../Network';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import RNFS from 'react-native-fs';
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const Dashboard = (props: any) => {
  const { route, user, dashboardBmwData, dashboardBmwProcessingData, dashboardBmwDistributeData } = props;
  const { params } = route;
  const [date, setDate] = useState<any>();
  const [date1, setDate1] = useState<any>();
  const [date3, setDate3] = useState<any>();
  const [date4, setDate4] = useState<any>();
  const [check1, setCheck1] = useState(false);
  const [refresh1, setRefresh1] = useState(false);
  const [datetype1, setDateType1] = useState();
  const [isSelected3, setSelected3] = useState("away");
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isOpen4, toggleOpen4] = useState(false);
  const [isOpen5, toggleOpen5] = useState(false);
  const [value5, setValue5] = useState<any>();
  const [value6, setValue6] = useState<any>();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isOpen, toggleOpen] = useState(false);
  const [value1, setValue1] = useState<any>();
  const [isOpen1, toggleOpen1] = useState(false);
  const [value2, setValue2] = useState<any>();
  const [isOpen2, toggleOpen2] = useState(false);
  const [value3, setValue3] = useState<any>();
  const [isOpen3, toggleOpen3] = useState(false);
  const [value4, setValue4] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected1, setSelected1] = useState("away");
  const [filter, setFilter] = useState("Collection");
  const [filter1, setFilter1] = useState("Date");
  const [filter2, setFilter2] = useState("Date");
  const [refresh, setRefresh] = useState(false);
  const [check, setCheck] = useState(false);
  const [plastic, setPlastic] = useState([]);
  const [historyValue, setHistoryValue] = useState([]);
  const [glass, setGlass] = useState([]);
  const [cardboard, setCardboard] = useState([]);
  const [datarefresh, setDataRefresh] = useState(3);
  const [datarefresh1, setDataRefresh1] = useState(3);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [datarefresh3, setDataRefresh3] = useState(3);
  const [datarefresh4, setDataRefresh4] = useState(3);
  const [datarefresh5, setDataRefresh5] = useState(3);
  const [array, setArray] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelectedd, setisSelectedd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [touch, setTouch] = useState(false);
  const [collectionbmw, setCollectionBmw] = useState([]);
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [collectiontrend, setCollectionTrend] = useState([]);
  const [sortingtrend, setSortingTrend] = useState([]);
  const [recyclabletrend, setRecyclableTrend] = useState([]);
  const [datetype, setDateType] = useState();
  // const [showModal2, setShowModal2] = useState(false);
  const location = user.siteName[0].siteName;
  const [faq, setFaq] = useState([]);
  // *************************** Tab Data For Tab Selection*****************
  const [birth, setBirth] = useState([
    { name: "Collection", isSelected: true },
    { name: "Processing", isSelected: false },
    { name: "Recyclables", isSelected: false },
  ]);
  // *************************** Method For Tab Selection*****************
  const selectActionTab = (item) => {
    setFilter(item.name);
    const _birth = birth.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth(_birth);
  };
  // *************************** Collection Trend Calender Methods*****************
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
  const clearCollectionTrendCalender = () => {
    setDate(""), setDate1(""), setValue1(""), setValue2(""), setValue3(""), setValue4(""), setSelected1("away"),
      setBirth1([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
        { name: "Year", isSelected: false },
      ]), setFilter1("Date"), setRefresh(true);
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
          <TouchableOpacity onPress={() => {
            setModalVisible(!modalVisible);
            dataFilter();
          }}>
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
              style={styles.input}>
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
              }}>
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
          <View style={styles.monthsecondview}>

            <TouchableOpacity
              onPress={() => toggleOpen1(true)}
              style={styles.input}>
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
              }}>
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
                    }}>
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
                      { (!value3) ? setValue3(moment().startOf("year")) : null; }
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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
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
  const clearHistoryCalender = () => {
    setDate3(""), setDate4(""), setValue5(""), setValue6(""), setSelected3("away"),
      setBirth2([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter2("Date"), setRefresh1(true);
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
            <View style={styles.calendarmodal1mainview}>
              <View style={styles.calendarmodal1subview}>
                <FlatList
                  style={styles.calenadrmodal1flatlist}
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
                            styles.calendarmodal1flatlistmainviewname,
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
              <View style={styles.calendarmodal1touchableview}>
                <TouchableOpacity
                  onPress={() => { setModalVisible1(!modalVisible1), clearHistoryCalender(); }}
                >
                  <View style={styles.calendarmodal1imageview}>
                    <Image
                      source={Images.vector}
                      style={styles.calendarmodal1image1}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calendarmodal1touchablemainview}>
              <View style={styles.calendarmodal1touchablesubview}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected3("away");
                  }}
                >
                  <View
                    style={[
                      styles.calendarmodal1starttextview,
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
              <View style={styles.calendarmodal1touchableview1}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected3("home");
                  }}
                >
                  <View
                    style={[
                      styles.calendarmodal1endtextview,
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
            <View style={styles.calendarmodal1tabbuttonswitches3view}>
              {tabButtonSwitches3()}
            </View>
          </View>
        </View>
      </Modal>
    );
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
  const dateData1 = () => {
    return (
      <View style={styles.datedata1mainview}>
        {isSelected3 === "away" ? (
          <View style={styles.datedata1Touchable1view}>
            <TouchableOpacity onPress={showDatePicker2}>
              <Text style={styles.datedata1starttext}>
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
          <View style={styles.datedata1Touchable2view}>
            <TouchableOpacity onPress={showDatePicker3}>
              <Text style={styles.datedata1text1}>
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

        <View style={styles.datedata1Touchable3view}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible1(!modalVisible1);
              dataFilter1();
            }}
          >
            <View style={styles.datedata1submittextview}>
              <Text style={{ color: "white", fontSize: 14 }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const monthData1 = () => {
    return (
      <View style={styles.monthdata1mainview}>
        {isSelected3 === "away" ? (
          <View style={styles.monthdata1touchableview1}>
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
          <View style={styles.monthdata1touchableview}>
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

        <View style={styles.monthdata1touchableview2}>
          <TouchableOpacity
            onPress={() => {
              dataFilter1();
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.monthdata1submitview}>
              <Text style={{ color: "white", fontSize: 14 }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const showDatePicker3 = () => {
    setDatePickerVisibility3(true);
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
  // *************************** Help Center Extended Method*****************
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true;
    setTouch(!touch);
  };
  // *************************** Date Month Year Selection Method on Chart*****************
  const getDateString = (date) => {
    return moment(date, "YYYY-MM-DD HH:mm:ss:SSS Z").format(datetype == "Date" ? "DD" : datetype == "Month" ? "MMM" : datetype == "Year" ? "YYYY" : "DD");
  };
  // *************************** Tab Selection Methods*****************
  const tabButton = (bmwdata, sortingdata, distributedata) => {
    if (filter === "Collection") {
      return (<View style={styles.tabButtonMainView}>
        <View>
          <View
            style={styles.mainview1}
          >
            <View
              style={styles.mainview2}
            >
              <Text style={styles.maintext}>Date</Text>
            </View>
            <View
              style={styles.mainview2}
            >
            </View>
            <View
              style={styles.mainview2}
            >
            </View>
            <View
              style={styles.mainview3}
            >
              <Text style={styles.maintext}>Weight(MT)</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {/* @ts-ignore */}
          <Collection bmwdata={bmwdata} />
        </ScrollView>
      </View>
      );
    } else if (filter === "Processing") {
      return (<View style={styles.tabButtonMainView}>
        <View>
          <View
            style={styles.mainview1}
          >
            <View
              style={styles.mainview2}
            >
              <Text style={styles.maintext}>Date</Text>
            </View>
            <View
              style={styles.mainview3}
            >
              <Text style={styles.maintext}>Incineration{"\n"}      (MT)</Text>
            </View>
            <View
              style={styles.mainview4}
            >
              <Text style={styles.maintext}> Autoclave{"\n"}     (MT)</Text>
            </View>
            <View
              style={styles.mainview5}
            >
              <Text style={styles.maintext}>   Weight{"\n"}     (MT)</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {/* @ts-ignore */}
          <Processing sortingdata={sortingdata} />
        </ScrollView>
      </View>
      );
    } else if (filter === "Recyclables") {
      return (<View style={styles.tabButtonMainView}>
        <View>
          <View
            style={[styles.mainview123]}
          >
            <View
              style={styles.distributionmainview2}
            >
              <Text style={styles.maintext}>Date</Text>
            </View>
            <View
              style={styles.distributionmainview3}
            >
              <Text style={styles.maintext}>Recyclables{"\n"}     (MT)</Text>
            </View>
            <View
              style={styles.distributionmainview4}
            >
              <Text style={styles.maintext}>Plastics{"\n"}  (MT)</Text>
            </View>
            <View
              style={styles.distributionmainview5}
            >
              <Text style={styles.maintext}>   Bags{"\n"}   (MT)</Text>
            </View>
            <View
              style={styles.distributemainview6}
            >
              <Text style={styles.maintext}>  Glass{"\n"}  (MT)</Text>
            </View>
            <View
              style={styles.distributemainview7}
            >
              <Text style={styles.maintext}> Card Board{"\n"} (MT)</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {/* @ts-ignore */}
          <Recyclables distributedata={distributedata} />
        </ScrollView>
      </View>
      );
    }
  };
  // *************************** Collection Trend Rendering Methods*****************
  const collectionTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Collection Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View
                  style={styles.detailsvalue4view}
                >
                  <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                    <Image
                      source={Images.calender1}
                      style={styles.mainreturnimage}
                    ></Image>
                  </TouchableOpacity>
                </View>
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
                <View style={styles.datanotfoundview}>
                  <Text style={styles.datanotfoundtext}>{'Data Is Not Found.'}</Text>
                </View>}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View style={styles.weightinmeticview}>
                <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  // *************************** Processing Trend Rendering Methods*****************
  const processingTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={[styles.collectionTrendtext]}>Processing Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View
                  style={styles.detailsvalue5view}
                >
                  <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                    <Image
                      source={Images.calender1}
                      style={styles.mainreturnimage}
                    ></Image>
                  </TouchableOpacity>
                </View>
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
                    y="totalWaste"
                  />
                </VictoryChart> :
                <View style={styles.datanotfoundview}>
                  <Text style={styles.datanotfoundtext}>{'Data Is Not Found.'}</Text>
                </View>}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View style={styles.weightinmeticview}>
                <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  // *************************** Recyclables Trend Rendering Methods*****************
  const recyclablesTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={styles.SecondContainer1}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>
                  Recyclables Trend
                </Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View
                  style={styles.detailsvalue6view}
                >
                  <TouchableOpacity onPress={() => { clearCollectionTrendCalender(), setModalVisible(true); }}>
                    <Image
                      source={Images.calender1}
                      style={styles.mainreturnimage}
                    ></Image>
                  </TouchableOpacity>
                </View>
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
                  y="totalMaterials"
                />
              </VictoryChart> :
                <View style={styles.datanotfoundview}>
                  <Text style={styles.datanotfoundtext}>{'Data Is Not Found.'}</Text>
                </View>}
            </View>
            <View style={styles.secondThreecardmaibView}>
              <View style={styles.weightinmeticview}>
                <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  // *************************** Method For Tab Selection Rendering*****************
  const tabButtonSwitches2 = () => {
    if (filter === "Collection") {
      return collectionTrendGraphUI();
    } else if (filter === "Processing") {
      return processingTrendGraphUI();
    } else if (filter === "Recyclables") {
      return recyclablesTrendGraphUI();
    }
  };
  // ************************Default Data Methods***********************************
  const loadDefaultHistory = () => {
    historyApi(moment(new Date()).subtract(6, 'days'), moment(new Date()), "date");
  };
  const loadDefaultCollectionTrend = () => {
    collectionTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultProcessingTrend = () => {
    processingTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultRecyclablesTrend = () => {
    recyclablesTrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultBmwSummary = () => {
    bmwSummaryApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultBmwPlastic = () => {
    plasticRecyclablesApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultBmwGlass = () => {
    glassRecyclablesApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultBmwCardboard = () => {
    cardboardRecyclablesApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
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
    await loadDefaultBmwSummary();
    await loadDefaultCollectionTrend();
    await loadDefaultProcessingTrend();
    await loadDefaultRecyclablesTrend();
    await loadDefaultBmwPlastic();
    await loadDefaultBmwGlass();
    await loadDefaultBmwCardboard();
  };
  // ************************Max Data For Charts***********************************
  // @ts-ignore
  const maxdata = Math.max(...collectiontrend.map(o => o.quantity));
  // @ts-ignore
  const maxdata1 = Math.max(...sortingtrend.map(o => o.totalWaste));
  // @ts-ignore
  const maxdata2 = Math.max(...recyclabletrend.map(o => o.totalMaterials));
  // @ts-ignore
  const maxdata3 = Math.max(...plastic.map(o => o.plastics));
  // @ts-ignore
  const maxdata4 = Math.max(...glass.map(o => o.glass));
  // @ts-ignore
  const maxdata5 = Math.max(...cardboard.map(o => o.cardboard));

  // *************************************Use Effect**********************************
  // *************************************Use Effect For Max Data For Chart For Trend**********************************
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
  // *************************************Use Effect For All API Calender**********************************
  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        bmwSummaryApi(date, date1, "date");
        collectionTrendApi(date, date1, "date");
        processingTrendApi(date, date1, "date");
        recyclablesTrendApi(date, date1, "date");
        plasticRecyclablesApi(date, date1, "date");
        glassRecyclablesApi(date, date1, "date");
        cardboardRecyclablesApi(date, date1, "date");
      } else if (datetype == "Month") {
        bmwSummaryApi(value1, value2, "month");
        collectionTrendApi(value1, value2, "month");
        processingTrendApi(value1, value2, "month");
        recyclablesTrendApi(value1, value2, "month");
        plasticRecyclablesApi(value1, value2, "month");
        glassRecyclablesApi(value1, value2, "month");
        cardboardRecyclablesApi(value1, value2, "month");
      } else if (datetype == "Year") {
        bmwSummaryApi(value3, value4, "year");
        collectionTrendApi(value3, value4, "year");
        processingTrendApi(value3, value4, "year");
        recyclablesTrendApi(value3, value4, "year");
        plasticRecyclablesApi(value3, value4, "year");
        glassRecyclablesApi(value3, value4, "year");
        cardboardRecyclablesApi(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);
  // *************************************Use Effect For Help Center And History Modal Navigation*********
  useEffect(() => {
    if ((params?.name ?? "") == "History") {
      setShowModal(true);
      loadDefaultHistory();
    } else if ((params?.name ?? "") == "Help Center") {
      setShowModal1(true);
    }
  }, [params]);
  // *************************************Use Effect For Chart Refresh On Data Entry*********
  useEffect(() => {
    setCheck(true);
    setCheck1(true);
    calledApis();
  }, [dashboardBmwData, dashboardBmwProcessingData, dashboardBmwDistributeData]);
  // *************************************Use Focus Effect For Reminder****************************************** 
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
  // ***********************API Methods******************
  // ***********************History API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay = (moment(date3).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date4).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwpdhistory(payload);
    // const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwpdhistory(params);
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
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwpdhistory(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwpdhistory(params);
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
            "Total Waste": d?.totalWaste,
            "Total Incineration": d?.totalIncineration,
            "Total Autoclave": d?.totalAutoclave,
            "Total Materials": d?.totalMaterials,
            "Total Recyclable": d?.totalRecyclable,
            "Total Plastics": d?.totalPlastics,
            "Total Bags": d?.totalBags,
            "Total Glass": d?.totalGlass,
            "Total Cardboard": d?.totalCardboard,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        historyPermissionDownload(printArr);
      }
    }
  };
  // ***********************Collection Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const collectionTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwcollectiontrend(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwcollectiontrend(params);
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
  // ***********************Processing Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const processingTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwprocessingtrend(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwprocessingtrend(params);
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
          var totalWaste = 0;
          filterDateArr.forEach(item => {
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
      setSortingTrend(sortedData);
    }
    else {
      setSortingTrend([]);
    }
  };
  // ***********************Recyclables Trend Graph API Methods******************
  // eslint-disable-next-line no-unused-vars
  const recyclablesTrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwrecyclabletrend(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwrecyclabletrend(params);
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
          var totalMaterials = 0;
          filterDateArr.forEach(item => {
            totalMaterials = totalMaterials + item.totalMaterials ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, totalMaterials });
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
  // ***********************BMW Summary Or Product Catalogue API Methods******************
  // eslint-disable-next-line no-unused-vars
  const bmwSummaryApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwsummarypd(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwsummarypd(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const collectionbmw = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(collectionbmw).map(([key, value]) => {
        return {
          title: key,
          value: value,
        };
      }).filter(item => item.value !== 0);
      // @ts-ignore
      setCollectionBmw(catalogue);
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
      setCollectionBmw([]);
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
  // ***********************Recycleables Plastic API Methods******************
  // eslint-disable-next-line no-unused-vars
  const plasticRecyclablesApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwPdPlastic(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwPdPlastic(params);
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
          var plastics = 0;
          filterDateArr.forEach(item => {
            plastics = plastics + item.totalPlastics ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, plastics });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setPlastic(sortedData);
    }
    else {
      setPlastic([]);
    }
  };
  // ***********************Recycleables Glass API Methods******************
  // eslint-disable-next-line no-unused-vars
  const glassRecyclablesApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwPdGlass(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwPdGlass(params);
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
          var glass = 0;
          filterDateArr.forEach(item => {
            glass = glass + item.totalGlass ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, glass });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setGlass(sortedData);
    }
    else {
      setGlass([]);
    }
  };
  // ***********************Recycleables Cardboard API Methods******************
  // eslint-disable-next-line no-unused-vars
  const cardboardRecyclablesApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", location);
    const result = await ApiClient.createApiClient().bmwPdCardboard(payload);
    //  const params = {start:previousDay,end:time1,siteName:location};
    // const result = await ApiClient.createApiClient().bmwPdCardboard(params);
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
          var cardboard = 0;
          filterDateArr.forEach(item => {
            cardboard = cardboard + item.totalCardboard ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, cardboard });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setCardboard(sortedData);
    }
    else {
      setCardboard([]);
    }
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
        transition="backgroundColor">
        <Text style={styles.headerText1}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
        <Image
          style={styles.renderHeaderImage}
          source={isActive ? Images.dropdown : Images.Upword}
        ></Image>
      </Animatable.View>
    );
  };
  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.contenthistory, isActive ? styles.activee : styles.inactivee]}
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
    RNFS.writeFile(path + '/bmw_pd_history_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
          ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
          Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  // ***********************Reminder Modal*************************************
  // ***********************Reminder Modal*************************************
  // const reminderModal = () => {
  //   return (
  //     <Modal
  //       style={{ zIndex: 10 }}
  //       animationType="slide"
  //       transparent={true}
  //       visible={showModal2}
  //       onRequestClose={() => {
  //         setShowModal2(false);
  //       }}>
  //       <View style={styles.reminderMainView}>
  //         <View style={styles.reminderModalView}>
  //           <View style={styles.reminderModalView1}>
  //             <View style={styles.reminderTextView}>
  //               { user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='BMW-Collect';
  //               }).length ? 
  //                 <Text style={styles.reminderInputText}>Please input the data for collect</Text>: null}
  //               {user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='BMW-Collect';
  //               }).map(d=>{
  //                 return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
  //               })}
  //               { user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='BMW-Sorting';
  //               }).length ?
  //                 <Text style={styles.reminderInputText}>Please input the data for processing</Text>:null}
  //               {user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='BMW-Sorting';
  //               }).map(d=>{
  //                 return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
  //               })}

  //                { user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='BMW-Distribute';
  //               }).length ?
  //                 <Text style={styles.reminderInputText}>Please input the data for distribute</Text>:null}
  //               {user?.noFilledDataDates?.filter(i=>{
  //                 return i.module==='BMW-Distribute';
  //               }).map(d=>{
  //                 return <Text key={d} style={styles.reminderDateText}>{moment(d.date).format("DD/MM/YYYY")}</Text>;
  //               })}

  //             </View>
  //             <View style={styles.reminderButtonMainView}>
  //               <TouchableOpacity onPress={() => setShowModal2(false)}>
  //                 <View style={styles.reminderButtonTextView}>
  //                   <Text style={styles.reminderButtonText}>Ok</Text>
  //                 </View>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };
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
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setActiveSections([]);
                }}
              >
                <View>
                  <Image
                    source={Images.backarrow}
                    style={styles.backArrow}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.historytext}>History</Text>
            </View>

            <View style={styles.firstView}>
              <TouchableOpacity
                onPress={() => { clearHistoryCalender(), setModalVisible1(!modalVisible1); }}
              >
                <Image source={Images.calender1} style={styles.client4image} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => loadDefaultHistoryDownloadData()}
              >
                <Image source={Images.download} style={styles.downloadimage} />
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
  // ***********************Help Center Methods******************
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
                                  <Text style={styles.quesText1}>
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
                                        ? Images.dropdown
                                        : Images.Upword
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
                            </View>
                          );
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
      <NavHeader business="Dashboard" centerComponent isRightAction={true} />
      <ScrollView>
        <View style={styles.firstContainer}>
          <View style={styles.firstcardContainer}>
            <View style={styles.firstcardmainView}>
              <FlatList

                showsHorizontalScrollIndicator={false}
                style={styles.mainreturnflatlist}
                extraData={birth}
                horizontal
                data={birth}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                  const { name, isSelected } = item;
                  return (
                    <TouchableOpacity onPress={() => selectActionTab(item)}>
                      <View
                        style={[
                          styles.headingmainview,
                          {
                            backgroundColor: isSelected ? "#DA0D15" : "#F8F8F8",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.card1headingtext,
                            {
                              color: isSelected ? "#FFFFFF" : "#626362", fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
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
            <View style={styles.secondcardmainView}>{tabButton(props.dashboardBmwData, props.dashboardBmwProcessingData, props.dashboardBmwDistributeData)}</View>
          </View>
        </View>
        <View>{tabButtonSwitches2()}</View>

        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>BMW Summary</Text>
              </View>
            </View>
            {/* @ts-ignore */}
            {collectionbmw.length > 0 ? <View style={styles.mainreturnview3}>

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

            </View> : <View style={styles.dataNotFoundViewSummary}>
              <Text style={styles.dataNotFoundTextSummary}>{'Data Is Not Found.'}</Text>
            </View>}
          </View>
        </View>

        <View style={[styles.SecondContainer, { top: 5, marginBottom: 40 }]}>
          <Swiper
            paginationStyle={styles.swiperStyle}
            dotColor="gray" activeDotColor="red"
            autoplay={false} >
            <View>
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Recyclables</Text>
                  </View>
                </View>
                <View
                  style={styles.mainreturnview4}
                >
                  <View style={styles.mainreturnview5}>
                    <View style={styles.mainreturnview8}>
                      <View style={[styles.mainreturnview6, { marginLeft: -30 }]}>
                        <View
                          style={styles.mainplasticview}
                        ></View>
                        <Text
                          style={styles.mainreturntext3}
                        >
                          Plastic
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={styles.mainreturnview9}
                >
                  {plastic.length > 0 ?

                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{ x: plastic.length < 3 ? 160 : plastic.length < 5 ? 85 : 8 }}
                      domain={{ y: [0, Math.ceil(maxdata3 / 100) * datarefresh3 || 10] }}
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
                        data={plastic}
                        barWidth={10}
                        x="splitDate"
                        y="plastics"
                      />
                    </VictoryChart> :
                    <View style={styles.datanotfoundview}>
                      <Text style={styles.datanotfoundtext}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
              </View>
            </View>
            <View>
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Recyclables</Text>
                  </View>
                </View>
                <View
                  style={styles.mainreturnview4}
                >
                  <View style={styles.mainreturnview5}>
                    <View style={styles.mainreturnview8}>
                      <View style={[styles.mainreturnview6, { marginLeft: -40 }]}>
                        <View
                          style={styles.mainglassview}
                        ></View>
                        <Text
                          style={styles.mainreturntext3}
                        >
                          Glass
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={styles.mainreturnview9}
                >
                  {glass.length > 0 ?
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{ x: glass.length < 3 ? 160 : glass.length < 5 ? 85 : 8 }}
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
                        style={{ data: { fill: "#3884C4" } }}
                        data={glass}
                        barWidth={10}
                        x="splitDate"
                        y="glass"
                      />
                    </VictoryChart> :
                    <View style={styles.datanotfoundview}>
                      <Text style={styles.datanotfoundtext}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
              </View>
            </View>
            <View>
              <View style={styles.SecondcardContainer}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Recyclables</Text>
                  </View>
                </View>
                <View
                  style={styles.mainreturnview4}
                >
                  <View style={styles.mainreturnview5}>
                    <View style={styles.mainreturnview8}>
                      <View style={[styles.mainreturnview6, { marginLeft: -70 }]}>
                        <View
                          style={styles.maincardboardview}
                        ></View>
                        <Text
                          style={styles.mainreturntext3}
                        >
                          Cardboard
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={styles.mainreturnview9}
                >
                  {cardboard.length > 0 ?
                    <VictoryChart
                      width={width / 0.99}
                      height={height / 3.5}
                      theme={VictoryTheme.material}
                      domainPadding={{ x: cardboard.length < 3 ? 160 : cardboard.length < 5 ? 85 : 8 }}
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
                        style={{ data: { fill: "#CC9B42" } }}
                        data={cardboard}
                        barWidth={10}
                        x="splitDate"
                        y="cardboard"
                      />
                    </VictoryChart> :
                    <View style={styles.datanotfoundview}>
                      <Text style={styles.datanotfoundtext}>
                        {"Data Is Not Found."}
                      </Text>
                    </View>}
                </View>
              </View>
            </View>
          </Swiper>
        </View>
      </ScrollView>
      <View>
        <Footer />
      </View>
      {calendarModal()}
      {/* {reminderModal()} */}
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
    width: width / 1.06,
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
  SecondcardContainer: {
    height: height / 2,
    backgroundColor: "#F8F8F8",
    marginHorizontal: 10,
    width: width / 1.06,
    borderRadius: 10,
  },
  SecondContainer1: {
    height: height / 2.4,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SecondcardContainer1: {
    height: height / 2.5,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
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
    height: height / 3.4,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdcardContainer: {
    height: height / 4.7,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
  },
  thirdcardFirstOneView: {
    height: height / 16,
    width: width / 1.06,
    flexDirection: "row",
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
    width: width / 1.6,
    justifyContent: "center",

  },
  collectionTrendtext: {
    fontSize: 17,
    fontWeight: "700",
    color: "#DA0D14",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    marginLeft: 10,
  },
  yeardropdownview: {
    height: height / 16,
    width: width / 3.5,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  yeardropdownview1: {
    height: height / 16,
    width: width / 3.5,
    alignItems: "flex-end",
    justifyContent: "center",
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
  flatlistdetailsview: {
    height: height / 45,
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistdetailsviewtext: {
    fontSize: height / 78,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  flatlistvalueview: {
    height: height / 30,
    width: width / 4.5,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistvalueviewtext: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  textinputView1: {
    alignItems: "flex-start",
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
    marginHorizontal: 20,
    marginVertical: 70,
  },
  contentHistory: {
    height: height / 4,
    backgroundColor: "#fff",
    marginHorizontal: 20,
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
  header: {
    width: width / 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  anss: {
    marginTop: 15,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  active: {
    backgroundColor: '#F8F8F8',
  },
  inactive: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#A6A6A6',
  },
  inactivee: {
    backgroundColor: '#F8F8F8',
  },
  activee: {
    backgroundColor: '#DEFDFB',
    borderBottomWidth: 1,
    borderColor: '#A6A6A6',
    marginHorizontal: 15,
  },
  headerText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 17,
  },
  firstView: {
    height: height / 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  contenthistory: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
  },
  connectView: {
    height: height / 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textinputView: {
    width: width / 1.2,
    alignItems: 'flex-start',
  },
  imgView: {
    height: height / 25,
    width: width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: 12,
  },
  quesText: {
    color: '#606060',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 10,
  },
  quesText1: {
    color: '#606060',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
  ansss: {
    marginTop: 15,
    height: height / 17,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  secureInput: {
    color: '#000000',
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
    color: '#606060',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  mainreturnimage: {
    height: 33,
    width: 33,
    marginRight: 20,
  },
  detailsvalue4view: {
    height: height / 21,
    width: width / 7.7,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsvalue5view: {
    height: height / 21,
    width: width / 5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  detailsvalue6view: {
    height: height / 21,
    width: width / 5,
    justifyContent: "center",
    alignItems: "flex-end",
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
  renderImagestyle: {
    justifyContent: "center",
    alignSelf: "center",
    tintColor: "black",
  },
  rendercontentanimatetext: {
    textAlign: 'center',
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
    top: 10,
    width: width / 7,
    borderRadius: 12,
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
    width: 25,
    marginRight: 20,
    tintColor: "black",
  },
  client5image: {
    height: 15,
    width: 15,
    tintColor: "black",
    marginRight: 18,
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
  mainreturnview2: {
    height: height / 21,
    width: width / 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  segregationTitleText: {
    textAlign: 'center',
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: 'center',
    marginRight: 20,
  },
  mainreturntext: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  mainreturntext1: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  mainreturnview: {
    height: height / 21,
    width: width / 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mainreturnview4: {
    height: height / 11,
    width: width / 1.1,
    marginLeft: 70,
  },
  mainreturnview5: {
    marginTop: 30,
    flexDirection: "row",
    marginLeft: 60,
  },
  mainplasticview: {
    top: 3,
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
  },
  mainbagsview: {
    height: 13,
    width: 13,
    backgroundColor: "#E87818",
    borderRadius: 30,
  },
  mainglassview: {
    top: 3,
    height: 13,
    width: 13,
    backgroundColor: "#3884C4",
    borderRadius: 30,
  },
  maincardboardview: {
    top: 3,
    height: 13,
    width: 13,
    backgroundColor: "#CC9B42",
    borderRadius: 30,
  },
  mainreturnview6: {
    flexDirection: "row",
    marginLeft: -10,
  },
  mainreturnview7: {
    flexDirection: "row",
    marginTop: 10,
  },
  mainreturnview8: {
    marginLeft: 150,
  },
  mainreturnview9: {
    height: height / 3.4,
    width: width / 1.06,
  },
  mainreturnflatlist: { padding: 5, marginLeft: 10, marginTop: 5 },
  mainview1: {
    height: height / 18,
    width: width / 1.16,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  mainview123: {
    height: height / 16,
    width: width / 1.16,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  mainview2: {
    height: height / 17,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionmainview2: {
    height: height / 17,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
  },
  maintext: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
  },
  maintext1: { fontSize: 12, fontWeight: "800" },
  mainview3: {
    height: height / 17,
    width: width / 4.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  distributionmainview3: {
    height: height / 17,
    width: width / 4.7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainview4: {
    height: height / 17,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionmainview4: {
    height: height / 17,
    width: width / 7.5,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview5: {
    height: height / 17,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  distributionmainview5: {
    height: height / 17,
    width: width / 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview6: {
    height: height / 17,
    width: width / 7.5,
    justifyContent: "center",
    marginRight: 5,
  },
  distributemainview6: {
    height: height / 17,
    width: width / 8,
    justifyContent: "center",
    alignItems: "center",
  },
  distributemainview7: {
    height: height / 13.70,
    width: width / 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview7: {
    height: height / 17,
    width: width / 5.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  renderheader1image3: { height: 18, width: 15, tintColor: "black", marginLeft: 10, marginRight: 10 },
  helpCenterBackImage: {
    marginLeft: 30, marginTop: 25,
  },
  helpCenterDownImage: {
    tintColor: "black",
    marginRight: 8,
  },
  helpCenterView: {
    marginLeft: 60, marginTop: 10,
  },
  helpCenterView1: {
    height: height / 7,
  },
  helpCenterCallImage: {
    height: 13, width: 10,
    marginLeft: Platform.OS === 'ios' ? -84 : -85,
  },
  helpCenterFaqDownImage: {
    marginRight: 12,
  },
  helpCenterFaqDownImage1: {
    marginLeft: Platform.OS === 'ios' ? -82 : -90,
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
  flatlistmainview: {
    width: width / 3.53,
    margin: 3,
    alignItems: "center",
    height: height / 8.5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 10,
    backgroundColor: '#D0FAE9',
    borderColor: "#A2DEC6",
  },
  flatlistmainview1: {
    width: width / 3.45,
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
    width: width / 3.45,
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
    width: width / 3.45,
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
  datanotfoundview: {
    height: height / 4.3,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  datanotfoundtext: {
    textAlign: "center",
    fontSize: 18,
    color: "#2D2D2D",
  },
  datedata1mainview: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  datedata1Touchable1view: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datedata1Touchable2view: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datedata1text1: {
    color: "#606060",
    fontSize: 15,
    top: Platform.OS === 'ios' ? 18 : 16,
    marginHorizontal: METRICS.MAR_20,
  },
  datedata1Touchable3view: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  datedata1submittextview: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  monthdata1mainview: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  monthdata1touchableview: {
    height: height / 15,
    width: width / 2,
  },
  monthdata1touchableview2: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  monthdata1submitview: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  calendarmodal1mainview: {
    height: height / 15,
    width: width / 1.16,
    flexDirection: "row",
  },
  calendarmodal1subview: {
    height: height / 15,
    width: width / 1.4,
  },
  calenadrmodal1flatlist: {
    padding: 5,
    marginLeft: 8,
    marginTop: 5,
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
  },
  calendarmodal1flatlistmainviewname: {
    height: height / 28,
    width: width / 6.5,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarmodal1touchableview: {
    height: height / 15,
    width: width / 9,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
  },
  calendarmodal1imageview: {
    height: height / 31,
    width: width / 14,
    backgroundColor: "#F8F8F8",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarmodal1touchablemainview: {
    height: height / 15,
    width: width / 1.16,
    flexDirection: "row",
  },
  calendarmodal1touchablesubview: {
    height: height / 15,
    width: width / 2.32,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  calendarmodal1starttextview: {
    height: height / 25,
    width: width / 7,
    top: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#DA0D14",
  },
  calendarmodal1touchableview1: {
    height: height / 15,
    width: width / 2.32,
    justifyContent: "center",
  },
  calendarmodal1endtextview: {
    height: height / 25,
    width: width / 7,
    top: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 0.8,
    borderColor: "#DA0D14",
  },
  calendarmodal1tabbuttonswitches3view: {
    height: height / 7,
    width: width / 1.16,
  },
  historytext: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    marginTop: 22,
    marginLeft: 20,
  },
  downloadimage: {
    height: 18,
    width: 20,
    marginRight: 30,
    marginLeft: 10,
    tintColor: "black",
  },
  datedata1starttext: {
    color: "#606060",
    fontSize: 15,
    top: Platform.OS === 'ios' ? 18 : 16,
    marginHorizontal: METRICS.MAR_20,
  },
  monthdata1touchableview1: {
    height: height / 15,
    width: width / 2,
  },
  calendarmodal1image1: {
    height: 13,
    width: 13,
    tintColor: "#828282",
  },
  renderHeaderImage: {
    marginTop: 7,
    tintColor: "black",
    marginRight: 60,
  },
  paginationStyle: {
    top: Platform.OS === 'ios' ? 130 : 120,
  },
  paginationStyleItem: {
    width: 8,
    height: 8,
    marginLeft: -4,
  },
  swiperStyle: {
    bottom: 0,
    left: 0,
    marginTop: 10,
  },
  dataNotFoundViewSummary: {
    height: height / 9,
    width: width / 1.06,
    justifyContent: "center",
    alignItems: "center",
  },
  dataNotFoundTextSummary: {
    textAlign: "center",
    fontSize: 18,
    color: "#2D2D2D",
  },
  backArrow: {
    marginLeft: 30,
    marginTop: 25,
  },
  historyView: {
    flexDirection: 'row',
  },
  reminderModalView: {
    left: 20,
    width: width / 1.1,
    height: height / 1.23,
    justifyContent: "flex-end",
  },
  reminderModalView1: {
    height: height / 1.35,
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
    flex: 1,
    top: Platform.OS === 'android' ? 70 : "17%",
    justifyContent: "center",
    alignSelf: "center",
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInputText: {
    fontSize: 18,
    color: 'black',
    marginTop: 30,
  },
  reminderDateText: {
    fontSize: 18,
    top: 5,
    color: 'black',
  },
  tabButtonMainView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
