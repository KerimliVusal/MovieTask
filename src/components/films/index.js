import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { MovieIcon, PlusIcon, StarIcon, ThumbsUpIcon } from '../icon/index'
import { Sugested, newAdded, sugestions } from '../../store/storeslices';
import HeartIcon from '../icon/hearticon';
import WatchlistIcon from '../icon/saveicon';
import { Addedlistmessage, Suggestedmessage } from '../../utils';
import '../skletion/skletion.scss'
import '../films/film.scss'
import '../cart/cart.scss'
import '../../containers/suggested/suggested.scss'

function Film({ item = [], suggested, title, addtomylist }) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const suggestions = useSelector(state => state.apidata.suggesteddata)
  const addnew = useSelector(state => state.apidata.newitem)
  const dispatch = useDispatch()
  const addToSuggested = (clickedItem) => {
    dispatch(Sugested(clickedItem))
    dispatch(sugestions(clickedItem))
    const watched = document.querySelector(`.liked${clickedItem.id}`)
    watched.style.visibility = 'visible'
    if (watched) {
      const liked = document.querySelector(`#id${clickedItem.id}`)
      liked.style.visibility = 'hidden'
      Suggestedmessage()
    }


  }
  const addToNewItem = (clickedItem) => {
    dispatch(newAdded(clickedItem))
    const added = document.querySelector(`#id${clickedItem.id}`)
    added.innerHTML = 'alerady added'
    added.style.color = 'green'
    Addedlistmessage()

  }
  useEffect(() => {
    if (item) {
      setImageLoaded(true)
      setLoading(false)
    }
  }, [item])
  useEffect(() => {
    localStorage.setItem('addedlist', JSON.stringify(addnew));
    localStorage.setItem('sugestlist', JSON.stringify(suggestions));
  }, [addnew, suggestions])
  return (<>
    <div className="MovieCard">
      {isLoading ? <Spin className="skeleton" />
        : <>
          <Link to={`/containers/detail/${item.name ? 'tv' : 'movie'}/${item.id}`} className="MovieCard-img">
            <span className="star">
            <i className="fa-regular fa-star"></i>
              {Number(item.vote_average).toFixed(1)}
            </span>
            {isImageLoaded && <img alt="example" width='220px' height='290px' src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />}
          </Link>
          {suggested ? <span className='suggesttionupicon' id={`id${item.id}`} onClick={() => addToSuggested(item)} style={{ paddingLeft: '10px' }}><ThumbsUpIcon width='22px' height='22px' fill='#7B6EF6' /><p style={{ color: '#7B6EF6', padding: '2px' }}>Suggest this</p></span> : ''}
          <span className={`liked${item.id}`} id='whached'><span><MovieIcon width='24px' height='24px' fill='green' /></span><p style={{ paddingLeft: '5px', color: 'green', whiteSpace: 'nowrap' }}>suggested for you!</p></span>
          {!suggested && addtomylist ? <span className='suggesttionupicon' id={`id${item.id}`} onClick={() => addToNewItem(item)}><PlusIcon width='22px' height='22px' fill='#7B6EF6' /><p style={{ color: '#7B6EF6', padding: '2px' }} className={`list${item.id}`}>Add to my list</p></span> : null}
          <HeartIcon movie={item} />
          <div className="MovieCard-text">
            <h4 className="Movie-title">
              {item?.title?.length > 15
                ? item?.title.slice(0, 15) + "..."
                : item?.title}        </h4>
            <WatchlistIcon movie={item} />
          </div>
        </>}
    </div>

  </>)
};

export default Film
