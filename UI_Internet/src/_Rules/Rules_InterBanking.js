import Store from "@Redux/Store/index";

const generacionCTLInterBanking = (token, body) => {
  
  //Este valor se obtiene luego de pasar la prueba del ReCaptcha
  const accessCaptcha = Store.getState().CaptchaAccess.accessCaptcha || '-';

  return new Promise((resolve, reject) => {
    fetch(window.Config.BASE_URL_WS + '/v1/Interbanking/Pagar', {
      method: "POST",
      headers: {
        "--ControlAcceso": accessCaptcha,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Token": token
      },
      body: JSON.stringify({
        "tipoTributo": body.tipoTributo,
        "identificador": body.identificador,
        "opcionVencimiento": body.opcionVencimiento,
        "periodos": body.periodos,
        "esPagoElectronico": body.esPagoElectronico,
        "esCuotaGlobal": body.esCuotaGlobal
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
        else {
          if (window.location.hash.substring(1).indexOf('CaptchaAccess') == -1) window.location.href = window.location.origin + window.location.pathname + '#/CaptchaAccess?redirect=' + encodeURIComponent(window.location.hash.substring(1));
        }
      })
      .catch(err => {
        reject("Error procesando la solicitud");
      });
  });
};

const services = {
  generacionCTLInterBanking: generacionCTLInterBanking
}

export default services;