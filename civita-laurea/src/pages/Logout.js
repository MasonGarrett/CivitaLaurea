import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import { auth } from '../firebase';

export default function Logout() {
  const navigate = useNavigate();

  auth
    .signOut()
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    });

  return <SignIn />;
}
