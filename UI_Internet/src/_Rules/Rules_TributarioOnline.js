import Store from "@Redux/Store/index";

const getTipoTributos = (token, callback) => {
  return new Promise((resolve, reject) => {

    fetch(window.Config.BASE_URL_WS + '/v1/KeyValue/TipoTributo', {
      method: "GET",
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

const getTipoCedulones = (token, callback) => {
  return new Promise((resolve, reject) => {

    fetch(window.Config.BASE_URL_WS + '/v1/KeyValue/TipoCedulon', {
      method: "GET",
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

const getEstadoPagos = (token, callback) => {
  return new Promise((resolve, reject) => {

    fetch(window.Config.BASE_URL_WS + '/v1/KeyValue/EstadoPago', {
      method: "GET",
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

    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/SusTributos?cuil=' + identificador, {
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


const getInfoContribucion = (token, tipoTributo, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Contribuciones?tipoTributo='+tipoTributo+'&identificador=' + identificador, {
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



const getInfoMultas = (token, tipoTributo, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Multas?tipoTributo='+tipoTributo+'&identificador=' + identificador, {
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


const getInfoJuicios = (token, tipoTributo, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Juicios?tipoTributo='+tipoTributo+'&identificador=' + identificador, {
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

const getInfoPlanes = (token, tipoTributo, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Planes?tipoTributo='+tipoTributo+'&identificador=' + identificador, {
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

const getInfoDetalleJuicio = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/DetalleJuicio?identificador=' + identificador, {
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

const getInfoDetallePlan = (token, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/DetallePlan?identificador=' + identificador, {
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
  let bodyParameter = {
    "tipoTributo": body.tipoTributo,
    "identificador": body.identificador,
    "opcionVencimiento": body.opcionVencimiento,
  };

  var tipoCedulones = Store.getState().MainContent.tipoCedulones.byKey;

  let url = '/v1/Cedulon/Contribuciones';
  switch (body.tipoCedulon) {
    case tipoCedulones[1]:
      url = '/v1/Cedulon/Contribuciones';
      bodyParameter.periodos= body.periodos;
      break;

    case tipoCedulones[2]:
      url = '/v1/Cedulon/Multas';
      bodyParameter.periodos= body.periodos;
      break;

    case tipoCedulones[3]:
      url = '/v1/Cedulon/Juicios';
      break;

    case tipoCedulones[4]:
      url = '/v1/Cedulon/Planes';
      bodyParameter.periodos= body.periodos;
      break;
  }

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + url, {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify(bodyParameter)
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
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/InformeCuenta?tipoTributo=' + param.tipoTributo + '&identificador=' + param.identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/Recaudacion/UltimosPagos?tipoTributo=' + param.tipoTributo + '&identificador=' + param.identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/TribunalFalta/InformeAntecedente?tipoTributo=' + param.tipoTributo + '&identificador=' + param.identificador, {
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
    fetch(window.Config.BASE_URL_WS + '/v1/TribunalFalta/InformeRemat?tipoTributo=' + param.tipoTributo + '&identificador=' + param.identificador, {
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

const getReporteInformeREMAT = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Reporte/InformeRemat', {
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

const getReporteInformeAntecedentes = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Reporte/InformeAntecedente', {
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

const getPeriodosAdeudados = (token, tipoTributo, identificador) => {
  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/ContribucionesConPeriodosAdeudados?tipoTributo='+tipoTributo+'&identificador=' + identificador, {
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

const getDeclaracionJurada = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/DeclaracionJurada/ObtenerDdjj', {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify({
        "cuit": body.cuit
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

const getImprecionDeclaracionJurada = (token, body) => {

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/DeclaracionJurada/ImprimirDdjj', {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify(body)
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

const getTributoByIdentificador = (token, tipoTributo, identificador) => {
  const queryString = '?tipoTributo='+tipoTributo+'&identificador=' + identificador;

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Tributario/Tributo' + queryString, {
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
  getTipoTributos: getTipoTributos,
  getTipoCedulones: getTipoCedulones,
  getEstadoPagos: getEstadoPagos,
  getDatosUsuario: getDatosUsuario,
  getTributosByCUIT: getTributosByCUIT,
  getIdTributos: getIdTributos,
  getInfoContribucion: getInfoContribucion,
  getInfoMultas: getInfoMultas,
  getInfoJuicios: getInfoJuicios,
  getInfoPlanes: getInfoPlanes,
  getInfoDetalleJuicio: getInfoDetalleJuicio,
  getInfoDetallePlan: getInfoDetallePlan,
  getReporteCedulon: getReporteCedulon,
  getInformeCuenta: getInformeCuenta,
  getReporteInformeCuenta: getReporteInformeCuenta,
  getUltimosPagos: getUltimosPagos,
  getInformeAntecedentes: getInformeAntecedentes,
  getInformeREMAT: getInformeREMAT,
  getReporteInformeREMAT: getReporteInformeREMAT,
  getReporteInformeAntecedentes: getReporteInformeAntecedentes,
  getPeriodosAdeudados: getPeriodosAdeudados,
  getDeclaracionJurada: getDeclaracionJurada,
  getImprecionDeclaracionJurada: getImprecionDeclaracionJurada,
  getTributoByIdentificador: getTributoByIdentificador
}

export default services;