import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
import { pageToTitle } from '../utils/helpers';
import { fetchScenariosListIfNeeded } from '../actions/init';
import TestRunsList from './TestRunsList';

const styles = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    },
  },
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
});

function renderNavItems(props, pages, activePage) {
  let navItems = null;

  if (pages && pages.length) {
    // eslint-disable-next-line no-use-before-define
    navItems = pages.reduce(reduceChildRoutes.bind(null, props, activePage), []);
  }

  return <List>{navItems}</List>;
}

function reduceChildRoutes(props, activePage, items, childPage, index) {
  if (childPage.children && childPage.children.length > 1) {
    const openImmediately = activePage.pathname.indexOf(childPage.pathname) !== -1 || false;

    items.push(
      <AppDrawerNavItem
        key={index}
        openImmediately={openImmediately}
        title={pageToTitle(childPage)}
      >
        {renderNavItems(props, childPage.children, activePage)}
      </AppDrawerNavItem>,
    );
  } else if (childPage.title !== false) {
    childPage =
      childPage.children && childPage.children.length === 1 ? childPage.children[0] : childPage;

    items.push(
      <AppDrawerNavItem
        key={index}
        title={pageToTitle(childPage)}
        href={childPage.pathname}
        onClick={props.onRequestClose}
      />,
    );
  }

  return items;
}

class AppDrawer extends React.Component {
  componentDidMount() {
    const { onReady } = this.props;

    if (typeof onReady === 'function') {
      onReady();
    }
  }

  render() {
    const {
      classes,
      className,
      disablePermanent,
      mobileOpen,
      onRequestClose
    } = this.props;

    const items =[
      <AppDrawerNavItem key={'item1'} title={'24h Auction channel'} />
    ]

    const drawer = (
      <div className={classes.nav}>
        <div className={classes.toolbarIe11}>
          <Toolbar className={classes.toolbar}>

              <Typography type="title" gutterBottom color="inherit">
                SCENARIOS
              </Typography>

              <Typography type="caption">
                CSS Regression tests
              </Typography>

            <Divider absolute />
          </Toolbar>
        </div>
        <div>
          <TestRunsList />
        </div>
        <List>
          <AppDrawerNavItem title={'Channels'}>
            { items }
          </AppDrawerNavItem>
        </List>
      </div>
    );

    return (
      <div className={className}>
        <Hidden lgUp={!disablePermanent}>
          <Drawer
            classes={{
              paper: classNames(classes.paper, 'algolia-drawer'),
            }}
            type="temporary"
            open={mobileOpen}
            onRequestClose={onRequestClose}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {disablePermanent ? null : (
          <Hidden lgDown implementation="css">
            <Drawer
              classes={{
                paper: classes.paper,
              }}
              type="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        )}
      </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onReady: PropTypes.func,
};

export default compose(
  withStyles(styles),
  connect(state => ({
      scenarios: state.scenarios
    }),
    dispatch => ({
      onReady: () => dispatch(fetchScenariosListIfNeeded())
    })
  )
)(AppDrawer);
