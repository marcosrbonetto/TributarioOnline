import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ReCAPTCHA from "react-google-recaptcha";

class MiCaptcha extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onChangeCaprcha = (valueCaptcha) => {
    this.props.handleValidationCaptcha && this.props.handleValidationCaptcha(valueCaptcha);
  };

  render() {
    let { classes, classNameCaptcha } = this.props;

    return (
      <ReCAPTCHA
        className={classNameCaptcha}
        sitekey="6LeknYMUAAAAAKeaBSCIRJW4R16vZdK6zEc76PC4"
        onChange={this.onChangeCaprcha}
      />
    );
  }
}

const styles = theme => ({

});

export default withStyles(styles)(MiCaptcha);
