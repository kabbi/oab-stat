import React, { PropTypes } from 'react';

import Form from './Form';
import ValidatedFormGroup from './ValidatedFormGroup';
import DropdownControl from './controls/DropdownControl';

import { nonEmpty, required } from 'utils/Validators';

const FIELD_PROPS = {
  'ДатаНачала': {
    label: 'Дата начала:',
    helpBlock: `
      Будут взяты лишь исходные данные, дата которых больше либо равна указанной дате.
    `,
    validators: { nonEmpty },
  },
  'ДатаОкончания': {
    label: 'Дата окончания:',
    helpBlock: `
      Будут взяты лишь исходные данные, дата которых меньше либо равна указанной дате.
    `,
    validators: { nonEmpty },
  },
  'Обл': {
    label: 'Область назначения вызова:',
    helpBlock: `
      Фильтрация по области Республики Беларусь.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl listId="36b74326-1159-45c9-a369-5715b49c8541" {...props} />
    ),
  },
  'Район': {
    label: 'Район назначения вызова:',
    helpBlock: `
      Фильтрация по району в указанной выше области.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl
        dependencies={['Обл']}
        listId="c61d7561-19c9-4e61-9f3a-dc69e46f646f"
        {...props}
      />
    ),
  },
  'Подразделение': {
    label: 'Подразделение:',
    helpBlock: `
      Подразделение МЧС в указанном выше районе.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl
        dependencies={['Обл', 'Район']}
        listId="9e60db19-f93a-4bf8-958d-0c0bfe0c0711"
        {...props}
      />
    ),
  },
  'ТипЧС': {
    label: (
      <span>
        Тип <abbr title="Чрезвычайной Ситуации">ЧС</abbr>:
      </span>
    ),
    helpBlock: `
      Тип произошедшей чрезвычайной ситуации.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl
        listId="7eae7a29-f2fb-4a34-9b06-c1d343bc3a0b"
        {...props}
      />
    ),
  },
  'СпецТехники': {
    label: `
      Тип техники:
    `,
    helpBlock: `
      Специализация технических средств.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl
        listId="3a01093a-411f-4d85-bc34-b4a242243226"
        {...props}
      />
    ),
  },
  'КлассТехники': {
    label: `
      Класс техники:
    `,
    helpBlock: `
      Классификация технических средств.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl
        listId="3a01093a-411f-4d85-bc34-b4a242243226"
        {...props}
      />
    ),
  },
  'Должность': {
    label: `
      Должность:
    `,
    helpBlock: `
      Официальное название должности работников МЧС.
    `,
    validators: { required },
    renderControl: props => (
      <DropdownControl
        listId="b55f73f8-417c-4e46-9bdf-2078048734d2"
        {...props}
      />
    ),
  },
};

export const FormBuilder = ({ definition, header, footer, ...formProps }) => {
  if (!definition) {
    return null;
  }
  const fields = definition.split(',');
  return (
    <Form {...formProps} >
      {header}
      {fields.map(field => (
        <ValidatedFormGroup
          key={field}
          model={field}
          {...FIELD_PROPS[field]}
        />
      ))}
      {footer}
    </Form>
  );
};

FormBuilder.propTypes = {
  definition: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  ...Form.propTypes,
};

export default FormBuilder;
