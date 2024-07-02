import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuoteForm from './components/QuoteForm/QuoteForm';
import Quotation from './components/Quotation/Quotation';
import TransactionParams from './components/TransactionParams/TransactionParams';
import Swap from './components/Swap/Swap'; 
import './App.css';

const App = () => {
    return (
        <div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<Swap />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;
