import { useContext } from "react";
import { userContext } from '../utils/user';

const Users = () => {

    // const [users, setUsers] = useState([]);
    const users = [{username:'weegembump', name:'Gemma Weeg', avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Xqa6xBwapYDCSVKgDyleIwHaHa%26pid%3DApi&f=1'},
    { username: 'happyamy2016', name : 'Amy Coder', avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.QmvN0QpzZwrgyr5udM4eegHaIc%26pid%3DApi&f=1'},
    {username: 'jessjelly', name : 'Jess LovesCode', avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.CxW6g1vJumzy8stjI7oEqwHaHa%26pid%3DApi&f=1'},
    {username: 'grumpy19', name : 'Mr Grumpy', avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Xbpd0_t4Yhk11oqHX2jLIQAAAA%26pid%3DApi&f=1'}
    ]

    const { setLoggedInUser } = useContext(userContext)

    // useEffect(() => {
    // getUsers().then((usersFromServer) => {
    //     setUsers(usersFromServer);
    // });
    // }, [users]);

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
                <button onClick={() => logIn(user)}>Log me in</button>
            </li>
            );
        })}
        </ul>
    </div>
    );
};

export default Users;