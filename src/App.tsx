import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLayout } from "./layout/LayoutContext";
import Analytics from "./components/Analytics";
import AppShell from "./components/AppShell";
import EditorialShell from "./components/EditorialShell";

// Classic (Refined Classic) pages
import Home from "./pages/Home";
import Story from "./pages/Story";
import Programs from "./pages/Programs";
import MiniMusic from "./pages/MiniMusic";
import Policies from "./pages/Policies";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";

// Editorial pages
import EdHome from "./pages/editorial/Home";
import EdStory from "./pages/editorial/Story";
import EdPrograms from "./pages/editorial/Programs";
import EdMiniMusic from "./pages/editorial/MiniMusic";
import EdPolicies from "./pages/editorial/Policies";
import EdTestimonials from "./pages/editorial/Testimonials";
import EdContact from "./pages/editorial/Contact";
import EdLogin from "./pages/editorial/Login";
import EdPrivacy from "./pages/editorial/Privacy";

export default function App() {
  const { layout } = useLayout();
  const ed = layout === "editorial";
  const pick = (classic: ReactNode, editorial: ReactNode) =>
    ed ? editorial : classic;

  return (
    <>
      <Analytics />
      <Routes>
        <Route element={ed ? <EditorialShell /> : <AppShell />}>
          <Route index element={pick(<Home />, <EdHome />)} />
          <Route path="story" element={pick(<Story />, <EdStory />)} />
          <Route path="programs" element={pick(<Programs />, <EdPrograms />)} />
          <Route
            path="programs/minimusic"
            element={pick(<MiniMusic />, <EdMiniMusic />)}
          />
          <Route path="policies" element={pick(<Policies />, <EdPolicies />)} />
          <Route
            path="testimonials"
            element={pick(<Testimonials />, <EdTestimonials />)}
          />
          <Route path="contact" element={pick(<Contact />, <EdContact />)} />
          <Route path="login" element={pick(<Login />, <EdLogin />)} />
          <Route path="privacy" element={pick(<Privacy />, <EdPrivacy />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
