import logo from './logo.svg';
import './App.css';
import Home from './containers/home';
import { Navigate, Route, Router, Routes, useLocation } from 'react-router';
import NavigationBar from './components/navigationbar';
import ErrorPage from './containers/error404';
import LoginPage from './containers/loginpage';
import DetailPage from './containers/detail';
import SugestionPage from './containers/sugestion';
import MoviesPage from './containers/movies';
import TvShowsPage from './containers/tvshows';
import DashboardPage from './containers/dashboard';
import AddNewItem from './containers/addnewitem';
import { useEffect, useState } from 'react';
import Suggested from './containers/suggested';
import { useDispatch, useSelector } from 'react-redux';
import { Logindetail, fetchMovies } from './store/storeslices';
import Load from './components/loading';


function App() {
  const[loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  const isSignedIn=useSelector(state=>state.apidata.login)
  useEffect(()=>{
      dispatch(fetchMovies());
      const authToken = localStorage.getItem('Token');

      if (authToken) {
        // Dispatch an action to update the authentication state in Redux store
        dispatch(Logindetail(true));
      }
  },[])
  function Protected({ isSignedIn, children }) {
    if (!isSignedIn) {
      return <Navigate to="/" replace />
    }
    return children
  }

useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  },4000)
},[])
 
 
  return (
    <div className="App">
      {loading?
      <Load/>
      :<>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/containers/movies' element={<MoviesPage/>}/>
        <Route path='/containers/addnewitem'   element={<Protected isSignedIn={isSignedIn}><AddNewItem/></Protected>} />
        <Route path='/containers/tvshows' element={<TvShowsPage/>}/>
        <Route path='/containers/dashboard'   element={<Protected isSignedIn={isSignedIn}><DashboardPage/></Protected>} />
        <Route path='/containers/loginpage'  element={<LoginPage/>}/>
        <Route path='/containers/sugestion'  element={<SugestionPage/>}/>
        <Route path='/containers/sugested'   element={<Protected isSignedIn={isSignedIn}><Suggested/></Protected>}  />
        <Route path='/containers/detail/:type/:id' element={<DetailPage/>}/>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      </>}
    </div>
  );
}

export default App;
