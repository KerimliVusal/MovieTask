import React from 'react'
import Film from '../../components/films'
import { useState, useEffect } from 'react'
import '../movies/movies.scss'
import SearchBar from '../../components/searchbar'
import { useSelector } from 'react-redux'

function MoviesPage() {
  const [Currentpage, SetCurrentpage] = useState(1)
  const data = useSelector(state => state.apidata['movie'])
  const [addnewItem, setAddnewItem] = useState([])
  const [addnewItems, setAddnewItems] = useState([])

  const scrolltop = () => {
    window.scrollTo(0, 0);
  }


  const ChangePage = (e, number) => {
    e.preventDefault();
    SetCurrentpage(number);
    scrolltop();
  }

  useEffect(() => {
    setAddnewItems(data);
  }, [])


  return (<div>
    <div className="container">
      <div className='moviespagetitle'>
        <p >MaileHereko</p>
        <h1>
          Movies</h1>
      </div>
      <SearchBar setAddnewItem={setAddnewItem} setAddnewItems={setAddnewItems} />
      <p style={{ padding: '10px' }}>Total item: {addnewItems ? addnewItems.length : data.length}</p>
      <div className="row justify-content-around ">
        {data &&
          addnewItems.map((item, index) => (
            <div className='col-md-3' key={index}>
              <Film item={item} Currentpage={Currentpage} title={item.title} />
            </div>
          ))
        }
      </div>
    </div>
  </div>

  )
}

export default MoviesPage