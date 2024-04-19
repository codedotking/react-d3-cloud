// 生成单词

export const word = (): string => {
  const word = Math.random().toString(36).substring(2, 5);
  return word;
};

export const words = (count: number): string[] => {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(word());
  }
  return words;
};
