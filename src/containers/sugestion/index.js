import SearchBar from "../../components/searchbar"
import '../sugestion/sugestion.scss'
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import Alert from "../../components/alertcomponent";
import SuggestForm from "../../components/suggestform";
import NotFound from "../../components/suggestform/notfound";
import { useSelector } from "react-redux";
import Film from "../../components/films";
const SugestionPage = () => {
  const [loadings, setLoadings] = useState([]);
  const [suggested, setSuggested] = useState(true);
  const [addnewItem, setAddnewItem] = useState(null);
  const [total, setTotal] = useState([]);
  const [addnewItems, setAddnewItems] = useState([]);
  const [suggestform, setSuggestform] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const alldata = useSelector(state => state.apidata['alldata'])



  const clickSearch = (index) => {
    const newItem = alldata?.filter(item => (item.title?.toLowerCase().includes(addnewItem?.toLowerCase())) ||
      item.name?.toLowerCase().includes(addnewItem?.toLowerCase())
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
  useEffect(()=>{
    if(addnewItems.length>0&&addnewItem?.length>0){
      setShowAlert(true)
    }
  },[addnewItems])
  return (<div className='sugestionpage'>
    <h1>Suggest me</h1>
    <p>I will really appericiate it if you take time to suggest me something good to watch.</p>
    <div className="sugestsearchfield">
      <SearchBar setAddnewItem={setAddnewItem} setAddnewItems={setAddnewItems} disableInputchage />
      <Button type="primary" loading={loadings[0]} onClick={() => clickSearch(0)} className="searchbutton">
        Search
      </Button></div>
    <div className="row justify-content-around ">
      {addnewItems &&
        addnewItems?.map((item, index) => (
          <div className='col-md-3' key={index} style={{ paddingTop: '20px' }}>
            <Film item={item} title={item.title} suggested={suggested} index={index} />
          </div>
        ))
      }
    </div>
    {addnewItem?.length == 0 && total == 0 || addnewItems?.length == 0 ? <NotFound /> : ''}
   <Alert showAlert={showAlert} setShowAlert={setShowAlert} />

    <div className="suggestmaually">
      <h3>Didin’t find the one you looking for?</h3>
      <Button type="primary" className="suggestmauallybtn" onClick={() => setSuggestform(true)}>Suggest manually</Button></div>

    <SuggestForm suggestform={suggestform} setSuggestform={setSuggestform} />
  </div>)
}; export default SugestionPage;