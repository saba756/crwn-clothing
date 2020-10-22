import React from 'react';
import {Switch,Route} from 'react-router-dom'
import './App.css';
import HomePage from  './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';
class App extends React.Component{
  constructor(){
    super();
    this.state={
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;
  componentDidMount() // it will call after the component is placed into the dom
  {
   this.unsubscribeFromAuth= auth.onAuthStateChanged(user => {
      this.setState({currentUser : user});
    console.log(user);
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() //The render() method is required, and is the method that actually outputs the HTML to the DOM.
  {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route  path="/shop" component={ShopPage}/>
        <Route  path="/signin" component={SignInAndSignUpPage}/>
        </Switch>
         
      </div>
    );
  }}
  


export default App;
