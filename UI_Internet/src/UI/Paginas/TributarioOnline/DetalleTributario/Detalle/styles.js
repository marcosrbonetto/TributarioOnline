const styles = theme => ({
    mainContainer: {
      width: '100%',
      margin: '16px',
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
      borderRadius: '20px',
    },
    buttonActionsContent: {
      textAlign: 'right',
      marginTop: '18px'
    },
    buttonActionsCaption: {
      top: '40px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90px'
    },
    select: {
      width: '100%',
      marginBottom: '10px',
      background: '#149257',
      textAlign: 'center',
      color: '#fff',
      borderRadius: '20px',
    },
    iconSelect: {
      fill: '#fff'
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
    },
    imgPago: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: '100px',
    },
    imgPago2: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: '20px',
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
    scrollButtonsMenu: {
      '& svg': {
        color: '#fff',
        background: theme.color.ok.main,
        borderRadius: '12px',
      }
    },
    scrollButtonsSubMenu: {
      '& svg': {
        color: '#fff',
        background: theme.color.error.main,
        borderRadius: '12px',
      }
    },
    badgeGreen: {
      background: theme.color.ok.main,
      top: '-4px',
      right: '0px',
    },
    badgeRed: {
      background: theme.color.error.main,
      top: '-4px',
      right: '0px',
      color: '#fff'
    },
    badgeJuicios: {
      display: 'none'
    },
    badgeSubTab: {
      width: '140px',
      height: '36px',
      '& > div': {
        margin: '0px auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }
    },
    badgeTab: {
      width: '107px',
      height: '36px',
      '& > div': {
        margin: '0px auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }
    },
    tabMenu: {
      background: '#fff',
      '& > div': {
        borderTop: '1px solid #bbb',
        borderBottom: '1px solid #bbb',
      }
    },
    itemSubMenu: {
      minWidth: '140px',
    },
    labelItemMenu: {
      padding: '0px'
    },
    tabsRoot: {
      color: theme.color.error.main,
    },
    tabsIndicator: {
      borderBottom: `2px solid ${theme.color.error.main}`,
    },
    containerDeudaAdm: {
      border: '1px solid',
      borderColor: theme.color.ok.main,
      padding: '10px 0px',
      textAlign: 'center',
      position: 'relative',
      margin: '28px 0px 10px 0px',
      borderRadius: '5px',
      '& h3': {
        marginBottom: '0px'
      }
    },
    tituloDeudaAdm: {
      background: '#fff',
      position: 'absolute',
      fontSize: '14px',
      color: theme.color.ok.main,
      top: '-14px',
      left: '8px',
      padding: '5px'
    },
    link: {
      color: theme.color.info.main,
      cursor: 'pointer'
    },
    contaninerDetalle: {
      padding: '10px',
      position: 'relative',
      '& .closePopover': {
        fontFamily: "\'Roboto\', \'Helvetica\', \'Arial\', \'sans-serif\'",
        fontSize: '15px',
        position: 'absolute',
        top: '-2px',
        right: '4px',
        cursor: 'pointer'
      }
    },
    buttonFotterDialog: {
      textAlign: 'center',
      paddingTop: '10px'
    },
    flexContainersMenu: {
      width: '825px',
      left: '50%',
      position: 'relative',
      transform: 'translateX(-50%)',
    },
    miTabla: {
      marginTop: '0px'
    },
    miLinkDialog: {
      minWidth: '700px'
    },
    textDatosCuenta: {
      fontFamily: "\"Courier New\", Courier, \"Lucida Sans Typewriter\", \"Lucida Typewriter\", monospace"
    },
    textList: {
      lineHeight: '28px',
      position: 'relative',
      top: '2px'
    },
    link: {
      color: theme.color.info.main,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    maxWidthInformeCuenta: {
      maxWidth: '900px',
      minWidth: '410px'
    },
    textoNoWrap: {
      whiteSpace: 'nowrap'
    },
    subItemSeleccionadoMobile: {
      fontFamily: "\'Roboto\', \'Helvetica\', \'Arial\', \'sans-serif\'",
      width: '100%',
      display: 'inline-block',
      textAlign: 'center',
    },
    itemSubMenuMobile: {
      fontSize: '10px',
      padding: '3px',
      justifyContent: 'center',
    },
    menuMobile: {
      width: '100%',
      color: '#149257',
      border: '2px solid',
      padding: '0px 10px 0px 15px',
      fontSize: '22px',
      fontWeight: 'bold',
      marginRight: '5px',
      borderColor: '#149257',
      marginBottom: '12px',
      borderRadius: '20px',
    },
    menuContainer: {
      width: '100%'
    }
  });

  
  export default styles;