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
  testSummary__title: { fontSize: 20 },
  testSummary__details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleChart__circle: {
    transform: 'rotate(-90deg)',
    transformOrigin: 'center'
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

    const testSucceeded = ( summary.Success/summary.Total * 100 ).toFixed(1)

    return (
      <div className={classes.testSummary}>
        <h1 className={classes.testSummary__title}>details and url</h1>
        <div className={classes.testSummary__details}>
          <svg className={ classes.circleChart } viewBox="0 0 33.83098862 33.83098862" width="180" height="180">
            <circle className={ classes.circleChart__background } stroke="#fafafa" strokeWidth="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
            <circle className={ classes.circleChart__circle } stroke="#8f42ff" strokeWidth="2" strokeDasharray={`${testSucceeded}, 100`} strokeLinecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
            <text x="16.91549431" y="14" alignmentBaseline="central" textAnchor="middle" fontSize="8">{ testSucceeded }%</text>
            <text x="16.91549431" y="22" alignmentBaseline="central" textAnchor="middle" fontSize="2.4">Successful test</text>
            <text x="16.91549431" y="26" alignmentBaseline="central" textAnchor="middle" fontSize="2.8">
              { summary.Success } / { summary.Total }
            </text>
          </svg>
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
