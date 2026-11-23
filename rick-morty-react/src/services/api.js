export default async function getAllCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  const data = await response.json();

  return data.results;
}

export async function getCharacterById(id) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
  );
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  const data = await response.json();

  return data;
}
