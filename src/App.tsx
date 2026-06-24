import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Programs from "./pages/Programs";
import MiniMusic from "./pages/MiniMusic";
import Policies from "./pages/Policies";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="story" element={<Story />} />
        <Route path="programs" element={<Programs />} />
        <Route path="programs/minimusic" element={<MiniMusic />} />
        <Route path="policies" element={<Policies />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
