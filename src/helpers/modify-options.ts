interface IOption {
  value: string;
  label: string;
}

const initialOptions: IOption[] = [
  { value: 'Варіант 1', label: 'Варіант 1' },
  { value: 'Варіант 2', label: 'Варіант 2' },
  { value: 'Варіант 3', label: 'Варіант 3' },
  { value: 'Варіант 4', label: 'Варіант 4' },
  { value: 'Варіант 5', label: 'Варіант 5' },
  { value: 'Варіант 6', label: 'Варіант 6' },
];

export const modifyOptions = (str?: string): IOption[] => {
  if (!str) {
    return initialOptions;
  }

  const modifiedOptions: IOption[] = initialOptions.map((option, index) => {
    return {
      ...option,
      value: `Варіант ${str}-${index + 1}`,
      label: `Варіант ${str}-${index + 1}`,
    };
  });

  return modifiedOptions;
};