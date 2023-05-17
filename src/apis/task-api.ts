const BASE_URL = 'http://127.0.0.1:3000/api/v1/tasks'

export const TaskAPI = {
    getAll: async function () {
        const response = await fetch(`${BASE_URL}`)
        const data = await response.json()
        return data
    },

    create: async function(task: object) {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
        return response
    },

    updateName: async function(id: number, name: string) {
        // const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        const response = await fetch(`${BASE_URL}/${id}/update_name`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })
        return response
    },

    updateDateCompleted: async function (id: number, is_completed: boolean) {
        const response = await fetch(`${BASE_URL}/${id}/update_date_completed`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_completed }),
        })
        return response
    },

    delete: async function (id: number) {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    },
}