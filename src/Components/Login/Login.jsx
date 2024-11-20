import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebaseInit/firebaseInit";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();

//   forgot password
const handlerForgotPassword = () =>{
    console.log("email address",emailRef.current.value)
    const email = emailRef.current.value;
    if(!email)
    {
        console.log("please provide a valid email address.")
    }
    else{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            console.log("please new password setup")
        })
    }
}

  const handlerLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // reset option
    setSuccess(false);
    setLoginError("");

    //login
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        if (!result.user.emailVerified) {
          setLoginError("Please Verify Your Email Address.")
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handlerLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label onClick={handlerForgotPassword} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {success && (
            <p className="text-green-400 text-2xl font-bold mb-8 text-center">
              Successfully Login!
            </p>
          )}
          {loginError && (
            <p className="text-red-400 font-bold text-xl text-center mb-8">
               {loginError}
            </p>
          )}
          <p className="text-2xl mb-6 text-center">
            Please Sing Up First!
            <Link
              className="text-blue-500 decoration-clone mx-2 underline"
              to="/register"
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
