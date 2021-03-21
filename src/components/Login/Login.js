import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
// import Logo from '../../images/Logo1.png';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [hasAccount, setHasAccount] = useState(false);
    const [user, setUser] = useState({
        isGoogleSignedIn: false,
        isFbSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: '',
        error: '',
        success: false,
        hasAccount: true
    })

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoUrl, email } = res.user;
                const signedInUser = {
                    isGoogleSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoUrl

                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);

                console.log(displayName, photoUrl, email);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }

    const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider).then((result) => {
            const { displayName } = result.user;
            const signedInUser = {
                isFbSignedIn: true,
                name: displayName,
            }
            var user = result.user;
            var credential = result.credential;
            var accessToken = credential.accessToken;
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);



        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUser(signedOutUser);
            })
            .catch(err => {

            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        let isPasswordMatched = false;

        if (e.target.name === 'name') {
            isFieldValid = true;
        }

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (hasAccount && e.target.name === 'confirmPassword') {
            if (e.target.value === user.password) {
                isPasswordMatched = true;
                const isPasswordValid = e.target.value.length > 6;
                const isPasswordHasNumber = /\d{1}/.test(e.target.value)
                isFieldValid = isPasswordMatched && isPasswordValid && isPasswordHasNumber;
                console.log(isFieldValid);
            }
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleLogin = () => {    
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const { email, displayName } = res.user;
                const newUserInfo = { email, name: displayName }
                console.log("User", res.user);
                newUserInfo.error = '';
                setLoggedInUser(newUserInfo);
                alert("User Login Successful.")
                history.replace(from)
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
}

    const handleSignUp = (e) => {
        if(!hasAccount && user.name){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                console.log(res);
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                updateUserName(user.name);
                alert("New user created successfully.")

            })
            .catch(error => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
        e.preventDefault();
    }
}

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
            .then(function () {
                console.log("user name updated successfully");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="container">
           
            <div className="Login-Register">

                <div className="login-container">
                    {hasAccount ? (
                        <>
                            <form>
                                <h3 className="Login">Login</h3>
                                <div className="form-group">
                                    <label className="email-label">Email Address</label>
                                    <br />
                                    <input type="email" onBlur={handleBlur} name="email" className="formControl" placeholder="Enter email" required />
                                </div>

                                <div className="form-group">
                                    <label className="pass-label">Password</label>
                                    <br />
                                    <input type="password" onBlur={handleBlur} name="password" className="formControl" placeholder="Enter password" required />
                                </div>

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" onBlur={handleBlur} className="custom-control-input" id="customCheck1" required />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>

                                <p className="forgot-password text-right">
                                    Forgot <a href="#">password?</a>
                                </p>
                            </form>
                        </>
                    ) : (
                        <>
                            <form>
                                <h3 className="create-account">Create an account</h3>
                                <div className="form-group">
                                    <label className="name-label">Name</label>
                                    <br />
                                    <input type="Name" onBlur={handleBlur} name="name" className="formControl" placeholder="Enter Your Name" required />
                                </div>

                                <div className="form-group">
                                    <label className="email-label">Email Address</label>
                                    <br />
                                    <input type="email" onBlur={handleBlur} name="email" className="formControl" placeholder="Enter Your Email" required />
                                </div>
                                <div className="form-group">
                                    <label className="pass-label">Password</label>
                                    <br />
                                    <input type="password" onBlur={handleBlur} className="formControl" name="password" placeholder="Enter password" required />
                                </div>

                                <div className="form-group">
                                    <label className="confirm-label">Confirm Password</label>
                                    <br />
                                    <input type="password" onBlur={handleBlur} name="confirmPassword" className="formControl" placeholder="Confirm Password" required />
                                    {
                                        (user.confirmPassword === user.password) ? (
                                            <>
                                            </>
                                        ): (
                                            <>
                                                <p style={{ color: "red" }}>Passwords do not match.</p>
                                            </>
                                        )
                                    }
                                </div>
                            </form>
                        </>
                    )
                    }


                </div>

                <div className="btn-container">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin} className="btn btn-primary  btn-login">Login</button>
                            <p>
                                Don't have an account ? 
                                <p className="btn-common-create" onClick={() => setHasAccount(!hasAccount)}><a href="#">Create an new account</a></p>
                            </p>
                        </>
                    ) : (
                        <>
                            {user.password === user.confirmPassword &&
                                <button onClick={handleSignUp} className="btn btn-primary btn-login">Create an account</button>}
                            <p>
                                Have an account ? {" "}
                                <p className="btn-common-login" onClick={() => setHasAccount(!hasAccount)}><a href="#">Login</a></p>
                            </p>
                        </>
                    )
                    }
                </div>

                <div className="Another-auth">
                    {/* <p>                           Or                          </p> */}
                    <button onClick={handleGoogleSignIn} className="btn-modify"> <FontAwesomeIcon icon={faGoogle} size="2x" className="icon-size" /><span className="btn-text">Continue with Google</span> </button>
                    <br />
                    <button onClick={handleFbSignIn} className="btn-modify2"> <FontAwesomeIcon icon={faFacebook} size="2x" className="icon-size2" /><span className="btn-text">Continue with Facebook </span></button>

                </div>


                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {!hasAccount ? 'created' : 'Logged In'} successfully</p>
                }



            </div>


        </div>



    );
}

export default Login;
