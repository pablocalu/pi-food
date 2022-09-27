import './App.css';
import { BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
import RecipeDetail from './components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component= {LandingPage} />
      <Route exact path= '/recipes' component={Home} />
      <Route path= '/createrecipe' component={CreateRecipe} />
      <Route exact path='/recipes/:id' component={RecipeDetail}/>
    </div>
    </BrowserRouter>
  );
}

export default App;

