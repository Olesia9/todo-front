import {useState} from "react";
import './CreateTask.sass'

export const CreateTask = ({getAllTasks}) => {
    const [showFormCreate, setShowFormCreate] = useState(null);
    const [formCreateTask, setFormCreateTask] = useState({});

    const handleButtonClick = () => {
        setShowFormCreate(true);
    };

    const handleCloseModal = () => {
        setShowFormCreate(false);
    };

    const createTasks = (event) => {
        event.preventDefault()
        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status === 200) {
                getAllTasks()
                //setDataArray(meetup.tasks)
                // if(meetup.authenticated) {
                //     //navigate('/home-page');
                //     console.log('xhr', meetup.token)
                //     localStorage.setItem('token', meetup.token)
                // } else {
                //     console.log('xhr', meetup)
                //     //TODO: вывод ошибки, либо состояние ошибки контролить
                // }
            }

            if (xhr.status === 400) {
                //TODO: вывод ошибки, либо состояние ошибки контролить
            }
        };

        xhr.open("POST", "http://127.0.0.1:8000/new/", false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));

        xhr.send(JSON.stringify(formCreateTask));
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormCreateTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="Create__btn-container">
                <button className="Create__btn-open" onClick={handleButtonClick}>+</button>
                {showFormCreate ? (<button className="Create__btn-close" onClick={handleCloseModal}>Скрыть</button>) :
                    (<></>)}
            </div>
            {showFormCreate ? (
                <form className="Create__form" onSubmit={createTasks}>
                    <div className="Create__form-container">
                        <div className="Create__input-container">
                            <label className="Create__label">Задача</label>
                            <input className="Create__input" type="text" name="description" onChange={handleInputChange}
                                   placeholder="Выгулять собаку"/>
                        </div>
                        <div className="Create__input-container">
                            <label className="Create__label">Сколько дней до выполнения?</label>
                            <input className="Create__input" type="text" name="due_in" onChange={handleInputChange}
                                   placeholder="4"/>
                        </div>

                    <button className="Create__btn-add">Добавить задачу</button>
                    </div>
                </form>
            ) : (<></>)}
        </>
    )
}