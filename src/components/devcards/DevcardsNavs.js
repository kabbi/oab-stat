import { ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';

import ListGroupItemLink from 'components/common/ListGroupItemLink';

const BASE_DEVCARDS_URL = '/devcards';

export default class DevcardsNavs extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  getRoutes(routes = this.props.routes, baseUrl = BASE_DEVCARDS_URL, list = [], level = 0) {
    for (const { path, childRoutes } of routes) {
      const leaf = !childRoutes || childRoutes.length === 0;
      const url = `${baseUrl}/${path}`;
      list.push({ leaf, url, level });
      if (!leaf) {
        this.getRoutes(childRoutes, url, list, level + 1);
      }
    }
    return list;
  }

  render() {
    return (
      <ListGroup>
        {this.getRoutes().map(({ leaf, url }) => (
          leaf ? (
            <ListGroupItemLink key={url} to={url}>
              {url.slice(BASE_DEVCARDS_URL.length)}
            </ListGroupItemLink>
          ) : (
            <ListGroupItem key={url} disabled>
              {url.slice(BASE_DEVCARDS_URL.length)}
            </ListGroupItem>
          )
        ))}
      </ListGroup>
    );
  }
}
