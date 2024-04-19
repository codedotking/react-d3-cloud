import { ReactD3Cloud } from "../lib/react-d3-cloud";
import { words } from "./utils/word";
function App() {
  return (
    <div>
      <ReactD3Cloud
        words={
          words(100).map((word) => ({
            text: word,
            size: Math.random() * 100 + 65,
          })) as any
        }
      />


      <div>
          
      </div>
    </div>
  );
}

export default App;
