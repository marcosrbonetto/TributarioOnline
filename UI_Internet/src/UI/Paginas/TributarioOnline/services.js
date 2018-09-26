const serviceGetDatos = (cuit,callback) => {
    fetch('https://httpbin.org/get')
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json()
    })
    .then(datos => {
        callback({
            "result": {
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
    })
    .catch(err => {
        console.error(err);
    });
};

const services = {
    serviceGetDatos: serviceGetDatos
}

export default services;