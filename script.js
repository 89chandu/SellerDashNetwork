const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
let products = [];

productForm.addEventListener("submit", async (e) => {
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

    try {
      const response = await axios.post("https://crudcrud.com/api/b07054deaa48402fa1e2280b58fb57fa/productData", newProduct);
      console.log("Product added successfully:", response.data);
      products.push(response.data);
      renderProductList();
      productForm.reset();
    } catch (err) {
      console.error("Error adding product:", err);
    }
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
      <button onclick="deleteProduct('${product._id}')">Delete</button>
    `;

    productList.appendChild(productItem);
  });
}

async function deleteProduct(productId) {
  try {
    await axios.delete(`https://crudcrud.com/api/b07054deaa48402fa1e2280b58fb57fa/productData/${productId}`);
    console.log("Product deleted successfully:", productId);
    products = products.filter((product) => product._id !== productId);
    renderProductList();
  } catch (err) {
    console.error("Error deleting product:", err);
  }
}

async function loadFromCrudCrud() {
  try {
    const response = await axios.get("https://crudcrud.com/api/b07054deaa48402fa1e2280b58fb57fa/productData");
    products = response.data;
    renderProductList();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

loadFromCrudCrud();
