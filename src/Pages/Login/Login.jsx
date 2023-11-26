import { useContext, useRef, useState } from "react";
import { BsEye, BsEyeSlash, BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import swal from "sweetalert";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Firebase/AuthProvider";
import { app } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";



const Login = () => {
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null)

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                swal("Welcome!", "Log In successfully!", "success");
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    profile: result?.user?.photoURL,
                    role: ''
                  }
                  axiosPublic.post('/user', userInfo)
                    .then(res => {
                      if (res.data.insertedId) {
                        console.log('user added to the database')
                        // reset();
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'User created successfully.',
                          showConfirmButton: false,
                          timer: 1500
                        });
                        navigate(location?.state ? location.state : '/');
                      }
                    });
            })
            .catch(() => {
                swal("Sorry!", "Try again!", "error");
            })
    }

    const { signIn, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log('location i n the login page', location)

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setShowPassword(password);
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                swal("Welcome!", "Log In successfully!", "success");
                navigate(location?.state ? location.state : '/');


            })
            .catch(error => {
                console.log(error);
                swal("Sorry!", "Email or Password doesn't match. Try Again!", "error");
            })
    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        console.log(email);
        if (!email) {
            swal("Sorry!", "Right email please!", "error");
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            swal("Sorry!", "Valid email please!", "error");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                swal("Okay!", "Check your email please!", "success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal("Sorry!", "Valid email please!", "error");
            });
    }

    return (
        <div className="mx-5 md:mx-10 lg:mx-15 my-5 md:my-10 lg:my-15">
            {
                user ?
                    <div className="text-center">
                        <Helmet>
                            <title>{'Corner Cafe | My Profile'}</title>
                        </Helmet>
                        <h1 className="text-center p-5 text-4xl font-bold border-b-8 border-r-8 text-yellow-600 rounded-2xl border-yellow-600 mt-8 md:mt-12 lg:mt-16 ">My Profile Page</h1>
                        <img src={user?.photoURL} alt="" className="rounded-lg mx-auto my-3" />
                        <p className="my-3 font-bold">Welcome</p>
                        <p className="my-3 font-bold text-yellow-600">Name: {user?.displayName}</p>
                        <p className="my-3 font-bold">Email: {user?.email}</p>
                    </div> :
                    <div className="">
                        <Helmet>
                            <title>{'Corner Cafe | Login '}</title>
                        </Helmet>
                        <h1 className="text-center p-5 text-4xl font-bold border-b-8 border-l-8 text-yellow-600 rounded-2xl border-yellow-600 mt-8 md:mt-12 lg:mt-16 ">Please Log In</h1>
                        <div className="border-r-8 border-yellow-600 mt-5 rounded-lg p-5">
                            <form onSubmit={handleLogin} className="w-full">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl font-bold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailRef}
                                        placeholder="Email"
                                        className="input input-bordered border-yellow-600 text-black" required />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl font-bold">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        className="input input-bordered border-yellow-600 text-black" required />
                                    <span className="absolute text-4xl right-2 bottom-10" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>
                                        }
                                    </span>
                                    <label className="label">
                                        <a onClick={handleResetPassword} href="#" className="label-text-alt text-black link link-hover font-semibold">Forgot password?</a>
                                        {/* <a onClick={handleResetPassword} href="#" className="label-text-alt text-black link link-hover font-semibold">Forgot password?</a> */}
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="bg-yellow-600 font-bold text-center hover:bg-yellow-800 text-white p-3 rounded-lg">Login</button>
                                </div>
                            </form>
                            <p className="font-semibold my-4"> Are you New? Please <Link to="/registration" className="text-yellow-600 font-extrabold"> <span> Register</span></Link></p>
                        </div>
                        <h3 className="text-center text-3xl font-bold"> Or </h3>
                        <div className="flex justify-center items-center py-3 rounded-lg border-yellow-600 border-l-8">

                            <Link onClick={handleGoogleSignIn} className=" gap-2 flex justify-center items-center">

                                <button className="text-2xl font-bold px-5 bg-yellow-600 rounded-2xl py-3 text-white"><BsGoogle className="text-white mb-1 inline mx-3"></BsGoogle> Google</button>
                            </Link>

                        </div>
                    </div>
            }
        </div>
    );
};

export default Login;