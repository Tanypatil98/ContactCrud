import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddContactPage from './container/contact/contact.component';
import ContactHomeList from './container/List/list.component';
import HomePage from './container/Homepage.component';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

toast.configure();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Contact Details
        </p>
      </header>
      <HomePage />
      <Switch>
        <Route exact path='/add_contact' component={AddContactPage} />
        <Route path='/contact_list' component={ContactHomeList} />
        <Route path='/' render={() => {toast.info('Please Select Any One Of These Options',  
           {position: toast.POSITION.BOTTOM_CENTER});}} />
      </Switch>
    </div>
  );
}


export default App;