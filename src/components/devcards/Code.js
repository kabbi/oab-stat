import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/solarized_light';
import 'brace/mode/javascript';
import 'brace/mode/json';

import { randomId } from 'utils/Random';

import css from './Code.scss';

export default class Code extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    mode: PropTypes.string,
  };

  static defaultProps = {
    mode: 'javascript',
  };

  componentWillMount() {
    this.id = randomId();
  }

  render() {
    const { code, mode } = this.props;
    return (
      <AceEditor readOnly
        name={this.id}
        mode={mode}
        value={code}
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        className={css.aceNoSelect}
        theme="solarized_light"
        width="100%" height="100" tabSize={2}
        minLines={1} maxLines={Infinity}
        editorProps={{
          $blockScrolling: true,
        }}
      />
    );
  }
}
