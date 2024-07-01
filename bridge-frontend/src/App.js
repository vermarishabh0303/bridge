import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenList from './components/TokenList/TokenList';
import QuoteForm from './components/QuoteForm/QuoteForm';
import './App.css';

const App = () => {
    return (
        <Router>
            <header>
                <h1>Bridge Application</h1>
            </header>
            <div className="container">
                <div className="App">
                    <Routes>
                        <Route path="/" element={<TokenList />} />
                        <Route path="/quote" element={<QuoteForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
