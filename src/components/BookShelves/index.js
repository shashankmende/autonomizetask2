import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import './index.css'
import Tabs from '../BookShelvesTabs'

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
  }

  componentDidMount() {
    this.getData()
  }

  changeTabId = item => {
    this.setState(
      {
        tabId: item.id,
        shelf: item.value,
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
    }
  }

  render() {
    const {tabId, bookDetails, search, shelf, apiStatus} = this.state
    console.log('state parameters', tabId, search, shelf, apiStatus)
    return (
      <>
        <Header />
        <div className="book-shelves-bg-container">
          <div className="input-container">
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
      </>
    )
  }
}

export default BookShelves
