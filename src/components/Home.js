import React from 'react';
import { Route } from 'react-router-dom';
import FilterContent from './FilterContent';
import FormModal from './FormModal';
import Header from './Header';
import List from './List';

const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <FilterContent />
                <List />
            </div>

        </>
    );
};

export default Home;