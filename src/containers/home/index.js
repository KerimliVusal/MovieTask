import React, { useMemo } from 'react'
import Film from '../../components/films'
import Pagination from '../../components/pagination'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../home/home.scss'
import SearchBar from '../../components/searchbar'
import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, apidatatype } from '../../store/storeslices'

function Home() {
  const [valuetype, setValue] = useState('alldata');
  const [Currentpage, SetCurrentpage] = useState(1)
  const [addnewItem, setAddnewItem] = useState(null)
  const [addnewItems, setAddnewItems] = useState([])
  const type = useSelector(state => state.apidata.type)
  const alldata = useSelector(state => state.apidata['alldata'])
  const datas = useSelector(state => state.apidata[type])

  const dispatch = useDispatch()
  useEffect(() => {
    setAddnewItems(datas ?? [])
  }, [type])

  useEffect(() => {
    setAddnewItems(alldata);
  }, [alldata]);

  const scrolltop = () => {
    window.scrollTo(0, 0);
  }
  const PrevPage = (e) => {
    e.preventDefault();
    if (Currentpage > 1) {
      SetCurrentpage(Currentpage - 1);
    }
    scrolltop();
  }

  const NextPage = (e) => {
    e.preventDefault();
    if (Currentpage) {
      SetCurrentpage(Currentpage + 1);
    }
    scrolltop();
  }

  const ChangePage = (e, number) => {
    e.preventDefault();
    SetCurrentpage(number);
    scrolltop();
  }
  const onChange = ({ target: { value } }) => {
    setValue(value)
    dispatch(apidatatype(value))

  };
  const optionsWithDisabled = [
    {
      label: 'All',
      value: 'alldata',
    },
    {
      label: 'Movies',
      value: 'movie',
    },
    {
      label: 'Tv Shows',
      value: 'tv',

    },
  ];

  return (<div>
    <div className="container">
      <h1>MovieDB</h1>
      <p>List of Movies and Tv Shows,I ,<span style={{ color: '#8e0274' }}>Pramod Paudel</span> have watche till date.Explore what i have watched and feel free to make a suggestion 😉</p>
      <SearchBar setAddnewItem={setAddnewItem} setAddnewItems={setAddnewItems} />
      <div className='typeofmovies'>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange}
          value={valuetype}
          optionType="button"
          buttonStyle="solid"
          className='customradio'
        />
      </div>
      <p>Total item:{addnewItems && addnewItem?.length ? addnewItems?.length : 0}</p>
      <div className="row justify-content-around ">
        {addnewItems?.length == 0 ?
          <div style={{ textAlign: 'center' }}><h1>Sorry, couldn't find! 😥</h1></div> :
          addnewItems?.map((item, index) => (
            <div className='col-md-3' key={index}>
              <Film item={item} Currentpage={Currentpage} title={item.name ? item.name : item.title} />
            </div>
          ))
        }
      </div>
    </div>
  </div>

  )
}

export default Home