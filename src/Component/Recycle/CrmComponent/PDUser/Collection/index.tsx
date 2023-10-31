import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import withConnect from "./withConnect";
import { FONT_FAMILIES } from "../../../../../Configration";
const { height, width } = Dimensions.get("screen");

const Collection = (props: any) => {
  const { user } = props;
 const location = user.siteName[0].siteName;
  const [collectionValue, setCollectionValue] = useState([]);
  // *********** use effect fun's***************
  useEffect(() => {
    calledApis();
  }, [props]);
  //************* Api call  ****************/
  const calledApis = async () => {
    await getCollectionApi();
  };
  //***************** collection table api  *****************/
  const getCollectionApi = async () => {
    // setLoading(true)
    const params = { siteName:location };
    const result = await ApiClient.createApiClient().recyclecrmCollectedTable(params);
    //  @ts-ignore
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
            quantity = quantity + item.totalScrap ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, quantity });
        });
      }
      // @ts-ignore
      setCollectionValue(displayArr);
    }
    // setLoading(false)
  };
  return (
    <View style={styles.container}>
      <>
        <View style={styles.titlecontainer} >
          <View style={styles.view1}>
            <Text style={styles.dataText}>Date</Text>
          </View>
          <View style={styles.view2} >
            <Text style={styles.dataText}>Total Scrap</Text>
          </View>
        </View>
      </>
      <View >
        {/* @ts-ignore */}
      {collectionValue && collectionValue.filter(item=>moment(item.date).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
      return (
          <View style={styles.item} key={item}>
            <View
              style={styles.collectDateView}
            >
              <Text style={styles.collectText}>
                {/* @ts-ignore */}
                {moment(item.date, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={styles.collectWeightView}
            >
              <Text style={styles.collectText}>
                {/* @ts-ignore */}
                {item.quantity}
              </Text>
            </View>
          </View>
        );
      })
      }
    </View>
    </View>
  );
};

export default withConnect(Collection);

const styles = StyleSheet.create({
  view4: {
    flex: 0.7,
    height: height / 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "45%",
  },
  dataText2: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  view3: {
    height: height / 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  view2: {
    width: width / 1,
    height: height / 17,
    justifyContent: "center",
    alignItems: "center",
    marginLeft:12,
  },
  dataText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD, color: "#606060",
  },
  view1: {
    height: height / 17,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft:"2%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titlecontainer: {
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

  item: {
    width: width / 1.16,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height * 0.045,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  collectDateView: {
    width: width / 1.6,
    justifyContent: "center",
    alignItems: "center",
  },
  collectWeightView: {
    width: width / 1.6,
    justifyContent: "center",
    alignItems: "center",
  },
  collectText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
});
