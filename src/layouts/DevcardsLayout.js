import { Grid, Row, Col } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import css from './DevcardsLayout.css';

import DevcardsNavs from 'components/devcards/DevcardsNavs';

const DevcardsLayout = ({ route: { childRoutes }, children }) => (
  <Grid className={css.container}>
    <Row>
      <Col md={3}>
        <DevcardsNavs routes={childRoutes} />
      </Col>
      <Col md={9}>
        {children}
      </Col>
    </Row>
  </Grid>
);

DevcardsLayout.propTypes = {
  route: PropTypes.object.isRequired,
  children: PropTypes.element,
};

export default DevcardsLayout;
