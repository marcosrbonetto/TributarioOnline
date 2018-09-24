const styles = theme => {
  return {
    root: {
      position: "absolute",
      left: 0,
      bottom: 0
    },
    persona: {
      position: "absolute",
      left: "16px",
      bottom: 0,
      width: "50px",
      height: "100px"
    },
    burbuja: {
      backgroundColor: theme.palette.primary.main,
      padding: "4px",
      paddingLeft: "12px",
      paddingRight: "12px",
      borderRadius: "32px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      bottom: "42px",
      left: "70px",
      alignItems: "center",
      transition: "all 1s",
      "& *": {
        cursor: "pointer"
      },
      "& span": {
        color: "white"
      },
      "& p": {
        color: "white",
        maxWidth: "0px",
        opacity: 0,
        overflow: "hidden",
        transition: "opacity 0.3s, margin 0.3s 0.3s, max-width 0.5s 0.3s"
      },
      "&:hover": {
        "& p": {
          opacity: 1,
          marginLeft: "8px",
          marginRight: "16px",
          maxWidth: "100px",
          transition: "opacity 0.3s 0s, margin 0.3s, max-width 0.3s 0s"
        }
      }
    },
    panel: {
      position: "absolute",
      left: "16px",
      bottom: "-16px",
      paddingBottom: "16px",
      borderRadius: "16px",
      width: "400px",
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.3s",
      transform: "translateY(100px)",
      "&.abierto": {
        transform: "translateY(0px)",
        pointerEvents: "all",
        opacity: 1
      }
    },
    panelEncabezado: {
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& > div": {
        padding: "8px",
        paddingLeft: "16px",
        paddingRight: "16px",
        flex: 1
      }
    },
    panelContentHeader: {
      height: "150px",
      backgroundSize: "100%",
      backgroundPosition: "center",
      width: "100%"
    },
    panelContent: {
      maxHeight: "300px",
      overflow: "auto",
      padding: "16px"
    }
  };
};
export default styles;
