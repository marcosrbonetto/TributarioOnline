import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class ContentDialogoComponente extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button
          variant="raised"
          onClick={() => {
            this.props.onClose();
          }}
        >
          Cerrar
        </Button>
      </div>
    );
  }
}

const styles = theme => ({});

let componente = ContentDialogoComponente;
componente = withStyles(styles)(componente);
export default componente;
