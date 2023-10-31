import SharedManager from "../Common/SharedManager.tsx";
import axios, { AxiosResponse } from 'axios';
import { URIS, URI_METHODs } from '../Configration';
import base64 from 'react-native-base64';
import { ResponseModel } from '../Model';
import apiMonitor from './monitor';
import setInterceptor from './interceptor';
import { create } from 'apisauce';

const createApiClient = () => {
    //===================== Headers =========================//
    const instance = create({
        baseURL: URIS.PRODUCTION,
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
            // @ts-ignore
            'Authorization': SharedManager.getInstance().getToken()
        },
    });
    instance.addMonitor(apiMonitor);
    setInterceptor(instance);

    const loginUser = (payload: any) => instance.post(URI_METHODs.LOGIN, payload);
    const changepassword = (payload: any) => instance.post(URI_METHODs.CHANGEPASSWORD + payload);
    const forgotemail = (payload: any) => instance.post(URI_METHODs.FORGOT_EMAIL + payload);
    const otpverify = (payload: any) => instance.post(URI_METHODs.OTP_VERIFY + payload);
    const resendotp = (payload: any) => instance.post(URI_METHODs.RESEND_OTP + payload);
    const createnewpassword = (payload: any) => instance.post(URI_METHODs.CREATE_NEW_PASSWORD + payload)
    // const getcollection = (params: any) => instance.get(URI_METHODs.DASHBOARD_COLLECTION, params);
    // const getprocessing = (params: any) => instance.get(URI_METHODs.DASHBOARD_PROCESSING, params);
    // const getdistribution = (params: any) => instance.get(URI_METHODs.DASHBOARD_DISTRIBUTION, params);
    // const getcollectionct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_GET_COLLECTION, params);
    // const getprocessingct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_GET_PROCESSING, params);
    // const getdistributionct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_GET_DISTRIBUTE, params);
    // const historyDashboardCT = (payload: any) => instance.post(URI_METHODs.CT_DASHBOARD_POST_HISTORY, payload);
    // const collectiontrendgraph = (payload: any) => instance.post(URI_METHODs.COllECTION_TREND_VALUE,payload);
    // const processingtrendgraph = (payload: any) => instance.post(URI_METHODs.PROCESSING_TREND_VALUE, payload);
    // const getwastecollected = () => instance.get(URI_METHODs.DASHBOARD_PROCESSING);
    // const getwteenergygenerated = (params: any) => instance.get(URI_METHODs.WTE_ENERGY_GENERATED, params);
    // const postmswsavecollect = (payload: any) => instance.post(URI_METHODs.COLLECT_FOOTER, payload);
    // const postmswsavesorting = (payload: any) => instance.post(URI_METHODs.PROCESS_FOOTER, payload);
    // const postmswsavedistribute = (payload: any) => instance.post(URI_METHODs.DISTRIBUTE_FOOTER, payload);
    // const postwtesavesorting = (payload: any) => instance.post(URI_METHODs.WTE_USERFOOTER, payload);
    // const getrdfprocessing = (params: any) => instance.get(URI_METHODs.RDF_PROCESSED, params);
    // const getashprocessing = (params: any) => instance.get(URI_METHODs.ASH_GENERATED, params);
    // const postsitehead = (payload: any) => instance.post(URI_METHODs.SITEHEAD_WASTECOLLECTED, payload);
    // const postmswsavecollectct = (payload: any) => instance.post(URI_METHODs.CT_DASHBOARD_POST_COLLECTION, payload);
    // const collectiontrendgraphct = (payload: any) => instance.post(URI_METHODs.CT_DASHBOARD_COLLECTION_TREND_VALUE, payload);
    // const processingtrendgraphct = (payload: any) => instance.post(URI_METHODs.CT_DASHBOARD_PROCESSING_TREND_VALUE, payload);
    // const MswDistributeCompostOutflowct = (payload: any) => instance.post(URI_METHODs.CT_DISTRIBUTION_COMPOST_OUTFLOW, payload);
    // const MswDistributeRDFOutflowct = (payload: any) => instance.post(URI_METHODs.CT_DISTRIBUTION_RDF_OUTFLOW, payload);
    // const MswDistributeRecyclablesOutflowct = (payload: any) => instance.post(URI_METHODs.CT_DISTRIBUTION_RECYCLABLE_OUTFLOW, payload);
    // const MswDistributeInertsOutflowct = (payload: any) => instance.post(URI_METHODs.CT_DISTRIBUTION_INERTS_OUTFLOW, payload);
    // const postsitewteprocessed = (payload: any) => instance.post(URI_METHODs.SITEHEAD_WTEPROCESSED, payload);
    // const postbusinesswteprocessed = (payload: any) => instance.post(URI_METHODs.BUSINESS_WTEPROCESSED, payload);
    // const postbusinesscombine = (payload: any) => instance.post(URI_METHODs.BUSINESS_COMBINEDATA, payload);
    // const rdfgenerationtrendgraph = (payload: any) => instance.post(URI_METHODs.RDF_TREND, payload);
    // const energygenerationtrendgraph = (payload: any) => instance.post(URI_METHODs.ENERGY_TREND, payload);
    // const ashgenerationtrendgraph = (payload: any) => instance.post(URI_METHODs.ASH_TREND, payload);
    // const siteheadcollectiontrend = (payload: any) => instance.post(URI_METHODs.SITEHEAD_COLLECTION_TREND, payload);
    // const siteheadprocessingtrend = (payload: any) => instance.post(URI_METHODs.SITEHEAD_PROCESSING_TREND, payload);
    // const siteheadwtetrend = (payload: any) => instance.post(URI_METHODs.SITEHEAD_WTE_TREND, payload);
    // const buisnessheadcollectiontrend = (payload: any) => instance.post(URI_METHODs.BUSINESS_COLLECTION_TREND, payload);
    // const buisnessheadprocessingtrend = (payload: any) => instance.post(URI_METHODs.BUSINESS_PROCESSING_TREND, payload);
    // const buisnessheadwtetrend = (payload: any) => instance.post(URI_METHODs.BUSINESS_WTE_TREND, payload);
    // const MswDistributeCompostOutflow = (payload: any) => instance.post(URI_METHODs.DISTRIBUTION_COMPOST_OUTFLOW, payload);
    // const MswDistributeRDFOutflow = (payload: any) => instance.post(URI_METHODs.DISTRIBUTION_RDF_OUTFLOW, payload);
    // const MswDistributeRecyclablesOutflow = (payload: any) => instance.post(URI_METHODs.DISTRIBUTION_RECYCLABLE_OUTFLOW, payload);
    // const MswDistributeInertsOutflow = (payload: any) => instance.post(URI_METHODs.DISTRIBUTION_INERTS_OUTFLOW, payload);
    // const siteheaddistributecomposttrendgraph = (payload: any) => instance.post(URI_METHODs.SITEHEAD_DISTRIBUTION_COMPOST_TREND, payload);
    // const siteheaddistributerdftrendgraph = (payload: any) => instance.post(URI_METHODs.SITEHEAD_DISTRIBUTION_RDF_TREND, payload);
    // const siteheaddistributerecyclabletrendgraph = (payload: any) => instance.post(URI_METHODs.SITEHEAD_DISTRIBUTION_RECYCLABLE_TREND, payload);
    // const siteheaddistributeinertstrendgraph = (payload: any) => instance.post(URI_METHODs.SITEHEAD_DISTRIBUTION_INERTS_TREND, payload);
    // const SBUheaddistributeComposttrendgraph = (payload: any) => instance.post(URI_METHODs.BUSINESS_DISTRIBUTION_COMPOST_TREND, payload);
    // const SBUheaddistributeiRDFtrendgraph = (payload: any) => instance.post(URI_METHODs.BUSINESS_DISTRIBUTION_RDF_TREND, payload);
    // const SBUheaddistributeRecyclabletrendgraph = (payload: any) => instance.post(URI_METHODs.BUSINESS_DISTRIBUTION_RECYCLABLE_TREND, payload);
    // const SBUheaddistributeinertstrendgraph = (payload: any) => instance.post(URI_METHODs.BUSINESS_DISTRIBUTION_INERTS_TREND, payload);
    // const SBUheadrdfgenerated = (params: any) => instance.get(URI_METHODs.BUSINESS_RDF_VALUE, params);
    // const SBUheadenergygenerated = (params: any) => instance.get(URI_METHODs.BUSINESS_ENERGY_VALUE, params);
    // const SBUheadashgenerated = (params: any) => instance.get(URI_METHODs.BUSINESS_ASH_VALUE, params);
    // const BMWcollectdashboard = (params: any) => instance.get(URI_METHODs.COLLECT_DASHBOARDBMW, params);
    // const BMWprocessdashboard = (params: any) => instance.get(URI_METHODs.SORTING_DASHBOARDBMW, params);
    // const BMWrecycledashboard = (params: any) => instance.get(URI_METHODs.RECYCLABLE_DASHBOARDBMW, params);

    // const bmwsummarypd = (payload: any) => instance.post(URI_METHODs.BMW_SUMMARY, payload);
    // const bmwcollectiontrend = (payload: any) => instance.post(URI_METHODs.BMW_COLLECTIONTREND, payload);
    // const bmwprocessingtrend = (payload: any) => instance.post(URI_METHODs.BMW_PROCESSINGTREND, payload);
    // const bmwrecyclabletrend = (payload: any) => instance.post(URI_METHODs.BMW_RECYCLABLETREND, payload);
    // const bmwsbuwastesummary = (payload: any) => instance.post(URI_METHODs.SBU_WASTESUMAARY, payload);
    // const bmwsitewastesummary = (payload: any) => instance.post(URI_METHODs.SITE_WASTESUMMARY, payload);
    // const bmwsitecollectionsummary = (payload: any) => instance.post(URI_METHODs.SITE_COLLECTIONTREND, payload);
    // const bmwsiteprocessingsummary = (payload: any) => instance.post(URI_METHODs.SITE_PROCESSINGTREND, payload);
    // const bmwsiterecyclablesummary = (payload: any) => instance.post(URI_METHODs.SITE_RECYCLABLETREND, payload);
    // const bmwsitewtetrend = (payload: any) => instance.post(URI_METHODs.SITE_WTETREND, payload);
    // const bmwrecyclablespd = (payload: any) => instance.post(URI_METHODs.BMW_RECYCLABLES, payload);
    // const postbmwsavecollect = (payload: any) => instance.post(URI_METHODs.BMW_FOOTERCOLLECT, payload);
    // const postbmwsaveprocess = (payload: any) => instance.post(URI_METHODs.BMW_FOOTERPROCESS, payload);
    // const postbmwsavedistribute = (payload: any) => instance.post(URI_METHODs.BMW_FOOTERDISTRIBUTE, payload);
    // const postbmwcollecttrend = (payload: any) => instance.post(URI_METHODs.SBU_COLLECTIONTREND, payload);
    // const postbmwprocesstrend = (payload: any) => instance.post(URI_METHODs.SBU_PROCESSINGTREND, payload);
    // const postbmwrecycletrend = (payload: any) => instance.post(URI_METHODs.SBU_RECYCLABLETREND, payload);
    // const postbmwsbutrend = (payload: any) => instance.post(URI_METHODs.SBU_BMWTREND, payload);

    // // ********************************IWM API************************************************
    // const IWMcollectdashboard = (params: any) => instance.get(URI_METHODs.IWM_DASHBOARD_COLLECTION, params);
    // const IWManalysisdashboard = (params: any) => instance.get(URI_METHODs.IWM_DASHBOARD_ANALYSIS, params);
    // const IMWleftoverstockdashboard = (params: any) => instance.get(URI_METHODs.IWM_DASHBOARD_LEFTOVERSTOCK, params);
    // const postiwmsavecollect = (payload: any) => instance.post(URI_METHODs.IWM_SAVE_COLLECT, payload);
    // const postiwmsaveanalysis = (payload: any) => instance.post(URI_METHODs.IWM_SAVE_ANALYSIS, payload);
    // const postiwmsaveleftoverstock = (payload: any) => instance.post(URI_METHODs.IWM_SAVE_LEFTOVERSTOCK, payload);
    // const iwmsiteheadpostsummary = (payload: any) => instance.post(URI_METHODs.IWM_WASTE_SUMMARY, payload);
    // const iwmsiteheadcollectiontrend = (payload: any) => instance.post(URI_METHODs.IWM_COLECTION_TREND, payload);
    // const iwmsiteheadanalysistrend = (payload: any) => instance.post(URI_METHODs.IWM_ANLYSIS_TREND, payload);
    // const iwmsiteheadleftoverstocktrend = (payload: any) => instance.post(URI_METHODs.IWM_LEFTOVER_TREND, payload);
    // const iwmtrend = (payload: any) => instance.post(URI_METHODs.IWM_TREND, payload);
    // const collectiontrendgraphiwm = (payload: any) => instance.post(URI_METHODs.IWM_COLLECTION_TREND, payload);
    // const analysistrendgraphiwm = (payload: any) => instance.post(URI_METHODs.IWM_ANALYSIS_TREND, payload);
    // const leftoverstocktrendgraphiwm = (payload: any) => instance.post(URI_METHODs.IWM_LEFTOVERSTOCK_TREND, payload);
    // const iwmrecyclablesgraph = (payload: any) => instance.post(URI_METHODs.IWM_RECYCLABLES_TREND, payload);
    // const iwmsbuheadwastesummary = (payload: any) => instance.post(URI_METHODs.IWM_WASTESBU_SUMMARY, payload);
    // const iwmsbuheadcollectiontrend = (payload: any) => instance.post(URI_METHODs.IWM_COLLECTIONSBU_TREND, payload);
    // const iwmsbuheadanalysistrend = (payload: any) => instance.post(URI_METHODs.IWM_ANALYSISSBU_TREND, payload);
    // const iwmsbuheadleftoverstocktrend = (payload: any) => instance.post(URI_METHODs.IWM_LEFTOVERSTOCKSBU_TREND, payload);
    // const iwmsbuheadiwmtrend = (payload: any) => instance.post(URI_METHODs.IWM_SBU_TREND, payload);
    // const iwmsbuheadiwmrecyclablestrend = (payload: any) => instance.post(URI_METHODs.IWM_RECYCLABLESSBU_TREND, payload);
    // const iwmsummary = (payload: any) => instance.post(URI_METHODs.IWM_SUMMARY, payload);
    // const contactus = () => instance.get(URI_METHODs.HELPCENTER_CONTACTUS);

    // const faqs = () => instance.get(URI_METHODs.HELPCENTER_FAQ);
    // const bmwsiterecyclable = (payload: any) => instance.post(URI_METHODs.SITE_BMWRECYCLABLE, payload);
    // const bmwsburecyclable = (payload: any) => instance.post(URI_METHODs.SBU_BMWRECYCLABLE, payload);
    // const mswpdhistory = (payload: any) => instance.post(URI_METHODs.CD_DASHBOARD_HISTORY, payload);

    // const mswwtehistory = (payload: any) => instance.post(URI_METHODs.WTE_HISTORY, payload);
    // const mswsiteheadhistory = (payload: any) => instance.post(URI_METHODs.SITEHEAD_HISTORY, payload);
    // const mswsbuheadhistory = (payload: any) => instance.post(URI_METHODs.SBUHEAD_HISTORY, payload);
    // const bmwpdhistory = (payload: any) => instance.post(URI_METHODs.BMWPD_HISTORY, payload);
    // const bmwsiteheadhistory = (payload: any) => instance.post(URI_METHODs.BMW_SITE_HISTORY, payload);
    // const bmwsbuheadhistory = (payload: any) => instance.post(URI_METHODs.BMWSBU_HEAD_HISTORY, payload);
    // const iwmpdhistory = (payload: any) => instance.post(URI_METHODs.IWM_PD_HISTORY, payload);
    // const iwmsitehistory = (payload: any) => instance.post(URI_METHODs.IWM_SITE_HISTORY, payload);
    // const iwmsbuheadhistory = (payload: any) => instance.post(URI_METHODs.IWM_SBU_HISTORY, payload);
    // const mswsiteheadcollection = (payload: any) => instance.post(URI_METHODs.MSW_SITEHEAD_COLLECTION, payload);
    // const mswsiteheadprocessed = (payload: any) => instance.post(URI_METHODs.MSW_SITEHEAD_PROCESSED, payload);
    // const mswsiteheaddistribute = (payload: any) => instance.post(URI_METHODs.MSW_SITEHEAD_DISTRIBUTE, payload);
    // const mswsiteheadwte = (payload: any) => instance.post(URI_METHODs.MSW_SITEHEAD_WTE, payload);
    // const mswsbuheadcollection = (payload: any) => instance.post(URI_METHODs.SBUHEAD_COLLECTED, payload);
    // const mswsbuheadprocessed = (payload: any) => instance.post(URI_METHODs.SBUHEAD_PROCESSED, payload);
    // const mswsbuheaddistribute = (payload: any) => instance.post(URI_METHODs.SBUHEAD_DISTRIBUTE, payload);
    // const mswsbuheadwte = (payload: any) => instance.post(URI_METHODs.SBUHEAD_WTE, payload);
    // const bmwsiteheadcollection = (payload: any) => instance.post(URI_METHODs.BMW_SITE_HEAD_COLLECTION, payload);
    // const bmwsiteheadprocessed = (payload: any) => instance.post(URI_METHODs.BMW_SITE_HEAD_PROCESSED, payload);
    // const bmwsiteheaddistribute = (payload: any) => instance.post(URI_METHODs.BMW_SITE_HEAD_DISTRIBUTE, payload);
    // const bmwsbuheadcollection = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_COLLECTION, payload);
    // const bmwsbuheadprocessing = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_PROCESSING, payload);
    // const bmwsbuheaddistribute = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_DISTRIBUTE, payload);
    // const iwmSiteHeadCollection = (payload: any) => instance.post(URI_METHODs.IWM_SITE_COLLECTION, payload);
    // const iwmSiteHeadAnalysis = (payload: any) => instance.post(URI_METHODs.IWM_SITE_ANALYSIS, payload);
    // const iwmSiteHeadLeftOverStock = (payload: any) => instance.post(URI_METHODs.IWM_SITE_LOS, payload);
    // const iwmSbuHeadCollection = (payload: any) => instance.post(URI_METHODs.IWM_SBU_COLLECTION, payload);
    // const iwmSbuHeadAnalysis = (payload: any) => instance.post(URI_METHODs.IWM_SBU_ANALYSIS, payload);
    // const iwmSbuHeadLeftOverStock = (payload: any) => instance.post(URI_METHODs.IWM_SBU_LOS, payload);
    // const ctproductcatalogue = (payload: any) => instance.post(URI_METHODs.CT_PRODUCT_CATALOGUE, payload, payload);
    // const cdproductcatalogue = (payload: any) => instance.post(URI_METHODs.CD_PRODUCT_CATALOGUE, payload, payload);
    // const bmwsiteproductcatalogue = (payload: any) => instance.post(URI_METHODs.BMW_PRODUCT_CATALOGUE, payload);
    // const bmwsbuproductcatalogue = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_CATALOGUE, payload);
    // const bmwPdPlastic = (payload: any) => instance.post(URI_METHODs.BMWPLASTIC, payload);
    // const bmwPdGlass = (payload: any) => instance.post(URI_METHODs.BMWGLASS, payload);
    // const bmwPdCardboard = (payload: any) => instance.post(URI_METHODs.BMWCARDBOARD, payload);
    // const bmwSiteHeadPlastic = (payload: any) => instance.post(URI_METHODs.BMW_SITEHEAD_PLASTIC, payload);
    // const bmwSiteHeadGlass = (payload: any) => instance.post(URI_METHODs.BMW_SITEHEAD_GLASS, payload);
    // const bmwSiteHeadCardboard = (payload: any) => instance.post(URI_METHODs.BMW_SITEHEAD_CARDBOARD, payload);
    // const bmwSbuHeadPlastic = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_PLASTIC, payload);
    // const bmwSbuHeadGlass = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_GLASS, payload);
    // const bmwSbuHeadCardboard = (payload: any) => instance.post(URI_METHODs.BMW_SBUHEAD_CARDBOARD, payload);
    // const iwmSiteHeadCollectionRecyclables = (payload: any) => instance.post(URI_METHODs.IWM_SITE_HEAD_COLLECTRECYCLABLES, payload);
    // const iwmSiteHeadAnalysisRecyclables = (payload: any) => instance.post(URI_METHODs.IWM_SITE_HEAD_ANALYSISRECYCLABLES, payload);
    // const iwmSbuHeadCollectionRecyclables = (payload: any) => instance.post(URI_METHODs.IWM_SBU_HEAD_COLLECTRECYCLABLES, payload);
    // const iwmSbuHeadAnalysisRecyclables = (payload: any) => instance.post(URI_METHODs.IWM_SBU_HEAD_ANALYSISRECYCLABLES, payload);
    // const IWMproductcatalogue = (payload: any) => instance.post(URI_METHODs.IWM_PRODUCT, payload);
    // const IWMSBUproductcatalogue = (payload: any) => instance.post(URI_METHODs.IWM_SBU_CATALOGUE, payload);

    //********************** api's with change params *****************/
    const getcollection = (params: any) => instance.get(URI_METHODs.DASHBOARD_COLLECTION, params);
    const getprocessing = (params: any) => instance.get(URI_METHODs.DASHBOARD_PROCESSING, params);
    const getdistribution = (params: any) => instance.get(URI_METHODs.DASHBOARD_DISTRIBUTION, params);
    const getcollectionct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_GET_COLLECTION, params);
    const getprocessingct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_GET_PROCESSING, params);
    const getdistributionct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_GET_DISTRIBUTE, params);
    const historyDashboardCT = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_POST_HISTORY, params);
    const collectiontrendgraph = (params: any) => instance.get(URI_METHODs.COllECTION_TREND_VALUE, params);
    const processingtrendgraph = (params: any) => instance.get(URI_METHODs.PROCESSING_TREND_VALUE, params);
    const getwastecollected = () => instance.get(URI_METHODs.DASHBOARD_PROCESSING);
    const getwteenergygenerated = (params: any) => instance.get(URI_METHODs.WTE_ENERGY_GENERATED, params);
    const postmswsavecollect = (payload: any) => instance.post(URI_METHODs.COLLECT_FOOTER, payload);
    const postmswsavesorting = (payload: any) => instance.post(URI_METHODs.PROCESS_FOOTER, payload);
    const postmswsavedistribute = (payload: any) => instance.post(URI_METHODs.DISTRIBUTE_FOOTER, payload);
    const postwtesavesorting = (payload: any) => instance.post(URI_METHODs.WTE_USERFOOTER, payload);
    const getrdfprocessing = (params: any) => instance.get(URI_METHODs.RDF_PROCESSED, params);
    const getashprocessing = (params: any) => instance.get(URI_METHODs.ASH_GENERATED, params);
    const postsitehead = (params: any) => instance.get(URI_METHODs.SITEHEAD_WASTECOLLECTED, params);
    const postmswsavecollectct = (payload: any) => instance.post(URI_METHODs.CT_DASHBOARD_POST_COLLECTION, payload);
    const collectiontrendgraphct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_COLLECTION_TREND_VALUE, params);
    const processingtrendgraphct = (params: any) => instance.get(URI_METHODs.CT_DASHBOARD_PROCESSING_TREND_VALUE,  params);
    const MswDistributeCompostOutflowct = (params: any) => instance.get(URI_METHODs.CT_DISTRIBUTION_COMPOST_OUTFLOW, params);
    const MswDistributeRDFOutflowct = (params: any) => instance.get(URI_METHODs.CT_DISTRIBUTION_RDF_OUTFLOW,  params);
    const MswDistributeRecyclablesOutflowct = (params: any) => instance.get(URI_METHODs.CT_DISTRIBUTION_RECYCLABLE_OUTFLOW, params);
    const MswDistributeInertsOutflowct = (params: any) => instance.get(URI_METHODs.CT_DISTRIBUTION_INERTS_OUTFLOW, params);
    const postsitewteprocessed = (params: any) => instance.get(URI_METHODs.SITEHEAD_WTEPROCESSED, params);
    const postbusinesswteprocessed = (params: any) => instance.get(URI_METHODs.BUSINESS_WTEPROCESSED, params);
    const postbusinesscombine = (params: any) => instance.get(URI_METHODs.BUSINESS_COMBINEDATA, params);
    const rdfgenerationtrendgraph = (params: any) => instance.get(URI_METHODs.RDF_TREND, params);
    const energygenerationtrendgraph = (params: any) => instance.get(URI_METHODs.ENERGY_TREND, params);
    const ashgenerationtrendgraph = (params: any) => instance.get(URI_METHODs.ASH_TREND, params);
    const siteheadcollectiontrend = (params: any) => instance.get(URI_METHODs.SITEHEAD_COLLECTION_TREND, params);
    const siteheadprocessingtrend = (params: any) => instance.get(URI_METHODs.SITEHEAD_PROCESSING_TREND, params);
    const siteheadwtetrend = (params: any) => instance.get(URI_METHODs.SITEHEAD_WTE_TREND, params);
    const buisnessheadcollectiontrend = (params: any) => instance.get(URI_METHODs.BUSINESS_COLLECTION_TREND, params);
    const buisnessheadprocessingtrend = (params: any) => instance.get(URI_METHODs.BUSINESS_PROCESSING_TREND, params);
    const buisnessheadwtetrend = (params: any) => instance.get(URI_METHODs.BUSINESS_WTE_TREND, params);
    const MswDistributeCompostOutflow = (params: any) => instance.get(URI_METHODs.DISTRIBUTION_COMPOST_OUTFLOW, params);
    const MswDistributeRDFOutflow = (params: any) => instance.get(URI_METHODs.DISTRIBUTION_RDF_OUTFLOW, params);
    const MswDistributeRecyclablesOutflow = (params: any) => instance.get(URI_METHODs.DISTRIBUTION_RECYCLABLE_OUTFLOW,params);
    const MswDistributeInertsOutflow = (params: any) => instance.get(URI_METHODs.DISTRIBUTION_INERTS_OUTFLOW, params);
    const siteheaddistributecomposttrendgraph = (params: any) => instance.get(URI_METHODs.SITEHEAD_DISTRIBUTION_COMPOST_TREND, params);
    const siteheaddistributerdftrendgraph = (params: any) => instance.get(URI_METHODs.SITEHEAD_DISTRIBUTION_RDF_TREND, params);
    const siteheaddistributerecyclabletrendgraph = (params: any) => instance.get(URI_METHODs.SITEHEAD_DISTRIBUTION_RECYCLABLE_TREND, params);
    const siteheaddistributeinertstrendgraph = (params: any) => instance.get(URI_METHODs.SITEHEAD_DISTRIBUTION_INERTS_TREND, params);
    const SBUheaddistributeComposttrendgraph = (params: any) => instance.get(URI_METHODs.BUSINESS_DISTRIBUTION_COMPOST_TREND, params);
    const SBUheaddistributeiRDFtrendgraph = (params: any) => instance.get(URI_METHODs.BUSINESS_DISTRIBUTION_RDF_TREND, params);
    const SBUheaddistributeRecyclabletrendgraph = (params: any) => instance.get(URI_METHODs.BUSINESS_DISTRIBUTION_RECYCLABLE_TREND, params);
    const SBUheaddistributeinertstrendgraph = (params: any) => instance.get(URI_METHODs.BUSINESS_DISTRIBUTION_INERTS_TREND, params);
    const SBUheadrdfgenerated = (params: any) => instance.get(URI_METHODs.BUSINESS_RDF_VALUE, params);
    const SBUheadenergygenerated = (params: any) => instance.get(URI_METHODs.BUSINESS_ENERGY_VALUE, params);
    const SBUheadashgenerated = (params: any) => instance.get(URI_METHODs.BUSINESS_ASH_VALUE, params);
    const BMWcollectdashboard = (params: any) => instance.get(URI_METHODs.COLLECT_DASHBOARDBMW, params);
    const BMWprocessdashboard = (params: any) => instance.get(URI_METHODs.SORTING_DASHBOARDBMW, params);
    const BMWrecycledashboard = (params: any) => instance.get(URI_METHODs.RECYCLABLE_DASHBOARDBMW, params);

    const bmwsummarypd = (params: any) => instance.get(URI_METHODs.BMW_SUMMARY, params);
    const bmwcollectiontrend = (params: any) => instance.get(URI_METHODs.BMW_COLLECTIONTREND, params);
    const bmwprocessingtrend = (params: any) => instance.get(URI_METHODs.BMW_PROCESSINGTREND, params);
    const bmwrecyclabletrend = (params: any) => instance.get(URI_METHODs.BMW_RECYCLABLETREND, params);
    const bmwsbuwastesummary = (params: any) => instance.get(URI_METHODs.SBU_WASTESUMAARY, params);
    const bmwsitewastesummary = (params: any) => instance.get(URI_METHODs.SITE_WASTESUMMARY, params);
    const bmwsitecollectionsummary = (params: any) => instance.get(URI_METHODs.SITE_COLLECTIONTREND, params);
    const bmwsiteprocessingsummary = (params: any) => instance.get(URI_METHODs.SITE_PROCESSINGTREND, params);
    const bmwsiterecyclablesummary = (params: any) => instance.get(URI_METHODs.SITE_RECYCLABLETREND, params);
    const bmwsitewtetrend = (params: any) => instance.get(URI_METHODs.SITE_WTETREND, params);
    const bmwrecyclablespd = (payload: any) => instance.post(URI_METHODs.BMW_RECYCLABLES, payload);
    const postbmwsavecollect = (payload: any) => instance.post(URI_METHODs.BMW_FOOTERCOLLECT, payload);
    const postbmwsaveprocess = (payload: any) => instance.post(URI_METHODs.BMW_FOOTERPROCESS, payload);
    const postbmwsavedistribute = (payload: any) => instance.post(URI_METHODs.BMW_FOOTERDISTRIBUTE, payload);
    const postbmwcollecttrend = (params: any) => instance.get(URI_METHODs.SBU_COLLECTIONTREND, params);
    const postbmwprocesstrend = (params: any) => instance.get(URI_METHODs.SBU_PROCESSINGTREND, params);
    const postbmwrecycletrend = (params: any) => instance.get(URI_METHODs.SBU_RECYCLABLETREND, params);
    const postbmwsbutrend = (params: any) => instance.get(URI_METHODs.SBU_BMWTREND, params);

    // ********************************IWM API************************************************
    const IWMcollectdashboard = (params: any) => instance.get(URI_METHODs.IWM_DASHBOARD_COLLECTION, params);
    const IWManalysisdashboard = (params: any) => instance.get(URI_METHODs.IWM_DASHBOARD_ANALYSIS, params);
    const IMWleftoverstockdashboard = (params: any) => instance.get(URI_METHODs.IWM_DASHBOARD_LEFTOVERSTOCK, params);
    const postiwmsavecollect = (payload: any) => instance.post(URI_METHODs.IWM_SAVE_COLLECT, payload);
    const postiwmsaveanalysis = (payload: any) => instance.post(URI_METHODs.IWM_SAVE_ANALYSIS, payload);
    const postiwmsaveleftoverstock = (payload: any) => instance.post(URI_METHODs.IWM_SAVE_LEFTOVERSTOCK, payload);
    const iwmsiteheadpostsummary = (params: any) => instance.get(URI_METHODs.IWM_WASTE_SUMMARY, params);
    const iwmsiteheadcollectiontrend = (params: any) => instance.get(URI_METHODs.IWM_COLECTION_TREND, params);
    const iwmsiteheadanalysistrend = (params: any) => instance.get(URI_METHODs.IWM_ANLYSIS_TREND, params);
    const iwmsiteheadleftoverstocktrend = (params: any) => instance.get(URI_METHODs.IWM_LEFTOVER_TREND, params);
    const iwmtrend = (params: any) => instance.get(URI_METHODs.IWM_TREND, params);
    const collectiontrendgraphiwm = (params: any) => instance.get(URI_METHODs.IWM_COLLECTION_TREND, params);
    const analysistrendgraphiwm = (params: any) => instance.get(URI_METHODs.IWM_ANALYSIS_TREND, params);
    const leftoverstocktrendgraphiwm = (params: any) => instance.get(URI_METHODs.IWM_LEFTOVERSTOCK_TREND, params);
    const iwmrecyclablesgraph = (payload: any) => instance.post(URI_METHODs.IWM_RECYCLABLES_TREND, payload);
    const iwmsbuheadwastesummary = (params: any) => instance.get(URI_METHODs.IWM_WASTESBU_SUMMARY, params);
    const iwmsbuheadcollectiontrend = (params: any) => instance.get(URI_METHODs.IWM_COLLECTIONSBU_TREND, params);
    const iwmsbuheadanalysistrend = (params: any) => instance.get(URI_METHODs.IWM_ANALYSISSBU_TREND, params);
    const iwmsbuheadleftoverstocktrend = (params: any) => instance.get(URI_METHODs.IWM_LEFTOVERSTOCKSBU_TREND, params);
    const iwmsbuheadiwmtrend = (params: any) => instance.get(URI_METHODs.IWM_SBU_TREND, params);
    const iwmsbuheadiwmrecyclablestrend = (params: any) => instance.get(URI_METHODs.IWM_RECYCLABLESSBU_TREND, params);
    const iwmsummary = (params: any) => instance.get(URI_METHODs.IWM_SUMMARY, params);
    const contactus = () => instance.get(URI_METHODs.HELPCENTER_CONTACTUS);

    const faqs = () => instance.get(URI_METHODs.HELPCENTER_FAQ);
    const bmwsiterecyclable = (payload: any) => instance.post(URI_METHODs.SITE_BMWRECYCLABLE, payload);
    const bmwsburecyclable = (payload: any) => instance.post(URI_METHODs.SBU_BMWRECYCLABLE, payload);
    const mswpdhistory = (params: any) => instance.get(URI_METHODs.CD_DASHBOARD_HISTORY, params);

    const mswwtehistory = (params: any) => instance.get(URI_METHODs.WTE_HISTORY, params);
    const mswsiteheadhistory = (params: any) => instance.get(URI_METHODs.SITEHEAD_HISTORY, params);
    const mswsbuheadhistory = (params: any) => instance.get(URI_METHODs.SBUHEAD_HISTORY, params);
    const bmwpdhistory = (params: any) => instance.get(URI_METHODs.BMWPD_HISTORY, params);
    const bmwsiteheadhistory = (params: any) => instance.get(URI_METHODs.BMW_SITE_HISTORY, params);
    const bmwsbuheadhistory = (params: any) => instance.get(URI_METHODs.BMWSBU_HEAD_HISTORY, params);
    const iwmpdhistory = (params: any) => instance.get(URI_METHODs.IWM_PD_HISTORY, params);
    const iwmsitehistory = (params: any) => instance.get(URI_METHODs.IWM_SITE_HISTORY, params);
    const iwmsbuheadhistory = (params: any) => instance.get(URI_METHODs.IWM_SBU_HISTORY, params);
    const mswsiteheadcollection = (params: any) => instance.get(URI_METHODs.MSW_SITEHEAD_COLLECTION, params);
    const mswsiteheadprocessed = (params: any) => instance.get(URI_METHODs.MSW_SITEHEAD_PROCESSED, params);
    const mswsiteheaddistribute = (params: any) => instance.get(URI_METHODs.MSW_SITEHEAD_DISTRIBUTE, params);
    const mswsiteheadwte = (params: any) => instance.get(URI_METHODs.MSW_SITEHEAD_WTE, params);
    const mswsbuheadcollection = (params: any) => instance.get(URI_METHODs.SBUHEAD_COLLECTED, params);
    const mswsbuheadprocessed = (params: any) => instance.get(URI_METHODs.SBUHEAD_PROCESSED, params);
    const mswsbuheaddistribute = (params: any) => instance.get(URI_METHODs.SBUHEAD_DISTRIBUTE, params);
    const mswsbuheadwte = (params: any) => instance.get(URI_METHODs.SBUHEAD_WTE, params);
    const bmwsiteheadcollection = (params: any) => instance.get(URI_METHODs.BMW_SITE_HEAD_COLLECTION, params);
    const bmwsiteheadprocessed = (params: any) => instance.get(URI_METHODs.BMW_SITE_HEAD_PROCESSED, params);
    const bmwsiteheaddistribute = (params: any) => instance.get(URI_METHODs.BMW_SITE_HEAD_DISTRIBUTE, params);
    const bmwsbuheadcollection = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_COLLECTION, params);
    const bmwsbuheadprocessing = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_PROCESSING, params);
    const bmwsbuheaddistribute = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_DISTRIBUTE, params);
    const iwmSiteHeadCollection = (params: any) => instance.get(URI_METHODs.IWM_SITE_COLLECTION, params);
    const iwmSiteHeadAnalysis = (params: any) => instance.get(URI_METHODs.IWM_SITE_ANALYSIS, params);
    const iwmSiteHeadLeftOverStock = (params: any) => instance.get(URI_METHODs.IWM_SITE_LOS, params);
    const iwmSbuHeadCollection = (params: any) => instance.get(URI_METHODs.IWM_SBU_COLLECTION, params);
    const iwmSbuHeadAnalysis = (params: any) => instance.get(URI_METHODs.IWM_SBU_ANALYSIS, params);
    const iwmSbuHeadLeftOverStock = (params: any) => instance.get(URI_METHODs.IWM_SBU_LOS, params);
    const ctproductcatalogue = (payload: any) => instance.post(URI_METHODs.CT_PRODUCT_CATALOGUE, payload, payload);
    const cdproductcatalogue = (params: any) => instance.get(URI_METHODs.CD_PRODUCT_CATALOGUE, params);
    const bmwsiteproductcatalogue = (params: any) => instance.get(URI_METHODs.BMW_PRODUCT_CATALOGUE, params);
    const bmwsbuproductcatalogue = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_CATALOGUE, params);
    const bmwPdPlastic = (params: any) => instance.get(URI_METHODs.BMWPLASTIC, params);
    const bmwPdGlass = (params: any) => instance.get(URI_METHODs.BMWGLASS, params);
    const bmwPdCardboard = (params: any) => instance.get(URI_METHODs.BMWCARDBOARD, params);
    const bmwSiteHeadPlastic = (params: any) => instance.get(URI_METHODs.BMW_SITEHEAD_PLASTIC, params);
    const bmwSiteHeadGlass = (params: any) => instance.get(URI_METHODs.BMW_SITEHEAD_GLASS, params);
    const bmwSiteHeadCardboard = (params: any) => instance.get(URI_METHODs.BMW_SITEHEAD_CARDBOARD, params);
    const bmwSbuHeadPlastic = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_PLASTIC, params);
    const bmwSbuHeadGlass = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_GLASS, params);
    const bmwSbuHeadCardboard = (params: any) => instance.get(URI_METHODs.BMW_SBUHEAD_CARDBOARD, params);
    const iwmSiteHeadCollectionRecyclables = (params: any) => instance.get(URI_METHODs.IWM_SITE_HEAD_COLLECTRECYCLABLES, params);
    const iwmSiteHeadAnalysisRecyclables = (params: any) => instance.get(URI_METHODs.IWM_SITE_HEAD_ANALYSISRECYCLABLES, params);
    const iwmSbuHeadCollectionRecyclables = (params: any) => instance.get(URI_METHODs.IWM_SBU_HEAD_COLLECTRECYCLABLES, params);
    const iwmSbuHeadAnalysisRecyclables = (params: any) => instance.get(URI_METHODs.IWM_SBU_HEAD_ANALYSISRECYCLABLES, params);
    const IWMproductcatalogue = (params: any) => instance.get(URI_METHODs.IWM_PRODUCT, params);
    const IWMSBUproductcatalogue = (params: any) => instance.get(URI_METHODs.IWM_SBU_CATALOGUE, params);
    // ********************Recycle Plastic User API*********************************************************
    const recyclePlasticCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_COLLECTION, params);
    const recyclePlasticSegragation = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SEGREGATION, params);
    const recyclePlasticProcessed = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_PROCESSED, params);
    const recycleMaterialSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_MATERIAL_SUMMARY, payload);
    const recyclePlasticCollectionTrendGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_COLLECTION_TREND_GRAPH, payload);
    const recyclePlasticSegregationTrendGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SEGREGATION_TREND_GRAPH, payload);
    const recyclePlasticProcessedTrendGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_PROCESSED_TREND_GRAPH, payload);
    const recyclePlasticSaveCollectionData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SAVE_COLLECTION, payload);
    const recyclePlasticSaveSegregationData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SAVE_SEGREGATION, payload);
    const recyclePlasticSaveProcessedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SAVE_PROCESSED, payload);
    const recyclePlasticProcessedSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_PROCESSED_SUMMARY, payload);
    const recyclePlasticProductSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_PRODUCT_SUMMARY, payload);
    const recyclePlasticHistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_HISTORY, payload);

    // const recyclePlasticCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_COLLECTION, params);
    // const recyclePlasticSegragation = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SEGREGATION, params);
    // const recyclePlasticProcessed = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_PROCESSED, params);
    // const recycleMaterialSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_MATERIAL_SUMMARY, params);
    // const recyclePlasticCollectionTrendGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_COLLECTION_TREND_GRAPH, params);
    // const recyclePlasticSegregationTrendGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SEGREGATION_TREND_GRAPH, params);
    // const recyclePlasticProcessedTrendGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_PROCESSED_TREND_GRAPH, params);
    // const recyclePlasticSaveCollectionData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SAVE_COLLECTION, payload);
    // const recyclePlasticSaveSegregationData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SAVE_SEGREGATION, payload);
    // const recyclePlasticSaveProcessedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SAVE_PROCESSED, payload);
    // const recyclePlasticProcessedSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_PROCESSED_SUMMARY, params);
    // const recyclePlasticProductSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_PRODUCT_SUMMARY, params);
    // const recyclePlasticHistory = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_HISTORY, params);

    // ********************Recycle Plastic Sitehead User API*********************************************************
    const siteHeadWasteSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_WASTE_SUMMARY, payload);
    const siteHeadCollectedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_COLLECTED_GRAPH, payload);
    const siteHeadSegregatedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_SEGREGATED_GRAPH, payload);
    const siteHeadProcessedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PROCESSED_GRAPH, payload);
    const siteHeadProcessedSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PROCESSED_SUMMARY, payload);
    const siteHeadProductSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PRODUCT_SUMMARY, payload);
    const siteHeadHistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_HISTORY, payload);
    const siteHeadCollection = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_COLLECTED, payload);
    const siteHeadSegregation = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_SEGREGATED, payload);
    const siteHeadProcessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PROCESSED, payload);

    // const siteHeadWasteSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_WASTE_SUMMARY, params);
    // const siteHeadCollectedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_COLLECTED_GRAPH, params);
    // const siteHeadSegregatedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_SEGREGATED_GRAPH, params);
    // const siteHeadProcessedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PROCESSED_GRAPH, params);
    // const siteHeadProcessedSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PROCESSED_SUMMARY, params);
    // const siteHeadProductSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PRODUCT_SUMMARY, params);
    // const siteHeadHistory = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_HISTORY, params);
    // const siteHeadCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_COLLECTED, params);
    // const siteHeadSegregation = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_SEGREGATED, params);
    // const siteHeadProcessed = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_SITEHEAD_PROCESSED, params);
    // *************** plastic business head ****************************
    const recycleplasticwastesummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_WASTE_SUMMARY, payload);
    const recycleplasticgraphsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_COLLECTION_GRAPH, payload);
    const recycleplasticsegregationgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_SEGREGATION_GRAPH, payload);
    const recycleplasticprocessedgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PROCESSED_GRAPH, payload);
    const recycleprocessedsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PROCESSED_SUMMARY, payload);
    const recycleproductsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_PRODUCT_SUMMARY, payload);
    const businessheadHistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_HISTORY, payload);
    const businessHeadCollection = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_COLLECTED, payload);
    const businessHeadSegregation = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_SEGREGATED, payload);
    const businessHeadProcessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_PROCESSED, payload);

    // const recycleplasticwastesummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_WASTE_SUMMARY, params);
    // const recycleplasticgraphsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_COLLECTION_GRAPH, params);
    // const recycleplasticsegregationgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_SEGREGATION_GRAPH, params);
    // const recycleplasticprocessedgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PROCESSED_GRAPH, params);
    // const recycleprocessedsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PROCESSED_SUMMARY, params);
    // const recycleproductsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_PRODUCT_SUMMARY, params);
    // const businessheadHistory = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_HISTORY, params);
    // const businessHeadCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_COLLECTED, params);
    // const businessHeadSegregation = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_SEGREGATED, params);
    // const businessHeadProcessed = (params: any) => instance.get(URI_METHODs.RECYCLE_PLASTIC_BUSINESSHEAD_PROCESSED, params);

    // ****************************** RECYCLE CD SITE OPERATOR ***********************
    const recyclecdSiteOperatorCollected = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_COLLECTED, params);
    const recyclecdSiteOperatorProcessed = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PROCESSED, params);
    const recyclecdSiteOperatorProduct = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PRODUCT, params);
    const recycleSiteOperatorProcessedSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SUMMARY, payload);
    const recycleSiteOperatorProductSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PRODUCT_SUMMARY, payload);
    const recycleSiteOperatorMaterialSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_MATERIAL_SUMMARY, payload);
    const recycleSiteOperatorCollectedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_COLLECTION_TREND_GRAPH, payload);
    const recycleSiteOperatorProcessedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PROCESSED_TREND_GRAPH, payload);
    const recycleSiteOperatorProductGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PRODUCT_TREND_GRAPH, payload);
    const recycleSiteOperatorHistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_HISTORY, payload);
    const recycleSiteOperatorSaveCollectionData = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SAVE_COLLECTION, payload);
    const recycleSiteOperatorSaveProcessedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SAVE_PROCESSED, payload);
    const recycleSiteOperatorSaveProductData = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SAVE_PRODUCT, payload);

    // const recyclecdSiteOperatorCollected = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_COLLECTED, params);
    // const recyclecdSiteOperatorProcessed = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PROCESSED, params);
    // const recyclecdSiteOperatorProduct = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PRODUCT, params);
    // const recycleSiteOperatorProcessedSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SUMMARY, params);
    // const recycleSiteOperatorProductSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PRODUCT_SUMMARY, params);
    // const recycleSiteOperatorMaterialSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_MATERIAL_SUMMARY, params);
    // const recycleSiteOperatorCollectedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_COLLECTION_TREND_GRAPH, params);
    // const recycleSiteOperatorProcessedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PROCESSED_TREND_GRAPH, params);
    // const recycleSiteOperatorProductGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_PRODUCT_TREND_GRAPH, params);
    // const recycleSiteOperatorHistory = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITEOPERATOR_HISTORY, params);
    // const recycleSiteOperatorSaveCollectionData = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SAVE_COLLECTION, payload);
    // const recycleSiteOperatorSaveProcessedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SAVE_PROCESSED, payload);
    // const recycleSiteOperatorSaveProductData = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITEOPERATOR_SAVE_PRODUCT, payload);
    //*************************** CND SITE HEAD  ****************/
    const recyclecdheadsiteheadpostsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_HEAD_WASTE_SUMMARY, payload);
    const recycleproductcatalogue = (payload: any) => instance.post(URI_METHODs.RECYCLE_PRODUCT, payload);
    const recycleProductSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_SITE_HEAD_PRODUCT_SUMMARY, payload);
    const recyclesiteheadcollectiontrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_COLECTION_TREND, payload);
    const recyclesiteheadprocesstrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_PROCESSED_TREND, payload);
    const recyclesiteheadproducttrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_PRODUCT_TREND, payload);
    const recyclecdsitehistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_HEAD_HISTORY, payload);
    const recyclecdSiteHeadCollection = (payload: any) => instance.post(URI_METHODs.RECYCLE_SITE_COLLECTION, payload);
    const recyclecdSiteHeadProduct = (payload: any) => instance.post(URI_METHODs.RECYCLE_SITE_PRODUCT, payload);
    const recyclecdSiteHeadprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_SITE_PROCESSED, payload);

    // const recyclecdheadsiteheadpostsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_HEAD_WASTE_SUMMARY, params);
    // const recycleproductcatalogue = (params: any) => instance.get(URI_METHODs.RECYCLE_PRODUCT, params);
    // const recycleProductSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_SITE_HEAD_PRODUCT_SUMMARY, params);
    // const recyclesiteheadcollectiontrend = (params: any) => instance.get(URI_METHODs.RECYCLE_COLECTION_TREND, params);
    // const recyclesiteheadprocesstrend = (params: any) => instance.get(URI_METHODs.RECYCLE_PROCESSED_TREND, params);
    // const recyclesiteheadproducttrend = (params: any) => instance.get(URI_METHODs.RECYCLE_PRODUCT_TREND, params);
    // const recyclecdsitehistory = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_HEAD_HISTORY, params);
    // const recyclecdSiteHeadCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_SITE_COLLECTION, params);
    // const recyclecdSiteHeadProduct = (params: any) => instance.get(URI_METHODs.RECYCLE_SITE_PRODUCT, params);
    // const recyclecdSiteHeadprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_SITE_PROCESSED, params);
    //**************************** RECYCLE CD BUSINESS HEAD  ************/
    const recycleCDBusinessHeadProduct = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_BUSINESS_HEAD_PRODUCT, payload);
    const recycleCDBusinessHeadProductTrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_BUSINESS_HEAD_PRODUCT_TREND, payload);
    const recycleCDBusinessHeadProductSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_BUSINESS_HEAD_PRODUCT_SUMMARY, payload);
    const recyclecdbusinessheadwastesummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_BUSINESS_WASTE_SUMMARY, payload);
    const recyclecdbusinessheadcollectiongrpah = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_COLLECTION_GRAPH, payload);
    const recyclecdbusinessheadprocessedgrpah = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_PROCESSED_GRAPH, payload);
    const recyclecdbusinessheadprocessedsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_PROCESSED_SUMMARY, payload);
    const recyclecdbusinessheadhistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_HISTORY, payload);
    const recyclecdbusinessheadnavbarcollectedwaste = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_NAVBAR_COLLECTED, payload);
    const recyclecdbusinessheadnavbarprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_CD_NAVBAR_PROCESSED, payload);

    // const recycleCDBusinessHeadProduct = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_BUSINESS_HEAD_PRODUCT, params);
    // const recycleCDBusinessHeadProductTrend = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_BUSINESS_HEAD_PRODUCT_TREND, params);
    // const recycleCDBusinessHeadProductSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_BUSINESS_HEAD_PRODUCT_SUMMARY, params);
    // const recyclecdbusinessheadwastesummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_BUSINESS_WASTE_SUMMARY, params);
    // const recyclecdbusinessheadcollectiongrpah = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_COLLECTION_GRAPH, params);
    // const recyclecdbusinessheadprocessedgrpah = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_PROCESSED_GRAPH, params);
    // const recyclecdbusinessheadprocessedsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_PROCESSED_SUMMARY, params);
    // const recyclecdbusinessheadhistory = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_HISTORY, params);
    // const recyclecdbusinessheadnavbarcollectedwaste = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_NAVBAR_COLLECTED, params);
    // const recyclecdbusinessheadnavbarprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_CD_NAVBAR_PROCESSED, params);
    //******************************* RECYCLE CRM PD USER  *************************/
    const recyclecrmCollectedTable = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_COLLECT_TABLE, params);
    const recyclecrmprocessedtable = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_PROCESSED_TABLE, params);
    const recyclecrmsegregatedtable = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SEGREGATED_TABLE, params);
    const recyclecrmProductionSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_PRODUCTION_SUMMARY, payload);
    const recyclecrmMaterialSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_MATERIAL_SUMMARY, payload);
    const recyclecrmprocessedSummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_PROCESSED_SUMMARY, payload);
    const recyclecrmCollectedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_COLLECTION_TREND_GRAPH, payload);
    const recyclecrmSegregatedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_SEGREGATED_TREND_GRAPH, payload);
    const recyclecrmProcessedGraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_PROCESSED_TREND_GRAPH, payload);
    const recycleCrmpdHistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_HISTORY, payload);
    const recycleCrmSaveCollectionData = (payload: any) => instance.post(URI_METHODs.RECYCLE_COLLECT_SAVE, payload);
    const recycleCrmSaveProcessedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PROCESS_SAVE, payload);
    const recycleCrmSaveSegregatedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_SEGREGATE_SAVE, payload);

    // const recyclecrmCollectedTable = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_COLLECT_TABLE, params);
    // const recyclecrmprocessedtable = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_PROCESSED_TABLE, params);
    // const recyclecrmsegregatedtable = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SEGREGATED_TABLE, params);
    // const recyclecrmProductionSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_PRODUCTION_SUMMARY, params);
    // const recyclecrmMaterialSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_MATERIAL_SUMMARY, params);
    // const recyclecrmprocessedSummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_PROCESSED_SUMMARY, params);
    // const recyclecrmCollectedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_COLLECTION_TREND_GRAPH, params);
    // const recyclecrmSegregatedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_SEGREGATED_TREND_GRAPH, params);
    // const recyclecrmProcessedGraph = (params: any) => instance.get(URI_METHODs.RECYCLE_PROCESSED_TREND_GRAPH, params);
    // const recycleCrmpdHistory = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_HISTORY, params);
    // const recycleCrmSaveCollectionData = (payload: any) => instance.post(URI_METHODs.RECYCLE_COLLECT_SAVE, payload);
    // const recycleCrmSaveProcessedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_PROCESS_SAVE, payload);
    // const recycleCrmSaveSegregatedData = (payload: any) => instance.post(URI_METHODs.RECYCLE_SEGREGATE_SAVE, payload);
    //******************************** CRM SITEHEAD USER ****************************/
    const recyclecrmsiteheadmaterialsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_MATERIAL_SUMMARY, payload);
    const recyclecrmsiteheadprocessedsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_PROCESSED_SUMMARY, payload);
    const recyclecrmsiteheadproductionsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_PRODUCTION_SUMMARY, payload);
    const recyclecrmsiteheadcollectiontrendgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_COLLECTION_TREND_GRAPH, payload);
    const recyclecrmsiteheadprocesstrendgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_PROCESSED_TREND_GRAPH, payload);
    const recyclecrmsiteheadsegregatedtrendgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_SEGREGATED_TREND_GRAPH, payload);
    const recyclecrmsiteheadhistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_HISTORY, payload);
    const recyclecrmSiteHeadnavbarCollection = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_NAVBAR_COLLECTED, payload);
    const recyclecrmSiteHeadnavbarprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_NAVBAR_PROCESSED, payload);
    const recyclecrmSiteHeadnavbarsegregated = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_SITE_NAVBAR_SEGREGATED, payload);

    // const recyclecrmsiteheadmaterialsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_MATERIAL_SUMMARY, params);
    // const recyclecrmsiteheadprocessedsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_PROCESSED_SUMMARY, params);
    // const recyclecrmsiteheadproductionsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_PRODUCTION_SUMMARY, params);
    // const recyclecrmsiteheadcollectiontrendgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_COLLECTION_TREND_GRAPH, params);
    // const recyclecrmsiteheadprocesstrendgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_PROCESSED_TREND_GRAPH, params);
    // const recyclecrmsiteheadsegregatedtrendgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_SEGREGATED_TREND_GRAPH, params);
    // const recyclecrmsiteheadhistory = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_HISTORY, params);
    // const recyclecrmSiteHeadnavbarCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_NAVBAR_COLLECTED, params);
    // const recyclecrmSiteHeadnavbarprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_NAVBAR_PROCESSED, params);
    // const recyclecrmSiteHeadnavbarsegregated = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_SITE_NAVBAR_SEGREGATED, params);
    //********************************* CRM BUSINESS HEAD ****************************/
    const recyclecrmbusinessheadmaterialsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_MATERIAL_SUMMARY, payload);
    const recyclecrmbusinessheadprocessedsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_PROCESSED_SUMMARY, payload);
    const recyclecrmbusinessheadproductionsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_PRODUCTION_SUMMARY, payload);
    const recyclecrmbusinessheadcollectiontrendgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_COLLECTION_TREND_GRAPH, payload);
    const recyclecrmbusinessheadprocesstrendgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_PROCESSED_TREND_GRAPH, payload);
    const recyclecrmbusinessheadsegregatedtrendgraph = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_SEGREGATED_TREND_GRAPH, payload);
    const recyclecrmbusinessheadhistory = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_HISTORY, payload);
    const recyclecrmBusinessHeadnavbarCollection = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_NAVBAR_COLLECTED, payload);
    const recyclecrmBusinessiteHeadnavbarprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_NAVBAR_PROCESSED, payload);
    const recyclecrmBusinessHeadnavbarsegregated = (payload: any) => instance.post(URI_METHODs.RECYCLE_CRM_BUSINESS_NAVBAR_SEGREGATED, payload);

    // const recyclecrmbusinessheadmaterialsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_MATERIAL_SUMMARY, params);
    // const recyclecrmbusinessheadprocessedsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_PROCESSED_SUMMARY, params);
    // const recyclecrmbusinessheadproductionsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_PRODUCTION_SUMMARY, params);
    // const recyclecrmbusinessheadcollectiontrendgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_COLLECTION_TREND_GRAPH, params);
    // const recyclecrmbusinessheadprocesstrendgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_PROCESSED_TREND_GRAPH, params);
    // const recyclecrmbusinessheadsegregatedtrendgraph = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_SEGREGATED_TREND_GRAPH, params);
    // const recyclecrmbusinessheadhistory = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_HISTORY, params);
    // const recyclecrmBusinessHeadnavbarCollection = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_NAVBAR_COLLECTED, params);
    // const recyclecrmBusinessiteHeadnavbarprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_NAVBAR_PROCESSED, params);
    // const recyclecrmBusinessHeadnavbarsegregated = (params: any) => instance.get(URI_METHODs.RECYCLE_CRM_BUSINESS_NAVBAR_SEGREGATED, params);
    //  ******************************** SBU HEAD *****************************
    const recyclesbuheadsitenameget = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_GET_SITENAME, payload);
    const recyclesbuheadwastesummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_WASTE_SUMMARY, payload);
    const recyclesbuheadheadhistorycnd = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_CND_HISTORY, payload);
    const recyclesbuheadheadhistorycrm = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_CRM_HISTORY, payload);
    const recyclesbuheadheadhistoryplastic = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_PLASTIC_HISTORY, payload);
    const recyclesbuheadprocessedsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_PROCESSED_SUMMARY, payload);
    const recyclesbuheadproductsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBUHEAD_PRODUCT_SUMMARY, payload);
    const recyclesbuheadcollectiontrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_COLLECTION_TREND, payload);
    const recyclesbuheadprocessedtrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_PROCESSED_TREND, payload);
    const recyclesbuheadsegregatedtrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SEGREGATED_TREND, payload);
    const recyclesbuheadheadsidenavbarplasticcollect = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_PLASTICCOLLECT_WASTE, payload);
    const recyclesbuheadheadsidenavbarplasticprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_PLASTICPROCESSED_WASTE, payload);
    const recyclesbuheadheadsidenavbarplasticsegregate = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_PLASTICSEGREGATED_WASTE, payload);
    const recyclesbuheadheadsidenavbarcndcollect = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CND_COLLECT_WASTE, payload);
    const recyclesbuheadheadsidenavbarcndprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CNDPROCESSED_WASTE, payload);
    const recyclesbuheadheadsidenavbarcndsegregate = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CNDSEGREGATED_WASTE, payload);
    const recyclesbuheadheadsidenavbarcrmcollect = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CRM_COLLECT_WASTE, payload);
    const recyclesbuheadheadsidenavbarcrmprocessed = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CRMPROCESSED_WASTE, payload);
    const recyclesbuheadheadsidenavbarcrmsegregate = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CRMSEGREGATED_WASTE, payload);
    const recyclesbuheadheadsegregatedsummary = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_SEGREGATED_SUMMARY, payload);
    const recyclesbuheadheadproducttrend = (payload: any) => instance.post(URI_METHODs.RECYCLE_SBU_HEAD_PRODUCT_TREND, payload);

    // const recyclesbuheadsitenameget = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_GET_SITENAME, params);
    // const recyclesbuheadwastesummary = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_WASTE_SUMMARY, params);
    // const recyclesbuheadheadhistorycnd = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_CND_HISTORY, params);
    // const recyclesbuheadheadhistorycrm = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_CRM_HISTORY, params);
    // const recyclesbuheadheadhistoryplastic = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_PLASTIC_HISTORY, params);
    // const recyclesbuheadprocessedsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_PROCESSED_SUMMARY, params);
    // const recyclesbuheadproductsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_SBUHEAD_PRODUCT_SUMMARY, params);
    // const recyclesbuheadcollectiontrend = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_COLLECTION_TREND, params);
    // const recyclesbuheadprocessedtrend = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_PROCESSED_TREND, params);
    // const recyclesbuheadsegregatedtrend = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SEGREGATED_TREND, params);
    // const recyclesbuheadheadsidenavbarplasticcollect = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_PLASTICCOLLECT_WASTE, params);
    // const recyclesbuheadheadsidenavbarplasticprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_PLASTICPROCESSED_WASTE, params);
    // const recyclesbuheadheadsidenavbarplasticsegregate = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_PLASTICSEGREGATED_WASTE, params);
    // const recyclesbuheadheadsidenavbarcndcollect = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CND_COLLECT_WASTE, params);
    // const recyclesbuheadheadsidenavbarcndprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CNDPROCESSED_WASTE, params);
    // const recyclesbuheadheadsidenavbarcndsegregate = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CNDSEGREGATED_WASTE, params);
    // const recyclesbuheadheadsidenavbarcrmcollect = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CRM_COLLECT_WASTE, params);
    // const recyclesbuheadheadsidenavbarcrmprocessed = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CRMPROCESSED_WASTE, params);
    // const recyclesbuheadheadsidenavbarcrmsegregate = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SIDENAVE_CRMSEGREGATED_WASTE, params);
    // const recyclesbuheadheadsegregatedsummary = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_SEGREGATED_SUMMARY, params);
    // const recyclesbuheadheadproducttrend = (params: any) => instance.get(URI_METHODs.RECYCLE_SBU_HEAD_PRODUCT_TREND, params);

    return {
        recyclesbuheadheadproducttrend,
        recyclesbuheadheadsegregatedsummary ,
        recyclesbuheadheadsidenavbarplasticcollect,
        recyclesbuheadheadsidenavbarplasticprocessed,
        recyclesbuheadheadsidenavbarplasticsegregate,
        recyclesbuheadheadsidenavbarcndcollect,
        recyclesbuheadheadsidenavbarcndprocessed,
        recyclesbuheadheadsidenavbarcndsegregate,
        recyclesbuheadheadsidenavbarcrmsegregate ,
        recyclesbuheadheadsidenavbarcrmprocessed,
        recyclesbuheadheadsidenavbarcrmcollect,
        recycleCDBusinessHeadProductSummary,
        recycleCDBusinessHeadProductTrend,
        recycleCDBusinessHeadProduct,
        recyclecdSiteHeadProduct,
        recycleProductSummary,
        recyclesiteheadproducttrend,
        recycleSiteOperatorProductSummary,
        recycleSiteOperatorProductGraph,
        recyclecdSiteOperatorProduct,
        recyclesbuheadcollectiontrend,
        recyclesbuheadprocessedtrend,
        recyclesbuheadsegregatedtrend,
        recyclesbuheadheadhistorycrm,
        recyclesbuheadproductsummary,
        recyclesbuheadprocessedsummary,
        recyclesbuheadheadhistorycnd,
        recyclesbuheadheadhistoryplastic,
        recyclesbuheadwastesummary,
        recyclesbuheadsitenameget,
        recyclecrmBusinessHeadnavbarsegregated,
        recyclecrmBusinessiteHeadnavbarprocessed,
        recyclecrmBusinessHeadnavbarCollection,
        recyclecrmbusinessheadhistory,
        recyclecrmbusinessheadsegregatedtrendgraph,
        recyclecrmbusinessheadprocesstrendgraph,
        recyclecrmbusinessheadcollectiontrendgraph,
        recyclecrmbusinessheadproductionsummary,
        recyclecrmbusinessheadprocessedsummary,
        recyclecrmbusinessheadmaterialsummary,
        recyclecrmSiteHeadnavbarsegregated,
        recyclecrmSiteHeadnavbarprocessed,
        recyclecrmSiteHeadnavbarCollection,
        recyclecrmsiteheadhistory,
        recyclecrmsiteheadsegregatedtrendgraph,
        recyclecrmsiteheadprocesstrendgraph,
        recyclecrmsiteheadcollectiontrendgraph,
        recyclecrmsiteheadproductionsummary,
        recyclecrmsiteheadprocessedsummary,
        recyclecrmsiteheadmaterialsummary,
        recycleCrmSaveSegregatedData,
        recycleCrmSaveProcessedData,
        recycleCrmSaveCollectionData,
        recycleCrmpdHistory,
        recyclecrmProcessedGraph,
        recyclecrmSegregatedGraph,
        recyclecrmCollectedGraph,
        recyclecrmprocessedSummary,
        recyclecrmMaterialSummary,
        recyclecrmProductionSummary,
        recyclecrmsegregatedtable,
        recyclecrmprocessedtable,
        recyclecrmCollectedTable,
        recyclecdSiteHeadprocessed,
        recyclecdSiteHeadCollection,
        recyclecdsitehistory,
        recyclesiteheadprocesstrend,
        recyclesiteheadcollectiontrend,
        recycleproductcatalogue,
        recyclecdheadsiteheadpostsummary,
        recyclecdbusinessheadnavbarprocessed,
        recyclecdbusinessheadnavbarcollectedwaste,
        recyclecdbusinessheadhistory,
        recyclecdbusinessheadprocessedsummary,
        recyclecdbusinessheadprocessedgrpah,
        recyclecdbusinessheadcollectiongrpah,
        recyclecdbusinessheadwastesummary,
        recyclecdSiteOperatorCollected,
        recyclecdSiteOperatorProcessed,
        recycleSiteOperatorProcessedSummary,
        recycleSiteOperatorMaterialSummary,
        recycleSiteOperatorProcessedGraph,
        recycleSiteOperatorHistory,
        recycleSiteOperatorSaveCollectionData,
        recycleSiteOperatorSaveProcessedData,
        recycleSiteOperatorCollectedGraph,
        recycleplasticprocessedgraph,
        recycleplasticsegregationgraph,
        businessheadHistory,
        siteHeadProcessedGraph,
        businessHeadCollection,
        businessHeadSegregation,
        businessHeadProcessed,
        siteHeadWasteSummary,
        siteHeadProductSummary,
        recycleSiteOperatorSaveProductData,
        siteHeadProcessed,
        siteHeadCollection,
        siteHeadSegregation,
        siteHeadHistory,
        siteHeadProcessedSummary,
        siteHeadCollectedGraph,
        recyclePlasticCollectionTrendGraph,
        recyclePlasticProcessedSummary,
        recyclePlasticHistory,
        recyclePlasticProductSummary,
        recyclePlasticSegregationTrendGraph,
        recyclePlasticProcessedTrendGraph,
        recyclePlasticSaveSegregationData,
        recyclePlasticSaveProcessedData,
        recyclePlasticSaveCollectionData,
        recycleproductsummary,
        recycleprocessedsummary,
        recycleplasticgraphsummary,
        recycleplasticwastesummary,
        recycleMaterialSummary,
        recyclePlasticCollection,
        recyclePlasticSegragation,
        recyclePlasticProcessed,
        siteHeadSegregatedGraph,
        IWMproductcatalogue,
        IWMSBUproductcatalogue,
        iwmSiteHeadCollectionRecyclables,
        iwmSiteHeadAnalysisRecyclables,
        iwmSbuHeadCollectionRecyclables,
        iwmSbuHeadAnalysisRecyclables,
        bmwPdPlastic,
        bmwPdGlass,
        bmwPdCardboard,
        bmwSiteHeadPlastic,
        bmwSiteHeadGlass,
        bmwSiteHeadCardboard,
        bmwSbuHeadPlastic,
        bmwSbuHeadGlass,
        bmwSbuHeadCardboard,
        mswpdhistory,
        iwmSiteHeadCollection,
        iwmSiteHeadAnalysis,
        iwmSiteHeadLeftOverStock,
        iwmSbuHeadCollection,
        iwmSbuHeadAnalysis,
        iwmSbuHeadLeftOverStock,
        bmwsbuproductcatalogue,
        bmwsiteproductcatalogue,
        cdproductcatalogue,
        bmwsbuheadprocessing,
        bmwsbuheadcollection,
        bmwsbuheaddistribute,
        iwmpdhistory,
        ctproductcatalogue,
        mswsiteheadprocessed,
        mswsiteheadwte,
        mswsiteheaddistribute,
        mswsiteheadcollection,
        mswsbuheadprocessed,
        mswsbuheadwte,
        mswsbuheaddistribute,
        mswsbuheadcollection,
        bmwsiteheadprocessed,
        bmwsiteheaddistribute,
        bmwsiteheadcollection,
        iwmsbuheadhistory,
        iwmsitehistory,
        bmwsbuheadhistory,
        bmwpdhistory,
        bmwsiteheadhistory,
        mswsbuheadhistory,
        mswsiteheadhistory,
        mswwtehistory,
        IWMcollectdashboard,
        bmwsburecyclable,
        bmwsiterecyclable,
        iwmsummary,
        faqs,
        contactus,
        iwmsbuheadiwmtrend,
        iwmsbuheadiwmrecyclablestrend,
        iwmsbuheadleftoverstocktrend,
        iwmsbuheadanalysistrend,
        iwmsbuheadwastesummary,
        iwmsbuheadcollectiontrend,
        iwmrecyclablesgraph,
        collectiontrendgraphiwm,
        analysistrendgraphiwm,
        leftoverstocktrendgraphiwm,
        IWManalysisdashboard,
        iwmtrend,
        iwmsiteheadpostsummary,
        iwmsiteheadleftoverstocktrend,
        iwmsiteheadanalysistrend,
        iwmsiteheadcollectiontrend,
        IMWleftoverstockdashboard,
        postiwmsaveleftoverstock,
        postiwmsaveanalysis,
        postiwmsavecollect,
        postbmwsbutrend,
        postbmwrecycletrend,
        postbmwprocesstrend,
        postbmwcollecttrend,
        postbmwsavedistribute,
        postbmwsavecollect,
        postbmwsaveprocess,
        loginUser,
        bmwrecyclablespd,
        bmwsitewtetrend,
        bmwsitecollectionsummary,
        bmwsiterecyclablesummary,
        bmwsiteprocessingsummary,
        bmwsummarypd,
        bmwsitewastesummary,
        bmwsbuwastesummary,
        bmwrecyclabletrend,
        bmwprocessingtrend,
        bmwcollectiontrend,
        BMWrecycledashboard,
        changepassword,
        forgotemail,
        otpverify,
        resendotp,
        createnewpassword,
        BMWprocessdashboard,
        BMWcollectdashboard,
        collectiontrendgraph,
        processingtrendgraph,
        getcollection,
        getcollectionct,
        getprocessingct,
        postmswsavecollectct,
        collectiontrendgraphct,
        processingtrendgraphct,
        historyDashboardCT,
        MswDistributeCompostOutflowct,
        MswDistributeRDFOutflowct,
        MswDistributeRecyclablesOutflowct,
        MswDistributeInertsOutflowct,
        getdistributionct,
        postsitehead,
        postsitewteprocessed,
        getashprocessing,
        postmswsavedistribute,
        getprocessing,
        getdistribution,
        getwastecollected,
        getwteenergygenerated,
        postmswsavecollect,
        postmswsavesorting,
        getrdfprocessing,
        postwtesavesorting,
        postbusinesscombine,
        postbusinesswteprocessed,
        rdfgenerationtrendgraph,
        energygenerationtrendgraph,
        ashgenerationtrendgraph,
        siteheadcollectiontrend,
        siteheadprocessingtrend,
        siteheadwtetrend,
        buisnessheadcollectiontrend,
        buisnessheadprocessingtrend,
        buisnessheadwtetrend,
        MswDistributeCompostOutflow,
        MswDistributeRDFOutflow,
        MswDistributeRecyclablesOutflow,
        MswDistributeInertsOutflow,
        siteheaddistributecomposttrendgraph,
        siteheaddistributerdftrendgraph,
        siteheaddistributerecyclabletrendgraph,
        siteheaddistributeinertstrendgraph,
        SBUheaddistributeComposttrendgraph,
        SBUheaddistributeiRDFtrendgraph,
        SBUheaddistributeRecyclabletrendgraph,
        SBUheaddistributeinertstrendgraph,
        SBUheadrdfgenerated,
        SBUheadenergygenerated,
        SBUheadashgenerated,
    };
};

export default { createApiClient };
