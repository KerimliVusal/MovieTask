import React from 'react'
import Film from '../../components/films'
import { useState,useEffect } from 'react'
import '../tvshows/tvshows.scss'
import SearchBar from '../../components/searchbar'
import { useSelector } from 'react-redux'

function TvShowsPage() {
  const [Currentpage,SetCurrentpage]=useState(1)
  const data=useSelector(state=>state.apidata['tv'])
  const [addnewItem,setAddnewItem]=useState([])
  const [addnewItems,setAddnewItems]=useState([])
 
  const scrolltop=()=>{
    window.scrollTo(0,0);
  }
  const PrevPage=(e)=>{
    e.preventDefault();
    if(Currentpage>1){
      SetCurrentpage(Currentpage-1);
    }
   scrolltop();  }

   const NextPage=(e)=>{
    e.preventDefault();
    if(Currentpage){
      SetCurrentpage(Currentpage+1);
    }
   scrolltop();  }

 

useEffect(()=>{
setAddnewItems(data);
},[])
  
  return ( <div>
     <div className="container">
    <div className='moviespagetitle'>
    <p >MaileHereko</p>
      <h1>
        Tv Shows</h1>
        </div>
      <SearchBar setAddnewItem={setAddnewItem} setAddnewItems={setAddnewItems}/>
      <p style={{padding:'10px'}}>Total item: {addnewItems ? addnewItems.length : data.length}</p>
    <div className="row justify-content-around ">
    { data&&
     addnewItems.map((item,index)=>(
      <div className='col-md-3' key={index}>
       <Film item={item} Currentpage={Currentpage} title={item.name} />
       </div>
     ))
   }
    </div>
  </div>
  </div>
      
  )
}

export default TvShowsPage