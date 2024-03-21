// import LoginForm from '../../components/auth/LoginForm'
// import RegisterForm from '../../components/auth/RegisterForm'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import { useState } from 'react';

const Login = () => {

    // muestor login o register
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className="flexRow">
                <button onClick={()=>setIsLogin(true)}>Log In</button>
                <button onClick={()=>setIsLogin(false)}>Register</button>
            </div>
            {isLogin ? <LoginForm/> : <RegisterForm/>}
        </>
    )
}

export default Login;