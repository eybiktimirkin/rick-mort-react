import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { Character } from "../types/character";

export default function CharacterDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: character,
    isLoading,
    error,
  } = useFetch<Character>(
    id ? `https://rickandmortyapi.com/api/character/${id}` : null,
  );

  if (!id) {
    return <p>ID персонажа не указан</p>;
  }

  if (isLoading) {
    return <p>Данные загружаются...</p>;
  }

  if (error) {
    return (
      <div className="error-page">
        {error.status === 404 ? (
          <p>Персонаж не найден</p>
        ) : (
          <p>Не удалось загрузить персонажа...</p>
        )}
        <button onClick={() => navigate("/")}>На главную</button>
      </div>
    );
  }
  if (!character) {
    return <p>Персонаж не найден</p>;
  }
  return (
    <div>
      <h1>Персонаж № {id}</h1>
      <h2>Имя: {character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Статус: {character.status}</p>
      <p>{character.species}</p>
      <p>Пол: {character.gender}</p>
      <p>Происхождение: {character.origin.name}</p>
      <p>Место дислокации: {character.location.name}</p>
      <button onClick={() => navigate(-1)}>Назад</button>
      <button onClick={() => navigate("/")}>На главную</button>
    </div>
  );
}
