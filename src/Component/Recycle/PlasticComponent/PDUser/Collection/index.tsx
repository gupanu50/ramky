import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from "../../../../../ReuableComponent/Loader";
import withConnect from "./withConnect";
const { height, width } = Dimensions.get("screen");

const Collection = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [collectionValue, setCollectionValue] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);
    const params = { siteName:location };
    const result = await ApiClient.createApiClient().recyclePlasticCollection(params);
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
            quantity = quantity + item.totalWeight ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, quantity });
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
      {collectionValue && collectionValue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item}  key={item}>
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
    height: height / 21,
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
