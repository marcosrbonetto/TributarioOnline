const pagoMercadoPago = (token, body) => {

    return new Promise((resolve, reject) => {
      fetch(window.Config.BASE_URL_WS + '/v1/MercadoPago/Pagar', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Token": token
        },
        body: JSON.stringify({
          "nexo": body.nexo,
          "tipoTributo": body.tipoTributo,
          "identificador": body.identificador,
          "token": body.token,
          "metodoPago": body.metodoPago,
          "emisor": body.emisor,
          "cuotas": body.cuotas,
          "tipoCedulon": 1 //Contribucion
        })
      })
        .then(res => {
  
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
  
          return res.json();
        })
        .then(datos => {
          resolve(datos);
        })
        .catch(err => {
          reject("Error procesando la solicitud");
        });
    });
  };

const services = {
    pagoMercadoPago: pagoMercadoPago
}

export default services;