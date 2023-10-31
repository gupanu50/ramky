import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from 'moment';
import withConnect from "./withConnect";
const { height, width } = Dimensions.get("screen");
const Collection = (props: any) => {
  const { user, dashData } = props;
  const location = user.siteName[0].siteName;
  const [collectionvalue, setCollectionValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    calledApis();
  }, [dashData]);
  const calledApis = async () => {
    await getCollectionApi();
  };

  // ********************** collection table api *****************
  const getCollectionApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().getcollectionct(params);
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
      setCollectionValue(displayArr);
    }
    setLoading(false);
  };
  return (
    <View >
      {/* @ts-ignore */}
      {collectionvalue && collectionvalue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View
              style={styles.dateView}
            >
              <Text style={styles.text}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={styles.extraView}
            >
            </View>
            <View
              style={styles.extraView}
            >
            </View>
            <View
              style={styles.weightView}
            >
              <Text style={styles.text}>
                {/* @ts-ignore */}
                {item.quantity}
              </Text>
            </View>
          </View>
        );
      })
      }
      {isLoading && <Loader />}
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
    height: height / 23,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  dateView: {
    height: height / 12,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  weightView: {
    height: height / 12,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  extraView: {
    height: height / 12,
    width: width / 4.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
