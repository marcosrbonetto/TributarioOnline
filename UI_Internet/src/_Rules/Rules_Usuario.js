import _ from "lodash";

import Store from "@Redux/Store/index";
//Este valor se obtiene luego de pasar la prueba del ReCaptcha
const accessCaptcha = Store.getState().CaptchaAccess.accessCaptcha || '-';

const metodos = {
  validarToken: token => {
    const url = window.Config.BASE_URL_WS + "/v1/Usuario/ValidarToken";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          "--ControlAcceso": accessCaptcha,
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": token
        }
      })
        .then(data => data.json())
        .then(data => {
          if (data.ok != true) {
            reject(data.error);
            return;
          }

          if (data.accesoWS)
            resolve(data.return);
          else
            window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
        })
        .catch(error => {
          reject("Error procesando la solicitud");
        });
    });
  },
  datos: token => {
    const url = window.Config.BASE_URL_WS + "/v1/Usuario/Usuario";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          "--ControlAcceso": accessCaptcha,
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": token
        }
      })
        .then(data => data.json())
        .then(data => {
          if (data.ok != true) {
            reject(data.error);
            return;
          }

          if (data.accesoWS)
            resolve(data.return);
          else
            window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess/' + encodeURIComponent(window.location.href);
        })
        .catch(error => {
          reject("Error procesando la solicitud");
        });
    });
  }
};

export default metodos;