import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Header } from "react-native-elements";
const ModalHeader = (props: any) => {
  const { bc, title } = props;
  // Render Title Method
  const leftComponent = () => {
    return (
      <View style={styles.leftComponentView}>
        <Text style={styles.titleText}>
          {title}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <Header
        statusBarProps={{
          barStyle: "light-content",
          translucent: true,
          backgroundColor: "transparent",
        }}
        containerStyle={styles.container}
        placement={"center"}
        // @ts-ignore
        leftComponent={title ? leftComponent : null}
        backgroundColor={bc ? "transparent" : "white"}
      />
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "transparent",
  },
  leftComponentView: {
    flexDirection: "row",
    width: 260,
    alignItems: "center",
    top: -45,
  },
  titleText: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
});