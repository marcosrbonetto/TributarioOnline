import Store from "@Redux/Store/index";
//Este valor se obtiene luego de pasar la prueba del ReCaptcha
const accessCaptcha = Store.getState().CaptchaAccess.accessCaptcha || '-';

const getMisNotificaciones = (token) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS + '/v1/Notificacion/MisNotificaciones', {
            method: "GET",
            headers: {
                "--ControlAcceso": accessCaptcha,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Token": token
            }
        })
            .then(res => {

                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return res.json();
            })
            .then(datos => {
                if (!datos.accesows)
                    resolve(datos);
                else
                    window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
            })
            .catch(err => {
                reject("Error procesando la solicitud");
            });
    });
};

const setNotificacionLeida = (token, identificador) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS + '/v1/Notificacion/Leer?identificador=' + identificador, {
            method: "GET",
            headers: {
                "--ControlAcceso": accessCaptcha,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Token": token
            }
        })
            .then(res => {

                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return res.json();
            })
            .then(datos => {
                if (!datos.accesows)
                    resolve(datos);
                else
                    window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
            })
            .catch(err => {
                reject("Error procesando la solicitud");
            });
    });
};

const services = {
    getMisNotificaciones: getMisNotificaciones,
    setNotificacionLeida: setNotificacionLeida
}

export default services;