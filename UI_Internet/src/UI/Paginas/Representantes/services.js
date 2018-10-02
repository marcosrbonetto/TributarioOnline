const getTributosCUIT = (cuit,callback) => {
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

    setTimeout(function() {
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


const getSolicitudesPermiso = (cuit,callback) => {
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

    setTimeout(function() {
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

const services = {
    getTributosCUIT: getTributosCUIT,
    getSolicitudesPermiso: getSolicitudesPermiso
}

export default services;