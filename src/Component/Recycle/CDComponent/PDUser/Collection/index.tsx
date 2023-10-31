import { StyleSheet, Text, View, Dimensions } from "react-native";
import React,{useEffect,useState} from "react";
import { FONT_FAMILIES } from "../../../../../Configration";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import Loader from "../../../../../ReuableComponent/Loader";
import withConnect from "./withConnect";
const { height, width } = Dimensions.get("screen");

const Collection = (props:any) => {

  const { user } = props;
  const location = user.siteName[0].siteName;
  const [collectionValue, setCollectionValue] = useState([]);
  const [isLoading, setLoading] = useState(false);

 // *********** use effect fun's***************
 useEffect(() => {
  calledApis();
}, [props]);

//************* Api call  ****************/
const calledApis = async () => {
  await getCollectionApi();
};

//***************** collection table api  *****************/
const getCollectionApi = async () => {
  setLoading(true);
  const params = { siteName:location };
  const result = await ApiClient.createApiClient().recyclecdSiteOperatorCollected(params);
  console.log("result data",result);
  //  @ts-ignore
  if (result.status && result.data.status === true) {
    // @ts-ignore
    if ((result?.data?.data ?? []).length > 0) {
      // @ts-ignore
      const arr = (result?.data?.data ?? []);
      var dateArr = _.uniq(arr.map(item => moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD")));
      var displayArr = [];
      dateArr.forEach(element => {
        const filterDateArr = _.filter(arr, (item: any) => moment(element, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD") === moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("YYYY-MM-DD"));
        var totalWeight = 0 ;
        filterDateArr.forEach(item => {
          totalWeight = totalWeight + item.totalWeight ?? 0;
        });
        // @ts-ignore
        displayArr.push({ splitDate: element, totalWeight });
      });
    }
    // @ts-ignore
    setCollectionValue(displayArr );
  }
  setLoading(false);
};

  return (
    <View>
      {collectionValue && collectionValue.filter(item=>moment(item.splitDate).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <View style={styles.view3}>
              <Text style={styles.dataText2}>
                {/* @ts-ignore */}
                {moment(item.splitDate, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
                </Text>
            </View>
            <View style={styles.view4} >
              <Text style={styles.dataText2}>{item.totalWeight}</Text>
            </View>
          </View>
        );
      })}
      {isLoading && <Loader />}
    </View>
  );
};

export default withConnect(Collection);

const styles = StyleSheet.create({
  view4: {
    flex: 1,
    height: height / 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 140,
  },
  dataText2: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  view3: {
    flex:0.7,
    height: height / 12,
    justifyContent: "center",
    alignItems: "center",
  },
  view2: {
    width: width / 1,
    height: height / 17,
    justifyContent: "center",
    alignItems: "center",
    marginLeft:8,
  },
  dataText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD, color: "#606060",
  },
  view1: {
    height: height / 17,
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titlecontainer: {
    height: height / 17,
    width: width / 1.16,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  item: {
    width: width / 1.16,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height * 0.045,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
