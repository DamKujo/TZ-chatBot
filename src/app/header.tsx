"use client"
import { Jost } from 'next/font/google'
import Image from 'next/image'
import { useMessageState } from './store/store';

const jost = Jost({weight: '400', preload: false});
export{jost}

export default function Header(){
    const {messages} = useMessageState();
    
    return(
        <>
            <div className='main-header'>
                <div className='header-avatars'>
                    <Image src='/avatars/avatar-1.svg' alt='' width={26} height={26} className='icons'/>
                    <Image src='/avatars/avatar-2.svg' alt='' width={26} height={26} className='icons two'/>
                    <Image src='/avatars/avatar-3.svg' alt='' width={26} height={26} className='icons three'/>
                    <Image src='/avatars/avatar-4.svg' alt='' width={26} height={26} className='icons four'/>
                </div>
                <div className='header-title'>
                    <p className={jost.className='header-maintitle'}>🦄 Team Unicorns</p>
                    {messages.length > 0 ? <p className={jost.className='header-subtitle'}>online 🟢</p> : <p className={jost.className='header-subtitle'}>last seen 45 minutes ago</p>}
                </div>
                <div className='header-points'><span>...</span></div>
            </div>
        </>
    )
}