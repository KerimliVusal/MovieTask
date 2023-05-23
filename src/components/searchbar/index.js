
import '../searchbar/searchbar.scss'
import { SearcIcon } from '../icon';
import {  useSelector } from 'react-redux';

const SearchBar = ({ setAddnewItem, setAddnewItems = '', disableInputchage = false }) => {
  const type = useSelector(state => state.apidata.type)
  const data = useSelector(state => state.apidata[type])

  const handleInputChange = (e) => {
    e.preventDefault();
    setAddnewItem(e.target.value)
    const f = data?.filter(item => e.target.value ? (item.title?.toLowerCase().includes(e.target.value?.toLowerCase())) ||
      item.name?.toLowerCase().includes(e.target.value?.toLowerCase()) : item
    )
    setAddnewItem(e.target.value)
    if (!disableInputchage) setAddnewItems(f);

  }

  return (<>
    <div className='searchbarcontainer'>
      <span className='searchbaricon'><SearcIcon width='30px' height='25px' /></span>
      <span className='searchbarinput'>
        <input type='text'
          placeholder='Search Movies or Tv Shows'
          name='filteredvalue'
          onChange={(e) => handleInputChange(e)} />
      </span>
    </div>
  </>
  );
};
; export default SearchBar