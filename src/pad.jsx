import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const Pad = (props) => {
  const { label, classes, theme, style, value, onClick } = props;
  const names = classNames(classes.pad, theme && theme.root);
  const handleClick = () => {
    onClick(value);
  };

  return (
    <div style={style} className={names}>
      <Button tabIndex="-1" className={classes.button} onClick={handleClick}>
        {label}
      </Button>
    </div>
  );
};

Pad.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(() => {
  return {
    pad: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      fontSize: 'inherit',
    },
    button: {
      color: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'inherit',
    },
  };
})(Pad);
