import{getAuth,getDoc,doc,collection,updateDoc,
    db,addDoc, serverTimestamp, query, orderBy, getDocs} from "./firebase.js"
// const auth = getAuth(app)

  
// Function to create a post
document.querySelector('.create-post-btn').addEventListener('click', async () => {
    const { value: formValues } = await Swal.fire({
      title: "Create Post",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Post Title">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Post Description"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Post",
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const description = document.getElementById("swal-description").value;
        if (!title || !description) {
          Swal.showValidationMessage("Both fields are required!");
          return false;
        }
        return { title, description };
      },
    });
  
    if (formValues) {
      try {
        const postsRef = collection(db, "posts");
        await addDoc(postsRef, {
          title: formValues.title,
          description: formValues.description,
          timestamp: serverTimestamp(),
        });
        Swal.fire("Post Added!", "Your post has been successfully added.", "success");
        displayPosts(); // Refresh posts
      } catch (error) {
        Swal.fire("Error", "Could not save the post. Please try again.", "error");
        console.error("Error saving post:", error);
      }
    }
  });
  
  async function displayPosts() {
    const postsContainer = document.getElementById("posts");
  
    if (!postsContainer) {
      console.error("The posts container was not found in the DOM.");
      return;
    }
  
    postsContainer.innerHTML = ""; // Clear existing posts
  
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
  
        if (!post.hidden) { // Skip hidden posts
          const postCard = `
            <div class="card mb-3 border-green" data-id="${postId}">
              <div class="card-body">
                <h5 class="card-title fontStyle">${post.title}</h5>
                <p class="card-text">${post.description}</p>
                <p class="text-muted small">${post.timestamp ? new Date(post.timestamp.toMillis()).toLocaleString() : "No timestamp"}</p>
                <button class="btn btn-warning edit-post-btn" data-id="${postId}">Edit</button>
                <button class="btn btn-danger delete-post-btn" data-id="${postId}">Delete</button>
                <button class="btn btn-secondary hide-post-btn" data-id="${postId}">Hide</button>
              </div>
            </div>
          `;
          postsContainer.innerHTML += postCard;
        }
      });
  
  // Function to handle post editing
  async function handleEditPost(event) {
    const postId = event.target.dataset.id;
    const postDoc = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postDoc);
  
    if (postSnapshot.exists()) {
      const post = postSnapshot.data();
      const { value: formValues } = await Swal.fire({
        title: "Edit Post",
        html: `
          <input id="swal-title" class="swal2-input" placeholder="Post Title" value="${post.title}">
          <textarea id="swal-description" class="swal2-textarea" placeholder="Post Description">${post.description}</textarea>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update Post",
        preConfirm: () => {
          const title = document.getElementById("swal-title").value;
          const description = document.getElementById("swal-description").value;
          if (!title || !description) {
            Swal.showValidationMessage("Both fields are required!");
            return false;
          }
          return { title, description };
        },
      });
  
      if (formValues) {
        try {
          await updateDoc(postDoc, {
            title: formValues.title,
            description: formValues.description,
            timestamp: serverTimestamp(),
          });
          Swal.fire("Post Updated!", "Your post has been successfully updated.", "success");
          displayPosts(); // Refresh posts
        } catch (error) {
          Swal.fire("Error", "Could not update the post. Please try again.", "error");
          console.error("Error updating post:", error);
        }
      }
    }
  }
  
  // Function to handle post deletion
  async function handleDeletePost(event) {
    const postId = event.target.dataset.id;
    const postDoc = doc(db, "posts", postId);
  
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        await deleteDoc(postDoc);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        displayPosts(); // Refresh posts
      } catch (error) {
        Swal.fire("Error", "Could not delete the post. Please try again.", "error");
        console.error("Error deleting post:", error);
      }
    }
  }
  
  // Function to search posts
  document.getElementById("search-bar").addEventListener("input", async (event) => {
    const searchText = event.target.value.toLowerCase();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = ""; // Clear posts
  
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef);
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        if (post.title.toLowerCase().includes(searchText)) {
          const postId = doc.id;
          const postCard = `
            <div class="card mb-3 border-green" data-id="${postId}">
              <div class="card-body">
                <h5 class="card-title fontStyle">${post.title}</h5>
                <p class="card-text">${post.description}</p>
                <p class="text-muted small">${post.timestamp ? new Date(post.timestamp.toMillis()).toLocaleString() : "No timestamp"}</p>
                <button class="btn btn-primary edit-post-btn" data-id="${postId}">Edit</button>
                <button class="btn btn-primary delete-post-btn" data-id="${postId}">Delete</button>
              </div>
            </div>
          `;
          postsContainer.innerHTML = postCard;
        }
      });
  
      // Reattach event listeners
      document.querySelectorAll('.edit-post-btn').forEach((btn) =>
        btn.addEventListener('click', handleEditPost)
      );
      document.querySelectorAll('.delete-post-btn').forEach((btn) =>
        btn.addEventListener('click', handleDeletePost)
      );
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  });
      // Reattach event listeners for buttons
      document.querySelectorAll('.edit-post-btn').forEach((btn) =>
        btn.addEventListener('click', handleEditPost)
      );
      document.querySelectorAll('.delete-post-btn').forEach((btn) =>
        btn.addEventListener('click', handleDeletePost)
      );
      document.querySelectorAll('.hide-post-btn').forEach((btn) =>
        btn.addEventListener('click', handleHidePost)
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  