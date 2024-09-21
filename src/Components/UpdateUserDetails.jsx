import { useState } from "react";
import axios from 'axios'

const UpdateUserDetails = () => {
  const [emailInput, setEmailInput]= useState('');
  const [passwordInput, setPasswordInput]= useState('');
  const [secondaryPasswordInput, setSecondaryPasswordInput]= useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  
  const changeEmail = async(event) => {
    event.preventDefault();
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/change-email`, {newEmail: emailInput},
        config
        );
        console.log(response.data);
      }catch(err) {
        if (axios.isAxiosError(err)) {
          console.error('Axios error:', err.response?.data || err.message);
        } else {
          console.error('Unexpected error:', err);
        }
      }
    }

  const onPasswordUpdate = (status) => {
    setPasswordUpdated(status);
    setTimeout(() => {
      setPasswordUpdated(false);
    }, 3000);
  };
    
  const changePW = async(event) => {
    event.preventDefault();
    if(passwordInput === secondaryPasswordInput){
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/change-pw`, {newPassword: passwordInput}, config);
        console.log(response.data);
        onPasswordUpdate(true);
      }catch(err) {
        if (axios.isAxiosError(err)) {
          console.error('Axios error:', err.response?.data || err.message);
        } else {
          console.error('Unexpected error:', err);
        }
        onPasswordUpdate(false);
      }
    } else{
      alert('Passwords do not match, Please try again!');
      onPasswordUpdate(false);
    }
    setPasswordInput(``);
    setSecondaryPasswordInput(``);
  }

  return (
    <div className="update-buttons">
      
      {showChangeEmail ?
        <>
          {/* This line will be implemented with token so the user knows their email. Should ask Jonathan about best practice regarding user account info <h3>Your Current Email is:</h3> */}
          <form className="uud">
            <input type="email" value={emailInput} onChange={(event)=>{setEmailInput(event.target.value)}} placeholder='"Enter New Email' /> <br />
            <button onClick={(e) => {e.preventDefault(); changeEmail(e)}}>Change Email</button>
          </form> 
          <button onClick={() => {setShowChangeEmail(false)}}>Maybe on second thought, my email is fine.</button>
        </>
      :
        <button onClick={() => {setShowChangeEmail(true)}}>Want to change your Email?</button>
      }

      {showChangePassword ?
        <>
          <form className="uud">
            <input type="password" value={passwordInput} onChange={(event)=>{setPasswordInput(event.target.value)}} placeholder='"Enter New Password' /> <br />
            <input type="password" value={secondaryPasswordInput} onChange={(event)=>{setSecondaryPasswordInput(event.target.value)}} placeholder='"Enter New Password Again' /> <br />
            <button onClick={(e)=>{changePW(e)}}>Change Password</button>
          </form>
          {passwordUpdated ? <h2>Password updated!</h2>: null}
          <button onClick={() => {setShowChangePassword(false)}}>Maybe on second thought, my password is fine.</button>
        </>
      :
        <button onClick={() => {setShowChangePassword(true)}}>Want to change your Password?</button>
      }
    </div>
  )
}

export default UpdateUserDetails
