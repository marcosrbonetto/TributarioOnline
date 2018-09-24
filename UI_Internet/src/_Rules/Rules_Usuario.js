import _ from "lodash";
const KEY_INFO_PUBLICA = "UIYAUISYNQNNWSDSS";

const metodos = {
  getInfoPublica: username => {
    let url = window.Config.BASE_URL_WS + "/v1/Usuario/InfoPublica";

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          key: KEY_INFO_PUBLICA
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
  },
  acceder: (username, password) => {
    let url = window.Config.BASE_URL_WS + "/v1/Usuario/IniciarSesion";

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
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
  },
  generarCuil: comando => {
    const url =
      window.Config.BASE_URL_WS +
      "/v1/Usuario/GenerarCuil?dni=" +
      comando.dni +
      "&sexoMasculino=" +
      comando.sexoMasculino;

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
  },
  validarRenaper: comando => {
    const url = window.Config.BASE_URL_WS + "/v1/Usuario/ValidarRenaper";

    console.log(comando);

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comando)
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
  validarUsername: username => {
    const url =
      window.Config.BASE_URL_WS +
      "/v1/Usuario/ExisteUsername?username=" +
      username;

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
  },
  //Usuario activado
  validarUsuarioActivado: (username, password) => {
    let url =
      window.Config.BASE_URL_WS + "/v1/Usuario/ActivacionCuenta/Validar";

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
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
  },
  iniciarActivacion: comando => {
    const url =
      window.Config.BASE_URL_WS + "/v1/Usuario/ActivacionCuenta/Iniciar";
    comando.urlServidor =
      window.location.origin +
      window.Config.BASE_URL +
      "/ProcesarActivacionUsuario";

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comando)
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
  procesarActivacionUsuario: codigo => {
    const url =
      window.Config.BASE_URL_WS +
      "/v2/Usuario/ActivacionCuenta/Procesar?codigo=" +
      codigo;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
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
  },
  //Recuperacion cuenta
  iniciarRecuperarPassword: comando => {
    return new Promise((resolve, reject) => {
      const url =
        window.Config.BASE_URL_WS + "/v1/Usuario/RecuperacionCuenta/Iniciar";
      comando.urlServidor =
        window.location.origin +
        window.Config.BASE_URL +
        "/ProcesarRecuperarPassword";

      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comando)
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
  procesarRecuperarPassword: comando => {
    return new Promise((resolve, reject) => {
      const url =
        window.Config.BASE_URL_WS + "/v1/Usuario/RecuperacionCuenta/Procesar";

      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comando)
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
  getRecuperacionCuenta: codigo => {
    const url =
      window.Config.BASE_URL_WS +
      "/v1/Usuario/RecuperacionCuenta/Datos?codigo=" +
      codigo;

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
  },
  //Usuario reciente
  guardarUsuarioReciente: infoGlobal => {
    infoGlobal.fecha = new Date();

    let usuarios = metodos.getUsuariosRecientes();

    usuarios = _.filter(usuarios, user => {
      return user.username !== infoGlobal.username;
    });
    usuarios.unshift(infoGlobal);
    usuarios.slice(0, 5);
    localStorage.setItem("usuariosRecientes", JSON.stringify(usuarios));
  },
  getUsuariosRecientes: () => {
    let usuarios = localStorage.getItem("usuariosRecientes");
    if (usuarios === undefined || usuarios === "undefined") {
      usuarios = [];
    } else {
      usuarios = JSON.parse(usuarios);
    }

    return usuarios;
  },
  borrarUsuarioReciente: username => {
    let usuarios = localStorage.getItem("usuariosRecientes");
    if (usuarios === undefined || usuarios === "undefined") {
      usuarios = [];
    } else {
      usuarios = JSON.parse(usuarios);
    }

    usuarios = _.filter(usuarios, item => {
      return item.username !== username;
    });
    localStorage.setItem("usuariosRecientes", JSON.stringify(usuarios));
  }
};

export default metodos;
