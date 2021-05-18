import React from 'react'
import { Card } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

const ScreenshotCarousel = (props) => {
  let carouselItems

  if (props.screenshots) {
    carouselItems = props.screenshots.map((screenshot) => {
      return(
        <Carousel.Item
          key={screenshot.id}
        >
          <Card.Img className="hack-tile-image" src={screenshot.url}/>
        </Carousel.Item>
      )
    })
  }

  return (
    <Carousel
      interval={null}
    >  
      {carouselItems}
    </Carousel>
  )
}

export default ScreenshotCarousel
