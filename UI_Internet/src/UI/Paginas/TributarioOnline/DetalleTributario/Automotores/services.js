const getInfoTributo = (cuit,callback) => {
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
            "identificador": "CHT211",
            "tieneJuicios": true,
            "tienePlanes": false,
            "tieneMultas": true,
            "titular": {
              "cuit": "20164095054",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaAdministrativa": {
              "total": 0,
              "vencida": 7122.7,
              "aVecer": 0,
              "ultimoPago": "07/09/2018"
            },
            "periodos": [
              {
                "item": "2015/003",
                "fecha": "2015-06-12T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 396.7,
                  "base": 180,
                  "recargo": 216.7,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2015/004",
                "fecha": "2015-08-13T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 385.6,
                  "base": 180,
                  "recargo": 205.6,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2015/005",
                "fecha": "2015-10-13T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 374.6,
                  "base": 180,
                  "recargo": 194.6,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2015/006",
                "fecha": "2015-12-14T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 363.4,
                  "base": 180,
                  "recargo": 183.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2016/001",
                "fecha": "2016-02-12T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 538.7,
                  "base": 275,
                  "recargo": 263.7,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2016/002",
                "fecha": "2016-04-15T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 521.4,
                  "base": 275,
                  "recargo": 246.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2016/003",
                "fecha": "2016-06-14T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 504.9,
                  "base": 275,
                  "recargo": 229.9,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2016/004",
                "fecha": "2016-08-12T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 488.7,
                  "base": 275,
                  "recargo": 213.7,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2016/005",
                "fecha": "2016-10-13T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 471.6,
                  "base": 275,
                  "recargo": 196.6,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2016/006",
                "fecha": "2016-12-14T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 454.6,
                  "base": 275,
                  "recargo": 179.6,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2017/001",
                "fecha": "2017-02-17T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 481.2,
                  "base": 303,
                  "recargo": 178.2,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2017/002",
                "fecha": "2017-04-10T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 465.4,
                  "base": 303,
                  "recargo": 162.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2017/003",
                "fecha": "2017-06-12T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 446.3,
                  "base": 303,
                  "recargo": 143.3,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2017/004",
                "fecha": "2017-08-10T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 428.4,
                  "base": 303,
                  "recargo": 125.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2017/005",
                "fecha": "2017-10-10T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 410,
                  "base": 303,
                  "recargo": 107,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "item": "2017/006",
                "fecha": "2017-12-11T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 391.2,
                  "base": 303,
                  "recargo": 88.2,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          "error": null,
          "ok": true
        });
      }, 2000);
    
};

const services = {
    getInfoTributo: getInfoTributo
}

export default services;