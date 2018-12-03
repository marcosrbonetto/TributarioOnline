const styles = theme => ({
  mainContainer: {
    width: '100%',
    margin: '16px',
  },
  root: {
    paddingBottom: '4px !important',
    textAlign: 'center'
  },
  title: {
    fontWeight: '100',
    margin: '5px 0px'
  },
  selectIdentificador:{
    color: theme.color.ok.main,
    padding: '0px 10px 0px 15px',
    fontSize: '22px',
    fontWeight: 'bold',
    marginLeft: '10px',
    marginRight: '5px',
    marginBottom: '12px',
    borderRadius: '20px',
    border: '2px solid',
    borderColor: theme.color.ok.main,
    '& > div > div': {
      paddingBottom: '4px'
    },
    '& svg': {
      color: theme.color.ok.main
    }
  },
  selectTipoTributo: {
    width: '100%'
  },
  buttonActions: {
    display: 'inline-block',
    minWidth: 'auto',
    margin: '2px',
    borderRadius: '20px',
    marginBottom: '8px'
  },
  title: {
    fontWeight: 'bold'
  },
  itemTributo: {
    fontStyle: 'normal'
  }
});


export default styles;