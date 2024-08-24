import FetchAndDisplayProducts from "./FetchAndDisplayProducts";

function App() {
  return (
    <div className="flex-col items-center bg-gray-900 text-emerald-600">
      <div className="flex justify-center items-center py-10">
        <h1 className="text-4xl">Products</h1>
      </div>
      <FetchAndDisplayProducts />
    </div>
  );
}

export default App;
