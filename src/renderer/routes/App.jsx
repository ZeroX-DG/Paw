import React, { Component } from 'react';
import {Router, Route, BrowserRouter} from 'react-router-dom';

import Layout from '../layout/layout.jsx';

import HomeRoute from './home-route/home-route.jsx';
import {ToastContainer} from 'react-toastify';
import 'animate.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <ToastContainer />
          <Route exact path='/' component={HomeRoute} />
        </Layout>
      </BrowserRouter>
    );
  }
}