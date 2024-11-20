import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Routes = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Header></Header>
           
            <Outlet></Outlet>
           
        </div>
    );
};

export default Routes;