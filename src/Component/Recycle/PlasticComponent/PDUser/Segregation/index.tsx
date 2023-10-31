import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import withConnect from "./withConnect";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from "../../../../../ReuableComponent/Loader";
const { height, width } = Dimensions.get("screen");

const Segregation = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [segregationValue, setSegregationValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // *********** use effect fun's***************
  useEffect(() => {
    calledApis();
  }, [props]);
  //************* Api call  ****************/
  const calledApis = async () => {
    await getSegregationData();
  };
  //***************** segregation table api  *****************/
  const getSegregationData = async () => {
    setLoading(true);
    const params = { siteName:location };
    const result = await ApiClient.createApiClient().recyclePlasticSegragation(params);
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
          var hdpe = 0;
          var ldpe = 0;
          var pet = 0;
          var pp = 0;
          var other = 0;
          filterDateArr.forEach(item => {
            hdpe = hdpe + item.hdpeWaste ?? 0;
            ldpe = ldpe + item.ldpeWaste ?? 0;
            pet = pet + item.petWaste ?? 0;
            pp = pp + item.ppWaste ?? 0;
            other = other + item.otherWaste ?? 0;
          });
          // @ts-ignore
          displayArr.push({ date: element, hdpe, ldpe, pet, pp, other });
        });
      }
      // @ts-ignore
      setSegregationValue(displayArr);
    }
    setLoading(false);
  };
  return (
    <View >
       {/* @ts-ignore */}
      {segregationValue && segregationValue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View
              style={styles.mainmapview}
            >
              <Text style={styles.mainmaptext}>
                {/* @ts-ignore */}
                {moment(item.date, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={styles.mainmapview2}
            >
              <Text style={styles.mainmaptext}>
              {/* @ts-ignore */}
                {item.hdpe}
              </Text>
            </View>
            <View
              style={styles.mainmapview1}
            >
              <Text style={styles.mainmaptext}>
              {/* @ts-ignore */}
                {item.ldpe}
              </Text>
            </View>
            <View
              style={styles.mainmapview3}
            >
              <Text style={styles.mainmaptext}>
              {/* @ts-ignore */}
                {item.pet}
              </Text>
            </View>
            <View
              style={styles.mainmapview4}
            >
              <Text style={[styles.mainmaptext, { marginLeft: 15 }]}>
              {/* @ts-ignore */}
                {item.pp}
              </Text>
            </View>
            <View
              style={styles.mainmapview5}
            >
              <Text style={styles.mainmaptext}>
              {/* @ts-ignore */}
                {item.other}
              </Text>
            </View>
          </View>
        );
      })}
      {isLoading && <Loader />}
    </View>
  );
};
export default withConnect(Segregation);

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
  mainmapview: {
    height: height / 12,
    width: width / 4.75,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview2: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview3: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview4: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview5: {
    flex: 0.62,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmaptext: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  mainmapview1:{
    flex:0.95,
    justifyContent: "center",
    alignItems: "center",
  },
});
