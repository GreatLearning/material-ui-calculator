import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './src';
import Button from '@material-ui/core/Button';
import debug from 'debug';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';

const log = debug('@pie-framework:demo');

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

const Pre = ({ data, className }) => (
  <pre className={className}>{JSON.stringify(data, null, '  ')}</pre>
);

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
    const { mode, classes } = this.props;

    /* <History history={this.state.history} /> */
    return <Calculator onEvaluationComplete={this.onEvaluationComplete} />;
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  onSelectionChange = (selection) => {
    this.setState({
      selectable: {
        value: this.state.selectable.value,
        selectionStart: selection.selectionStart,
        selectionEnd: selection.selectionEnd,
      },
    });
  };

  onChange = (event) => {
    const selectable = {
      value: event.target.value,
      selectionStart: event.target.selectionStart,
      selectionEnd: event.target.selectionEnd,
    };
    log('[onChange] update - selectable ', selectable);
    this.setState({ selectable });
  };

  onEvaluationComplete = (expression, result) => {
    this.state.history.push({ expression, result });
    this.setState({ history: this.state.history });
  };

  onGithubClick = () => {
    window.location.href =
      'https://github.com/pie-framework/material-ui-calculator';
  };

  render() {
    return <DemoCalc mode="basic" />;
  }
}

const el = React.createElement(Demo, {});
ReactDOM.render(el, document.querySelector('#app'));
