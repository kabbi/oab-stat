import { Link } from 'react-router';
import React from 'react';

const ListGroupItemLink = props => (
  <Link className="list-group-item" activeClassName="active" {...props} />
);

export default ListGroupItemLink;
