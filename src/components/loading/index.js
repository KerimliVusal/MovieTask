import '../../components/loading/loading.scss'
import loadimg from '../../assets/load2.gif'
const Load=()=>{
    return(<div className='loa'>
            <h1 className='animate'>
            <div><img src={loadimg}  alt="gif loadergi" className='img'/></div>
               <div>Movies . . .</div></h1>
    </div>
    )
};export default Load