
import validator from 'validator'
import {useState} from 'react'
import bcrypt from 'bcryptjs';

function LogedIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [entries , setEntries] = useState([])
    
    const handleEmail = (email)=> {
      return validator.isEmail(email)
    }
    
    const handleSubmit = (e)=> {
      e.preventDefault();
      if(email && password){
      if (!handleEmail(email)){
        alert('Invalid Email Format!')
      }
      else if(password.length < 6){
         alert('Password should be atleast 6 characters long')
      }
      else {
        const hashedPassword = bcrypt.hashSync(password , 10)
        
    const newEntry = {id: new Date().getTime().toString() , email , password: hashedPassword}
    setEntries([...entries , newEntry])
    
    console.log(entries)
     setEmail('')
     setPassword('')
    alert('Successfully Logged In')
    
    }
}
    else{
      alert('Please fill all the fields!')
    }
    }
    return(
   <>
   <div className='login'>
     
   <h1>Login</h1>
      <form  className="form" onSubmit={handleSubmit} >
     
        <div className='field'>
        <label htmlFor='email'>Email: </label>
        <input type="email" autoComplete='off' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className='field'>
        <label htmlFor='password'>Password: </label>
        <input type="password" min-length="6" autoComplete='off' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div className='button'>
        <button>Login</button>
        </div>
      </form>
      
   </div>
   
   </>
    )
}

export default LogedIn;