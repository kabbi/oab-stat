import React, { Component, PropTypes } from 'react';

import FormBuilder from 'components/forms/FormBuilder';

export class ParametersPageView extends Component {
  static propTypes = {
    pageState: PropTypes.shape({
      selectedQuery: PropTypes.object,
      parameters: PropTypes.object,
    }),
    onUpdateState: PropTypes.func,
    onDisableButtons: PropTypes.func,
    onGoForward: PropTypes.func,
  };

  componentDidMount() {
    const { pageState: { selectedQuery }, onGoForward } = this.props;
    if (!selectedQuery.Parameters) {
      onGoForward();
    }
  }

  handleVerified(verified) {
    this.props.onDisableButtons({
      next: !verified,
    });
  }

  handleFormChange(parameters) {
    this.props.onUpdateState({ parameters });
  }

  render() {
    const { pageState: { selectedQuery, parameters } } = this.props;
    return (
      <div>
        <FormBuilder
          definition={selectedQuery.Parameters}
          initialState={parameters}
          onVerified={::this.handleVerified}
          onChange={::this.handleFormChange}
        />
      </div>
    );
  }
}

export default ParametersPageView;
