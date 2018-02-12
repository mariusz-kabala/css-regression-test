import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { scheduleNewTestRunIfNeeded, closeNewTestRunPopup } from '../actions/scheduleNewTestRun';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

const styles = theme => ({
  dialogMain: {
    maxWidth: '800px'
  },
  formItem: {
    marginTop: '10px'
  },
  mainUrl: {
    width: '500px'
  },
  url: {
    width: '300px',
    marginRight: '10px'
  }
});

class NewTestRunPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: 'https://auto1-training-1.auto1-test.com',
      testName: '',
      threshold: 0.5,
      generateCookie: true,
      fullScreen: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSelectChange = event => {
    this.setState({ threshold: event.target.value });
  };

  handleChooseTestClick = event => {
    this.setState({
      fullScreen: true
    });
  };

  handleFormSubmit = event => {
    const { onSubmit } = this.props;

    onSubmit(this.state);

    event.preventDefault();
  }

  handleCancel = event => {
    const { onCancel } = this.props;

    onCancel();

    event.preventDefault();
  }

  handleCheckboxChange = (event, checked) => {
    this.setState({
      generateCookie: checked
    })
  }

  renderChooseTestsButton() {
    const { fullScreen } = this.state;

    if (fullScreen === true) {
      return null;
    }

    return (
      <FormControl>
        <Button
          color="accent"
          raised
          onClick={ this.handleChooseTestClick }
        >
          Choose tests to run (all)
        </Button>
      </FormControl>
    );
  }

  renderTestList() {
    const { fullScreen } = this.state;
    const { scenarios } = this.props;
    const renderTestList = tests => (
      <Collapse component="li" in={ true } timeout="auto" unmountOnExit>
        <List disablePadding>
          { tests.map(test => (
            <ListItem>
              <Checkbox checked={ false } onChange={ () => null } />
              <ListItemText inset primary={ test.name } />
            </ListItem>
          )) }
        </List>
      </Collapse>
    )

    if (fullScreen === false) {
      return null;
    }

    return (
      <List>
        { scenarios.map(scenario => (
          <ListItem>
            <ListItemText inset primary={ scenario.name } />
            { renderTestList(scenario.tests) }
          </ListItem>
        )) }
      </List>
    );
  }

  render() {
    const { open, classes } = this.props;
    const { url, testName, threshold, generateCookie , fullScreen} = this.state;

    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        open={ open }
        fullScreen={ fullScreen }
      >
        <DialogTitle id="confirmation-dialog-title">Schedule a new test run</DialogTitle>
        <DialogContent className={ classes.dialogMain }>
          <div style={{width: '500px'}}>
            <FormControl>
              <TextField
                value={ url }
                onChange={ this.handleChange('url') }
                className={ classes.mainUrl }
                label="URL"
              />
            </FormControl>

            <div className={ classes.formItem }>
              <FormControl>
                <TextField
                  className={ classes.url }
                  value={ testName }
                  label="Test run name"
                  onChange={ this.handleChange('testName') }
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="age-simple">Threshold</InputLabel>
                <Select
                  value={ threshold }
                  name={ 'threshold' }
                  onChange={ this.handleSelectChange }
                  input={<Input name="threshold" id="threshold" />}
                >
                  <MenuItem value={0.1}>0.1</MenuItem>
                  <MenuItem value={0.5}>0.5</MenuItem>
                  <MenuItem value={1.0}>1.0</MenuItem>
                  <MenuItem value={1.5}>1.5</MenuItem>
                  <MenuItem value={2.0}>2.0</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={ classes.formItem }>
              <FormControl>
                <FormControlLabel
                  value={'1'}
                  control={<Checkbox checked={ generateCookie } onChange={ this.handleCheckboxChange } />}
                  label={'Generate auth cookie'}
                />
              </FormControl>
              { this.renderChooseTestsButton() }
            </div>
          </div>
          <div>
            { this.renderTestList() }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={ this.handleCancel } color="primary">
            Cancel
          </Button>
          <Button onClick={ this.handleFormSubmit } color="primary">
            Start test
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

NewTestRunPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  scenarios: PropTypes.array.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'NewTestRunPopup',
  }),
  connect(
    state => ({
      scenarios: state.scenarios
    }),
    dispatch => ({
      onSubmit: data => {
        dispatch(scheduleNewTestRunIfNeeded(data));
        dispatch(closeNewTestRunPopup());
      },
      onCancel: () => dispatch(closeNewTestRunPopup())
    })
  )
)(NewTestRunPopup)
