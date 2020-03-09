import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut, removeSession } from '../actions/users';
import { Button, Col, Nav, Navbar, Row } from 'react-bootstrap';

class Header extends PureComponent {    

    handleLogOut = () => {
        const { removeSession, logOut } = this.props;
        removeSession();
        logOut();
    };

    render() {
        const { session } = this.props;
        
        return (            
              <div className="header">                    
                    {
                        session ?
                        <React.Fragment>
                            <Navbar expand="lg">
                                <Link to="/inventory" className="brand">Core Inventory</Link>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Link className="nav-link" to="/inventory">View inventory</Link>
                                    <Link className="nav-link" to="/categories">Categories</Link>
                                    <Link className="nav-link" to="/create-item">Create item</Link>                    
                                    </Nav>                    
                                    <Button variant="outline-primary" onClick={this.handleLogOut}>Log Out</Button>                    
                                </Navbar.Collapse>
                            </Navbar>
                        </React.Fragment> :
                        <Row className="header-logged-out">            
                            <Col xs={12} className="brand">   
                                <h1>Core Inventory</h1>
                            </Col>  
                        </Row>
                    }                                                               
            </div>             
        );
    }    
}

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.UserReducer.session
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logOut: () => dispatch(logOut),
        removeSession: () => dispatch(removeSession)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);