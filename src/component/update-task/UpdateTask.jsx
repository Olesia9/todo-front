import {useState} from "react";
import './UpdateTask.sass'

export const UpdateTask = ({getAllTasks, id, description, due_in}) => {
    const [showUpdateTask, setShowUpdateTask] = useState(null);
    const [formUpdateTask, setFormUpdateTask] = useState({
        description: description,
        due_in: due_in
    });

    const handleButtonClick = () => {
        setShowUpdateTask(true);
    };

    const handleCloseModal = () => {
        setShowUpdateTask(false);
    };

    const updateTask = (event) => {
        event.preventDefault()
        fetch('http://127.0.0.1:8000/update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(formUpdateTask)
        })
            .then((response) => {
                getAllTasks()
            })
            .then(data => data)
            .catch(error => console.log(error))
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormUpdateTask(prevState => ({
            ...prevState,
            [name]: value,
            task_id: id
        }));
    };

    return (
        <>
            <button onClick={handleButtonClick} className="Update-task__btn-open">Редактировать</button>
            {showUpdateTask ? (
                <div className="Update-task__modal">
                    <div className="Update-task__modal-container">
                        <button className="Update-task__modal-close" onClick={handleCloseModal}>x</button>
                        <form className="Update-task__form" onSubmit={updateTask}>
                            <div className="Update-task__input-container">
                                <label className="Update-task__label">Задача</label>
                                <input className="Update-task__input" value={formUpdateTask.description} name="description" onChange={handleInputChange}/>
                            </div>
                            <div className="Update-task__input-container">
                                <label className="Update-task__label">Дней до дедлайна</label>
                                <input className="Update-task__input" value={formUpdateTask.due_in} name="due_in" onChange={handleInputChange}/>
                            </div>
                            <button className="Update-task__btn" type="submit" onClick={handleCloseModal}>Обновить</button>
                        </form>
                    </div>
                </div>
            ) : (<></>)
            }
        </>
    )
}