import React, { useContext } from 'react';
import {FavouritesContext } from '../App';
import { DisneyCharacter } from "../disney_character"

interface CharacterProps {
  character: DisneyCharacter;
	updateFavourites: (favourite: Array<number>) => void;
}

const Character : React.FC<CharacterProps> = ( { character, updateFavourites }) => {

  const characterFavourites = useContext(FavouritesContext);

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

  function toggleFavouriteForCharacter(characterId : number) {
    if(!characterFavourites.includes(characterId)) {
        // add to favourites
        updateFavourites([...characterFavourites, characterId]);
    }
    else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter((id) => id !== characterId);
      updateFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick = {() => toggleFavouriteForCharacter(character._id)}>
      {!characterFavourites.includes(character._id) ? "Add to Favourites" : "Favourited"}
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
} 

export default Character;