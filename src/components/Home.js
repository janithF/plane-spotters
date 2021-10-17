import React from 'react';
import FilterContent from './FilterContent';
import Header from './Header';
import List from './List';

const Home = () => {
    return (
        <div>
            <div className="container-fluid">
                <Header />
                <FilterContent />
                <List />
            </div>
        </div>
    );
};

export default Home;