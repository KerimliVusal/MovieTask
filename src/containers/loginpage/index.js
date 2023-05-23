import login from '../../assets/login.svg'
import '../loginpage/login.scss'
import {useState} from 'react'
import {MailIcon, PasswordIcon, VisibilityIcon} from '../../components/icon/index'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Logindetail } from '../../store/storeslices'
import { useNavigate } from 'react-router'

const LoginPage=()=>{
    const [passwordVisible, setPasswordVisible] = useState(false);
    const[loginvalue,setLoginvalue]=useState()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const NavigateToDashboard=()=>{
       dispatch(Logindetail(true))
    localStorage.setItem('Token',JSON.stringify(loginvalue))
    navigate('/containers/dashboard')
    }
    const handleInputChange = (event) => {
        const { name, value }= event.target;
        setLoginvalue((prevState) => ({ ...prevState, [name]: value }));
      };
    const handleSubmit=async (event)=>{
event.preventDefault()
try {
    const response = await axios.post(
      'https://api.themoviedb.org/3/authentication/guest_session/new',

      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );


    if (response.data && response.data.success) {
      
      console.log('Guest session created successfully');
     
    } else {
      console.log('Authentication failed');
    }
  } catch (error) {
    console.error('Error during authentication:', error);
  }
  finally{
    NavigateToDashboard()

  }
  
};
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    return(<div className='loginpagecontainer'>
        <div className='loginimage'><img src={login} width='350px'/></div>
        <div className='loginform'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
           <div className='logininput'><MailIcon width='24px' height='24px' fill=' rgb(222, 222, 222)' /> <input type='email' placeholder='email'   minLength={5} name='email' onChange={handleInputChange}/></div>
           <div className='logininput'><PasswordIcon width='24px' height='24px' fill=' rgb(222, 222, 222)'/> <input type={passwordVisible ? 'text' : 'password'} placeholder='password'   minLength={5} name='password' onChange={handleInputChange}/><VisibilityIcon width='24px' height='24px' fill=' rgb(222, 222, 222)' onClick={togglePasswordVisibility}/></div>
           <div className='loginsubmitbutton'><button type='submit'>Login</button></div>
           </form>
        </div>
    </div>)
};export default LoginPage