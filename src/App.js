import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MostStarredApps from './components/Counter'
import RepoDetails from './components/RepoDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={MostStarredApps} />
      <Route exact path="/:id" component={RepoDetails} />
    </Switch>
  </>
)

export default App
