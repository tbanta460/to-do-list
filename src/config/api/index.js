
const endPointApi = {
    activity: 'https://floating-mountain-35184.herokuapp.com/activity-groups',
    todo: 'https://floating-mountain-35184.herokuapp.com/todo-items'

}
export const getAndDelActivity = (params) => {
    return fetch(endPointApi.activity + params)
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}

export const postAndEditActivity = (methods, params, data) => {
    return fetch(endPointApi.activity + params, {
            method: methods, 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}
export const getAndDeToDo = (params) => {
    return fetch(endPointApi.todo + params)
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}

export const postAndEditToDo = (methods, params, data) => {
    return fetch(endPointApi.activity + params, {
            method: methods, 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}
