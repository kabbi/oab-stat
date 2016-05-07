import React from 'react';

import Code from 'components/devcards/Code';
import Devcard from 'components/devcards/Devcard';
import PropTypesDevcard from 'components/devcards/PropTypesDevcard';

const DEMO_OBJECT = {
  key: 'value',
  data: 42,
};

const DemoDevcards = () => (
  <div>

    <Devcard id="demo/warning">
      This is in another file just to showcase left navs menu.
      It is really cool, and autogenerates from your routes file.
    </Devcard>

    <Devcard id="demo/code">
      You can put some code in your devcards:
      <Code code={"console.log('Like this');"} />
    </Devcard>

    <Devcard id="demo/json">
      Or even json:
      <Code mode="json" code={JSON.stringify(DEMO_OBJECT, null, 2)} />
    </Devcard>

    <PropTypesDevcard
      id="demo/props"
      props={[
        ['value', 'string', 'The current input value'],
        ['onChange', 'function', (
          <span>
            Some callback, that will be invoked when input values changes.
            <br />
            Also, can render some markup here, like <code>highlights</code>, etc.
          </span>
        )],
      ]}
    >
      <p>
        And props (these are for {'<input/>'} react component):
      </p>
    </PropTypesDevcard>

  </div>
);

export default DemoDevcards;
