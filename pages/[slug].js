
import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";




export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessages] = useState([]);

    //submit a comment
    const submitMessage = async () => {
        //check if user is logged
        if (!auth.currentUser) return router.push('/auth/login');

        if (!message) {
            toast.error("Don't leave an empty comment", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });

            return;
        }
        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({  //crea un array per i commenti
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        //reset message
        setMessage('');
    };

    //get comments displayed
    const getComments = async () => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments)
        });
        return unsubscribe;

    };

    useEffect(() => {
        if (!router.isReady) return;
        getComments();
    }, [router.isReady]);



    return (
        <div>
            <Message {...routeData}></Message>

            <div className="my-4">
                <div className="flex gap-1">
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        value={message}
                        placeholder=' Leave a comment'
                        className='bg-gray-800 w-full p-2 text-white text-sm rounded-lg'
                    />
                    <button onClick={submitMessage}
                        className='bg-cyan-500 text-white py-2 px-4 rounded-lg'>
                        Submit
                    </button>
                </div>
                <div className="py-6 bg-zinc-400 px-2 rounded-lg mt-4">
                    <h2 className='font-bold'>Comments :</h2>
                    {allMessage?.map((message) => (
                        <div className="bg-white p-4 my-4 border-2 shadow-lg rounded-md" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img className='w-10 rounded-full' src={message.avatar} alt="" />
                                <h2 className='font-semibold cursor-pointer'>{message.userName}</h2>
                            </div>
                            <h2 className='ml-4'>{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    )
}
