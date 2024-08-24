import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { fetchData } from "../api/api";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortValue, setSortValue] = useState("none");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAndStore = async () => {
      try {
        const products = await fetchData();
        setData(products);
        localStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const storedProducts = localStorage.getItem('products');

    if (storedProducts) {
      setData(JSON.parse(storedProducts));
    } else {
      fetchDataAndStore();
    }
  }, []);

  const getFilteredAndSortedProducts = () => {
    let filteredProducts = data;

    if (filterText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(filterText)
      );
    }

    if (sortValue === "asc") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "desc") {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortValue === "none") {
      filteredProducts?.sort((a, b) => a.id - b.id);
    }

    return filteredProducts;
  };

  const filteredAndSortedProducts = getFilteredAndSortedProducts();

  const handleFilterChange = (event) => {
    setFilterText(event?.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortValue(event?.target.value);
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  }

  return (
    <>
      <div className="header">
        <h1>Products</h1>
        <div className="">
          <label className="">Filtruj:</label>
          <input
            type="text"
            id="filterInput"
            className=""
            onChange={handleFilterChange}
          ></input>
        </div>
        <div className="">
          <label className="">Sortowanie:</label>
          <select id="sortSelect" className="" onChange={handleSortChange}>
            <option value="none">Brak sortowania</option>
            <option value="asc">Sortuj A-Z</option>
            <option value="desc">Sortuj Z-A</option>
          </select>
        </div>
        <div>
        <button onClick = {() => {navigate('/home')}}>Go back</button>
        </div>
      </div>
      {filteredAndSortedProducts?.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            imageURL={product.images[0]}
            handleEditClick={() => {handleEditClick(product.id)}}
          />
        );
      })}
    </>
  );
};

export default Products;
