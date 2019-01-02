import Store from "@Redux/Store/index";

const importarListaRepresentantesAFIP = (token, body) => {
    //Este valor se obtiene luego de pasar la prueba del ReCaptcha
    const accessCaptcha = Store.getState().CaptchaAccess.accessCaptcha || '-';
    
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS + '/v1/ValidacionAFIP/ImportarListaRepresentantesAFIP', {
            method: "POST",
            headers: {
                "--ControlAcceso": accessCaptcha,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({
                "hash": body.hash,
            })
        })
            .then(res => {

                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return res.json();
            })
            .then(datos => {
                if (datos.accesoWS)
                    resolve(datos);
                else
                    window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
            })
            .catch(err => {
                reject("Error procesando la solicitud");
            });
    });
};

const importarRepresentanteAFIP = (token, body) => {
    //Este valor se obtiene luego de pasar la prueba del ReCaptcha
    const accessCaptcha = Store.getState().CaptchaAccess.accessCaptcha || '-';

    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS + '/v1/ValidacionAFIP/ImportarRepresentanteAFIP', {
            method: "POST",
            headers: {
                "--ControlAcceso": accessCaptcha,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({
                "hash": body.hash,
            })
        })
            .then(res => {

                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return res.json();
            })
            .then(datos => {
                if (datos.accesoWS)
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
    importarListaRepresentantesAFIP: importarListaRepresentantesAFIP,
    importarRepresentanteAFIP: importarRepresentanteAFIP
}

export default services;