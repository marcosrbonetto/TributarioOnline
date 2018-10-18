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
    margin: '5px 0px',
    display: 'inline-block'
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
  btnDenegarPermiso: {
    ...theme.button,
    float: 'right',
    marginTop: '4px',
    background: '#F44336'
  },
  containerButton: {
    position: 'relative'
  },
  textField: {
    width: '100%',
    marginTop: '0px'
  },
  textRepresentante: {
    marginTop: '10px'
  },
  actionButtons: {
    paddingBottom: '0px',
    position: 'relative',
    bottom: '-5px',
  },
  listaSolicitudes: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  containerLista: {
    backgroundColor: 'inherit',
  },
  ulLista: {
    backgroundColor: 'inherit',
    padding: 0,
    marginBottom: '10px'
  },
  botonAceptacionSolicitud: {
    right: '0px'
  },
  botonCancelacionSolicitud: {
    right: '80px',
    color: '#F44336',
    borderColor: '#F44336',
    width: '34px',
    background: '#fff'
  },
  subItemsTributo: {
    padding: '0px auto',
    '& li': {
      padding: '0px',
      paddingLeft: '24px',
    },
    '& span': {
      fontSize: '12px'
    }
  },
  itemsTributo: {
    padding: '0px auto',
    padding: '0px',
    paddingLeft: '24px',
    marginTop: '5px',
    '& span': {
      fontSize: '16px'
    }
  },
  labelItemTributo: {
    fontSize: '20px',
    color: '#000',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
  },
  labelInput: {
    display: 'block',
    marginTop: '10px',
    fontSize: '12px'
  },
  selectTipoTributo: {
    width: '100%'
  },
  iconEliminarPermiso: {
    width: '100%',
    textAlign: 'center',
    '& i': {
      color: theme.color.error.main,
      marginRight: '50px',
      cursor:'pointer'
    }
  },
  iconAgregarPermiso: {
    width: '100%',
    textAlign: 'center',
    '& i': {
      color: theme.color.ok.main,
      marginRight: '50px',
      cursor:'pointer'
    }
  },
  mensajeError: {
    color: theme.color.error.main
  }
});


export default styles;