import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button, Form } from 'react-bootstrap';

const auth = getAuth(app);


function App() {

  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false)

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }
  const handleRegistered = event => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = (event) => {
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
        })
        .catch(error => {
          console.error(error)
        })
    }
    event.preventDefault();
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(()=> {
      console.log('Email verification sent');
    })
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
    .then(result => {
      console.log('email sent')
    })
  }

  const handleGoogleSignIn = () => {
    handleSignIn(googleProvider);
  }

  const handleGithubSignIn = () => {
    handleSignIn(githubProvider);
  }

  const handleFacebookSignIn = () => {
    handleSignIn(facebookProvider);
  }
  const handleSignIn = (provider) => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch((error) => {
        setUser({})
      })
  }
  return (
    <div className="w-50 mx-auto mt-5">
      <div>
        <h2 className='text-primary'>Please {registered? 'LogIn' : 'Register'}!!</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onClick={handleRegistered} type="checkbox" label="Check me out" />
          </Form.Group>
          <Button onClick={handlePasswordReset} variant="link">Forgotten Password?</Button>
          <br/>
          <Button className='primary' type="submit">
            {registered? 'Log In' : 'Register'}
          </Button>
        </Form>
      </div>
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button> :
          <div className='m-3'>
            <button className='m-3' onClick={handleGoogleSignIn}>
              <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
              <p>Google Sign In</p>
            </button>
            <button className='m-3' onClick={handleGithubSignIn}>
              <FontAwesomeIcon icon={faGithub} />
              <p>Github Sign In</p>
            </button>
            <button className='m-3' onClick={handleFacebookSignIn}>
              <FontAwesomeIcon icon={faFacebook} />
              <p>Facebook Sign In</p>
            </button>
          </div>
      }

      <h2>Name: {user.displayName}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
