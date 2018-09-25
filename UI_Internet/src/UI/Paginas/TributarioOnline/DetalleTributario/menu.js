import DetalleTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Inicio/index";
import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

const Menu = [
  {
    url: "/DetalleTributario",
    exact: true,
    mostrarEnMenu: true,
    component: DetalleTributo,
    nombre: "Detalle del Tributo",
    titulo: "Detalle del Tributo",
    icono: "send"
  },
  {
    url: "/Inicio/Inmuebles",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inmuebles",
    titulo: "Inmuebles",
    icono: "send"
  },
  {
    url: "/Inicio/Comercios",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Comercios",
    titulo: "Comercios",
    icono: "send"
  },
  {
    url: "/Inicio/Cementerios",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Cementerios",
    titulo: "Cementerios",
    icono: "send"
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Declaraciones Juradas - Comercio",
    titulo: "Declaraciones Juradas - Comercio",
    icono: "send"
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Ferias y Mercados",
    titulo: "Ferias y Mercados",
    icono: "send"
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Aranceles Taxis y Remises",
    titulo: "Aranceles Taxis y Remises",
    icono: "send"
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Agentes de percepción y retención",
    titulo: "Agentes de percepción y retención",
    icono: "send"
  },
  {
    url: "/Inicio/Tributos",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Contribución por mejoras",
    titulo: "Contribución por mejoras",
    icono: "send"
  }
];

export default Menu;