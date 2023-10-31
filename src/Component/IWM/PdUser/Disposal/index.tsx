import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import withConnect from "./withConnect";
import ApiClient from '../../../../Network';
import _ from 'lodash';
import moment from "moment";
import Loader from "../../../../ReuableComponent/Loader";
const { height, width } = Dimensions.get("screen");

const Disposal = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [processingvalue, setProcessingValue] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    calledApis();
  }, [props]);

  const calledApis = async () => {
    await getDisposalApi();
  };
  // ******************************GET Api********************
  const getDisposalApi = async () => {
    // setLoading(true);
    const params = { siteName: location };
    const result = await ApiClient.createApiClient().IWManalysisdashboard(params);
  
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
          var analysisTotalWaste = 0;
          var analysisDlf = 0;
          var analysisLat = 0;
          var analysisIncineration = 0;
          var analysisAfrf = 0;
          filterDateArr.forEach(item => {
            analysisTotalWaste = analysisTotalWaste + item.disposalTotalWaste ?? 0;
            analysisDlf = analysisDlf + item.disposalDlf ?? 0;
            analysisLat = analysisLat + item.disposalLat ?? 0;
            analysisIncineration = analysisIncineration + item.disposalIncineration ?? 0;
            analysisAfrf = analysisAfrf + item.disposalAfrf ?? 0;
          });
          //  
          {/* @ts-ignore */ }
          displayArr.push({ splitDate: element, analysisTotalWaste, analysisDlf, analysisLat, analysisIncineration, analysisAfrf });
        });
      }
      {/* @ts-ignore */ }
      setProcessingValue(displayArr);
    }
    // setLoading(false);
  };
  return (
    <View >
      {/* @ts-ignore */}
      {processingvalue && processingvalue.filter(item => moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4, 'd').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View >
             {Platform.OS === "ios" ? <Text style={[styles.text, { marginLeft: 5 }]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>:<Text style={[styles.text, { marginLeft: 10 }]}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>}
            </View>

            <View style={styles.view1}>
             {Platform.OS === 'ios' ? <Text style={[styles.text, { marginRight: 8 }]}>
                {/* @ts-ignore */}
                {item.analysisTotalWaste}
              </Text>:<Text style={[styles.text, { marginRight: 12 }]}>
                {/* @ts-ignore */}
                {item.analysisTotalWaste}
              </Text>}
            </View>

            <View style={styles.view2}>
             {Platform.OS === 'ios' ? <Text style={[styles.text]}>
                {/* @ts-ignore */}
                {item.analysisDlf}
              </Text>:<Text style={[styles.text, { marginRight: 9 }]}>
                {/* @ts-ignore */}
                {item.analysisDlf}
              </Text>}
            </View>

            <View
              style={styles.view3} >
             { Platform.OS === 'ios' ? <Text style={[styles.text, { right:3 }]}>
                {/* @ts-ignore */}
                {item.analysisLat}
              </Text>:<Text style={[styles.text, { marginRight: 6 }]}>
                {/* @ts-ignore */}
                {item.analysisLat}
              </Text>}
            </View>

            <View style={styles.view4}>
             { Platform.OS === 'ios' ? <Text style={[styles.text, { right:12}]}>
                {/* @ts-ignore */}
                {item.analysisAfrf}
              </Text>:<Text style={[styles.text, { marginRight: 17 }]}>
                {/* @ts-ignore */}
                {item.analysisAfrf}
              </Text>}
            </View>
            <View style={styles.view5}>
             { Platform.OS === 'ios' ? <Text style={[styles.text, { marginRight: 23 }]}>
                {/* @ts-ignore */}
                {item.analysisIncineration}
              </Text>:<Text style={[styles.text, { marginRight: 20 }]}>
                {/* @ts-ignore */}
                {item.analysisIncineration}
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

export default withConnect(Disposal);

const styles = StyleSheet.create({
  item: {
    width: width / 1.1,
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
  view1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.73,
    // backgroundColor:"red"

  },
  view2: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.47,
    // backgroundColor:"green"

  },
  view3: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    // backgroundColor:"blue"

  },
  view4: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"green"
  },
  view5: {
    flex: 0.55,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"red"

  },

});
