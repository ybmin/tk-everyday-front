import SpecificRouter from "routes";
import { AuthProvider } from "utils/auth";

function App() {
  return (
    <AuthProvider>
      <SpecificRouter />
    </AuthProvider>
  );
}

export default App;
