import { Nav, NavItem, Button } from 'react-bootstrap';


import React, { Component } from 'react';

import SidebarMenu from 'react-bootstrap-sidebar-menu';

const SidebarThreeMenu: React.FunctionComponent = () => {
    return (
        <>

            <div>

                <SidebarMenu variant='light' bg='light' hide='md' expand='lg' role='navigation' id='SidebarMenu'>

                    <SidebarMenu.Header as='h4' id='HeaderId'> Neader
                        {/* <SidebarMenu.Nav>
                      <SidebarMenu.Nav.Link href="#">Header</SidebarMenu.Nav.Link>
                      </SidebarMenu.Nav> */}
                    </SidebarMenu.Header>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Link href="#">Link 1</SidebarMenu.Nav.Link>
                    </SidebarMenu.Nav>

                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Link href="#">Link 2</SidebarMenu.Nav.Link>
                    </SidebarMenu.Nav>

                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Link href="#">Link 3</SidebarMenu.Nav.Link>
                    </SidebarMenu.Nav>

                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Link href="/">Link 4</SidebarMenu.Nav.Link>
                    </SidebarMenu.Nav>

                    <SidebarMenu.Nav.Item>Item</SidebarMenu.Nav.Item>
                    <SidebarMenu.Nav.Item>Item</SidebarMenu.Nav.Item>
                    <SidebarMenu.Nav.Item>Item</SidebarMenu.Nav.Item>
                    <SidebarMenu.Nav.Item>Item</SidebarMenu.Nav.Item>


                    <SidebarMenu.Toggle as='h5'> Items: </SidebarMenu.Toggle>
                    <SidebarMenu.Collapse getScrollValue='10'>
                        Some text here
                    </SidebarMenu.Collapse>
                    <SidebarMenu.Collapse getScrollValue='10'>
                        Some text here
                    </SidebarMenu.Collapse>
                    <SidebarMenu.Collapse getScrollValue='10'>
                        Some text here
                    </SidebarMenu.Collapse>
                    <SidebarMenu.Collapse getScrollValue='10'>
                    <SidebarMenu.Sub>
                        <SidebarMenu.Sub.Toggle as='p'>Sub Togge</SidebarMenu.Sub.Toggle>

                        <SidebarMenu.Sub.Collapse>Sub Collapse</SidebarMenu.Sub.Collapse>
                    </SidebarMenu.Sub>
                    </SidebarMenu.Collapse>

                    



                    <SidebarMenu.Brand href='/' bsPrefix='sidebar-menu-brand'>Brand Element</SidebarMenu.Brand>

                    <SidebarMenu.Footer>Footer here</SidebarMenu.Footer>


                </SidebarMenu>
            </div>
        </>
    )
}
export default SidebarThreeMenu;
