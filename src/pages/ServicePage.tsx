import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const ServicePage = () => {
  return (
    <Container style={{ flex: '1 1 auto' }}>
      <Col className='service'>
        <Row className='serviceItem'>
          <Row>Terms of service</Row>
          <Row className='text'>
            The task of the organization, especially the course on a socially-oriented national
            project, requires a systematic analysis of the development model from us! Thus, the
            constant information and technical support of our activity requires us to analyze the
            system of large-scale changes in a number of parameters! On the other hand, social and
            economic development directly depends on comprehensively balanced newly introduced?
          </Row>
        </Row>
        <Row className='serviceItem'>
          <Row>Terms of delivery</Row>
          <Row className='text'>
            The task of the organization, especially the course on a socially-oriented national
            project, requires a systematic analysis of the development model from us! Thus, the
            constant information and technical support of our activity requires us to analyze the
            system of large-scale changes in a number of parameters! On the other hand, social and
            economic development directly depends on comprehensively balanced newly introduced?
          </Row>
        </Row>
        <Row className='serviceItem'>
          <Row>Return conditions</Row>
          <Row className='text'>
            The task of the organization, especially the course on a socially-oriented national
            project, requires a systematic analysis of the development model from us! Thus, the
            constant information and technical support of our activity requires us to analyze the
            system of large-scale changes in a number of parameters! On the other hand, social and
            economic development directly depends on comprehensively balanced newly introduced?
          </Row>
        </Row>
      </Col>
    </Container>
  )
}

export default ServicePage
