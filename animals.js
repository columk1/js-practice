var animals = [
  { name: 'Jim', species: 'rabbit' },
  { name: 'Frank', species: 'dog' },
]

var getAnimals = function (animals, species) {
  return animals.filter((animal) => animal.species === species)
}

var dogs = getAnimals(animals, 'dog')

console.log(dogs)
