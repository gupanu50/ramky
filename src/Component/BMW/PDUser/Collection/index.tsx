import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import withConnect from "./withConnect";
import { FONT_FAMILIES } from "../../../../Configration";
import _ from "lodash";
import ApiClient from "../../../../Network";
import moment from "moment";

const { height, width } = Dimensions.get("screen");

const Collection = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [collectionvalue, setCollectionValue] = useState([]);
  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getCollectionBmwApi();
  };
// ******************** Collection API   ***********************
  const getCollectionBmwApi = async () => {
    const params = { siteName:location };
    const result = await ApiClient.createApiClient().BMWcollectdashboard(
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
            moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format(
              "YYYY-MM-DD"
            )
          )
        );

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
          var quantity = 0;
          filterDateArr.forEach((item) => {
            quantity = quantity + item.quantity ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, quantity });
        });
      }
      // @ts-ignore
      setCollectionValue(displayArr);
    } 
  };
  // ******************** Collection API   ***********************

  return (
    <View>
      {collectionvalue &&
      // @ts-ignore
      collectionvalue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
       return (
        <View style={styles.item} key={item}>
        <View style={styles.mainmapview}>
        <Text style={styles.mainmaptext}>
        {/* @ts-ignore */}
        {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
        </Text>
        </View>
              <View style={styles.mainmapview1}></View>

              <View style={styles.mainmapview1}></View>

              <View style={styles.mainmapview1}>
              {/* @ts-ignore */}
                <Text style={styles.mainmaptext}>{item.quantity}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default withConnect(Collection);

const styles = StyleSheet.create({
  item: {
    width: width / 1.16,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height / 24,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  mainview: { justifyContent: "center", alignItems: "center" },
  mainview1: {
    height: height / 17,
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
    flexDirection: "row",
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
  mainview4: {
    height: height / 17,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainmapview: {
    height: height / 12,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainmaptext: { fontSize: 11, fontWeight: "700", color: "#2D2D2D" },
  mainmapview1: {
    height: height / 12,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainmapview2: {
    height: height / 12,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
