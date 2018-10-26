const getDatosUsuario = (token, callback) => {
  return new Promise((resolve, reject) => {
    
    fetch(window.Config.BASE_URL_WS + '/v1/Usuario/Usuario', {
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

const getTributosByCUIT = (token, identificador) => {
  return new Promise((resolve, reject) => {

    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/SusTributos?cuil='+identificador, {
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

    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Tributos', {
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
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Contribuciones?tipoTributo=1&identificador='+identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Multas?tipoTributo=1&identificador='+identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/JuiciosContribuciones?tipoTributo=1&identificador='+identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/JuiciosMultas?tipoTributo=1&identificador='+identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/PlanesContribuciones?tipoTributo=1&identificador='+identificador, {
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

const getReporteCedulon = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Reporte/CedulonContribucion', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify({
        "tipoTributo": body.tipoTributo,
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

const getInformeCuenta = (token, param) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/InformeCuenta?tipoTributo='+param.tipoTributo+'&identificador='+param.identificador, {
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

const getReporteInformeCuenta = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Reporte/InformeCuenta', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify({
        "tipoTributo": body.tipoTributo,
        "identificador": body.identificador
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

const getUltimosPagos = (token, param) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Recaudacion/UltimosPagos?tipoTributo='+param.tipoTributo+'&identificador='+param.identificador, {
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

const getInformeAntecedentes = (token, param) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/TribunalFalta/InformeAntecedente?tipoTributo='+param.tipoTributo+'&identificador='+param.identificador, {
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

const getInformeREMAT = (token, param) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/TribunalFalta/InformeRemat?tipoTributo='+param.tipoTributo+'&identificador='+param.identificador, {
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

const services = {
  getDatosUsuario: getDatosUsuario,
  getTributosByCUIT: getTributosByCUIT,
  getIdTributos: getIdTributos,
  getInfoContribucion: getInfoContribucion,
  getInfoMultas: getInfoMultas,
  getInfoJuiciosContribucion: getInfoJuiciosContribucion,
  getInfoJuiciosMulta: getInfoJuiciosMulta,
  getInfoPlanesPago: getInfoPlanesPago,
  getReporteCedulon: getReporteCedulon,
  getInformeCuenta: getInformeCuenta,
  getReporteInformeCuenta: getReporteInformeCuenta,
  getUltimosPagos: getUltimosPagos,
  getInformeAntecedentes: getInformeAntecedentes,
  getInformeREMAT: getInformeREMAT,
}

export default services;