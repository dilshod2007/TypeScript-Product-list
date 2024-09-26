const productForm = document.getElementById("productForm") as HTMLFormElement;
const productList = document.getElementById("productList") as HTMLDivElement;

interface Product {
  name: string;
  price: number;
  category: string;
  unit: string;
  date_received: string;
  supplier: string;
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(productForm);
  const product: Product = {
    name: formData.get("name") as string,
    price: parseFloat(formData.get("price") as string),
    category: formData.get("category") as string,
    unit: formData.get("unit") as string,
    date_received: formData.get("date_received") as string,
    supplier: formData.get("supplier") as string,
  };
  saveProduct(product);
  displayProducts();  
  alert("Product saved successfully!");
  productForm.reset();
});

function saveProduct(product: Product): void {
  const products = JSON.parse(localStorage.getItem("products") || "[]") as Product[];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts(): void {
  const products = JSON.parse(localStorage.getItem("products") || "[]") as Product[];
  productList.innerHTML = '';  
  products.forEach((product) => {
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

function deleteProduct(name: string): void {
  let products = JSON.parse(localStorage.getItem("products") || "[]") as Product[];
  products = products.filter(product => product.name !== name);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

displayProducts();
