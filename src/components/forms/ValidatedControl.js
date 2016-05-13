import React, { Component, PropTypes } from 'react';

import { BoundFormControl } from './Form';

@BoundFormControl
export default class ValidatedControl extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    validators: PropTypes.object,
    state: PropTypes.shape({
      touched: PropTypes.bool,
      dirty: PropTypes.bool,
      value: PropTypes.any,
      validators: PropTypes.object,
      error: PropTypes.bool,
    }).isRequired,
    valueGetter: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    validators: {},
    valueGetter: ({ target: { value } }) => value,
  };

  componentDidMount() {
    this.props.onChange(this.runValidators());
  }

  componentWillReceiveProps(nextProps) {
    const { state: nextState } = nextProps;
    const { state: currentState } = this.props;
    if (nextState.value !== currentState.value) {
      this.props.onChange(this.runValidators({ ...nextState }));
    }
  }

  runValidators(state = { ...this.props.state }) {
    state.error = false;
    for (const key of Object.keys(this.props.validators)) {
      const validation = this.props.validators[key](state.value, this.props);
      state.error = state.error || validation.error;
      state.validators[key] = validation;
    }
    return state;
  }

  handleChange(parameter) {
    const { state, valueGetter } = this.props;
    const value = valueGetter(parameter);
    const newState = {
      ...state, value,
      dirty: state.dirty || (value !== state.value),
    };
    this.runValidators(newState);
    this.props.onChange(newState);
  }

  handleBlur() {
    const newState = {
      ...this.props.state,
      touched: true,
    };
    this.runValidators(newState);
    this.props.onChange(newState);
  }

  render() {
    return React.cloneElement(this.props.children, {
      ...this.props.children.props,
      // Always set the value to force react controlled input
      value: this.props.state.value,
      onChange: ::this.handleChange,
      onBlur: ::this.handleBlur,
    });
  }
}
