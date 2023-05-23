import { Col, Row } from "antd"
import '../dashboard/dashboard.scss'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardPage=()=>{
        const suggestions=useSelector(state=>state.apidata.suggesteddata)
        const addnew=useSelector(state=>state.apidata.newitem)
        const manual=useSelector(state=>state.apidata.manualdata)
        const movies=useSelector(state=>state.apidata['movie'])
        const tv=useSelector(state=>state.apidata['tv'])
    return(<Row className="dashboard">
          <h1>Welcome</h1>
        <Col span={24}>
        <Row className="dashboarddata">
<Col span={6}><p>Movies <p>{movies?.length}</p></p></Col>
<Col span={6}><p>Tv Shows <p>{tv?.length}</p></p></Col>
<Col span={6} ><p>Suggestions <p>{suggestions?.length}</p></p>

</Col>
<Col span={6}><p>Manual Suggestions <p>{manual?.length}</p></p></Col>
        </Row>
        <h2>Quick Links</h2>
        <Row className="dashboardlinks">
            
<Col span={12}><p>Suggestions <p >{suggestions.map((item)=>(<Link to={`/containers/detail/${item.name?'tv':'movie'}/${item.id}`} style={{textDecoration:'none',color:'whitesmoke'}} ><span style={{display:'flex',flexDirection:'column'}}>{item.name?item.name:item.title}</span></Link>))}</p></p></Col>
<Col span={12}><p>Add <p >{addnew.map((item)=>(<Link to={`/containers/detail/${item.name?'tv':'movie'}/${item.id}`} style={{textDecoration:'none',color:'whitesmoke'}} ><span style={{display:'flex',flexDirection:'column'}}>{item.name?item.name:item.title}</span></Link>))}</p></p></Col>

        </Row>
        
        </Col>
    </Row>
    )
};export default DashboardPage