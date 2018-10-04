const getTributosCUIT = (cuit, callback) => {
    /*fetch('https://httpbin.org/get')
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json()
    })
    .then(datos => {
        callback(datos);
    })
    .catch(err => {
        console.error(err);
    });*/

    setTimeout(function () {
        callback({
            return: {
                representado: 'Adrian Dotta',
                cuitRepresentado: '20355266169',
                tributos: {
                    Automotores: [
                        'HGF456',
                        'WER345',
                        'UIO678'
                    ]
                }
            }
        });
    }, 2000);

};


const getSolicitudesPermiso = (cuit, callback) => {
    /*fetch('https://httpbin.org/get')
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json()
    })
    .then(datos => {
        callback(datos);
    })
    .catch(err => {
        console.error(err);
    });*/

    setTimeout(function () {
        callback({
            return: [
                {
                    representante: 'Marcelo Gallarzo',
                    cuitRepresentante: '20345688549',
                    tributos: {
                        Automotores: [
                            'ASD234',
                            'YUI768',
                            'XCV345'
                        ]
                    }
                },
                {
                    representante: 'Pedro Sanchez',
                    cuitRepresentante: '20355644589',
                    tributos: {
                        Automotores: [
                            'ASD134',
                            'YUI168',
                            'XCV145'
                        ]
                    }
                },
                {
                    representante: 'Marcos Peña',
                    cuitRepresentante: '20365421529',
                    tributos: {
                        Automotores: [
                            'AAD234',
                            'YAI268',
                            'XAV245'
                        ]
                    }
                }
            ]
        });
    }, 2000);

};

const getMisRepresentantes = (cuit, callback) => {
    /*fetch('https://httpbin.org/get')
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json()
    })
    .then(datos => {
        callback(datos);
    })
    .catch(err => {
        console.error(err);
    });*/

    setTimeout(function () {
        callback({
            "return": [
                {
                    "representante": "Oscar Dotta",
                    "cuitRepresentante": "20355124512",
                    "tributo": "Automotores",
                    "identificador": "ASD234",
                    "estado": "Aceptado"
                },
                {
                    "representante": "Pedro Sanchez",
                    "cuitRepresentante": "2021125456",
                    "tributo": "Automotores",
                    "identificador": "BSD224",
                    "estado": "Pendiente"
                },
                {
                    "representante": "Marcos Amato",
                    "cuitRepresentante": "2044125456",
                    "tributo": "Automotores",
                    "identificador": "TSD254",
                    "estado": "Aceptado"
                },
                {
                    "representante": "Pedro Sanchez",
                    "cuitRepresentante": "2034125456",
                    "tributo": "Automotores",
                    "identificador": "AHG274",
                    "estado": "Aceptado"
                }
            ],
            "error": null,
            "ok": true
        });
    }, 2000);
};

const getMisRepresentados = (cuit, callback) => {
    /*fetch('https://httpbin.org/get')
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json()
    })
    .then(datos => {
        callback(datos);
    })
    .catch(err => {
        console.error(err);
    });*/

    setTimeout(function () {
        callback({
            "return": [
                {
                    "representado": "Marcos Amato",
                    "cuitRepresentado": "2044125456",
                    "tributo": "Automotores",
                    "identificador": "TSD254",
                    "estado": "Aceptado"
                },
                {
                    "representado": "Pedro Sanchez",
                    "cuitRepresentado": "2021125456",
                    "tributo": "Automotores",
                    "identificador": "BSD224",
                    "estado": "Pendiente"
                },
                {
                    "representado": "Oscar Dotta",
                    "cuitRepresentado": "20355124512",
                    "tributo": "Automotores",
                    "identificador": "ASD234",
                    "estado": "Aceptado"
                },
                {
                    "representado": "Pedro Sanchez",
                    "cuitRepresentado": "2034125456",
                    "tributo": "Automotores",
                    "identificador": "AHG274",
                    "estado": "Aceptado"
                }
            ],
            "error": null,
            "ok": true
        });
    }, 2000);
};

const services = {
    getTributosCUIT: getTributosCUIT,
    getSolicitudesPermiso: getSolicitudesPermiso,
    getMisRepresentantes: getMisRepresentantes,
    getMisRepresentados: getMisRepresentados
}

export default services;