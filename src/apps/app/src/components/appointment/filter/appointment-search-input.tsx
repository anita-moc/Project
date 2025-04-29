'use client';
import { generateAppointmentFilters } from '@/src/actions/appointment/generate-appointment-filters';
import { Calendar } from '@helsa/ui/components/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Input } from '@helsa/ui/components/input';
import { cn } from '@helsa/ui/lib/utils';
import { readStreamableValue } from 'ai/rsc';
import { formatISO } from 'date-fns';
import { CalendarDays, ListFilter, Route, Search, SquareStack, Stethoscope } from 'lucide-react';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SelectSpecialty from '../../book/filter-specialty-select';
import AppointmentSearchFilters from './appointment-search-filters';
import SelectState from './state-filter';
import SelectType from './type-filter';

const defaultSearch = {
  types: null,
  specialties: null,
  start: null,
  end: null,
  states: null,
};

type Props = {
  specialties: any[];
  states: any[];
  types: any[];
};

const AppointmentSearchInput = ({ specialties, types, states }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [filters, setFilters] = useQueryStates(
    {
      specialties: parseAsArrayOf(parseAsString),
      types: parseAsArrayOf(parseAsString),
      start: parseAsString,
      end: parseAsString,
      states: parseAsArrayOf(parseAsString),
    },
    {
      shallow: false,
    },
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setPrompt(value);
    } else {
      setPrompt('');
      setFilters(defaultSearch);
    }
  };

  const handleSubmit = async () => {
    if (prompt.split(' ').length > 1) {
      setStreaming(true);

      const { object } = await generateAppointmentFilters(
        prompt,
        `
          specialties: ${specialties.map((s) => s.name).join(', ')}
          types: ${types.map((t) => t.name).join(', ')}
          states: ${states.join(', ')}
        `,
      );
      let finalObject = {};

      for await (const partialObject of readStreamableValue(object)) {
        console.log(partialObject);
        if (partialObject) {
          finalObject = {
            ...finalObject,
            ...partialObject,
            specialties:
              partialObject?.specialties?.map(
                (name: string) => specialties?.find((specialty) => specialty.name === name)?.name,
              ) ?? null,
            types: partialObject?.types?.map((name: string) => types?.find((type) => type.name === name)?.name) ?? null,
            states:
              partialObject?.states?.map((name: string) => states?.find((state) => state === name) ?? null) ?? null,
          };
        }
      }

      setFilters(finalObject);
      setStreaming(false);
    }
  };

  useHotkeys(
    'esc',
    () => {
      setPrompt('');
      setFilters(defaultSearch);
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
    },
  );
  return (
    <DropdownMenu>
      <div className="flex  md:items-center w-full flex-col md:flex-row gap-2">
        <form
          action=""
          className="relative w-full lg:w-fit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Search className="absolute pointer-events-none left-3 top-[11px] size-4" />
          <Input
            ref={inputRef}
            value={prompt}
            onChange={handleSearch}
            className="pl-9 w-full lg:w-[350px] pr-8  h-9 focus-visible:outline-none focus-visible:ring-0"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Search or filter"
          />
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                'absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-0',
                isOpen && 'opacity-100',
              )}
            >
              <ListFilter className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </form>
        <AppointmentSearchFilters
          filters={filters}
          onRemove={setFilters}
          loading={streaming}
          specialties={specialties}
          states={states}
          types={types}
        />
      </div>
      <DropdownMenuContent className=" w-[350px]" align="end" sideOffset={19} alignOffset={-11} side="bottom">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <Stethoscope className="size-4 mr-2" />
            <span>Specialty</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] ">
              <SelectSpecialty
                headless
                specialties={specialties}
                onChange={(selected) => {
                  setFilters({
                    specialties: filters?.specialties?.includes(selected.name)
                      ? filters.specialties.filter((s) => s !== selected.name).length > 0
                        ? filters.specialties.filter((s) => s !== selected.name)
                        : null
                      : [...(filters.specialties ?? []), selected.name],
                  });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <CalendarDays className="size-4 mr-2" />
            <span>Dates</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 ">
              <Calendar
                mode="range"
                initialFocus
                selected={{
                  from: filters.start ? new Date(filters.start) : undefined,
                  to: filters.end ? new Date(filters.end) : undefined,
                }}
                onSelect={(range) => {
                  if (!range) return;

                  const newRange = {
                    start: range.from ? formatISO(range.from, { representation: 'date' }) : filters.start,
                    end: range.to ? formatISO(range.to, { representation: 'date' }) : filters.end,
                  };

                  setFilters(newRange);
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <Route className="size-4 mr-2" />
            <span>Appointment status</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] ">
              <SelectState
                headless
                states={states}
                onChange={(selected) => {
                  setFilters({
                    states: filters?.states?.includes(selected)
                      ? filters.states.filter((s) => s !== selected).length > 0
                        ? filters.states.filter((s) => s !== selected)
                        : null
                      : [...(filters.states ?? []), selected],
                  });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <SquareStack className="size-4 mr-2" />
            <span>Appointment type</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] ">
              <SelectType
                headless
                types={types}
                onChange={(selected) => {
                  setFilters({
                    types: filters?.types?.includes(selected.name)
                      ? filters.types.filter((s) => s !== selected.name).length > 0
                        ? filters.types.filter((s) => s !== selected.name)
                        : null
                      : [...(filters.types ?? []), selected.name],
                  });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentSearchInput;
