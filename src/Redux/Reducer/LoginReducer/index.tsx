import createReducer from '../CreateReducers';
import { ActionType } from '../../Type';
const { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN, USER_LOGIN_LOADING, DASHBOARD_DATA, 
    DASHBOARD_PROCESSING_DATA, DASHBOARD_DISTRIBUTE_DATA, DASHBOARD_WTE_COLLECTION_DATA, 
    DASHBOARD_WTE_DISTRIBUTION_DATA, DASHBOARD_WTE_PROCESSING_DATA, DASHBOARD_BMW_DATA, 
    DASHBOARD_BMW_PROCESSING_DATA, DASHBOARD_BMW_DISTRIBUTE_DATA, DASHBOARD_IWM_COLLECTION,
    DASHBOARD_IWM_ANALYSIS, DASHBOARD_IWM_LEFTOVERSTOCK, RECYCLE_PLASTIC_COLLECTION,
    RECYCLE_PLASTIC_SEGREGATION, RECYCLE_PLASTIC_PROCESSED,RECYCLE_CD_SITEOPERATOR_PROCESSED,
    RECYCLE_CD_SITEOPERATOR_COLLECTED, RECYCLE_CRM_COLLECTION, RECYCLE_CRM_SEGREGATION, 
    RECYCLE_CRM_PROCESSED, RECYCLE_CD_SITEOPERATOR_PRODUCT, RECYCLE_SBU_HEAD_DEPARTMENT} = ActionType;
    // Initial State Or Value
let initialState = {
    loading: false,
    error: '',
    user: {},
    dashboardData: {},
    dashboardProcessingData: {},
    dashboardDistributeData: {},
    dashboardWteCollectionData: {},
    dashboardWteDistributionData: {},
    dashboardWteProcessingData: {},
    dashboardBmwData: {},
    dashboardBmwProcessingData: {},
    dashboardBmwDistributeData: {},
    dashboardIwmCollectionData: {},
    dashboardIwmAnalysisData: {},
    dashboardIwmLeftOverStockData: {},
    recyclePlasticCollection: {},
    recyclePlasticSegregation: {},
    recyclePlasticProcessed: {},
    recyclecdSiteOperatorCollected:{},
    recyclecdSiteOperatorProduct:{},
    recyclecdSiteOperatorProcessed:{},
    recycleCrmCollection: {},
    recycleCrmSegregation: {},
    recycleCrmProcessed: {},
    sbuHeadDepartment: "All",
};

export const userReducer = createReducer(initialState, {
    // Reducer For User Login
    [USER_LOGIN_LOADING](state, action) {
        return Object.assign({}, state, {
            loading: action.payload,
        });
    },
    [USER_LOGIN_SUCCESS](state, action) {
        return Object.assign({}, state, {
            loading: false,
            user: action.payload,
        });
    },
    [USER_LOGIN_FAILURE](state, action) {
        return Object.assign({}, state, {
            error: action.payload,
            loading: false,
        });
    },
    [USER_LOGIN](state) {
        return Object.assign({}, state, {
            loading: false,
            error: '',
        });
    },
    // Reducer For MSW Data Refresh
    [DASHBOARD_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardData: action.payload,
        });
    },
    [DASHBOARD_PROCESSING_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardProcessingData: action.payload,
        });
    },
    [DASHBOARD_DISTRIBUTE_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardDistributeData: action.payload,
        });
    },
    [DASHBOARD_WTE_COLLECTION_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardWteCollectionData: action.payload,
        });
    },
    [DASHBOARD_WTE_DISTRIBUTION_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardWteDistributionData: action.payload,
        });
    },
    [DASHBOARD_WTE_PROCESSING_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardWteProcessingData: action.payload,
        });
    },
    // Reducer For BMW Data Refresh
    [DASHBOARD_BMW_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardBmwData: action.payload,
        });
    },
    [DASHBOARD_BMW_PROCESSING_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardBmwProcessingData: action.payload,
        });
    },
    [DASHBOARD_BMW_DISTRIBUTE_DATA](state, action) {
        return Object.assign({}, state, {
            dashboardBmwDistributeData: action.payload,
        });
    },
     // Reducer For IWM Data Refresh
    [DASHBOARD_IWM_COLLECTION](state, action) {
        return Object.assign({}, state, {
            dashboardIwmCollectionData: action.payload,
        });
    },
    [DASHBOARD_IWM_ANALYSIS](state, action) {
        return Object.assign({}, state, {
            dashboardIwmAnalysisData: action.payload,
        });
    },
    [DASHBOARD_IWM_LEFTOVERSTOCK](state, action) {
        return Object.assign({}, state, {
            dashboardIwmLeftOverStockData: action.payload,
        });
    },
    // Reducer For Recycle Plastic Data Refresh
    [RECYCLE_PLASTIC_COLLECTION](state, action) {
        return Object.assign({}, state, {
            recyclePlasticCollection: action.payload,
        });
    },
    [RECYCLE_PLASTIC_SEGREGATION](state, action) {
        return Object.assign({}, state, {
            recyclePlasticSegregation: action.payload,
        });
    },
    [RECYCLE_PLASTIC_PROCESSED](state, action) {
        return Object.assign({}, state, {
            recyclePlasticProcessed: action.payload,
        });
    },
    // Reducer For Recycle CD Data Refresh
    [RECYCLE_CD_SITEOPERATOR_COLLECTED](state, action) {
        return Object.assign({}, state, {
            recyclecdSiteOperatorCollected: action.payload,
        });
    },
    [RECYCLE_CD_SITEOPERATOR_PROCESSED](state, action) {
        return Object.assign({}, state, {
            recyclecdSiteOperatorProcessed: action.payload,
        });
    },
    [RECYCLE_CD_SITEOPERATOR_PRODUCT](state, action) {
        return Object.assign({}, state, {
            recyclecdSiteOperatorProduct: action.payload,
        });
    },
    // Reducer For Recycle CRM Data Refresh
    [RECYCLE_CRM_COLLECTION](state, action) {
        return Object.assign({}, state, {
            recycleCrmCollection: action.payload,
        });
    },
    [RECYCLE_CRM_SEGREGATION](state, action) {
        return Object.assign({}, state, {
            recycleCrmSegregation: action.payload,
        });
    },
    [RECYCLE_CRM_PROCESSED](state, action) {
        return Object.assign({}, state, {
            recycleCrmProcessed: action.payload,
        });
    },
    // Reducer For Recycle SBU Head Department Selection
    [RECYCLE_SBU_HEAD_DEPARTMENT](state, action) {
        return Object.assign({}, state, {
            sbuHeadDepartment: action.payload,
        });
    },
});
