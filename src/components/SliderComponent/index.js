import {Component} from 'react'
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
      slidesToShow: 4,
      slidesToScroll: 3,
    }
    return (
      <>
        <div className="mobile-slider-container">
          <h1 className="top-mobile-heading"> Top Rated Books</h1>
          <Slider {...settings}>
            {bookDetails.map(each => {
              const {id, coverPic, title, authorName} = each

              return (
                <Link to={`/books/${id}`}>
                  <div key={id} className="individual-container">
                    <img src={coverPic} alt={title} className="slider-image" />
                    <h1 className="slider-heading">{title}</h1>
                    <h1 className="author-name">{authorName}</h1>
                  </div>
                </Link>
              )
            })}
          </Slider>
        </div>

        <div className="large-slider-container">
          <div className="heading-button-container">
            <h2 className="top-heading"> Top Rated Books</h2>
            <Link to="/shelf">
              <button type="button" className="slider-find-books-button">
                Find Books
              </button>
            </Link>
          </div>
          <Slider {...settings2}>
            {bookDetails.map(each => (
              <Link to={`/books/${each.id}`}>
                <div key={each.id} className="individual-container">
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="slider-image"
                  />
                  <h1 className="slider-heading">{each.title}</h1>
                  <h1 className="author-name">{each.authorName}</h1>
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
