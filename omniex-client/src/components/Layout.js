import React from 'react';
import Header from './common/Header';

const Layout = props => (
    <div className="layout">
        <Header />
        {props.children}
    </div>
);

export default Layout;