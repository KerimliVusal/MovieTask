import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Film from '../../components/films'
import SearchBar from '../../components/searchbar'
import '../tvshows/tvshows.scss'

function TvShowsPage() {
  const [Currentpage, SetCurrentpage] = useState(1)
  const data = useSelector(state => state.apidata['tv'])
  const [addnewItem, setAddnewItem] = useState([])
  const [addnewItems, setAddnewItems] = useState([])

  useEffect(() => {
    setAddnewItems(data);
  }, [])

  return (
    <div className="containers">
      <div className='moviespagetitle'>
        <p >MaileHereko</p>
        <h1>
          Tv Shows</h1>
      </div>
      <SearchBar setAddnewItem={setAddnewItem} setAddnewItems={setAddnewItems} />
      <p style={{ padding: '10px' }}>Total item: {addnewItems ? addnewItems.length : data.length}</p>
      <div className="row justify-content-around ">
        {data &&
          addnewItems.map((item, index) => (
            <div className='col-md-3' key={index}>
              <Film item={item} Currentpage={Currentpage} title={item.name} />
            </div>
          ))
        }
      </div>
    </div>


  )
}

export default TvShowsPage