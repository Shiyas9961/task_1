import TaskTable from "./pages/TaskTable";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskTable/>}/>
      <Route path="/login" element={<Signin/>}/>
    </Routes>
  )
}

export default App;
