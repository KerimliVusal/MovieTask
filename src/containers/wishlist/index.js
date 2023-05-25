import React from 'react'
import { useSelector } from 'react-redux';
import { Row,Col} from 'antd'
import '../wishlist/whishlist.scss'
import Card from '../../components/cart';
function WishlistPage() {
  const wishlist=useSelector(state=>state.apidata.wishlistdata);
  return (
    <div className='Wislistcontainer'>
       {
          wishlist.length?
        <div>
          <h1 className='page-title'>Your wishlist</h1>
              <Row gutter={[30,34]}> 
                {
                wishlist.map((film,index)=>(
                  <Col key={index}  xs={24} sm={12} md={8} lg={6}>
                  <Card movie={film}/>
                  </Col>
                ))
                }
            </Row> 
        </div>
        : 
        <h1 className='empty'>Your wishlist is empty</h1>}
    </div>
  )
}

export default WishlistPage