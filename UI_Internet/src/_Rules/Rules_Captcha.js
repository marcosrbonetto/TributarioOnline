const validarCaptcha = (token, body) => {

    return new Promise((resolve, reject) => {
        resolve({
            "return": "lalal",
            "error": "string",
            "ok": true
        });
    });
    
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS + '/v1/ValidarCaptcha/validarCaptcha', {
            method: "POST",
            headers: {
                Accept: "application/json",
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