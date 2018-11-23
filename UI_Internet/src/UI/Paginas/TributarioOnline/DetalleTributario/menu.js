import DetalleTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Detalle/index";
import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

const Menu = [
  {
    url: "/DetalleTributario/:tributo/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/Inicio/Tributo/Automotores",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/Inicio/Tributo/Inmuebles",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inmuebles",
    titulo: "Inmuebles",
  },
  {
    url: "/Inicio/Tributo/Comercios",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Comercios e Industria",
    titulo: "Comercios e Industria",
  },
  {
    url: "/Inicio/Tributo/Cementerios",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Cementerios",
    titulo: "Cementerios",
  },
  {
    url: "/Inicio/Tributo/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Ferias y Mercados",
    titulo: "Ferias y Mercados",
  },
  {
    url: "/Inicio/Tributo/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Aranceles Taxis y Remises",
    titulo: "Aranceles Taxis y Remises",
  },
  {
    url: "/Inicio/Tributo/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Agentes de percepción y retención",
    titulo: "Agentes de percepción y retención",
  },
  {
    url: "/Inicio/Tributo/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Contribución por mejoras",
    titulo: "Contribución por mejoras",
  },
  {
    url: "/Inicio/Tributo/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Planes de Vivienda",
    titulo: "Planes de Vivienda",
  },
  {
    url: "/Inicio/Tributo/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Consulta por número de nexo",
    titulo: "Consulta por número de nexo",
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