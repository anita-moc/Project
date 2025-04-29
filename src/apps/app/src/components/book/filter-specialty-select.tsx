'use client';

import { ComboboxDropdown } from '@helsa/ui/components/combobox-dropdown';

type Selected = {
  id: string;
  name: string;
};

type Props = {
  selected?: Selected;
  onChange: (selected: Selected) => void;
  headless?: boolean;
  specialties: any[];
};

function transformSpecialty(specialty: { id: string; name: string }) {
  return {
    id: specialty.id,
    label: specialty.name,
  };
}

const SelectSpecialty = ({ selected, onChange, headless, specialties }: Props) => {
  const selectedValue = selected ? transformSpecialty(selected) : undefined;
  return (
    <ComboboxDropdown
      headless={headless}
      placeholder="Select a Specialty"
      searchPlaceholder="Find a Specialty"
      items={specialties.map(transformSpecialty)}
      selectedItem={selectedValue}
      onSelect={(item) => {
        onChange({
          id: item.id,
          name: item.label,
        });
      }}
      renderSelectedItem={(selectedItem) => (
        <div className="flex items-center space-x-2">
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
            <span className="line-clamp-1">{item.label}</span>
          </div>
        );
      }}
    />
  );
};

export default SelectSpecialty;
