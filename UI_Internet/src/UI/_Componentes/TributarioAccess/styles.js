const styles = theme => ({
    labelInput: {
      display: 'block',
      color: '#000'
    },
    sectionInputSpacing: {
      marginTop: '10px',
      '& div' : {
        width: '100%'
      },
      '& input': {
        padding: '5px 0 5px',
        height: '25px'
      },
      '& > div > div > div': {
        marginTop: '6px'
      },
      '& select': {
        padding: '5px 0 7px',
      }
    },
    buttonActions: {
      display: 'inline-block',
      minWidth: 'auto',
      margin: '2px',
      borderRadius: '20px',
      '&[type="cancel"]': {
        background: 'rgb(244,67,54)',
        marginRight: '10px'
      }
    },
    contentRight: {
        textAlign: 'right'
    },
    header: {
      fontSize: 'large',
      padding: '0px',
      borderBottom: '2px solid rgb(76, 175, 80)'
    },
    icon: {
      margin: '0px',
      color: '#757575',
      fontSize: '50px',
    },
    iconSvg: {
      '& svg': {
        width: '50px',
        fill: '#757575'
      }
    },
    title: {
      paddingBottom: '12px'
    }
  });

  
  export default styles;