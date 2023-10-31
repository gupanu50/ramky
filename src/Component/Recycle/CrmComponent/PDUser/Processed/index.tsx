import { StyleSheet, Text, View, Dimensions,Platform } from "react-native";
import React, { useEffect, useState } from "react";
import withConnect from "./withConnect";
import moment from "moment";
import _ from 'lodash';
import ApiClient from '../../../../../Network';
import { FONT_FAMILIES} from "../../../../../Configration";
const { height, width } = Dimensions.get("screen");

const Processed = (props: any) => {
  const { user } = props;
  const location = user.siteName[0].siteName;
  const [segregationValue, setSegregationValue] = useState([]);

  // *********** use effect fun's***************
  useEffect(() => {
    calledApis();
  }, [props]);

  //************* Api call  ****************/
  const calledApis = async () => {
    await getProcessedData();
  };
  //***************** Processed Table API  *****************/
  const getProcessedData = async () => {
    const params = { siteName:location };
     const result = await ApiClient.createApiClient().recyclecrmprocessedtable(params);
     
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
          var pet = 0;
          var hdpe = 0;
          var ldpe = 0;
          var pp = 0;
          var others = 0;
          filterDateArr.forEach(item => {
            pet = pet + item.pet ?? 0;
            hdpe = hdpe+ item.hdpe ?? 0;
            ldpe  = ldpe + item.ldpe?? 0;
            pp = pp+ item.pp ?? 0;
            others = others+ item.others ?? 0;  
          });
          // @ts-ignore
          displayArr.push({ date: element, pet, hdpe, ldpe, pp,others });
        });
      }
      // @ts-ignore
      setSegregationValue(displayArr);
    }
  };

  return (
    <View style={styles.container }>
      <>
        <View style={styles.secondContainer}>

          <View style={[styles.titleView, { width:"25%",top:-8 }]}>
            <Text style={styles.titleText}>Date</Text>
          </View>
          <View style={[styles.titleView, { width:"18%" }]} >
            <Text style={styles.titleText}>PET        (MT)</Text>
          </View>

          <View style={[styles.titleView, {width:"12%"  }]}>
            <Text style={styles.titleText}>HDPE   (MT)</Text>
          </View>

          <View style={[styles.titleView, { flex: 0.7 }]} >
            <Text style={styles.titleText}>LDPE (MT)</Text>
          </View>

          <View style={[styles.titleView, { flex: 0.7}]}>
     <Text style={styles.titleText}>PP       (MT)</Text>
          </View>

          <View style={[styles.titleView, { flex: 0.7,marginRight:7 }]} >
            <Text style={styles.titleText}>Others (MT)</Text>
          </View> 

        </View>
      </>
      <View >
        {/* @ts-ignore */}
      {segregationValue && segregationValue.filter(item=>moment(item.date).format('YYYY-MM-DD') >= moment().subtract(4,'d').format('YYYY-MM-DD')).map((item) => {
        return (
          <View style={styles.item} key={item}>

            <View style={styles.mainmapview} >
              <Text style={styles.mainmaptext}>
                {/* @ts-ignore */}
                {moment(item.date, "YYYY-MM-DD HH:mm:ss:SSS Z").format("DD/MM/YYYY")}
              </Text>
            </View>

            <View style={styles.mainmapview2} >
              <Text style={styles.mainmaptext}>
              {/* @ts-ignore */}
                {item.pet}
              </Text>
            </View>

            <View style={styles.mainmapview1}>
              <Text style={[styles.mainmaptext,{marginLeft:10}]}>
              {/* @ts-ignore */}
                {item.hdpe}
              </Text>
            </View>

            <View style={styles.mainmapview3} >
              <Text style={styles.mainmaptext}>
              {/* @ts-ignore */}
                {item.ldpe}
              </Text>
            </View>

            <View style={styles.mainmapview4} >
             {Platform.OS==='ios'? <Text style={[styles.mainmaptext, { marginLeft: 8 }]}>
              {/* @ts-ignore */}
                {item.pp}
              </Text>:<Text style={[styles.mainmaptext, { marginLeft: 15 }]}>
              {/* @ts-ignore */}
                {item.pp}
              </Text>}
            </View>

            <View style={styles.mainmapview5} >
            {Platform.OS==='ios'? <Text style={[styles.mainmaptext, { marginLeft: 5 }]}>
              {/* @ts-ignore */}
                {item.others}
              </Text>:<Text style={[styles.mainmaptext, { marginLeft: 18 }]}>
              {/* @ts-ignore */}
                {item.others}
              </Text>}
            </View>

          </View>
        );
      })}

    </View>
    </View>
  );
};

export default withConnect(Processed);

const styles = StyleSheet.create({
  titleView: {
    height: height / 17,
    justifyContent: "center",
  },
  secondContainer: {
    height: height / 17,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    flexDirection: "row",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",

  },
  titleText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD, color: "#606060",
    textAlign: "center",
  },
  item: {
    width: width / 1.1,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#DEFDFB",
    alignItems: "center",
    height: height / 23,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    justifyContent: "flex-start",
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
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview3: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview4: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  mainmapview5: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    
  },
 
  mainmaptext: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  mainmapview1:{
    flex:0.7,
    justifyContent: "center",
    alignItems: "center",
   
  },

});
