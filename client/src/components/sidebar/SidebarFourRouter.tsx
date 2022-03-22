import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './sidebarFour.css';
import Users from '../Users';
import Tasks from '../Tasks';
import Hello from '../test_components/HelloWorld';

export default function SidebarFourRouter(params: string | {}) {
    if (params === '/tasks') {
        console.log(params);

        
    }

    return (
        <Router>

            <Routes>

                {/* < Route path="/users" element={<Users />} /> */}

                {/* < Route path="/helloMitko" element={<Hello name="Dimitar" />} /> */}

                < Route path="/tasks" element={<Tasks />} />

            </Routes>
        </Router>
    )


}