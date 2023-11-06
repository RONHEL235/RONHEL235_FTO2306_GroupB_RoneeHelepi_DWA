import { Button, TextField, Paper, Alert, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { animated, useTransition } from '@react-spring/web'
import { useTasks } from './App.useTasks'
import { useToggle } from 'react-use'
import styled from '@emotion/styled'

const StylePaper = styled(Paper)`
    margin: 1rem;
    background: grey;
    display: flex;
    justify-content: space-between;
`

const List = styled.ul`
    padding: 0;
    list-style: none;     
`

export const App = () => {
    const { tasks, remove, add, message } = useTasks()

    const [toggleShow] = useToggle(false)

    const list = useTransition(tasks, {
        from: { x: -200, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        leave: { x: 200, opacity: 0 },
    })

    const formSubmit = (event) => {
        event.preventDefault()
        const { target } = event
        const data = new FormData(target)
        const { title } = Object.fromEntries(data)
        add(title)
        target.reset()
    }
    return (
        <div>
            <button onClick={toggleShow}>Toggle</button>
            <form onSubmit={formSubmit}>
                <TextField label="New Task" name="title" variant="filled" />
                <Button type="submit" size="large" variant="contained">
                    Save
                </Button>
            </form>
            {message && <Alert severity="warning">{message}</Alert>}

            <List>
                {list((style, { key, title }) => {
                    return (
                        <animated.div key={key} style={list}>
                            <StylePaper component="li">
                                <span>{title}</span>
                                <IconButton size="small" onClick={() => remove(key)}><Delete /></IconButton>
                            </StylePaper>
                        </animated.div>
                    )
                })}
            </List>
        </div> 
    ) 
} 