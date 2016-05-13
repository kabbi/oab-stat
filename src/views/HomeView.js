import React from 'react';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Element, scroller } from 'react-scroll';

import AsyncComponent from 'components/common/AsyncComponent';
import DataTable from 'components/common/DataTable';
import LoadingIndicator from 'components/common/LoadingIndicator';
import FormBuilder from 'components/forms/FormBuilder';

import Api from 'utils/Api';

export class HomeView extends AsyncComponent {
  state = {
    selectedCategory: null,
    selectedQuery: null,
  };

  componentWillMount() {
    this.resetStatus('categories');
    this.resetStatus('queries');
    this.resetStatus('results');
  }

  componentDidMount() {
    this.handlePromise('categories', Api.facade.queries.categories());
  }

  handleSelectCategory(category) {
    const categoryId = category.Id;
    this.handlePromise('queries', Api.facade.queries.list({ categoryId }));
    this.setState({ selectedCategory: category }, () => {
      scroller.scrollTo('lists', {
        duration: 500,
        smooth: true,
      });
    });
  }

  handleSelectQuery(query) {
    this.setState({ selectedQuery: query }, () => {
      scroller.scrollTo('queryParams', {
        duration: 500,
        smooth: true,
      });
    });
  }

  handleSubmitQuery(parameters) {
    const { selectedQuery } = this.state;
    this.handlePromise('results', Api.facade.queries.run(parameters, {
      queryId: selectedQuery.Id,
    })).then(() => {
      scroller.scrollTo('results', {
        duration: 500,
        smooth: true,
      });
    });
  }

  render() {
    const { result: categories, pending: pendingCategories } = this.getStatus('categories');
    const { result: queries, pending: pendingQueries } = this.getStatus('queries');
    const { result: results, pending: pendingResults } = this.getStatus('results');
    const { selectedCategory, selectedQuery } = this.state;
    return (
      <div>
        <Element name="lists" />
        <Row className="hide">
          <Col sm={6}>
            {pendingCategories && (
              <LoadingIndicator />
            )}
            {categories && (
              <div>
                <h2>Категория запроса:</h2>
                <ListGroup>
                  {categories.data.map(category => (
                    <ListGroupItem
                      key={category.Id}
                      header={category.Name}
                      active={selectedCategory === category}
                      onClick={this.handleSelectCategory.bind(this, category)}
                    >
                      {category.Description}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            )}
          </Col>
          <Col sm={6}>
            {pendingQueries && (
              <LoadingIndicator />
            )}
            {queries && (
              <div>
                <h2>Запрос:</h2>
                <ListGroup>
                  {queries.data.map(query => (
                    <ListGroupItem
                      key={query.Id}
                      header={query.Name}
                      active={selectedQuery === query}
                      onClick={this.handleSelectQuery.bind(this, query)}
                    >
                      {query.Description}
                      <small>
                        Параметры: <code>{query.Parameters}</code>
                      </small>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            )}
          </Col>
        </Row>
        {selectedQuery && (
          <Row>
            <Col>
              <Element name="queryParams" />
              <h2>Параметры:</h2>
              <FormBuilder
                definition={selectedQuery.Parameters}
                onSubmit={::this.handleSubmitQuery}
                footer={!results && (
                  <Button
                    bsStyle="primary"
                    type="submit"
                    block
                  >
                    Выполнить
                  </Button>
                )}
              />
            </Col>
          </Row>
        )}
        {pendingResults && (
          <LoadingIndicator />
        )}
        {results && (
          <div>
            <Element name="results" />
            <h2>Результаты:</h2>
            <DataTable data={results.data} />
          </div>
        )}
      </div>
    );
  }
}

export default HomeView;
