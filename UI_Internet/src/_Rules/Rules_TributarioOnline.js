const getIdTributos = (cuit, callback) => {
  return new Promise((resolve, reject) => {
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
      resolve({
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
  });
};


const getInfoContribucion = (cuit) => {
  return new Promise((resolve, reject) => {
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
      resolve({
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
            "aVencer": 0,
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
  });
};



const getInfoMultas = (cuit) => {
  return new Promise((resolve, reject) => {
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
      resolve({
        "return": {
          "identificador": "CHT211",
          "tieneJuicios": true,
          "tienePlanes": false,
          "titular": {
            "cuit": "DE UGARTE MANUEL ELOY",
            "titular": ""
          },
          "deudaAdministrativa": {
            "total": 0,
            "vencida": 0,
            "aVencer": 0,
            "ultimoPago": ""
          },
          "periodos": [
            {
              "item": "4882435",
              "fecha": "2018-08-29T00:00:00",
              "referencia": "NO ABONAR ESTACIONAMIENTO TARIFADO",
              "importe": {
                "total": 374.07,
                "base": 536.8,
                "recargo": 0,
                "deduccion": 214.72,
                "citacion": 0
              }
            },
            {
              "item": "2772137",
              "fecha": "2012-09-14T00:00:00",
              "referencia": "ESTACIONAR EN LUGAR RESERVADO -DISCAPACITADOS-            ",
              "importe": {
                "total": 794.56,
                "base": 600,
                "recargo": 180,
                "deduccion": 0,
                "citacion": 0
              }
            },
            {
              "item": "3237718",
              "fecha": "2013-05-24T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3236520",
              "fecha": "2013-08-10T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3168974",
              "fecha": "2013-08-20T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3166530",
              "fecha": "2013-08-10T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3165936",
              "fecha": "2013-08-09T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3131832",
              "fecha": "2013-08-29T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3121528",
              "fecha": "2013-09-01T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 247.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 160,
                "citacion": 0
              }
            },
            {
              "item": "3631333",
              "fecha": "2014-01-13T00:00:00",
              "referencia": "CONDUCIR USANDO SIMULTANEAMENTE APARATOS TELEFONICOS      ",
              "importe": {
                "total": 109.28,
                "base": 170,
                "recargo": 0,
                "deduccion": 68,
                "citacion": 0
              }
            },
            {
              "item": "3497436",
              "fecha": "2014-08-08T00:00:00",
              "referencia": "VIOLAR CARTEL -PROHIBIDO ESTACIONAR LAS 24 HS-            ",
              "importe": {
                "total": 407.28,
                "base": 400,
                "recargo": 0,
                "deduccion": 0,
                "citacion": 0
              }
            },
            {
              "item": "3908362",
              "fecha": "2015-10-24T00:00:00",
              "referencia": "CONDUCIR USANDO SIMULTANEAMENTE APARATOS TELEFONICOS      ",
              "importe": {
                "total": 184.71,
                "base": 170,
                "recargo": 0,
                "deduccion": 0,
                "citacion": 0
              }
            },
            {
              "item": "4318612",
              "fecha": "2017-03-02T00:00:00",
              "referencia": "ESTACIONAR A LA IZQUIERDA DEL SENTIDO DE CIRCULACION      ",
              "importe": {
                "total": 917.46,
                "base": 824.8,
                "recargo": 0,
                "deduccion": 0,
                "citacion": 0
              }
            },
            {
              "item": "4425121",
              "fecha": "2017-06-16T00:00:00",
              "referencia": "ESTACIONAR A LA IZQUIERDA DEL SENTIDO DE CIRCULACION      ",
              "importe": {
                "total": 535.07,
                "base": 824,
                "recargo": 0,
                "deduccion": 329.6,
                "citacion": 0
              }
            },
            {
              "item": "4461613",
              "fecha": "2017-08-03T00:00:00",
              "referencia": "ESTACIONAR A LA IZQUIERDA DEL SENTIDO DE CIRCULACION      ",
              "importe": {
                "total": 570.59,
                "base": 883.2,
                "recargo": 0,
                "deduccion": 353.28,
                "citacion": 0
              }
            },
            {
              "item": "4493376",
              "fecha": "2017-08-31T00:00:00",
              "referencia": "ESTACIONAR A LA IZQUIERDA DEL SENTIDO DE CIRCULACION      ",
              "importe": {
                "total": 570.59,
                "base": 883.2,
                "recargo": 0,
                "deduccion": 353.28,
                "citacion": 0
              }
            },
            {
              "item": "4568058",
              "fecha": "2017-11-01T00:00:00",
              "referencia": "CONDUCIR USANDO SIMULTANEAMENTE APARATOS TELEFONICOS      ",
              "importe": {
                "total": 623.15,
                "base": 970.8,
                "recargo": 0,
                "deduccion": 388.32,
                "citacion": 0
              }
            },
            {
              "item": "4765583",
              "fecha": "2018-05-23T00:00:00",
              "referencia": "ESTACIONAR A LA IZQUIERDA DEL SENTIDO DE CIRCULACION      ",
              "importe": {
                "total": 729.27,
                "base": 1128.8,
                "recargo": 0,
                "deduccion": 451.52,
                "citacion": 0
              }
            },
            {
              "item": "4798583",
              "fecha": "2018-06-19T00:00:00",
              "referencia": "ESTACIONAR A LA IZQUIERDA DEL SENTIDO DE CIRCULACION      ",
              "importe": {
                "total": 763.11,
                "base": 1185.2,
                "recargo": 0,
                "deduccion": 474.08,
                "citacion": 0
              }
            }
          ]
        },
        "error": null,
        "ok": true
      });
    }, 2000);
  });
};

const services = {
  getIdTributos: getIdTributos,
  getInfoContribucion: getInfoContribucion,
  getInfoMultas: getInfoMultas
}

export default services;