import React from 'react'
import { Row, Col } from 'react-bootstrap';

export default class Tests extends React.Component {
    render() {
        return (
            <Row>
                <Col md={6}>
                    <h2>Test private page</h2>
                    <p>
                        This is test privte page.
                    </p>
                </Col>
            </Row>
        )
    }
}


