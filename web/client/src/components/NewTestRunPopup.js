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

const styles = theme => ({
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
})

class NewTestRunPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: 'https://auto1-training-1.auto1-test.com',
      testName: '',
      threshold: 0.5,
      generateCookie: true
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

  render() {
    const { open, classes } = this.props;
    const { url, testName, threshold, generateCookie } = this.state;

    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">Schedule a new test run</DialogTitle>
        <DialogContent>
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
            </div>
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
  onCancel: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles, {
    name: 'NewTestRunPopup',
  }),
  connect(state => ({}),
    dispatch => ({
      onSubmit: data => {
        dispatch(scheduleNewTestRunIfNeeded(data));
        dispatch(closeNewTestRunPopup());
      },
      onCancel: () => dispatch(closeNewTestRunPopup())
    })
  )
)(NewTestRunPopup)
