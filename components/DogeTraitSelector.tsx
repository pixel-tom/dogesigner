import React, { useState } from 'react';
import { CharacterPart } from '../types';
import Image from "next/image";

interface Props {
  parts: CharacterPart[];
  selected: number;
  onSelect: (id: number) => void;
}

const CharacterPartSelector: React.FC<Props> = ({ parts, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedPart = parts.find(part => part.id === selected);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-between w-full rounded-md px-3 py-2 bg-[#222222] text-xl font-medium text-gray-300 hover:bg-[#333333] focus:outline-none">
          <div className="flex items-center">
            {selectedPart && <Image src={selectedPart.image} alt={selectedPart.name} width={40} height={40} />}
            <span className="ml-3">{selectedPart ? selectedPart.name : 'Select part'}</span>
          </div>
          <div>
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 h-72 w-[420px] overflow-x-auto overflow-y-scroll rounded-md shadow-lg bg-[#222222] ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1 grid grid-cols-3 gap-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {parts.map((part) => (
              <div
                key={part.id}
                onClick={() => { onSelect(part.id); setIsOpen(false); }}
                className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out p-4`}
                role="menuitem"
              >
                <Image src={part.image} alt={part.name} width={45} height={45} />
                <span className="text-md text-gray-300">{part.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterPartSelector;
