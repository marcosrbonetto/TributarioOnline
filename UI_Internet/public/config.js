const DEPLOY = 1;
const TEST = 2;
const LOCAL = 3;
const ENTORNO = DEPLOY;

//WS Tributario
const URL_WS_TRIBUTARIO_LOCAL = "https://srv-dev04/WSAutogestionTributaria_Bridge";
const URL_WS_TRIBUTARIO_TEST = "https://srv-dev04/WSAutogestionTributaria_Bridge";
const URL_WS_TRIBUTARIO_DEPLOY = "https://servicios2.cordoba.gov.ar/WSAutogestionTributaria_Bridge";
let URL_WS_TRIBUTARIO = URL_WS_TRIBUTARIO_DEPLOY;

//Url Login
const URL_LOGIN_LOCAL = "https://servicios2.cordoba.gov.ar/VecinoVirtual/Login/#/Login/AutogestionTributariaLocal";
const URL_LOGIN_TEST = "https://servicios2.cordoba.gov.ar/VecinoVirtual/Login/#/Login/AutogestionTributariaTest";
const URL_LOGIN_DEPLOY = "https://servicios2.cordoba.gov.ar/VecinoVirtual/Login/#/Login/AutogestionTributaria";
let URL_LOGIN = URL_LOGIN_DEPLOY;

//Url AFIP
const BASE_URL_SET_AFIP_LOCAL = "http://localhost:3000/#";
const BASE_URL_SET_AFIP_TEST = "https://srv-dev04/AutogestionTributaria/#";
const BASE_URL_SET_AFIP_DEPLOY = "https://servicios2.cordoba.gov.ar/AutogestionTributaria/#";

//Segun el entorno, cargo las variables
switch (ENTORNO) {
  case DEPLOY:
    {
      URL_WS_TRIBUTARIO = URL_WS_TRIBUTARIO_DEPLOY;
      URL_LOGIN = URL_LOGIN_DEPLOY;
      BASE_URL_SET_AFIP = BASE_URL_SET_AFIP_DEPLOY;
    }
    break;

  case TEST:
    {
      URL_WS_TRIBUTARIO = URL_WS_TRIBUTARIO_TEST;
      URL_LOGIN = URL_LOGIN_TEST;
      BASE_URL_SET_AFIP = BASE_URL_SET_AFIP_TEST;
    }
    break;

  case LOCAL:
    {
      URL_WS_TRIBUTARIO = URL_WS_TRIBUTARIO_LOCAL;
      URL_LOGIN = URL_LOGIN_LOCAL;
      BASE_URL_SET_AFIP = BASE_URL_SET_AFIP_LOCAL;
    }
    break;
}

var Config = {
  BASE_URL: "/AutogestionTributaria",
  BASE_URL_WS: URL_WS_TRIBUTARIO,
  VV_URL_WS: "https://servicios2.cordoba.gov.ar/WSVecinoVirtual_Bridge",
  BASE_URL_AFIP: "https://servicios.cordoba.gov.ar/AutogestionTributaria",
  BASE_URL_SET_AFIP: BASE_URL_SET_AFIP,
  WS_CORDOBA_GEO: "https://servicios2.cordoba.gov.ar/CordobaGeoApi",
  URL_LOGIN: URL_LOGIN,
  URL_CORDOBA_FILES: "https://servicios2.cordoba.gov.ar/CordobaFiles",
  IDENTIFICADOR_FOTO_DEFAULT_MALE:
    "f_qdag0f9irgka9xj2l6mbll69gxmhlghezkmkj2mykg1pj0uuhwogqiqfic_c327l9gmyk9tutz1fuq0rc3_z2byq5gcg2j5tjpqcn6jid4x2rlv2nsaa2it7s64d7m2k4h7e_xegt2w8p79uvk4jj42a7uvrcfm1cn8jpq31o4raxvsv8ktwtsa_q6iqbxeop56c_zee",
  IDENTIFICADOR_FOTO_DEFAULT_FEMALE:
    "f_zq38nzky73iwxm6fz4m812vx68ggr28xgokqfwx7zf9ws7rd6_s7mn985gcqtehf6vpicq_chqiv3_e9rdlsjal4pmw_uhnu9318riap_p07eoe5cd_q4z65kw304ataczwaihsic6t4lo0bh18qi81k86x6qlv_7z5q2ew6w1n8gbu772sdcd3e8mcnuw31ku8wtkkd",
  URL_MI_PERFIL: "https://servicios2.cordoba.gov.ar/VecinoVirtual/Utils/MiPerfil",
  TOKEN_INVITADO: 'INVITADO',
  EMAIL_SOPORTE: 'soporte@cordoba.gov.ar'
};

module.exports = Config;