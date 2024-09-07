import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {Provider} from "react-redux";
import store from "./store/store";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
            <Provider store={store}>
                <AppWrapper/>
            </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
