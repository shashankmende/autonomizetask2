import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const BookShelves = () => (
  <>
    <Header />
    <div className="book-shelves-bg-container">
      <div className="book-shelves">
        <div className="input-container">
          <input type="search" className="books-search" placeholder="Search" />
          <button type="button" className="search-button" testid="searchButton">
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    </div>
  </>
)

export default BookShelves
