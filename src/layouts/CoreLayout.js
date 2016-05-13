import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const CoreLayout = ({ children }) => (
  <Grid>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Grid>
);

CoreLayout.propTypes = {
  children: PropTypes.element,
};

export default CoreLayout;
