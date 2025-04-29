'use client';

import { ComboboxDropdown } from '@helsa/ui/components/combobox-dropdown';
type Props = {
  selected?: string;
  onChange: (selected: string) => void;
  headless?: boolean;
  states: any[];
};

const stateLabel: Record<string, string> = {
  SCHEDULED: 'Schedule',
  RESCHEDULED: 'Rescheduled',
  CONFIRMED: 'Confirmed',
  LATE: 'Late',
  CANCELLED: 'Cancelled',
  WAITING_DOCTOR: 'Waiting for the doctor',
  WAITING_PATIENT: 'Waiting for the patient',
  STARTED: 'Started',
  MISSED: 'Missed',
  FINISHED: 'Finished',
};

function transformState(state: string) {
  return {
    id: state,
    label: stateLabel[state],
  };
}

const SelectState = ({ selected, onChange, headless, states }: Props) => {
  const selectedValue = selected ? transformState(selected) : undefined;
  return (
    <ComboboxDropdown
      headless={headless}
      placeholder="Select a state"
      searchPlaceholder="Search for a state"
      items={states.map(transformState)}
      selectedItem={selectedValue}
      onSelect={(item) => {
        onChange(item.id);
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

export default SelectState;
