import React, { Component, PropTypes } from 'react';
import { Glyphicon, Table } from 'react-bootstrap';

export const SortOrder = {
  Ascending: -1,
  Descending: 1,
};

const SortIcons = {
  [SortOrder.Ascending]: 'chevron-up',
  [SortOrder.Descending]: 'chevron-down',
};

export class DataTable extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.object.isRequired
    ).isRequired,
  };

  state = {
    sortField: null,
    sortOrder: SortOrder.Ascending,
  }

  getSortedData() {
    const { sortField, sortOrder } = this.state;
    const { data } = this.props;
    if (!sortField) {
      return data;
    }
    return this.props.data.sort((row0, row1) => (
      this.compareValues(row0[sortField], row1[sortField]) * sortOrder
    ));
  }

  compareValues(value0, value1) {
    if (typeof value0 === 'string' || typeof value1 === 'string') {
      const stringValue0 = value0.toString().trim().toLowerCase();
      const stringValue1 = value1.toString().trim().toLowerCase();
      return stringValue1.localeCompare(stringValue0);
    }
    return value1 - value0;
  }

  handleToggleSort(field, event) {
    event.preventDefault();
    const { sortField, sortOrder } = this.state;
    this.setState({
      sortField: field,
      sortOrder: (sortField === field) ?
        sortOrder * -1 : SortOrder.Ascending,
    });
  }

  render() {
    const { data } = this.props;
    const { sortField, sortOrder } = this.state;
    if (!data.length) {
      return (
        <Table>
          <tbody>
            <tr>
              <td className="text-center">
                <strong>Извините, ничего не найдено</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      );
    }
    const columns = Object.keys(data[0]);
    return (
      <Table>
        <thead>
          <tr>
          {columns.map(column => (
            <th key={column}>
              <a href="" onClick={this.handleToggleSort.bind(this, column)}>
                {column}{' '}
                <small style={{ visibility: column === sortField ? 'visible' : 'hidden' }}>
                  <Glyphicon glyph={SortIcons[sortOrder]} />
                </small>
              </a>
            </th>
          ))}
          </tr>
        </thead>
        <tbody>
          {this.getSortedData().map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column}>
                  {row[column] || (
                    <em>(не указано)</em>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default DataTable;
