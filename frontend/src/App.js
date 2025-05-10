import { BrowserRouter as Router } from "react-router-dom";
import Layout from './Components/Layout';
import AnimatedRoutes from './Components/AnimatedRoutes'; 

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
