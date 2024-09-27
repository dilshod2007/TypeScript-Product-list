"use strict";
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const product = {
        name: formData.get("name"),
        price: parseFloat(formData.get("price")),
        category: formData.get("category"),
        unit: formData.get("unit"),
        date_received: formData.get("date_received"),
        supplier: formData.get("supplier"),
    };
    saveProduct(product);
    displayProducts();
    alert("Product saved successfully!");
    productForm.reset();
});
function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}
function displayProducts(searchQuery = "") {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    productList.innerHTML = '';
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchQuery.toLowerCase()));
    filteredProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Unit:</strong> ${product.unit}</p>
      <p><strong>Date Received:</strong> ${product.date_received}</p>
      <p><strong>Supplier:</strong> ${product.supplier}</p>
      <button class="delete-button" type="button" style="margin-top: 10px; background-color: #f44336; border: none; color: white; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; border-radius: 4px" onclick="deleteProduct('${product.name}')">Delete</button>
    `;
        productList.appendChild(productCard);
    });
}
function deleteProduct(name) {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    products = products.filter(product => product.name !== name);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}
searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    displayProducts(searchQuery);
});
displayProducts();
