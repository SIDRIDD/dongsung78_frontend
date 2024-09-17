import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store/store";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
            <Provider store={store}>
                <AppWrapper/>
            </Provider>
    </React.StrictMode>
);

reportWebVitals();
