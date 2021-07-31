import React, { useState } from 'react';
import { Nav, Row, Col } from 'react-bootstrap';

import './styles.css';

const Sidebar: React.FC = () => {
    let [activeWindow, setActiveWindow] = useState<string>(window.location.pathname);

    return (
        <Nav className="flex-column sidebar">
            <Nav.Link href="/">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-book icon"></i>
                    </Col>

                    <Col>
                        <p
                            className={`text ${activeWindow === '/' ? "active" : ""}`}
                        >Posts</p>
                    </Col>
                </Row>
            </Nav.Link>

            <Nav.Link href="/photos">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-camera-retro icon"></i>
                    </Col>

                    <Col>
                        <p
                            className={`text ${activeWindow === '/photos' ? "active" : ""}`}
                        >Photos</p>
                    </Col>
                </Row>
            </Nav.Link>
        </Nav>
    )
}

export default Sidebar;