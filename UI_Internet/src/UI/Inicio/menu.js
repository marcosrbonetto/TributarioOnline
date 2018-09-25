import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

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
    url: "/Inicio/:tributo",
    exact: false,
    mostrarEnMenu: false,
    component: TributarioOnline,
    nombre: "Tributario Online",
    titulo: "Tributario Online",
    icono: "home"
  }
];

export default Menu;
