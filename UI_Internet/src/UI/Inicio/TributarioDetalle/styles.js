const styles = theme => ({
    mainContainer: {
      width: '100%',
      margin: '16px'
    },
    title: {
      fontWeight: '100',
      margin: '5px 0px'
    },
    infoTexto: {
      background: 'rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      padding: '10px 20px',
      margin: '15px 0px'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    buttonActions: {
      display: 'inline-block',
      minWidth: 'auto',
      margin: '2px',
      borderRadius: '20px'
    },
    buttonActionsContent: {
      textAlign: 'right',
      marginTop: '18px'
    },
    buttonMercadoLibre: {
      background: '#fff',
      backgroundImage: 'url(https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs)',
      backgroundSize: '115px',
      backgroundPosition: '5px',
      backgroundRepeat: 'no-repeat',
      width: '128px',
    },
    buttonActionsCaption: {
      top: '40px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '76px'
    },
    select: {
      width: '100%',
      marginBottom: '10px'
    },
    divider: {
      margin: '10px 0px'
    },
    reportButton: {
      width: '100%'
    },
    labelReport: {
      top: '14px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%'
    },
    icon: {
      width:'30px',
      height:'30px',
    },
    textList: {
      lineHeight: '28px',
      position: 'relative',
      top: '2px'
    },
    link: {
      color: '#149257',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  });

  
  export default styles;