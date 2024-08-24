import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const productId = parseInt(id, 10);
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const product = storedProducts.find((p) => p.id === productId);

    if (product) {
      setEditedTitle(product.title);
      setEditedDescription(product.description);
    }
  }, [id]);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleSaveChanges = () => {
    try {
      // Aktualizuj dane w localStorage
      const productId = parseInt(id, 10);
      const storedProducts = JSON.parse(localStorage.getItem("products")).map(
        (p) => {
          if (p.id === productId) {
            return { ...p, title: editedTitle, description: editedDescription };
          }
          return p;
        }
      );

      localStorage.setItem("products", JSON.stringify(storedProducts));

      // Przekieruj użytkownika z powrotem do strony z produktami
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={editedTitle} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={editedDescription}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProduct;
