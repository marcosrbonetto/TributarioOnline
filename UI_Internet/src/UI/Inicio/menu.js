import TributarioOnline from "@UI/Paginas/TributarioOnline/index";
import Representantes from "@UI/Paginas/Representantes/index";

import HomeUsuario from "@UI/Paginas/TributarioOnline/HomeUsuario/index";
import HomeInvitado from "@UI/Paginas/TributarioOnline/HomeInvitado/index";

import BusquedaPor from "@UI/Paginas/TributarioOnline/BusquedaPor/index";

const Menu = [
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Tributos",
    titulo: "Tributos",
    icono: "home"
  },
  {
    url: "/Inicio/HomeUsuario",
    exact: false,
    mostrarEnMenu: false,
    mostrarUserInvitado: false,
    component: HomeUsuario,
    nombre: "Tributos",
    titulo: "Tributos",
    icono: "home"
  },
  {
    url: "/Inicio/HomeInvitado/:tributo",
    exact: false,
    mostrarEnMenu: false,
    component: HomeInvitado,
    nombre: "Tributos",
    titulo: "Tributos",
    icono: "home"
  },
  {
    url: "/Inicio/HomeInvitado",
    exact: false,
    mostrarEnMenu: false,
    component: HomeInvitado,
    nombre: "Tributos",
    titulo: "Tributos",
    icono: "home"
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
    icono: "home"
  },
  {
    url: "/Inicio/Representantes",
    exact: false,
    mostrarEnMenu: true,
    mostrarUserInvitado: false,
    component: Representantes,
    nombre: "Representantes",
    titulo: "Representantes",
    icono: "home"
  },
  {
    url: "/Inicio/Tributo/:tributo",
    exact: false,
    mostrarEnMenu: false,
    mostrarUserInvitado: false,
    component: TributarioOnline,
    nombre: "Tributos",
    titulo: "Tributos",
    icono: "home"
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
