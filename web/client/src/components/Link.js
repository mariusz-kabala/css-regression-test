import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import NextLink from 'next/link';
import { withStyles } from 'material-ui/styles';
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';

const styles = theme => ({
  root: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  variantDefault: {
    color: 'inherit',
  },
  variantPrimary: {
    color: theme.palette.primary[500],
  },
  variantAccent: {
    color: theme.palette.secondary.A400,
  },
  variantButton: {
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
});

class OnClick extends React.Component<any, any> {
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event);
    }
  };

  render() {
    const { component: ComponentProp, onCustomClick, ...props } = this.props;
    return <ComponentProp {...props} onClick={this.handleClick} />;
  }
}

OnClick.propTypes = {
  component: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onCustomClick: PropTypes.func,
};

function Link(props, context) {
  return (
    <a>Link</a>
  )
}

export default withStyles(styles)(Link);
