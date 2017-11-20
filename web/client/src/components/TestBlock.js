import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent, CardMedia, CardActions } from 'material-ui/Card';

const styles = theme => ({
  testCard: {
    position: 'relative',
    minWidth: '240px'
  },
  expandBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    fill: '#6e14ff',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandBtn__open: { transform: 'rotate(180deg)' },
  testCard__subheader_container: {
    padding: '0 16px 16px'
  },
  testCard__subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },
  subHeader__status: {
    marginRight: 16,
    fontSize: '20px',
    fontWeight: 600
  },
  subHeader__status_succeeded: { color: '#149414' },
  subHeader__status_failed: { color: '#e00707' },
  imgsContainer: {
    position: 'relative',
    display: 'flex',
    marginBottom: '16px',
    paddingBottom: '16px',
    width: '100%',
    flexWrap: 'wrap',
    minHeight: '200px',

    '@global': {
      figure: {
        display: 'table',
        margin: 0,
        maxWidth: '100%'
      },
      figcaption: {
        display: 'table-caption',
        captionSide: 'top',
        fontSize: '18px',
        fontWeight: 600,
        color: '#222'
      }
    }
  },
  testImg: {
    flex: '1 1 30%',
    position: 'relative',
    margin: '0 16px 16px 0',
    padding: '8px 8px 8px 0',
    boxSizing: 'border-box',
  },
  testImgLink: {
    fontSize: '12px',
    position: 'absolute',
    bottom: '-4px',
    left: '2px',
    cursor: 'pointer',
  },
  testActions: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '8px'
  },
  testBtn: {
    background: 'linear-gradient(45deg, #6e14ff 40%, #a900ff 80%)',
    borderRadius: 4,
    border: 0,
    color: 'white',
    padding: '8px 24px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  }
});

class TestBlock extends React.Component {
  constructor(props) {
    super(props)

    if ( props.status == true ) {
      this.state = { expanded: false };
    }
    else {
      this.state = { expanded: true };
    }
  }

  handleExpandClick = () => { this.setState({ expanded: !this.state.expanded }); }

  renderSubheader() {
    const { classes, viewport, url, misMatchPercentage, status } = this.props;

    var disStatus;
    var statusClass;
    if ( status == true ) {
      disStatus = 'SUCCEEDED';
      statusClass = classes.subHeader__status_succeeded;
    }
    else {
      disStatus = 'FAILED';
      statusClass = classes.subHeader__status_failed;
    }
    
    return (
      <div className={classes.testCard__subheader}>
        <span>{ url } | { viewport }</span>
        <div>
          <span className={classNames(classes.subHeader__status, statusClass)}>{ disStatus }</span>
          <span>Percentage Difference: { misMatchPercentage }</span>
        </div>
      </div>
    )
  }

  getTargetImageUrl() {
    const { fileName } = this.props;
    return `/api/v1/images/targets/${fileName}`;
  }

  getDiffImageUrl() {
    const { fileName, testID } = this.props;
    return `/api/v1/test-runs/${testID}/images/${fileName}/diff`;
  }

  getTestImageUrl() {
    const { fileName, testID } = this.props;
    return `/api/v1/test-runs/${testID}/images/${fileName}/test`;
  }

  getOpenNewTab(img) { window.open(img, '_blank'); }

  render() {
    const { children, classes, testName } = this.props;
    const testImage = this.getTestImageUrl();
    const diffImage = this.getDiffImageUrl();
    const targetImage = this.getTargetImageUrl();

    return (
      <Card className={classes.testCard}>
        <CardHeader title={ testName } />

        <CardContent className={classes.testCard__subheader_container}>{ this.renderSubheader() }</CardContent>

        <ExpandMoreIcon
          className={classNames(classes.expandBtn, { [classes.expandBtn__open]: this.state.expanded })}
          onClick={this.handleExpandClick}
        />
        <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
          <CardContent>
            <div className={classes.imgsContainer} >
              <div className={classes.testImg}>
                <figure>
                  <img src={ testImage } />
                  <figcaption>Test</figcaption>
                </figure>
                <a className={ classes.testImgLink }
                   onClick={ () => this.getOpenNewTab(testImage) }
                >Open image in new tab</a>
              </div>

              <div className={classes.testImg}>
                <figure>
                  <img src={ diffImage } />
                  <figcaption>Difference</figcaption>
                </figure>
                <a className={ classes.testImgLink }
                  onClick={ () => this.getOpenNewTab(diffImage) }
                >Open image in new tab</a>
              </div>

              <div className={classes.testImg}>
                <figure>
                  <img src={ targetImage } />
                  <figcaption>Original</figcaption>
                </figure>
                <a className={ classes.testImgLink }
                   onClick={ () => this.getOpenNewTab(targetImage) }
                >Open image in new tab</a>
              </div>
            </div>

            <CardActions className={ classes.testActions }>
              <Button className={ classes.testBtn }>APPROVE</Button>
              <Button className={ classes.testBtn }>RE-RUN</Button>
            </CardActions>
          </CardContent>
        </Collapse>
      </Card>
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
