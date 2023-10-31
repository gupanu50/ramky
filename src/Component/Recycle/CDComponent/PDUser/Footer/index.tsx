import {
    Dimensions,
    StyleSheet,
    Modal,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { Images } from "../../../../../Assets";
import { Dropdown } from "react-native-material-dropdown-v2";
import ModalHeader from "../../../../../ReuableComponent/ModalHeader";
import StepIndicator from "react-native-step-indicator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from "lodash";
import ApiClient from '../../../../../Network';
import { showMessage } from "react-native-flash-message";
import { ActionType } from '../../../../../Redux/Type';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import moment from "moment";
import {
    COLORS,
    FONT_FAMILIES,
    METRICS,
} from "../../../../../Configration";
import withConnect from "./withConnect";
import { useDispatch } from "react-redux";
import { VALIDATE_FORM } from "../../../../../Constant";
const { height, width } = Dimensions.get("screen");
const { RECYCLE_CD_SITEOPERATOR_COLLECTED, RECYCLE_CD_SITEOPERATOR_PROCESSED, RECYCLE_CD_SITEOPERATOR_PRODUCT } = ActionType;
const Footer = (props: any) => {
    const { user } = props;
    const dispatch = useDispatch();
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: "gray",
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: "#fe7013",
        stepStrokeUnFinishedColor: "gray",
        separatorFinishedColor: "#fe7013",
        separatorUnFinishedColor: "#aaaaaa",
        stepIndicatorFinishedColor: "#fe7013",
        stepIndicatorUnFinishedColor: "gray",
        stepIndicatorCurrentColor: "gray",
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: "#fe7013",
        stepIndicatorLabelFinishedColor: "#ffffff",
        stepIndicatorLabelUnFinishedColor: "#aaaaaa",
        labelColor: "#999999",
        labelSize: 13,
        currentStepLabelColor: "#fe7013",
    };
    const [date, setDate] = useState();
    const [date1, setDate1] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const currentPosition = 1;
    const currentPosition1 = 2;
    const currentPosition2 = 1;
    const currentPosition3 = 2;
    const currentPosition8 = 1;
    const currentPosition9 = 2;
    const [isSelected, setSelected] = useState(0);
    const siteName = user.siteName[0].siteName;
    const city = user.cities[0].city;
    const email = user.email;
    const [collectwaste, setCollectedWaste] = useState({
        waste: 'Recycle', location: city,
        quantitymeasure: 'MT', siteName: siteName, quantity: "", comment: "",
    });
    const [product, setProduct] = useState({
        location1: city, quantitymeasure1: 'MT', quantitymeasure2: 'MT',
        quantitymeasure3: 'MT', quantitymeasure4: 'MT', siteName: siteName,
        ks: "", pb: "", cb: "", other: "", comment1: "",
    });
    const [processed, setProcessed] = useState({
        location2: city, quantitymeasure6: 'MT', quantitymeasure7: 'MT',
        quantitymeasure8: 'MT', quantitymeasure9: 'MT', quantitymeasure10: 'MT', quantitymeasure11: 'MT',
        quantitymeasure12: 'MT', siteName: siteName, fine: "", coarses: "", tenMm: "", twentyMm: "",
        vSand: "", gsb: "", other: "", comment2: "",
    });

    const data = [
        { label: "MT", value: "MT" },
        { label: "KG", value: "KG" },
    ];
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [isSelected1, setSelected1] = useState(0);
    const [isSelected2, setSelected2] = useState(0);
    const [date2, setDate2] = useState();
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [totalWeightValidationShow, setTotalWasteValidationMessageShow] = useState(false);
    const [collectCommentValidationShow, setCollectCommentValidationMessageShow] = useState(false);
    const [productCommentValidationShow, setProductCommentValidationMessageShow] = useState(false);
    const [processedCommentValidationShow, setProcessedCommentValidationMessageShow] = useState(false);
    const [fineValidationShow, setFineValidationMessageShow] = useState(false);
    const [coarsesValidationShow, setCoarsesValidationMessageShow] = useState(false);
    const [tenMmValidationShow, setTenMmValidationMessageShow] = useState(false);
    const [twentyMmValidationShow, setTwentyMmValidationMessageShow] = useState(false);
    const [vsandValidationShow, setVsansValidationMessageShow] = useState(false);
    const [gsbValidationShow, setGsbValidationMessageShow] = useState(false);
    const [othersValidationShow, setOthersValidationMessageShow] = useState(false);
    const [krebsValidationShow, setKrebsValidationMessageShow] = useState(false);
    const [paverValidationShow, setPaverValidationMessageShow] = useState(false);
    const [cementValidationShow, setCementValidationMessageShow] = useState(false);
    const [othersProductValidationShow, setOthersProductValidationMessageShow] = useState(false);
    const data6 = [
        { label: "MT", value: "MT" },
        { label: "KG", value: "KG" },
    ];
    const data7 = [
        { label: "MT", value: "MT" },
        { label: "KG", value: "KG" },
    ];
    const data8 = [
        { label: "MT", value: "MT" },
        { label: "KG", value: "KG" },
    ];
    const data9 = [
        { label: "MT", value: "MT" },
        { label: "KG", value: "KG" },
    ];
    const data10 = [
        { label: "MT", value: "MT" },
        { label: "KG", value: "KG" },
    ];
    // *******************Validation Method********************************
    const validationCollect = () => {
        if (_.isEmpty(collectwaste.quantity.trim())) {
            setTotalWasteValidationMessageShow(true);
            initialController();
            return false;
        } else if (_.isEmpty(collectwaste.comment.trim())) {
            setCollectCommentValidationMessageShow(true);
            setSelected(1);
            return false;
        }
        return true;
    };
    const collectSaveValidation = () => {
        if (validationCollect()) {
            setShowModal(false);
            collectDataSave();
            clearCollectData();
            initialController();
        }
    };
    const validationProcessed = () => {
        if (_.isEmpty(processed.fine.trim())) {
            setFineValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.coarses.trim())) {
            setCoarsesValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.tenMm.trim())) {
            setTenMmValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.twentyMm.trim())) {
            setTwentyMmValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.vSand.trim())) {
            setVsansValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.gsb.trim())) {
            setGsbValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.other.trim())) {
            setOthersValidationMessageShow(true);
            initialController2();
            return false;
        } else if (_.isEmpty(processed.comment2.trim())) {
            setProcessedCommentValidationMessageShow(true);
            setSelected2(1);
            return false;
        }
        return true;
    };
    const processedSaveValidation = () => {
        if (validationProcessed()) {
            setShowModal2(false);
            processedDataSave();
            clearProcessedData();
            initialController2();
        }
    };
    const validationProduct = () => {
        if (_.isEmpty(product.ks.trim())) {
            setKrebsValidationMessageShow(true);
            initialController1();
            return false;
        } else if (_.isEmpty(product.pb.trim())) {
            setPaverValidationMessageShow(true);
            initialController1();
            return false;
        }
        else if (_.isEmpty(product.cb.trim())) {
            setCementValidationMessageShow(true);
            initialController1();
            return false;
        }
        else if (_.isEmpty(product.other.trim())) {
            setOthersProductValidationMessageShow(true);
            initialController1();
            return false;
        }
        else if (_.isEmpty(product.comment1.trim())) {
            setProductCommentValidationMessageShow(true);
            setSelected1(1);
            return false;
        }
        return true;
    };
    const productSaveValidation = () => {
        if (validationProduct()) {
            setShowModal1(false);
            productDataSave();
            clearProductData();
            initialController1();
        }
    };
    // ******************** Post API Methods******************************    
    const collectDataSave = async () => {
        // @ts-ignore
        var time = (moment(collectwaste?.date).format(`YYYY-MM-DD`));
        var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
        var dateTime1 = time + " " + dateTime;
        const body = {
            wasteType: collectwaste?.waste,
            // @ts-ignore
            totalWeight: (collectwaste?.quantity) + " " + (collectwaste?.quantitymeasure),
            date: dateTime1,
            // @ts-ignore
            location: collectwaste?.location,
            siteName: [{ siteName: collectwaste?.siteName }],
            userEmail: email,
            // @ts-ignore
            comments: collectwaste?.comment,
        };
        const result = await ApiClient.createApiClient().recycleSiteOperatorSaveCollectionData(body);
        // @ts-ignore
        if (result.data && result.data.status === true) {
            // @ts-ignore
            showMessage({ message: result.data.message, type: "success" });
            getCollectionApi();
        } else {
            showMessage({ message: "Data already exist for the selected Date", type: "danger" });
        }
    };
    const productDataSave = async () => {
        // @ts-ignore
        var time = (moment(product?.date1).format(`YYYY-MM-DD`));
        var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
        var dateTime1 = time + " " + dateTime;
        const body = {
            // @ts-ignore
            krebsStones: (product?.ks) + " " + (product?.quantitymeasure1),
            // @ts-ignore
            paverBlocks: (product?.pb) + " " + (product?.quantitymeasure2),
            // @ts-ignore
            cementBricks: (product?.cb) + " " + (product?.quantitymeasure3),
            // @ts-ignore
            othersProduct: (product?.other) + " " + (product?.quantitymeasure4),
            date: dateTime1,
            location: product?.location1,
            siteName: [{ siteName: product?.siteName }],
            userEmail: email,
            // @ts-ignore
            comments: product?.comment1,
        };
        const result = await ApiClient.createApiClient().recycleSiteOperatorSaveProductData(body);
        // @ts-ignore
        if (result.data && result.data.status === true) {
            // @ts-ignore
            showMessage({ message: result.data.message, type: "success" });
            getProductApi();
        }
        else {
            showMessage({ message: "Data already exist for the selected Date", type: "danger" });
        }
    };
    const processedDataSave = async () => {
        // @ts-ignore
        var time = (moment(processed?.date2).format(`YYYY-MM-DD`));
        var dateTime = (moment().format(`HH:mm:ss:SSS Z`));
        var dateTime1 = time + " " + dateTime;
        const body = {
            // @ts-ignore
            fine: (processed?.fine) + " " + (processed?.quantitymeasure6),
            // @ts-ignore
            coarseS: (processed?.coarses) + " " + (processed?.quantitymeasure7),
            // @ts-ignore
            tenMm: (processed?.tenMm) + " " + (processed?.quantitymeasure8),
            // @ts-ignore
            twentyMm: (processed?.twentyMm) + " " + (processed?.quantitymeasure9),
            // @ts-ignore
            vSand: (processed?.vSand) + " " + (processed?.quantitymeasure10),
            // @ts-ignore
            gsb: (processed?.gsb) + " " + (processed?.quantitymeasure11),
            // @ts-ignore
            others: (processed?.other) + " " + (processed?.quantitymeasure12),
            date: dateTime1,
            location: processed?.location2,
            siteName: [{ siteName: processed?.siteName }],
            userEmail: email,
            // @ts-ignore
            comments: processed?.comment2,
        };
        const result = await ApiClient.createApiClient().recycleSiteOperatorSaveProcessedData(body);
        console.log("result", result);
        // @ts-ignore
        if (result.data && result.data.status === true) {
            // @ts-ignore
            showMessage({ message: result.data.message, type: "success" });
            getProcessedApi();
        }
        else {
            showMessage({ message: "Data already exist for the selected Date", type: "danger" });
        }
    };
    // ************************ Get API Methods **********************************
    const getCollectionApi = async () => {
        const params = { siteName: siteName };
        const result = await ApiClient.createApiClient().recyclecdSiteOperatorCollected(params);
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
                    var totalWeight = 0;
                    filterDateArr.forEach(item => {
                        totalWeight = totalWeight + item.totalWeight ?? 0;
                    });
                    // @ts-ignore
                    displayArr.push({ date: element, totalWeight });
                });
            }
            // @ts-ignore
            dispatch({ type: RECYCLE_CD_SITEOPERATOR_COLLECTED, payload: displayArr });
        }
    };
    const getProductApi = async () => {
        const params = { siteName: siteName };
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
            //   @ts-ignore
            dispatch({ type: RECYCLE_CD_SITEOPERATOR_PRODUCT, payload: displayArr });
        }
    };
    const getProcessedApi = async () => {
        const params = { siteName: siteName };
        const result = await ApiClient.createApiClient().recyclecdSiteOperatorProcessed(params);
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
                    var fine = 0;
                    var coarses = 0;
                    var tenMm = 0;
                    var twentyMm = 0;
                    var vSand = 0;
                    var gsb = 0;
                    var others = 0;
                    filterDateArr.forEach(item => {
                        fine = fine + item.fine ?? 0;
                        coarses = coarses + item.coarses ?? 0;
                        tenMm = tenMm + item.tenMm ?? 0;
                        twentyMm = twentyMm + item.twentyMm ?? 0;
                        vSand = vSand + item.vSand ?? 0;
                        gsb = gsb + item.gsb ?? 0;
                        others = others + item.others ?? 0;
                    });
                    {/* @ts-ignore */ }
                    displayArr.push({ date: element, fine, coarses, tenMm, twentyMm, vSand, gsb, others });
                });
            }
            //   @ts-ignore
            dispatch({ type: RECYCLE_CD_SITEOPERATOR_PROCESSED, payload: displayArr });
        }
    };
    // *******************Date Selection Method For Collect*****************
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setDate(date);
        // @ts-ignore
        setCollectedWaste({ ...collectwaste, date });
        hideDatePicker();
    };
    // *******************Date Selection Method For Product*****************
    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };
    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };
    const handleConfirm1 = (date1) => {
        setDate1(date1);
        // @ts-ignore
        setProduct({ ...product, date1 });
        hideDatePicker1();
    };
    // *******************Date Selection Method For Processed*****************
    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);
    };
    const hideDatePicker2 = () => {
        setDatePickerVisibility2(false);
    };
    const handleConfirm2 = (date2) => {
        setDate2(date2);
        // @ts-ignore
        setProcessed({ ...processed, date2 });
        hideDatePicker2();
    };
    // ********************** Modal Going Next Page*******************
    const processStepsController = () => {
        setSelected(isSelected + 1);
    };
    const processStepsController1 = () => {
        setSelected1(isSelected1 + 1);
    };
    const processStepsController2 = () => {
        setSelected2(isSelected2 + 1);
    };
    // ********************** Modal Going Previous Page*******************
    const processStepsBackController = () => {
        setSelected(isSelected - 1);
    };
    const processStepsBackController1 = () => {
        setSelected1(isSelected1 - 1);
    };
    const processStepsBackController2 = () => {
        setSelected2(isSelected2 - 1);
    };
    //************************ Data Clearing Methods***************
    const clearCollectData = () => {
        setCollectedWaste({ ...collectwaste, quantity: "", comment: "", quantitymeasure: "MT" });
        // @ts-ignore
        setDate(null);
        setCollectCommentValidationMessageShow(false);
        setTotalWasteValidationMessageShow(false);
    };
    const clearProductData = () => {
        setProduct({
            ...product, ks: "", pb: "", cb: "", other: "", comment1: "", quantitymeasure1: "MT", quantitymeasure2: "MT",
            quantitymeasure3: "MT", quantitymeasure4: "MT",
        });
        // @ts-ignore
        setDate1(null);
        setKrebsValidationMessageShow(false);
        setPaverValidationMessageShow(false);
        setCementValidationMessageShow(false);
        setOthersProductValidationMessageShow(false);
        setProductCommentValidationMessageShow(false);
    };
    const clearProcessedData = () => {
        setProcessed({
            ...processed, fine: "", coarses: "", tenMm: "", twentyMm: "",
            vSand: "", gsb: "", other: "", comment2: "", quantitymeasure6: "MT", quantitymeasure7: "MT",
            quantitymeasure8: "MT", quantitymeasure9: "MT", quantitymeasure10: "MT",
            quantitymeasure11: "MT", quantitymeasure12: "MT",
        });
        // @ts-ignore
        setDate2(null);
        setFineValidationMessageShow(false);
        setCoarsesValidationMessageShow(false);
        setTenMmValidationMessageShow(false);
        setTwentyMmValidationMessageShow(false);
        setVsansValidationMessageShow(false);
        setGsbValidationMessageShow(false);
        setOthersValidationMessageShow(false);
    };
    // ************************* Modal Open At Starting After Submission Methods*********
    const initialController = () => {
        setSelected(0);
    };
    const initialController1 = () => {
        setSelected1(0);
    };
    const initialController2 = () => {
        setSelected2(0);
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.firsticonView}>
                <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                    <Image
                        source={Images.collect}
                        style={styles.mainimage}
                    />
                    <Text style={styles.maintext}>Collect</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ThirdiconView}>
                <TouchableOpacity onPress={() => setShowModal2(!showModal2)}>
                    <Image
                        source={Images.distribute}
                        style={styles.mainimage2}
                    />
                    <Text style={styles.maintext}>Processed</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.SecondiconView}>
                <View style={styles.SecondiconView}>
                    <TouchableOpacity onPress={() => setShowModal1(!showModal1)}>
                        <Image source={Images.sorting} style={styles.mainimage1} />
                        <Text style={[styles.maintext, { top: 1 }]}>Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/********************************************* Collect Modal ********************************/}
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <KeyboardAwareScrollView enableOnAndroid={true} >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={styles.progressstep1view}
                            >
                                {isSelected == 0 && <View style={styles.collectfirstsectionmainview}>
                                    <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(),initialController(); }}>
                                        <View style={styles.collectfirstsectiontopbarview}>
                                            <Image source={Images.closebar} />
                                        </View>
                                    </TouchableOpacity>
                                    {isSelected >= 1 ? (
                                        <View style={styles.collectmodalheadermainview}>
                                            <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
                                                <Image source={Images.backarrow} />
                                            </TouchableOpacity>
                                            <Text style={styles.collectsecondsectionheadertext}>Collect</Text>
                                        </View>
                                    ) : (
                                        <View
                                            style={styles.collectModelView}
                                        >
                                            <View
                                                style={styles.collectModelView1}
                                            >
                                                <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(); }}>
                                                    <Image
                                                        source={Images.back1}
                                                        style={styles.collectModelImage}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                                <View
                                                    style={styles.collectModelView2}
                                                >
                                                    <Text
                                                        style={styles.collectsecondsectionheadertext}
                                                    >
                                                        Collect
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <View style={[styles.collectfirstsectionstepindicatorview, { top: 0 }]}>
                                        <StepIndicator
                                            customStyles={customStyles}
                                            currentPosition={currentPosition}
                                            stepCount={2}
                                        />
                                    </View>
                                    <View style={[styles.collectfirstsectiondatamaincontainerview, { top: 0 }]}>
                                        <View style={styles.collectfirstsectionTotalwastemainview}>
                                            <View style={styles.collectfirstsectionTotalwasteview}>
                                                <Text style={styles.collectWasteType}>Waste Type</Text>
                                            </View>
                                            <View style={styles.collectfirstsectionwastemainview}>
                                                <View pointerEvents="none" style={styles.collectfirstsectionwasteview}>

                                                    <TextInput
                                                        style={styles.collectWasteTypeTextInput}
                                                        editable={false}
                                                        value={collectwaste?.waste ?? ""}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.collectfirstsectionquantitymainview, { top: 0 }]}>
                                            <View style={styles.collectfirstsectionquantityview}>
                                                <Text style={styles.segregationMainText}>Total Weight
                                                <Text style={styles.totalWeightAstring}>*</Text>
                                                </Text>
                                                
                                            </View>
                                            <View style={styles.collectfirstsectionweightmainview}>
                                                <View style={styles.collectfirstsectionweightview}>
                                                    <TextInput
                                                        keyboardType="number-pad"
                                                        placeholder={"Weight"}
                                                        style={styles.collectQuantityTextInput}
                                                        value={collectwaste?.quantity ?? ""}
                                                        placeholderTextColor={COLORS.BLACK}
                                                        selectionColor={COLORS.BLACK}
                                                        onChangeText={(text) => {
                                                            setTotalWasteValidationMessageShow(false);
                                                            setCollectedWaste({ ...collectwaste, quantity: text });
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.collectfirstsectiondropdownmainview}>
                                                <View style={styles.collectfirstsectiondropdownview}>
                                                    <Dropdown
                                                        data={data}
                                                        value={collectwaste?.quantitymeasure ?? ""}
                                                        onChangeText={(text) =>
                                                            setCollectedWaste({
                                                                ...collectwaste,
                                                                quantitymeasure: text,
                                                            })
                                                        }
                                                        underlineColor="transparent"
                                                        inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                        containerStyle={styles.modelDropdowmContainerStyle}
                                                    />
                                                    <Image
                                                        source={Images.footerDropdown}
                                                        style={styles.modelDropdowmImage}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        {totalWeightValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.PLASTICCOLLECTTOTALWEIGHT}</Text>}
                                    </View>
                                </View>}
                                {isSelected == 1 && <View style={styles.collectsecondsectionmainview}>
                                    <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(),initialController(); }}>
                                        <View style={styles.collectsecondsectiontopbarview}>
                                            <Image source={Images.closebar} />
                                        </View>
                                    </TouchableOpacity>
                                    {isSelected >= 1 ? (
                                        <View style={styles.collectsecondsectionheadermainview}>
                                            <View style={styles.collectsecondsectionheaderbackview}>
                                                <TouchableOpacity onPress={() => processStepsBackController()}>
                                                    <Image
                                                        source={Images.back1}
                                                        style={styles.collectModelImage}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.collectsecondsectionheadercollectview}>
                                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                                    <Text style={styles.collectsecondsectionheadertext}>Collect</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowModal(false);
                                                }}
                                            >
                                                <ModalHeader title={"Collect"} isRightAction={true} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <View style={styles.collectsecondsectionstepindicatorview}>
                                        <StepIndicator
                                            customStyles={customStyles}
                                            currentPosition={currentPosition1}
                                            stepCount={2}
                                        />
                                    </View>
                                    <View style={styles.collectsecondsectionmaininputsview}>
                                        <View style={styles.collectsecondsectiondatemainview}>
                                            <View style={styles.collectsecondsectiondateview}>
                                                <Text style={styles.dateText}>Select Date
                                                <Text style={styles.dateAstring}>*</Text>
                                                </Text>
                                               
                                            </View>
                                            <View style={styles.collectsecondsectiondatepickermainview}>
                                                <View style={styles.collectsecondsectiondatepickerview}>
                                                    <TouchableOpacity onPress={showDatePicker}>
                                                        <Text style={styles.sortingModelDateText}>
                                                            {date ? moment(date).format("DD-MM-YYYY") : "Select Date"}
                                                        </Text>
                                                        <DateTimePickerModal
                                                            isVisible={isDatePickerVisible}
                                                            mode="date"
                                                            maximumDate={new Date()}
                                                            // @ts-ignore
                                                            value={collectwaste?.dateselection ?? ""}
                                                            onChangeText={(text) =>
                                                                setCollectedWaste({
                                                                    ...collectwaste,
                                                                    // @ts-ignore
                                                                    dateselection: text,
                                                                })
                                                            }
                                                            onConfirm={handleConfirm}
                                                            onCancel={hideDatePicker}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.collectsecondsectionlocationmainview}>
                                            <View style={styles.collectsecondsectionlocationview}>
                                                <Text style={styles.locationMainText}>Location</Text>
                                            </View>
                                            <View style={styles.collectsecondsectiontextinputlocationmainview}>
                                                <View style={styles.collectsecondsectiontextinputlocationview}>
                                                    <TextInput
                                                        placeholderTextColor={"#000000"}
                                                        style={styles.collectLocationTextField}
                                                        editable={false}
                                                        value={collectwaste?.location ?? ""}></TextInput>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.collectsecondsectionlocationmainview1}>
                                            <View style={styles.collectsecondsectionlocationview1}>
                                                <Text style={styles.locationMainText}>Site Name</Text>
                                            </View>
                                            <View style={styles.collectsecondsectiontextinputlocationmainview1}>
                                                <View style={styles.collectsecondsectiontextinputlocationview1}>
                                                    <TextInput
                                                        placeholderTextColor={"#000000"}
                                                        style={styles.collectLocationTextField}
                                                        editable={false}
                                                        value={collectwaste?.siteName ?? ""}></TextInput>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.collectsecondsectioncommentview}>
                                            <TextInput
                                                style={!collectwaste.comment ? styles.commentTextInput : styles.commentTextInput1}
                                                placeholder={"Comments"}
                                                placeholderTextColor={COLORS.BLACK}
                                                keyboardType="default"
                                                selectionColor={COLORS.BLACK}
                                                value={collectwaste?.comment ?? ""}
                                                onChangeText={(text) => {
                                                    setCollectCommentValidationMessageShow(false);
                                                    setCollectedWaste({ ...collectwaste, comment: text });
                                                }}
                                            />
                                            {!collectwaste?.comment && <Text style={styles.commentAstring123}>*</Text>}
                                        </View>
                                        {collectCommentValidationShow && <Text style={styles.validationCommentMessageStyle}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                                    </View>
                                </View>
                                }
                                {isSelected == 2 && <View style={styles.collectthirdsectionmainview}>
                                    <View style={styles.collectthirdsectiontopbarview}>
                                        <TouchableOpacity onPress={() => { setShowModal(false), clearCollectData(),initialController(); }}>
                                        <View style={styles.collectsecondsectiontopbarview}>
                                            <Image source={Images.closebar} />
                                        </View>
                                        </TouchableOpacity>
                                    </View>
                                    {isSelected >= 1 ? (
                                        <View style={styles.collectthirdsectionheadermainview}>
                                            <View style={styles.collectthirdsectionbackimageview}>
                                                <TouchableOpacity onPress={() => processStepsBackController()}>
                                                    <Image
                                                        source={Images.back1}
                                                        style={styles.collectModelImage}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.collectthirdsectionheadertextview}>
                                                <Text style={styles.collectthirdsectionheadertext}>Review</Text>
                                            </View>
                                        </View>
                                    ) : (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowModal(false);
                                                }}
                                            >
                                                <ModalHeader title={"Collect"} isRightAction={true} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <View style={styles.collectthirdsectionmainflatlistview}>
                                        <View style={styles.collectreviewmaininputview}>
                                            <View style={styles.collectwastetypeview}>
                                                <Text style={styles.collectwastetext}>Waste Type - </Text>
                                                <Text style={styles.collectwasteresponsetext}>
                                                    {collectwaste?.waste}
                                                </Text>
                                            </View>
                                            <View style={[styles.collectquantityview, { flexDirection: "row" }]}>
                                                <Text style={styles.collectquantitytext}>Quantity - </Text>
                                                <Text style={styles.collectquantityresponsetext}>
                                                    {collectwaste?.quantity}
                                                </Text>
                                                <Text style={styles.collectquantitymeasuresresponsetext}>
                                                    {" "}{collectwaste?.quantitymeasure}
                                                </Text>
                                            </View>
                                            <View style={styles.collectdatetimeview}>
                                                <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                                                <Text style={styles.collectdatetimeresponsetext}>
                                                    {/* @ts-ignore */}
                                                    {(moment(collectwaste?.date).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}
                                                </Text>
                                            </View>
                                            <View style={styles.collectlocationview}>
                                                <Text style={styles.collectlocationtext}>Site Name - </Text>
                                                <Text style={styles.collectlocationresponsetext}>
                                                    {collectwaste?.siteName}
                                                </Text>
                                            </View>
                                            <View style={styles.collectcommentview}>
                                                <Text style={styles.collectcommenttext}>Comments - </Text>
                                                <Text style={styles.collectcommentresponsetext}>
                                                    {collectwaste?.comment}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                }
                                <View
                                    style={styles.mainview}
                                >
                                    {isSelected < 2 ? (
                                        <TouchableOpacity
                                            style={styles.maintouchableopacity}
                                            onPress={() => {
                                                processStepsController();
                                            }}
                                        >
                                            <Text
                                                style={styles.maintouchableopacitytext}
                                            >
                                                Next
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View
                                            style={styles.mainview1}
                                        >
                                            <View
                                                style={styles.mainview2}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal(false), clearCollectData(), initialController();
                                                    }}
                                                >
                                                    <View
                                                        style={styles.mainview3}
                                                    >
                                                        <Text
                                                            style={styles.maintext1}
                                                        >
                                                            Cancel
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View
                                                style={styles.mainview4}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        collectSaveValidation();
                                                    }}
                                                >
                                                    <View
                                                        style={styles.mainview5}
                                                    >
                                                        <Text
                                                            style={styles.maintext1}
                                                        >
                                                            Submit
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
            {/********************************************* Product Modal ********************************/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal1}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    setShowModal1(false);
                }}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={styles.centeredView1}>
                        <View style={styles.modalView1}>
                            <View
                                style={styles.collectmodalmainview}
                            >
                                {isSelected1 == 0 &&
                                    <View style={styles.processingfirstsectionmainview}>

                                        <TouchableOpacity onPress={() =>  {setShowModal1(false), clearProductData(),initialController1();}}>
                                            <View style={styles.processingfirstsectiontopbarview}>
                                                <Image source={Images.closebar} />
                                            </View>
                                        </TouchableOpacity>
                                        {isSelected1 >= 1 ? (
                                            <View style={styles.processingfirstsectionheadermainview}>
                                                <View style={styles.processingfirstsectionheaderbackimagrview}>
                                                    <TouchableOpacity onPress={() => setShowModal1(false)}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.modalBackImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.processingfirstsectionheadertextview}>
                                                    <Text style={styles.processingfirstsectionheadertext}>
                                                        Product
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={styles.processingfirstsectionheadermainview}>
                                                <View style={styles.processingfirstsectionheaderbackimagrview}>
                                                    <TouchableOpacity onPress={() => { setShowModal1(false), clearProductData(); }}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.modalBackImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.processingfirstsectionheadertextview}>
                                                    <Text style={styles.processingfirstsectionheadertext}>
                                                        Product
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        <View style={styles.processingfirstsectionstepindicatopview}>
                                            <StepIndicator
                                                customStyles={customStyles}
                                                currentPosition={currentPosition2}
                                                stepCount={2}
                                            />
                                        </View>
                                        <View style={styles.processingfirstsectioninputmainview}>
                                            <View style={styles.processingfirstsectiomtotalwastemainview}>
                                                <View style={styles.processingfirstsectiontotalwasteview}>
                                                    <Text style={styles.processingTextLabel}>
                                                        Krebs Stones
                                                        <Text style={styles.krebsAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>

                                                <View style={styles.processingfirstsectionweight1textinputmainview}>
                                                    <View style={styles.processingfirstsectionweight1textinputview}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.wasteTextField}
                                                            placeholder="Weight"
                                                            selectionColor={COLORS.BLACK}
                                                            value={product?.ks ?? ""}
                                                            onChangeText={(text) => {
                                                                setKrebsValidationMessageShow(false);
                                                                setProduct({ ...product, ks: text });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View style={styles.processingfirstsectiondropdown1mainview}>
                                                    <View style={styles.processingfirstsectiondropdown1view}>
                                                        <Dropdown
                                                            data={data}
                                                            underlineColor="transparent"
                                                            value={product?.quantitymeasure1 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProduct({
                                                                    ...product,
                                                                    quantitymeasure1: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                                            containerStyle={styles.wasteDropdownContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.wasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {krebsValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPRODUCTKREBS}</Text>}
                                            <View style={styles.processingfirstsectiontotalrdfmainview}>
                                                <View style={styles.processingfirstsectiontotalrdfview}>
                                                    <Text style={styles.processingTextLabel}>
                                                        Paver Blocks
                                                        <Text style={styles.paverAstring}>*</Text>
                                                    </Text>
                                                 
                                                </View>

                                                <View style={styles.processingfirstsectionweight2textinputmainview}>
                                                    <View style={styles.processingfirstsectionweight2textinputview}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.wasteTextField}
                                                            placeholder="Weight"
                                                            value={product?.pb ?? ""}
                                                            onChangeText={(text) => {
                                                                setPaverValidationMessageShow(false);
                                                                setProduct({ ...product, pb: text });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View style={styles.processingfirstsectiondropdown2mainview}>
                                                    <View style={styles.processingfirstsectiondropdown2view}>
                                                        <Dropdown
                                                            data={data}
                                                            underlineColor="transparent"
                                                            value={product?.quantitymeasure2 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProduct({
                                                                    ...product,
                                                                    quantitymeasure2: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                                            containerStyle={styles.wasteDropdownContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.wasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {paverValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPRODUCTPAVER}</Text>}
                                            <View style={styles.processingfirstsectiontotalinertsmainview}>
                                                <View
                                                    style={styles.processingfirstsectiontotalrdfview}
                                                >
                                                    <Text style={styles.processingTextLabel}>
                                                        Cement Bricks
                                                        <Text style={styles.cementAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>
                                                <View
                                                    style={styles.processingfirstsectionweight2textinputmainview}
                                                >
                                                    <View
                                                        style={styles.processingfirstsectionweight2textinputview}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.wasteTextField}
                                                            placeholder="Weight"
                                                            value={product?.cb ?? ""}
                                                            onChangeText={(text) => {
                                                                setCementValidationMessageShow(false);
                                                                setProduct({
                                                                    ...product,
                                                                    cb: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.processingfirstsectiondropdown2mainview}
                                                >
                                                    <View
                                                        style={styles.processingfirstsectiondropdown2view}
                                                    >
                                                        <Dropdown
                                                            data={data}
                                                            underlineColor="transparent"
                                                            value={product?.quantitymeasure3 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProduct({
                                                                    ...product,
                                                                    quantitymeasure3: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                                            containerStyle={styles.wasteDropdownContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.wasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {cementValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPRODUCTCEMENT}</Text>}
                                            <View
                                                style={styles.processingfirstsectiontotalrdfmainview}
                                            >
                                                <View
                                                    style={styles.processingfirstsectiontotalrdfview}
                                                >
                                                    <Text style={styles.processingTextLabel}>
                                                        Others Product
                                                        <Text style={styles.othersProductAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>

                                                <View
                                                    style={styles.processingfirstsectionweight2textinputmainview}
                                                >
                                                    <View
                                                        style={styles.processingfirstsectionweight2textinputview}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.wasteTextField}
                                                            placeholder="Weight"
                                                            value={product?.other ?? ""}
                                                            onChangeText={(text) => {
                                                                setOthersProductValidationMessageShow(false);
                                                                setProduct({
                                                                    ...product,
                                                                    other: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.processingfirstsectiondropdown2mainview}
                                                >
                                                    <View
                                                        style={styles.processingfirstsectiondropdown2view}
                                                    >
                                                        <Dropdown
                                                            data={data}
                                                            underlineColor="transparent"
                                                            value={product?.quantitymeasure4 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProduct({
                                                                    ...product,
                                                                    quantitymeasure4: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.wasteDropdownInputContainerStyle}
                                                            containerStyle={styles.wasteDropdownContainerStyle}
                                                        />

                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.wasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {othersProductValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPRODUCTOTHERS}</Text>}
                                        </View>
                                    </View>
                                }
                                {isSelected1 == 1 &&
                                    <View style={styles.collectsecondsectionmainview}>
                                        <TouchableOpacity onPress={() =>  {setShowModal1(false), clearProductData(),initialController1();}}>
                                            <View
                                                style={styles.collectsecondsectiontopbarview}
                                            >
                                                <Image source={Images.closebar} />
                                            </View>
                                        </TouchableOpacity>
                                        {isSelected1 >= 1 ? (
                                            <View
                                                style={styles.collectsecondsectionheadermainview}
                                            >
                                                <View
                                                    style={styles.collectsecondsectionheaderbackview}
                                                >
                                                    <TouchableOpacity onPress={() => processStepsBackController1()}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.modalBackImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity onPress={() => setShowModal1(false)}>
                                                    <View
                                                        style={styles.collectsecondsectionheadercollectview}
                                                    >
                                                        <Text
                                                            style={styles.processingMainModelText}
                                                        >
                                                            Product
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal1(false);
                                                    }}
                                                >
                                                    <ModalHeader title={"Product"} isRightAction={true} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <View
                                            style={styles.collectsecondsectionstepindicatorview}
                                        >
                                            <StepIndicator
                                                customStyles={customStyles}
                                                currentPosition={currentPosition3}
                                                stepCount={2}
                                            />
                                        </View>
                                        <View
                                            style={styles.collectsecondsectionmaininputsview}
                                        >
                                            <View
                                                style={styles.collectsecondsectiondatemainview}
                                            >
                                                <View
                                                    style={styles.collectsecondsectiondateview}
                                                >
                                                    <Text style={styles.collectmodalselectdatetext}>Select Date
                                                    <Text style={styles.dateAstring}>*</Text>
                                                    </Text>
                                                 
                                                </View>

                                                <View
                                                    style={styles.collectsecondsectiondatepickermainview}
                                                >
                                                    <View
                                                        style={styles.collectsecondsectiondatepickerview}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={showDatePicker1}
                                                        >
                                                            <Text
                                                                style={styles.collectmodalselecrdatevaluetext}
                                                            >
                                                                {date1 ? moment(date1).format("DD-MM-YYYY") : "Select Date"}
                                                            </Text>
                                                            <DateTimePickerModal
                                                                isVisible={isDatePickerVisible1}
                                                                mode="date"
                                                                maximumDate={new Date()}
                                                                onConfirm={handleConfirm1}
                                                                onCancel={hideDatePicker1}
                                                                // @ts-ignore
                                                                value={product?.dateselection1 ?? ""}
                                                                onChangeText={(text) =>
                                                                    setProduct({
                                                                        ...product,
                                                                        // @ts-ignore
                                                                        dateselection1: text,
                                                                    })
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.collectsecondsectionlocationmainview}>
                                                <View style={styles.collectsecondsectionlocationview}>
                                                    <Text style={styles.collectmodallocationtext}>Location</Text>
                                                </View>
                                                <View style={styles.collectsecondsectiontextinputlocationmainview}>
                                                    <View style={styles.collectsecondsectiontextinputlocationview}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            style={styles.collectmodallocationtextinput}
                                                            editable={false}
                                                            value={product?.location1 ?? ""}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.collectsecondsectionlocationmainview}>
                                                <View style={styles.collectsecondsectionlocationview}>
                                                    <Text style={styles.collectmodallocationtext}>Site Name</Text>
                                                </View>
                                                <View style={styles.collectsecondsectiontextinputlocationmainview}>
                                                    <View style={styles.collectsecondsectiontextinputlocationview1}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            style={[styles.collectmodallocationtextinput, { fontSize: responsiveFontSize(1.6) }]}
                                                            editable={false}
                                                            value={product?.siteName ?? ""}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                            </View>

                                            <View
                                                style={styles.collectsecondsectioncommentview}
                                            >
                                                <TextInput
                                                    style={!product.comment1 ? styles.collectmodalcommenttextinput : styles.collectmodalcommenttextinput1}
                                                    placeholder={"Comments"}
                                                    placeholderTextColor={COLORS.BLACK}
                                                    keyboardType="default"
                                                    selectionColor={COLORS.BLACK}
                                                    maxLength={140}
                                                    value={product?.comment1 ?? ""}
                                                    onChangeText={(text) => {
                                                        setProductCommentValidationMessageShow(false);
                                                        setProduct({ ...product, comment1: text });
                                                    }}
                                                />
                                                {!product?.comment1 && <Text style={styles.commentAstring1234}>*</Text>}
                                            </View>
                                            {productCommentValidationShow && <Text style={styles.validationCommentMessageStyle}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                                        </View>
                                    </View>
                                }
                                {isSelected1 == 2 &&
                                    <View
                                        style={styles.collectthirdsectionmainview}
                                    >
                                        <View
                                            style={styles.collectthirdsectiontopbarview}
                                        >
                                            <TouchableOpacity onPress={() => {setShowModal1(false),clearProductData(),initialController1();}}>
                                            <View style={styles.processingfirstsectiontopbarview}>
                                                <Image source={Images.closebar} />
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                        {isSelected1 >= 1 ? (
                                            <View
                                                style={styles.collectthirdsectionheadermainview}
                                            >
                                                <View
                                                    style={styles.collectthirdsectionbackimageview}
                                                >
                                                    <TouchableOpacity onPress={() => processStepsBackController1()}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.modalBackImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View
                                                    style={styles.collectthirdsectionheadertextview}
                                                >
                                                    <Text
                                                        style={styles.reviewText}
                                                    >
                                                        Review
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal1(false);
                                                    }}
                                                >
                                                    <ModalHeader title={"Product"} isRightAction={true} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <View style={styles.collectthirdsectionmainflatlistview}>
                                            <View>
                                                <View style={styles.collectreviewmaininputview}>
                                                    <View style={styles.reviewTextLabelView}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Krebs Stones - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {product?.ks}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {product?.quantitymeasure1}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.reviewTextLabelView}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Paver blocks - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {product?.pb}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {product?.quantitymeasure2}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.reviewTextLabelView}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Cement Bricks - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {product?.cb}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {product?.quantitymeasure3}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.reviewTextLabelView}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Others - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {product?.other}
                                                            </Text>
                                                        </View>

                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {product?.quantitymeasure4}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.collectdatetimeview}>
                                                        <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                                                        <Text style={styles.collectdatetimeresponsetext}>
                                                            {/* @ts-ignore */}
                                                            {(moment(product?.date1).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.collectlocationview}>
                                                        <Text style={styles.collectlocationtext}>Site Name - </Text>
                                                        <Text style={styles.collectlocationresponsetext}>
                                                            {product?.siteName}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.collectcommentview}>
                                                        <Text style={styles.collectcommenttext}>Comments - </Text>
                                                        <Text style={styles.collectcommentresponsetext}>
                                                            {product?.comment1}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                }
                                <View
                                    style={styles.collectmodalsecondpagemaineview}
                                >
                                    {isSelected1 < 2 ? (
                                        <TouchableOpacity
                                            style={styles.collectmodalsecondpageTouchable}
                                            onPress={() => {
                                                processStepsController1();
                                            }}
                                        >
                                            <Text
                                                style={styles.collectmodalsecondpagenextText}
                                            >
                                                Next
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View
                                            style={styles.collectmodalcancelbuttonmainview}
                                        >
                                            <View
                                                style={styles.collectmodalcancelbuttonsubview}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal1(false), clearProductData(), initialController1();
                                                    }}
                                                >
                                                    <View
                                                        style={styles.collectmodalcancelmainview1}
                                                    >
                                                        <Text
                                                            style={styles.collectmodalcanceltext}
                                                        >
                                                            Cancel
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View
                                                style={styles.collectmodalsubmitTouchableview}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        productSaveValidation();
                                                    }}
                                                >
                                                    <View
                                                        style={styles.collectmodalsubmitview}
                                                    >
                                                        <Text
                                                            style={styles.collectmodalsubmittext}
                                                        >
                                                            Submit
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
            {/* ******************************************* Processed Modal ******************************/}
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={showModal2}
                onRequestClose={() => {
                    setShowModal2(false);
                }}
            >
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={styles.centeredView2}>
                        <View style={styles.modalView2}>
                            <View
                                style={styles.progressstep1view}
                            >
                                {isSelected2 == 0 &&
                                    <View style={styles.processingfirstsectionmainview}>

                                        <TouchableOpacity onPress={() =>{ setShowModal2(false), clearProcessedData(),initialController2(); }}>
                                            <View style={styles.processingfirstsectiontopbarview}>
                                                <Image source={Images.closebar} />
                                            </View>
                                        </TouchableOpacity>
                                        {isSelected2 >= 1 ? (
                                            <View style={styles.processingfirstsectionheadermainview}>
                                                <View style={styles.processingfirstsectionheaderbackimagrview}>
                                                    <TouchableOpacity onPress={() => setShowModal2(false)}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.collectModelImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.processingfirstsectionheadertextview}>
                                                    <Text style={styles.processingfirstsectionheadertext}>
                                                        Processed
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={styles.processingfirstsectionheadermainview}>
                                                <View style={styles.processingfirstsectionheaderbackimagrview}>
                                                    <TouchableOpacity onPress={() => { setShowModal2(false), clearProcessedData(); }}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.collectModelImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.processingfirstsectionheadertextview}>
                                                    <Text style={styles.processingfirstsectionheadertext}>
                                                        Processed
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                        <View style={styles.processingfirstsectionstepindicatopview1}>
                                            <StepIndicator
                                                customStyles={customStyles}
                                                currentPosition={currentPosition8}
                                                stepCount={2}
                                            />
                                        </View>
                                        <View style={styles.processingfirstsectioninputmainview}>
                                            <View style={styles.processedFirstSectionTotalWasteMainView}>
                                                <View style={styles.processingfirstsectiontotalwasteview}>
                                                    <Text style={styles.processedMainText}>
                                                        Fine
                                                        <Text style={styles.fineAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>
                                                <View style={styles.processingfirstsectionweight1textinputmainview}>
                                                    <View style={styles.processingfirstsectionweight1textinputview}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            selectionColor={COLORS.BLACK}
                                                            value={processed?.fine ?? ""}
                                                            onChangeText={(text) => {
                                                                setFineValidationMessageShow(false);
                                                                setProcessed({ ...processed, fine: text });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View style={styles.processingfirstsectiondropdown1mainview}>
                                                    <View style={styles.processingfirstsectiondropdown1view}>
                                                        <Dropdown
                                                            data={data6}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure6 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure6: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {fineValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSEDFINE}</Text>}
                                            <View style={styles.processingfirstsectiontotalrdfmainview}>
                                                <View style={styles.processingfirstsectiontotalrdfview}>
                                                    <Text style={styles.processedMainText}>
                                                        Coarse s
                                                        <Text style={styles.coarsesAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>
                                                <View style={styles.processingfirstsectionweight2textinputmainview}>
                                                    <View style={styles.processingfirstsectionweight2textinputview}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            value={processed?.coarses ?? ""}
                                                            onChangeText={(text) => {
                                                                setCoarsesValidationMessageShow(false);
                                                                setProcessed({ ...processed, coarses: text });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View style={styles.processingfirstsectiondropdown2mainview}>
                                                    <View style={styles.processingfirstsectiondropdown2view}>
                                                        <Dropdown
                                                            data={data7}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure7 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure7: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {coarsesValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSEDCOARSES}</Text>}
                                            <View style={styles.processingfirstsectiontotalinertsmainview}>
                                                <View
                                                    style={styles.sortingModelView6}
                                                >
                                                    <Text style={styles.processedMainText}>
                                                        10 mm
                                                        <Text style={styles.tenmmAstring}>*</Text>
                                                    </Text>
                                                 
                                                </View>
                                                <View
                                                    style={styles.sortingModelView1}
                                                >
                                                    <View
                                                        style={styles.sortingModelView2}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            value={processed?.tenMm ?? ""}
                                                            onChangeText={(text) => {
                                                                setTenMmValidationMessageShow(false);
                                                                setProcessed({
                                                                    ...processed,
                                                                    tenMm: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.sortingModelView3}
                                                >
                                                    <View
                                                        style={styles.sortingModelView4}
                                                    >
                                                        <Dropdown
                                                            data={data8}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure8 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure8: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {tenMmValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSED10MM}</Text>}
                                            <View
                                                style={styles.sortingModelView5}
                                            >
                                                <View
                                                    style={styles.sortingModelView6}
                                                >
                                                    <Text style={styles.processedMainText}>
                                                        20 mm
                                                        <Text style={styles.twentymmAstring}>*</Text>
                                                    </Text>
                                               
                                                </View>
                                                <View
                                                    style={styles.sortingModelView1}
                                                >
                                                    <View
                                                        style={styles.sortingModelView2}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            value={processed?.twentyMm ?? ""}
                                                            onChangeText={(text) => {
                                                                setTwentyMmValidationMessageShow(false);
                                                                setProcessed({
                                                                    ...processed,
                                                                    twentyMm: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.sortingModelView3}
                                                >
                                                    <View
                                                        style={styles.sortingModelView4}
                                                    >
                                                        <Dropdown
                                                            data={data9}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure9 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure9: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {twentyMmValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSED20MM}</Text>}
                                            <View
                                                style={styles.sortingModelView5}
                                            >
                                                <View
                                                    style={styles.sortingModelView6}
                                                >
                                                    <Text style={styles.processedMainText}>
                                                        V sand
                                                        <Text style={styles.vsandAstring}>*</Text>
                                                    </Text>
                                                  
                                                </View>

                                                <View
                                                    style={styles.sortingModelView1}
                                                >
                                                    <View
                                                        style={styles.sortingModelView2}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            value={processed?.vSand ?? ""}
                                                            onChangeText={(text) => {
                                                                setVsansValidationMessageShow(false);
                                                                setProcessed({
                                                                    ...processed,
                                                                    vSand: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>

                                                <View
                                                    style={styles.sortingModelView3}
                                                >
                                                    <View
                                                        style={styles.sortingModelView4}
                                                    >
                                                        <Dropdown
                                                            data={data10}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure10 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure10: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {vsandValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSEDVSAND}</Text>}
                                            <View
                                                style={styles.sortingModelView5}
                                            >
                                                <View
                                                    style={styles.sortingModelView6}
                                                >
                                                    <Text style={styles.processedMainText}>
                                                        GSB
                                                        <Text style={styles.gsbAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>
                                                <View
                                                    style={styles.sortingModelView1}
                                                >
                                                    <View
                                                        style={styles.sortingModelView2}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            value={processed?.gsb ?? ""}
                                                            onChangeText={(text) => {
                                                                setGsbValidationMessageShow(false);
                                                                setProcessed({
                                                                    ...processed,
                                                                    gsb: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.sortingModelView3}
                                                >
                                                    <View
                                                        style={styles.sortingModelView4}
                                                    >
                                                        <Dropdown
                                                            data={data10}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure11 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure11: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {gsbValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSEDGSB}</Text>}
                                            <View
                                                style={styles.sortingModelView5}
                                            >
                                                <View
                                                    style={styles.sortingModelView6}
                                                >
                                                    <Text style={styles.processedMainText}>
                                                        Others
                                                        <Text style={styles.otherAstring}>*</Text>
                                                    </Text>
                                                   
                                                </View>
                                                <View
                                                    style={styles.sortingModelView1}
                                                >
                                                    <View
                                                        style={styles.sortingModelView2}
                                                    >
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            keyboardType="number-pad"
                                                            style={styles.textFieldProcessed}
                                                            placeholder="Weight"
                                                            value={processed?.other ?? ""}
                                                            onChangeText={(text) => {
                                                                setOthersValidationMessageShow(false);
                                                                setProcessed({
                                                                    ...processed,
                                                                    other: text,
                                                                });
                                                            }}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.sortingModelView3}
                                                >
                                                    <View
                                                        style={styles.sortingModelView4}
                                                    >
                                                        <Dropdown
                                                            data={data10}
                                                            underlineColor="transparent"
                                                            value={processed?.quantitymeasure12 ?? ""}
                                                            onChangeText={(text) =>
                                                                setProcessed({
                                                                    ...processed,
                                                                    quantitymeasure12: text,
                                                                })
                                                            }
                                                            inputContainerStyle={styles.modelDropdowmInputContainerStyle}
                                                            containerStyle={styles.modelDropdowmWasteContainerStyle}
                                                        />
                                                        <Image
                                                            source={Images.footerDropdown}
                                                            style={styles.modelDropdowmWasteDropdownImage}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {othersValidationShow && <Text style={styles.validationMessageStyle}>{VALIDATE_FORM.RECYCLECDPROCESSEDOTHERS}</Text>}
                                        </View>
                                    </View>
                                }
                                {isSelected2 == 1 &&
                                    <View
                                        style={styles.sortingModelView7}
                                    >
                                        <TouchableOpacity onPress={() => {setShowModal2(false),clearProcessedData(),initialController2();}}>
                                            <View
                                                style={styles.sortingModelView8}
                                            >
                                                <Image source={Images.closebar} />
                                            </View>
                                        </TouchableOpacity>
                                        {isSelected2 >= 1 ? (
                                            <View
                                                style={styles.distributeModelView}
                                            >
                                                <View
                                                    style={styles.collectModelView1}
                                                >
                                                    <TouchableOpacity onPress={() => processStepsBackController2()}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.collectModelImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity onPress={() => setShowModal2(false)}>
                                                    <View
                                                        style={styles.collectModelView2}
                                                    >
                                                        <Text
                                                            style={styles.sortingModelText}
                                                        >
                                                            Processed
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal2(false);
                                                    }}
                                                >
                                                    <ModalHeader title={"Processed"} isRightAction={true} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <View
                                            style={styles.sortingModelView9}
                                        >
                                            <StepIndicator
                                                customStyles={customStyles}
                                                currentPosition={currentPosition9}
                                                stepCount={2}
                                            />
                                        </View>
                                        <View
                                            style={styles.sortingModelView10}
                                        >
                                            <View
                                                style={styles.sortingModelView5}
                                            >
                                                <View
                                                    style={styles.sortingModelView11}
                                                >
                                                    <Text style={styles.dateText}>Select Date
                                                    <Text style={styles.dateAstring}>*</Text>
                                                    </Text>
                                                  
                                                </View>
                                                <View
                                                    style={styles.sortingModelView12}
                                                >
                                                    <View
                                                        style={styles.sortingModelView13}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={showDatePicker2}
                                                        >
                                                            <Text
                                                                style={styles.sortingModelDateText}
                                                            >
                                                                {date2 ? moment(date2).format("DD-MM-YYYY") : "Select Date"}
                                                            </Text>
                                                            <DateTimePickerModal
                                                                isVisible={isDatePickerVisible2}
                                                                mode="date"
                                                                maximumDate={new Date()}
                                                                onConfirm={handleConfirm2}
                                                                onCancel={hideDatePicker2}
                                                                // @ts-ignore
                                                                value={processed?.dateselection2 ?? ""}
                                                                onChangeText={(text) =>
                                                                    setProcessed({
                                                                        ...processed,
                                                                        // @ts-ignore
                                                                        dateselection2: text,
                                                                    })
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.collectsecondsectionlocationmainview}>
                                                <View style={styles.collectsecondsectionlocationview}>
                                                    <Text style={styles.locationMainText}>Location</Text>
                                                </View>

                                                <View style={styles.collectsecondsectiontextinputlocationmainview}>
                                                    <View style={styles.collectsecondsectiontextinputlocationview}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            style={styles.processedLocationTextField}
                                                            editable={false}
                                                            value={processed?.location2 ?? ""}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.collectsecondsectionlocationmainview1}>
                                                <View style={styles.collectsecondsectionlocationview1}>
                                                    <Text style={styles.locationMainText}>Site Name</Text>
                                                </View>
                                                <View style={styles.collectsecondsectiontextinputlocationmainview1}>
                                                    <View style={styles.collectsecondsectiontextinputlocationview1}>
                                                        <TextInput
                                                            placeholderTextColor={"#000000"}
                                                            style={styles.collectLocationTextField}
                                                            editable={false}
                                                            value={processed?.siteName ?? ""}></TextInput>
                                                    </View>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.sortingModelView15}
                                            >
                                                <TextInput
                                                    style={!processed?.comment2 ? styles.commentTextInput : styles.commentTextInput1}
                                                    placeholder={"Comments"}
                                                    placeholderTextColor={COLORS.BLACK}
                                                    keyboardType="default"
                                                    selectionColor={COLORS.BLACK}
                                                    value={processed?.comment2 ?? ""}
                                                    onChangeText={(text) => {
                                                        setProcessedCommentValidationMessageShow(false);
                                                        setProcessed({ ...processed, comment2: text });
                                                    }}
                                                />
                                                {!processed?.comment2 && <Text style={styles.commentAstring}>*</Text>}
                                            </View>
                                            {processedCommentValidationShow && <Text style={styles.validationProcessedCommentMessageStyle}>{VALIDATE_FORM.MSWCTCOMMENT}</Text>}
                                        </View>
                                    </View>
                                }
                                {isSelected2 == 2 &&
                                    <View
                                        style={styles.sortingModelView7}
                                    >
                                        <View
                                            style={styles.sortingModelView8}
                                        >
                                            <TouchableOpacity onPress={() =>{ setShowModal2(false), clearProcessedData(),initialController2(); }}>
                                            <View
                                                style={styles.sortingModelView8}
                                            >
                                                <Image source={Images.closebar} />
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                        {isSelected2 >= 1 ? (
                                            <View
                                                style={styles.collectModelView}
                                            >
                                                <View
                                                    style={styles.collectModelView1}
                                                >
                                                    <TouchableOpacity onPress={() => processStepsBackController2()}>
                                                        <Image
                                                            source={Images.back1}
                                                            style={styles.collectModelImage}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View
                                                    style={styles.collectModelView2}
                                                >
                                                    <Text
                                                        style={styles.sortingModelText}
                                                    >
                                                        Review
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal2(false);
                                                    }}
                                                >
                                                    <ModalHeader title={"Processed"} isRightAction={true} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <View
                                            style={styles.sortingModelView16}
                                        >
                                            <View>
                                                <View style={styles.collectreviewmaininputview1}>
                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Fine - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.fine}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>

                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure6}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Coarses - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.coarses}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>

                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure7}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>10 mm - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.tenMm}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure8}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>20 mm - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.twentyMm}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure9}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>V sand - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.vSand}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure10}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>GSB - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.gsb}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure11}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.segregationReview}>
                                                        <View style={styles.collectwastetypeview}>
                                                            <Text style={styles.collectwastetext}>Others - </Text>
                                                            <Text style={styles.collectwasteresponsetext}>
                                                                {processed?.other}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.collectquantitymeasureview}>
                                                            <Text style={[styles.collectquantitymeasuresresponsetext, { marginLeft: 10 }]}>
                                                                {processed?.quantitymeasure12}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.collectdatetimeview}>
                                                        <Text style={styles.collectdatetimetext}>Date & Time - </Text>
                                                        <Text style={styles.collectdatetimeresponsetext}>
                                                            {/* @ts-ignore */}
                                                            {(moment(processed?.date2).format("YYYY-MM-DD")) + " " + (moment().format(`HH:mm:ss`))}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.collectlocationview}>
                                                        <Text style={styles.collectlocationtext}>Site Name - </Text>
                                                        <Text style={styles.collectlocationresponsetext}>
                                                            {processed?.siteName}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.collectcommentview}>
                                                        <Text style={styles.collectcommenttext}>Comments - </Text>
                                                        <Text style={styles.collectcommentresponsetext}>
                                                            {processed?.comment2}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                }
                                <View
                                    style={styles.mainview}
                                >
                                    {isSelected2 < 2 ? (
                                        <TouchableOpacity
                                            style={styles.maintouchableopacity}
                                            onPress={() => {
                                                processStepsController2();
                                            }}
                                        >
                                            <Text
                                                style={styles.maintouchableopacitytext}
                                            >
                                                Next
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View
                                            style={styles.mainview1}
                                        >
                                            <View
                                                style={styles.mainview2}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowModal2(false), clearProcessedData(), initialController2();
                                                    }}
                                                >
                                                    <View
                                                        style={styles.mainview3}
                                                    >
                                                        <Text
                                                            style={styles.maintouchableopacitytext}
                                                        >
                                                            Cancel
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View
                                                style={styles.mainview4}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        processedSaveValidation();
                                                    }}
                                                >
                                                    <View
                                                        style={styles.mainview5}
                                                    >
                                                        <Text
                                                            style={styles.maintouchableopacitytext}
                                                        >
                                                            Submit
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        </View>
    );
};

export default withConnect(Footer);
const styles = StyleSheet.create({
    mainContainer: {
        height: height / 13,
        backgroundColor: "#DA0D14",
        flexDirection: "row",
    },
    firsticonView: {
        height: height / 14,
        width: width / 3,
        justifyContent: "center",
        alignItems: "center",
    },
    SecondiconView: {
        height: height / 14,
        width: width / 3,
        justifyContent: "center",
        alignItems: "center",
    },
    ThirdiconView: {
        height: height / 14,
        width: width / 3,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        height: height / 1,
        width: width / 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        height: height / 1.2,
        width: width / 1,
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        shadowColor: "rgba(255, 255, 255, 0.8)",
    },
    centeredView1: {
        height: height / 1,
        width: width / 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView1: {
        height: height / 1.2,
        width: width / 1,
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        shadowColor: "rgba(255, 255, 255, 0.8)",
    },
    centeredView2: {
        height: height / 1,
        width: width / 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView2: {
        height: height / 1.2,
        width: width / 1,
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        shadowColor: "rgba(255, 255, 255, 0.8)",
    },
    secureInput8: {
        color: "white",
        fontSize: 16,
        marginLeft: -10,
        textAlign: "center",
        alignSelf: "center",
    },
    secureView1: {
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "RED",
        height: METRICS.MAR_60,
        width: "90%",
        marginTop: METRICS.MAR_10,
        alignSelf: "center",
    },
    email1: {
        marginVertical: METRICS.MAR_19,
        marginHorizontal: METRICS.MAR_19,
    },
    secureInput9: {
        color: "gray",
        fontSize: 16,
        marginVertical: METRICS.MAR_20,
    },
    item: {
        width: width / 1.2,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        height: height / 19,
    },
    item1: {
        width: width / 1.2,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        height: height / 24,
    },
    item2: {
        width: width / 1.2,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        height: height / 20,
    },
    progressstep1view: {
        height: height / 1.65,
        width: width / 1,
    },
    progressstep1view1: {
        height: height / 22,
        width: width / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    progressstep1view2: {
        height: height / 11,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    progressstep1text: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
        color: "#2D2D2D",
        marginLeft: 10,
    },
    progressstep1text1: { paddingLeft: 4, color: "#606060" },
    progressstep1view3: {
        height: height / 10,
        width: width / 1,
        justifyContent: "center",
    },
    progressstep1view4: {
        height: height / 3,
        width: width / 1,
    },
    progressstep1view5: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    progressstep1view6: {
        height: height / 13,
        width: width / 2.4,
        justifyContent: "center",
    },
    progressstep1view7: {
        height: height / 18,
        width: width / 2.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    progressstep1view8: {
        height: height / 18,
        width: width / 3,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    progressstep1view9: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    progressstep1view10: {
        height: height / 15,
        width: width / 3.5,
        justifyContent: "center",
    },
    progressstep1view11: {
        height: height / 15,
        width: width / 3.49,
        justifyContent: "center",
        alignItems: "center",
    },
    progressstep1view12: {
        height: height / 18,
        width: width / 4.8,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    progressstep1view13: {
        height: height / 15,
        width: width / 3.8,
        justifyContent: "center",
    },
    progressstep1view14: {
        height: height / 19,
        width: width / 3.9,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
    },
    progressstep1dropdowninput: {
        height: height / 28,
        width: width / 3,
    },
    progressstep1dropdowncontainer: {
        width: width / 5,
        justifyContent: "flex-start",
        height: height / 13,
    },
    progressstep1dropdownimage: {
        tintColor: "gray",
        height: height / 50,
        width: width / 28,
        alignSelf: "center",
        marginBottom: 8,
    },
    progressstep2view: {
        height: height / 11.4,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    progressstep2view1: {
        height: height / 11.4,
        width: width / 7.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    progressstep2image: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        tintColor: "black",
    },
    progressstep2view2: {
        height: height / 11.4,
        width: width / 1.8,
        justifyContent: "center",
    },
    progressstep2view3: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
        color: "#2D2D2D",
        marginLeft: 10,
    },
    progressstep2view4: {
        height: height / 3,
        width: width / 1,
        alignItems: "center",
    },
    progressstep2view5: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1.13,
        flexDirection: "row",
    },
    progressstep2view6: {
        height: height / 13,
        width: width / 2.5,
        justifyContent: "center",
    },
    progressstep2view7: {
        height: height / 15,
        width: width / 2.4,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    progressstep2view8: {
        height: height / 15,
        width: width / 3.5,
        borderBottomWidth: 1.2,
        borderBottomColor: "#D8D8D8",
        justifyContent: "center",
        alignItems: "center",
    },
    progressstep2text: {
        color: "#000000",
        fontSize: 14,
    },
    progressstep2view9: {
        height: height / 15,
        width: width / 2.4,
        justifyContent: "center",
    },
    progressstep2view10: {
        height: height / 18,
        width: width / 2.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    progressstep2view11: {
        height: height / 12,
        width: width / 1.2,
    },
    mainfloatingcontainerstyle: {
        borderBottomWidth: 1,
        width: width / 3,
        height: height / 17,
        borderBottomColor: "#D8D8D8",
    },
    progressstep3view: {
        height: height / 2.2,
        width: width / 1,
        justifyContent: "center",
        alignItems: "center",
    },
    progressstep3view1: {
        height: height / 2.5,
        width: width / 1.12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    progressstepsorting1view: {
        height: height / 11.4,
        width: width / 1,
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
    },
    progressstepsorting1text: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginLeft: 10,
    },
    progressstepsorting1view1: {
        height: height / 4,
        justifyContent: "center",
        width: width / 1,
    },
    progressstepsorting1view2: {
        height: height / 19,
        width: width / 3.9,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
    },
    dropdowninput: {
        height: height / 28,
        width: width / 3,
    },
    dropdowncontainer: {
        width: width / 5,
        justifyContent: "flex-start",
        height: height / 13,
    },
    progressstepsorting1image: {
        tintColor: "gray",
        height: height / 50,
        width: width / 28,
        alignSelf: "center",
        marginBottom: 8,
    },
    progressstepsorting1text1: { paddingLeft: 4, color: "#606060" },
    progressstepsorting1view3: {
        height: height / 12,
        width: width / 1.19,
    },
    mainfloatingcontainerstyle1: {
        borderBottomWidth: 1,
        width: width / 3,
        height: height / 12,
        borderBottomColor: "#D8D8D8",
    },
    progressstepdistribute1view: {
        height: height / 2.5,
        alignItems: "center",
        width: width / 1,
    },
    progressstepdistribute2view: {
        height: height / 5,
        width: width / 1,
    },
    maintext: {
        color: "white",
    },
    mainimage: {
        tintColor: "#FFFFFF",
        height: height / 40,
        width: width / 17,
        marginLeft: 10,
    },
    mainimage1: {
        tintColor: "#FFFFFF",
        height: height / 55,
        width: width / 8,
    },
    mainimage2: {
        tintColor: "#FFFFFF",
        height: height / 40,
        width: width / 17,
        marginLeft: "15%",
    },
    mainview: {
        height: height / 10,
        width: width / 1,
        justifyContent: "center",
        alignItems: "center",
    },
    maintouchableopacity: {
        height: height / 17,
        width: width / 1.2,
        backgroundColor: "#DA0D14",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    maintouchableopacitytext: {
        fontSize: responsiveFontSize(2.0),
        color: "#FFFFFF",
        fontWeight: "700",
    },
    mainview1: {
        height: height / 15,
        width: width / 1,
        flexDirection: "row",
    },
    mainview2: {
        height: height / 15,
        width: width / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    mainview3: {
        height: height / 17,
        width: width / 2.5,
        backgroundColor: "#B5B5B5",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    maintext1: {
        fontSize: responsiveFontSize(2.0),
        color: "#FFFFFF",
        fontWeight: "700",
    },
    mainview4: {
        height: height / 15,
        width: width / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    mainview5: {
        height: height / 17,
        width: width / 2.5,
        backgroundColor: "#DA0D14",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    collectfirstsectionTotalwastemainview: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    collectfirstsectionTotalwasteview: {
        height: height / 13,
        width: width / 2.4,
        justifyContent: "center",
    },
    collectsecondsectioncommentview: {
        height: height / 18,
        width: width / 1.2,
        borderBottomColor: "#D8D8D8",
        justifyContent: "center",
        borderBottomWidth: 0.7,
        top: 8,
    },
    collectthirdsectionmainview: {
        height: height / 1.65,
        width: width / 1,
    },
    collectfirstsectionwastemainview: {
        height: height / 18,
        width: width / 2.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectmodalheadermainview: {
        height: height / 11,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    collectfirstsectiontopbarview: {
        height: height / 22,
        width: width / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    collectfirstsectionText: {
        fontSize: responsiveFontSize(2.4),
        fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
        color: "#2D2D2D",
        marginLeft: 10,
    },
    collectsecondsectionlocationview: {
        height: height / 15,
        width: width / 2.4,
        justifyContent: "center",
    },
    collectsecondsectionlocationview1: {
        height: height / 15,
        width: width / 2.4,
        justifyContent: "center",
    },
    collectsecondsectiontextinputlocationmainview: {
        height: height / 18,
        width: width / 2.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectsecondsectiontextinputlocationmainview1: {
        height: height / 18,
        width: width / 2.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectsecondsectiontextinputlocationview: {
        height: height / 18,
        width: width / 3,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    collectsecondsectiontextinputlocationview1: {
        height: height / 18,
        width: width / 2.5,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    collectfirstsectionmainview: {
        height: height / 1.65,
        width: width / 1,
    },
    collectsecondsectionheadertext: {
        fontSize: responsiveFontSize(2.4),
        fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
        color: "#2D2D2D",
        marginLeft: 10,
    },
    collectfirstsectionstepindicatorview: {
        height: height / 10,
        width: width / 1,
        justifyContent: "center",
    },
    collectfirstsectiondatamaincontainerview: {
        height: height / 3,
        width: width / 1,
    },
    collectfirstsectionwasteview: {
        height: height / 18,
        width: width / 3,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    collectfirstsectionquantitymainview: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    collectfirstsectionquantityview: {
        height: height / 15,
        width: width / 3.5,
        justifyContent: "center",
        bottom:11,
    },
    collectfirstsectionweightmainview: {
        height: height / 15,
        width: width / 3.49,
        justifyContent: "center",
        alignItems: "center",
    },
    collectfirstsectionweightview: {
        height: height / 18,
        width: width / 4.8,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    collectfirstsectiondropdownmainview: {
        height: height / 15,
        width: width / 3.8,
        justifyContent: "center",
    },
    collectfirstsectiondropdownview: {
        height: height / 19,
        width: width / 3.9,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
        paddingBottom:3,
    },
    collectsecondsectionmainview: {
        height: height / 1.65,
        width: width / 1,
    },
    collectsecondsectiontopbarview: {
        height: height / 22,
        width: width / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    collectsecondsectionheadermainview: {
        height: height / 11.4,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    collectsecondsectionheaderbackview: {
        height: height / 11.4,
        width: width / 7.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectquantityview: {
        flexDirection: "row",
        height: height / 18,
        alignItems: "center",
    },
    collectsecondsectionheadercollectview: {
        height: height / 11.4,
        width: width / 1.8,
        justifyContent: "center",
    },
    collectsecondsectionstepindicatorview: {
        height: height / 10,
        width: width / 1,
        justifyContent: "center",
    },
    collectsecondsectionmaininputsview: {
        height: height / 3,
        width: width / 1,
        alignItems: "center",
    },
    collectsecondsectiondatemainview: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1.13,
        flexDirection: "row",
    },
    collectsecondsectiondateview: {
        height: height / 13,
        width: width / 2.5,
        justifyContent: "center",
        bottom:7,
    },
    collectsecondsectiondatepickermainview: {
        height: height / 15,
        width: width / 2.4,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectsecondsectiondatepickerview: {
        height: height / 15,
        width: width / 3.5,
        borderBottomWidth: 1.2,
        borderBottomColor: "#D8D8D8",
        justifyContent: "center",
        alignItems: "center",
    },
    collectsecondsectionlocationmainview: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1.13,
        flexDirection: "row",
    },
    collectsecondsectionlocationmainview1: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1.13,
        flexDirection: "row",
    },
    collectthirdsectiontopbarview: {
        height: height / 22,
        width: width / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    collectthirdsectionheadermainview: {
        height: height / 11.4,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    collectthirdsectionbackimageview: {
        height: height / 11.4,
        width: width / 7.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectthirdsectionheadertextview: {
        height: height / 11.4,
        width: width / 1.8,
        justifyContent: "center",
    },
    collectthirdsectionheadertext: {
        fontSize: responsiveFontSize(2.4),
        fontFamily: FONT_FAMILIES.MONTSERAT_BOLD,
        color: "#2D2D2D",
        marginLeft: 10,
    },
    collectthirdsectionmainflatlistview: {
        height: height / 2.2,
        width: width / 0.5,
        marginLeft: 30,
    },
    collectthirdsectionflatlistview: {
        height: height / 2.5,
        width: width / 1.12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    collectreviewmaininputview: {
        marginTop: 25,
        width: width / 1.38,
    },
    collectreviewmaininputview1: {
        width: width / 1.38,
    },
    collectwastetypeview: {
        flexDirection: "row",
        height: height / 25,
        alignItems: "center",
    },
    collectwastetext: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#606060",
        fontWeight: "400",
    },
    collectwasteresponsetext: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#000000",
        fontWeight: "600",
    },
    collectquantitytext: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#606060",
        fontWeight: "400",
    },
    collectquantityresponsetext: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#000000",
        fontWeight: "600",
    },
    collectquantitymeasuretext: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#606060",
        fontWeight: "400",
    },
    collectquantitymeasuresresponsetext: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#000000",
        fontWeight: "600",
    },
    collectdatetimetext: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#606060",
        fontWeight: "400",
    },
    collectdatetimeresponsetext: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#000000",
        fontWeight: "600",
    },
    collectlocationtext: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#606060",
        fontWeight: "400",
    },
    collectlocationresponsetext: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#000000",
        fontWeight: "600",
    },
    collectcommenttext: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#606060",
        fontWeight: "400",
    },
    collectdatetimeview: {
        flexDirection: "row",
        height: height / 18,
        alignItems: "center",
    },
    collectdatetimeview1: {
        flexDirection: "row",
        top: -30,
        alignItems: "center",
    },
    collectlocationview: {
        flexDirection: "row",
        height: height / 18,
        alignItems: "center",
    },
    collectcommentview: {
        flexDirection: "row",
        marginTop: 10,
        height: height / 10,
    },
    collectcommentresponsetext: {
        fontSize: responsiveFontSize(2),
        fontFamily: FONT_FAMILIES.MONTSERAT_REGULAR,
        color: "#000000",
        fontWeight: "600",
    },
    processingfirstsectionmainview: {
        height: height / 1.65,
        width: width / 1,
    },
    processingfirstsectiontopbarview: {
        height: height / 22,
        width: width / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    processingfirstsectionheadermainview: {
        height: height / 11.4,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    processingfirstsectionheaderbackimagrview: {
        height: height / 11.4,
        width: width / 7.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    processingfirstsectionheadertextview: {
        height: height / 11.4,
        width: width / 1.8,
        justifyContent: "center",
    },
    processingfirstsectionheadertext: {
        textAlignVertical: "center",
        fontSize: responsiveFontSize(2.4),
        fontWeight: "700",
        color: "black",
        marginLeft: 10,
    },
    processingfirstsectionstepindicatopview: {
        height: height / 14,
        width: width / 1,
        justifyContent: "center",
    },
    processingfirstsectionstepindicatopview1: {
        height: height / 14,
        width: width / 1,
        justifyContent: "center",
        bottom: 35,
    },
    processingfirstsectioninputmainview: {
        height: height / 2.8,
        justifyContent: "center",
        width: width / 1,
    },
    processingfirstsectiomtotalwastemainview: {
        height: height / 15.5,
        justifyContent: "center",
        flexDirection: "row",
    },
    processedFirstSectionTotalWasteMainView: {
        height: height / 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    processingfirstsectiontotalwasteview: {
        height: height / 15,
        width: width / 3.5,
        justifyContent: "center",
        bottom:9,
    },
    processingfirstsectionweight1textinputmainview: {
        height: height / 15,
        width: width / 3.49,
        justifyContent: "center",
        alignItems: "center",
    },
    processingfirstsectionweight1textinputview: {
        height: height / 18,
        width: width / 4.8,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    processingfirstsectiondropdown1view: {
        height: height / 19,
        width: width / 3.9,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
        paddingBottom:4,
    },
    processingfirstsectiondropdown1mainview: {
        height: height / 15,
        width: width / 3.8,
        justifyContent: "center",
    },
    processingfirstsectiontotalrdfmainview: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    processingfirstsectiontotalrdfview: {
        height: height / 15,
        width: width / 3.5,
        justifyContent: "center",
        bottom:9,
    },
    processingfirstsectionweight2textinputmainview: {
        height: height / 15,
        width: width / 3.49,
        justifyContent: "center",
        alignItems: "center",
    },
    processingfirstsectionweight2textinputview: {
        height: height / 18,
        width: width / 4.8,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    processingfirstsectiondropdown2mainview: {
        height: height / 15,
        width: width / 3.8,
        justifyContent: "center",
    },
    processingfirstsectiondropdown2view: {
        height: height / 19,
        width: width / 3.9,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
        paddingBottom:4,
    },
    processingfirstsectiontotalinertsmainview: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    collectquantitymeasureview: {
        flexDirection: "row",
        height: height / 22,
        alignItems: "center",
    },
    collectModelView: {
        height: height / 11.4,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    collectModelView1: {
        height: height / 11.4,
        width: width / 7.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    collectModelView2: {
        height: height / 11.4,
        width: width / 1.8,
        justifyContent: "center",
    },
    collectModelImage: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        tintColor: "black",
    },
    modelDropdowmInputContainerStyle: {
        height: height / 28,
        width: width / 3,
    },
    modelDropdowmContainerStyle: {
        width: width / 5,
        justifyContent: "flex-start",
        height: height / 13,
        top: Platform.OS === 'ios'?13:12,
    },
    modelDropdowmImage: {
        alignSelf: "center",
        top: 13,
    },
    collectModelDateText: {
        color: "black",
        fontSize: 14,
    },
    sortingModelView: {
        height: height / 15,
        width: width / 3.5,
        justifyContent: "center",
    },
    sortingModelView1: {
        height: height / 15,
        width: width / 3.49,
        justifyContent: "center",
        alignItems: "center",
    },
    sortingModelView2: {
        height: height / 18,
        width: width / 4.8,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 0.7,
    },
    sortingModelView3: {
        height: height / 15,
        width: width / 3.8,
        justifyContent: "center",
    },
    sortingModelView4: {
        height: height / 19,
        width: width / 3.9,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
    },
    sortingModelView5: {
        height: height / 15,
        justifyContent: "center",
        width: width / 1,
        flexDirection: "row",
    },
    sortingModelView6: {
        height: height / 15,
        width: width / 3.5,
        justifyContent: "center",
        bottom:7,
    },
    sortingModelView7: {
        height: height / 1.65,
        width: width / 1,
    },
    sortingModelView8: {
        height: height / 22,
        width: width / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    sortingModelText: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginLeft: 10,
    },
    sortingModelView9: {
        height: height / 10,
        width: width / 1,
        justifyContent: "center",
    },
    sortingModelView10: {
        height: height / 3,
        width: width / 1,
        alignItems: "center",
    },
    sortingModelView11: {
        height: height / 13,
        width: width / 2.5,
        justifyContent: "center",
    },
    sortingModelView12: {
        height: height / 15,
        width: width / 2.4,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    sortingModelView13: {
        height: height / 15,
        width: width / 3.5,
        borderBottomWidth: 1.2,
        borderBottomColor: "#D8D8D8",
        justifyContent: "center",
        alignItems: "center",
    },
    sortingModelDateText: {
        color: "#000000",
        fontSize: 14,
        top: 17,
    },
    sortingModelView15: {
        height: height / 18,
        width: width / 1.2,
        borderBottomColor: "#D8D8D8",
        justifyContent: "center",
        borderBottomWidth: 0.7,
    },
    sortingModelReview: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginLeft: 10,
    },
    sortingModelView16: {
        height: height / 2.2,
        width: width / 1,
        marginLeft: 30,
    },
    distributeModelView: {
        height: height / 11.4,
        width: width / 1,
        flexDirection: "row",
        alignItems: "center",
    },
    modelDropdowmWasteContainerStyle: {
        width: width / 5,
        justifyContent: "flex-start",
        top:Platform.OS === 'ios'?13: 10,
        height: height / 13,
    },
    modelDropdowmWasteDropdownImage: {
        alignSelf: "center",
        top: 14,
    },
    segregationPicView: {
        height: height / 8,
        width: width / 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    segragationImageView: {
        borderRadius: 10,
        marginHorizontal: 5,
        width: 60,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    segragationImageView1: {
        borderRadius: 10,
        marginHorizontal: 5,
        width: 70,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    segragationImageText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: responsiveFontSize(1.8),
    },
    segragationImageText1: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: responsiveFontSize(1.4),
    },
    dateText: {
        color: "#606060",
        top: 20,
    },
    segregationTextInput: {
        color: "black",
        top: 9,
    },
    commentTextInput: {
        color: "black",
        fontSize: responsiveFontSize(1.9),
        paddingLeft: 5,
        top: 20,
    },
    commentTextInput1: {
        color: "black",
        fontSize: responsiveFontSize(1.9),
        paddingLeft: 5,
        top: 10,
    },
    segregationMainText: {
        paddingLeft: 4,
        color: "#606060",
        top: 22,
    },
    locationMainText: {
        color: "#606060",
        top: 7,
    },
    segregationReview: {
        flexDirection: 'row',
    },
    processedMainText: {
        paddingLeft: 4,
        color: "#606060",
        top: 20,
    },
    collectWasteType: {
        color: "#606060",
        top: 3,
    },
    collectWasteTypeTextInput: {
        color: "black",
        fontSize: responsiveFontSize(1.9),
        top: 10,
    },
    collectQuantityTextInput: {
        color: COLORS.BLACK,
        fontSize: responsiveFontSize(1.9),
        top: 12,
    },
    collectLocationTextField: {
        color: "black",
        top: 14,
    },
    segregationLocationTextField: {
        color: "black",
        top: 7,
    },
    processedLocationTextField: {
        color: "black",
        top: 12,
    },
    collectmodalmainview: {
        height: height / 1.6,
        width: width / 1,
    },
    modalBackImage: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        tintColor: "black",
    },
    processingTextLabel: {
        paddingLeft: 4,
        color: "#606060",
        top: 20,
    },
    wasteTextField: {
        color: "black",
        top: Platform.OS === 'ios'?15:12,
    },
    wasteDropdownInputContainerStyle: {
        height: height / 28,
        width: width / 3,
    },
    wasteDropdownContainerStyle: {
        width: width / 5,
        justifyContent: "flex-start",
        top: Platform.OS === 'ios'?15:12,
        height: height / 13,
    },
    wasteDropdownImage: {
        alignSelf: "center",
        top: 16,
    },
    processingMainModelText: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginLeft: 10,
    },
    collectmodalselectdatetext: {
        color: "#606060",
        top: 20,
    },
    collectmodalselecrdatevaluetext: {
        color: "#000000",
        fontSize: 14,
        top: 14,
    },
    collectmodallocationtext: {
        color: "#606060",
        top: 7,
    },
    collectmodallocationtextinput: {
        color: "black",
        top: 13,
    },
    collectmodalcommenttextinput: {
        color: "black",
        fontSize: responsiveFontSize(1.9),
        paddingLeft: 5,
        top: 20,
    },
    collectmodalcommenttextinput1: {
        color: "black",
        fontSize: responsiveFontSize(1.9),
        paddingLeft: 5,
        top: 10,
    },
    reviewText: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginLeft: 10,
    },
    reviewTextLabelView: {
        flexDirection: "row",
    },
    collectmodalsecondpagemaineview: {
        height: height / 10,
        width: width / 1,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalsecondpageTouchable: {
        height: height / 17,
        width: width / 1.2,
        backgroundColor: "#DA0D14",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalsecondpagenextText: {
        fontSize: responsiveFontSize(2.0),
        color: "#FFFFFF",
        fontWeight: "700",
    },
    collectmodalcancelbuttonmainview: {
        height: height / 15,
        width: width / 1,
        flexDirection: "row",
    },
    distributemodalcancelbuttonmainview: {
        height: height / 45,
        width: width / 1,
        flexDirection: "row",
    },
    distributemodalcancelbuttonsubview: {
        height: height / 17,
        width: width / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalcancelbuttonsubview: {
        height: height / 15,
        width: width / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalcancelmainview1: {
        height: height / 17,
        width: width / 2.5,
        backgroundColor: "#B5B5B5",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalcanceltext: {
        fontSize: responsiveFontSize(2.0),
        color: "#FFFFFF",
        fontWeight: "700",
    },
    collectmodalsubmitTouchableview: {
        height: height / 15,
        width: width / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalsubmitview: {
        height: height / 17,
        width: width / 2.5,
        backgroundColor: "#DA0D14",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    collectmodalsubmittext: {
        fontSize: responsiveFontSize(2.0),
        color: "#FFFFFF",
        fontWeight: "700",
    },
    totalWeightAstring: {
        left:Platform.OS === 'ios' ? 84:82,
        color: 'red',
        fontSize: 15,
        top:Platform.OS === 'ios' ? 3:0,
    },
    commentAstring: {
        color: 'red',
        left: Platform.OS==='ios'? 79:73,
        bottom: Platform.OS==='ios'?-1:13,
    },
    commentAstring1234: {
        color: 'red',
        left: Platform.OS==='ios'? 79:73,
        bottom: Platform.OS==='ios'?-2:13,
    },
    commentAstring123: {
        color: 'red',
        left: Platform.OS==='ios'?78.5:73,
        bottom: Platform.OS==='ios'?-2:13,
    },
    dateAstring: {
        color: 'red',
        left: Platform.OS==='ios' ? "47%":"50%",
        bottom:  Platform.OS==='ios' ? "-3%":"1%",
    },
    fineAstring: {
        left: Platform.OS==='ios'?30:30,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2:0,
    },
    coarsesAstring: {
        left:Platform.OS==='ios'?59: 58,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2:0,
    },
    tenmmAstring: {
        left: Platform.OS==='ios'?46:48,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2.5:0,
    },
    twentymmAstring: {
        left: 48,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2.5:0,
    },
    vsandAstring: {
        left: Platform.OS==='ios'? 47:46,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 1.5:0,
    },
    gsbAstring: {
        left: 31,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 1.5:0,
    },
    otherAstring: {
        left:Platform.OS==='ios'? 46: 45,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2.5:0,
    },
    krebsAstring: {
        left: Platform.OS === 'ios'?89:86,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2.5:0,
    },
    paverAstring: {
        left: Platform.OS === 'ios'?85:84,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 1.5:0,
    },
    cementAstring: {
      left: Platform.OS === 'ios'? 96:93,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2:0,
    },
    othersProductAstring: {
        left: Platform.OS === 'ios'?101:97,
        color: 'red',
        fontSize: 15,
        top:Platform.OS==='ios'? 2:0,
    },
    validationMessageStyle: {
        color: 'red',
        left: width / 10.8,
    },
    validationCommentMessageStyle: {
        color: 'red',
        right: Platform.OS==='ios'?"22%":"20%",
        top: "3%",
    },
    validationProcessedCommentMessageStyle: {
        color: 'red',
        right: Platform.OS==='ios'?"22%":"20%",
        top: "2%",
    },
    textFieldProcessed: {
        color: "black", 
        top: Platform.OS === 'ios'?14:12,
    },
});
