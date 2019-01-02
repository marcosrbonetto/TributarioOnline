import _ from "lodash";

const metodos = {
  validarToken: token => {
    const url = window.Config.BASE_URL_WS + "/v1/Usuario/ValidarToken";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json", "--ControlAcceso": 11,
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

          resolve(data.return);
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
          Accept: "application/json", "--ControlAcceso": 11,
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

          resolve(data.return);
        })
        .catch(error => {
          reject("Error procesando la solicitud");
        });
    });
  }
};

export default metodos;