import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import withConnect from '../withConnect';
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from 'moment';
const { height, width } = Dimensions.get("screen");

const RdfCombusted = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [energyValue, setEnergyValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // *************************************UseEffect************************************************
  useEffect(() => {
    calledApis();
  }, [props]);
  // *******************Calling API Method On Rendering********************************
  const calledApis = async () => {
    await getRdfCombustedApi();
  };
  // *******************Get RdfCombusted Method********************************
  const getRdfCombustedApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().getwteenergygenerated(params);
    //  @ts-ignore
    if (result.status && result.data.status === true) {
      //  @ts-ignore
      if ((result?.data?.data ?? []).length > 0) {
        //  @ts-ignore
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
          //  @ts-ignore
          displayArr.push({ splitDate: element, steamGeneration, powerProduced, powerExport, auxiliaryConsumption });
        });
      }
      //  @ts-ignore
      setEnergyValue(displayArr);
    }
    setLoading(false);
  };
  return (
    <View >
      {/*   @ts-ignore */}
      {energyValue && energyValue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View>
              {Platform.OS === 'ios' ? <Text style={[styles.text, { left: -10 }]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text> : <Text style={[styles.text, { marginLeft: -5 }]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>}
            </View>
            <View
              style={styles.steamView}
            >
              {Platform.OS === 'ios' ? <Text style={[styles.text, { left: -13 }]}>
                {/* @ts-ignore */}
                {item.steamGeneration}
              </Text> : <Text style={[styles.text, { left: -5 }]}>
                {/* @ts-ignore */}
                {item.steamGeneration}
              </Text>}
            </View>
            <View
              style={styles.producedView}
            >
              {Platform.OS === 'ios' ? <Text style={[styles.text, { left: -10 }]}>
                {/* @ts-ignore */}
                {item.powerProduced}
              </Text> : <Text style={[styles.text, { left: -3 }]}>
                {/* @ts-ignore */}
                {item.powerProduced}
              </Text>}
            </View>
            <View
              style={styles.exportView}
            >
              {Platform.OS === 'ios' ? <Text style={[styles.text, { left: -3 }]}>
                {/* @ts-ignore */}
                {item.powerExport}
              </Text> : <Text style={styles.text}>
                {/* @ts-ignore */}
                {item.powerExport}
              </Text>}
            </View>
            <View
              style={styles.auxilaryView}
            >
              <Text style={styles.text}>
                {/* @ts-ignore */}
                {item.auxiliaryConsumption}
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

export default withConnect(RdfCombusted);
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
    marginLeft: 23,
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  steamView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    left: -6,
  },
  producedView: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  exportView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
  },
  auxilaryView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    left: -20,
  },
});