/* King Ali Store Product System */

(function () {
  "use strict";

  const STORAGE_KEY = "kingAliStoreProducts";

  // Get products from BOTH sources: hardcoded + localStorage
  function getProducts() {
    // Start with hardcoded products from products.js
    let allProducts = Array.isArray(KING_ALI_PRODUCTS) ? [...KING_ALI_PRODUCTS] : [];
    
    // Add products from localStorage (user-added products)
    const savedProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    allProducts = allProducts.concat(savedProducts);
    
    return allProducts;
  }

  function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  /* ADD PRODUCT */

  const form = document.querySelector("form");

  if (
    form &&
    window.location.pathname.toLowerCase().includes("add-product")
  ) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const inputs = form.querySelectorAll("input");

      const name = inputs[0]?.value.trim() || "";
      const category = inputs[1]?.value.trim() || "";
      const price = Number(inputs[2]?.value || 0);
      const stock = Number(inputs[3]?.value || 0);

      const description =
        form.querySelector("textarea")?.value.trim() || "";

      const imageFile =
        form.querySelector('input[type="file"]')?.files?.[0];

      if (!name) {
        alert("Please enter a product name.");
        return;
      }

      if (price < 0 || stock < 0) {
        alert("Price and stock cannot be negative.");
        return;
      }

      try {
        const image = await fileToDataURL(imageFile);

        const product = {
          id: "KA-" + Date.now(),
          name: name,
          category: category,
          price: price,
          stock: stock,
          description: description,
          image: image
        };

        // Only save to localStorage (not hardcoded products)
        const savedProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        savedProducts.push(product);
        saveProducts(savedProducts);

        alert("Product saved successfully! 🛒👑");

        form.reset();

      } catch (error) {
        alert("Could not save the product.");
        console.error(error);
      }
    });
  }

})();
