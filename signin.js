import { getAuth, signInWithEmailAndPassword } from './firebase.js';

const auth = getAuth();

let btn =  document.getElementById("signInBtn")
  
if(btn){
   btn.addEventListener('click', () => {
 
let signInEmail = document.getElementById('email');
let signInPass = document.getElementById("password");
      
        if(signInEmail.value && signInPass.value){
//validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailPattern.test(signInEmail.value)) {
        console.log("Invalid email format");
    } else if (!passwordPattern.test(signInPass.value)) {
        console.log("Password does not meet complexity requirements");
    } 
    //Firebase Authentication
        signInWithEmailAndPassword(auth,  signInEmail.value, signInPass.value)
          .then((userCredential) => {
            const user = userCredential.user;
              if (!user.emailVerified) {
                 Swal.fire({
                  icon: "error",
                  title: "Email Not Verified",
                  text: "Please verify your email before logging in.",
           });
            //  auth.signOut();
           } else {
                 Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: "Account login successfully!",
                   showConfirmButton: false,
                   timer: 1500,
            });
        
        }
         location.href = "./index.html"
     })
   
       .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
             Swal.fire({
              icon: "error",
               title: "Login Failed",
               text: errorMessage,
       });
    })

   }
  });
} 