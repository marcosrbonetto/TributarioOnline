import _ from "lodash";

let baseURL =
  "https://servicios2.cordoba.gov.ar/WSVecinoVirtual_Bridge/v1/Aplicacion";
baseURL = "http://localhost:7294/v1/Aplicacion";

const metodos = {
  getInfoLogin: codigo => {
    let url = baseURL + "/InfoLogin";

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigo: codigo
        })
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
