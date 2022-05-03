import { DisneyCharacter } from "../disney_character"

const Character : React.FC<{ character: DisneyCharacter}> = ( { character }) => {

  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl) {
    // API seems to include extra path for images so here we strip it off to fetch raw image	
    const endIndex = character.imageUrl.indexOf('/revision'); // now returning -1
    if(endIndex > 0) {
      imageSrc = character.imageUrl.substring(0, endIndex);
    }
    else {
      imageSrc = character.imageUrl;
    }
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions">
        Add to Favourites
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
} 

export default Character;