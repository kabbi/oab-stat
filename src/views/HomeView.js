import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { increment, doubleAsync } from 'redux/modules/counter';
import css from './HomeView.scss';

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync,
};

export const HomeView = props => (
  <div className="container text-center">
    <h1>Welcome to the React Redux Starter Kit</h1>
    <h2>
      Sample Counter:
      {' '}
      <span className={css['counter--green']}>{props.counter}</span>
    </h2>
    <button className="btn btn-default" onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className="btn btn-default" onClick={props.doubleAsync}>
      Double (Async)
    </button>
    <br />&nbsp;
    <Link className="btn btn-primary" to="/devcards">
      Go see some devcards
    </Link>
  </div>
);

HomeView.propTypes = {
  counter: PropTypes.number.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
