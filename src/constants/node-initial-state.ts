import { modifyOptions } from "../helpers/modify-options";

export const nodeInitialState = {
  id: '0',
  type: 'customNode',
  position: { x: 50, y: 50 },
  data: {
    options: modifyOptions(),
    placeholder: 'Вибрати значення',
    selected: false,
    selectedValues: []
  },
};