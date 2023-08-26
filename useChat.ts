import { useReducer } from 'react';
import { Message } from '@/features/chat/Message';

export function useChat() {

    const [messages, dispatch] = useReducer(chatReducer, []);

    return {
        messages,
        dispatch,
        setNewMessage, 
        resetChat
    }

    function setNewMessage(message: Message) {

        dispatch({ type: ChatReducerKind.ADD, message })

    }

    function resetChat(){
        dispatch({ type : ChatReducerKind.INITIAL });
    }

}

function chatReducer(state: Message[], payload: PayloadChatReducer): Message[] {

    switch (payload.type) {
        case ChatReducerKind.ADD:
            
            return payload.message ? [...state, payload.message] : state

        case ChatReducerKind.INITIAL:
            return [];

        default:
            return state;
    }

}
type PayloadChatReducer = {

    type: ChatReducerKind,
    message?: Message

}

type UseChat = {

    messages: Message[];
    dispatch: React.Dispatch<PayloadChatReducer>;
    setNewMessage: (message: Message) => void;
    resetChat: () => void;

}

enum ChatReducerKind {

    ADD = 'ADD',
    REMOVE = 'REMOVE',
    UPDATE = 'UPDATE',
    INITIAL = 'INITIAL'
}

export type { UseChat, PayloadChatReducer, ChatReducerKind }
