import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link as RouterLink} from "react-router-dom";

import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {
  Menu as MenuIcon,
  Code as CodeIcon,
  Description as DescriptionIcon,
  LiveHelp as LiveHelpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';
import {
  AppBar,
  CssBaseline,
  Divider, Drawer, IconButton, List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction, ListItemText,
  ListSubheader,
  Switch,
  TablePagination, Toolbar, Typography
} from "@material-ui/core/es/index";
import * as types from "../../actions/actionTypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import QuestionsView from '../questions/QuestionsView';
import AboutView from "../pages/AboutView";
import InstructionsView from "../pages/InstructionsView";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NavigationDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  handleToggle = (type) => {
    switch (type) {
      case 'sortBy':
        this.props.actions.toggleSort();
        break;
      case 'orderBy':
        this.props.actions.toggleOrder();
        break;
      default:return;
    }
  };

  handleChangePage = (e, page) => {
    this.props.actions.setPage(page)
  };

  handleChangeRowsPerPage = (e, e2) => {
    this.props.actions.setRowsPerPage(e2.key)
  };

  render() {
    const {classes, theme} = this.props;
    const {open} = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Pluralsight Coding Exercise - Sean Weiss
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            <ListItem button component={RouterLink} to="/questions">
              <ListItemIcon>
                <LiveHelpIcon/>
              </ListItemIcon>
              <ListItemText primary="Questions"/>
            </ListItem>
            <ListItem button component={RouterLink} to="/about">
              <ListItemIcon>
                <CodeIcon/>
              </ListItemIcon>
              <ListItemText primary="About"/>
            </ListItem>
            <ListItem button component={RouterLink} to="/instructions">
              <ListItemIcon>
                <DescriptionIcon/>
              </ListItemIcon>
              <ListItemText primary="Instructions"/>
            </ListItem>
            <Divider/>
            <ListSubheader>Questions Options</ListSubheader>
            <ListItem>
              <TablePagination
                rowsPerPageOptions={[50, 100, 250]}
                component="div"
                count={this.props.totalCount}
                rowsPerPage={this.props.rowPP}
                page={this.props.page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Sort By" secondary={this.props.sortBy === "question" ? "Question" : "Answer"}/>
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleToggle.bind(this, 'sortBy')}
                  checked={this.props.sortBy === "question"}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Order By" secondary={this.props.orderBy.toUpperCase()}/>
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleToggle.bind(this, 'orderBy')}
                  checked={this.props.orderBy === "asc"}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader}/>

          {/*<Switch>*/}
          <Route path="/" exact component={QuestionsView}/>
          <Route path="/questions" component={QuestionsView}/>
          <Route path="/about" component={AboutView}/>
          <Route path="/instructions" component={InstructionsView}/>


          {/*</Switch>*/}


        </main>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    sortBy: state.sortBy,
    orderBy: state.orderBy,
    totalCount: state.totalCount,
    rowPP: state.rowPP,
    page: state.page,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        toggleSort: () => ({
          type: types.TOGGLE_SORT
        }),

        toggleOrder: () => ({
          type: types.TOGGLE_ORDER
        }),
        setPage: page => ({type: types.SET_PAGE, page}),
        setRowsPerPage: rowPP => ({type: types.SET_ROW_PER_PAGE, rowPP}),
      },
      dispatch
    )
  };
}


NavigationDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles, {withTheme: true})(NavigationDrawer));

