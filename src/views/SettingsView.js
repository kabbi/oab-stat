import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader,
} from 'react-bootstrap';

const DefaultConnectionString =
  'Data Source=HOSTNAME\\SQLEXPRESS;Initial Catalog=FenixOAB;Integrated Security=True';

export class SettingsView extends Component {
  state = {
    connectionString: '',
  };

  handleUpdateConnectionString({ target: { value: connectionString } }) {
    this.setState({ connectionString });
  }

  handleSetDefaultConnectionString() {
    const connectionString = DefaultConnectionString;
    this.setState({ connectionString });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { connectionString } = this.state;
    return (
      <div>
        <PageHeader>
          Настройки
        </PageHeader>
        <Form onSubmit={::this.handleSubmit} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Строка соединения:
            </Col>
            <Col sm={10}>
              <FormControl
                required
                type="text"
                value={connectionString}
                placeholder={DefaultConnectionString}
                title="Двойной счелчок для добавления образца"
                onChange={::this.handleUpdateConnectionString}
                onDoubleClick={::this.handleSetDefaultConnectionString}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary">
                  Сохранить
                </Button>
                <Button type="button" bsStyle="warning">
                  Отмена
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SettingsView;
