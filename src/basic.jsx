import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Pad from './pad';

const items = [
  { label: 'C', value: 'clear', kind: 'operator' },
  { label: 'C', value: 'clear', kind: 'operator' },
  { label: '±', value: 'plus-minus', kind: 'operator' },
  { label: '←', value: 'backspace', kind: 'operator' },

  '(',
  ')',
  '%',
  { label: '÷', value: '/', kind: 'operator' },

  '7',
  '8',
  '9',
  { label: '×', value: '*', kind: 'operator' },

  '4',
  '5',
  '6',
  { label: '-', value: '-', kind: 'operator' },

  '1',
  '2',
  '3',
  { label: '+', value: '+', kind: 'operator' },

  '0',
  '.',
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
          const props = typeof i === 'string' ? { label: i, value: i } : i;
          const positionStyle =
            props.label === '0'
              ? {
                  gridColumn: '1/3',
                }
              : {};

          return (
            <Pad
              key={index}
              style={positionStyle}
              theme={{
                root: classes[i.kind],
              }}
              {...props}
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
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  operator: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}))(Basic);
