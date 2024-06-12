import Header from "./components/header/Header";
import Home from "./components/home";
import { TripProvider } from "./contexts/tripContext";

function App() {
  return (
    <TripProvider>
      <div className="app">
        <Header />
        <Home />
      </div>
    </TripProvider>
  );
}

export default App;
