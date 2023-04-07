export const charactersToNodes = (characters): Node[] => {
  return characters.map(character => {
    return {
      id: character.id,
      label: character.name
    }
  });
}
