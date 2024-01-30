import React, { useState } from 'react'
import axios from 'axios'
import { Button, Container, Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import './App.css'
function App () {
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchRandomQuote = async () => {
    try {
      setLoading(true)

      const quoteResponse = await axios.get('https://api.quotable.io/random')

      setQuote(quoteResponse.data)
    } catch (error) {
      console.error('Error fetching quote or image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Random Quote Generator</h1>
      <Container className='vh-100 d-flex align-items-center justify-content-center'>
        <Row className='justify-content-center'>
          <Col lg='9' xl='7'>
            <Card className='bg-dark text-white card'>
              {loading && (
                <div className='loading-container'>
                  <div className='spinner'></div>
                </div>
              )}
                <Card.Text>
                  {!quote.content && (
                    <h2 >Click the button to view a random quote</h2>
                  )}
                  {quote.content && (
                    <>
                      <blockquote className='blockquote'>
                        <p className='lead font-italic'>{quote.content}</p>
                      </blockquote>
                      <p className='blockquote-footer'>~{quote.author}</p>
                    </>
                  )}
                </Card.Text>

                <Button
                  onClick={fetchRandomQuote}
                  variant='primary'
                  className='button'
                >
                  Get Random Quote
                </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
