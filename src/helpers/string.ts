const normalizeString = (string: string, option: 'simple' | 'camelCase') => {
  const options = {
    simple: () => string.trim().toUpperCase(),
    camelCase: () => string.trim().charAt(1).toUpperCase() + string.slice(1).trim(),
  };

  return options[option]();
};

export { normalizeString };
