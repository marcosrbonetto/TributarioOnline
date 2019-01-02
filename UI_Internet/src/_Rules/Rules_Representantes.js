const agregarSolicitudPermiso = (token, body) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/Representacion/Agregar', {
            method: "POST",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({
                "tipoTributo": body.tipoTributo,
                "identificador": body.identificador
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

const cancelarPermiso = (token, body) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/Representacion/Cancelar', {
            method: "DELETE",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({
                "cuilRepresentante": body.cuilRepresentante,
                "tipoTributo": body.tipoTributo,
                "identificador": body.identificador
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

const aceptarPermiso = (token, body) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/Representacion/Aceptar', {
            method: "PUT",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({
                "cuilRepresentante": body.cuilRepresentante,
                "tipoTributo": body.tipoTributo,
                "identificador": body.identificador
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

const getMisRepresentantes = (token, identificador) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/Representacion/MisRepresentantes', {
            method: "GET",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
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

const getMisRepresentados = (token, identificador) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/Representacion/MisRepresentantados', {
            method: "GET",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
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

const getTitularTributo = (token, param) => {
    return new Promise((resolve, reject) => {

        fetch(window.Config.BASE_URL_WS+'/v1/Tributario/Titular?tipoTributo='+param.tipoTributo+'&identificador='+param.identificador, {
            method: "GET",
            headers: {
                Accept: "application/json", "--ControlAcceso": 10,
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
    agregarSolicitudPermiso: agregarSolicitudPermiso,
    cancelarPermiso: cancelarPermiso,
    aceptarPermiso: aceptarPermiso,
    getMisRepresentantes: getMisRepresentantes,
    getMisRepresentados: getMisRepresentados,
    getTitularTributo: getTitularTributo
    
}

export default services;