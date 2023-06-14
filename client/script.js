const loginForm = document.getElementById("loginForm")
const signOutButton = document.getElementById("signOutButton")
const createAccountButton = document.getElementById('create-account')
const createAccountForm = document.getElementById("createAccountForm")
const searchButton = document.getElementById("searchButton")
const searchInput = document.querySelector("#searchInput").value



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


// Search Button
searchButton.addEventListener("click", async () => {
   const searchInput = document.getElementById("searchInput").value
   console.log(searchInput)
   
   const response = await axios.get(`http://localhost:3001/api/user/name/${searchInput}`)

   if (response.status === 200) {
      const user = response.data
      console.log(user)
      // Populate user's name and profile picture
      const findFriends = document.getElementById('findFriends') //its a 'div'
      const profileImageElement = document.createElement('img')
      const usernameElement = document.createElement('span')
      profileImageElement.src = user.profilePicture
      usernameElement.textContent = user.name
      findFriends.appendChild(profileImageElement)
      findFriends.appendChild(usernameElement)
      // document.getElementById("userName").textContent = user.name
      // document.getElementById("userProfilePicture").src = user.profilePicture
   } else {
      // No user found, display suggestions
      const suggestionsResponse = await axios.get("http://localhost:3001/api/user")
      if (suggestionsResponse.status === 200) {
         const users = suggestionsResponse.data
         // Populate users to befriend
         const suggestionsContainer = document.getElementById("suggestionsContainer")
         suggestionsContainer.innerHTML = "" // Clear previous suggestions
         users.forEach((user) => {
         const suggestion = document.createElement("div")
         suggestion.textContent = user.name
         suggestionsContainer.appendChild(suggestion)
      })
    }
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



