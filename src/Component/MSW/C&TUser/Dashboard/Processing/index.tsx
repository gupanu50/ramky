import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import "./withConnect";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from "moment";
import withConnect from '../withConnect';
const { height, width } = Dimensions.get("screen");

const Processing = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [processingvalue, setProcessingValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getProcessingApi();
  };

  // *********************** processing table api ****************

  const getProcessingApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().getprocessingct(params);
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
          var totalCompost = 0;
          var totalRdf = 0;
          var totalInerts = 0;
          var totalRecyclables = 0;
          filterDateArr.forEach(item => {
            totalCompost = totalCompost + item.totalCompost ?? 0;
            totalRdf = totalRdf + item.totalRdf ?? 0;
            totalInerts = totalInerts + item.totalInerts ?? 0;
            totalRecyclables = totalRecyclables + item.totalRecyclables ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, totalCompost, totalRdf, totalInerts, totalRecyclables });
        });
      }
      // @ts-ignore
      setProcessingValue(displayArr);
    }
    setLoading(false);
  };

  return (
    <View >
      {/* @ts-ignore */}
      {processingvalue && processingvalue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
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
              { Platform.OS === 'ios' ? <Text style={[styles.text,{right:9}]}>
                {/* @ts-ignore */}
                {item.totalCompost}
              </Text>: <Text style={[styles.text,{right:7}]}>
                {/* @ts-ignore */}
                {item.totalCompost}
              </Text>}
            </View>
            <View
              style={styles.rdfView}
            >
              { Platform.OS === 'ios' ?  <Text style={[styles.text,{right:6}]}>
                {/* @ts-ignore */}
                {item.totalRdf}
              </Text>:<Text style={[styles.text,{right:4}]}>
                {/* @ts-ignore */}
                {item.totalRdf}
              </Text>}
            </View>
            <View
              style={styles.recyclablesView}
            >
              { Platform.OS === 'ios' ? <Text style={[styles.text,{right:4}]}>
                {/* @ts-ignore */}
                {item.totalRecyclables}
              </Text> : <Text style={[styles.text,{right:5}]}>
                {/* @ts-ignore */}
                {item.totalRecyclables}
              </Text>}
            </View>
            <View
              style={styles.inertsView}
            >
              <Text style={styles.text}>
                {/* @ts-ignore */}
                {item.totalInerts}
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

export default withConnect(Processing);

const styles = StyleSheet.create({
  item: {
    width: width / 1.12,
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
    flex: 1.2,
  },
  compostView: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  rdfView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 6,
  },
  recyclablesView: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 4,
  },
  inertsView: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginRight:4,
  },
});