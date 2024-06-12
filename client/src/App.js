import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./protected/Home";
import FoodDisplayer from "./food/foodDisplayer";
import GetEditForm from "./food/components/GetEditForm";
import GetAddFood from "./food/components/GetAddFood";
import Profile from "./auth/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/food" element={<FoodDisplayer />} />
            <Route path="/editfood" element={<GetEditForm />} />
            <Route path="/addfood" element={<GetAddFood />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
