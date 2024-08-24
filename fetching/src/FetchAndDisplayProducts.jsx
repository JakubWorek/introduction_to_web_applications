import React, { useState, useEffect } from 'react';

export default function FetchAndDisplayProducts() {
  const [data, setData] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [sortValue, setSortValue] = useState("none");
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setData(data.products);
    }
    
    fetchData();
  }, []);

  const getFilteredAndSortedProducts = () => {
    let filteredProducts = data;

    if (filterText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(filterText)
      );
    }

    if (sortValue === 'asc') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'desc') {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortValue === 'none'){
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

  return (
    <div className="">
      <div className="flex space-x-4 ml-4">
        <div className="flex space-x-2">
          <label className="inline-block">Filtruj:</label>
          <input 
            type="text" 
            id="filterInput" 
            className="border border-gray-300 rounded-md px-2 py-1" 
            onChange={
              handleFilterChange
            }>

            </input>
        </div>
        <div className="flex space-x-2">
          <label className="inline-block">Sortowanie:</label>
          <select 
            id="sortSelect" 
            className="border border-gray-300 rounded-md px-2 py-1"
            onChange={
              handleSortChange
            }>
            <option value="none">Brak sortowania</option>
            <option value="asc">Sortuj A-Z</option>
            <option value="desc">Sortuj Z-A</option>
          </select>
        </div>
      </div>
      <table className="basic mt-3">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Image</td>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts?.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.images[0]} alt={product.name} className='w-40' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}