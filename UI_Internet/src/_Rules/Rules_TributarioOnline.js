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
              "concepto": "2015/003",
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
              "concepto": "2015/004",
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
              "concepto": "2015/005",
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
              "concepto": "2015/006",
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
              "concepto": "2016/001",
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
              "concepto": "2016/002",
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
              "concepto": "2016/003",
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
              "concepto": "2016/004",
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
              "concepto": "2016/005",
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
              "concepto": "2016/006",
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
              "concepto": "2017/001",
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
              "concepto": "2017/002",
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
              "concepto": "2017/003",
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
              "concepto": "2017/004",
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
              "concepto": "2017/005",
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
              "concepto": "2017/006",
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
              "concepto": "4882435",
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
              "concepto": "2772137",
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
              "concepto": "3237718",
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
              "concepto": "3236520",
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
              "concepto": "3168974",
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
              "concepto": "3166530",
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
              "concepto": "3165936",
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
              "concepto": "3131832",
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
              "concepto": "3121528",
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
              "concepto": "3631333",
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
              "concepto": "3497436",
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
              "concepto": "3908362",
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
              "concepto": "4318612",
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
              "concepto": "4425121",
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
              "concepto": "4461613",
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
              "concepto": "4493376",
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
              "concepto": "4568058",
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
              "concepto": "4765583",
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
              "concepto": "4798583",
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


const getInfoJuiciosContribucion = (cuit) => {
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
        "return": [
          {
            "identificador": "AUT02032/2016",
            "titular": {
              "cuit": "20164095054",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 4249.99,
              "capital": 2474.4,
              "gastos": 1775.59
            },
            "periodos": [
              {
                "concepto": "2012/004",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 291.8,
                  "base": 137.5,
                  "recargo": 154.3,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2012/005",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 287.5,
                  "base": 137.5,
                  "recargo": 150,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2012/006",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 283.4,
                  "base": 137.5,
                  "recargo": 145.9,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2013/001",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 278.8,
                  "base": 137.5,
                  "recargo": 141.3,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2013/002",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 275,
                  "base": 137.5,
                  "recargo": 137.5,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2013/003",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 270.9,
                  "base": 137.5,
                  "recargo": 133.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2013/004",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 266.7,
                  "base": 137.5,
                  "recargo": 129.2,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2013/005",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 262.4,
                  "base": 137.5,
                  "recargo": 124.9,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2013/006",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 257.9,
                  "base": 137.5,
                  "recargo": 120.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 820.3,
                  "base": 820.3,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 955.29,
                  "base": 955.29,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "AUT14560/2017",
            "titular": {
              "cuit": "20164095054",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 3237.79,
              "capital": 1462.2,
              "gastos": 1775.59
            },
            "periodos": [
              {
                "concepto": "2014/001",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 254.1,
                  "base": 137.5,
                  "recargo": 116.6,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2014/002",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 250,
                  "base": 137.5,
                  "recargo": 112.5,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2014/003",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 245.9,
                  "base": 137.5,
                  "recargo": 108.4,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2014/004",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 241.6,
                  "base": 137.5,
                  "recargo": 104.1,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2014/005",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 237.4,
                  "base": 137.5,
                  "recargo": 99.9,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "2014/006",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "CAPITAL",
                "importe": {
                  "total": 233.2,
                  "base": 137.5,
                  "recargo": 95.7,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 820.3,
                  "base": 820.3,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 955.29,
                  "base": 955.29,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          }
        ],
        "error": null,
        "ok": true
      });
    }, 2000);
  });
};

const getInfoJuiciosMulta = (cuit) => {
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
        "return": [
          {
            "identificador": "TF 00350/2018",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 1759.8,
              "capital": 812.5,
              "gastos": 947.3
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 00350/2018",
                "importe": {
                  "total": 812.5,
                  "base": 542,
                  "recargo": 270.5,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 406.2,
                  "base": 406.2,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 541.1,
                  "base": 541.1,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "TF 17103/2016",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 1970.6,
              "capital": 917.9,
              "gastos": 1052.7
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 17103/2016",
                "importe": {
                  "total": 917.9,
                  "base": 534.6,
                  "recargo": 383.3,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 502.5,
                  "base": 502.5,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 550.2,
                  "base": 550.2,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "TF 08950/2018",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 749.5,
              "capital": 307.3,
              "gastos": 442.2
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 08950/2018",
                "importe": {
                  "total": 307.3,
                  "base": 217,
                  "recargo": 90.3,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 153.6,
                  "base": 153.6,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 288.6,
                  "base": 288.6,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "TF 20837/2017",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 757.3,
              "capital": 311.2,
              "gastos": 446.1
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 20837/2017",
                "importe": {
                  "total": 311.2,
                  "base": 217,
                  "recargo": 94.2,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 155.6,
                  "base": 155.6,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 290.5,
                  "base": 290.5,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "TF 28945/2016",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 875.5,
              "capital": 370.3,
              "gastos": 505.2
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 28945/2016",
                "importe": {
                  "total": 370.3,
                  "base": 243,
                  "recargo": 127.3,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 202.7,
                  "base": 202.7,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 302.5,
                  "base": 302.5,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "TF 31691/2017",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 1633,
              "capital": 749.1,
              "gastos": 883.9
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 31691/2017",
                "importe": {
                  "total": 749.1,
                  "base": 549.4,
                  "recargo": 199.7,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 410.1,
                  "base": 410.1,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 473.8,
                  "base": 473.8,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          },
          {
            "identificador": "TF 31673/2017",
            "titular": {
              "cuit": "",
              "titular": "DE UGARTE MANUEL ELOY"
            },
            "deudaJuicio": {
              "total": 641.3,
              "capital": 253.2,
              "gastos": 388.1
            },
            "periodos": [
              {
                "concepto": "MULTA",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "En Juicio Nro. TF 31673/2017",
                "importe": {
                  "total": 253.2,
                  "base": 185.4,
                  "recargo": 67.8,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "HONORAR.",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "HONORARIOS",
                "importe": {
                  "total": 138.6,
                  "base": 138.6,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              },
              {
                "concepto": "GASTOS",
                "fecha": "2018-10-08T00:00:00",
                "referencia": "GASTOS",
                "importe": {
                  "total": 249.5,
                  "base": 249.5,
                  "recargo": 0,
                  "deduccion": 0,
                  "citacion": 0
                }
              }
            ]
          }
        ],
        "error": null,
        "ok": true
      });
    }, 2000);
  });
};


const getDatosCuenta = (cuit) => {
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
          "identificador": "PFE018",
          "titular": {
            "cuit": "27115599971",
            "titular": "ROJAS DIANA BEATRIZ"
          },
          "datosCuenta": [
            "TIPO: AUTOMOVIL              VALOR CUOTA:    385,00        VALUACION:    140.000",
            "MARCA: VOLKSWAGEN       GOL TREND 1.6            MODELO: 2015",
            "ORIGEN:     CNAS:           DNRPA: 13622413",
            "CODIGO DE BANELCO PAGOS: 171333201800    CODIGO DE LINK PAGOS: 0000171333201800",
            "FECHA DE INICIO DE FACTURACION: 09/10/2015",
            "APLICA 10% DESCTO.S/TASA 2018 POR CONTRIB.CUMPLIDOR   $   228,00"
          ],
          "tieneJuicios": false,
          "tienePlanes": false,
          "tieneMultas": false,
          "deudaAdministrativa": {
            "total": 0,
            "vencida": 0,
            "aVencer": 694,
            "ultimoPago": "21/09/2018"
          },
          "periodos": [
            {
              "concepto": "2018/005",
              "fecha": "2018-10-12T00:00:00",
              "referencia": "PERIODO NO VENCIDO",
              "importe": {
                "total": 347,
                "base": 347,
                "recargo": 0,
                "deduccion": 0,
                "citacion": 0
              }
            },
            {
              "concepto": "2018/006",
              "fecha": "2018-12-12T00:00:00",
              "referencia": "PERIODO NO VENCIDO",
              "importe": {
                "total": 347,
                "base": 347,
                "recargo": 0,
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



const services = {
  getIdTributos: getIdTributos,
  getInfoContribucion: getInfoContribucion,
  getInfoMultas: getInfoMultas,
  getInfoJuiciosContribucion: getInfoJuiciosContribucion,
  getInfoJuiciosMulta: getInfoJuiciosMulta,
  getDatosCuenta: getDatosCuenta
}

export default services;