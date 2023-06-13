const loginForm = document.getElementById("loginForm")
const createAccountButton = document.getElementById('create-account')



// Login Functionality
loginForm.addEventListener("submit", async (e) => {
   e.preventDefault()
 
   // Gather form data
   const email = document.getElementById("email").value
   const password = document.getElementById("password").value
 
   try {
     // Send POST request to server using Axios
     const response = await axios.post("/api/user/login", { email, password })
 
     if (response.status === 200) {
       // Successful login, redirect
       window.location.href = "/profile.html"
     } else {
       // Error occurred, display the error message
       document.getElementById("loginError").textContent = response.data.message
     }
   } catch (error) {
     console.error(error)
     // Error occurred, display the error message
     document.getElementById("loginError").textContent = "Internal server error"
   }
 })
 

//  // Sign Out Functionality
// const signOutButton = document.getElementById("signOutButton")
// signOutButton.addEventListener("click", () => {
//    axios.put("/api/user/logout")
//       .then((response) => {
//          if (response.status === 200) {
//          // Successfully signed out, redirect to login page
//          window.location.href = "index.html"
//          } else {
//          // Error 
//          console.error(response.data.error)
//          }
//       })
//       .catch((error) => {
//          console.error(error)
//       })
// })
 
   



// Create Account Button Takes You To Create Account Form
createAccountButton.addEventListener('click', () => {
   window.location.href = 'createAccount.html'
})