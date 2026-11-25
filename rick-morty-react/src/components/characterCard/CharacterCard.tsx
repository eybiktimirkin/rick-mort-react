import { memo } from "react";
import { Link } from "react-router-dom";
import type { Character } from "../../types/character";
import "./CharacterCard.css";

type CharacterCardProps = {
  character: Character;
};

function CharacterCard(props: CharacterCardProps) {
  const statusClass =
    props.character.status === "Alive"
      ? "alive"
      : props.character.status === "Dead"
        ? "dead"
        : "unknown";

  return (
    <Link className="character-card" to={`/character/${props.character.id}`}>
      <img src={props.character.image} alt={props.character.name} />
      <h2>{props.character.name}</h2>
      <h3 className={statusClass}>{props.character.status}</h3>
      <h3>{props.character.species}</h3>
    </Link>
  );
}

export default memo(CharacterCard);
