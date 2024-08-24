export const fetchData = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
};

export const fetchProductById = async (productId) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const product = await response.json();
  return product;
};