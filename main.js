// Get all items and popup elements
const items = document.querySelectorAll('.item');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupPrice = document.getElementById('popup-price');
const popupDescription = document.getElementById('popup-description');
const popupImage = document.getElementById('popup-image');
const closeButton = document.querySelector('.popup-window .close');

// Loop through each item and add a click event listener
items.forEach(item => {
  item.addEventListener('click', function() {
    const title = this.getAttribute('data-title');
    const price = this.getAttribute('data-price');
    const description = this.getAttribute('data-description');
    const image = this.getAttribute('data-image');

    // Populate the popup with item details
    popupTitle.textContent = title;
    popupPrice.textContent = "Price: " + price;
    popupDescription.textContent = description;
    popupImage.src = image;  // Update the image source in the popup

    // Display the popup
    popup.style.display = 'block';
  });
});

// Close the popup when the close button is clicked
closeButton.addEventListener('click', function() {
  popup.style.display = 'none';
});

// Close the popup when clicking outside of the popup content
window.addEventListener('click', function(event) {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

// Array to store items in the cart
let cart = [];

// Get cart popup elements
const cartPopup = document.getElementById('cart-popup');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const closeCartButton = document.querySelector('.cart-popup .close-cart');

// Add to cart button (inside the item popup)
const addToCartButtons = document.querySelectorAll('.add-to-cart'); // Ensure this matches the button class in your HTML

// Get the cart icon
const cartIcon = document.querySelector('li a span.material-symbols-outlined');

// Event listener for the cart icon click (to show cart popup)
cartIcon.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent any default anchor behavior if needed
  cartPopup.style.display = 'block'; // Show the cart popup
  updateCart(); // Ensure cart content is updated
});

// Event listener for each "Add to Cart" button
addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Get the item details from the popup
    const title = popupTitle.textContent;
    const price = popupPrice.textContent.replace("Price: ", "");
    const description = popupDescription.textContent;
    const size = document.getElementById('size-select').value;
    
    // Add the item to the cart array
    cart.push({ title, price, description, size });
    
    // Update the cart popup
    updateCart();
    
    // Show the cart popup
    cartPopup.style.display = 'block';
  });
});

// Update cart function to refresh the cart items
function updateCart() {
  cartItemsContainer.innerHTML = ''; // Clear current items
  
  // Loop through the cart array and display each item
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    cartItem.innerHTML = `
      <div>
        <p><strong>${item.title}</strong></p>
        <p>${item.description}</p>
        <p>Size: ${item.size}</p>
      </div>
      <div>
        <p>${item.price}</p>
        <button class="delete-item" data-index="${index}">Remove</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
  totalPriceElement.textContent = `Total: $${totalPrice}`;
  
  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-item');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      cart.splice(index, 1); // Remove the item from the cart array
      updateCart(); // Refresh the cart
    });
  });
}

// Close the cart popup when the close button is clicked
closeCartButton.addEventListener('click', function() {
  cartPopup.style.display = 'none';
});

// Close the cart popup when clicking outside of the popup content
window.addEventListener('click', function(event) {
  if (event.target === cartPopup) {
    cartPopup.style.display = 'none';
  }
});
