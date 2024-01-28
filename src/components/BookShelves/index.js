import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import './index.css'
import Tabs from '../BookShelvesTabs'
import BookItems from '../BookShelvesBookItems'
import Footer from '../Footer'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  fail: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    tabId: bookshelvesList[0].id,
    shelf: bookshelvesList[0].value,
    search: '',
    apiStatus: apiStatusConstants.inProgress,
    bookDetails: [],
    currentTabValue: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getData()
  }

  changeTabId = item => {
    this.setState(
      {
        tabId: item.id,
        shelf: item.value,
        currentTabValue: item.label,
      },
      this.getData,
    )
  }

  onChangeInput = event => {
    this.setState({
      search: event.target.value,
    })
  }

  onClickSearchButton = () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    this.getData()
  }

  onClickTryAgain = () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    this.getData()
  }

  getData = async () => {
    const {shelf, search} = this.state
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${search}`,
      options,
    )
    const data = await response.json()
    console.log('data', data)
    if (response.ok === true) {
      const newData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetails: newData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.fail,
      })
    }
  }

  returnLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={32} width={32} />
    </div>
  )

  renderSuccessView = () => {
    const {tabId, bookDetails, currentTabValue, search} = this.state
    return (
      <>
        <div className="success-view-responsive-container">
          <div>
            <div className="mobile-input-container">
              <input
                type="search"
                className="books-search"
                placeholder="Search"
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                className="search-button"
                testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="tabs-heading-container">
              <h1 className="bookshelves-heading">Bookshelves</h1>
              <div className="tabs-container">
                {bookshelvesList.map(each => (
                  <Tabs
                    key={each.id}
                    item={each}
                    isActive={each.id === tabId}
                    changeTabId={this.changeTabId}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="large-devices-right-container">
            <div className="large-devices-search-heading-container">
              <h1 className="tab-specific-heading">{currentTabValue} Books</h1>
              <div className="large-device-search-container">
                <input
                  type="search"
                  className="books-search"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                  value={search}
                />
                <button
                  type="button"
                  className="search-button"
                  testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {bookDetails.length === 0 && (
              <div className="empty-search-list">
                <img
                  src="
https://res.cloudinary.com/dvvhafkyv/image/upload/v1706263717/Asset_1_1Book_shelves_search_not_found_zj8aiu.png
"
                  alt="no result"
                  className="search-not-found-image"
                />
                <p className="search-text">
                  Your search for {search} did not find any matches.
                </p>
              </div>
            )}
            <ul className="unordered-list">
              {bookDetails.map(each => (
                <BookItems key={each.id} book={each} />
              ))}
            </ul>
            <Footer />
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => {
    const {tabId, currentTabValue} = this.state
    return (
      <>
        <div className="failure-bg-container">
          <div>
            <div className="mobile-input-container">
              <input
                type="search"
                className="books-search"
                placeholder="Search"
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                className="search-button"
                testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="tabs-heading-container">
              <h1 className="bookshelves-heading">Bookshelves</h1>
              <div className="tabs-container">
                {bookshelvesList.map(each => (
                  <Tabs
                    key={each.id}
                    item={each}
                    isActive={each.id === tabId}
                    changeTabId={this.changeTabId}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="failure-container">
            <div className="large-devices-search-heading-container">
              <h1 className="tab-specific-heading">{currentTabValue} Books</h1>
              <div className="large-device-search-container">
                <input
                  type="search"
                  className="books-search"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                />
                <button
                  type="button"
                  className="search-button"
                  testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>

            <div className="failure-image-heading-try-again-button-container">
              <img
                src="
                https://res.cloudinary.com/dvvhafkyv/image/upload/v1706264074/Group_7522something_went_wrong_raxwgw.png
                "
                alt="not found"
                className="not-found-image"
              />
              <p className="failure-para">
                Something went wrong. Please try again
              </p>

              <button
                type="button"
                className="bookshelves-try-again-button"
                onClick={this.onClickTryAgain}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  returnResult = () => {
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

  render() {
    return (
      <>
        <Header />
        <div className="book-shelves-bg-container">
          <div className="book-shelves">{this.returnResult()}</div>
        </div>
      </>
    )
  }
}

export default BookShelves
