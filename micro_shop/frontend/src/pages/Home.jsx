import { useNavigate } from 'react-router-dom';

const Home = ({name}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products`);
  }

  return (
    <div className="home">
      <div>
        <h2>🛒 Welcome to little shop 🛒</h2>
      </div>
      {name && <div>Logged in as: {name}</div> }
      <div>
        <button onClick = {handleClick}>Go to products list</button>
      </div>
    </div>
  )
}

export default Home