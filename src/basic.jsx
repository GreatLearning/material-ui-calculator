import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Pad from './pad';

const items = [
  { label: 'C', value: 'clear', kind: 'operator' },
  { label: '←', value: 'backspace', kind: 'operator' },
  { label: '±', value: 'plus-minus', kind: 'operator' },
  { label: '÷', value: '/', kind: 'operator' },
  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '%', value: '%' },
  { label: '×', value: '*', kind: 'operator' },

  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '-', value: '-', kind: 'operator' },

  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '+', value: '+', kind: 'operator' },

  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },

  { label: '0', value: '0' },
  { label: '.', value: '.' },
  { label: '=', value: 'equals', kind: 'operator' },
];

export class Basic extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onInput: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { classes, onInput, className } = this.props;

    const names = classNames(classes.pad, className);

    return (
      <div className={names}>
        {items.map((i, index) => {
          let positionStyle = {};
          if (i.label === '0') positionStyle = { gridColumn: '1/3' };
          else if (i.label === '=')
            positionStyle = {
              gridRow: '5/7',
              gridColumn: '4/5',
            };

          return (
            <Pad
              key={index}
              style={positionStyle}
              theme={{
                root: classes[i.kind],
              }}
              {...i}
              onClick={onInput}
            />
          );
        })}
      </div>
    );
  }
}

export default withStyles((theme) => ({
  pad: {
    flex: 0.5,
    gridGap: '4px',
    width: '100%',
    display: 'grid',
    fontSize: 'inherit',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  operator: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}))(Basic);
