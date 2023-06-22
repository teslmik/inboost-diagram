import React, { useState, useRef } from 'react';
import { addNode, removeNode, setSelectedValues } from '../redux/nodes/slice';
import { useAppDispatch } from '../redux/store';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  placeholder?: string;
  id: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  placeholder,
  id,
}) => {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedValuesRef = useRef<HTMLDivElement>(null);

  const onChange = (str: string[]) => {
    if (
      selectedValues &&
      selectedValues.every((elem, index) => elem === str[index])
    ) {
      dispatch(addNode({ str, id }));
    } else {
      const differences: string = selectedValues
        .filter((item) => !str.includes(item))[0]
        .split(' ')[1];
      dispatch(removeNode(differences));
    }
  };

  const handleOptionClick = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    dispatch(setSelectedValues({ id, updatedSelectedValues }));
    onChange(updatedSelectedValues);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      selectedValuesRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !selectedValuesRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="multiselect-container">
      <div
        ref={selectedValuesRef}
        className="multiselect-selected-values"
        onClick={handleToggleDropdown}
      >
        <span>
          {selectedValues.length === 0
            ? placeholder
            : selectedValues.join(', ')}
        </span>
        <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>&#9662;</span>
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="multiselect-options">
          {options.map((option) => (
            <label key={option.value} className="multiselect-option">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
