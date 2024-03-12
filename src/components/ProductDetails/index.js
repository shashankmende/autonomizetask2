import {Component} from 'react'

import './index.css'

class Details extends Component {
  state = {productDetails: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const options = {
      method: 'GET',
    }

    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      options,
    )
    const data = await response.json()
    console.log('data from book details', data)
    if (response.ok === true) {
      this.setState({
        productDetails: data,
      })
    }
  }

  render() {
    const {productDetails} = this.state
    const {image, title, description, category, price, rating} = productDetails
    let ratingOfProduct
    if (rating !== undefined) {
      ratingOfProduct = rating.rate
    }
    console.log('book details from render', ratingOfProduct)
    return (
      <>
        <div className="bg-container">
          <div className="main-container">
            <img src={image} alt={title} className="item_image" />

            <h1 className="title_detailed">{title}</h1>
            <div>
              <h2 className="detailed-heading">Description :</h2>
              <p className="description">{description}</p>
            </div>
            <div>
              <h3 className="detailed-heading">Category : {category}</h3>
              <h3 className="detailed-heading">Price: {price}</h3>
              <h3 className="detailed-heading">
                Rating: {rating !== undefined ? ratingOfProduct : ''}
              </h3>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Details
