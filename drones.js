document.addEventListener('DOMContentLoaded', async function () {
  const productContainer = document.getElementById('product-container');

  try {
    const response = await fetch('/api/drones'); // Fetch data for drones
    const productDetails = await response.json();

    if (Array.isArray(productDetails) && productDetails.length === 0) {
      productContainer.innerHTML = "<p>No product details available.</p>";
    } else {
      productDetails.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-box';
        productDiv.innerHTML = `
          <img src="${product.link}" alt="Product Image" class="product-image">
          <h4 class="product-info">${product.title}</h4>
          <h4 class="product-info price">Price: $Rs.{product.price}</h4>
          <h4 class="product-info">Rating: ${product.rating}</h4>
          <a href="${product['Buy Now']}" target="_blank" class="buy-button">Buy Now</a>
        `;
        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    productContainer.innerHTML = "<p>Failed to load product details.</p>";
  }
});
