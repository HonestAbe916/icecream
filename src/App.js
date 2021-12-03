import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';
import Business from './Business';

function App() {
  const [data, setData] = React.useState(null); 

  React.useEffect(() => {
    axios.get('http://localhost:4000/Alpharetta/ice%20cream').then(results => {
      console.log(results.data);
      setData(results.data.data);
    }).catch(e => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      {data && data.businesses.map((res => <Business
        key={res.id}
        name={res.name}
        address={res.location.display_address}
        review={res.reviews.reviews[0].text}
        reviewer={res.reviews.reviews[0].user.name}
        />
      ))}
    </div>
  );
}

export default App;
