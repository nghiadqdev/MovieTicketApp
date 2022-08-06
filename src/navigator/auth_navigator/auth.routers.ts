import SigninScreen from "~/screens/auth/SigninScreen";
import SignUpScreen from "~/screens/auth/SignUpScreen";

const authRouters = {
    SigninScreen: SigninScreen,
    SignUpScreen: SignUpScreen,
}
export type TAuthScreenName = keyof typeof authRouters;
export default authRouters;