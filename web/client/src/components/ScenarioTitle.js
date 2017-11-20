import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  scenarioTitle: {
    padding: 10,
    backgroundColor: '#6e14ff',
    background: 'linear-gradient(60deg, #8f42ff 40%, #c099ff 80%)',
  },
  scenarioTitleText: {
    color: '#fff',
    fontSize: 18,
    margin: 5,
    textTransform: 'uppercase'
  }
})

class ScenarioTitle extends React.Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={ classes.scenarioTitle }>
        <h1 className={ classes.scenarioTitleText }>
          { children }
        </h1>
      </div>
    );
  }
}

export default withStyles(styles, {
  name: 'scenarioTitle'
})(ScenarioTitle);
