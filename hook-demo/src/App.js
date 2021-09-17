import "./App.css";
import useXState from './hooks/useXState'
import useTitle from './hooks/useTitle'
import useUpdate from './hooks/useUpdate'

function App() {
  const [number, setNumber] = useXState(0)
  const update = useUpdate()

  const handleSetNumber = () => {
    setNumber(number + 1, (state) => {
      console.log(state, '=====')
    })
  }

  useTitle('hooks-demo')

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {number}
        </p>
        <button onClick={handleSetNumber}/>
        {Date.now()}
        <button onClick={update}/>
      </header>
    </div>
  );
}

export default App;
