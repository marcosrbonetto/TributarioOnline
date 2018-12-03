import DetalleTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Detalle/index";
import SeleccionTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Seleccion/index";
import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

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
    nombre: "Inicio",
    titulo: "Inicio",
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
    url: "https://sistemas2.cordoba.local/tasas/",
    exact: true,
    mostrarEnMenu: true,
    externalLink: true,
    nombre: "Tasas Administrativas",
  },
  {
    url: "/Inicio",
    exact: false,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Volver",
    titulo: "Volver",
  }
];

export default Menu;