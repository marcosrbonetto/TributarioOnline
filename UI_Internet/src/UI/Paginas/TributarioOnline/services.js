const getIdTributos = (cuit,callback) => {
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
            "return": {
              "cuitComercios": [],
              "cuitInmuebles": [
                "100906201900000"
              ],
              "cuitJuicios": [],
              "cuitPlanes": [],
              "cuitRodados": [
                "HCJ675",
                "OUE828"
              ],
              "error": ""
            },
            "error": null,
            "ok": true
          });
      }, 2000);
    
};

const services = {
    getIdTributos: getIdTributos
}

export default services;