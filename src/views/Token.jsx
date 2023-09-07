import { useState } from "react";
import axios from 'axios';

const Token = ({ setToken, token }) => {
    const { VITE_APP_HOST } = import.meta.env;
    const [message, setMessage] = useState('');

    const CheckoutBtn = async () => {
        try {
            const res = await axios.get(`${VITE_APP_HOST}/users/checkout`, {
                headers: { Authorization: token }
            })
            setMessage('驗證成功！');
            //setToken('')
        } catch (error) {
            console.error('驗證失敗，原因：', error);
            setMessage(`驗證失敗，原因：${error.response.data.message}`);
        }
    }

    return (
        <>
            <h2>驗證</h2>

            <input
                value={token}
                onChange={(e) => {
                    setToken(e.target.value);
                }}
                placeholder='Token'
            />  
            <button type="button" onClick={CheckoutBtn}>驗證 Token</button>


            {message && <p>驗證結果：{message}</p>}
        </>
    );
}

export default Token;



