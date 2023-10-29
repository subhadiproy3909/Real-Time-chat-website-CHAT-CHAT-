import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) =>{
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);

    const history = useHistory();

    useEffect(() =>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // const userInfo = localStorage.getItem("userInfo");
        // console.log(userInfo);
        setUser(userInfo);

        if(!userInfo){
            history.push("/");
        }
    }, [history]);

    return(
            <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}>
                {/* {console.log('this is chat context :', user)} */}
                { children }
            </ChatContext.Provider>
        ) 
};

export const ChatState = () =>{
    return useContext(ChatContext);
};


export default ChatProvider;