import {Component} from 'react'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import SimpleSlider from '../SliderComponent'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Home extends Component {
  state = {bookDetails: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const token = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      options,
    )
    const data = await response.json()

    if (response.ok === true) {
      const responseData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))

      this.setState({
        bookDetails: responseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.fail,
      })
    }
  }

  onClickTryAgain = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.inProgress,
      },
      this.getData,
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = bookDetails => (
    <div className="success-container">
      <div className="home-container">
        <h1 className="find-book-heading">Find Your Next Favorite Books?</h1>
        <p className="books-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/shelf">
          <button type="button" className="find-books-button">
            Find books
          </button>
        </Link>
      </div>
      <div>
        <SimpleSlider bookDetails={bookDetails} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="home-container">
        <h1 className="find-book-heading">Find Your Next Favorite Books?</h1>
        <p className="books-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/shelf">
          <button type="button" className="find-books-button">
            Find books
          </button>
        </Link>
      </div>
      <div className="failure-bg-container">
        <div className="failure-heading-button-container">
          <h1 className="failure-heading">Top Rated Books</h1>
          <Link to="/shelf">
            <button type="button" className="desktop-find-books-button">
              Find books
            </button>
          </Link>
        </div>
        <img
          src="
https://res.cloudinary.com/dvvhafkyv/image/upload/v1706264074/Group_7522something_went_wrong_raxwgw.png
"
          alt="failure view"
          className="wrong-image"
        />
        <p className="error-para">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again-button"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  returnHome = () => {
    const {apiStatus, bookDetails} = this.state
    console.log('book details=', bookDetails)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView(bookDetails)
      case apiStatusConstants.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="home-bg-container">{this.returnHome()}</div>
      </>
    )
  }
}

export default Home
