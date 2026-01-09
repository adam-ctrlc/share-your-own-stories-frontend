import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { HomePage, PrivacyPolicy, TermsOfService, ExperienceDetail } from "./pages";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          className: "glass",
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </>
  );
}
