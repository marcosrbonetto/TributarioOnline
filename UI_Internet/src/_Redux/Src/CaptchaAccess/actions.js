import {
    SET_ACCESS_CAPTCHA
} from "@ReduxSrc/CaptchaAccess/constants";

export const setAccessCaptcha = datos => ({ 
    type: SET_ACCESS_CAPTCHA,
    payload: datos
});