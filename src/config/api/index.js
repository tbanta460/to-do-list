
const endPointApi = {
    activity: 'https://floating-mountain-35184.herokuapp.com/activity-groups',
    todo: 'https://floating-mountain-35184.herokuapp.com/todo-items'

}

export const getActivity = (params) => {
    return fetch(endPointApi.activity + params)
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}

export const delActivity = async (params) => {
    return await fetch(endPointApi.activity+ '/' + params, {
                method: "DELETE",
                headers:{
                    "Content-Type": "aplication/json"
                }
            })
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}

export const editActivity = async (data, id) => {
        return await fetch(endPointApi.activity + '/' + id, {
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => result)
        .catch(error => error.response)
}


export const getToDo = (params) => {
    return fetch(endPointApi.todo + params)
            .then(data => data.json())
            .then(res => res)
            .catch(error => error.response)
}


export const postToDo = async (data) => {
    return await fetch(endPointApi.todo, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => data)
        .catch(error => error.response)
}

export const editToDo = async (data, id) => {
    return await fetch(endPointApi.todo + "/" + id, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => error.response)
}

export const delToDo = async (id) => {
    return await fetch(endPointApi.todo + "/" + id, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(rres => rres.json())
    .then(data => data)
    .catch(error => error.response)
}