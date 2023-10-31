import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import withConnect from '../withConnect';
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import moment from "moment";
const { height, width } = Dimensions.get("screen");

const Distribution = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [distributionvalue, setDistributionValue] = useState([]);


  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getDistributionApi();
  };

  // ******************* distrubute table api *********************
  const getDistributionApi = async () => {
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().getdistributionct(params);
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
          var rdf = 0;
          var recyclables = 0;
          var compost = 0;
          var inerts = 0;
          filterDateArr.forEach(item => {
            rdf = rdf + item.rdf ?? 0;
            recyclables = recyclables + item.recyclables ?? 0;
            compost = compost + item.compost ?? 0;
            inerts = inerts + item.inerts ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, rdf, recyclables, compost, inerts });
        });
      }
      // @ts-ignore
      setDistributionValue(displayArr);
    }
  };

  return (
    <View  >
      {/* @ts-ignore */}
      {distributionvalue && distributionvalue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
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
              style={styles.compostView}
            >
              { Platform.OS === 'ios' ? <Text style={[styles.text,{left:-2}]}>
                {/* @ts-ignore */}
                {item.compost}
              </Text> :   <Text style={[styles.text,{right:3}]}>
                {/* @ts-ignore */}
                {item.compost}
              </Text>}
            </View>
            <View
              style={styles.rdfView}
            >
             { Platform.OS === 'ios' ? <Text style={[styles.text,{left:4}]}>
                {/* @ts-ignore */}
                {item.rdf}
              </Text> :  <Text style={[styles.text,{left:2}]}>
                {/* @ts-ignore */}
                {item.rdf}
              </Text>}
            </View>
            <View
              style={styles.recyclablesView}
            >
             { Platform.OS === 'ios' ?<Text style={[styles.text,{left:5}]}>
                {/* @ts-ignore */}
                {item.recyclables}
              </Text>:<Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.recyclables}
              </Text>}
            </View>
            <View
              style={styles.inertsView}
            >
              { Platform.OS === 'ios' ? <Text style={[styles.text,{left:4}]}>
                {/* @ts-ignore */}
                {item.inerts}
              </Text>:<Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.inerts}
              </Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default withConnect(Distribution);
const styles = StyleSheet.create({
  item: {
  
    width: width / 1.14,
    paddingHorizontal: 4,
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
  text: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  dateView: {
    flex: 0.8,
    justifyContent: "center",
  },
  compostView: {
    flex: 0.5,
  },
  rdfView: {
    flex: 0.6,
  },
  recyclablesView: {
    flex: 0.7,
  },
  inertsView: {
    flex: 0.4,
  },
});