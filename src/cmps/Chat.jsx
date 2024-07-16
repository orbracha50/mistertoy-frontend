import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_USER_TYPING, SOCKET_EMIT_USER_OFF_TYPING } from '../services/socket.service.js'

export function ChatApp({ toyId }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [typing, setTyping] = useState(false)
    const [topic, setTopic] = useState(toyId)
    const [isBotMode, setIsBotMode] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const botTimeoutRef = useRef()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [typing])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    const newMsgs = msgs.filter(msg => msg.txt !== 'typinng...')

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target

        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }
    function onTyping() {
        setTyping(true)
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: 'typinng...' }
        socketService.emit(SOCKET_EMIT_USER_TYPING, newMsg)
    }
    function onOffTyping() {
        setTyping(false)      
    }
    return (
        <section className="chat">
            <h2>Lets Chat </h2>

            <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" onFocus={onTyping} onBlur={onOffTyping} />
                <button>Send</button>
            </form>

            <ul>
                {typing && (<li >typing...</li>)}
                {newMsgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}