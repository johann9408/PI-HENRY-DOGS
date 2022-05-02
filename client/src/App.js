import './App.css';
import {  Route } from 'react-router-dom'
import  Landing  from './components/Landing'
import PagePrincipal from './components/PagePrincipal'

function App() {
  return (
    <div className="App">
     
    <Route exact path='/' component = {Landing} />
    <Route path= '/Home' component = {PagePrincipal} />
     
    </div>
  );
}

export default App;
