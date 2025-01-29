import { useEffect, useState } from 'react';
import callApi from '../utility/callAPI';
import '../style/dashboard.scss'
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import Toast from '../components/Toast'


const Dashboard = () => {
    const [apiData, setApiData] = useState([])
    const [toastData, setToastData] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [disabled, setDisabled] = useState('disabled')
    const [defaults, setDefaults] = useState({
        userData: '',
        userValue: '',
    })
    const [fieldError, setFieldError] = useState({})


    const { userData, userValue } = defaults

    useEffect(() => {
        callApi('/dashboard', 'GET', null).then((data) => {
            setApiData(data)
        })
    }, [])
    // useEffect(() => {
    //     callApi('/dashboard', 'GET', null).then((data) => {
    //         setApiData(data)
    //     })
    // }, [apiData])
    const handlerSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            console.log(e)
            callApi('/addData', 'POST', defaults).then((data) => {
                setToastData(data)
                setShowToast(true)
            })
        }
        return
    }
    const deleteData = (e) => {
        console.log('delete btn');
        console.log(e)
        callApi('/deleteData', 'POST', defaults).then((data) => {
            setToastData(data)
            setShowToast(true)
        })
    }
    const handlerInput = (e) => {
        e.target.value.length == 0 ? setDisabled('disabled') : setDisabled('')
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value,
        }))

    }
    useEffect((e) => {
        callApi('/dashboard', 'GET', null).then((data) => {
            setApiData(data)
        })
        let timeout;
        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false)
            }, 2000);
        }
        return (() => clearTimeout(timeout))
    }, [showToast])

    const validate = () => {
        let errors = {}
        for (let key in defaults) {
            if (defaults[key].trim().length < 1) {
                errors[key] = 'error'
            }
        }
        setFieldError(errors)
        return Object.entries(errors).length > 0 ? false : true
    }
    return (
        <>
            <div className="dashboard_comp">
                {showToast && <Toast toastHeader={toastData.toastHeader} toastMsg={toastData.toastMsg} toastColor={toastData.toastColor} toastIcon={toastData.toastIcon} />}
                <ul className="exListBox">
                    {apiData.map((item, i) => {
                        return <li className="exListItem" key={i}>
                            <div className="expenseListContainer">
                                <div className="userDetails">
                                    <h4 className="listHeader">Name: {item.data.username}</h4>
                                    <p className="listPara"><strong>Email:</strong> {item.data.email}</p>
                                </div>
                                <div className="details">
                                    {Object.keys(item.data).map((key) => (
                                        key !== 'username' && key !== 'email' && (
                                            <p key={key} className="listPara">
                                                <strong>{key}:</strong> {item.data[key]}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </li>
                    })}

                </ul >

                <div className='addMoreDetails'>
                    <form onSubmit={handlerSubmit}>
                        <TextBox type="text" label="Key" value={userData} name="userData" className={`userData ${fieldError.userData ? 'error' : ''}`} onChange={handlerInput}></TextBox>
                        <TextBox type="text" label="value" value={userValue} name="userValue" className={`userValue ${fieldError.userValue ? 'error' : ''}`} onChange={handlerInput}></TextBox>
                        <div className="actionBtn">
                            <Button type="submit" className={`primary ${disabled}`} name="Add More Data"></Button>
                            <Button type="button" className={`Secondary ${disabled}`} name="Delete Specific Data" onClick={deleteData}></Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Dashboard