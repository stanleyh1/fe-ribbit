import { useContext } from "react";
import { userContext } from '../utils/user';
import jessjelly from '../images/jessjelly.jpeg';
import amy from '../images/amypoehler.jpeg';
import grumpy from '../images/grumpy.jpeg';
import weegem from '../images/weegem.jpeg'

const Users = () => {

const users = [
    {username:'weegembump', name:'Gemma Weeg', avatar_url: weegem},
    { username: 'happyamy2016', name : 'Amy Coder', avatar_url: amy},
    {username: 'jessjelly', name : 'Jess LovesCode', avatar_url: jessjelly},
    {username: 'grumpy19', name : 'Mr Grumpy', avatar_url: grumpy}
    ]

const { setLoggedInUser } = useContext(userContext)

const logIn = (newUser) => {
    setLoggedInUser(newUser)
}
    return (
    <div>
        <h2>Users of Ribbit</h2>
        <ul className='users'>
        {users.map((user) => {
            console.log(user)
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

