import Image from "next/image";
import Header from './header';
import ChatWindow from './chatWindow';

export default function Home() {
  return (
    <>
      <Header/>
      <ChatWindow/>
    </>
  );
}