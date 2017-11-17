/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardText, CardMedia, CardTitle } from 'material-ui/Card';

const styles = theme => ({
  testBlock: {},
  testCard: { position: 'relative' },
  imgsContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    padding: '16px'
  },
  testImg: {
    flex: '1 1 33%',
    position: 'relative',
    padding: '8px',
    maxWidth: '33%',

    '@global': {
      img: { height: '240px' }
    }
  },
});

class TestBlock extends React.Component<any, any> {
  renderSubheader() {
    return <span>123</span>
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.testBlock}>
        <Card className={classes.testCard}>
          <CardHeader
            title="URL Avatar"
            subheader={ this.renderSubheader() }
          />
          <div>
            <CardMedia
              className={classes.imgsContainer}
            >
              <div className={classes.testImg}>
                <img src="https://goo.gl/8ikX6L"/>
              </div>
              <div className={classes.testImg}>
                <img src="https://goo.gl/8ikX6L"/>
              </div>
              <div className={classes.testImg}>
                <img src="https://goo.gl/8ikX6L"/>
              </div>
            </CardMedia>
          </div>
        </Card>
      </div>
    );
  }
}

TestBlock.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, {
    name: 'TestBlock',
  }),
)(TestBlock);
