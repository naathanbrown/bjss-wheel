import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette'
import './App.css';


function App() {
  const startArray: any[] = JSON.parse(localStorage.getItem("data") ?? "[]");
  const [data, setData] = useState(startArray)
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [input, setInput] = useState('');
  const [showWinner, setShowWinner] = useState(false)
  const listItems = data.map((d) => <div> <li key={d.option}>{d.option}</li> <button onClick={() => removeFromData(d.option)}>Remove</button> </div>);

  const handleSpinClick = () => {
    setShowWinner(false);
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const handleSpinClickRemove = () => {
    data.splice(prizeNumber, 1);
    setData(data);
    localStorage.setItem('data', JSON.stringify(data))
    setShowWinner(false);
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const updateDataArray = () => {
    if(!mustSpin && input !== '') {
      localStorage.setItem('data', JSON.stringify([...data, {option: input}]))
      setData( data => [...data, {option: input}]);
      setInput('')
    }
  }

  const removeFromData = (dataItem: any) => {
    if(!mustSpin) {
      let newData = data.filter(item => item.option !==  dataItem)
      console.log(newData);
      setData(newData)
      localStorage.setItem('data', JSON.stringify(newData))
    }
  }

  const removeAllData = () => {
    if(!mustSpin){
      setData([]);
      localStorage.setItem('data', JSON.stringify([]))
    }
  }

  return (
  <> 
    <h1>BJSS Wheel Spinner</h1>
    {showWinner && data[prizeNumber] && 
        <h2>{`The Winner is: ${data[prizeNumber].option}`}</h2>
    }
    {data.length !== 0 &&
      <> 
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#FF0000', '#FFD700', '#7CFC00', '#006400', '#00FFFF', '#4B0082', '#FF1493']}
          textColors={['#ffffff']}
          onStopSpinning={() => {
            setMustSpin(false)
            setShowWinner(true)
          }}
        />
        <button onClick={handleSpinClick}>SPIN</button>
        {showWinner && <> <button onClick={handleSpinClickRemove}>Spin With Name Removed</button> </>}
      </>
    }
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={updateDataArray}>Add to list</button>
      {listItems}
      <button onClick={removeAllData}>Remove All</button>
    </>
  );
}

export default App;
