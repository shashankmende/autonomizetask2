import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Home extends Component {
  state = {data: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const result = await response.json()
    console.log('result =', result)
    if (response.ok === true) {
      this.setState({
        data: result,
      })
    }
  }

  render() {
    const {data} = this.state
    return (
      <ul className="bg-container">
        {data.map(each => {
          const {id, title, image} = each

          return (
            <Link to={`/product/${id}`}>
              <li key={id}>
                <img src={image} alt={title} className="item_image" />

                <h1 className="title">{title}</h1>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }
}

export default Home
