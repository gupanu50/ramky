// Loader When API Loads
import { View, StyleSheet } from 'react-native';
import React from 'react';
// eslint-disable-next-line no-undef
var Spinner = require('react-native-spinkit');
const Loader = () => {
    return <View style={styles.container}>
        <Spinner isVisible={true} size={100} type={'FadingCircleAlt'} color={"#DA0D14"} />
    </View>;
};
export default Loader;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});
