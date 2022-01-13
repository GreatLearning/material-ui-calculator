import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as colors from './colors';

export const Pad = (props) => {
  const { label, classes, theme, style, value, onClick } = props;

  const names = classNames(classes.pad, theme && theme.root);

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div style={style} className={names}>
      <Button tabIndex="-1" className={classes.button} onClick={handleClick}>
        <div dangerouslySetInnerHTML={{ __html: label }} />
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
      margin: '1px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '2px',
    },
    button: {
      color: 'inherit',
      width: '100%',
    },
  };
})(Pad);
