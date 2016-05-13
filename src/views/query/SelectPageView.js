import React, { PropTypes } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Element, scroller } from 'react-scroll';

import AsyncComponent from 'components/common/AsyncComponent';
import LoadingIndicator from 'components/common/LoadingIndicator';

import Api from 'utils/Api';

export class SelectPageView extends AsyncComponent {
  static propTypes = {
    pageState: PropTypes.object,
    onUpdateState: PropTypes.func,
    onDisableButtons: PropTypes.func,
    onGoForward: PropTypes.func,
  };

  componentWillMount() {
    const { pageState: { categories, queries, selectedQuery }, onDisableButtons } = this.props;
    this.setState({
      categories: categories ? {
        result: categories,
      } : {},
      queries: queries ? {
        result: queries,
      } : {},
    });
    onDisableButtons({
      next: !selectedQuery,
    });
  }

  componentDidMount() {
    if (this.getStatus('categories').result) {
      return;
    }
    this.handlePromise('categories',
      Api.facade.queries.categories()
    ).then(categories => {
      this.props.onUpdateState({ categories });
    });
  }

  handleSelectCategory(selectedCategory) {
    const categoryId = selectedCategory.Id;
    this.props.onUpdateState({
      selectedCategory,
      selectedQuery: null,
    });
    this.props.onDisableButtons({
      next: true,
    });
    this.handlePromise('queries',
      Api.facade.queries.list({ categoryId })
    ).then(queries => {
      this.props.onUpdateState({ queries });
    });
    scroller.scrollTo('lists', {
      duration: 500,
      smooth: true,
    });
  }

  handleSelectQuery(selectedQuery) {
    this.props.onUpdateState({ selectedQuery });
    this.props.onDisableButtons({
      next: false,
    });
  }

  render() {
    const { selectedCategory, selectedQuery } = this.props.pageState;
    const { result: categories, pending: pendingCategories } = this.getStatus('categories');
    const { result: queries, pending: pendingQueries } = this.getStatus('queries');
    return (
      <Row>
        <Element name="lists" />
        <Col sm={6}>
          {pendingCategories && (
            <LoadingIndicator />
          )}
          {categories && (
            <div>
              <h4>Категории:</h4>
              <ListGroup>
                {categories.data.map(category => (
                  <ListGroupItem
                    key={category.Id}
                    header={category.Name}
                    active={selectedCategory && selectedCategory.Id === category.Id}
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
              <h4>Запрос:</h4>
              <ListGroup>
                {queries.data.map(query => (
                  <ListGroupItem
                    key={query.Id}
                    header={query.Name}
                    active={selectedQuery && selectedQuery.Id === query.Id}
                    onClick={this.handleSelectQuery.bind(this, query)}
                  >
                    {query.Description}
                    <small>
                      Параметры: <code>{query.Parameters || 'нет'}</code>
                    </small>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default SelectPageView;
