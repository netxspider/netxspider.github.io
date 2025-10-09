import { useState, useEffect } from 'react'
import './App.css'
import {GoogleGenAI} from '@google/genai';

function App() {
  const [count, setCount] = useState(0)
  const GEMINI_API_KEY = 'AIzaSyAw1CdQD6ryJfhCf1jyNm9td_BJ4OHI_rk'


  async function fetchData() {
    console.log('Fetching data...');
    
  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hello Vite + React!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
