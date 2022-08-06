import FToast, { IToastOption } from "~/components/toast/FToast";
import { ApiException } from "~/@helpers/network/common";
import { WarningException } from "./toast.model";
import LanguageStore from "~/stores/language/language.store";
import ThemeStore from "~/stores/theme/theme.store";

const DURATION = 3000;

class ToastService {

    private ref: FToast;

    setRefContainer(ref: FToast) {
        this.ref = ref;
    }
    constructor() {
    }

    success = (message: string = 'Thành công', duration: number = DURATION) => {
        console.log("message");
        console.log(message);

        try {
            const { resource } = LanguageStore()
            // const { colors } = ThemeStore
            this.ref.showToast({
                message: resource?.message || message,
                duration,
                backgroundColor: 'green',
                colorText: 'white',
                iconName: 'checkcircleo',
                iconType: 'antdesign'
            })
        } catch (error) {
        }
    }
    error = (message: string = '', duration: number = DURATION) => {
        try {
            const { translate } = this.languageStore
            const { colors } = this.themeStore.theme;
            this.ref.showToast({
                message: message,
                duration,
                backgroundColor: colors.error || 'red',
                colorText: 'white',
                iconName: 'exclamationcircleo',
                iconType: 'antdesign'
            })
        } catch (error) {
        }
    }
    info = (message: string = '', duration: number = DURATION) => {
        try {
            const { translate } = this.languageStore
            const { colors } = this.themeStore.theme
            this.ref.showToast({
                message: translate(message) || message.trim(),
                duration,
                backgroundColor: colors.disabled || 'gray',
                colorText: 'white'
            })
        } catch (error) {

        }
    }
    warning = (message: string = '', duration: number = DURATION) => {
        try {
            const { translate } = this.languageStore
            const { colors } = this.themeStore.theme
            this.ref.showToast({
                message: translate(message) || message,
                duration,
                backgroundColor: colors.warning || 'yellow',
                colorText: 'white',
                iconName: 'infocirlceo',
                iconType: 'antdesign'
            })
        } catch (error) {
            console.log('----------erro toast', error)
        }
    }

    handlerException = async (err: any) => {
        console.log('-------------------');
        console.log(err);
        console.log('-------------------');
        if (err instanceof ApiException) {
            if (err.status === 403 || err.status === 401) {
                this.warning("Đăng nhập thất bại, vui lòng thử lại!")
                await this.authStore.logout();
                return;
            }
            if (err.data) {
                const message = err.data["message"] || err.data["ExceptionMessage"] || "Unknown"
                this.error(message)
            } else {
                this.error(err.message)
            }
        } else {
            if (err instanceof WarningException) {
                this.warning(err.message)
            } else {
                this.error("Lỗi")
            }
        }
    }

}

export default new ToastService();