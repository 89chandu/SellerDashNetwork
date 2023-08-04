// Get the references to the HTML elements
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
let products = []; // Initialize an empty array to store the products

// Function to calculate the total price value of all products
function calculateTotalPrice() {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  return totalPrice;
}

// Function to display the total price value on the page
function displayTotalPrice() {
  const totalValueElement = document.getElementById("totalValue");
  totalValueElement.innerHTML = `Total Value Worth: $${calculateTotalPrice()}`;
}

// Add a submit event listener to the form
productForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the input fields
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productColor = document.getElementById("productColor").value;
  const productSize = document.getElementById("productSize").value;
  const productQuantity = document.getElementById("productQuantity").value;
  const productCategory = document.getElementById("productCategory").value;

  // Check if all input fields have values
  if (productName && productPrice && productColor && productSize && productQuantity && productCategory) {
    // Create a new product object with the input values
    const newProduct = {
      name: productName,
      price: productPrice,
      color: productColor,
      size: productSize,
      quantity: productQuantity,
      category: productCategory, // Add the category field to the product object
    };

    try {
      // Send a POST request to add the new product to the server
      const response = await axios.post("https://crudcrud.com/api/1d2133b455bd4f5991e29fb6893ab32e/productData", newProduct);
      console.log("Product added successfully:", response.data);

      // Add the new product to the local products array
      products.push(response.data);

      // Render the updated product list on the page
      renderProductList();

      // Display the updated total price value
      displayTotalPrice();

      // Reset the form input fields after successful submission
      productForm.reset();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  }
});

// Function to render the list of products on the page
function renderProductList() {
  productList.innerHTML = ""; // Clear the existing list

  // Loop through the products array and create HTML elements for each product
  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <div>
        <strong>${product.name}</strong><br>
        Price: $${product.price}<br>
        Color: ${product.color}<br>
        Size: ${product.size}<br>
        Quantity: ${product.quantity}<br>
        Category: ${product.category} <!-- Display the category of the product -->
      </div>
      <button onclick="deleteProduct('${product._id}')">Delete</button>
    `;

    // Append the product element to the product list
    productList.appendChild(productItem);
  });

  // Display the updated total price value
  displayTotalPrice();
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
    // Send a DELETE request to remove the product from the server
    await axios.delete(`https://crudcrud.com/api/1d2133b455bd4f5991e29fb6893ab32e/productData/${productId}`);
    console.log("Product deleted successfully:", productId);

    // Update the local products array by filtering out the deleted product
    products = products.filter((product) => product._id !== productId);

    // Render the updated product list on the page
    renderProductList();

    // Display the updated total price value
    displayTotalPrice();
  } catch (err) {
    console.error("Error deleting product:", err);
  }
}

// Function to load the products from the server when the page loads
async function loadFromCrudCrud() {
  try {
    // Send a GET request to fetch the product data from the server
    const response = await axios.get("https://crudcrud.com/api/1d2133b455bd4f5991e29fb6893ab32e/productData");

    // Store the fetched products in the local products array
    products = response.data;

    // Render the product list on the page
    renderProductList();

    // Display the updated total price value
    displayTotalPrice();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

// Load products from the server when the page loads
loadFromCrudCrud();
