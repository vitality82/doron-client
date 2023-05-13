const BASE_URL = 'http://127.0.0.1:3000/api/v1'

export const TaskAPI = {
    getAll: async function () {
        const response = await fetch(`${BASE_URL}/tasks`)
        const data = await response.json()
        return data
    },

    create: async function(task: object) {
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
        return response
    },

    update: async function(id: number, task: object) {
        const response = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
        return response
    }
}