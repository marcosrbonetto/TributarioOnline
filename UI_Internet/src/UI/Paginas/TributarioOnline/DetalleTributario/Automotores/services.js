const getConceptosTributo = (cuit,callback) => {
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
            "return": [
              {
                "periodo": "2017/002",
                "concepto": "2017-04-10T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 465.1,
                  "base": 303,
                  "recargo": 162.1,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2017/003",
                "concepto": "2017-06-12T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 446,
                  "base": 303,
                  "recargo": 143,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2017/004",
                "concepto": "2017-08-10T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 428.1,
                  "base": 303,
                  "recargo": 125.1,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2017/005",
                "concepto": "2017-10-10T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 409.7,
                  "base": 303,
                  "recargo": 106.7,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2017/006",
                "concepto": "2017-12-11T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 390.9,
                  "base": 303,
                  "recargo": 87.9,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2018/001",
                "concepto": "2018-02-15T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 370.9,
                  "base": 303,
                  "recargo": 67.9,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2018/002",
                "concepto": "2018-04-12T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 353.9,
                  "base": 303,
                  "recargo": 50.9,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2018/003",
                "concepto": "2018-06-13T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 335.1,
                  "base": 303,
                  "recargo": 32.1,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2018/004",
                "concepto": "2018-08-14T00:00:00",
                "referencia": "",
                "importe": {
                  "total": 316.3,
                  "base": 303,
                  "recargo": 13.3,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2018/005",
                "concepto": "2018-10-12T00:00:00",
                "referencia": "PERIODO NO VENCIDO",
                "importe": {
                  "total": 303,
                  "base": 303,
                  "recargo": 0,
                  "deduccion": 0
                }
              },
              {
                "periodo": "2018/006",
                "concepto": "2018-12-12T00:00:00",
                "referencia": "PERIODO NO VENCIDO",
                "importe": {
                  "total": 303,
                  "base": 303,
                  "recargo": 0,
                  "deduccion": 0
                }
              }
            ],
            "error": null,
            "ok": true
          });
      }, 2000);
    
};

const services = {
    getConceptosTributo: getConceptosTributo
}

export default services;