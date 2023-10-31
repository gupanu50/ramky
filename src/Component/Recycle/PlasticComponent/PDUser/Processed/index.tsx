import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import withConnect from "./withConnect";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from "../../../../../ReuableComponent/Loader";
const { height, width } = Dimensions.get("screen");

const Processed = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [processedValue, setProcessedValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // *********** use effect fun's***************
  useEffect(() => {
    calledApis();
  }, [props]);
   //************* Api call  ****************/
  const calledApis = async () => {
    await getProcessedData();
  };
  //***************** processing table api  *****************/
  const getProcessedData = async () => {
    setLoading(true);
    const params = { siteName:location };
    const result = await ApiClient.createApiClient().recyclePlasticProcessed(params);
    {/* @ts-ignore */ }
    if (result.status && result.data.status === true) {
      {/* @ts-ignore */ }
      if ((result?.data?.data ?? []).length > 0) {
        {/* @ts-ignore */ }
        const arr = (result?.data?.data ?? []);
        var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
        var displayArr = [];
        dateArr.forEach(element => {
          const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
          var regrints = 0;
          var granules = 0;
          var bags = 0;
          var bales = 0;
          filterDateArr.forEach(item => {
            regrints = regrints + item.regrinds ?? 0;
            granules = granules + item.granules ?? 0;
            bags = bags + item.bags ?? 0;
            bales = bales + item.bales ?? 0;
          });
          {/* @ts-ignore */ }
          displayArr.push({ date: element, regrints, granules, bags, bales });
        });
      }
      {/* @ts-ignore */ }
      setProcessedValue(displayArr);
    }
    setLoading(false);
  };
  return (
    <View >
      {/* @ts-ignore */}
      {processedValue && processedValue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View>
              <Text style={styles.processedText}>
                {/* @ts-ignore */}
                {moment(item.date, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={styles.processedView}
            >
              <Text style={styles.processedText1}>
                {/* @ts-ignore */}
                {item.regrints}
              </Text>
            </View>
            <View
              style={styles.processedView1}
            >
             
             {Platform.OS === 'ios' ? <Text style={[styles.processedText2,{left:8}]}>
                {/* @ts-ignore */}
                {item.granules}
              </Text>:  <Text style={styles.processedText2}>
                {/* @ts-ignore */}
                {item.granules}
              </Text>}
            </View>
            <View
              style={styles.processedView2}
            >
             {Platform.OS === 'ios' ?  <Text style={[styles.processedText2,{left:14}]}>
                {/* @ts-ignore */}
                {item.bags}
              </Text> :  <Text style={styles.processedText2}>
                {/* @ts-ignore */}
                {item.bags}
              </Text>}
            </View>
            <View
              style={styles.processedView3}
            >
             { Platform.OS === 'ios' ? <Text style={[styles.processedText1,{left:13}]}>
                {/* @ts-ignore */}
                {item.bales}
              </Text> : <Text style={styles.processedText1}>
                {/* @ts-ignore */}
                {item.bales}
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

export default withConnect(Processed);

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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  processedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
    marginLeft: 6,
  },
  processedText1: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  processedText2: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
    marginLeft: 18,
  },
  processedView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
    paddingLeft: 5,
  },
  processedView1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
  },
  processedView2: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.7,
  },
  processedView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    left: 5,
  },
});
