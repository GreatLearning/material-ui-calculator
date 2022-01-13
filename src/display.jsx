import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as colors from './colors';

export class Display extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    focused: PropTypes.bool,
    error: PropTypes.object,
  };

  render() {
    const { classes, children, focused, error } = this.props;

    const names = classNames(
      classes.display,
      focused && classes.focused,
      error && classes.error
    );
    return (
      <div className={names}>
        <div className={classes.expr}>{children} </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  display: {
    display: 'flex',
    backgroundColor: 'transparent',
    padding: theme.spacing.unit * 2,
    transition: 'background-color 200ms linear',
    textAlign: 'right',
    position: 'relative',
    boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
    border: 'solid 1px rgba(255,255,255,0)',
  },
  focused: {
    border: 'solid 1px rgba(255,255,255,1.0)',
  },
  error: {},
  expr: {
    flex: 1,
    paddingLeft: theme.spacing.unit,
  },
});

export default withStyles(styles)(Display);
