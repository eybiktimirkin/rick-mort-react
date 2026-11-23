import { memo } from "react";
import { Link } from "react-router-dom";
import "./CharacterCard.css";

function CharacterCard(props) {
  const statusClass =
    props.character.status === "Alive"
      ? "alive"
      : props.character.status === "Dead"
        ? "dead"
        : "unknown";

  return (
    <Link to={`/character/${props.character.id}`}>
      <img src={props.character.image} alt={props.character.name} />
      <h2>{props.character.name}</h2>
      <h3 className={statusClass}>{props.character.status}</h3>
      <h3>{props.character.species}</h3>
    </Link>
  );
}

export default memo(CharacterCard);
