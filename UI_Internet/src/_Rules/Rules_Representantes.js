const agregarSolicitudPermiso = (token, body) => {
    return new Promise((resolve, reject) => {

        fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Representante/Agregar', {
            method: "POST",
            headers: {
                Accept: "application/json",
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

        fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Representante/Cancelar', {
            method: "DELETE",
            headers: {
                Accept: "application/json",
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

        fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Representante/Aceptar', {
            method: "PUT",
            headers: {
                Accept: "application/json",
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

        fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Representante/MisRepresentantes', {
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

const getMisRepresentados = (token, identificador) => {
    return new Promise((resolve, reject) => {

        fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Representante/MisRepresentantados', {
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

const getTitularTributo = (token, param) => {
    return new Promise((resolve, reject) => {

        fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Tributario/Titular?tipoTributo='+param.tipoTributo+'&identificador='+param.identificador, {
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
    agregarSolicitudPermiso: agregarSolicitudPermiso,
    cancelarPermiso: cancelarPermiso,
    aceptarPermiso: aceptarPermiso,
    getMisRepresentantes: getMisRepresentantes,
    getMisRepresentados: getMisRepresentados,
    getTitularTributo: getTitularTributo
    
}

export default services;