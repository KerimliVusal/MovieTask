import React, { useEffect } from 'react'
import {  Card, Spin } from 'antd';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import '../skletion/skletion.scss'
import '../films/film.scss'
import '../../containers/suggested/suggested.scss'
import {MovieIcon, PlusIcon, StarIcon, ThumbsUpIcon} from '../icon/index'
import { useDispatch, useSelector } from 'react-redux';
import { Suggested, newAdded, sugestions } from '../../store/storeslices';
const { Meta } = Card;
function Film({item,suggested ,title,addtomylist}) {
    const [isImageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const dispatch=useDispatch()
    const addToSuggested = (clickedItem) => {
      dispatch(Suggested(clickedItem))
      dispatch(sugestions(clickedItem))
      const watched=document.querySelector(`.liked${clickedItem.id}`)
       watched.style.visibility='visible'
       if(watched){
        const liked=document.querySelector(`#id${clickedItem.id}`)
        liked.style.visibility='hidden'
       }
     

    }
    const addToNewItem = (clickedItem) => {
      dispatch(newAdded(clickedItem))

     
    }
  useEffect(()=>{
if(item){
    setImageLoaded(true)
    setLoading(false)
}
  },[item])
  return (<>
   <Link  to={!suggested&&!addtomylist? `/containers/detail/${item.name?'tv':'movie'}/${item.id}`:''} style={{textDecoration:'none'}}>
      <Card className={`cart-item ${isImageLoaded ? 'loaded' : ''}`} >
       
      {isLoading && <Spin className="skeleton" />}
      {isImageLoaded && <img alt="example" width='220px' height='290px' src={`https://image.tmdb.org/t/p/original/${item.poster_path}` }/> }
   {isImageLoaded &&  <Meta title={title} className="custom-meta" />}
   {isImageLoaded &&  <span className='stariconposition'><StarIcon fill='gold' width='22px' height='22px'/><span>{item.vote_average}</span></span>
}
{suggested? <span className='suggesttionupicon' id={`id${item.id}`} onClick={()=>addToSuggested(item)} style={{paddingLeft:'10px'}}><ThumbsUpIcon width='22px' height='22px' fill='#7B6EF6' /><p style={{color:'#7B6EF6',padding:'2px'}}>Suggest this</p></span>:''}
<span className={`liked${item.id}`} id='whached'><span><MovieIcon width='24px' height='24px' fill='green'/></span><p style={{paddingLeft:'5px',color:'green',whiteSpace:'nowrap'}}>alerady watched</p></span>
{!suggested&&addtomylist? <span className='suggesttionupicon' onClick={()=>addToNewItem(item)}><PlusIcon width='22px' height='22px' fill='#7B6EF6' /><p style={{color:'#7B6EF6',padding:'2px'}}>Add to my list</p></span>:null}

    </Card>
    
    </Link>
    
      </>)
};

export default Film
