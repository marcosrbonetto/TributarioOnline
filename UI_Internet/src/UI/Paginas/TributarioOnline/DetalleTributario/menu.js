import Automotores from "@UI/Paginas/TributarioOnline/DetalleTributario/Automotores/index";
import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

const Menu = [
  {
    url: "/DetalleTributario/:identificador",
    exact: true,
    mostrarEnMenu: true,
    component: Automotores,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/Inicio/Inmuebles",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inmuebles",
    titulo: "Inmuebles",
  },
  {
    url: "/Inicio/Comercios",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Comercios e Industria",
    titulo: "Comercios e Industria",
  },
  {
    url: "/Inicio/Cementerios",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Cementerios",
    titulo: "Cementerios",
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Ferias y Mercados",
    titulo: "Ferias y Mercados",
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Aranceles Taxis y Remises",
    titulo: "Aranceles Taxis y Remises",
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Agentes de percepción y retención",
    titulo: "Agentes de percepción y retención",
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Contribución por mejoras",
    titulo: "Contribución por mejoras",
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Planes de Vivienda",
    titulo: "Planes de Vivienda",
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Consulta por número de nexo",
    titulo: "Consulta por número de nexo",
  },
  {
    url: "/MisRepresentantes",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Mis Representantes",
    titulo: "Mis Representantes",
  }
];

export default Menu;