const validarCaptcha = (token, valueCaptcha) => {

    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS + '/v1/ControlAcceso/Validar?codigo=' + valueCaptcha, {
            method: "GET",
            headers: {
                Accept: "application/json",
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

                resolve(datos);
            })
            .catch(err => {
                reject("Error procesando la solicitud");
            });
    });
};

const services = {
    validarCaptcha: validarCaptcha
}

export default services;