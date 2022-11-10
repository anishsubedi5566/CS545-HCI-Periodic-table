import "./App.css";
import PeriodicTable from "./components/PeriodicTable";

import QuizMode from "./components/QuizMode";

function App() {
  return (
    <div className="App">
      <h1>Periodic Table</h1>
      {/* <PeriodicTable /> */}
      <QuizMode />
    </div>
  );
}

export default App;
