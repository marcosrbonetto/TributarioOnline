import TributarioOnline from "@UI/Paginas/TributarioOnline/index";
import Representantes from "@UI/Paginas/Representantes/index";

const Menu = [
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Tributario Online",
    titulo: "Tributario Online",
    icono: "home"
  },
  {
    url: "/Inicio/Representantes",
    exact: false,
    mostrarEnMenu: true,
    component: Representantes,
    nombre: "Representantes",
    titulo: "Representantes",
    icono: "home"
  },
  {
    url: "/Inicio/Tributo/:tributo",
    exact: false,
    mostrarEnMenu: false,
    component: TributarioOnline,
    nombre: "Tributario Online",
    titulo: "Tributario Online",
    icono: "home"
  }
];

export default Menu;
