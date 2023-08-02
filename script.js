const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
let products = [];

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productColor = document.getElementById("productColor").value;
  const productSize = document.getElementById("productSize").value;

  if (productName && productPrice && productColor && productSize) {
    const newProduct = {
      name: productName,
      price: productPrice,
      color: productColor,
      size: productSize,
    };

    // Save the new product to your API
    axios
      .post("https://crudcrud.com/api/abbdc63fa24842a894907806a02a5a9f/productData", newProduct)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        products.push(response.data); // Add the new product with the returned data (including _id) to the products array
        renderProductList();
        productForm.reset();
      })
      .catch((err) => {
        console.error("Error adding product:", err);
      });
  }
});

function renderProductList() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <div>
        <strong>${product.name}</strong><br>
        Price: $${product.price}<br>
        Color: ${product.color}<br>
        Size: ${product.size}
      </div>
      <button onclick="deleteProduct(${product._id})">Delete</button>
    `;

    productList.appendChild(productItem);
  });
}

function deleteProduct(index) {
  const productToDelete = products[index];
  // Delete the product from your API using the index as an identifier
  axios
    .delete(`https://crudcrud.com/api/abbdc63fa24842a894907806a02a5a9f/productData/${productToDelete._id}`)
    .then(() => {
      console.log("Product deleted successfully:", productToDelete._id);
      products.splice(index, 1); // Remove the product from the products array using the index
      renderProductList();
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
    });
}



function loadFromCrudCrud() {
  // Load data from your API
  axios
    .get("https://crudcrud.com/api/abbdc63fa24842a894907806a02a5a9f/productData")
    .then((response) => {
      products = response.data;
      renderProductList();
    })
    .catch((err) => {
      console.error("Error loading data:", err);
    });
}

loadFromCrudCrud(); // Load the data when the page loads
