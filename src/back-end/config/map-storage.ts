export class MapStorage<KeyType, StoredType> {
  protected storage = new Map()

  get(key: KeyType): StoredType | undefined {
    return this.storage.get(key)
  }

  save(key: KeyType, value: StoredType) {
    return this.storage.set(key, value)
  }

  delete(key: KeyType) {
    return this.storage.delete(key)
  }
}
