import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import "./withConnect";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from 'moment';
const { height, width } = Dimensions.get("screen");

const AshGenerated = (props) => {
   // eslint-disable-next-line react/prop-types
  const { location } = props;
  const [collectionvalue, setCollectionValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // *****************USe Effect****************
  useEffect(() => {
    calledApis();
  }, [location]);
  const calledApis = async () => {
    await getAshGeneratedApi();
  };
  // *****************Get API****************
  const getAshGeneratedApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().SBUheadashgenerated(params);
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
          var ashGenerated = 0;
          filterDateArr.forEach(item => {
            ashGenerated = ashGenerated + item.ashGenerated ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, ashGenerated });
        });
      }
      // @ts-ignore
      setCollectionValue(displayArr);
    }
    else {
      setCollectionValue([]);
    }
    setLoading(false);
  };
  return (
    <View >
      {collectionvalue && collectionvalue.slice(0, 5).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View style={styles.dateView}>
              <Text style={styles.text}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>
            <View style={styles.dateView}>
            </View>
            <View
              style={styles.receiptView}>
             {Platform.OS === 'ios' ?  <Text style={[styles.text,{left:10}]}>
                {/* @ts-ignore */}
                {item.ashGenerated}
              </Text>: <Text style={styles.text}>
                {/* @ts-ignore */}
                {item.ashGenerated}
              </Text>}
            </View>
          </View>
        );
      })}
      {isLoading && <Loader />}
    </View>
  );
};
export default AshGenerated;
const styles = StyleSheet.create({
  item: {
    width: width / 1.16,
    paddingHorizontal: 10,
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
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  
  },
  dateView: {
    flex: 1,
  },
  receiptView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
  },
});