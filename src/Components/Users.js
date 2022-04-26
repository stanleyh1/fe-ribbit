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
            <li className='user' key={user.username}>
                <div className="username_name_container">
                <h3 id='username'>{user.username}</h3>
                <br/>
                <p id='name'>{user.name}</p>
                </div>
                <img id='avatarImg'src={user.avatar_url} alt={user.username} />
                <button id='logInBtn' className='btn' onClick={() => logIn(user)}>Log me in</button>
            </li>
            );
        })}
        </ul>
    </div>
    );
};

export default Users;

