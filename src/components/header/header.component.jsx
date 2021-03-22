import React from 'react';
import {Link} from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import {ReactComponent as Logo} from '../../assests/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component'
import { connect } from 'react-redux'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './header.styles.scss';
const Header =({currentUser , hidden}) =>(
    <div className="header"> 
        <Link  className="logo-container" to="/">
        <Logo className="logo"/>
    </Link>
    <div className="options">
        <Link className="option" to="/shop">
            SHOP
            </Link>
            <Link className="option" to="/shop">
             CONTACT
            </Link>
            {
                currentUser ? (
                <div className="option" onClick={()=>auth.signOut()}>SIGN OUT</div> )
                :
                (<Link className="option" to="/signin">  Sign In</Link>)
            }
            <CartIcon/>
    </div>
    {
        hidden ? null :
             <CartDropdown/>
    }
   
    </div>
  
);
const mapStateToProps = ({user: {currentUser} , cart :{hidden}}) =>({
currentUser,
hidden
});
export default connect(mapStateToProps)(Header);