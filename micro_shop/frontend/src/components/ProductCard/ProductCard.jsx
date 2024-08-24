import './ProductCard.css'

const ProductCard = ({id, title, description, imageURL, handleEditClick}) => {
  return (
    <div className="productCard">
      <b>{title}</b>
      <p>{description}</p>
      <img src={imageURL} />
      <button onClick={handleEditClick}>Edit</button>
    </div>
  )
}

export default ProductCard