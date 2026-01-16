'use client';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDown } from './icons/ChevronDown';
import { Check } from './icons/Check';
import { useTypingStore } from '@/store/useTypingStore';

const options = [
  { id: 1, name: 'Timed (60 s)', value: 'timed' },
  { id: 2, name: 'Passage', value: 'passage' },
];

export function ListBoxModeStats() {
  const { mode, setMode } = useTypingStore();
  const currentMode = options.find((o) => o.value === mode) || options[1];

  return (
    <Listbox value={mode} onChange={setMode}>
      <div className='relative w-full'>
        <ListboxButton className='flex w-full justify-center gap-2 h-10 rounded-lg border border-[#717178] items-center'>
          <span className='text-center text-[16px] whitespace-nowrap'>
            {currentMode.name}
          </span>
          <ChevronDown className='text-white w-4' />
        </ListboxButton>
        <ListboxOptions className='absolute top-full left-0 right-0 flex flex-col mt-1 bg-[#262626] rounded-lg justify-center'>
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.value}
              className={`flex items-center pl-4 cursor-default select-none text-start py-3 text-[16px] flex-1
                     ${option.id !== 1 && 'border-t border-[#3A3A3A]'}`}
            >
              {option.name === currentMode.name && (
                <Check className='w-5 mr-2' />
              )}
              <span className={`${option.name !== currentMode.name && 'ml-7'}`}>
                {option.name}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
