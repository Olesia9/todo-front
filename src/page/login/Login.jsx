import React, {useState} from 'react';
import './Login.sass'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const signin = async (event) => {
        event.preventDefault()

        //используем синхронный запрос, чтобы дождаться ответ от апи с токеном - он нужен, чтобы работать с самими
        // задачами
        let xhr = new XMLHttpRequest();

        xhr.onload = function() {
            console.log('xhr all', xhr)
            if(xhr.status === 200) {
                let meetup = JSON.parse(xhr.response, function(key, value) {
                    if (key === 'token') return value;
                    return value;
                });
                if(meetup.authenticated) {
                    navigate('/home-page');
                    console.log('xhr', meetup.token)
                    localStorage.setItem('token', meetup.token)
                } else {
                    console.log('xhr', meetup)
                    //TODO: вывод ошибки, либо состояние ошибки контролить
                }
            }

            if(xhr.status === 400) {
                //TODO: вывод ошибки, либо состояние ошибки контролить
            }
        };

        xhr.open("POST", "http://127.0.0.1:8000/signin/", false);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(JSON.stringify(formData));
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="Login">
            <div className="Login__container">
            <span className="Login__title">
                Планы ждут вас!
            </span>
                <form className="Login__form" onSubmit={signin}>
                    <div className="Login__input-container">
                        <label className="Login__label">Логин</label>
                        <input type="text" className="Login__input" name="username" onChange={handleInputChange}/>
                    </div>
                    <div className="Login__input-container">
                        <label className="Login__label">Пароль</label>
                        <input type="text" className="Login__input" name="password" onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="Login__btn">Войти</button>
                </form>
                <div className="Login__register-container">
                    <span className="Login__register-title">Ещё не планируете с нами? Зарегистрируйтесь!</span>
                    <button className="Login__register-btn" onClick={() => {navigate('/registration')}}>Начать регистрацию</button>
                </div>
            </div>
        </div>
    )
}