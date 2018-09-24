const styles = theme => {
  return {
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height: "100%"
    },
    content: {
      flex: 1,
      overflow: "auto",
      padding: "16px"
    },
    footer: {
      borderTop: "1px solid rgba(0,0,0,0.1)",
      padding: "16px",
      display: "flex"
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
    contenedorError: {
      flex: 1,
      overflow: "auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    iconoError: {
      fontSize: "104px"
    },
    textoError: {
      marginTop: "16px",
      maxWidth: "400px",
      textAlign: "center"
    }
  };
};
export default styles;
