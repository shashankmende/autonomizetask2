import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './index.css'

class SimpleSlider extends Component {
  state = {bookDets: this.props}

  render() {
    const {bookDets} = this.state
    const {bookDetails} = bookDets
    console.log(bookDetails)
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 1,
    }

    const settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    }
    return (
      <>
        <div className="mobile-slider-container">
          <h2 className="top-mobile-heading"> Top Rated Books</h2>
          <Slider {...settings}>
            {bookDetails.map(each => (
              <Link to={`/books/${each.id}`}>
                <div key={each.id} className="individual-container">
                  <img
                    src={each.coverPic}
                    alt="book item"
                    className="slider-image"
                  />
                  <h1 className="slider-heading">{each.title}</h1>
                  <p className="author-name">{each.authorName}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>

        <div className="large-slider-container">
          <div className="heading-button-container">
            <h2 className="top-heading"> Top Rated Books</h2>
            <Link to="/shelf">
              <button type="button" className="slider-find-books-button">
                Find books
              </button>
            </Link>
          </div>
          <Slider {...settings2}>
            {bookDetails.map(each => (
              <Link to={`/books/${each.id}`}>
                <div key={each.id} className="individual-container">
                  <img
                    src={each.coverPic}
                    alt="book item"
                    className="slider-image"
                  />
                  <h1 className="slider-heading">{each.title}</h1>
                  <p className="author-name">{each.authorName}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </>
    )
  }
}

export default SimpleSlider
