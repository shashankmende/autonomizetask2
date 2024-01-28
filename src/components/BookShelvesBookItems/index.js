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
          <p>
            <span className="rating-para">Avg Rating</span>{' '}
            {<BsFillStarFill color="yellow" />} {'  '} {book.rating}
          </p>
          <p>
            <span className="status-text">Status: </span>
            <span className="book-reading-status">{book.readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItems
