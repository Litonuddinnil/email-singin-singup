import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebaseInit/firebaseInit";
// import { ToastContainer, toast } from "react-toastify"; // Import necessary components
// import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showIcon, setShowIcon] = useState(false);

  const handlerRegister = (event) => {
    
    event.preventDefault();
    setErrorMessage("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    console.log(email, password,terms,name,photo);

    if (password.length < 6) {
      setErrorMessage("Password must be 6 characters or longer");
      // toast.error("Password must be 6 characters or longer"); // Show error toast
      return;
    }
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    if (!regex.test(password)) {
      setErrorMessage("Password not valid ");
      // toast.error("Password not valid");
      return;
    }
     
    if(!terms){
      setErrorMessage("Please fill up terms and condition")
      return;
      
    }

    // createUserWithEmailAndPassword
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setErrorMessage("Successfully Login!")
        // toast.success("Registration successful!"); // Success toast

        //Email Verification
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          console.log("Your Email Verification Successfully!")
        });
        // update profile verification 
        const profile ={
          displayName: name,
          photoURL:photo
        }
        updateProfile(auth.currentUser,profile)
        .then(()=>{
          console.log("update profile")
        })
        .catch(error=>{
          console.log(error.message)
        })
      
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.message);
        // toast.error(err.message); // Show error toast from Firebase
      });
  };

  // icons  show or not

  return (
    <div className="max-w-sm mx-auto shadow-lg bg-gray-100 rounded-lg mt-24 p-6">
      <h1 className="text-4xl">Register</h1>
      <form onSubmit={handlerRegister}>
        <label className="input input-bordered flex items-center gap-2 my-6 ">
          <input
            type="text"
            name="name"
            className="grow"
            placeholder="Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-6 ">
          <input
            type="text"
            name="photo"
            className="grow"
            placeholder="Photo Url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-6 ">
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-6">
          <input
            type={showIcon ? "text" : "password"}
            className="grow"
            name="password"
            placeholder="Password"
          />
          <button
            onClick={() => setShowIcon(!showIcon)}
            className="btn btn-xs hover:text-red-700 "
          >
            {showIcon ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
          </button>
        </label>
        <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <input type="checkbox"   className="checkbox" name="terms" />
            <span className="label-text ml-2">Accept Our Team & Condition</span>
          </label>
        </div>
        <div className="text-center">
          <button className="btn btn-accent w-[80%] btn-outline">
            Register
          </button>
        </div>
      </form>

      {/* ToastContainer to display toasts */}
      {/* <ToastContainer></ToastContainer> */}
      {/* {errorMessage && <ToastContainer />} */}
      {errorMessage &&
      
       <p className="text-xl text-red-500 text-center">{errorMessage}</p>}

       <p>Already have a account Please! <Link className="text-blue-500 text-2xl decoration-clone mx-2 underline" to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
