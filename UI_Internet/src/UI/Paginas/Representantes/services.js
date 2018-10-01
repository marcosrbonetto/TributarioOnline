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

const services = {
    getTributosCUIT: getTributosCUIT
}

export default services;