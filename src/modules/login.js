import TextBox from '../components/TextBox'
// import logo from '../../images/logo.png'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import callApi from '../utility/callAPI'
import Toast from '../components/Toast'
import '../style/login.scss'

const Login = () => {
    const [apiData, setApidata] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [loader, setLoader] = useState(false)
    const [defaults, setDefaults] = useState({
        email: '',
        password: ''
    })
    const { email, password } = defaults
    const Navigate = useNavigate()

    const handlerSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        callApi('/login', 'POST', defaults, setLoader).then((data) => {
            if (data?.auth === true) {
                return Navigate(data.resPath)
            }
            setApidata(data)
            setShowToast(true)
        })
    }

    const handlerChange = (e) => {
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value,
        }))
    }
    useEffect((e) => {
        let timeout;
        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false)
            }, 2000);
        }
        return (() => clearTimeout(timeout))
    }, [showToast])

    return (
        <>
            <div className="login_comp">
                {showToast && <Toast toastHeader={apiData.toastHeader} toastMsg={apiData.toastMsg} toastColor={apiData.toastColor} toastIcon={apiData.toastIcon} />}
                <div className="header">
                    <div className="logo">
                    </div>
                    <div className="loginDetails">
                        <h1>
                            Login here
                        </h1>
                        <p>Welcome back!</p>
                    </div>
                    <div className="formDetails">
                        <form onSubmit={handlerSubmit}>
                            <div className="formElements">
                                <TextBox id="emailInput" type="text" name="email" placeholder="Enter your email address" value={email} onChange={handlerChange}></TextBox>
                                <TextBox id="passwordInput" type="password" name="password" placeholder="Enter password" value={password} onChange={handlerChange}></TextBox>
                                {/* <div className='forgotPass'><a href='#' >Forgot your password?</a></div> */}
                            </div>
                            <div className="btn">
                                <Button type="submit" name="Sign in" className="primary" style={{ width: "325px" }}></Button>
                                <Link to="/signup"> <Button name="Create new account" className="secondary createBtn" style={{ width: "325px" }}></Button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
