import { BsEye, BsEyeSlash, BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { GoogleAuthProvider, getAuth, sendEmailVerification, signInWithPopup } from "firebase/auth";
import swal from "sweetalert";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Firebase/AuthProvider";
import { app } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";




const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, user } = useContext(AuthContext);
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
      .catch(() => error)
  }

  const handleRegister = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const photo = form.get('photoURL');
    const email = form.get('email');
    const password = form.get('password');
    setShowPassword(password);
    console.log(name, photo, email, password);

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      swal("Ohh Nooooo!", "Minimum 8 characters with minimum a CAPITAL letter, a small letter, a number and a special Character!", "error");
    }
    else {
      swal("Go ahead!", "You are in right track!", "success");
      createUser(email, password)
        .then((result) => {

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
          // console.log(result.user)
          // swal("Congratulations!", "Created successfully!", "success");


        });

    }


  }


  return (
    <div className="mx-5 md:mx-10 lg:md-15 my-5 md:my-10 lg:my-15">

      {
        user ? <div className="text-center">
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
              <title>{'Corner Cafe | Registration'}</title>
            </Helmet>
            <h1 className="text-center p-5 text-4xl font-bold border-b-8 border-r-8 text-yellow-600 rounded-2xl border-yellow-600 mt-8 md:mt-12 lg:mt-16 ">Please Registration</h1>
            <form onSubmit={handleRegister} className="border-l-8 rounded-lg mt-5 border-yellow-600 p-5">
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Name</span>
                </label>
                <input type="name" name="name" placeholder="Name" className="input input-bordered border-yellow-600 text-black" required />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Photo URL</span>
                </label>
                <input type="text" name="photoURL" placeholder="Enter your photoURL" className="input input-bordered border-yellow-600 text-black" required />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email" className="input input-bordered border-yellow-600 text-black" required />
              </div>
              <div className="form-control relative mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered border-yellow-600 text-black" required />
                <span className="absolute text-4xl right-2 bottom-2" onClick={() => setShowPassword(!showPassword)}>
                  {
                    showPassword ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>
                  }
                </span>
              </div>
              <input type="checkbox" name="terms" id="terms" required /> Accept terms and conditions
              <div className="form-control mt-6">
                <button className="bg-yellow-600 font-bold text-center hover:bg-yellow-800 text-white p-3 rounded-lg">Registration</button>
              </div>
              <p className="flex p-2 font-semibold"> Are you old user? Please <Link to="/login" className="px-2 text-yellow-600 font-extrabold"><span> Log In</span></Link></p>

            </form>
            <h3 className="text-center text-3xl p-3 font-bold"> Or </h3>
            <div className="flex justify-center items-center pb-5 border-r-8 rounded-lg border-yellow-600">

              <Link onClick={handleGoogleSignIn} className=" gap-2 flex justify-center items-center">
                <button className="text-2xl font-bold px-5 bg-yellow-600 rounded-2xl py-3 text-white"><BsGoogle className="text-white inline mx-3"></BsGoogle> Google</button>
              </Link>
            </div>
          </div>
      }
    </div>
  );
};

export default Registration;