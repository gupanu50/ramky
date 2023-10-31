import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import "./withConnect";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from 'moment';
const { height, width } = Dimensions.get("screen");

const RdfCombusted = (props) => {
  // eslint-disable-next-line react/prop-types
  const { location } = props;
  const [energyvalue, setEnergyValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    calledApis();
  }, [location]);
  // *****************USe Effect****************
  const calledApis = async () => {
    await getRdfCombustedApi();
  };
  // *****************Get API****************
  const getRdfCombustedApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().SBUheadenergygenerated(params);
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
          var steamGeneration = 0;
          var powerProduced = 0;
          var powerExport = 0;
          var auxiliaryConsumption = 0;
          filterDateArr.forEach(item => {
            steamGeneration = steamGeneration + item.steamGeneration ?? 0;
            powerProduced = powerProduced + item.powerProduced ?? 0;
            powerExport = powerExport + item.powerExport ?? 0;
            auxiliaryConsumption = auxiliaryConsumption + item.auxiliaryConsumption ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, steamGeneration, powerProduced, powerExport, auxiliaryConsumption });
        });
      }
      // @ts-ignore
      setEnergyValue(displayArr);
    }
    else {
      setEnergyValue([]);
    }
    setLoading(false);
  };
  return (
    <View >
      {energyvalue && energyvalue.slice(0, 5).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View style={styles.date}>
              {Platform.OS === 'ios' ? <Text style={styles.text}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text> : <Text style={styles.text}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>}
            </View>
            <View
              style={styles.steamView}
            >
              {Platform.OS === 'ios' ? <Text style={[styles.text,{right:10}]}>
                {/* @ts-ignore */}
                {item.steamGeneration}
              </Text> : <Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.steamGeneration}
              </Text>}
            </View>
            <View
              style={styles.producedView}
            >
              {Platform.OS === 'ios' ? <Text style={[styles.text,{right:8}]}>
                {/* @ts-ignore */}
                {item.powerProduced}
              </Text> : <Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.powerProduced}
              </Text>}
            </View>
            <View
              style={styles.exportView}
            >
           {Platform.OS === 'ios'?   <Text style={[styles.text,{right:21}]}>
                {/* @ts-ignore */}
                {item.powerExport}
              </Text>:<Text style={[styles.text,{right:18}]}>
                {/* @ts-ignore */}
                {item.powerExport}
              </Text>}
            </View>
            <View
              style={styles.auxiliaryView}
            >
              {Platform.OS === 'ios' ? <Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.auxiliaryConsumption}
              </Text> : <Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.auxiliaryConsumption}
              </Text>}
            </View>
          </View>
        );
      })}
      {isLoading && <Loader />}
    </View>
  );
};
export default RdfCombusted;
const styles = StyleSheet.create({
  item: {
    width: width / 1.1,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    height: height / 23,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
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
  steamView: {
  width:width/6.5,
  justifyContent:"center",
  alignItems:"center",
  },
  date:{
      width:width/5.3,
      justifyContent:"center",
      alignSelf:"center",
  },
  producedView: {
   width:width/5,
    justifyContent: "center",
    alignItems: "center",
  },
  exportView: {
   width:width/4.5,
    justifyContent: "center",
    alignItems: "center",
  },
  auxiliaryView: {
  width:width/10,
    justifyContent: "center",
    alignItems: "center",
  right:14,
  },
});