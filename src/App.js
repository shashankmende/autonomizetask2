import './App.css'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'

import Details from './components/ProductDetails'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/product/:id" component={Details} />
  </Switch>
)

export default App
