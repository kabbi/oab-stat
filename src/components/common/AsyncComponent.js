import { Component } from 'react';

export default class AsyncComponent extends Component {
  componentWillUnmount() {
    this.unmounted = true;
  }

  getStatus(path) {
    return this.state[path];
  }

  resetStatus(path) {
    this.setState({
      [path]: {},
    });
  }

  handlePromise(path, promise) {
    this.setState({
      [path]: {
        pending: true,
      },
    });

    return new Promise((resolve, reject) => {
      promise.then(result => {
        if (this.unmounted) {
          // Break the promise chain
          return;
        }
        this.setState({
          [path]: { result },
        }, () => {
          resolve(result);
        });
      }, error => {
        if (this.unmounted) {
          // Break the promise chain
          return;
        }
        this.setState({
          [path]: { error },
        }, () => {
          reject(error);
        });
      });
    });
  }
}
