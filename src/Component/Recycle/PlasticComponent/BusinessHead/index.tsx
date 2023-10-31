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
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  BackHandler,
} from "react-native";
import ApiClient from '../../../../Network';
// import Toast from 'react-native-simple-toast';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import _ from 'lodash';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import {
  COLORS,
  FONT_FAMILIES,
  METRICS,
} from "../../../../Configration";
import Swiper from 'react-native-swiper';
import Share from 'react-native-share';
import RNFS from'react-native-fs';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,VictoryLabel,
} from "victory-native";
import ModalHeader from "../../../../ReuableComponent/ModalHeader";
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import NavHeader from "../../../../ReuableComponent/NavHeader";
import { Images } from "../../../../Assets";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import withConnect from "./withConnect";
import XLSX from 'xlsx';
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const DashboardBusinessHead = (props: any) => {
  const { route } = props;
  const { params } = route;
  const [date, setDate] = useState<any>();
  const [array, setArray] = useState([]);
  const [array1, setArray1] = useState([]);
  const [date1, setDate1] = useState<any>();
  const [date3, setDate3] = useState<any>();
  const [date4, setDate4] = useState<any>();
  const [date5, setDate5] = useState<any>();
  const [date6, setDate6] = useState<any>();
  const [date7, setDate7] = useState<any>();
  const [date8, setDate8] = useState<any>();
  const [date9, setDate9] = useState<any>();
  const [date10, setDate10] = useState<any>();
  const [check,setCheck] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [rdf, setRdf] = useState([]);
  const [rdf1, setRdf1] = useState([]);
  const [isOpen, toggleOpen] = useState(false);
  const [value1, setValue1] = useState<any>();
  const [isOpen1, toggleOpen1] = useState(false);
  const [value2, setValue2] = useState<any>();
  const [isOpen2, toggleOpen2] = useState(false);
  const [value3, setValue3] = useState<any>();
  const [isOpen3, toggleOpen3] = useState(false);
  const [value4, setValue4] = useState<any>();
  const [value5, setValue5] = useState<any>();
  const [value6, setValue6] = useState<any>();
  const [value7, setValue7] = useState<any>();
  const [value8, setValue8] = useState<any>();
  const [value9, setValue9] = useState<any>();
  const [value10, setValue10] = useState<any>();
  const [value11, setValue11] = useState<any>();
  const [value12, setValue12] = useState<any>();
  const [historyValue, setHistoryValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [isSelected1, setSelected1] = useState("away");
  const [collectiontrendvalue, setCollectionTrendValue] = useState([]);
  const [processedtrendvalue,setProcessedTrendValue] = useState([]);
  const [segregatedtrendvalue,setSegregatedTrendValue] = useState([]);
  const [filter1, setFilter1] = useState("Date");
  const [filter2, setFilter2] = useState("Date");
  const [filter3, setFilter3] = useState("Date");
  const [filter4, setFilter4] = useState("Date");
  const [filter5, setFilter5] = useState("Date");
  const [isOpen4, toggleOpen4] = useState(false);
  const [isOpen5, toggleOpen5] = useState(false);
  const [isOpen6, toggleOpen6] = useState(false);
  const [isOpen7, toggleOpen7] = useState(false);
  const [isOpen8, toggleOpen8] = useState(false);
  const [isOpen9, toggleOpen9] = useState(false);
  const [isOpen10, toggleOpen10] = useState(false);
  const [wastedcollected1, setWastedCollected1] = useState([]);
  const [wastedprocessed1, setWastedProcessed1] = useState([]);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [isOpen11, toggleOpen11] = useState(false);
  const [datetype, setDateType] = useState();
  const [refresh, setRefresh] = useState(false);
  const [refresh1, setRefresh1] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [refresh3, setRefresh3] = useState(false);
  const [refresh4, setRefresh4] = useState(false);
  const [datetype1, setDateType1] = useState();
  const [datetype2, setDateType2] = useState();
  const [datetype3, setDateType3] = useState();
  const [check1, setCheck1] = useState(false);
  const [datetype4, setDateType4] = useState();
  const [isSelected3, setSelected3] = useState("away");
  const [isSelected4, setSelected4] = useState("away");
  const [isSelected5, setSelected5] = useState("away");
  const [isSelected6, setSelected6] = useState("away");
  const [helpLineNo1, setHelpLineNo1] = useState("");
  const [helpLineno2, setHelpLineNo2] = useState("");
  const [city, setCity] = useState("All");
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [isDatePickerVisible5, setDatePickerVisibility5] = useState(false);
  const [isDatePickerVisible6, setDatePickerVisibility6] = useState(false);
  const [isDatePickerVisible7, setDatePickerVisibility7] = useState(false);
  const [isDatePickerVisible8, setDatePickerVisibility8] = useState(false);
  const [isDatePickerVisible9, setDatePickerVisibility9] = useState(false);
  const [isSelected2, setisSelected2] = useState(false);
  const [isSelectedd, setisSelectedd] = useState(false);
  const [collectedLeftMenuValue, setCollectedLeftMenuValue] = useState([]);
  const [segregationLeftMenuValue, setSegregationLeftMenuValue] = useState([]);
  const [processedLeftMenuValue, setProcessedLeftMenuValue] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [datarefresh, setDataRefresh] = useState(3);
  const [datarefresh1, setDataRefresh1] = useState(3);
  const [datarefresh2, setDataRefresh2] = useState(3);
  const [touch, setTouch] = useState(false);
  const [faq, setFaq] = useState([]);
  const onPressExtend = (item) => {
    item.isExpend = item.isExpend ? !item.isExpend : true,
    setTouch(!touch);
  };
  // **************API Methods********************
  const helpcentercontactus = async () => {
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

  const helpcenterfaqs = async () => {
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
  //************** Calender Methods****************
  const [birth1, setBirth1] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
    { name: "Year", isSelected: false },
  ]);
  const [birth2, setBirth2] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const [birth3, setBirth3] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const [birth4, setBirth4] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const [birth5, setBirth5] = useState([
    { name: "Date", isSelected: true },
    { name: "Month", isSelected: false },
  ]);
  const dataFilter = () => {
    const filterData = _.filter(birth1, (item: any) => {
      return item.isSelected;
    });
    setDateType(filterData[0].name);
    setRefresh(false);
  };
  const dataFilter1 = () => {
    const filterData = _.filter(birth2, (item: any) => {
      return item.isSelected;
    });
    setDateType1(filterData[0].name);
    setRefresh1(false);
  };
  const dataFilter2 = () => {
    const filterData = _.filter(birth3, (item: any) => {
      return item.isSelected;
    });
    setDateType2(filterData[0].name);
    setRefresh2(false);
  };
  const dataFilter3 = () => {
    const filterData = _.filter(birth4, (item: any) => {
      return item.isSelected;
    });
    setDateType3(filterData[0].name);
    setRefresh3(false);
  };
  const dataFilter4 = () => {
    const filterData = _.filter(birth5, (item: any) => {
      return item.isSelected;
    });
    setDateType4(filterData[0].name);
    setRefresh4(false);
  };
  const selectActionTab1 = (item) => {
    setFilter1(item.name);
    const _birth1 = birth1.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth1(_birth1);
    setSelected1("away");
  };
  const selectActionTab2 = (item) => {
    setFilter2(item.name);
    const _birth1 = birth2.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth2(_birth1);
    setSelected3("away");
  };
  const selectActionTab3 = (item) => {
    setFilter3(item.name);
    const _birth1 = birth3.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth3(_birth1);
    setSelected4("away");
  };
  const selectActionTab4 = (item) => {
    setFilter4(item.name);
    const _birth1 = birth4.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth4(_birth1);
    setSelected5("away");
  };

  const selectActionTab5 = (item) => {
    setFilter5(item.name);
    const _birth1 = birth5.map((element) => {
      return { ...element, isSelected: item.name === element.name };
    });
    setBirth5(_birth1);
    setSelected6("away");
  };

  const clearWasteSummaryCalender = () => {
    setDate(""), setDate1(""), setValue1(""), setValue2(""), setValue3(""), setValue4(""), setSelected1("away"),
      setBirth1([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
        { name: "Year", isSelected: false },
      ]), setFilter1("Date"),setRefresh(true);
  };
  const clearHistoryCalender = () => {
    setDate3(""), setDate4(""), setValue5(""), setValue6(""), setSelected3("away"),
      setBirth2([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter2("Date"),setRefresh1(true);
  };
  const collectedClearCalender = () => {
    setDate5(""), setDate6(""), setValue7(""), setValue8(""), setSelected4("away"),
      setBirth3([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter3("Date"), setRefresh2(true);
  };
  const processedClearCalender = () => {
    setDate7(""), setDate8(""), setValue9(""), setValue10(""), setSelected5("away"),
      setBirth4([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter4("Date"),setRefresh3(true);
  };
  const calendarmodal = () => {
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
                            // backgroundColor:"yellow"
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
                  onPress={() => {setModalVisible(!modalVisible),clearWasteSummaryCalender();}}
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
              {tabButtonswitches1()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const calendermodal1 = () => {
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
                  onPress={() => {setModalVisible1(!modalVisible1),clearHistoryCalender ();}}
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
              {tabButtonswitches3()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const calendarmodal2 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
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
                  extraData={birth3}
                  horizontal
                  data={birth3}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab3(item)}>
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
                  onPress={() => {setModalVisible2(!modalVisible2),collectedClearCalender();}}
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
                    setSelected4("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected4 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected4 === "away" ? "#FFFFFF" : "#626362",
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
                    setSelected4("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected4 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected4 === "home" ? "#FFFFFF" : "#626362",
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
              {tabButtonswitches4()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const calendermodal3 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
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
                  extraData={birth4}
                  horizontal
                  data={birth4}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab4(item)}>
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
                  onPress={() => {setModalVisible3(!modalVisible3),processedClearCalender();}}
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
                    setSelected5("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected5 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected5 === "away" ? "#FFFFFF" : "#626362",
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
                    setSelected5("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected5 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected5 === "home" ? "#FFFFFF" : "#626362",
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
              {tabButtonswitches5()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const calendermodal4 = () => {
    return (
      <Modal
        style={{ zIndex: 20 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
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
                  extraData={birth5}
                  horizontal
                  data={birth5}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    const { name, isSelected } = item;
                    return (
                      <TouchableOpacity onPress={() => selectActionTab5(item)}>
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
                  onPress={() => {setModalVisible4(!modalVisible4),distributeClearCalender();}}
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
                    setSelected6("away");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview4, {
                      backgroundColor:
                        isSelected6 === "away" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected6 === "away" ? "#FFFFFF" : "#626362",
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
                    setSelected6("home");
                  }}
                >
                  <View
                    style={[styles.calenderflatlistview6, {
                      backgroundColor:
                        isSelected6 === "home" ? "#DB0D15" : "#F8F8F8",
                    }]}
                  >
                    <Text
                      style={{
                        color: isSelected6 === "home" ? "#FFFFFF" : "#626362",
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
              {tabButtonswitches6()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const datedata = () => {
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
                maximumDate={new Date()}
                minimumDate={date || new Date()}
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
  const datedata1 = () => {
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
                maximumDate={new Date()}
                minimumDate={date3 || new Date()}
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
  const datedata2 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected4 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker4}
            >
              <Text
                style={styles.datethirdview}
              >
                {date5 ? moment(date5).format("DD-MMM") : "Select Start Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible4}
                mode="date"
                onConfirm={handleConfirm4}
                onCancel={hideDatePicker4}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker5}
            >
              <Text
                style={styles.datethirdview}
              >
                {date6 ? moment(date6).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible5}
                mode="date"
                onConfirm={handleConfirm5}
                onCancel={hideDatePicker5}
                maximumDate={new Date()}
                minimumDate={date5 || new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible2(!modalVisible2);
            dataFilter2();
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
  const datedata3 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected5 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker6}
            >
              <Text
                style={styles.datethirdview}
              >
                {date7 ? moment(date7).format("DD-MMM") : "Select Start Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible6}
                mode="date"
                onConfirm={handleConfirm6}
                onCancel={hideDatePicker6}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker7}
            >
              <Text
                style={styles.datethirdview}
              >
                {date8 ? moment(date8).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible7}
                mode="date"
                onConfirm={handleConfirm7}
                onCancel={hideDatePicker7}
                maximumDate={new Date()}
                minimumDate={date7 || new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible3(!modalVisible3);
            dataFilter3();
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
  const datedata4 = () => {
    return (
      <View
        style={styles.dateview}
      >
        {isSelected6 === "away" ? (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker8}
            >
              <Text
                style={styles.datethirdview}
              >
                {date9 ? moment(date9).format("DD-MMM") : "Select Start Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible8}
                mode="date"
                onConfirm={handleConfirm8}
                onCancel={hideDatePicker8}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={styles.datesecondview}
          >
            <TouchableOpacity
              onPress={showDatePicker9}
            >
              <Text
                style={styles.datethirdview}
              >
                {date10 ? moment(date10).format("DD-MMM") : "Select End Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible9}
                mode="date"
                onConfirm={handleConfirm9}
                onCancel={hideDatePicker9}
                maximumDate={new Date()}
                minimumDate={date9 || new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={styles.datesubmitview}
        >
          <TouchableOpacity onPress={() => {
            setModalVisible4(!modalVisible4);
            dataFilter4();
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
  const monthdata = () => {
    return (
      <View
        style={styles.monthview}
      >
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
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value1 || new Date()}
                    onMonthChange={(date) => { setValue1(date), setRefresh(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value1) ? setValue1(moment().startOf("month")) : null;}
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
          <View style={styles.monthsecondview} >
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
                    // @ts-ignore
                    onMonthChange={(date) => { setValue2(moment(date).add(1, "month").subtract(1, "days")), setRefresh(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value2) ? setValue2(moment()) : null;}
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
            dataFilter();
            setModalVisible(!modalVisible);
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
  const monthdata1 = () => {
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
                    onMonthChange={(date) => { setValue5(date), setRefresh1(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value5) ? setValue5(moment().startOf("month")) : null;}
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
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue6(moment(date).add(1, "month").subtract(1, "days")), setRefresh1(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value6) ? setValue6(moment()) : null;}
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
  const monthdata2 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected4 === "away" ? (
          <View
            style={styles.monthsecondview}
          >

            <TouchableOpacity
              onPress={() => toggleOpen6(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value7
                  ? moment(value7).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen6}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value7 || new Date()}
                    onMonthChange={(date) => { setValue7(date), setRefresh2(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value7) ? setValue7(moment().startOf("month")) : null;}
                      toggleOpen6(false);
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
              onPress={() => toggleOpen7(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value8
                  ? moment(value8).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen7}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value8 || new Date()}
                    minDate={value7 || new Date()}
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue8(moment(date).add(1, "month").subtract(1, "days")), setRefresh2(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value8) ? setValue8(moment()) : null;}
                      toggleOpen7(false);
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
            dataFilter2();
            setModalVisible2(!modalVisible2);
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
  const monthdata3 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected5 === "away" ? (
          <View
            style={styles.monthsecondview}
          >
            <TouchableOpacity
              onPress={() => toggleOpen8(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value9
                  ? moment(value9).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen8}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value9 || new Date()}
                    onMonthChange={(date) => { setValue9(date), setRefresh3(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value9) ? setValue9(moment().startOf("month")) : null;}
                      toggleOpen8(false);
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
              onPress={() => toggleOpen9(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value10
                  ? moment(value10).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen9}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value10 || new Date()}
                    minDate={value9 || new Date()}
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue10(moment(date).add(1, "month").subtract(1, "days")), setRefresh3(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value10) ? setValue10(moment()) : null;}
                      toggleOpen9(false);
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
            dataFilter3();
            setModalVisible3(!modalVisible3);
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
  const monthdata4 = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected6 === "away" ? (
          <View
            style={styles.monthsecondview}
          >
            <TouchableOpacity
              onPress={() => toggleOpen10(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value11
                  ? moment(value11).format("MMM-YYYY")
                  : "Select Start Month"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={isOpen10}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value11 || new Date()}
                    onMonthChange={(date) => { setValue11(date), setRefresh4(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value11) ? setValue11(moment().startOf("month")) : null;}
                      toggleOpen10(false);
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
              onPress={() => toggleOpen11(true)}
              style={styles.input}
            >
              <Text style={styles.inputText}>
                {value12
                  ? moment(value12).format("MMM-YYYY")
                  : "Select End Month"}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={isOpen11}
              onRequestClose={() => {
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <MonthPicker
                    selectedDate={value12 || new Date()}
                    minDate={value11 || new Date()} 
                    // @ts-ignore 
                    onMonthChange={(date) => { setValue12(moment(date).add(1, "month").subtract(1, "days")), setRefresh4(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value12) ? setValue12(moment()) : null;}
                      toggleOpen11(false);
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
            dataFilter4();
            setModalVisible4(!modalVisible4);
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
  const yeardata = () => {
    return (
      <View
        style={styles.monthview}
      >
        {isSelected1 === "away" ? (
          <View
            style={styles.monthsecondview}>
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
                    onMonthChange={(date) => { setValue3(date), setRefresh(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value3) ? setValue3(moment().startOf("month")) : null,setRefresh(true);}
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
            style={styles.monthsecondview} >
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
                    // @ts-ignore
                    onMonthChange={(date) => { setValue4(moment(date).add(1, "month").subtract(1, "days")), setRefresh(true);}}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      { (!value4) ? setValue4(moment()) : null;}
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
            dataFilter();
            setModalVisible(!modalVisible);
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
  const handleConfirm = (date) => {
    setDate(date);
    setRefresh(true);
    hideDatePicker();
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const showDatePicker3 = () => {
    setDatePickerVisibility3(true);
  };
  const showDatePicker4 = () => {
    setDatePickerVisibility4(true);
  };
  const showDatePicker5 = () => {
    setDatePickerVisibility5(true);
  };
  const showDatePicker6 = () => {
    setDatePickerVisibility6(true);
  };
  const showDatePicker7 = () => {
    setDatePickerVisibility7(true);
  };
  const showDatePicker8 = () => {
    setDatePickerVisibility8(true);
  };
  const showDatePicker9 = () => {
    setDatePickerVisibility9(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };
  const hideDatePicker4 = () => {
    setDatePickerVisibility4(false);
  };
  const hideDatePicker5 = () => {
    setDatePickerVisibility5(false);
  };
  const hideDatePicker6 = () => {
    setDatePickerVisibility6(false);
  };
  const hideDatePicker7 = () => {
    setDatePickerVisibility7(false);
  };
  const hideDatePicker8 = () => {
    setDatePickerVisibility8(false);
  };
  const hideDatePicker9 = () => {
    setDatePickerVisibility9(false);
  };
  const handleConfirm1 = (date1) => {
    setDate1(date1);
    setRefresh(true);
    hideDatePicker1();
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
  const handleConfirm4 = (date4) => {
    setDate5(date4);
    setRefresh2(true);
    hideDatePicker4();
  };
  const handleConfirm5 = (date5) => {
    setDate6(date5);
    setRefresh2(true);
    hideDatePicker5();
  };
  const handleConfirm6 = (date6) => {
    setDate7(date6);
    setRefresh3(true);
    hideDatePicker6();
  };
  const handleConfirm7 = (date7) => {
    setDate8(date7);
    setRefresh3(true);
    hideDatePicker7();
  };
  const handleConfirm8 = (date8) => {
    setDate9(date8);
    setRefresh4(true);
    hideDatePicker8();
  };
  const handleConfirm9 = (date9) => {
    setDate10(date9);
    setRefresh4(true);
    hideDatePicker9();
  };
  const tabButtonswitches1 = () => {
    if (filter1 === "Date") {
      return datedata();
    } else if (filter1 === "Month") {
      return monthdata();
    } else if (filter1 === "Year") {
      return yeardata();
    }
  };
  const tabButtonswitches3 = () => {
    if (filter2 === "Date") {
      return datedata1();
    } else if (filter2 === "Month") {
      return monthdata1();
    }
  };
  const tabButtonswitches4 = () => {
    if (filter3 === "Date") {
      return datedata2();
    } else if (filter3 === "Month") {
      return monthdata2();
    }
  };

  const tabButtonswitches5 = () => {
    if (filter4 === "Date") {
      return datedata3();
    } else if (filter4 === "Month") {
      return monthdata3();
    }
  };

  const tabButtonswitches6 = () => {
    if (filter5 === "Date") {
      return datedata4();
    } else if (filter5 === "Month") {
      return monthdata4();
    }
  };
  const getDateString = (date) => {
    return moment(date, "YYYY-MM-DD HH:mm:ss:SSS Z").format(datetype == "Date" ? "DD" : datetype == "Month" ? "MMM" : datetype == "Year" ? "YYYY" : "DD");
  };
  const [activeSections, setActiveSections] = useState([]);
  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
      duration={400}
      style={[styles.header, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor">
      <Text style={styles.headerText1}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
      <Image
        style={{ marginTop: 7, tintColor: "black", marginRight: 60 }}
        source={isActive ? Images.dropdown : Images.Upword}
      ></Image>
    </Animatable.View>
    );
  };
  const renderHeader1 = (section, _, isActive) => {
    return (
      <Animatable.View
      duration={400}
      style={[styles.header, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor">
      <Text style={styles.headerText1}>{moment(section.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}</Text>
      <Image
        style={{ marginTop: 7, tintColor: "black", marginRight: 60 }}
        source={isActive ? Images.dropdown : Images.Upword}
      ></Image>
    </Animatable.View>
    );
  };
  useEffect(() => {
    setCheck(true);
    setCheck1(true);
    setCheck2(true);
    setCheck3(true);
    setCheck4(true);
    calledApis();
  }, [city]);

  // ************* Api's function *******************
  const calledApis = async () => {
    await loadDefaultWasteProcessedData();
    await loadDefaultCollectionTrendData();
    await loadDefaultprocessedsummary();
    await loadDefaultproductsummary();
    await loadDefaultprocessedTrendData();
    await loadDefaultsegregationTrendData();
  };
// ****************** useeffect calendar ******************

  useEffect(() => {
    if (check && !refresh) {
      if (datetype == "Date") {
        postWastedSummaryApi(date, date1, "date");
        CollectiontrendApi(date, date1, "date");
        Segregatedtrendgraph(date, date1, "date");
        Processedtrendgraph(date, date1, "date");
        postWastedProcessedApi(date, date1, "date");
        postproductsummaryapi(date, date1, "date");
      } else if (datetype == "Month") {
        postWastedSummaryApi(value1, value2, "month");
        CollectiontrendApi(value1, value2, "month");
        Segregatedtrendgraph(value1, value2, "month");
        Processedtrendgraph(value1, value2, "month");
        postWastedProcessedApi(value1, value2, "month");
        postproductsummaryapi(value1, value2, "month");
      } else if (datetype == "Year") {
        postWastedSummaryApi(value3, value4, "year");
        CollectiontrendApi(value3, value4, "year");
        Segregatedtrendgraph(value3, value4, "year");
        Processedtrendgraph(value3, value4, "year");
        postWastedProcessedApi(value3, value4, "year");
        postproductsummaryapi(value3, value4, "year");
      }
    }
  }, [datetype, refresh]);

  useEffect(() => {
    if (check1 && !refresh1) {
      if (datetype1 == "Date") {
        historyApi(date3, date4, "date");
      } else if (datetype1 == "Month") {
        historyApi(value5, value6, "month");
      }
    }
  }, [datetype1,refresh1,check1]);

  useEffect(() => {
    if (check2 && !refresh2) {
      if (datetype2 == "Date") {
        collectedWasteLeftMenuApi(date5, date6, "date");
      }
      else if (datetype2 == "Month") {
        collectedWasteLeftMenuApi(value7, value8, "month");
      }
    }
  }, [datetype2,refresh2,check2]);
  useEffect(() => {
    if (check3 && !refresh3) {
      if (datetype3 == "Date") {
        segregationWasteLeftMenuApi(date7, date8, "date");
      }
      else if (datetype3 == "Month") {
        segregationWasteLeftMenuApi(value9, value10, "month");
      }
    }
  }, [datetype3, refresh3, check3]);
  useEffect(() => {
    if (check4 && !refresh4) {
      if (datetype4 == "Date") {
        processedWasteLeftMenuApi(date9, date10, "date");
      }
      else if (datetype4 == "Month") {
        processedWasteLeftMenuApi(value11, value12, "month");
      }
    }
  }, [datetype4, refresh4, check4]);

  useEffect(() => {
    if ((params?.name ?? "") == "History") {
      setShowModal(true);
      loaddefaulthistory();
    } else if ((params?.name ?? "") == "Help Center") {
      setShowModal1(true);
    } else if ((params?.name1 ?? "") == "  Collected") {
      setShowModal2(true);
      loadDefaultCollectionData();
    }
    else if ((params?.name1 ?? "") == "  Segregated") {
      setShowModal3(true);
      loadDefaultSegregationData();
    }
    else if ((params?.name1 ?? "") == "  Processed") {
      setShowModal4(true);
      loadDefaultProcessedData();
    }
  }, [params]);

  // ********************** api's function last 4 days default data **************

  const loadDefaultWasteProcessedData = () => {
    postWastedSummaryApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultprocessedsummary = () => {
    postWastedProcessedApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultCollectionTrendData = () => {
    CollectiontrendApi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultproductsummary = () => {
    postproductsummaryapi(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultprocessedTrendData = () => {
    Processedtrendgraph(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultsegregationTrendData = () => {
    Segregatedtrendgraph(moment(new Date()).subtract(4, 'days'), moment(new Date()), "date");
  };
  const loadDefaultCollectionData = () => {
    collectedWasteLeftMenuApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
  };
  const loadDefaultSegregationData = () => {
    segregationWasteLeftMenuApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
  };
  const loadDefaultProcessedData = () => {
    processedWasteLeftMenuApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
  };
  const loaddefaulthistory = () => {
    historyApi(moment(new Date()).subtract(6, 'days'), moment(new Date()), "date");
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
  // ******************* waste summary api **********************
  // eslint-disable-next-line no-unused-vars
  const postWastedSummaryApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
   
    const params = {start:previousDay,end:time1,siteName:city};
    // @ts-ignore 
    const result = await ApiClient.createApiClient().recycleplasticwastesummary(params);
    // @ts-ignore 
    if (result.status && result.data.status === true) {
      // @ts-ignore 
      setWastedCollected1(result.data.data[0]);
      // @ts-ignore 
      setWastedProcessed1(result.data.data[0]);
      // @ts-ignore 
        }    else {
      setWastedCollected1([]);
      setWastedProcessed1([]);
    }
  };

  // ************** collected waste graph ******************
  // eslint-disable-next-line no-unused-vars
  const CollectiontrendApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().recycleplasticgraphsummary(params);
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
          var totalWeight = 0;
          filterDateArr.forEach(item => {
            totalWeight = totalWeight+ item.totalWeight ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element,totalWeight });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.splitDate) - new Date(b.splitDate);
      });
      setCollectionTrendValue(sortedData);
    }
    else {
      setCollectionTrendValue([]);
    }
  };

   // ************** Processed waste graph ******************
   // eslint-disable-next-line no-unused-vars
   const Processedtrendgraph = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
  
    const result = await ApiClient.createApiClient().recycleplasticprocessedgraph(params);
    console.log("mynewdata",result);
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
          var processedTotalWaste = 0;
          filterDateArr.forEach(item => {
            processedTotalWaste = processedTotalWaste + item.processedTotalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element,processedTotalWaste });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.date) - new Date(b.date);
      });
      setProcessedTrendValue(sortedData);
    }
    else {
      setProcessedTrendValue([]);
    }
  };
   // ************** Segregated waste graph ******************
   // eslint-disable-next-line no-unused-vars
   const Segregatedtrendgraph = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};

    const result = await ApiClient.createApiClient().recycleplasticsegregationgraph(params);
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
          var segregatedWaste = 0;
          filterDateArr.forEach(item => {
            segregatedWaste = segregatedWaste + item.segregatedWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element,segregatedWaste });
        });
      }
      // @ts-ignore
      const sortedData = displayArr.sort((a, b) => {
        // @ts-ignore
        return new Date(a.date) - new Date(b.date);
      });
      setSegregatedTrendValue(sortedData);
    }
    else {
      setSegregatedTrendValue([]);
    }
  };
  // ****************** processed summary *******************
  // eslint-disable-next-line no-unused-vars
  const postWastedProcessedApi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};

    const result = await ApiClient.createApiClient().recycleprocessedsummary(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      const rdf = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(rdf).map(([key, value]) => {
        return {
          title: key,
          value: value,
        };
      }).filter(item => item.value !== 0);
      // @ts-ignore
      setRdf(catalogue);
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
      console.log("Array2", array2);
      setArray(array2);
    }
    else {
      setRdf([]);
    }
  };
  // ******************* product summary  ********************
  // eslint-disable-next-line no-unused-vars
  const postproductsummaryapi = async (date, date1, date2) => {
    var previousDay = (moment(date).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date1).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().recycleproductsummary(params);
    // @ts-ignore
    if (result.status && result.data.status === false) {
      // @ts-ignore
      const rdf1 = result.data.data[0];
      //@ts-ignore
      const catalogue = Object.entries(rdf1).map(([key, value]) => {
        return {
          title: key,
          value: value,
        };
      }).filter(item => item.value !== 0);
      // @ts-ignore
      setRdf1(catalogue);
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
      console.log("Array2", array2);
      setArray1(array2);
    }
    else {
      setRdf1([]);
    }
  };
  // ******************* Navbar Segregated Api  ********************
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuApi = async (date5, date6, date2) => {
    var previousDay = (moment(date5).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date6).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().businessHeadCollection(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setCollectedLeftMenuValue(arr);
      }
    }
    else {
      setCollectedLeftMenuValue([]);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuDownloadApi = async (date5, date6, date2) => {
    var previousDay = (moment(date5).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date6).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};

    const result = await ApiClient.createApiClient().businessHeadCollection(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Weight": d?.totalWeight,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuCollectionPermissionDownload(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const collectedWasteLeftMenuSharingApi = async (date5, date6, date2) => {
    var previousDay = (moment(date5).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date6).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};

    const result = await ApiClient.createApiClient().businessHeadCollection(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Weight": d?.totalWeight,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuCollectionPermissionSharing(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const segregationWasteLeftMenuApi = async (date7, date8, date2) => {
    var previousDay = (moment(date7).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date8).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
   
    const result = await ApiClient.createApiClient().businessHeadSegregation(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setSegregationLeftMenuValue(arr);
      }
    }
    else {
      setSegregationLeftMenuValue([]);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const segregationWasteLeftMenuDownloadingApi = async (date7, date8, date2) => {
    var previousDay = (moment(date7).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date8).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
  
    const result = await ApiClient.createApiClient().businessHeadSegregation(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Hdpe Waste": d?.hdpeWaste,
            "Ldpe Waste": d?.ldpeWaste,
            "Pet Waste": d?.petWaste,
            "Pp Waste": d?.ppWaste,
            "Other Waste": d?.otherWaste,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuSegregationPermissionDownload(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const segregationWasteLeftMenuSharingApi = async (date7, date8, date2) => {
    var previousDay = (moment(date7).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date8).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().businessHeadSegregation(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Hdpe Waste": d?.hdpeWaste,
            "Ldpe Waste": d?.ldpeWaste,
            "Pet Waste": d?.petWaste,
            "Pp Waste": d?.ppWaste,
            "Other Waste": d?.otherWaste,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuSegregationPermissionSharing(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const processedWasteLeftMenuApi = async (date9, date10, date2) => {
    var previousDay = (moment(date9).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date10).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().businessHeadProcessed(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        setProcessedLeftMenuValue(arr);
      }
    }
    else {
      setProcessedLeftMenuValue([]);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const processedWasteLeftMenuDownloadingApi = async (date9, date10, date2) => {
    var previousDay = (moment(date9).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date10).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().businessHeadProcessed(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Processed Total Waste": d?.processedTotalWaste,
            "Regrinds": d?.regrinds,
            "Granules": d?.granules,
            "Bags": d?.bags,
            "Bales": d?.bales,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuProcessedPermissionDownload(printArr);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const processedWasteLeftMenuSharingApi = async (date9, date10, date2) => {
    var previousDay = (moment(date9).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date10).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().businessHeadProcessed(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Processed Total Waste": d?.processedTotalWaste,
            "Regrinds": d?.regrinds,
            "Granules": d?.granules,
            "Bags": d?.bags,
            "Bales": d?.bales,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        leftMenuProcessedPermissionSharing(printArr);
      }
    }
  };

  // *******************Sharing And Download Methods**********************
  const exportCollectionDataToExcelDownload = (downloadCollectionData) => {

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadCollectionData);
    XLSX.utils.book_append_sheet(wb, ws, "Collection Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_head_collection_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
        ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
        Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  const exportCollectionDataToExcelSharing = (sharingCollectionData) => {

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingCollectionData);
    XLSX.utils.book_append_sheet(wb, ws, "Collection Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_head_collection_data_sharing.xlsx', wbout, 'ascii').then(() => {
    }).catch((e) => {
      console.log('Error', e);
    });
    shareCollectionExcel();
  };
  const leftMenuCollectionPermissionDownload = async (downloadCollectionData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportCollectionDataToExcelDownload(downloadCollectionData);
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
          exportCollectionDataToExcelDownload(downloadCollectionData);
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
  const leftMenuCollectionPermissionSharing = async (sharingCollectionData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportCollectionDataToExcelSharing(sharingCollectionData);
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
          exportCollectionDataToExcelSharing(sharingCollectionData);
        } else {
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        console.log("++++" + err);
      }
    }
  };
  const shareCollectionExcel = async () => {
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    const dir = path + '/recycle_plastic_business_head_collection_data_sharing.xlsx';
    const options = {
      url: Platform.OS === 'android' ? `file://${dir}` : dir,
      message: 'Sharing File', // By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
    RNFS.unlink(dir)
    .then(() => {
      console.log("File Is Deleted");
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
  };
  const exportSegregationDataToExcelDownload = (downloadSegregationData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadSegregationData);
    XLSX.utils.book_append_sheet(wb, ws, "Segregation Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_head_segregation_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
        ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
        Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  const exportSegregationDataToExcelSharing = (sharingSegregationData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingSegregationData);
    XLSX.utils.book_append_sheet(wb, ws, "Segregation Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_head_segregation_data_sharing.xlsx', wbout, 'ascii').then(() => {
    }).catch((e) => {
      console.log('Error', e);
    });
    shareSegregationExcel();
  };
  const leftMenuSegregationPermissionDownload = async (downloadSegregationData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportSegregationDataToExcelDownload(downloadSegregationData);
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
          exportSegregationDataToExcelDownload(downloadSegregationData);
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
  const leftMenuSegregationPermissionSharing = async (sharingSegregationData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportSegregationDataToExcelSharing(sharingSegregationData);
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
          exportSegregationDataToExcelSharing(sharingSegregationData);
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
  const shareSegregationExcel = async () => {
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    const dir = path + '/recycle_plastic_business_head_segregation_data_sharing.xlsx';
    const options = {
      url: Platform.OS === 'android' ? `file://${dir}` : dir,
      message: 'Sharing File',// By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
    RNFS.unlink(dir)
    .then(() => {
      console.log("File Is Deleted");
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
  };
  const exportProcessedDataToExcelDownload = (downloadProcessedData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadProcessedData);
    XLSX.utils.book_append_sheet(wb, ws, "Processed Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_head_processed_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
        ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
        Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  const exportProcessedDataToExcelSharing = (sharingProcessedData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sharingProcessedData);
    XLSX.utils.book_append_sheet(wb, ws, "Processed Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_head_processed_data_sharing.xlsx', wbout, 'ascii').then(() => {
    }).catch((e) => {
      console.log('Error', e);
    });
    shareProcessedExcel();
  };
  const leftMenuProcessedPermissionDownload = async (downloadProcessedData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportProcessedDataToExcelDownload(downloadProcessedData);
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
          exportProcessedDataToExcelDownload(downloadProcessedData);
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
  const leftMenuProcessedPermissionSharing = async (sharingProcessedData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exportProcessedDataToExcelSharing(sharingProcessedData);
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
          exportProcessedDataToExcelSharing(sharingProcessedData);
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
  const shareProcessedExcel = async () => {
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    const dir = path + '/recycle_plastic_business_head_processed_data_sharing.xlsx';
    const options = {
      url: Platform.OS === 'android' ? `file://${dir}` : dir,
      message: 'Sharing File' ,// By omitting the message, whatsapp shows the image
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
    RNFS.unlink(dir)
    .then(() => {
      console.log("File Is Deleted");
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
  };
  //*************** History Api *****************/
  // eslint-disable-next-line no-unused-vars
  const historyApi = async (date3, date4, date2) => {
    var previousDay = (moment(date3).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date4).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
   const params = {start:previousDay,end:time1,siteName:city};
    const result = await ApiClient.createApiClient().businessheadHistory(params);
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
  //************ history download api *************/
  // eslint-disable-next-line no-unused-vars
  const historyDownloadApi = async (date3, date4, date2) => {
    var previousDay = (moment(date3).format('YYYY-MM-DD 00:00:00:000')) + " " + `Z`;
    var time1 = (moment(date4).format('YYYY-MM-DD 23:59:00:000')) + " " + `Z`;
    const params = {start:previousDay,end:time1,siteName:city};

    const result = await ApiClient.createApiClient().businessheadHistory(params);
    // @ts-ignore
    if (result.status && result.data.status === true) {
      // @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        // @ts-ignore
        const arr = (result?.data?.data ?? []);
        let printArr = arr.map((d) => {
          let printObj = {
            "Date": moment(d?.splitDate).format("DD/MM/YYYY"),
            "Total Weight": d?.totalWeight,
            "Processed Total Waste": d?.processedTotalWaste,
            "Regrinds": d?.regrinds,
            "Granules": d?.granules,
            "Bags": d?.bags,
            "Bales": d?.bales,
            "Hdpe Waste": d?.hdpeWaste,
            "Ldpe Waste": d?.ldpeWaste,
            "Pet Waste": d?.petWaste,
            "Pp Waste": d?.ppWaste,
            "Other Waste": d?.otherWaste,
            "Site Name": d?.siteName[0]?.siteName,
          };
          return printObj;
        });
        historyPermissionDownload(printArr);
      }
    }
  };
  // *****************Download Methods*****************
  const historyPermissionDownload = async (downloadHistoryData) => {
    const isIOS = Platform.OS === "ios";
    if (isIOS) {
      exporthistoryDataToExcelDownload(downloadHistoryData);
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
          exporthistoryDataToExcelDownload(downloadHistoryData);
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
  const exporthistoryDataToExcelDownload = (downloadHistoryData) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadHistoryData);
    XLSX.utils.book_append_sheet(wb, ws, "History Data");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    // Write generated excel to Storage
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
    RNFS.writeFile(path + '/recycle_plastic_business_history_data_' + new Date().getTime() + '.xlsx', wbout, 'ascii').then(() => {
      {
        Platform.OS === 'android' ?
        ToastAndroid.showWithGravityAndOffset("Excel File Is Downloaded Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) :
        Alert.alert("Excel File Is Downloaded Successfully");
      }
    }).catch((e) => {
      console.log('Error', e);
    });
  };
  const loadDefaultCollectionDownloadData = () => {
    if (datetype2 == "Date") {
      collectedWasteLeftMenuDownloadApi(date5, date6, "date");
    } else if (datetype2 == "Month") {
      collectedWasteLeftMenuDownloadApi(value7, value8, "month");
    } else {
      collectedWasteLeftMenuDownloadApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultSegregationDownloadData = () => {
    if (datetype3 == "Date") {
      segregationWasteLeftMenuDownloadingApi(date5, date6, "date");
    } else if (datetype3 == "Month") {
      segregationWasteLeftMenuDownloadingApi(value7, value8, "month");
    } else {
      segregationWasteLeftMenuDownloadingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultProcessedDownloadData = () => {
    if (datetype4 == "Date") {
      processedWasteLeftMenuDownloadingApi(date5, date6, "date");
    } else if (datetype4 == "Month") {
      processedWasteLeftMenuDownloadingApi(value7, value8, "month");
    } else {
      processedWasteLeftMenuDownloadingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultCollectionSharingData = () => {
    if (datetype2 == "Date") {
      collectedWasteLeftMenuSharingApi(date5, date6, "date");
    } else if (datetype2 == "Month") {
      collectedWasteLeftMenuSharingApi(value7, value8, "month");
    } else {
      collectedWasteLeftMenuSharingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultSegregationSharingData = () => {
    if (datetype3 == "Date") {
      segregationWasteLeftMenuSharingApi(date5, date6, "date");
    } else if (datetype3 == "Month") {
      segregationWasteLeftMenuSharingApi(value7, value8, "month");
    } else {
      segregationWasteLeftMenuSharingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };
  const loadDefaultProcessedSharingData = () => {
    if (datetype4 == "Date") {
      processedWasteLeftMenuSharingApi(date5, date6, "date");
    } else if (datetype4 == "Month") {
      processedWasteLeftMenuSharingApi(value7, value8, "month");
    } else {
      processedWasteLeftMenuSharingApi(moment(new Date()).subtract(29, 'days'), moment(new Date()), "date");
    }
  };

  const distributeClearCalender = () => {
    setDate9(""), setDate10(""), setValue11(""), setValue12(""), setSelected6("away"),
      setBirth5([
        { name: "Date", isSelected: true },
        { name: "Month", isSelected: false },
      ]), setFilter5("Date"),setRefresh4(true);
  };
  // @ts-ignore
const maxdata = Math.max(...collectiontrendvalue.map(o => o.totalWeight));
// @ts-ignore
const maxdata1 = Math.max(...processedtrendvalue.map(o => o.processedTotalWaste));
// @ts-ignore
const maxdata2 = Math.max(...segregatedtrendvalue.map(o => o.segregatedWaste));
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
  const renderContent1 = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.contentCollection, isActive ? styles.activee : styles.inactivee]}
        transition="backgroundColor"
      >
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

  const renderContent2 = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.contentProcessing, isActive ? styles.activee : styles.inactivee]}
        transition="backgroundColor"
      >
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

  const renderContent3 = (section, _, isActive) => {
    return (
      <ScrollView>
        <Animatable.View
          duration={400}
          style={[styles.contentDistribute, isActive ? styles.activee : styles.inactivee]}
          transition="backgroundColor"
        >
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
      </ScrollView>
    );
  };
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
          <View style={styles.modalHistoryView1}>
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
              <TouchableOpacity onPress={() => {setModalVisible1(!modalVisible1),clearHistoryCalender();}} >
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
      </Modal>
    );
  };
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
                }}
              >
                <Image source={Images.backarrow} style={styles.helpCenterBackImage} />
              </TouchableOpacity>
              <View style={styles.helpCenterView}  >
                <ModalHeader title={"Help Center"} />
              </View>
            </View>
            <ScrollView>
              <View style={styles.secondHelpCenterView}>
                <TouchableOpacity onPress={() => { setisSelected2(!isSelected2), helpcentercontactus();}}
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
                  <TouchableOpacity onPress={() => { setisSelectedd(!isSelectedd), helpcenterfaqs();}}
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
  const clientCollected = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal2}
        onRequestClose={() => {
          setShowModal2(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalHistoryView1}>
            <View style={styles.segregationCollectedView} >
              <TouchableOpacity
                onPress={() => {
                  setShowModal2(false);
                  setActiveSections([]);
                }}
              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />
              </TouchableOpacity>
              <Text style={styles.segregationCollectedText} >Collected</Text>
            </View>
            <View style={styles.segregationCollectedView1}>
              <View
                style={styles.segregationCollectedView2}
              >
                <TouchableOpacity onPress={() => {setModalVisible2(!modalVisible2),collectedClearCalender();}}>
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultCollectionSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultCollectionDownloadData()}>
                  <Image
                    style={styles.segregatedCollectedDownload}
                    source={Images.download}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={collectedLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent1}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calendarmodal2()}
      </Modal>
    );
  };
  const clientSegregated = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal3}
        onRequestClose={() => {
          setShowModal3(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalHistoryView1}>
            <View style={styles.segregationCollectedView} >
              <TouchableOpacity
                onPress={() => {
                  setShowModal3(false);
                  setActiveSections([]);
                }}
              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />
              </TouchableOpacity>
              <Text style={styles.segregationCollectedText} >Segregated</Text>
            </View>
            <View style={styles.segregationCollectedView1}>
              <View
                style={styles.segregationCollectedView2}
              >
                <TouchableOpacity onPress={() => {setModalVisible3(!modalVisible3),processedClearCalender();}}>
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultSegregationSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => loadDefaultSegregationDownloadData()}>
                  <Image
                    style={styles.segregatedCollectedDownload}
                    source={Images.download}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={segregationLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent2}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calendermodal3()}
      </Modal>
    );
  };
  const clientProcessed = () => {
    return (
      <Modal
        style={{ zIndex: 10 }}
        animationType="slide"
        transparent={true}
        visible={showModal4}
        onRequestClose={() => {
          setShowModal4(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalHistoryView1}>
            <View style={styles.segregationCollectedView} >
              <TouchableOpacity
                onPress={() => {
                  setShowModal4(false);
                  setActiveSections([]);
                }}
              >
                <Image
                  source={Images.back1}
                  style={styles.segregationCollectedImage}
                />
              </TouchableOpacity>
              <Text style={styles.segregationCollectedText} >Processed</Text>
            </View>
            <View style={styles.segregationCollectedView1}>
              <View
                style={styles.segregationCollectedView2}
              >
                <TouchableOpacity onPress={() => {setModalVisible4(!modalVisible4),distributeClearCalender();}}>
                  <Image
                    source={Images.calender1}
                    style={styles.segregationCollectedCalender}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultProcessedSharingData()}>
                  <Image
                    style={styles.segregatedCollectedShare}
                    source={Images.share}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadDefaultProcessedDownloadData()}>
                  <Image
                    style={styles.segregatedCollectedDownload}
                    source={Images.download}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                  activeSections={activeSections}
                  sections={processedLeftMenuValue}
                  touchableComponent={TouchableOpacity}
                  renderHeader={renderHeader1}
                  renderContent={renderContent3}
                  duration={400}
                  onChange={setSections}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {calendermodal4()}
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <NavHeader business="Dashboard" centerComponent isRightAction={true} plastic={city} setPlastic={setCity}/>
      <ScrollView>
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <Text style={[styles.collectionTrendtext, { right: 5 }]}>Waste Summary</Text>
              <View style={[styles.yeardropdownview]}>
                <View
                  style={styles.calenderView}
                >
                  <TouchableOpacity onPress={() => {setModalVisible(true),clearWasteSummaryCalender();}}>
                    <Image
                      source={Images.calender1}
                      style={styles.calenderImage}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.wasteCollectedProcessedBoxView}>
              <View style={styles.wasteCollectedProcessedBoxView1}>
                <Text style={styles.wasteCollectedProcessedBoxText}>Waste Collected</Text>
                {/* @ts-ignore */}
                <Text style={styles.wasteCollectedProcessedBoxText1}>{wastedcollected1 && wastedcollected1.wasteCollected}{" "}MT</Text>
              </View>
              <View style={[styles.wasteCollectedProcessedBoxView1,{marginLeft:20}]}>
                <Text style={styles.wasteCollectedProcessedBoxText}>Waste Processed</Text>
                {/* @ts-ignore */}
                <Text style={styles.wasteCollectedProcessedBoxText1}>{wastedprocessed1 && wastedprocessed1.wasteProcessed}{" "}MT</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.SecondContainer1}>
          <Swiper showsPagination={true}
            autoplay={false}
            paginationStyle={styles.swiperCollection}
            dotColor="gray" activeDotColor="red">
            <View>
              <View style={styles.SecondcardContainer1}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Collected Trend</Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                {collectiontrendvalue.length > 0 ? <VictoryChart
                    width={width / 0.99}
                    height={height / 3.5}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: collectiontrendvalue.length < 3 ? 160 : collectiontrendvalue.length < 5 ? 85 : 8 }}
                    domain={{ y: [0, Math.ceil(maxdata / 100) * datarefresh || 10] }}
                  >
                    <VictoryAxis
                      fixLabelOverlap={false}
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
                      data={collectiontrendvalue}
                      barWidth={8}
                      x="splitDate"
                      y="totalWeight"
                    />
                  </VictoryChart> : <View style={{ height: height / 4.3, width: width / 1.06, justifyContent: "center", alignItems: "center" }}><Text style={{ textAlign: "center", fontSize: 18, color: "#2D2D2D" }}>{'Data is not found.'}</Text></View>}
                </View>
                <View style={styles.secondThreecardmaibView}>
                  <View style={styles.weightinmeticview}>
                    <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.SecondcardContainer1}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Segregation Trend</Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                  {segregatedtrendvalue.length > 0 ? <VictoryChart
                    width={width / 0.99}
                    height={height / 3.5}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: segregatedtrendvalue.length < 3 ? 160 : segregatedtrendvalue.length < 5 ? 85 : 8 }}
                    domain={{ y: [0, Math.ceil(maxdata2 / 100) * datarefresh2|| 10] }}
                  >
                    <VictoryAxis
                      fixLabelOverlap={false}
                      tickFormat={t => getDateString(t)}
                      tickLabelComponent={<VictoryLabel />}
                      style={{ tickLabels: { fontSize: 10 } }}
                    />
                    <VictoryAxis
                      dependentAxis={true}
                      tickLabelComponent={<VictoryLabel />}
                    />
                    <VictoryBar
                      barRatio={0.7}
                      style={{ data: { fill: "#E87818" } }}
                      data={segregatedtrendvalue}
                      barWidth={8}
                      x="date"
                      y="segregatedWaste"
                    />
                  </VictoryChart> :
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
                <View style={styles.secondThreecardmaibView}>
                  <View style={styles.weightinmeticview}>
                    <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.SecondcardContainer1}>
                <View style={styles.SecondfirstcardmainView}>
                  <View style={styles.collectiontrendview}>
                    <Text style={styles.collectionTrendtext}>Processed Trend</Text>
                  </View>
                </View>
                <View style={styles.secondTwocardmainView}>
                {processedtrendvalue.length > 0 ? 
                <VictoryChart
                    width={width / 0.99}
                    height={height / 3.5}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: processedtrendvalue.length < 3 ? 160 : processedtrendvalue.length < 5 ? 85 : 8 }}
                    domain={{ y: [0, Math.ceil(maxdata1 / 100) * datarefresh1 || 10] }}
                  >
                    <VictoryAxis
                      fixLabelOverlap={false}
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
                      barWidth={8}
                      style={{ data: { fill: "#E87818" } }}
                      data={processedtrendvalue}
                      x="date"
                      y="processedTotalWaste"
                    />
                  </VictoryChart>:
                    <View style={styles.detailsNotFoundView}>
                      <Text style={styles.detailsNotFoundText}>{'Data Is Not Found.'}</Text>
                    </View>}
                </View>
                <View style={styles.secondThreecardmaibView}>
                  <View style={styles.weightinmeticview}>
                    <Text style={styles.weightmeticText}>Weight in Metric Ton</Text>
                  </View>
                </View>
              </View>
            </View>
          </Swiper>
        </View>
        <View style={styles.ThirdContainer}>
          <View style={styles.ThirdcardContainer}>
          <View style={styles.thirdcardFirstOneView}>
              <Text style={[styles.collectionTrendtext, { left: 3 }]}>Processed Summary</Text>
            </View>
                 {rdf.length>0 ?<View style={styles.newdata}>
                  <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor='red'
                  paginationDefaultColor='grey'
                  showPagination={true}
                  paginationStyle={{ top:140 }}
                  paginationStyleItem={{ width: 8, height: 8 ,marginLeft:-4}}
                  data={array}
                  // @ts-ignore
                  keyExtractor={(item, index) => index}
                  renderItem={({ item}) => {
                    return (
                      <>
                        {item[0]?.title && <View style={styles.flatlistmainview}>
                          <Text style={styles.swiperFlatlistText123}>{item[0]?.title.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}</Text>
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
             </View>:<View style={{ height: height / 14, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 18, color: "#2D2D2D"}}>{'Data Is Not Found.'}</Text>
                </View>}
          </View>
        </View>
        <View style={[styles.ThirdContainer,{marginTop:40,marginBottom:50}]}>
          <View style={styles.ThirdcardContainer}>
            <View style={styles.thirdcardFirstOneView}>
              <Text style={[styles.collectionTrendtext, { left: 3 }]}>Product Summary</Text>
            </View>
            {rdf1.length>0 ?<View style={styles.newdata}>
                  <SwiperFlatList
                  autoplay={false}
                  paginationActiveColor='red'
                  paginationDefaultColor='grey'
                  showPagination={true}
                  paginationStyle={{ top:140 }}
                  paginationStyleItem={{ width: 8, height: 8 ,marginLeft:-4}}
                  data={array1}
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
             </View>:<View style={{ height: height / 14, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ textAlign: "center", fontSize: 18, color: "#2D2D2D"}}>{'Data Is Not Found.'}</Text>
                </View>}
          </View>
        </View>
     
      </ScrollView>
      {calendarmodal()}
      {calendermodal1()}
      {clientCollected()}
      {clientSegregated()}
      {clientProcessed()}
      {client4()}
      {client5()}
    </View>
  );
};

export default withConnect(DashboardBusinessHead);

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
    marginLeft: 10,
  },
  SecondContainer1: {
    height: height / 2.3,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:25,
  },
  SecondcardContainer1: {
    height: height / 2.5,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    marginLeft: 10,
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
    height: height / 3.9,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
  },
  ThirdcardContainer: {
    height: height / 4,
    backgroundColor: "#F8F8F8",
    width: width / 1.06,
    borderRadius: 10,
  },
  thirdcardFirstOneView: {
    height: height / 16,
    width: width / 1.13,
   marginTop:10,
  },
  card1headingtext: {
    fontSize: 12,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
  },
  contentCollection: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
    marginLeft:15,
  },
  collectiontrendview: {
    height: height / 16,
    justifyContent: "center",
    alignItems: "center",
  },
  contentProcessing: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
    marginLeft:15,
  },
  contentDistribute: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
    marginLeft:15,
  },
  collectionTrendtext: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E41F45",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    marginLeft: 10,
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
  newdata:{height:height/6,width:width/1.06},
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
    top: 10,
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
    marginHorizontal: 6,
  },
  headerText: {
    color: '#606060',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
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
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  secondHelpCenterView: {
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
    height: height / 1,
    top: height * 0.16,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  modalHistoryView1: {
    height: height / 1.15,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "rgba(255, 255, 255, 0.8)",
  },
  connectView: {
    height: height / 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textinputView: {
    width: width / 1.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imgView: {
    height: height / 25,
    width: width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quesText: {
    color: '#606060',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  secureInput: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 10,
  },
  ans: {
    height: height / 20,
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
  helpCenterBackImage: {
    marginLeft: 30, marginTop: 25,
  },
  helpCenterDownImage: {
    tintColor: "black",
    marginRight: 14,
  },
  helpCenterView: {
    marginLeft: 60, marginTop: 10,
  },
  helpCenterView1: {
  },
  helpCenterCallImage: {
    height: 13, width: 10,
    marginLeft: -75,
  },
  helpCenterFaqDownImage: {
    height: 10,
    tintColor: "black",
    marginRight: 18,
  },
  helpCenterFaqDownImage1: {
    height: 10,
    tintColor: "black",
    marginLeft: -75,
  },
  helpCenterFaqView: {
    marginBottom: 30,
  },
  contactUsTouchableOpcacity: {
    borderRadius: 10,
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
    top: 10,
    justifyContent: "center",
  },
  calenderflatlistview6: {
    height: height / 25,
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
  card1headingtext1: {
    fontSize: 13,
    padding: 4,
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
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
  client4image: {
    height: 24,
    width: 24,
    marginLeft: 274,
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
  segregationCollectedView: {
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: 20,
  },
  segregationCollectedImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
  segregationCollectedText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
    marginTop: 2,
  },
  segregationCollectedView1: {
    width: width / 1,
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
  },
  segregationCollectedView2: {
    width: width / 1.3,
    height: height / 28,
    alignItems: "flex-end",
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '63%',
  },
  segregationCollectedCalender: {
    height: 23,
    width: 23,
    alignItems: "center",
    justifyContent: "center",
    top: 2,
  },
  segregatedCollectedShare: {
    height: 15,
    width: 14,
    marginLeft: 10,
    marginRight: 14,
    tintColor: "black",
  },
  segregatedCollectedDownload: {
    height: 18,
    width: 20,
    marginRight: 10,
    tintColor: "black",
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
  mainreturnview8: {
    marginLeft: 150,
  },
  detailsNotFoundView: {
    height: height / 14,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsNotFoundText: {
    textAlign: "center",
    fontSize: 18,
    color: "#2D2D2D",
    marginLeft:100,
  },
  segregationTitleText: {
    textAlign: 'center',
    marginLeft: 10,
  },
  segregationTitleValue: {
    textAlign: 'center',
    marginRight: 20,
  },
  wasteCollectedProcessedBoxView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
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
    backgroundColor: '#D0FAE9',
    borderColor: "#A2DEC6",
  },
  flatlistmainview1: {
    width: width / 3.35,
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
    width: width / 3.35,
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
    width: width / 3.35,
    margin: 3,
    alignItems: "center",
    height: height / 8.5,
    marginTop: 10,
  },
  swiperFlatlistText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    textAlign:"center",
  },
  swiperFlatlistText123: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
    textAlign:"center",
  },
  swiperFlatlistText1: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
  },
  wasteCollectedProcessedBoxView1: {
    height: height / 7,
    width: width / 2.5,
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
    fontWeight: '600',
  },
  wasteCollectedProcessedBoxText1: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    marginTop: 5,
  },
  wasteCollectedProcessedBoxView2: {
    height: height / 9,
    width: width / 2.7,
    borderColor: "#D0BDE7",
    borderWidth: 2,
    backgroundColor: "#F1E5FF",
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  wasteCollectedProcessedBoxText2: {
    fontSize: responsiveFontSize(2),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    marginTop: 10,
  },
  processedSummaryView: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#A2DEC6",
    borderWidth: 2,
    backgroundColor: "#D0FAE9",
    marginRight: 5,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryView1: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#D0BDE7",
    marginRight: 5,
    borderWidth: 2,
    backgroundColor: "#F1E5FF",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryView2: {
    height: height / 9,
    width: width / 3.4,
    borderColor: "#BEDEEA",
    borderWidth: 2,
    backgroundColor: "#E5F8FF",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  processedSummaryText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    marginTop: 25,
    color: "#2D2D2D",
    fontWeight: '600',
  },
  processedSummaryText1: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    color: "#2D2D2D",
    fontWeight: '700',
    marginTop: 5,
  },
  historyHeaderComponent: {
    marginTop: 7,
    tintColor: "black",
    marginRight: 1,
  },
  calenderView: {
    height: height / 21,
    width: width / 3.3,
    justifyContent: "center",
    alignItems: "flex-end",
    left:160,
    top:-30,
  },
  calenderImage: {
    height: 33,
    width: 33,
  
  },
  recycleView: {
    height: height / 3.4,
    width: width / 1.06,
  },
  swiperCollection: {
    position: 'absolute',
    top: height / 2.5,
    right: 10,
    bottom: 0,
    left: 0,
  },
  swiperRecyclables: {
    position: 'absolute',
    top: height / 2,
    right: 10,
    bottom: 0,
    left: 0,
  },
  contentHistory: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    width: width / 1.15,
    marginLeft:15,
  },
});
