import React, { Children, Component, PropTypes } from 'react';

export const FormControlToken = Symbol('FormControlToken');

export const BoundFormControl = (clazz) => {
  clazz[FormControlToken] = true;
  return clazz;
};

export const DefaultControlState = {
  error: false,
  dirty: false,
  touched: false,
  validators: {},
};

export const FormControlProps = {
  formState: PropTypes.object,
  state: PropTypes.shape({
    touched: PropTypes.bool,
    dirty: PropTypes.bool,
    value: PropTypes.any,
    validators: PropTypes.object,
    error: PropTypes.bool,
  }),
  onChange: PropTypes.func,
};

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onVerified: PropTypes.func,
    initialState: PropTypes.object,
    className: PropTypes.string,
    controlProps: PropTypes.object,
  };

  static defaultProps = {
    initialState: {},
  };

  state = this.calculateInitialState();

  getDefaultControlState() {
    // Make new validators array to avoid ref leaking
    return {
      ...DefaultControlState,
      validators: {},
    };
  }

  getFormData() {
    return Object.keys(this.state).reduce((values, key) => {
      values[key] = this.state[key].value;
      return values;
    }, {});
  }

  submit() {
    const event = new Event('submit');
    this.refs.form.dispatchEvent(event);
  }

  hasErrors() {
    return Object.keys(this.state).reduce((error, key) => (
      this.state[key].error || error
    ), false);
  }

  forceShowErrors() {
    const { state } = this;
    for (const model of Object.keys(this.state)) {
      this.handleChildChange(model, {
        ...state[model],
        touched: true,
      });
    }
  }

  calculateInitialState(children = this.props.children, state = {}) {
    const { initialState } = this.props;
    Children.forEach(children, child => {
      if (!child) {
        return;
      }
      if (child.type && child.type[FormControlToken]) {
        const { model } = child.props;
        state[model] = this.getDefaultControlState();
        if (initialState) {
          state[model].value = initialState[model];
        }
      }
      if (child.props && child.props.children) {
        this.calculateInitialState(child.props.children, state);
      }
    });
    return state;
  }

  extendAllSupportedChildren(children = this.props.children) {
    return Children.map(children, (child, index) => {
      if (!child) {
        return child;
      }
      if (child.type && child.type[FormControlToken]) {
        const { model } = child.props;
        return React.cloneElement(child, {
          ...this.props.controlProps,
          onSubmit: this.handleSubmit.bind(this),
          onChange: this.handleChildChange.bind(this, model),
          state: this.state[model],
          formState: this.state,
          key: index,
        });
      }
      if (child.props && child.props.children) {
        return React.cloneElement(child, child.props,
          this.extendAllSupportedChildren(child.props.children));
      }
      return child;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.hasErrors()) {
      this.forceShowErrors();
      return;
    }
    if (this.props.onSubmit) {
      this.props.onSubmit(this.getFormData());
    }
  }

  handleChildChange(model, childState) {
    this.setState({
      [model]: childState,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.getFormData());
      }
      if (this.props.onVerified) {
        this.props.onVerified(!this.hasErrors());
      }
    });
  }

  render() {
    return (
      <form noValidate
        ref="form"
        action="#"
        onSubmit={::this.handleSubmit}
        className={this.props.className}
      >
        {this.extendAllSupportedChildren()}
      </form>
    );
  }
}
