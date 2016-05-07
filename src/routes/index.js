import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import DevcardsLayout from 'layouts/DevcardsLayout';

import IntroDevcards from 'views/devcards/IntroDevcards';
import DemoDevcards from 'views/devcards/DemoDevcards';

import HomeView from 'views/HomeView';

export default () => (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView} />

    <Route path="devcards" component={DevcardsLayout}>
      <Route path="devcards">
        <Route path="intro" component={IntroDevcards} />
        <Route path="demo" component={DemoDevcards} />
      </Route>
    </Route>
  </Route>
);
