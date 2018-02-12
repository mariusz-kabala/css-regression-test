import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  mainUrl: {
    width: '500px'
  },
  loader: {
    textAlign: 'center'
  },
});

export class GenerateNewTargetPopup extends React.Component {
  renderForm() {
    const { classes } = this.props;

    return (
      <FormControl>
        <TextField
          value={ '' }
          onChange={ () => null }
          className={ classes.mainUrl }
          label="URL"
        />
      </FormControl>
    );
  }

  renderLoader() {
    const { classes } = this.props;

    return (
      <div className={ classes.loader}>
        <CircularProgress size={ 50 } color="accent" />
      </div>
    );
  }

  renderContent() {
    const { isLoading } = this.props;

    if (isLoading === true) {
      return this.renderLoader();
    }

    return this.renderForm();
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog open={ open }>
        <DialogTitle>Generate a new target image</DialogTitle>
        <DialogContent>
          <div style={{width: '500px'}}>
            { this.renderContent() }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => null } color="primary">
            Cancel
          </Button>
          <Button onClick={ () => null } color="primary">
            Generare
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GenerateNewTargetPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default compose(
  withStyles(styles, {
    name: 'GenerateNewTargetPopup'
  }),
  connect(
    state => ({
      open: state.generateNewTarget.isOpen,
      isLoading: state.isLoading.generateNewTarget
    }),
    dispatch => ({})
  )
)(GenerateNewTargetPopup);
