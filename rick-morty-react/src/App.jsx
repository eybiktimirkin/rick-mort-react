import { Routes, Route } from "react-router-dom";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CharactersPage />}></Route>
      <Route path="/character/:id" element={<CharacterDetailsPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
