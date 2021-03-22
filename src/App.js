import React from 'react';
import {Switch,Route , Redirect} from 'react-router-dom'
import './App.css';
import {setCurrentUser} from './redux/user/user.action'
import {connect} from 'react-redux';
import HomePage from  './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';
import { auth , createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component{

  unsubscribeFromAuth = null;
  componentDidMount() // it will call after the component is placed into the dom
  {

        const{setCurrentUser}= this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          
            setCurrentUser ({
              id:snapShot.id,
              ...snapShot.data()
            })  
           });
           setCurrentUser(userAuth)
        }

      });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() //The render() method is required, and is the method that actually outputs the HTML to the DOM.
  {
    return (
      <div>
        <Header />
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route  path="/shop" component={ShopPage}/>
        <Route  exact path="/signin" render={()=> this.props.currentUser ? (
        <Redirect to="/" />) 
        : 
        (
        <SignInAndSignUpPage/>
        ) }
        />
        </Switch>
         
      </div>
    );
  }
}

const mapStateToProps = ({user}) =>({
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch =>({
setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps )(App);
