import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CharacterDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: character,
    isLoading,
    error,
  } = useFetch(`https://rickandmortyapi.com/api/character/${params.id}`);

  if (isLoading) {
    return <p>Данные загружаются...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Не удалось загрузить персонажа...</p>
        <button onClick={() => navigate("/")}>На главную</button>
      </div>
    );
  }
  return (
    <div>
      <h1>Персонаж № {params.id}</h1>
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
