// components/CharacterPartSelector.tsx
import React from 'react';
import { CharacterPart } from '../types';
import Image from "next/image";

interface Props {
  parts: CharacterPart[];
  selected: number;
  onSelect: (id: number) => void;
}

const CharacterPartSelector: React.FC<Props> = ({ parts, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {parts.map((part) => (
      <div
        key={part.id}
        onClick={() => onSelect(part.id)}
        className={`border-2 ${selected === part.id ? 'border-blue-500' : 'border-transparent'} p-1 rounded cursor-pointer`}
      >
        <Image src={part.image} alt={part.name} width={50} height={50} />
      </div>
    ))}
  </div>
);

export default CharacterPartSelector;
