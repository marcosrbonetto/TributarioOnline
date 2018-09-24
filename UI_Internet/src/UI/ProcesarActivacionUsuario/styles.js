const styles = theme => {
  return {
    root: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center"
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
      width: "100%",
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
    }
  };
};
export default styles;
