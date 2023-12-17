
import './App.css';
import axios from 'axios'
import Navbar from './components/Navbar';
import Card from './components/Card';
import NewForm from './components/NewForm';
import { useEffect, useState } from 'react';

function App() {

  const [items, setItems] = useState([])

  useEffect(() => {
    //Fetch data from backend flask application
    axios.get('http://localhost:5000/api/items')
    .then(response =>{
      setItems(response.data)
    })
    .catch(error => console.error("Error fetching data :", error))
  }, [])

  return (
    <div className="App">
      <Navbar />
      <NewForm />
      <div className="mx-6 my-5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((card, index) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
