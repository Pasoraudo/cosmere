class Character:
    def __init__(self, name):
        self.id = name
        self.name = name
        self.href = ""
        self.bookIds = ["mistborn1"]
        self.planet = "scadrial"
        self.description = ""

    def __str__(self):
      return self.name

    def __hash__(self):
      return hash(self.id)

    def __eq__(self, character):
        return character.id == self.id
