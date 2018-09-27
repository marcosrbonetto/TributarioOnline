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
    nombre: "Comercios",
    titulo: "Comercios",
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
    nombre: "Declaraciones Juradas - Comercio",
    titulo: "Declaraciones Juradas - Comercio",
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
  }
];

export default Menu;