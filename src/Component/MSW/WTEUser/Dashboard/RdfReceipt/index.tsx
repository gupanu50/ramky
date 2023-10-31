import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from 'moment';
import withConnect from "../withConnect";

const { height, width } = Dimensions.get("screen");
const RdfReceipt = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [collectionValue, setCollectionValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // *************************************UseEffect************************************************
  useEffect(() => {
    calledApis();
  }, [props]);
  // *******************Calling API Method On Rendering********************************
  const calledApis = async () => {
    await getRdfReceiptApi();
  };
  // *******************Get RdfReceipt Method********************************
  const getRdfReceiptApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().getrdfprocessing(params);
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
          var rdfReceipt = 0;
          filterDateArr.forEach(item => {
            rdfReceipt = rdfReceipt + item.rdfReceipt ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, rdfReceipt });
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
      {collectionValue && collectionValue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
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
                {item.rdfReceipt}
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

export default withConnect(RdfReceipt);
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
    marginLeft: 20,
  },
  text: {
    fontSize: 11,
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
