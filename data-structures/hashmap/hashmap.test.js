import HashMap from './hashmap'

describe('HashMap', () => {
  const hashmap = HashMap(2)
  test('When a key/value pair is added', () => {
    hashmap.set('Paris', 'Eiffel Tower')
    expect(hashmap.getLength()).toBe(1)
  })

  test('When a key/value pair with an existing key is added', () => {
    hashmap.set('Paris', 'Champs Elysees')
    expect(hashmap.getLength()).toBe(1)
    expect(hashmap.get('Paris')).toBe('Champs Elysees')
  })

  test('When the load limit is reached', () => {
    hashmap.set('Berlin', 'Brandenburg Gate')
    hashmap.set('London', 'Big Ben')
    expect(hashmap.getLength()).toBe(3)
    expect(hashmap.getSize()).toBe(4)
  })

  test('When checking if the map contains a key', () => {
    expect(hashmap.get('Paris')).toBe('Champs Elysees')
    expect(hashmap.has('Paris')).toBe(true)
  })

  test('When a key value pair is removed', () => {
    hashmap.set('Paris', 'Eiffel Tower')
    hashmap.remove('Paris')
    expect(hashmap.getLength()).toBe(2)
  })

  test('When the map is cleared', () => {
    hashmap.clear()
    expect(hashmap.getLength()).toBe(0)
    expect(hashmap.getSize()).toBe(2)
  })

  test('When calling the keys method', () => {
    hashmap.set('Paris', 'Eiffel Tower')
    hashmap.set('Berlin', 'Brandenburg Gate')
    hashmap.set('London', 'Big Ben')
    expect(hashmap.keys()).toEqual(expect.arrayContaining(['Paris', 'Berlin', 'London']))
  })

  test('When calling the values method', () => {
    expect(hashmap.values()).toEqual(
      expect.arrayContaining(['Eiffel Tower', 'Brandenburg Gate', 'Big Ben'])
    )
  })

  test('When calling the entries method', () => {
    expect(hashmap.entries()).toEqual(
      expect.arrayContaining([
        ['Paris', 'Eiffel Tower'],
        ['Berlin', 'Brandenburg Gate'],
        ['London', 'Big Ben'],
      ])
    )
  })
})
