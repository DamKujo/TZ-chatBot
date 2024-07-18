"use client"
import dayjs from 'dayjs'
import { Jost } from 'next/font/google';
import Image from 'next/image';
import { useMessageState } from './store/store';
import React, { ChangeEvent, useEffect } from 'react';


const data = dayjs().format('M/D/YYYY');
const jost = Jost({weight: "400", preload: false})
export {data, jost}

export default function ChatWindow(){
    const {
        messages, 
        addMessage, 
        addImage,
        addMessageBot,
        editMessage, 
        deleteMessage
    } = useMessageState();
    const [newMessage, setNewMessage] = React.useState("");
    const [image, setImage] = React.useState<File | null>(null); 
    const [editMessageId, setEditMessageId] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    

    const handleChange = (e:any):void => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            if (editMessageId) {
              editMessage({ id: editMessageId, text: newMessage });
              setEditMessageId('');
              setFocus(false);
            } else {
                if(newMessage){
                    addMessage(newMessage);
                    setTimeout(() => {
                        addMessageBot('Hello world!', false)
                    }, 5000);
                }
            }
            setNewMessage('');
            setImage(null);
            setFocus(false);
        } else{
            if(image){
                let imageMessage = URL.createObjectURL(image).toString();
                console.log(imageMessage)
                addImage(imageMessage);
                setTimeout(() => {
                    addMessageBot('Hello world!', false)
                }, 5000);
            }
            setImage(null);
        }
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
    }

    const handleEdit = (id: string, text: string):void => {
        setNewMessage(text);
        setEditMessageId(id);
        setFocus(true)
    };
    
    const handleDelete = (id: string):void => {
        deleteMessage(id);
    };

    const preOpenImage = (image: File): string => {
        let img = URL.createObjectURL(image).toString();
        return img;
    }

    const deletePreOpenImage = (image: File) => {
        setImage(null);
    }


    return(
        <>
            <div className={jost.className="main-block"}>
                <div className={jost.className="main-title"}>{data}</div>
                <div className='message-window'>
                    {messages.length == 0 ? <span className={jost.className}>No messages. Let's write to the Bot and wait the answer</span> : null}
                    {
                        messages.map((message) => (
                            <div key={message.id} className={message.fromUser ? 'main-message' : 'main-message-two'}>
                                {!message.fromUser ? (
                                    <div>
                                        <Image src='/avatars/avatar-4.svg' alt='' width={32} height={32} className='icons four again'/>
                                        <Image src='/message/Online-indicator.svg' alt='' width={10} height={10} className='icons-indicator'/>
                                    </div>
                                ): null}
                                <div className={message.fromUser ? 'message-person' : 'message-bot'}>
                                    {message.fromUser ? (
                                        <div className='message-icons'>
                                            <Image onClick={() => handleEdit(message.id, message.text)} src="/message/editIcon.png" alt='' width={20} height={20}/>
                                            <Image onClick={() => handleDelete(message.id)} src="/message/deleteIcon.svg" alt='' width={20} height={20}/>
                                        </div>
                                    ) : null}
                                    {!message.fromUser ? (
                                        <div className='name'>Jav <span>bot</span></div>
                                    ): null}
                                    {message.image ? <Image src={message.image} alt='' width={100} height={100} /> : null}
                                    <div className='message'><span>{message.text}</span></div>
                                    <div className={message.fromUser ? 'time' : 'time-bot'}>
                                        <span>{message.date}<Image src='/message/read receipt.svg' alt='' width={20} height={20}/></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <form className='main-form' onSubmit={handleChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
                    <div className='input-field'>
                        <Image className="choice-smail" src="/input-field/emoji.svg" alt='' width={40} height={48}/>
                        <input className="input" type='text' placeholder='Start-typing...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <div className='send-and-takeit'>
                            {image ? <div className="preOpenImg">
                                    <Image className='deletePreOpenImg' onClick={() => deletePreOpenImage(image)} src="/message/deleteIcon.svg" alt='' width={20} height={20}/>
                                    <Image src={preOpenImage(image)} alt='' width={50} height={50}/>
                                </div> : null}
                            <label className='label'>
                                <Image className="upload" src="/input-field/Icon-2.svg" alt='' width={20} height={20}/>
                                <input className='input-2' type='file' onChange={handleImage}/>
                            </label>
                            <Image className="btn-click" src={focus ? "/input-field/Icon-focus.svg" : "/input-field/Icon.svg" } alt='' width={16} height={14} onClick={handleChange}/>
                        </div>
                    </div> 
                </form>
            </div>
        </>
    )
}