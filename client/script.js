const loginForm = document.getElementById("loginForm")
const signOutButton = document.getElementById("signOutButton")
const createAccountButton = document.getElementById('create-account')
const createAccountForm = document.getElementById("createAccountForm")



// Login Functionality
loginForm.addEventListener("submit", async (e) => {
   e.preventDefault()
   
   // Gather form data
   const email = document.getElementById("email").value
   const password = document.getElementById("password").value
   
   try {
      const response = await axios.post("http://localhost:3001/api/user/login", { email, password })
      
      localStorage.setItem("email", email)
      
      if (response.status === 200) {
         // Successful login, redirect
         window.location.href = "profile.html"
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

// Create Account Button
createAccountButton.addEventListener('click', () => {
   window.location.href = 'createAccount.html'
})


// Create and Post New Account
createAccountForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Gather form data
  const name = document.getElementById("name").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const city = document.getElementById("city").value
  const description = document.getElementById("description").value

  try {
    const response = await axios.post("http://localhost:3001/api/user/create", {
      name,
      username,
      email,
      password,
      city,
      description,
    })

    if (response.status === 201) {
      // Account created successfully, redirect to login page
      window.location.href = "index.html"
    } else {
      // Error occurred, display the error message
      console.error(response.data.message)
    }
  } catch (error) {
    console.error(error)
    // Error occurred, display the error message
    document.getElementById("createAccountError").textContent = "Internal server error"
  }
})



// Sign Out Functionality
signOutButton.addEventListener("click", () => {
   const email = localStorage.getItem("email")
   
   axios.post("http://localhost:3001/api/user/logout", {email})
   .then((response) => {
      if (response.status === 200) {
         
         // Successfully signed out, redirect to login page
         window.location.href = "index.html"
      } else {
         // Error 
         console.error(response.data.error)
      }
   })
   .catch((error) => {
      console.error(error)
   })
})



