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
        "email": body.email,
        "tipoCedulon": body.tipoCedulon
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

const getPublicKeyMercadoPago = () => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/MercadoPago/PublicKey', {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json"
      }
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
  pagoMercadoPago: pagoMercadoPago,
  getPublicKeyMercadoPago: getPublicKeyMercadoPago
}

export default services;