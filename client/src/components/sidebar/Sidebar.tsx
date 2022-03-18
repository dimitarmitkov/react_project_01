import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Container, Row, Col, Card } from 'react-bootstrap';


const SidebarMenu: React.FunctionComponent = () => {
  return (
    <>
      <Container fluid >
        <Row style={{ height: '100%' }}>
            <ProSidebar>
              <Menu iconShape="square">
                <MenuItem >Dashboard</MenuItem>
                <SubMenu title="Components">
                  <MenuItem>Component 1</MenuItem>
                  <MenuItem>Component 2</MenuItem>
                </SubMenu>
              </Menu>
            </ProSidebar>
        </Row>
      </Container>

    </>
  )
}
export default SidebarMenu;
