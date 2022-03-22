import React from 'react';
// import { BrowserRouter as  useHref } from 'react-router-dom';

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './sidebarFour.css';
import Users from '../Users';
import Tasks from '../Tasks';
import Hello from '../test_components/HelloWorld';
import SidebarFourRouter from './SidebarFourRouter';
import { AnyRecord } from 'dns';



function HrefCall (props: any){

}

export default function SidebarFour() {
    return (
        <>
            <Navigation
                // you can use your own router's api to get pathname
                activeItemId="/tasks"
                onSelect={({ itemId }) => {
                    // maybe push to the route

                    // console.log(itemId);

                    
                    HrefCall(itemId);
                }}
                items={[
                    {
                        title: 'Tasks',
                        itemId: '/tasks',
                        // you can use your own custom Icon component as well
                        // icon is optional
                        // elemBefore: () => <Icon name="inbox" />,
                    },
                    {
                        title: 'Users',
                        itemId: '/users',
                        // elemBefore: () => <Icon name="users" />,
                        subNav: [
                            {
                                title: 'Users',
                                itemId: '/users',
                            },
                            {
                                title: 'Tasks',
                                itemId: '/tasks',
                            },
                        ],
                    },
                    {
                        title: 'Another Item',
                        itemId: '/another',
                        subNav: [
                            {
                                title: 'Teams',
                                itemId: '/management/teams',
                            },
                        ],
                    },
                ]}
            />


        </>
    );
}

