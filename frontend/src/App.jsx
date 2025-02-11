import AppRouter from "./routes/AppRoutes";
import "./App.css";
import { AppDataProvider } from "./Context.jsx";

function App() {
  return (
    <div>
      <AppDataProvider>
      <AppRouter />
      </AppDataProvider>
    </div>
  );
}

export default App;
