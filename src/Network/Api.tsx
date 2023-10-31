import network from '../Network';
import * as Config from '../Configration';

export default {
    //===================Login API ============================//
    loginApi: async (data: any) => {
        const response = await network.createApiClient().loginUser(data)
        return response
    },
};