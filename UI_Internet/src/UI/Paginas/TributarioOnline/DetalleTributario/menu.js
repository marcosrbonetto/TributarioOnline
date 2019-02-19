import DetalleTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Detalle/index";
import DetalleJuicio from "@UI/Paginas/TributarioOnline/DetalleTributario/DetalleJuicio/index";
import DetalleMulta from "@UI/Paginas/TributarioOnline/DetalleTributario/DetalleMulta/index";
import DetallePlan from "@UI/Paginas/TributarioOnline/DetalleTributario/DetallePlan/index";

import InformacionTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/InformacionTributo/index";
import AgendaVencimientos from "@UI/Paginas/TributarioOnline/DetalleTributario/AgendaVencimientos/index";

import SeleccionTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Seleccion/index";

import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

import Representantes from "@UI/Paginas/Representantes/index";

import BusquedaPorJuicio from "@UI/Paginas/TributarioOnline/BusquedaPor/Juicio";
import BusquedaPorPlan from "@UI/Paginas/TributarioOnline/BusquedaPor/Plan";
import BusquedaPorTribunalFaltas from "@UI/Paginas/TributarioOnline/BusquedaPor/TribunalFaltas";

const Menu = [
  {
    url: "/DetalleTributario/InformacionTributo/:tributo/:identificador",
    exact: false,
    mostrarEnMenu: false,
    component: InformacionTributo,
    nombre: "Información Tributo",
    titulo: "Información Tributo",
  },
  {
    url: "/DetalleTributario/AgendaVencimientos/:tributo/:identificador",
    exact: false,
    mostrarEnMenu: false,
    component: AgendaVencimientos,
    nombre: "Agenda de Vencimientos",
    titulo: "Agenda de Vencimientos",
  },
  {
    url: "/DetalleTributario/Juicio/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleJuicio,
    nombre: "Juicio",
    titulo: "Juicio",
  },
  {
    url: "/DetalleTributario/Multas/:tributo/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleMulta,
    nombre: "Multa",
    titulo: "Multa",
  },
  {
    url: "/DetalleTributario/Plan/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetallePlan,
    nombre: "Plan",
    titulo: "Plan",
  },
  {
    url: "/DetalleTributario/:tributo",
    exact: true,
    mostrarEnMenu: false,
    component: SeleccionTributo,
    nombre: "Autogestión Tributaria",
    titulo: "Autogestión Tributaria",
  },
  {
    url: "/DetalleTributario/:tributo/:identificador/:seccionMenu/:subIdentificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/DetalleTributario/:tributo/:identificador/:seccionMenu",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/DetalleTributario/:tributo/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotores",
    titulo: "Automotores",
  },
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Autogestión Tributaria",
    titulo: "Autogestión Tributaria",
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
    url: "/Inicio/BusquedaPor/TribunalFalta",
    exact: true,
    mostrarEnMenu: true,
    component: BusquedaPorTribunalFaltas,
    nombre: "Tribunal de Faltas",
    titulo: "Tribunal de Faltas",
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