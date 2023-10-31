export default class SharedManager {

    static myInstance = null;
    token = ""
    role = ""
    location=""

    /**
     * @returns {SharedManager}
     */
    static getInstance() {
        if (SharedManager.myInstance == null) {
            //@ts-ignore
            SharedManager.myInstance = new SharedManager();
        }

        return this.myInstance;
    }

    getToken() {
        return this.token;
    }

    setToken(token: any) {
        this.token = token;
    }

    getRole() {
        return this.role;
    }

    setRole(role: any) {
        this.role = role;
    }

}