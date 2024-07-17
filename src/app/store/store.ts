import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
    id: string;
    text: string;
    fromUser: boolean;
    date: string;
    image:string | null
}

export interface MessageState{
    messages: Message[],
    addMessage: (text: string) => void,
    addImage: (image: string) => void,
    addMessageBot: (text: string, fromUser: boolean) => void,
    editMessage: (update: { id: string; text: string}) => void,
    deleteMessage: (id: string) => void
}

export const useMessageState = create<MessageState>()(
    devtools(
      persist(
        (set) => ({
            messages: [],
            addMessage: (text) => 
                set((state) => ({
                    messages: [...state.messages, {id: Date.now().toString(), text, fromUser: true, date: dayjs().format('hh:mm A'), image: null},]
                })),
            addImage: (image) => 
                set((state) => ({
                    messages: [...state.messages, {id: Date.now().toString(), text: '', fromUser: true, date: dayjs().format('hh:mm A'), image: image},]
                })),
            addMessageBot: (text, fromBot) => 
                set((state) => ({
                    messages: [...state.messages, {id: Date.now().toString(), text, fromUser: fromBot, date: dayjs().format('hh:mm A'), image: null}]
                })),
            editMessage: ({id, text}) => 
                set((state) => ({ 
                    messages: state.messages.map((message) => message.id == id ? {...message, text}: message),
                })),
            deleteMessage: (id) => 
                set((state) => ({ 
                    messages: state.messages.filter((message) => message.id !== id),
                })),
        }),
        { name: 'messages',
            storage: createJSONStorage(() => sessionStorage),
        },
      ),
    ),
  )