import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CharacterCard from "../components/characterCard/CharacterCard.jsx";
import useFetch from "../hooks/useFetch.js";
import useDebounce from "../hooks/useDebounce.js";
import Loader from "../components/Loader.jsx";

export default function CharactersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("name") || "");
  const debouncedSearch = useDebounce(search, 400);
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  const params = new URLSearchParams();

  if (debouncedSearch) {
    params.set("name", debouncedSearch);
  }
  if (status !== "all") {
    params.set("status", status);
  }

  const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;

  const { data, isLoading, error, refetch } = useFetch(url);

  useEffect(() => {
    let params = {};
    if (debouncedSearch) {
      params.name = debouncedSearch;
    }
    if (status !== "all") {
      params.status = status;
    }
    setSearchParams(params);
  }, [debouncedSearch, status, setSearchParams]);

  if (isLoading) {
    return <Loader />;
  }
  if (error && error.status !== 404) {
    return (
      <div>
        <p>Не удалось загрузить персонажей</p>
        <button onClick={refetch}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Поиск персонажа"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <select
        className="input"
        value={status}
        onChange={(event) => {
          setStatus(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <h1>Rick and Morty</h1>
      {error?.status === 404 ? (
        <p>Персонажи не найдены</p>
      ) : (
        <div className="item-list">
          {data.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

      <p>Всего персонажей: {data.results.length}</p>
    </div>
  );
}
