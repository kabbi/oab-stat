import React, { Children, Component, PropTypes } from 'react';
import { Breadcrumb, Pager, PageItem } from 'react-bootstrap';

import history from 'routes/history';

import css from './WizardView.scss';

export class WizardView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    routes: PropTypes.array.isRequired,
  };

  state = {
    routesStack: [],
    stateStack: [],
    currentPageState: {},
    disabledButtons: {},
  };

  getCurrentRoute() {
    const { routes } = this.props;
    return routes[routes.length - 1];
  }

  handleUpdateState(stateUpdate, callback) {
    this.setState(({ currentPageState }) => ({
      currentPageState: {
        ...currentPageState,
        ...stateUpdate,
      },
    }), callback);
  }

  handleDisableButtons(buttons) {
    this.setState({
      disabledButtons: {
        ...buttons,
      },
    });
  }

  handleGoForward() {
    const { currentPageState, routesStack, stateStack } = this.state;
    const { oabWizardParams: { title, nextPage } } = this.getCurrentRoute();
    this.setState({
      routesStack: [...routesStack, { title }],
      stateStack: [...stateStack, currentPageState],
    });
    history.push(nextPage);
  }

  handleGoBack(delta = 1) {
    const { routesStack, stateStack } = this.state;
    this.setState({
      routesStack: routesStack.slice(0, -delta),
      stateStack: stateStack.slice(0, -delta),
      currentPageState: stateStack[stateStack.length - delta],
    });
    history.go(-delta);
  }

  render() {
    const { children } = this.props;
    const child = Children.only(children);
    const { disabledButtons, currentPageState, routesStack } = this.state;
    const { oabWizardParams: { title, nextPage, prevPage } } = this.getCurrentRoute();
    return (
      <div>
        <div className={css.header}>
          <Breadcrumb>
            {routesStack.map((state, index) => (
              <Breadcrumb.Item
                key={index}
                onClick={this.handleGoBack.bind(this, routesStack.length - index)}
              >
                {state.title}
              </Breadcrumb.Item>
            ))}
              <Breadcrumb.Item active>
                {title}
              </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={css.bodyContainer}>
          <div className={css.bodyContent}>
            {React.cloneElement(child, {
              ...child.props,
              pageState: currentPageState,
              onDisableButtons: ::this.handleDisableButtons,
              onUpdateState: ::this.handleUpdateState,
              onGoForward: ::this.handleGoForward,
            })}
          </div>
        </div>
        <div className={css.footer}>
          <Pager>
            <PageItem
              disabled={!prevPage || disabledButtons.prev}
              onClick={this.handleGoBack.bind(this, 1)}
              previous
            >
              &larr; Назад
            </PageItem>
            <PageItem
              disabled={!nextPage || disabledButtons.next}
              onClick={::this.handleGoForward}
              next
            >
              Далее &rarr;
            </PageItem>
          </Pager>
        </div>
      </div>
    );
  }
}

export default WizardView;
