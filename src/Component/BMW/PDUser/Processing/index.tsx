import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { FONT_FAMILIES } from "../../../../Configration";
import _ from "lodash";
import ApiClient from "../../../../Network";
import withConnect from "./withConnect";
import moment from "moment";
const { height, width } = Dimensions.get("screen");

const Processing = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [sortingValue, setSortingValue] = useState([]);
  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getProcessingApi();
  };
  // ******************** Processing Api ***********************
  const getProcessingApi = async () => {
    const params = { siteName:location };
    const result = await ApiClient.createApiClient().BMWprocessdashboard(
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
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format( "YYYY-MM-DD")
          )
        );
        var displayArr = [];
        dateArr.forEach((element) => {
          const filterDateArr = _.filter(
            arr,
            (item: any) =>
              moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
          var totalIncineration = 0;
          var totalAutoclave = 0;
          var totalWaste = 0;
          filterDateArr.forEach((item) => {
            totalIncineration = totalIncineration + item.totalIncineration ?? 0;
            totalAutoclave = totalAutoclave + item.totalAutoclave ?? 0;
            totalWaste = totalWaste + item.totalWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({
            // @ts-ignore
            splitDate: element,
            // @ts-ignore
            totalIncineration,
            // @ts-ignore
            totalAutoclave,
            // @ts-ignore
            totalWaste,
          });
        });
      }
      // @ts-ignore
      setSortingValue(displayArr);
    }
  };
  // ******************** Processing Api ***********************
  return (
    <View>
      {sortingValue &&
      // @ts-ignore
        sortingValue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
          return (
            <View style={styles.item} key={item}>
              <View style={styles.mainmapview}>
                <Text style={styles.mainmaptext}>
                {/* @ts-ignore */}
                  {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
                    "DD/MM/YYYY"
                  )}
                </Text>
              </View>

              <View style={styles.mainmapview1}>
              {/* @ts-ignore */}
                <Text style={styles.mainmaptext}>{item.totalIncineration}</Text>
              </View>
              <View style={styles.mainmapview2}>
              {/* @ts-ignore */}
                <Text style={styles.mainmaptext}>{item.totalAutoclave}</Text>
              </View>
              <View style={styles.mainmapview3}>
              {/* @ts-ignore */}
                <Text style={styles.mainmaptext}>{item.totalWaste}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default withConnect(Processing);

const styles = StyleSheet.create({
  item: {
    width: width / 1.16,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height / 25,
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
    width: width / 5.8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview3: {
    height: height / 17,
    width: width / 5.6,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  mainview4: {
    height: height / 17,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  mainview5: {
    height: height / 17,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.45,
  },
  mainview6: {
    height: height / 12,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainview7: {
    height: height / 17,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainmapview: {
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmaptext: { fontSize: 11, fontWeight: "700", color: "#2D2D2D" },
  mainmapview1: {
    height: height / 12,
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview2: {
    height: height / 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.35,
  },
  mainmapview3: {
    height: height / 12,
    width: width / 5.8,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
  },
});
