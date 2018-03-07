import React, { Component } from 'react';
import {Router, Route, BrowserRouter} from 'react-router-dom';

import Layout from '../layout/layout.jsx';

import HomeRoute from './home-route/home-route.jsx';

import ModalList from '../components/modal/modal-list.jsx';
import {ToastContainer} from 'react-toastify';
import 'animate.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>

          <ToastContainer />
          <ModalList />

          <Route exact path='/' component={HomeRoute} />
          
        </Layout>
      </BrowserRouter>
    );
  }
}