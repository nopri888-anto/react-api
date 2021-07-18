import React from 'react';

import Navbar from './Navbar';

const MasterLayout = () => {

    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;