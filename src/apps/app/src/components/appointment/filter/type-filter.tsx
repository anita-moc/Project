'use client';

import { ComboboxDropdown } from '@helsa/ui/components/combobox-dropdown';

type Selected = {
  id: string;
  name: string;
  color: string;
};

type Props = {
  selected?: Selected;
  onChange: (selected: Selected) => void;
  headless?: boolean;
  types: any[];
};

function transformType(type: { id: string; name: string; color: string }) {
  return {
    id: type.id,
    label: type.name,
    color: type.color,
  };
}

const SelectType = ({ selected, onChange, headless, types }: Props) => {
  const selectedValue = selected ? transformType(selected) : undefined;
  return (
    <ComboboxDropdown
      headless={headless}
      placeholder="Select an Appointment type"
      searchPlaceholder="Find an Appointment type"
      items={types.map(transformType)}
      selectedItem={selectedValue}
      onSelect={(item) => {
        onChange({
          id: item.id,
          name: item.label,
          color: item.color,
        });
      }}
      renderSelectedItem={(selectedItem) => (
        <div className="flex items-center space-x-2">
          <div className="size-3" style={{ backgroundColor: selectedItem.color }}></div>
          <span className="text-left truncate max-w-[90%]">{selectedItem.label}</span>
        </div>
      )}
      renderOnCreate={(value) => {
        if (!headless) {
          return (
            <div className="flex items-center space-x-2">
              <span>{`Create "${value}"`}</span>
            </div>
          );
        }
      }}
      renderListItem={({ item }) => {
        return (
          <div className="flex items-center space-x-2">
            <div className="size-3" style={{ backgroundColor: item.color }}></div>
            <span className="line-clamp-1">{item.label}</span>
          </div>
        );
      }}
    />
  );
};

export default SelectType;
