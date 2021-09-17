import "./App.css";
import useXState from './hooks/useXState'

function App() {
  const [number, setNumber] = useXState(0)

  const handleSetNumber = () => {
    setNumber(number + 1, (state) => {
      console.log(state, '=====')
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {number}
        </p>
        <button onClick={handleSetNumber}/>
      </header>
    </div>
  );
}

export default App;
