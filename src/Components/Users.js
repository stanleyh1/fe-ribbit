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
        <ul className="list">
        {users.map((user) => {
            console.log(user)
            return (
            <li key={user.username}>
                <h3>{user.username}</h3>
                <p>{user.name}</p>
                <img className='avatar__img'src={user.avatar_url} alt={user.username} />
                <button className='btn' onClick={() => logIn(user)}>Log me in</button>
            </li>
            );
        })}
        </ul>
    </div>
    );
};

export default Users;