import { RouterProvider } from "react-router";
import { router } from './Routes/Router.jsx';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;