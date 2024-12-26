import React, { useState } from 'react';
import { Chat } from '../../types/chat';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';

const initialChatData: Chat[] = [
  {
    avatar: UserOne,
    name: 'Devid Heilo',
    text: 'How are you?',
    time: 12,
    textCount: 3,
    color: '#10B981',
  },
  {
    avatar: UserTwo,
    name: 'Henry Fisher',
    text: 'Waiting for you!',
    time: 12,
    textCount: 0,
    color: '#DC3545',
  },
  {
    avatar: UserFour,
    name: 'John Doe',
    text: "What's up?",
    time: 32,
    textCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserFive,
    name: 'Jane Doe',
    text: 'Great',
    time: 32,
    textCount: 2,
    color: '#FFBA00',
  },
  {
    avatar: UserOne,
    name: 'John Doe',
    text: 'How are you?',
    time: 32,
    textCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserThree,
    name: 'John Doe',
    text: 'How are you?',
    time: 32,
    textCount: 3,
    color: '#FFBA00',
  },
];

interface Message {
  from: string;
  to: string;
  text: string;
  time: number;
}

const ChatCard = () => {
  const [chatData, setChatData] = useState<Chat[]>(initialChatData);
  const [selectedUser, setSelectedUser] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleUserClick = (user: Chat) => {
    setSelectedUser(user);
  };

  const sendMessage = () => {
    if (message.trim() !== '' && selectedUser) {
      const newMessage: Message = {
        from: 'Admin', // Assuming the current user is Admin
        to: selectedUser.name,
        text: message,
        time: 0, // Just sent message
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <div className="flex flex-col gap-4 px-7.5">
        <div className="flex-grow overflow-y-auto">
          {selectedUser ? (
            <div>
              <div className="flex items-center gap-5 py-3">
                <button className="text-blue-500" onClick={handleBackClick}>
                  Back
                </button>
                <div className="relative h-14 w-14 rounded-full">
                  <img src={selectedUser.avatar} alt="User" />
                  <span
                    className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: selectedUser.color }}
                  ></span>
                </div>
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {selectedUser.name}
                  </h5>
                </div>
              </div>

              <div className="mb-4">
                {messages
                  .filter(
                    (msg) =>
                      (msg.from === 'Admin' && msg.to === selectedUser.name) ||
                      (msg.from === selectedUser.name && msg.to === 'Admin')
                  )
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        msg.from === 'Admin' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <p
                        className={`p-2 ${
                          msg.from === 'Admin'
                            ? 'bg-primary text-white rounded-l-lg'
                            : 'bg-gray-200 text-black rounded-r-lg'
                        } mb-2`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-grow rounded-l-lg border border-gray-300 p-2 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="rounded-r-lg bg-primary py-2 px-4 text-white"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            chatData.map((chat, key) => (
              <div
                key={key}
                className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer"
                onClick={() => handleUserClick(chat)}
              >
                <div className="relative h-14 w-14 rounded-full">
                  <img src={chat.avatar} alt="User" />
                  <span
                    className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: chat.color }}
                  ></span>
                </div>

                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black dark:text-white">
                      {chat.name}
                    </h5>
                    <p>
                      <span className="text-sm text-black dark:text-white">
                        {chat.text}
                      </span>
                      <span className="text-xs"> . {chat.time} min</span>
                    </p>
                  </div>
                  {chat.textCount !== 0 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-white">
                        {chat.textCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
