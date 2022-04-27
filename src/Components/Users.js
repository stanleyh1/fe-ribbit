import { useContext, useState, useEffect } from "react";
import { userContext } from '../utils/user';
import { getUsers } from '../utils/api';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
            setIsLoading(false)
        })
    }, [])


const { setLoggedInUser } = useContext(userContext)

const logIn = (newUser) => {
    setLoggedInUser(newUser)
}

if (isLoading)  {
    return <p>Loading...</p>
}
    return (
    <div>
        <h2>Users of Ribbit</h2>
        <ul className='users'>
        {users.map((user) => {
            return (
            <div className='users'><li className='user' key={user.username}>
                <img id='avatarImg'src={user.avatar_url} alt={user.username} />
                <h3 id='name'>{user.name}</h3>
                <div className='name'><p id='username'>{user.username}</p></div>
                <div className='logInBtn'><button id='logInBtn' className='btn' onClick={() => logIn(user)}>Log me in</button></div>
            </li></div>
            );
        })}
        </ul>
    </div>
    );
};

export default Users;

