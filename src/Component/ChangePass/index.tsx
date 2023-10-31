import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import React, { useState, useRef } from 'react';
import {
    COLORS,
    FONT_FAMILIES,
} from "../../Configration";
const { height, width } = Dimensions.get("screen");
import Loader from '../../ReuableComponent/Loader';
import { Images } from "../../Assets";
const {LOGIN } = SCREENS;
import { SCREENS, VALIDATE_FORM } from '../../Constant';
import Network from '../../Network';
import _ from 'lodash';
import { showMessage } from 'react-native-flash-message';
import withConnect from './withConnect';
const Changepass = (props: any) => {
    const { navigation, user } = props;
    const emailRef = useRef();
    const userlocation = user.siteName[0].siteName;
    const usernamevalue = user.username;
    const userid = user.id;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isSecure1, setSecure1] = useState(true);
    const [isSecure2, setSecure2] = useState(true);
    const [isSecure3, setSecure3] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const passwordSecureAction = (index: number) => {
        if (index === 0) {
            setSecure1(!isSecure1);
        } else if (index === 1) {
            setSecure2(!isSecure2);
        } else {
            setSecure3(!isSecure3);
        }
    };
    const validation = () => {
        var message = '';

        if (_.isEmpty(currentPassword)) {
            // @ts-ignore
            message = VALIDATE_FORM.CURRENT_PASSWORD;
        } else if (_.isEmpty(newPassword)) {
            message = VALIDATE_FORM.NEW_PASSWORD;
        } else if (_.isEmpty(confPassword)) {
            message = VALIDATE_FORM.C_PASSWORD;

        } else if (newPassword != confPassword) {
            message = VALIDATE_FORM.MISMATCH;
        }
        if (!_.isEmpty(message)) {
            showMessage({ message: message, type: 'danger' });
            return false;
        }
        return true;
    };

    const ChangePassword = async () => {
        if (validation()) {
            setLoading(true); 
            const payload = `${userid}?oldPassword=${currentPassword}&newPassword=${newPassword}`;
            const result = await Network.createApiClient().changepassword(payload);
            //    @ts-ignore
            if (result.data && result.data.status === true) {
                // @ts-ignore
                showMessage({ message: result.data.message, type: 'success' });
                navigation.navigate(LOGIN);
            } else {
                // @ts-ignore
                showMessage({ message: result.data.message, type: 'danger' });
            }
            setLoading(false);
        }
    };

    const newPasswordValidation = (text) => {
        setNewPassword(text);
        let rjx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
        if (text === "") {
            setShow(false);
        } else if (!rjx.test(text)) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Image
                            style={{ height: 20, width: 20, tintColor: "black" }}
                            source={Images.backarrow}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraView}>
                    <View style={styles.firstView}>
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 100 }}
                            source={Images.Defaultdp}
                        />
                      
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>{usernamevalue}</Text>
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.nameeText}>{userlocation}</Text>
                    </View>
                </View>
                <View style={styles.lastView}>
                    <View style={styles.ans}>
                        <View style={styles.imgView}>
                            <Image
                                style={{ height: 20, width: 17}}
                                source={Images.lock}
                            />
                        </View>
                        <View style={styles.textinputtView}>
                            <TextInput
                                style={styles.secureInput}
                                // @ts-ignore
                                ref={emailRef}
                                placeholder={"Enter your old password"}
                                placeholderTextColor={COLORS.TEXTINPUT}
                                maxLength={30}
                                keyboardType={"default"}
                                secureTextEntry={isSecure1}
                                onChangeText={setCurrentPassword}
                           
                            />
                        </View>
                        <View style={styles.lastImgView}>
                            <TouchableOpacity onPress={() => { passwordSecureAction(0);}} >
                                <Image
                                    style={{ tintColor: isSecure1 ? COLORS.GRAY : COLORS.BLACK }}
                                    source={Images.eye}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ans}>
                        <View style={styles.imgView}>
                            <Image
                                style={{ height: 20, width: 17}}
                                source={Images.lock}
                            />
                        </View>
                        <View style={styles.textinputtView}>
                            <TextInput
                                style={styles.secureInput}
                                // @ts-ignore
                                ref={emailRef}
                                placeholder={"Enter your new password"}
                                placeholderTextColor={COLORS.TEXTINPUT}
                                maxLength={30}
                                keyboardType={"default"}
                                onChangeText={(text) => newPasswordValidation(text)}
                               
                                secureTextEntry={isSecure2}
                            />
                        </View>
                        <View style={styles.lastImgView}>
                            <TouchableOpacity onPress={() => { passwordSecureAction(1);}} >
                                <Image
                                    style={{ tintColor: isSecure2 ? COLORS.GRAY : COLORS.BLACK }}
                                    source={Images.eye}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {show &&
                        <Text style={styles.errorMessageStyle}>
                            Password Should Contain One Number, One Alphabet And One {'\n'}Special Character</Text>}
                    <View style={styles.ans}>
                        <View style={styles.imgView}>
                            <Image
                                style={{ height: 20, width: 17}}
                                source={Images.lock}
                            />
                        </View>
                        <View style={styles.textinputtView}>
                            <TextInput
                                style={styles.secureInput}
                                // @ts-ignore
                                ref={emailRef}
                                placeholder={"Re-Enter your new password"}
                                placeholderTextColor={COLORS.TEXTINPUT}
                                maxLength={30}
                                keyboardType={"default"}
                                onChangeText={setConfPassword}
                                secureTextEntry={isSecure3}
                            />
                        </View>
                        <View style={styles.lastImgView}>
                            <TouchableOpacity onPress={() => { passwordSecureAction(2);}} >
                                <Image
                                    style={{ tintColor: isSecure3 ? COLORS.GRAY : COLORS.BLACK }}
                                    source={Images.eye}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.confirmView}>
                    <TouchableOpacity style={styles.confirmFirstView} onPress={() => { ChangePassword();}}>
                        <Text style={styles.confirmText}>{'Confirm'}</Text>
                    </TouchableOpacity>
                </View>
                {isLoading && <Loader />}
            </View>
        </SafeAreaView>
    );
};

export default withConnect(Changepass);

const styles = StyleSheet.create({
    confirmText: {
        color: COLORS.WHITE,
        fontSize: 15,
        fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
    },
    confirmFirstView: {
        height: height / 23,
        width: width / 5,
        backgroundColor: '#DA0D14',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    confirmView: {
        height: height / 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginHorizontal: 25,
    },
    secureInput: {
        color: COLORS.TEXTINPUT,
        fontSize: 13,
        fontFamily: FONT_FAMILIES.MONTSERAT_MEDIUM,
        flex: 1,
        paddingtop: 15,
        width: '100%',
    },
    lastImgView: {
        height: height / 25,
        width: width / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgView: {
        height: height / 25,
        width: width / 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinputtView: {
        height: height / 20,
        width: width / 1.8,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    ans: {
        marginTop: 20,
        height: height / 17,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 25,
    },
    lastView: {
        height: height / 4,
    },
    nameeText: {
        fontSize: 13,
        color: COLORS.NAME,
        fontFamily: FONT_FAMILIES.MONTSERAT_SEMIBOLD,
    },
    nameText: {
        fontSize: 16,
        color: COLORS.NAME,
        fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
    },
    nameView: {
        height: height / 40,
        width: width / 1.1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    firstView: {
        height: height / 6.5,
        width: width / 1.1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cameraView: {
        height: height / 4.5,
        marginHorizontal: 25,
        borderBottomWidth: 1,
        borderColor: '#AAAAAA',
    },
    backView: {
        height: height / 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginHorizontal: 25,
    },
    container: {
        height: height / 1,
        backgroundColor: COLORS.WHITE,
    },
    errorMessageStyle: {
        color: 'red',
        marginLeft: 30,
        fontSize: 10,
    },
});
