import AppRouter from "./routes/AppRoutes";
import "./App.css";
import { AppDataProvider } from "./Context.jsx";

function App() {
  return (
    <div className="app">
      <AppDataProvider>
        <AppRouter />
      </AppDataProvider>
    </div>
  );
}

export default App;
