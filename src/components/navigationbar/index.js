import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import '../navigationbar/navigation.scss'
import { apidatatype } from "../../store/storeslices";
import { useDispatch, useSelector } from "react-redux";
import { SignInIcon, SignOutIcon } from "../icon";
import { Logindetail } from "../../store/storeslices";
function NavigationBar() {
  const dispatch=useDispatch()
  const [fixed, Setfixed] = useState(false);
  const logindetail=useSelector(state=>state.apidata.login)
  const watchlist=useSelector(state=>state.apidata.watchlistdata)
  const wishlist=useSelector(state=>state.apidata.wishlistdata)
  window.addEventListener("scroll", () => {
    window.scrollY > 150 ? Setfixed(true) : Setfixed(false);
  });
  return (
    <div className={fixed ? "header fixed" : "header"}>
      <div className="header-inner">
        <Link to={"/"}>
          <img src={logo}  />
        </Link>
        <ul className="menuUl">
          {!logindetail?<>
           <li onClick={()=>dispatch(apidatatype('movie'))}>
            <NavLink to={"/containers/movies"}>Movies</NavLink>
          </li>
          <li onClick={()=>dispatch(apidatatype('tv'))}>
            <NavLink to={"/containers/tvshows"}>Tv Shows</NavLink>
          </li>
          <li>
            <NavLink to={"/containers/sugestion"}>Suggest me</NavLink>
          </li> 
          <li>
            <NavLink to={"/containers/wishlist"}>
              {wishlist?.length ? (
                <span className="counter" style={{textAlign:'center'}}>{wishlist?.length}</span>
              ) : (
                ""
              )}
              <i className="fa-solid fa-heart-pulse"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/containers/watchList"}>
              {watchlist?.length ? (
                <span className="counter" style={{textAlign:'center'}}>{watchlist?.length}</span>
              ) : (
                ""
              )}
              <i className="fa-solid fa-bookmark"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/containers/loginpage"}><SignInIcon width='24px' height='24px'fill='#fff'/></NavLink>
          </li>
          </>
          :<>
          <li>
            <NavLink to={"/containers/dashboard"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/containers/sugested"}>Suggestions</NavLink>
          </li>
          <li>
            <NavLink to={"/containers/addnewitem"}>Add</NavLink>
          </li>
          <li>
            <NavLink to={"/containers/wishlist"}>
              {wishlist?.length ? (
                <span className="counter" style={{textAlign:'center'}}>{wishlist?.length}</span>
              ) : (
                ""
              )}
              <i className="fa-solid fa-heart-pulse"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/containers/watchList"}>
              {watchlist?.length ? (
                <span className="counter" style={{textAlign:'center'}}>{watchlist?.length}</span>
              ) : (
                ""
              )}
              <i className="fa-solid fa-bookmark"></i>
            </NavLink>
          </li>
          <li onClick={()=>{dispatch(Logindetail(false));localStorage.clear()}}>
            <NavLink to={"/containers/home"}>
            <SignOutIcon width='24px' height='24px' fill='#fff'/>
            </NavLink>
          </li>
          </>
        }
        </ul>
      </div>
    </div>
  );
}

export default NavigationBar;