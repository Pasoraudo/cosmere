class Relationship:
    def __init__(self, characterId1, characterId2):
        self.id = name
        self.characterId1 = characterId1
        self.characterId2 = characterId2
        self.type = "undefined"
        self.bookId = "scadrial"

    def __str__(self):
      return self.characterId1 + " <-> " + self.characterId2

    def __hash__(self):
      return hash(self.id)

    def __eq__(self, relationship):
        return relationship.id == self.id
