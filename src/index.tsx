/**
 * babel.config.jsonで
 * useBuiltIns: "usage"を指定（必要なpolyfillのみコンパイルに含める）場合、
 * 必ず1度だけimportしなければいけない
 */
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

/**
 * コンパイル後のJSが出すスタックトレースの行番号を
 * TypeScriptファイルの行番号に書き換えるための設定
 *
 * IE11のデバッグ時などのために記述
 * 参考URL: https://qiita.com/paranishian/items/2983560350169b42b666
 *
 * Warningが出るが原因・解決策など詳細不明
 * 参考: https://github.com/evanw/node-source-map-support/issues/155
 */
// import sourceMapSupport from 'source-map-support';
// sourceMapSupport.install();

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('contents'));
