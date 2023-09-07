import { useState } from "react";
import axios from "axios";

const SignOut =({ setToken, token, setIsLogin })=> {
    const { VITE_APP_HOST } = import.meta.env;
    const [message, setMessage] = useState('');

    const signOut = () => {
        axios.post(`${VITE_APP_HOST}/users/sign_out`, {},
            {
                headers: {
                    Authorization: token,
                }
            }
        ).then(response => {
            console.log(response);
            setMessage(response.data.message);
            setIsLogin(false);
        }).catch((error) => {
            console.log(error)
            setMessage(error.response.data.message)
        });
    };

    return (
        <div>
            登出
            <input
                value={token}
                onChange={(e) => {
                    setToken(e.target.value);
                }}
                placeholder='Token'
            />
            <button onClick={signOut}>Check Out</button>
             <p>{message}</p>
        </div>
    );
}

export default SignOut;