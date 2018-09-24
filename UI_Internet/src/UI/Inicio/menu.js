import Home from "./Home/index";
import TestComponentes from "./TestComponentes/index";

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
  }
];

export default Menu;
