let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');

  // Fetch all toys from the server
  fetchToys();

  function fetchToys() {
      const url = 'http://localhost:3000/toys';
      fetch(url)
          .then(response => response.json())
          .then(toys => {
              toys.forEach(toy => renderToyCard(toy));
          })
          .catch(error => console.error('Error fetching toys:', error));
  }

  function renderToyCard(toy) {
      const card = document.createElement('div');
      card.classList.add('card');

      const h2 = document.createElement('h2');
      h2.textContent = toy.name;
      card.appendChild(h2);

      const img = document.createElement('img');
      img.src = toy.image;
      img.classList.add('toy-avatar');
      card.appendChild(img);

      const p = document.createElement('p');
      p.textContent = `${toy.likes} Likes`;
      card.appendChild(p);

      const button = document.createElement('button');
      button.textContent = 'Like ❤️';
      button.classList.add('like-btn');
      button.setAttribute('id', toy.id);
      button.addEventListener('click', () => likeToy(toy.id));
      card.appendChild(button);

      toyCollection.appendChild(card);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.add-toy-form');

  // Event listener for form submission to create a new toy
  toyForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(toyForm);
      const name = formData.get('name');
      const image = formData.get('image');
      
      // Prepare the POST request body
      const newToyData = {
          name: name,
          image: image,
          likes: 0
      };

      // Send POST request to add new toy
      const url = 'http://localhost:3000/toys';
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify(newToyData)
      })
      .then(response => response.json())
      .then(newToy => {
          renderToyCard(newToy); // Update DOM with new toy card
          toyForm.reset(); // Clear form inputs after submission
      })
      .catch(error => console.error('Error adding new toy:', error));
  });

  // Function to render toy card
  function renderToyCard(toy) {
      // Code for rendering toy card goes here (same as previous step)
      const card = document.createElement('div');
      card.classList.add('card');

      const h2 = document.createElement('h2');
      h2.textContent = toy.name;
      card.appendChild(h2);

      const img = document.createElement('img');
      img.src = toy.image;
      img.classList.add('toy-avatar');
      card.appendChild(img);

      const p = document.createElement('p');
      p.textContent = `${toy.likes} Likes`;
      card.appendChild(p);

      const button = document.createElement('button');
      button.textContent = 'Like ❤️';
      button.classList.add('like-btn');
      button.setAttribute('id', toy.id);
      button.addEventListener('click', () => likeToy(toy.id));
      card.appendChild(button);

      toyCollection.appendChild(card);
  
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.add-toy-form');

  // Event listener for "Like" button clicks
  toyCollection.addEventListener('click', event => {
      if (event.target.classList.contains('like-btn')) {
          const toyId = event.target.id;
          likeToy(toyId);
      }
  });

  function likeToy(toyId) {
      const url = `http://localhost:3000/toys/${toyId}`;
      
      // Fetch current toy data
      fetch(url)
          .then(response => response.json())
          .then(toy => {
              const newLikes = toy.likes + 1;
              
              // Prepare the PATCH request body
              const updatedToyData = {
                  likes: newLikes
              };

              // Send PATCH request to update toy likes
              return fetch(url, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json'
                  },
                  body: JSON.stringify(updatedToyData)
              });
          })
          .then(response => response.json())
          .then(updatedToy => {
              // Update DOM with new like count
              const toyCard = document.getElementById(updatedToy.id);
              const likeParagraph = toyCard.querySelector('p');
              likeParagraph.textContent = `${updatedToy.likes} Likes`;
          })
          .catch(error => console.error('Error updating likes:', error));
  }

  // Function to render toy card
  function renderToyCard(toy) {
      // Code for rendering toy card goes here (same as previous steps)
      const card = document.createElement('div');
      card.classList.add('card');

      const h2 = document.createElement('h2');
      h2.textContent = toy.name;
      card.appendChild(h2);

      const img = document.createElement('img');
      img.src = toy.image;
      img.classList.add('toy-avatar');
      card.appendChild(img);

      const p = document.createElement('p');
      p.textContent = `${toy.likes} Likes`;
      card.appendChild(p);

      const button = document.createElement('button');
      button.textContent = 'Like ❤️';
      button.classList.add('like-btn');
      button.setAttribute('id', toy.id);
      button.addEventListener('click', () => likeToy(toy.id));
      card.appendChild(button);

      toyCollection.appendChild(card);
  
  }
});

