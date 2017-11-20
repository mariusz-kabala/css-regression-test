

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
  },
  testSummary: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 16,
    background: 'linear-gradient(60deg, #8f42ff14 40%, #8f42ff58 80%)',
    borderRadius: 4,
    // border: '4px solid',
    // borderImage: 'linear-gradient(60deg, #8f42ff 40%, #c099ff 80%)',
    // borderImageSlice: 1,
    '@global': {
      ' > div': {
        margin: '0 16px',
        padding: 16,
      },
      'span': {
        marginRight: 8,
        fontWeight: 500
      }
    }
  },
  testSummary__title: {
    flexShrink: 0,
    flexBasis: '100%',
    fontSize: 20
  }
});

export class TestDetailsContainer extends React.Component {
  componentDidMount() {
    const { onReady, match } = this.props;

    if (typeof onReady === 'function') {
      onReady(match.params.id);
    }
  }

  renderSummaryDetails() {
    const { classes, summary } = this.props;

    let testPer = "30"

    return (
      <div className={classes.testSummary}>
        <div className={classes.testSummary__title}>details and url</div>
        <div>
          <p>
            <span>Total Tests:</span>
            <span>{ summary.Total }</span>
          </p>
          <p>
            <span>Successful Test:</span>
            <span>{ summary.Success }</span>
          </p>
          <p>
            <span>Failed Test:</span>
            <span>{ summary.Fail }</span>
          </p>
        </div>
        <div>
          circle
        </div>
      </div>
    )
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
          <ScenarioTitle key={ `scenario-${scenario}` }>
            { scenario }
          </ScenarioTitle>
        );
      }

      result.push(testBlock);
      result.push( <Divider className={ classes.divider } key={`divider-${key}`} /> );

      return result;
    });
  }

  render() {
    return (
      <div>
        { this.renderSummaryDetails() }
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
