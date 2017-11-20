import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import compose from 'recompose/compose';
import { fetchTestDetailsIfNeeded } from '../actions/testDetails';
import TestBlock from '../components/TestBlock';
import ScenarioTitle from '../components/ScenarioTitle';

const styles = theme => ({
  divider: {
    margin: '20px 0'
  }
});

export class TestDetailsContainer extends React.Component {
  componentDidMount() {
    const { onReady, match } = this.props;

    if (typeof onReady === 'function') {
      onReady(match.params.id);
    }
  }

  renderDetails() {
    const { details, classes, match: { params: { id } } } = this.props;
    let scenario;

    return details.map((detail, key) => {
      const testBlock = <TestBlock testID={ id } key={ `test-${key}` } { ...detail } />
      const result = []
      if (detail.scenario !== scenario) {
        scenario = detail.scenario;

        result.push(
          <ScenarioTitle
            key={ `scenario-${scenario}` }
          >
            { scenario }
          </ScenarioTitle>
        );
      }

      result.push(testBlock);
      result.push(
        <Divider className={ classes.divider } key={`divider-${key}`} />
      );

      return result;
    });
  }

  render() {

    return (
      <div>
        Test details
        { this.renderDetails() }
      </div>
    )
  }
}

TestDetailsContainer.propTypes = {
  onReady: PropTypes.func,
  summary: PropTypes.object.isRequired,
  details: PropTypes.array.isRequired,
}

export default compose(
  withStyles(styles, {
    name: 'TestDetailsContainer',
  }),
  connect(
    state => {
      const currentTestDetailsID = state.currentTestDetailsID;

      if (
        currentTestDetailsID === null ||
        typeof state.testDetails[currentTestDetailsID] === 'undefined'
      ) {
        return {
          summary: {},
          details: []
        };
      }

      return state.testDetails[currentTestDetailsID];
    },
    dispatch => ({
      onReady: testID => dispatch(fetchTestDetailsIfNeeded(testID))
    })
  )
)(TestDetailsContainer)
