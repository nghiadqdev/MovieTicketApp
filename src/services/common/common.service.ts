import { ApiException } from "~/@helpers/network/common";
import { AuthStore } from "~/stores/auth/auth.store";

class CommonService {
    private authStore: AuthStore
    setAuthStore(authStore: AuthStore) {
        this.authStore = authStore
    }
    handlerException = async (err: any) => {
        if (err instanceof ApiException) {
            if (err.status === 403 || err.status === 401) {
                await this.authStore.logout();
                return;
            }
        }
    }
}


export default new CommonService()