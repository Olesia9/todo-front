import React, {useEffect, useState, useCallback} from "react";
import {CreateTask} from "../../component/create-task/CreateTask";
import './Home.sass'
import {UpdateTask} from "../../component/update-task/UpdateTask";

export const Home = () => {
    const [dataArray, setDataArray] = useState([]);

    const getAllTasks = useCallback(() => {
        try {
            let xhr = new XMLHttpRequest();

            xhr.onload = function () {
                if (xhr.status === 200) {
                    let meetup = JSON.parse(xhr.response, function (key, value) {
                        if (key === 'token') return value;
                        return value;
                    });
                    setDataArray(meetup.tasks)
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

            xhr.open("GET", "http://127.0.0.1:8000/all/", false);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));

            xhr.send();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [])

    const deleteTasks = (id) => {
        const requestData = {
            task_id: id,
        };
        fetch('http://127.0.0.1:8000/delete/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(requestData)
        })
            .then(response => getAllTasks())
            .then(data => data)
            .catch(error => console.log(error))
    }

    useEffect(() => {
        void getAllTasks(); // Ensure data is fetched correctly
    }, [getAllTasks]);

    return (
        <div className="Home container">
            <div className="Home__create-task">
                <CreateTask getAllTasks={getAllTasks}/>
            </div>
            <div className="Home__task-list">
                <table className="Home__task-table">
                    <thead>
                    <tr>
                        <th>Задача</th>
                        <th>Дата</th>
                        <th>Редактирование</th>
                        <th>Удаление</th>
                    </tr>
                    </thead>

                    <tbody>
                    {dataArray && dataArray.length > 0 ? (
                        dataArray.map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.description}
                                </td>
                                <td className="Home__data">
                                    {item.due}
                                </td>
                                <td>
                                    <UpdateTask getAllTasks={getAllTasks} id={item.id} description={item.description} due_in={item.due_in}/>
                                </td>
                                <td>
                                    <button className="Home__task-delete" onClick={() => deleteTasks(item.id)}>Удалить
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                <span className="Home__task-dont">Задачи отсутствуют</span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    {/*<label>Задача</label>*/}
                    {/*<input type="text" defaultValue={item.description}/>*/}
                    {/*<label>Дата</label>*/}
                    {/*<input type="text" defaultValue={item.due}/>*/}
                    {/*<UpdateTask getAllTasks={getAllTasks} id={item.id}/>*/}
                    {/*<button onClick={() => deleteTasks(item.id)}>Удалить</button>*/}
                </table>
            </div>
        </div>
    )
}