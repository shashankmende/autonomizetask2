import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
  invalid: 'INVALID',
}

class BookDetails extends Component {
  state = {bookDetails: '', apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books/${id}`,
        options,
      )
      const data = await response.json()
      console.log('data from book details', data)
      if (response.ok === true) {
        const newData = {
          aboutAuthor: data.book_details.about_author,

          aboutBook: data.book_details.about_book,

          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          id: data.book_details.id,
          title: data.book_details.title,
          readStatus: data.book_details.read_status,
          rating: data.book_details.rating,
        }
        console.log('new datt', newData)
        this.setState({
          bookDetails: newData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.fail,
        })
      }
    } catch (err) {
      this.setState({
        apiStatus: apiStatusConstants.invalid,
      })
    }
  }

  returnLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" size={32} />
    </div>
  )

  renderSuccessView = () => {
    const {bookDetails} = this.state
    return (
      <div>
        <div className="book-details-responsive-container">
          <div className="book-details-top-container">
            <img
              src={bookDetails.coverPic}
              alt={bookDetails.title}
              className="detailed_image"
            />
            <div className="text-container">
              <h1 className="book_details_heading">{bookDetails.title}</h1>
              <p className="book_details_author_name">
                {bookDetails.authorName}
              </p>
              <div className="rating-star-rating-container">
                <p className="rating">Avg Rating </p>
                <BsFillStarFill color="yellow" />

                <p>{bookDetails.rating}</p>
              </div>
              <div className="read-status-container">
                <p className="read-status">Status:</p>
                <p className="span-status">{bookDetails.readStatus}</p>
              </div>
            </div>
          </div>
          <hr className="horizontal-line" />

          <div className="book_details_bottom_container">
            <h1 className="about-author-heading">About Author</h1>
            <p className="about-author-para">{bookDetails.aboutAuthor}</p>

            <h1 className="about-book-heading">About Book</h1>
            <p className="about-author-para">{bookDetails.aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.returnLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.fail:
        return this.renderFailureView()
      default:
        return null
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

  renderFailureView = () => (
    <div className="book-details-failure-container">
      <img
        src="https://res.cloudinary.com/dvvhafkyv/image/upload/v1706264074/Group_7522something_went_wrong_raxwgw.png"
        alt="failure view"
        className="book_details_something_wrong_image"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="book_details_try_again"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {bookDetails} = this.state
    console.log('book details from render', bookDetails)
    return (
      <>
        <Header />
        <div className="book-details-bg-container">{this.renderResult()}</div>
      </>
    )
  }
}

export default BookDetails
