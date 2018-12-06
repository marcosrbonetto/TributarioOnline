import DetalleTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Detalle/index";
import SeleccionTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Seleccion/index";
import TributarioOnline from "@UI/Paginas/TributarioOnline/index";
import Representantes from "@UI/Paginas/Representantes/index";
import BusquedaPor from "@UI/Paginas/TributarioOnline/BusquedaPor/index";

const Menu = [
  {
    url: "/DetalleTributario/:tributo",
    exact: true,
    mostrarEnMenu: false,
    component: SeleccionTributo,
    nombre: "Tributos",
    titulo: "Tributos",
  },
  {
    url: "/DetalleTributario/:tributo/:identificador/:tipoOperacion/:identificadorOperacion",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotor",
    titulo: "Automotor",
  },
  {
    url: "/DetalleTributario/:tributo/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotor",
    titulo: "Automotor",
  },
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Tributos",
    titulo: "Tributos",
  },
  {
    url: "/DetalleTributario/Automotor",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Automotor",
    titulo: "Automotor",
  },
  {
    url: "/DetalleTributario/Inmueble",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inmueble",
    titulo: "Inmueble",
  },
  {
    url: "/DetalleTributario/Comercio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Comercios e Industria",
    titulo: "Comercios e Industria",
  },
  {
    url: "/DetalleTributario/Cementerio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Cementerio",
    titulo: "Cementerio",
  },
  {
    url: "/DetalleTributario/FeriaMercado",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Ferias y Mercados",
    titulo: "Ferias y Mercados",
  },
  {
    url: "/DetalleTributario/TaxiRemis",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Taxis y Remises",
    titulo: "Taxis y Remises",
  },
  {
    url: "/DetalleTributario/AgentePercepcionRetencion",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Agente de Percepción y Retención",
    titulo: "Agente de Percepción y Retención",
  },
  {
    url: "/DetalleTributario/ContribucionMejoras",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Contribución por Mejoras",
    titulo: "Contribución por Mejoras",
  },
  {
    url: "/DetalleTributario/PlanesDeVivienda",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Planes De Vivienda",
    titulo: "Planes De Vivienda",
  },
  {
    url: "/Inicio/BusquedaPor",
    exact: true,
    mostrarEnMenu: true,
    component: BusquedaPor,
    nombre: "Gestión por Identificador",
    titulo: "Gestión por Identificador",
    icono: "home"
  },
  {
    url: "/Inicio/Representantes/:tributo",
    exact: false,
    mostrarEnMenu: false,
    mostrarUserInvitado: false,
    component: Representantes,
    nombre: "Representantes",
    titulo: "Representantes",
  },
  {
    url: "/Inicio/Representantes",
    exact: false,
    mostrarEnMenu: true,
    mostrarUserInvitado: false,
    component: Representantes,
    nombre: "Representantes",
    titulo: "Representantes",
  },
  {
    url: "https://sistemas2.cordoba.local/tasas/",
    exact: true,
    mostrarEnMenu: true,
    externalLink: true,
    nombre: "Tasas Administrativas",
  }
];

export default Menu;