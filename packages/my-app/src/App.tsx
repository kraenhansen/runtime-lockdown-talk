import { greet } from "my-lib";

const greeting = greet();

import './App.css'

function App() {
  return (
    <>
      <h1>My Awesome App</h1>
      <h2>{greeting}</h2>
    </>
  )
}

export default App
