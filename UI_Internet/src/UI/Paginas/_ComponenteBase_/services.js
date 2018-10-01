const getDatos = (cuit,callback) => {
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
        callback({/* DATA JSON */});
      }, 2000);
    
};

const services = {
    getDatos: getDatos
}

export default services;