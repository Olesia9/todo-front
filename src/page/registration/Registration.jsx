import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Registration.sass'

export const Registration = () => {
    const [formRegData, setFormRegData] = useState({});
    const navigate = useNavigate();

    const reg = async (event) => {
        event.preventDefault()

        //используем синхронный запрос, чтобы дождаться ответ от апи с токеном - он нужен, чтобы работать с самими
        // задачами
        let xhr = new XMLHttpRequest();

        xhr.onload = function() {
            console.log('xhr all', xhr)
            if(xhr.status === 200 || xhr.status === 201) {
                let meetup = JSON.parse(xhr.response, function(key, value) {
                    if (key === 'token') return value;
                    return value;
                });
                if(meetup.token) {
                    navigate('/home-page');
                    console.log('xhr', meetup.token)
                    localStorage.setItem('token', meetup.token)
                } else {
                    //console.log('xhr', meetup)
                    //TODO: вывод ошибки, либо состояние ошибки контролить
                }
            }

            if(xhr.status === 400) {
                //TODO: вывод ошибки, либо состояние ошибки контролить
            }
        };

        xhr.open("POST", "http://127.0.0.1:8000/register/", false);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(JSON.stringify(formRegData));
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormRegData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="Registration">
            <div className="Registration__container">
            <span className="Registration__title">
                Регистрация
            </span>
                <form className="Registration__form" onSubmit={reg}>
                    <div className="Registration__input-container">
                        <label className="Registration__label">Логин</label>
                        <input type="text" className="Registration__input" name="username" onChange={handleInputChange}/>
                    </div>
                    <div className="Registration__input-container">
                        <label className="Registration__label">Пароль</label>
                        <input type="text" className="Registration__input" name="password" onChange={handleInputChange}/>
                    </div>
                    <div className="Registration__input-container">
                        <label className="Registration__label">Email</label>
                        <input type="text" className="Registration__input" name="email" onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="Registration__btn">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}