import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Subheader from 'material-ui/List/ListSubheader';
import { isObject } from 'lodash';
import Button from 'material-ui/Button';
import { openNewTestRunPopup } from '../actions/scheduleNewTestRun';
import GenerateNewTargetPopup from '../components/GenerateNewTargetPopup';
import { openGenerateNewTargetPopup } from '../actions/generateNewTarget';

const styles = theme => ({
  urlsList: {
    margin: '0 0 15px 0',
    padding: 0,
    'list-style-type': 'none'
  },
  url: {
    fontSize: '12px',
    color: '#fff',
    padding: '3px',
    background: '#A36EFB',
    marginRight: '5px',
    display: 'inline-block'
  },
  panel: {
    marginBottom: '10px'
  },
  detailsContainer: {
    display: 'table',
    width: '100%',
  },
  detailsEl: {
    display: 'table-cell',
    width: '50%',
    verticalAlign: 'top',
  },
  targetImage: {
    maxWidth: '500px'
  }
});

export class ScenariosContainer extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : null,
    });
  };

  handleGenerateTargetImageClick = event => {
    event.preventDefault();

    const { onGenerateTargetImageClick } = this.props;

    onGenerateTargetImageClick();
  };

  handleRunTestClick = event => {
    event.preventDefault();

    const { onRunTestClick } = this.props;

    onRunTestClick();
  };

  renderImages(images) {
    const { classes } = this.props;

    return (
      <GridList cellHeight={180}>
        { images.map(image => (
          <GridListTile key={ image.file }>
            <img
              className={ classes.targetImage }
              src={ `/api/v1/images/targets/${image.file}` }
              alt={ `${image.url} / ${image.res}` }
            />
            <GridListTileBar
              title={image.url}
              subtitle={ image.res }
              actionIcon={
                <IconButton>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        )) }
      </GridList>
    )
  }

  renderUrls(urls) {
    const { classes } = this.props;

    return (
      <ul className={ classes.urlsList }>
        { urls.map((url, key) => {
          return (
            <li className={ classes.url } key={ `url-${key}` }>
              { url }
            </li>
          )
        }) }
      </ul>
    );
  }

  renderObjectTodo(todo) {
    return (
      <Table>
        <TableBody>
        { Object.keys(todo).map((key, index) => {
          return (<TableRow key={ `todo-${index}` }>
            <TableCell>
                { key }
            </TableCell>
            <TableCell>
              { todo[key] }
            </TableCell>
          </TableRow>)
        }) }
        </TableBody>
      </Table>
    )
  }

  renderArrayTodo(todo) {

  }

  renderTodo(todo) {
    return isObject(todo) ? this.renderObjectTodo(todo) : this.renderArrayTodo(todo);
  }

  renderTest(test) {
    const { expanded } = this.state;
    const { classes } = this.props;
    return (
      <ExpansionPanel
        key={ `test-${test.name}` }
        expanded={ expanded === test.name }
        onChange={ this.handleChange(test.name) }
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography type="subheading">{ test.name }</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={ classes.detailsContainer }>
            <div className={ classes.detailsEl }>
              { this.renderTodo(test.todo) }
            </div>
            <div className={ classes.detailsEl }>
              { this.renderImages(test.images) }
            </div>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button
            onClick={ this.handleGenerateTargetImageClick }
            raised
            color="primary"
          >
            Generate new target images
          </Button>
          <Button
            raised
            color="accent"
            onClick={ this.handleRunTestClick }
          >
            Run this test
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }

  renderScenario(scenario) {
    const { classes } = this.props;

    return (
      <div className={ classes.panel } key={ `scenario-${scenario.name}` }>
        <Typography type="headline">{ scenario.name }</Typography>
        { this.renderUrls(scenario.urls) }
        { scenario.tests.map(test => this.renderTest(test)) }
      </div>
    );
  }

  render() {
    const { scenarios } = this.props;

    return (
      <div>
        <Typography type="display1" gutterBottom color="inherit">
          Scenarios:
        </Typography>
        { scenarios.map(scenario => this.renderScenario(scenario)) }
        <GenerateNewTargetPopup />
      </div>
    )
  }
}

ScenariosContainer.propTypes = {
  onRunTestClick: PropTypes.func.isRequired,
  onGenerateTargetImageClick: PropTypes.func.isRequired,
  scenarios: PropTypes.array.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'Scenarios'
  }),
  connect(state => ({
    scenarios: state.scenarios
  }),
  dispatch => ({
    onRunTestClick: () => {
      dispatch(openNewTestRunPopup());
    },
    onGenerateTargetImageClick: () => {
      dispatch(openGenerateNewTargetPopup());
    }
  }))
)(ScenariosContainer)
