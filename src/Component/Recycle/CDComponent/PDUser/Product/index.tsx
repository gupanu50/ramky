import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import withConnect from './withConnect';
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from '../../../../../ReuableComponent/Loader';
import moment from "moment";
const { height, width } = Dimensions.get("screen");
const Product = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [productValue, setProductValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    calledApis();
  }, [props]);
  const calledApis = async () => {
    await getProductApi();
  };
  const getProductApi = async () => {
    setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().recyclecdSiteOperatorProduct(params);
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
          var ks = 0;
          var pb = 0;
          var cb = 0;
          var other = 0;
          filterDateArr.forEach(item => {
            ks = ks + item.krebsStones ?? 0;
            pb = pb + item.paverBlocks ?? 0;
            cb = cb + item.cementBricks ?? 0;
            other = other + item.othersProduct ?? 0;
          });
          // @ts-ignore
          displayArr.push({ splitDate: element, ks, pb, cb, other });
        });
      }
      // @ts-ignore
      setProductValue(displayArr);
    }
    setLoading(false);
  };

  return (
    <View >
      {/* @ts-ignore */}
      {productValue && productValue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View
              style={styles.dateView}
            >
             {Platform.OS === 'ios' ? <Text style={[styles.text,{left:-10}]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}

              </Text>:  <Text style={styles.text}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}

              </Text>}
            </View>
            <View
              style={styles.compostView}
            >
              { Platform.OS === 'ios' ? <Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.ks}
              </Text> :  <Text style={[styles.text, { right: 5 }]}>
                {/* @ts-ignore */}
                {item.ks}
              </Text>}
            </View>
            <View
              style={styles.rdfView}
            >
              <Text style={[styles.text, { marginLeft: 10 }]}>
                {/* @ts-ignore */}
                {item.pb}
              </Text>
            </View>
            <View
              style={styles.recyclablesView}
            >
              { Platform.OS === 'ios' ? <Text style={[styles.text, { marginRight: 23 }]}>
                {/* @ts-ignore */}
                {item.cb}
              </Text>:<Text style={[styles.text, { marginRight: 15 }]}>
                {/* @ts-ignore */}
                {item.cb}
              </Text>}
            </View>
            <View
              style={styles.inertsView}
            >
             { Platform.OS === 'ios' ? <Text style={styles.text}>
                {/* @ts-ignore */}
                {item.other}
              </Text>: <Text style={[styles.text,{left:3}]}>
                {/* @ts-ignore */}
                {item.other}
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

export default withConnect(Product);

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
    flex: 0.8,
  },
  compostView: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  rdfView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  recyclablesView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  inertsView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});