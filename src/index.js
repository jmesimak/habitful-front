import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import Routes from './routes';
import './index.css';
import 'milligram';

ReactDOM.render(
  <Routes history={hashHistory}/>,
  document.getElementById('root')
);
