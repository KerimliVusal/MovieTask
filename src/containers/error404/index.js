import { Link } from 'react-router-dom';
import error from '../../assets/error.svg'
import '../error404/error.scss'
const ErrorPage = () => {
    return (<div className='errorpagecontainer'>
        <div><img src={error} /></div>
        <div>
            <h2>Lost Your Way?</h2>
            <p>
                Oops! This is awkward. You are looking for something that doesn't actually exist.
            </p>
            <Link to='/' style={{ textDecoration: 'none' }}> <span className='errorbtn' >Go Home</span></Link>
        </div>
    </div>)
}; export default ErrorPage