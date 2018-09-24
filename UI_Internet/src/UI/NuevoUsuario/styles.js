const styles = theme => {
  return {
    progress: {
      opacity: 0,
      transition: "opacity 0.3s",
      "&.visible": {
        opacity: 1
      }
    },
    overlayCargando: {
      backgroundColor: "rgba(255,255,255,0.6)",
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      borderRadius: "16px",
      pointerEvents: "none",
      transition: "opacity 0.3s",
      "&.visible": {
        opacity: 1,
        pointerEvents: "auto"
      }
    },
    root: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center"
    },
    cardRoot: {
      maxHeight: "670px",
      maxWidth: "900px",
      alignSelf: "center",
      width: "100%",
      height: "100%",
      opacity: 0,
      transform: "translateY(100px)",
      transition: "all 0.3s",
      "&.visible": {
        opacity: 1,
        transform: "translateY(0)"
      }
    },
    cardContent: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      "& > div": {
        display: "flex",
        flexDirection: "column",
        flex: 1
      }
    },
    header: {
      paddingBottom: "0",
      display: "flex",
      alignItems: "center"
    },
    contenedorTextosSistema: {
      marginLeft: "16px"
    },
    imagenLogoMuni: {
      width: "64px",
      height: "64px",
      backgroundImage:
        "url(https://servicios2.cordoba.gov.ar/VecinoVirtualUtils_Internet/Resources/Imagenes/escudo_verde.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center"
    },
    contentSwapper: {
      height: "100%",
      flex: 1,
      display: "flex",
      "& > span": { width: "100%" }
    },
    contentSwapperContent: {
      height: "100%",
      width: "100%",
      display: "flex"
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    mainContent: {
      flex: 1,
      overflow: "auto"
    },
    footer: {
      borderTop: "1px solid rgba(0,0,0,0.1)",
      padding: "16px",
      display: "flex"
    },
  };
};
export default styles;
