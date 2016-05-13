import React, { PropTypes } from 'react';
import Select from 'react-select';

import { FormControlProps } from '../Form';
import ValidatedControl from '../ValidatedControl';
import AsyncComponent from 'components/common/AsyncComponent';

import Api from 'utils/Api';

export class ValidatedDropdownControl extends AsyncComponent {
  static propTypes = {
    dependencies: PropTypes.array,
    listId: PropTypes.string.isRequired,
    validators: PropTypes.object,
    ...FormControlProps,
  };

  static defaultProps = {
    dependencies: [],
  };

  componentWillMount() {
    this.resetStatus('options');
  }

  componentDidMount() {
    if (!this.isDisabled()) {
      this.fetchOptions();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { formState: nextFormState } = nextProps;
    const { formState: currentFormState, state, dependencies, onChange } = this.props;
    if (!state.value) {
      return;
    }
    // Reset input when any deps is changed
    for (const field of dependencies) {
      if (currentFormState[field].value !== nextFormState[field].value) {
        onChange({
          ...state,
          value: undefined,
        });
      }
    }
  }

  fetchOptions() {
    const { dependencies, formState, listId } = this.props;
    const params = dependencies.reduce((result, field) => {
      result[field] = formState[field].value;
      return result;
    }, {});
    this.handlePromise('options', Api.facade.lookup(params, { listId }));
  }

  isDisabled() {
    const { dependencies, formState } = this.props;
    for (const field of dependencies) {
      if (formState[field].value === undefined) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { validators, state, onChange } = this.props;
    const { result, pending } = this.getStatus('options');
    return (
      <ValidatedControl
        validators={validators}
        state={state}
        valueGetter={option => (
          option ? option.value : undefined
        )}
        onChange={onChange}
      >
        <Select
          placeholder="Нажмите для выбора элемента из списка"
          noResultsText="Ничего не найдено"
          options={result ? result.data : []}
          disabled={this.isDisabled()}
          onOpen={::this.fetchOptions}
          isLoading={pending}
          autoBlur
        />
      </ValidatedControl>
    );
  }
}

export default ValidatedDropdownControl;
