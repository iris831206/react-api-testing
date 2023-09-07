import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // hook

const { VITE_APP_HOST } = import.meta.env;

const Login = ({ setIsLogin, setUserName ,setToken}) => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate() // 把 hook 取出來做使用
  const [isLoading, setIsLoading] = useState(false) // 狀態

  function HandleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const signIn = async () => {
    console.log(formData)

    try {
      setIsLoading(true);
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData);
      const { token } = res.data;
      console.log(token);
      document.cookie = `token=${token};`;
      setIsLoading(false);
      setToken(res.data.token); //驗證測試
      setIsLogin(true);
      setUserName(res.data.nickname);
      alert('登入成功！');
      navigate('/todo'); // 當登入成功，轉址到 todo 頁
    } catch (error) {
      setIsLoading(false);
      console.error('登入失敗，原因：', error);
      setMessage(error.response.data.message);
    }
  }

  return (
    <>
      Login
      <form action="">
        {/* {JSON.stringify(formData)} <br /> */}
        <label htmlFor="email">帳號</label>
        <input type="email" placeholder="Email" id="email" name="email" onChange={HandleChange} /> <br />
        <label htmlFor="password">密碼</label>
        <input type="password" placeholder="Password" id="password" name="password" onChange={HandleChange} /> <br />
        <button type="button"
          disabled={isLoading}
          onClick={() => {
            signIn()
          }}>登入</button>
        {message && <p>登入失敗，原因：{message.toString()}</p>}
      </form>
    </>
  );
}

export default Login;
