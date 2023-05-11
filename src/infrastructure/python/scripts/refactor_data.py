import json
import os


class Character:
    def __init__(self, name):
        self.id = name
        self.name = name
        self.href = ""
        self.bookIds = ["mistborn1"]
        self.planet = "scadrial"
        self.description = ""

    def __str__(self):
        caracter_dict = {
            "id": self.id,
            "name": self.name,
            "href": self.href,
            "bookIds": self.bookIds,
            "planet": self.planet,
            "description": self.description
        }
        return json.dumps(caracter_dict)

    def __hash__(self):
      return hash(self.id)

    def __eq__(self, character):
        return character.id == self.id

class Relationship:
    def __init__(self, characterId1, characterId2):
        self.id = characterId1 + ":" + characterId2
        self.characterId1 = characterId1
        self.characterId2 = characterId2
        self.type = "undefined"
        self.bookId = "scadrial"

    def __str__(self):
        relationship_dict = {
            "id": self.id,
            "characterId1": self.characterId1,
            "characterId2": self.characterId2,
            "type": self.type,
            "bookId": self.bookId
        }
        return str(relationship_dict)

    def __hash__(self):
      return hash(self.id)

    def __eq__(self, relationship):
        return relationship.id == self.id

def write_json(jsonPath, object_list):
    json_objects = json.dumps(object_list)
    if not os.path.exists(jsonPath):
        with open(jsonPath, "w") as json_file:
            json_file.write("[]")

    with open(jsonPath, "r+") as json_file:
        contenido = json_file.read()

        if len(contenido.strip()) == 0:
            print('file empty')
            json_file.write(json_objects)
        else:
            datos_actuales = json.loads(contenido)
            datos_actuales.extend(json.loads(json_objects))
            json_file.seek(0)
            json_file.write(json.dumps(datos_actuales))
            json_file.truncate()

fileRoute = "../data/mistborn3.csv"

characters = set()
relationships = set()

with open(fileRoute) as f:
    file = f.read().split("\n")
for line in file[1:]:
    lineSplit = line.split(";")
    if len(lineSplit[-1]) == 0:
        continue
    if int(lineSplit[-1]) < 2:
      continue

    for c1 in lineSplit[:-1]:
        characters.add(Character(c1))
        for c2 in lineSplit[:-1]:
            if c1 == c2:
                continue

            relationship = [c1, c2]
            relationship.sort()
            relationship = Relationship(relationship[0], relationship[1])

            relationships.add(relationship)
characters = [str(c) for c in  list(characters)]
relationships = [str(r) for r in list(relationships)]
print("Writing json files 🚀🚀🚀")
write_json('../db/characters.json', characters)
write_json('../db/relationships.json', relationships)
print("DONE!")

