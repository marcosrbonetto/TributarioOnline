import Home from "./Home/index";
import TestComponentes from "./TestComponentes/index";
import TributarioOnline from "./TributarioOnline/index";
import TributarioDetalle from "./TributarioDetalle/index";

const Menu = [
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: Home,
    nombre: "Servicios",
    titulo: "Servicios disponibles",
    icono: "home"
  },
  {
    url: "/Inicio/TestComponentes",
    exact: false,
    mostrarEnMenu: true,
    component: TestComponentes,
    nombre: "Test Componentes",
    titulo: "Test de Componentes",
    icono: "home"
  },
  {
    url: "/Inicio/TributarioOnline",
    exact: false,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Tributario Online",
    titulo: "Tributario Online",
    icono: "home"
  },
  {
    url: "/Inicio/TributarioDetalle",
    exact: false,
    mostrarEnMenu: true,
    component: TributarioDetalle,
    nombre: "Detalle de Tributo",
    titulo: "Detalle de Tributo",
    icono: "home"
  }
];

export default Menu;
