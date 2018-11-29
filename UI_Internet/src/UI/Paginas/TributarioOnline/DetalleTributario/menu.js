import DetalleTributo from "@UI/Paginas/TributarioOnline/DetalleTributario/Detalle/index";
import TributarioOnline from "@UI/Paginas/TributarioOnline/index";

const Menu = [
  {
    url: "/DetalleTributario/:tributo/:identificador",
    exact: true,
    mostrarEnMenu: false,
    component: DetalleTributo,
    nombre: "Automotor",
    titulo: "Automotor",
  },
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inicio",
    titulo: "Inicio",
  },
  {
    url: "/Inicio/Tributo/Automotor",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Automotor",
    titulo: "Automotor",
  },
  {
    url: "/Inicio/Tributo/Inmueble",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Inmueble",
    titulo: "Inmueble",
  },
  {
    url: "/Inicio/Tributo/Comercio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Comercios e Industria",
    titulo: "Comercios e Industria",
  },
  {
    url: "/Inicio/Tributo/Cementerio",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Cementerio",
    titulo: "Cementerio",
  },
  {
    url: "/Inicio/Tributo/FeriaMercado",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Ferias y Mercados",
    titulo: "Ferias y Mercados",
  },
  {
    url: "/Inicio/Tributo/TaxiRemis",
    exact: true,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Taxis/Remises",
    titulo: "Taxis/Remises",
  },
  {
    url: "https://sistemas2.cordoba.local/tasas/",
    exact: true,
    mostrarEnMenu: true,
    externalLink: true,
    nombre: "Tasas Administrativas",
  },
  {
    url: "/Inicio",
    exact: false,
    mostrarEnMenu: true,
    component: TributarioOnline,
    nombre: "Volver",
    titulo: "Volver",
  }
];

export default Menu;