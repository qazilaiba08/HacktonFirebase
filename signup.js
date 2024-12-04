
import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

let signUpBtn = document.getElementById('signup')
if(signUpBtn){
    signUpBtn.addEventListener('click',(e) => {

       e.preventDefault()
        
let signUpEmail = document.getElementById('email');
let signUpPass = document.getElementById("password");

if(signUpEmail.value && signUpPass.value){
    //validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
        if (!emailPattern.test(signUpEmail.value)) {
            console.log("Invalid email format");
        } else if (!passwordPattern.test(signUpPass.value)) {
            console.log("Password does not meet complexity requirements");
        } 
         createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPass.value)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              console.log('User signed up successfully:', user);
              Swal.fire({
                title: "Success!",
                text: "You have signed up successfully!",
                icon: "success",
              });
              location.href='./login.html'
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error during sign-up:", error.message);
              Swal.fire({
                icon: "error",
                title: "Sign-Up Error",
                text: "An error occurred during sign-up. Please try a different email.",
              });
            })
}

})
}