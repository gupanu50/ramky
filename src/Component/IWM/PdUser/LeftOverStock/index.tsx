import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import withConnect from "./withConnect";
import ApiClient from '../../../../Network';
import _ from 'lodash';
import moment from "moment";
import Loader from "../../../../ReuableComponent/Loader";
import { FONT_FAMILIES } from "../../../../Configration";
const { height, width } = Dimensions.get("screen");

const LeftOverStock = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [distributevalue, setDistributeValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getLeftOverStockApi();
  };
  // ******************************GET Api********************
  const getLeftOverStockApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().IMWleftoverstockdashboard(params);

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
      setDistributeValue(displayArr);
    }

    setLoading(false);
  };
  return (
    <View >
      {/* @ts-ignore */}
      {distributevalue && distributevalue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View style={styles.mainmapview} >
            {Platform.OS === 'ios' ?  <Text style={[styles.mainmaptextdate, { left: -5 }]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>:
              <Text style={[styles.mainmaptextdate, { left: -6 }]}>
              {/* @ts-ignore */}
              {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
            </Text>
              }
            </View>
            <View
              style={styles.mainmapview2}
            >
             {Platform.OS === 'ios' ? <Text style={[styles.mainmaptext, { right:8 }]}>
                {/* @ts-ignore */}
                {item.stockTotalWaste}
              </Text>:<Text style={[styles.mainmaptext, { left: -10 }]}>
                {/* @ts-ignore */}
                {item.stockTotalWaste}
              </Text>}
            </View>

              <View style={styles.mainmapview1}>
              {Platform.OS === 'ios' ?  <Text style={[styles.mainmaptext]}>
                {/* @ts-ignore */}
                {item.stockDlf}
              </Text>:<Text style={[styles.mainmaptext, { left: -3 }]}>
                {/* @ts-ignore */}
                {item.stockDlf}
              </Text>}
            </View>

            <View style={styles.mainmapview3} >
             { Platform.OS === 'ios' ? <Text style={[styles.mainmaptext, { right:7 }]}>
                {/* @ts-ignore */}
                {item.stockLat}
              </Text>:<Text style={[styles.mainmaptext, { left: -7 }]}>
                {/* @ts-ignore */}
                {item.stockLat}
              </Text>}
            </View>

            <View style={styles.mainmapview5}>
             {Platform.OS === 'ios' ?  <Text style={[styles.mainmaptext, { left: -16 }]}>
                {/* @ts-ignore */}
                {item.stockAfrf}
              </Text> :  <Text style={[styles.mainmaptext, { left: -4 }]}>
                {/* @ts-ignore */}
                {item.stockAfrf}
              </Text>}
            </View>

            <View style={styles.mainmapview4}>
             { Platform.OS === 'ios' ? <Text style={[styles.mainmaptext, { marginRight: 21 }]}>
                {/* @ts-ignore */}
                {item.stockIncineration}
              </Text> :<Text style={[styles.mainmaptext, { marginRight: 13 }]}>
                {/* @ts-ignore */}
                {item.stockIncineration}
              </Text>}
            </View>
          </View>
        );
      })
      }
      {isLoading && <Loader />}
    </View>
  );
};

export default withConnect(LeftOverStock);

const styles = StyleSheet.create({
  item: {
    width: width / 1.1,
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height / 23,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  mainview: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 3.5,
  },
  mainview1: {
    height: height / 17,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  maintext: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
  },
  maintext1: { fontSize: 12, fontWeight: "800" },
  mainview2: {
    height: height / 17,
    width: width / 6,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",

  },
  mainview3: {
    height: height / 17,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",

  },
  mainview4: {
    height: height / 17,
    width: width / 7,
    justifyContent: "center",
    marginRight: 5,
    alignItems: "center",

  },
  mainview5: {
    height: height / 17,
    width: width / 8,
    marginLeft: 5,
    justifyContent: "center",
  },
  mainview6: {
    height: height / 17,
    width: width / 7.5,
    justifyContent: "center",
    marginRight: 5,
  },
  mainview7: {
    height: height / 17,
    width: width / 5.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

  },
  mainmapview: {
  },
  mainmaptext: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  mainmaptextdate: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
    marginLeft: 10,
  },
  mainmapview1: {
    flex: 0.53,
    justifyContent: "center",
    alignItems: "center",

  },
  mainmapview2: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",

  },
  mainmapview3: {
    flex: 0.55,
    justifyContent: "center",
    alignItems: "center",

  },
  mainmapview5: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",

  },
  mainmapview4: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",

  },
});
