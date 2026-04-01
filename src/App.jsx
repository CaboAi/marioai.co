import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Portfolio from "./Portfolio";
import BlogIndex from "./blog/BlogIndex";
import BlogPost from "./blog/BlogPost";
import { trackPageView } from "./utils/analytics";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}
