import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import withConnect from "../../../MSW/PDuser/Dashboard/withConnect";
import ApiClient from "../../../../Network";
import moment from "moment";
import { FONT_FAMILIES } from "../../../../Configration";
const { height, width } = Dimensions.get("screen");

const Recyclables = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [distributionvalue, setDistributionValue] = useState([]);

  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getRecyclablesApi();
  };
// ******************************* Recyclables API ************************************
  const getRecyclablesApi = async () => {
    const params = { siteName:location };
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
          arr.map((item) =>moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
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
      setDistributionValue(displayArr);
    }
  };
// *********************** Distribution API ******************************

  return (
    <View>
      {distributionvalue &&
      // @ts-ignore
        distributionvalue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
          return (
            <View style={styles.item} key={item}>
              <View style={styles.mainmapview}>
                <Text style={styles.mainmaptext}>
                {/* @ts-ignore */}
                  {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.mainmapview2}>
              {/* @ts-ignore */}
                <Text style={styles.mainmaptext}>{item.totalRecyclable}</Text>
              </View>
              <View style={styles.mainmapview1}>
              {/* @ts-ignore */}
                <Text  style={[styles.mainmaptext,{left:9}]}>{item.totalPlastics}</Text>
              </View>
              <View style={styles.mainmapview3}>
              {/* @ts-ignore */}
                <Text style={[styles.mainmaptext,{left:8}]}>{item.totalBags}</Text>
              </View>
              <View style={styles.mainmapview4}>
                <Text style={[styles.mainmaptext, {left:5 }]}>
                {/* @ts-ignore */}
                  {item.totalGlass}
                </Text>
              </View>
              <View style={styles.mainmapview5}>
              {/* @ts-ignore */}
                <Text style={styles.mainmaptext}>{item.totalCardboard}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default withConnect(Recyclables);

const styles = StyleSheet.create({
  item: {
    
    // marginTop:7,
    // top:3,
    width: width / 1.1,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height:Platform.OS ==='ios'?height / 25: height / 23,
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
  mainview2: {
    height: height / 17,
    width: width / 6,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  maintext: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    color: "#606060",
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
    height: height / 12,
    width: width / 4.75,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmaptext: { fontSize: 11, fontWeight: "700", color: "#2D2D2D" },
  mainmapview1: {
    flex: 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview2: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview3: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview4: {
    flex:0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview5: {
    flex: 0.62,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview6: {
  },
});
