const styles = theme => ({
    mainContainer: {
      width: '100%',
      margin: '16px'
    },
    divider: {
      margin: '10px 0px'
    },
    title: {
      fontWeight: '100',
      margin: '5px 0px'
    },
    infoTexto: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '1.46429em',
      background: '#eee',
      padding: '10px',
      textAlign: 'center'
    },
    button: {
      ...theme.button,
      position: 'absolute',
      bottom: '5px'
    },
    conainerButton: {
      position: 'relative'
    }
  });

  
  export default styles;