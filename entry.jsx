import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './src';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Pre = ({ data, className }) => (
  <pre className={className}>{JSON.stringify(data, null, '  ')}</pre>
);

const History = withStyles((theme) => ({
  history: {
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    width: '60%',
    overflow: 'scroll',
    height: '300px',
  },
}))(({ classes, history }) => (
  <Paper className={classes.history}>
    <Typography type="title">History</Typography>
    <Pre data={history} />
  </Paper>
));

class DemoCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  onEvaluationComplete = (expression, result) => {
    const { history } = this.state;
    history.push({ expression, result });
    this.setState({ history });
  };

  render() {
    /* <History history={this.state.history} /> */
    return (
      <Calculator
        mode="basic"
        onEvaluationComplete={this.onEvaluationComplete}
      />
    );
  }
}

const el = React.createElement(DemoCalc, {});
ReactDOM.render(el, document.querySelector('#app'));
