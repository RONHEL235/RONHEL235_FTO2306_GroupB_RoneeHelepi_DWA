import { useEffect, useState } from "react"
import { v4 as createId } from "uuid"

const createLocal = (id) => {
    const get = () => {
        const response = window.localStorage.getItem(id)
        if (!response) return []
        return JSON.parse(response)
    }

    const set = (value) => {
        const string = JSON.stringify(value)
        window.localStorage.setItem(id, string)
    }

    return {
        get,
        set,
    }
}

const saved = createLocal("7638d423-4d9c-48ef-8e8c-5352907d2863")

export const useTasks = () => {
    const [tasks, setTasks] = useState(saved.get())
    const [message, setMessage] = useState(null)

    useEffect(() => {
        saved.set(tasks)
    }, [tasks])

    const add = (title) => {
        if (!title || title.trim() === "") {
            setMessage("Title is required")
            return
        }

        setMessage(null)
        
        const newTasks = [
            {
                id: createId(),
                title,
            },
            ...tasks,
        ]

        setTasks(newTasks)
    }

    const remove = (id) => {
        console.log(tasks, id)
        const newTasks = tasks.filter((item) => {
            return item.id !== id
        })

        setTasks(newTasks)
    }

    return {
        tasks,
        add,
        remove,
        message,
    }
}
