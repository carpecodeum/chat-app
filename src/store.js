import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

export const ctx = React.createContext();

const initialstate = {
    general: [ 
        {from:'adi', msg:'hello'},{from:'arun', msg:'hello'},{from:'alok', msg:'hello'}
    ],
    topic2: [
        {from:'adi', msg:'hello'},{from:'adi', msg:'hello'},{from:'adi', msg:'hello'}
    ]
}

function reducer (state,action){

    switch(action.type){
        case 'RECIEVE_MSG':
        return{
            ...state,
            [action.payload.topic] : [
                ...state[action.payload.topic],
                {
                    from:[action.payload.from],
                    msg:[action.payload.msg]
                }
            ]
        }
        default:
        return state
    }

}

let socket;
function sendchataction(value){
    socket.emit('chat message',value)
}
export default function Store(props){

    const [allChats,dispatch] = React.useReducer(reducer,initialstate);
    if(!socket){
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type:'RECIEVE_MSG',payload:msg})
          });
    }
    const user = 'adi' +Math.random(100).toFixed(2)
    return(
        <ctx.Provider value={{allChats,sendchataction,user}}>
        {props.children}
        </ctx.Provider>
    )
}