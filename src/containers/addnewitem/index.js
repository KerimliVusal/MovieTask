import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import Film from '../../components/films';
import SearchBar from '../../components/searchbar';
import '../addnewitem/newitem.scss'
import '../../components/searchbar/searchbar.scss'

const AddNewItem = () => {
  const [loadings, setLoadings] = useState([]);
  const [total, setTotal] = useState([]);
  const [addtomylist, setAddtomylist] = useState(true);
  const [addnewitem, setAddnewItem] = useState();
  const [addnewitems, setAddnewItems] = useState([]);
  const alldata = useSelector(state => state.apidata['movie'])
  const enterLoading = (index) => {
    const newItem = alldata?.filter(item => (item?.title?.toLowerCase().includes(addnewitem?.toLowerCase())) ||
      item.name?.toLowerCase().includes(addnewitem?.toLowerCase())
    )
    setAddnewItems(newItem)
    setTotal(newItem.length)
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1500);
  }
  return (<>
    <div className="addnewitem">
      <h2> Add new item</h2>
      <div className='sugestsearchfield'>
        <SearchBar setAddnewItem={setAddnewItem} setAddnewItems={setAddnewItems} disableInputchage />
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)} className="searchbutton">
          Search
        </Button></div>
      {addnewitems.length > 0 ? <p style={{ color: '#fff', height: '50px', padding: '5px' }}>Total :{addnewitem.length == 0 && total ? total : addnewitems.length}</p> : null}
      <div className="row justify-content-around ">
        {addnewitems?.map((item, index) => (
          <div className='col-md-3 addfilms' key={index}>
            <Film item={item} title={item.title} addtomylist={addtomylist} />
          </div>
        ))}

      </div>
    </div>
  </>)
}; export default AddNewItem