
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";




export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);  // importo sempre l'user 
    const [posts, setPosts] = useState([]);

    //if user is logged

    const getData = async () => {
        if (loading) return; //se user c'e , ritorna niente
        if (!user) return route.push('/auth/login');  //se user non c'e ritorna al login

        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));  // per avere nell dashboard i propri post
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        return unsubscribe;
    };

    //delete post
    const deletePost = async (id) => {
        const docRef = doc(db, 'posts', id) //per cancellare un post devi partitre dall'inizio ed arrivare al'id del post
        await deleteDoc(docRef);
    }


    //get user data

    useEffect(() => {
        getData();
    }, [user, loading]);




    return (
        <div className=''>
            <h1 className="mt-5 text-lg font-semibold ml-4">Your posts :</h1>
            <div className="">
                {posts.map((post) => {
                    return (
                        <Message {...post} key={post.id}>
                            <div className="flex gap-6">
                                <button onClick={() => deletePost(post.id)} className='flex text-pink-800 items-center justify-center gap-2 py-2 px-4 text-md bg-pink-200 rounded-lg'>
                                    <BsTrash2Fill className='text-2xl' />
                                    Delete
                                </button>
                                <Link href={{pathname: "/post", query: post}}>
                                    <button className='flex text-teal-800 items-center justify-center gap-2 py-2 px-5 text-md bg-teal-200 rounded-lg'>
                                        <AiFillEdit className='text-2xl' />
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </Message>
                    );

                })}
            </div>
            <button 
            className='font-medium text-white bg-gray-800 py-2 px-4 my-6 rounded-lg' 
            onClick={() => auth.signOut()}>Sign out</button>
        </div>
    )
}
