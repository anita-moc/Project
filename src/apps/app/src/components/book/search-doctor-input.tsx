'use client';
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
import { Briefcase, CalendarDays, ListFilter, Search, Star, Stethoscope } from 'lucide-react';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SelectSpecialty from './filter-specialty-select';

import { generateDoctorFilters } from '@/src/actions/doctor/generate-doctor-filters';
import { Calendar } from '@helsa/ui/components/calendar';
import { readStreamableValue } from 'ai/rsc';
import { formatISO } from 'date-fns';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import ExperienceRange from './filter-experience-range';
import RateRange from './filter-rate-range';
import DoctorFilterList from './search-doctor-filters';
const defaultSearch = {
  q: null,
  specialties: null,
  availability: null,
  minRate: null,
  experience: null,
};

type Props = {
  specialties: any[];
};

const SearchDoctorInput = ({ specialties }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [filters, setFilters] = useQueryStates(
    {
      q: parseAsString,
      specialties: parseAsArrayOf(parseAsString),
      availability: parseAsString,
      minRate: parseAsInteger,
      experience: parseAsInteger,
    },
    {
      shallow: false,
    }
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

      const { object } = await generateDoctorFilters(
        prompt,
        `
          specialties: ${specialties.map((s) => s.name).join(', ')}
        `
      );
      let finalObject = {};

      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          finalObject = {
            ...finalObject,
            ...partialObject,
            specialties:
              partialObject?.specialties?.map(
                (name: string) => specialties?.find((specialty) => specialty.name === name)?.name
              ) ?? null,
            q: partialObject?.name ?? null,
            minRate: partialObject?.minRate ?? null,
            experience: partialObject?.experience ?? null,
          };
        }
      }

      setFilters({
        q: null,
        ...finalObject,
      });
      setStreaming(false);
    } else {
      setFilters({ q: prompt.length > 0 ? prompt : null });
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
    }
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
            className="pl-9 w-full lg:w-[350px] pr-8 rounded-none h-9 focus-visible:outline-none focus-visible:ring-0"
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
                isOpen && 'opacity-100'
              )}
            >
              <ListFilter className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </form>
        <DoctorFilterList filters={filters} onRemove={setFilters} loading={streaming} specialties={specialties} />
      </div>
      <DropdownMenuContent
        className="rounded-none w-[350px]"
        align="end"
        sideOffset={19}
        alignOffset={-11}
        side="bottom"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Stethoscope className="size-4 mr-2" />
            <span>Specialty</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] rounded-none">
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
          <DropdownMenuSubTrigger className="rounded-none">
            <CalendarDays className="size-4 mr-2" />
            <span>Availability in</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 rounded-none">
              <Calendar
                mode="single"
                initialFocus
                fromDate={new Date()}
                selected={filters.availability ? new Date(`${filters.availability} 00:00:00`) : new Date()}
                onSelect={(date) => {
                  setFilters({ availability: formatISO(date!, { representation: 'date' }) });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Star className="size-4 mr-2" />
            <span>Minimum qualification</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 rounded-none w-[250px] min-h-[150px]"
            >
              <RateRange
                onSelect={(min) => {
                  setFilters({ minRate: min });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Briefcase className="size-4 mr-2" />
            <span>
            Minimum experience</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 rounded-none w-[250px] min-h-[150px]"
            >
              <ExperienceRange
                onSelect={(min) => {
                  setFilters({ experience: min });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDoctorInput;
