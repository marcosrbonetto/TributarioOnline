import Store from "@Redux/Store/index";
//Este valor se obtiene luego de pasar la prueba del ReCaptcha
const accessCaptcha = Store.getState().CaptchaAccess.accessCaptcha || '-';

const pagoMercadoPago = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/MercadoPago/Pagar', {
      method: "POST",
      headers: {
        "--ControlAcceso": accessCaptcha,
        "Accept": "application/json",
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
        if (datos.accesoWS)
          resolve(datos);
        else
          window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
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
        "--ControlAcceso": accessCaptcha,
        "Accept": "application/json",
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
        if (datos.accesoWS)
          resolve(datos);
        else
          window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
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