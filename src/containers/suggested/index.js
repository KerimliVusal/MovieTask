import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Film from '../../components/films'
import '../movies/movies.scss'
import '../suggested/suggested.scss'

function Suggested() {
  const [suggested, SetSuggested] = useState(true)
  const [addtomylist, setAddtomylist] = useState(true)
  const alldata = useSelector(state => state.apidata['alldata'])
  return (<div>
    <div className="container">
      <div className='moviespagetitle'>
        <p >MaileHereko</p>
        <h1>
          Suggested</h1>
      </div>
      <p style={{ padding: '10px' }}>{`Total item: ${alldata?.length}`}</p>
      <div className="row justify-content-around ">
        {alldata &&
          alldata?.map((item, index) => (
            <div className='col-md-3' key={index}>
              <Film item={item} title={item.title} suggested={suggested} addtomylist={addtomylist} />
            </div>
          ))
        }
      </div>
    </div>
  </div>

  )

}
export default Suggested