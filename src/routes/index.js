import React from 'react';
import { Route } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import DevcardsLayout from 'layouts/DevcardsLayout';

import IntroDevcards from 'views/devcards/IntroDevcards';
import DemoDevcards from 'views/devcards/DemoDevcards';

import WizardView from 'views/WizardView';
import SettingsView from 'views/SettingsView';

import SelectPageView from 'views/query/SelectPageView';
import ParametersPageView from 'views/query/ParametersPageView';
import ResultsPageView from 'views/query/ResultsPageView';

export default () => (
  <Route path="/">
    <Route path="query" component={WizardView}>
      <Route
        path="select"
        component={SelectPageView}
        oabWizardParams={{
          title: 'Выбор запроса',
          nextPage: '/query/parameters',
        }}
      />
      <Route
        path="parameters"
        component={ParametersPageView}
        oabWizardParams={{
          title: 'Параметры',
          nextPage: '/query/results',
          prevPage: '/query/select',
        }}
      />
      <Route
        path="results"
        component={ResultsPageView}
        oabWizardParams={{
          title: 'Результаты',
          prevPage: '/query/parameters',
        }}
      />
    </Route>

    <Route component={CoreLayout}>
      <Route path="settings" component={SettingsView} />

      <Route path="devcards" component={DevcardsLayout}>
        <Route path="devcards">
          <Route path="intro" component={IntroDevcards} />
          <Route path="demo" component={DemoDevcards} />
        </Route>
      </Route>
    </Route>
  </Route>
);
