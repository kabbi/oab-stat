import React, { PropTypes } from 'react';

import AsyncComponent from 'components/common/AsyncComponent';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DataTable from 'components/common/DataTable';

import Api from 'utils/Api';

export class ResultsPageView extends AsyncComponent {
  static propTypes = {
    pageState: PropTypes.object,
    onUpdateState: PropTypes.func,
    onDisableButtons: PropTypes.func,
  };

  componentWillMount() {
    const { onDisableButtons } = this.props;
    this.resetStatus('results');
    onDisableButtons({
      next: true,
    });
  }

  componentDidMount() {
    const { pageState: { selectedQuery, parameters } } = this.props;
    this.handlePromise('results', Api.facade.queries.run(parameters, {
      queryId: selectedQuery.Id,
    }));
  }

  render() {
    const { result: results, pending: pendingResults } = this.getStatus('results');
    return (
      <div>
        {pendingResults && (
          <LoadingIndicator />
        )}
        {results && (
          <div>
            <h4>Результаты:</h4>
            <DataTable data={results.data} />
          </div>
        )}
      </div>
    );
  }
}

export default ResultsPageView;
