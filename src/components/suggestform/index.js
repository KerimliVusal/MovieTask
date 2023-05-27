import { useState } from "react";
import { useDispatch } from "react-redux";
import { sugestManually } from "../../store/storeslices";
import { LinkIcon, MovieIcon } from "../icon"
import '../suggestform/suggestform.scss'



const SuggestForm = ({ suggestform, setSuggestform }) => {
  const [suggestvalue, setSuggestvalue] = useState([])
  const dispatch = useDispatch()

  const handleClose = () => {
    setSuggestform(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSuggestvalue((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(sugestManually(suggestvalue))

  }
  return (<>
    {suggestform && (
      <div className="suggestformcontainer">
        <div className='suggestionform'>
          <h1>Suggest something to watch</h1>
          <form onSubmit={handleSubmit}>
            <div className='suggestioninput'><MovieIcon width='24px' height='24px' fill=' rgb(222, 222, 222)' /> <input type='text' placeholder='movie title' onChange={handleInputChange} minLength={5} /></div>
            <div className='suggestioninput'><LinkIcon width='24px' height='24px' fill=' rgb(222, 222, 222)' /><input type='text' placeholder='Link (if available)' onChange={handleInputChange} minLength={5} /> </div>
            <div className='suggestionsubmitbutton'><button type="submit">Suggest</button></div>
          </form>
          <span className="close-btn" onClick={handleClose}>
            X
          </span>
        </div>
      </div>
    )} </>
  )
}; export default SuggestForm