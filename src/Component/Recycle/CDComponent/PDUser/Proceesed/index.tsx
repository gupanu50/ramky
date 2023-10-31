import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useState, useEffect } from "react";
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
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().recyclecdSiteOperatorProcessed(params);
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
          var fine = 0;
          var coarseS = 0;
          var tenMm = 0;
          var twentyMm = 0;
          var vSand = 0;
          var gsb = 0;
          var others = 0;
          filterDateArr.forEach(item => {
            fine = fine + item.fine ?? 0;
            coarseS = coarseS + item.coarseS ?? 0;
            tenMm = tenMm + item.tenMm ?? 0;
            twentyMm = twentyMm + item.twentyMm ?? 0;
            vSand = vSand + item.vSand ?? 0;
            gsb = gsb + item.gsb ?? 0;
            others = others + item.others ?? 0;
          });
          {/* @ts-ignore */ }
          displayArr.push({ splitDate: element, fine, coarseS, tenMm, twentyMm, vSand, gsb, others });
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
      {processedValue && processedValue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
           {Platform.OS === 'ios' ?  <View style={styles.item3}>
           <Text style={[styles.dataText,{left:21}]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>:  <View style={styles.item2}>
           <Text style={[styles.dataText,{left:19}]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>}
            <View style={styles.dataView1}>
              {/* @ts-ignore */}
             {Platform.OS === 'ios'? <Text style={[styles.dataText, { left: 17 }]}>{item.fine} </Text>:
               <Text style={[styles.dataText,{left:21}]}>{item.fine} </Text>}
            </View>
            <View style={styles.dataView2} >
              {/* @ts-ignore */}
              {Platform.OS === 'ios' ? <Text style={[styles.dataText,{left:5}]}>{item.coarseS}</Text>:
                          <Text style={[styles.dataText, { left:10 }]}>{item.coarseS}</Text>}
            </View>
            <View style={styles.dataView3}>
              {/* @ts-ignore */}
             {Platform.OS === 'ios' ? <Text style={[styles.dataText, { left:-1 }]}>{item.tenMm}</Text>:
                           <Text style={[styles.dataText, { left:5}]}>{item.tenMm}</Text>}
            </View>
            <View style={styles.dataView4}>
              {/* @ts-ignore */}
             {Platform.OS === 'ios' ?  <Text style={[styles.dataText,{left:-2}]}>{item.twentyMm}</Text>:
                         <Text style={[styles.dataText, {left:3}]}>{item.twentyMm}</Text>}
            </View>
            <View style={styles.dataView5}>
              {/* @ts-ignore */}
             {Platform.OS === "ios" ? <Text style={[styles.dataText,{left:-14}]}>{item.vSand}</Text>:
               <Text style={[styles.dataText,{right:6}]}>{item.vSand}</Text>}
            </View>

            <View style={styles.dataView6}>
              {/* @ts-ignore */}
              {Platform.OS === 'ios' ? <Text style={[styles.dataText,{left:-28}]}>{item.gsb}</Text>:
                          <Text style={[styles.dataText, { right: 15}]}>{item.gsb}</Text>}
            </View>
            <View style={styles.dataView7}>
              {/* @ts-ignore */}
              {Platform.OS === 'ios' ? <Text style={[styles.dataText,{left:-27}]}>{item.others}</Text>:
               <Text style={[styles.dataText,{right:15}]}>{item.others}</Text>}
            </View>
          </View>
        );
      })}
      {isLoading && <Loader />}
    </View>
  );
};

export default withConnect(Processed);

const styles = StyleSheet.create({
  dataView7: {
    height: height / 12,
    width: width / 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dataView6: {
    height: height / 12,
    width: width / 9.09,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dataView5: {
    height: height / 12,
    width: width / 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dataView4: {
    height: height / 12,
    width: width / 7.2,
    justifyContent: "center",
    alignItems: "center",
  },
  dataView3: {
    height: height / 12,
    width: width / 10.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dataView2: {
    height: height / 12,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dataView1: {
    height: height / 12,
    width: width / 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dataText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  dataText11: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  item2: {
    height: height / 12,
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
  },
  item3: {
    height: height / 12,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: width / 1.1,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height / 23,
    top:6,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
