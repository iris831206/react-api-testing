import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // hook

const { VITE_APP_HOST } = import.meta.env;

const SignUp = () => {
  console.log(VITE_APP_HOST);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  })
  const navigate = useNavigate() // 把 hook 取出來做使用

  function HandleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const signUp = async () => {
    console.log(formData);
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData);
      console.log(res);
      setMessage('註冊成功！');
      setFormData({
        email: '',
        password: '',
        nickname: '',
      })
      alert('註冊成功！')
      navigate('/auth/login') // 當註冊成功，轉址到登入頁
    } catch (error) {
      console.error('註冊失敗，原因：', error);
      setMessage(error.response.data.message);
    }
  }

  return (<>
    註冊
    <form action="">
      {/* {JSON.stringify(formData)} */}
      <label htmlFor="email">帳號</label>
      <input type="email" placeholder="Email" id="email" name="email" onChange={HandleChange} /> <br />
      <label htmlFor="password">密碼</label>
      <input type="password" placeholder="Password" id="password" name="password" onChange={HandleChange} /> <br />
      <label htmlFor="nickname">暱稱</label>
      <input type="text" placeholder="nickname" id="nickname" name="nickname" onChange={HandleChange} /> <br />
      <button type="button" onClick={(e) => {
        signUp()
      }}>註冊</button>
      {message && <p>註冊失敗，原因：{message.toString()}</p>}

      {/*token驗證*/}
      
    </form>
  </>)
}

export default SignUp