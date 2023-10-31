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
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
} from "react-native";
import _ from "lodash";
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  METRICS,
} from "../../../../Configration";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
// import Toast from 'react-native-simple-toast';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ApiClient from "../../../../Network";
import Footer from "./Footer";
import withConnect from "./withConnect";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import NavHeader from "../../../../ReuableComponent/NavHeader";
import Collection from "./Collection";
import Segregation from "./Segregation";
import { Images } from "../../../../Assets";
import Processed from "./Processed";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import XLSX from "xlsx";
import RNFS from "react-native-fs";
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const DashboardPdUser = (props: any) => {
  const { route, collection, segregation, processed, user } = props;
  const { params } = route;
  const city = user.siteName[0].siteName;
  const [date, setDate] = useState<any>();
  const [date1, setDate1] = useState<any>();
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
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isSelected3, setSelected3] = useState("away");
  const [refresh1, setRefresh1] = useState(false);
  const [datetype1, setDateType1] = useState();
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [date4, setDate4] = useState<any>();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [date3, setDate3] = useState<any>();
  const [isOpen5, toggleOpen5] = useState(false);
  const [value6, setValue6] = useState<any>();
  const [isOpen4, toggleOpen4] = useState(false);
  const [value5, setValue5] = useState<any>();
  const [check1, setCheck1] = useState(false);
  const [historyValue, setHistoryValue] = useState([]);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [datarefresh3, setDataRefresh3] = useState(3);
  const [Processedtrend, setProcessedTrend] = useState([]);
  const [Segeratedtrend, setSegeratedTrend] = useState([]);
  const [datarefresh, setDataRefresh] = useState(3);
  const [collectiontrend, setCollectionTrend] = useState([]);
  const [materialProcessed, setProcessed] = useState([]);
  const [materialCollected, setCollected] = useState([]);
  const [array, setArray] = useState([]);
  const [array1, setArray1] = useState([]);
  const [CatalogueRecyclelist, setCataloguerecycle] = useState([]);
  const [CatalogueRecyclelistprocess, setCataloguerecycleprocess] = useState(
    []
  );
  const [check, setCheck] = useState(false);
  const [datetype, setDateType] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelectedd, setisSelectedd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [touch, setTouch] = useState(false);
  const [faq, setFaq] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  // const [showModal2, setShowModal2] = useState(false);
  // *************************** Date Month Year Selection Method on Chart*****************
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
  // *************************** Tab Data For Tab Selection*****************
  const [birth, setBirth] = useState([
    { name: "Collection", isSelected: true },
    { name: "Segregation", isSelected: false },
    { name: "Processed", isSelected: false },
  ]);
  // *************************** Help Center Extended Method*****************
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true;
    setTouch(!touch);
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
  const selectActionTab1 = (item) => {
    setFilter1(item.name);
    const _birth1 = birth1.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth1(_birth1);
    setSelected1("away");
  };
  const clearCollectionTrendCalender = () => {
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
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
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
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
                maximumDate={new Date()}
                minimumDate={date || new Date()}
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
              <Text style={styles.monthSubmit}>Submit</Text>
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
  const tabButtonSwitches1 = () => {
    if (filter1 === "Date") {
      return dateData();
    } else if (filter1 === "Month") {
      return monthData();
    } else if (filter1 === "Year") {
      return yearData();
    }
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
                              // @ts-ignore
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
                    setModalVisible(!modalVisible),
                      clearCollectionTrendCalender();
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
  const selectActionTab2 = (item) => {
    setFilter2(item.name);
    const _birth1 = birth2.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth2(_birth1);
    setSelected3("away");
  };
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
  const tabButtonSwitches3 = () => {
    if (filter2 === "Date") {
      return dateData1();
    } else if (filter2 === "Month") {
      return monthData1();
    }
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
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const handleConfirm2 = (date2) => {
    setDate3(date2);
  };
  const showDatePicker3 = () => {
    setDatePickerVisibility3(true);
  };
  const handleConfirm3 = (date3) => {
    setDate4(date3);
    setRefresh1(true);
    hideDatePicker3();
  };
  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };
  const dataFilter1 = () => {
    const filterData = _.filter(birth2, (item: any) => {
      return item.isSelected;
    });
    setDateType1(filterData[0].name);
    setRefresh1(false);
  };
  // ************************Max Data For Charts***********************************
  // @ts-ignore
  const maxdata = Math.max(...collectiontrend.map((o) => o.quantity));
  // @ts-ignore
  const maxdata2 = Math.max(...Processedtrend.map((o) => o.quantity));
  // @ts-ignore
  const maxdata3 = Math.max(...Segeratedtrend.map((o) => o.quantity));
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
  // *************************************Use Effect For Chart Refresh On Data Entry*********
  useEffect(() => {
    setCheck(true);
    setCheck1(true);
    calledapi();
  }, [collection, segregation, processed]);
  // *************************************Use Effect For All API Calender**********************************
  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        materialSummaryApi(date, date1, "date");
        productSummaryApi(date, date1, "Date");
        segregatedSummaryApi(date, date1, "Date");
        collectionTrendApi(date, date1, "date");
        processedTrendApi(date, date1, "date");
        segregatedTrendApi(date, date1, "date");
      } else if (datetype == "Month") {
        materialSummaryApi(value1, value2, "month");
        productSummaryApi(value1, value2, "month");
        segregatedSummaryApi(value1, value2, "month");
        collectionTrendApi(value1, value2, "month");
        processedTrendApi(value1, value2, "month");
        segregatedTrendApi(value1, value2, "month");
      } else if (datetype == "Year") {
        materialSummaryApi(value3, value4, "year");
        productSummaryApi(value3, value4, "year");
        segregatedSummaryApi(value3, value4, "year");
        collectionTrendApi(value3, value4, "year");
        processedTrendApi(value3, value4, "year");
        segregatedTrendApi(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);
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
  // *************************************Use Effect For Reminder******************************************
  // useEffect(() => {
  //   {
  //     user?.noFilledDataDates?.length == null
  //       ? setShowModal2(false)
  //       : setShowModal2(true);
  //   }
  // }, []);
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
  // ************************Calling Api Method***********************************
  const calledapi = async () => {
    await loadDefaultMaterialSummaryData();
    await loadDefaultProductSummary();
    await loadDefaultSegregatedSummary();
    await loadDefaultCollectionTrendData();
    await loadDefaultProcessedTrendData();
    await loadDefaultSegregtedTrendData();
  };
  // ************************Default Data Methods***********************************
  const loadDefaultProductSummary = () => {
    productSummaryApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultSegregatedSummary = () => {
    segregatedSummaryApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultMaterialSummaryData = () => {
    materialSummaryApi(
      moment(new Date()).subtract(4, "days"),
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
  const loadDefaultProcessedTrendData = () => {
    processedTrendApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultSegregtedTrendData = () => {
    segregatedTrendApi(
      moment(new Date()).subtract(4, "days"),
      moment(new Date()),
      "date"
    );
  };
  const loadDefaultHistory = () => {
    historyApi(
      moment(new Date()).subtract(6, "days"),
      moment(new Date()),
      "date"
    );
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
  // ***********************API Methods******************
  // ***********************Product Summary*******************************
  // eslint-disable-next-line no-unused-vars
  const productSummaryApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
  
    const params ={start:previousDay,end:time1,siteName:city};
    const result =
      await ApiClient.createApiClient().recyclecrmProductionSummary(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const collectediwm = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(collectediwm)
        .map(([key, value]) => {
          return {
            title: key,
            value: value,
          };
        })
        .filter((item) => item.value !== 0);
      // @ts-ignore
      setCataloguerecycle(catalogue);
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
      setCataloguerecycle([]);
    }
    // setLoading(false)
  };
  // ***********************Segregated Summary*******************************
  // eslint-disable-next-line no-unused-vars
  const segregatedSummaryApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
  
    const params ={start:previousDay,end:time1,siteName:city};
    // setLoading(true);
    const result = await ApiClient.createApiClient().recyclecrmprocessedSummary(
      params
    );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const collectediwm = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(collectediwm)
        .map(([key, value]) => {
          return {
            title: key,
            value: value,
          };
        })
        .filter((item) => item.value !== 0);
      // @ts-ignore
      setCataloguerecycleprocess(catalogue);
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
      setArray1(array2);
    } else {
      setCataloguerecycleprocess([]);
    }
    // setLoading(false)
  };
  // ***********************Material Summary*******************************
  // eslint-disable-next-line no-unused-vars
  const materialSummaryApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", city);
 
    const result = await ApiClient.createApiClient().recyclecrmMaterialSummary(
      payload
    );
    // const params ={start:previousDay,end:time1,siteName:city};
  
    // const result = await ApiClient.createApiClient().recyclecrmMaterialSummary(
    //   params
    // );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      setCollected(result?.data?.data[0]?.wasteCollected);
      // @ts-ignore
      setProcessed(result?.data?.data[0]?.materialSegregated);
    } else {
      setCollected([]);
      setProcessed([]);
    }
  };
  //********************* Collection Trend Graph API**********/
  // eslint-disable-next-line no-unused-vars
  const collectionTrendApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", city);
 
    const result = await ApiClient.createApiClient().recyclecrmCollectedGraph(
      payload
    );
    // const params ={start:previousDay,end:time1,siteName:city};
    // const result = await ApiClient.createApiClient().recyclecrmCollectedGraph(
    //   params
    // );
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
            quantity = quantity + item.totalScrap ?? 0;
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
    } else {
      setCollectionTrend([]);
    }
  };
  //********************* Processed Trend Graph API**********/
  // eslint-disable-next-line no-unused-vars
  const processedTrendApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", city);

    const result = await ApiClient.createApiClient().recyclecrmProcessedGraph(
      payload
    );
    // const params ={start:previousDay,end:time1,siteName:city};
    // const result = await ApiClient.createApiClient().recyclecrmProcessedGraph(
    //   params
    // );
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
            quantity = quantity + item.processedWaste ?? 0;
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
      setProcessedTrend(sortedData);
    } else {
      setProcessedTrend([]);
    }
  };
  //********************* segregated trend graph **********/
  // eslint-disable-next-line no-unused-vars
  const segregatedTrendApi = async (date, date1, date2) => {
    var previousDay =
      moment(date).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date1).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", city);
  
    const result = await ApiClient.createApiClient().recyclecrmSegregatedGraph(
      payload
    );
    // const params ={start:previousDay,end:time1,siteName:city};
    // const result = await ApiClient.createApiClient().recyclecrmSegregatedGraph(
    //   params
    // );
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
            quantity = quantity + item.segregatedWaste ?? 0;
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
      setSegeratedTrend(sortedData);
    } else {
      setSegeratedTrend([]);
    }
  };
  // ***********************History API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay =
      moment(date3).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date4).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", city);
    
    const result = await ApiClient.createApiClient().recycleCrmpdHistory(
      payload
    );
    // const params ={start:previousDay,end:time1,siteName:city};
   
    // const result = await ApiClient.createApiClient().recycleCrmpdHistory(
    //   params
    // );
    console.log("history", result);
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
    // setLoading(false)
  };
  // ***********************History Download API Methods******************
  // eslint-disable-next-line no-unused-vars
  const historyDownloadApi = async (date3, date4, date2) => {
    var previousDay =
      moment(date3).format("YYYY-MM-DD 00:00:00:000") + " " + `Z`;
    var time1 = moment(date4).format("YYYY-MM-DD 23:59:00:000") + " " + `Z`;
    const payload = new FormData();
    payload.append("start", previousDay);
    payload.append("end", time1);
    payload.append("siteName", city);
   
    const result = await ApiClient.createApiClient().recycleCrmpdHistory(
      payload
    );
    // const params ={start:previousDay,end:time1,siteName:city};
    
    // const result = await ApiClient.createApiClient().recycleCrmpdHistory(
    //   params
    // );
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = result?.data?.data ?? [];
        let printArr = arr.map((d) => {
          let printObj = {
            Date:moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Scrap": d?.totalScrap,
            Pet: d?.pet,
            Hdpe: d?.hdpe,
            Ldpe: d?.ldpe,
            PP: d?.pp,
            Others: d?.others,
            "Total Plastic": d?.totalPlastic,
            "Hdpe Plastic": d?.hdpePlastic,
            "Ldpe Plastic": d?.ldpePlastic,
            "PP Plastic": d?.ppPlastic,
            "Pet Plastic": d?.petPlastic,
            "Others Plastic": d?.othersPlastic,
            TotalPaper: d?.totalPaper,
            CardBoard: d?.cardboard,
            MixedPaper: d?.mixedPaper,
            ONP: d?.onp,
            "Total Metal": d?.totalMetal,
            "total Glass": d?.totalGlass,
            "Others Product": d?.othersProduct,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        historyPermissionDownload(printArr);
      }
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
          // Start downloading
          exportHistoryDataToExcelDownload(downloadHistoryData);
        } else {
          // If permission denied then show alert
          Alert.alert("Error", "Storage Permission Not Granted");
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
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    // Write generated excel to Storage
    const path =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(
      path + "/recycle_crm_pd_history_data_" + new Date().getTime() + ".xlsx",
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
            :       Alert.alert("Excel File Is Downloaded Successfully");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  // *************************** Tab Selection Methods*****************
  const tabButton = (
    collectionRefresh,
    segregationRefresh,
    processedRefresh
  ) => {
    if (filter === "Collection") {
      // @ts-ignore
      return <Collection refresh={collectionRefresh} />;
    } else if (filter === "Segregation") {
      // @ts-ignore
      return <Segregation refresh={segregationRefresh} />;
    } else if (filter === "Processed") {
      // @ts-ignore
      return <Processed refresh={processedRefresh} />;
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
  // *************************** Collection Trend Rendering Methods*****************
  const collectionTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={[styles.SecondContainer1, { top: 20 }]}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Collection Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View style={[styles.yeardropNew3, { right: -30 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      clearCollectionTrendCalender(), setModalVisible(true);
                    }}
                  >
                    <Image
                      source={Images.calender1}
                      style={styles.calenderimg1}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {collectiontrend.length > 0 ? (
                <VictoryChart
                  width={width / 0.99}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={{
                    x:
                      collectiontrend.length < 3
                        ? 160
                        : collectiontrend.length < 5
                          ? 85
                          : 8,
                  }}
                  domain={{
                    y: [0, Math.ceil(maxdata / 100) * datarefresh || 10],
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
                    barRatio={0.15}
                    style={{ data: { fill: "#E87818" } }}
                    data={collectiontrend}
                    barWidth={8}
                    x="splitDate"
                    y="quantity"
                  />
                </VictoryChart>
              ) : (
                <View style={styles.detailsNotFoundView}>
                  <Text style={styles.detailsNotFoundText}>
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
      </ScrollView>
    );
  };
  // *************************** Segregation Trend Rendering Methods*****************
  const segregationTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={[styles.SecondContainer1, { top: 20 }]}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Segregated Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View style={[styles.yeardropNew3, { right: -20 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      clearCollectionTrendCalender(), setModalVisible(true);
                    }}
                  >
                    <Image
                      source={Images.calender1}
                      style={[styles.calenderimg1, { marginRight: 20 }]}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {Segeratedtrend.length > 0 ? (
                <VictoryChart
                  width={width / 0.99}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={{
                    x:
                      Segeratedtrend.length < 3
                        ? 160
                        : Segeratedtrend.length < 5
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
                    data={Segeratedtrend}
                    barWidth={8}
                    x="splitDate"
                    y="quantity"
                  />
                </VictoryChart>
              ) : (
                <View style={styles.detailsNotFoundView}>
                  <Text style={styles.detailsNotFoundText}>
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
      </ScrollView>
    );
  };
  // *************************** Processed Trend Rendering Methods*****************
  const processedTrendGraphUI = () => {
    return (
      <ScrollView>
        <View style={[styles.SecondContainer1, { top: 20 }]}>
          <View style={styles.SecondcardContainer1}>
            <View style={styles.SecondfirstcardmainView}>
              <View style={styles.collectiontrendview}>
                <Text style={styles.collectionTrendtext}>Processed Trend</Text>
              </View>
              <View style={[styles.yeardropdownview]}>
                <View style={styles.yeardropNew3}>
                  <TouchableOpacity
                    onPress={() => {
                      clearCollectionTrendCalender(), setModalVisible(true);
                    }}
                  >
                    <Image
                      source={Images.calender1}
                      style={styles.img3}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.secondTwocardmainView}>
              {Processedtrend.length > 0 ? (
                <VictoryChart
                  width={width / 0.99}
                  height={height / 3.5}
                  theme={VictoryTheme.material}
                  domainPadding={{
                    x:
                      Processedtrend.length < 3
                        ? 160
                        : Processedtrend.length < 5
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
                    barRatio={0.15}
                    style={{ data: { fill: "#E87818" } }}
                    data={Processedtrend}
                    barWidth={8}
                    x="splitDate"
                    y="quantity"
                  />
                </VictoryChart>
              ) : (
                <View style={styles.detailsNotFoundView}>
                  <Text style={styles.detailsNotFoundText}>
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
      </ScrollView>
    );
  };
  // *************************** Method For Tab Selection Rendering*****************
  const tabButtonSwitches2 = () => {
    if (filter === "Collection") {
      return collectionTrendGraphUI();
    } else if (filter === "Segregation") {
      return segregationTrendGraphUI();
    } else if (filter === "Processed") {
      return processedTrendGraphUI();
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
        transition="backgroundColor"
      >
        <Text style={styles.headerText1}>
          {moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
            "DD/MM/YYYY"
          )}
        </Text>
        <Image
          style={{ marginTop: 7, tintColor: "black", marginRight: 30 }}
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
            <View style={[styles.ans]} key={key}>
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
  //       }}
  //     >
  //       <View style={styles.reminderMainView}>
  //         <View style={styles.reminderModalView}>
  //           <View style={styles.reminderModalView1}>
  //             <View style={styles.reminderTextView}>
  //               {user?.noFilledDataDates?.filter((i) => {
  //                 return i.module === "RECYCLE-CRM-Collect";
  //               }).length ? (
  //                 <Text style={styles.reminderInputText}>
  //                   Please input the data for collect
  //                 </Text>
  //               ) : null}
  //               {user?.noFilledDataDates
  //                 ?.filter((i) => {
  //                   return i.module === "RECYCLE-CRM-Collect";
  //                 })
  //                 .map((d) => {
  //                   return (
  //                     <Text key={d} style={styles.reminderDateText}>
  //                       {moment(d.date).format("DD/MM/YYYY")}
  //                     </Text>
  //                   );
  //                 })}

  //               {user?.noFilledDataDates?.filter((i) => {
  //                 return i.module === "RECYCLE-CRM-Segregate";
  //               }).length ? (
  //                 <Text style={styles.reminderInputText}>
  //                   Please input the data for segregation
  //                 </Text>
  //               ) : null}
  //               {user?.noFilledDataDates
  //                 ?.filter((i) => {
  //                   return i.module === "RECYCLE-CRM-Segregate";
  //                 })
  //                 .map((d) => {
  //                   return (
  //                     <Text key={d} style={styles.reminderDateText}>
  //                       {moment(d.date).format("DD/MM/YYYY")}
  //                     </Text>
  //                   );
  //                 })}
  //               {user?.noFilledDataDates?.filter((i) => {
  //                 return i.module === "RECYCLE-CRM-Processed";
  //               }).length ? (
  //                 <Text style={styles.reminderInputText}>
  //                   Please input the data for processed
  //                 </Text>
  //               ) : null}
  //               {user?.noFilledDataDates
  //                 ?.filter((i) => {
  //                   return i.module === "RECYCLE-CRM-Processed";
  //                 })
  //                 .map((d) => {
  //                   return (
  //                     <Text key={d} style={styles.reminderDateText}>
  //                       {moment(d.date).format("DD/MM/YYYY")}
  //                     </Text>
  //                   );
  //                 })}
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
                  clearHistoryCalender(), setModalVisible1(!modalVisible1);
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
        <View style={[styles.centeredView1]}>
          <View style={styles.modalView1}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal1(false);
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
                                        ? Images.dropdown
                                        : Images.Upword
                                    }
                                  />
                                </View>
                              </TouchableOpacity>
                              {/* @ts-ignore */}
                              {item.isExpend ? (
                                //  @ts-ignore
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
                style={styles.flatlist1}
                extraData={birth}
                horizontal
                data={birth}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                  const { name, isSelected } = item;
                  return (
                    <TouchableOpacity
                      style={{ width: width / 3.5 }}
                      onPress={() => selectActionTab(item)}
                    >
                      <View
                        style={[
                          styles.headingmainview,
                          {
                            backgroundColor: isSelected ? "#DB0D15" : "#F8F8F8",
                            marginRight: 20,
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
            <View style={styles.secondcardmainView}>
              {tabButton(collection, segregation, processed)}
            </View>
          </View>
        </View>
        <View>{tabButtonSwitches2()}</View>
        <View style={[styles.ThirdContainer, { top: 20 }]}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <Text style={styles.processedwasteText}>Material Summary</Text>
            </View>
            <View style={styles.wasteCollectedProcessedBoxView}>
              <View style={styles.wasteCollectedProcessedBoxView1}>
                <Text style={styles.wasteCollectedProcessedBoxText}>
                  Collected Material
                </Text>
                <Text style={styles.wasteCollectedProcessedBoxText1}>
                  {materialCollected} MT
                </Text>
              </View>
              <View style={styles.wasteCollectedProcessedBoxView2}>
                <Text style={styles.wasteCollectedProcessedBoxText}>
                  Material Segregated
                </Text>
                <Text style={styles.wasteCollectedProcessedBoxText1}>
                  {materialProcessed} MT
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <View style={[styles.collectiontrendview, { marginLeft: -140 }]}>
                <Text style={styles.collectionTrendtext}>
                  Segregated Summary
                </Text>
              </View>
            </View>
            {CatalogueRecyclelistprocess.length > 0 ? (
              <View style={styles.mainreturnview3}>
                <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor="red"
                  paginationDefaultColor="grey"
                  showPagination={true}
                  paginationStyle={{ marginTop: 1 }}
                  paginationStyleItem={{ width: 8, height: 8, marginLeft: -4 }}
                  data={array1}
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
                            <Text style={styles.swiperFlatlistText1}>
                              {item[0]?.value} MT
                            </Text>
                          </View>
                        )}

                        {item[1]?.title ? (
                          <View style={styles.flatlistmainview11}>
                            <Text style={styles.swiperFlatlistText}>
                              {item[1]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.swiperFlatlistText1}>
                              {item[1]?.value} MT
                            </Text>
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
                            <Text style={styles.swiperFlatlistText1}>
                              {item[2]?.value} MT
                            </Text>
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
              <View
                style={{
                  height: height / 7,
                  width: width / 1.06,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "#2D2D2D",
                  }}
                >
                  {"Data Is Not Found."}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <View style={[styles.collectiontrendview, { marginLeft: -160 }]}>
                <Text style={styles.collectionTrendtext}>Product Summary</Text>
              </View>
            </View>
            {CatalogueRecyclelist.length > 0 ? (
              <View style={styles.mainreturnview3}>
                <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor="red"
                  paginationDefaultColor="grey"
                  showPagination={true}
                  paginationStyle={{ marginTop: 1 }}
                  paginationStyleItem={{ width: 8, height: 8, marginLeft: -4 }}
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
                            <Text style={styles.swiperFlatlistText1}>
                              {item[0]?.value} MT
                            </Text>
                          </View>
                        )}

                        {item[1]?.title ? (
                          <View style={styles.flatlistmainview11}>
                            <Text style={styles.swiperFlatlistText}>
                              {item[1]?.title
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                                .replace(
                                  /([a-zA-Z])([A-Z])([a-z])/g,
                                  "$1 $2$3"
                                )}
                            </Text>
                            <Text style={styles.swiperFlatlistText1}>
                              {item[1]?.value} MT
                            </Text>
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
                            <Text style={styles.swiperFlatlistText1}>
                              {item[2]?.value} MT
                            </Text>
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
              <View
                style={{
                  height: height / 7,
                  width: width / 1.06,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "#2D2D2D",
                  }}
                >
                  {"Data Is Not Found."}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <Footer />
      </View>
      {calenderModal1()}
      {calendarModal()}
      {/* {reminderModal()} */}
      {client4()}
      {client5()}
    </View>
  );
};

export default withConnect(DashboardPdUser);

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
    width: width / 1.1,
    flexDirection: "row",
    right: 10,
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
    paddingHorizontal: 1,
    width: width / 1.06,
    borderRadius: 10,
  },
  SecondContainer1: {
    height: height / 2.3,
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
    height: height / 4.5,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
  },
  thirdcardFirstOneView: {
    height: height / 14,
    width: width / 1.13,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
  },
  thirdcardFirstTwoView: {
    height: height / 3.5,
    width: width / 1.06,
    alignItems: "center",
  },
  item2: {},
  headingmainview: {
    height: height / 25,
    width: width / 4.2,
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
    justifyContent: "center",
    alignItems: "center",
  },
  collectionTrendtext: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E41F45",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  yeardropdownview: {
    height: height / 16,
    width: width / 2.07,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  yeardropdownview1: {
    height: height / 16,
    width: width / 2.07,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 30,
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
    marginVertical: 15,
    marginRight: 160,
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
    width: width / 3.4,
    margin: 2,
    alignItems: "center",
    height: height / 9,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    marginLeft: 5,
  },
  flatlistdetailsview: {
    height: height / 30,
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistvalueview: {
    height: height / 30,
    width: width / 4.5,
    alignItems: "center",
    justifyContent: "center",
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
    top: 8,
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
    marginVertical: 2,
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
    marginLeft: -20,
    paddingLeft: 30,
  },
  inactive: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    marginLeft: -20,
    paddingLeft: 30,
    borderColor: "#A6A6A6",
  },
  inactivee: {
    backgroundColor: "#F8F8F8",
  },
  activee: {
    backgroundColor: "#DEFDFB",
    borderBottomWidth: 1,
    borderColor: "#A6A6A6",
    marginHorizontal: 1,
  },
  headerText: {
    color: "#000000",
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
    flex: 0.8,
    backgroundColor: "white",
    marginHorizontal: 20,
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
  connectView: {
    height: height / 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textinputView: {
    width:Platform.OS==='ios'?width/1.37: width / 1.4,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  imgView: {
    height: height / 25,
    width: width / 9.2,
    justifyContent: "center",
    alignItems: "center",
    left: 67,
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
  ans: {
    height: height / 20,
    backgroundColor: "#DEFDFB",
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
  img3: {
    height: 33,
    width: 33,
    marginLeft: 30,
  },
  yeardropNew3: {
    height: height / 21,
    width: width / 5,
    justifyContent: "center",
    alignItems: "flex-start",
    right: -20,
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
  calenderflatlistview12: {
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
  client4image: {
    height: 24,
    width: 24,
    marginLeft: 280,
  },
  helpCenterBackImage: {
    marginLeft: 30,
    marginTop: 25,
  },
  helpCenterView: {
    marginLeft: 60,
    marginTop: 10,
  },
  contactUsTouchableOpcacity: {
    borderRadius: 10,
  },
  helpCenterDownImage: {
    tintColor: "black",
    marginRight: 8,
  },
  helpCenterView1: {
    height: height / 7,
  },
  helpCenterCallImage: {
    height: 13,
    width: 10,
    marginLeft: -75,
  },
  helpCenterFaqView: {
    marginBottom: 30,
  },
  helpCenterFaqDownImage1: {
    height: 10,
    tintColor: "black",
    marginLeft: -79,
  },
  datedataView5: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  datedataView4: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  datedataText2: {
    color: "#606060",
    fontSize: 15,
    top: 10,
    marginHorizontal: METRICS.MAR_20,
  },
  datedataView3: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datedataText1: {
    color: "#606060",
    fontSize: 15,
    top: 10,
    marginHorizontal: METRICS.MAR_20,
  },
  datedataView2: {
    height: height / 15,
    width: width / 2,
    borderBottomWidth: 1.2,
    borderBottomColor: "#D8D8D8",
    justifyContent: "center",
  },
  datedataView1: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  yearView4: {
    height: height / 27,
    width: width / 7,
    backgroundColor: "#DA0D14",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  yearView3: {
    height: height / 15,
    width: width / 1.16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  yearView2: {
    height: height / 15,
    width: width / 2,
  },
  yearView1: {
    height: height / 15,
    width: width / 1.16,
    alignItems: "center",
  },
  monthSubmit: {
    color: "white",
    fontSize: 14,
  },
  flatlistNew3: {
    fontSize: height / 87,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  flatlistNew2: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  flatlistNew1: {
    fontSize: height / 78,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
  },
  calenderimg1: {
    height: 33,
    width: 33,
    marginLeft: 25,
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
    top: 16,
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
  numb: {
    height: height / 15,
    width: width / 2,
  },
  flatlist1: {
    padding: 5,
    marginLeft: 10,
    marginTop: 5,
  },
  new2: {
    fontSize: height / 74,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  new3: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  new4: {
    fontSize: height / 74,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  new5: {
    fontSize: height / 65,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
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
  mainreturnview3: {
    height: height / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistmainview11: {
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
  wasteCollectedProcessedBoxView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  wasteCollectedProcessedBoxView1: {
    height: height / 7.5,
    width: width / 2.3,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  wasteCollectedProcessedBoxText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    marginTop: 25,
    color: "#2D2D2D",
    fontWeight: "600",
  },
  wasteCollectedProcessedBoxText1: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    marginTop: 5,
  },
  wasteCollectedProcessedBoxView2: {
    height: height / 7.5,
    width: width / 2.3,
    borderColor: "#D0BDE7",
    borderWidth: 2,
    backgroundColor: "#F1E5FF",
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: "center",
    alignItems: "center",
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
  contentHistory: {
    backgroundColor: "#fff",
  },
  segregationTitleText: {
    textAlign: "center",
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: "center",
    marginRight: 10,
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
  datesubmittext: {
    color: "white",
    fontSize: 14,
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
    top:Platform.OS==='ios'? 70:40,
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
    backgroundColor: "#00000070",
    flex: 1,
  },
  reminderTextView: {
    justifyContent: "center",
    alignItems: "center",
  },
  reminderInputText: {
    fontSize: 18,
    color: "black",
    marginTop: 30,
  },
  reminderDateText: {
    fontSize: 18,
    top: 5,
    color: "black",
  },
});
