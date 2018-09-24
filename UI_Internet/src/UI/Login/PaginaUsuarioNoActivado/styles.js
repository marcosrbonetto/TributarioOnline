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
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
      // justifyContent: "center"
    },
    pagina: {
      flex: 1,
      width: "100%",
      overflow: "auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    icono: {
      fontSize: "104px"
    },
    texto: {
      marginTop: "16px",
      maxWidth: "400px",
      textAlign: "center"
    },
    footer: {
      borderTop: "1px solid rgba(0,0,0,0.1)",
      padding: "16px",
      display: "flex"
    }
  };
};
export default styles;
