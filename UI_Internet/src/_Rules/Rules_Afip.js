const importarListaRepresentantesAFIP = (token, body) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/ValidacionAFIP/ImportarListaRepresentantesAFIP', {
            method: "POST",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
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

const importarRepresentanteAFIP = (token, body) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/ValidacionAFIP/ImportarRepresentanteAFIP', {
            method: "POST",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
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
    importarListaRepresentantesAFIP: importarListaRepresentantesAFIP,
    importarRepresentanteAFIP: importarRepresentanteAFIP
}

export default services;