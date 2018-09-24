import _ from "lodash";

let baseURL =
  "https://servicios2.cordoba.gov.ar/WSVecinoVirtual_Bridge/v1/Usuario";
baseURL = "http://localhost:7294/v1/EstadoCivil";

const metodos = {
  get: () => {
    let url = baseURL;

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
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
