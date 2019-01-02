import TributarioOnline from "@UI/Paginas/TributarioOnline/index";
import Representantes from "@UI/Paginas/Representantes/index";

import HomeUsuario from "@UI/Paginas/TributarioOnline/HomeUsuario/index";
import HomeInvitado from "@UI/Paginas/TributarioOnline/HomeInvitado/index";

import SeleccionTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Seleccion/index";

import BusquedaPorJuicio from "@UI/Paginas/TributarioOnline/BusquedaPor/Juicio";
import BusquedaPorPlan from "@UI/Paginas/TributarioOnline/BusquedaPor/Plan";

const Menu = [
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Autogestion Tributaria",
    titulo: "Autogestion Tributaria",
  },
  {
    url: "/Inicio/HomeUsuario",
    exact: false,
    mostrarEnMenu: false,
    mostrarUserInvitado: false,
    component: HomeUsuario,
    nombre: "Autogestion Tributaria",
    titulo: "Autogestion Tributaria",
  },
  {
    url: "/Inicio/HomeInvitado/:tributo",
    exact: false,
    mostrarEnMenu: false,
    component: HomeInvitado,
    nombre: "Autogestion Tributaria",
    titulo: "Autogestion Tributaria",
  },
  {
    url: "/Inicio/HomeInvitado",
    exact: false,
    mostrarEnMenu: false,
    component: HomeInvitado,
    nombre: "Autogestion Tributaria",
    titulo: "Autogestion Tributaria",
  },
  {
    url: "/Inicio/Tributo/:tributo",
    exact: false,
    mostrarEnMenu: false,
    mostrarUserInvitado: false,
    component: TributarioOnline,
    nombre: "Autogestion Tributaria",
    titulo: "Autogestion Tributaria",
  },
  {
    url: "/DetalleTributario/:tributo",
    exact: true,
    mostrarEnMenu: false,
    component: SeleccionTributo,
    nombre: "Autogestion Tributaria",
    titulo: "Autogestion Tributaria",
  },
  {
    url: "/DetalleTributario/Automotor",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/DetalleTributario/Inmueble",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inmuebles",
    titulo: "Inmuebles",
  },
  {
    url: "/DetalleTributario/Comercio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Comercio e Industria",
    titulo: "Comercio e Industria",
  },
  {
    url: "/DetalleTributario/Cementerio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Cementerios",
    titulo: "Cementerios",
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
    url: "/Inicio/BusquedaPor/Juicio",
    exact: true,
    mostrarEnMenu: true,
    component: BusquedaPorJuicio,
    nombre: "Gestión por Juicio",
    titulo: "Gestión por Juicio",
  },
  {
    url: "/Inicio/BusquedaPor/Plan",
    exact: true,
    mostrarEnMenu: true,
    component: BusquedaPorPlan,
    nombre: "Gestión por Plan",
    titulo: "Gestión por Plan",
  },
  {
    url: "/Inicio/Representantes/:tributo",
    exact: false,
    mostrarEnMenu: false,
    mostrarUserInvitado: false,
    component: Representantes,
    nombre: "Representantes",
    titulo: "Representantes",
  },
  {
    url: "/Inicio/Representantes",
    exact: false,
    mostrarEnMenu: true,
    mostrarUserInvitado: false,
    component: Representantes,
    nombre: "Representantes",
    titulo: "Representantes",
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
