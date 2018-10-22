let deploy = false;

var Config = {
  BASE_URL: "/TributarioOnline",
  BASE_URL_WS: deploy ? "https://servicios2.cordoba.gov.ar/WSTributarioOnline_Bridge" : "https://srv-dev04/WSTributarioOnline"
};

module.export = Config; 
