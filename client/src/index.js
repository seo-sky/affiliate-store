import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import './css/404.css'
import App from './App.js';
import Admin from './components/Admin.js';
import AdminPanel from './components/AdminPanel.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App /> } />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


function PageNotFound() {
  return (

	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404"></div>
			<h1>404</h1>
			<h2>Oops! Page Not Be Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<a href="/">Back to homepage</a>
		</div>
	</div>

  );

  
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
