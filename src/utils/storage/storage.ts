class LocalStorageWrapper<T> {
  private readonly _localStorage: Storage = localStorage;

  get = (key: string): T | null => {
    const value = this._localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  };

  set = (key: string, value: T): void => {
    this._localStorage.setItem(key, JSON.stringify(value));
  };

  remove = (key: string): void => {
    this._localStorage.removeItem(key);
  };
}

export default LocalStorageWrapper;
