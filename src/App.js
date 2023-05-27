import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { ToastContainer } from "react-toastify";
import { Logindetail, fetchMovies } from './store/storeslices';
import Home from './containers/home';
import NavigationBar from './components/navigationbar';
import ErrorPage from './containers/error404';
import LoginPage from './containers/loginpage';
import DetailPage from './containers/detail';
import SugestionPage from './containers/sugestion';
import MoviesPage from './containers/movies';
import TvShowsPage from './containers/tvshows';
import DashboardPage from './containers/dashboard';
import AddNewItem from './containers/addnewitem';
import Suggested from './containers/suggested';
import Load from './components/loading';
import WatchlistPage from './containers/watchlist';
import WishlistPage from './containers/wishlist';
import './App.css';
import "react-toastify/dist/ReactToastify.css";




function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const isSignedIn = useSelector(state => state.apidata.login)
  const watclist = useSelector(state => state.apidata.watchlistdata)
  const wishlist = useSelector(state => state.apidata.wishlistdata);

  useEffect(() => {
    dispatch(fetchMovies());
    const authToken = localStorage.getItem('Token');

    if (authToken) {
      dispatch(Logindetail(true));
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
    localStorage.setItem('likeddata', JSON.stringify(wishlist));
    localStorage.setItem('saveddata', JSON.stringify(watclist));
  }, [watclist, wishlist])


  function Protected({ isSignedIn, children }) {
    if (!isSignedIn) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <div className="App">
      {loading ?
        <Load />
        : <>
          <NavigationBar />
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/containers/movies' element={<MoviesPage />} />
            <Route path='/containers/watchlist' element={<WatchlistPage />} />
            <Route path='/containers/wishlist' element={<WishlistPage />} />
            <Route path='/containers/addnewitem' element={<AddNewItem />} />
            <Route path='/containers/tvshows' element={<TvShowsPage />} />
            <Route path='/containers/dashboard' element={<Protected isSignedIn={isSignedIn}><DashboardPage /></Protected>} />
            <Route path='/containers/loginpage' element={<LoginPage />} />
            <Route path='/containers/sugestion' element={<SugestionPage />} />
            <Route path='/containers/sugested' element={<Suggested />} />
            <Route path='/containers/detail/:type/:id' element={<DetailPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </>}
    </div>
  );
}

export default App;
