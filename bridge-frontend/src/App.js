import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuoteForm from './components/QuoteForm/QuoteForm';
import Quotation from './components/Quotation/Quotation';
import TransactionParams from './components/TransactionParams/TransactionParams'
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
                        <Route path="/" element={<QuoteForm />} />
                        <Route path="/quotation" element={<Quotation />} />
                        <Route path="/transactionParams" element={<TransactionParams />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
