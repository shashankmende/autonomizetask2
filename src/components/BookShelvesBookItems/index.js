import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItems = props => {
  const {book} = props

  return (
    <Link to={`/books/${book.id}`}>
      <li className="list-item" key={book.id}>
        <img src={book.coverPic} alt="book" className="book-shelves-items" />
        <div className="books-text-container">
          <h1 className="book-item-heading">{book.title}</h1>
          <p className="book-item-para">{book.authorName}</p>
          <div className="rating-start-container">
            <p className="rating-para">Avg Rating</p>

            <BsFillStarFill color="yellow" />
            <p>{book.rating}</p>
          </div>
          <div className="reading-status-container">
            <p className="status-text">Status: </p>
            <p className="book-reading-status">{book.readStatus}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookItems
