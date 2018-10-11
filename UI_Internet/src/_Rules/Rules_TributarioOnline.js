const getDatosUsuario = (token, callback) => {
  return new Promise((resolve, reject) => {
    
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Usuario/Usuario', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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

const getIdTributos = (token, callback) => {
  return new Promise((resolve, reject) => {

    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Tributario/MisBienes', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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


const getInfoContribucion = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Automotor/Tributos?identificador='+identificador, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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



const getInfoMultas = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Automotor/Multas?identificador='+identificador, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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


const getInfoJuiciosContribucion = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Automotor/JuiciosTributos?identificador='+identificador, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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

const getInfoJuiciosMulta = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Automotor/JuiciosMultas?identificador='+identificador, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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

const getInfoPlanesPago = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Automotor/PlanesTributos?identificador='+identificador, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
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

const getCedulon = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch('https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge/v1/Tributario/Cedulon', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify({
        "tipoBien": body.tipoBien,
        "identificador": body.identificador,
        "opcionVencimiento": body.opcionVencimiento,
        "periodos": body.periodos
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
  getDatosUsuario: getDatosUsuario,
  getIdTributos: getIdTributos,
  getInfoContribucion: getInfoContribucion,
  getInfoMultas: getInfoMultas,
  getInfoJuiciosContribucion: getInfoJuiciosContribucion,
  getInfoJuiciosMulta: getInfoJuiciosMulta,
  getInfoPlanesPago: getInfoPlanesPago,
  getCedulon: getCedulon,
}

export default services;