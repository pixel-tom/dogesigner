// pages/index.tsx
import type { NextPage } from "next";
import { useState } from "react";
import { characterParts } from "../data";
import CharacterPartSelector from "../components/CharacterPartSelector";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";
import Image from "next/image";

const Home: NextPage = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedCharacterParts>({
    background: characterParts.background[0],
    type: characterParts.type[0],
    hats: characterParts.hats[0],
    clothes: characterParts.clothes[0],
    eyes: characterParts.eyes[0],
    mouth: characterParts.mouth[0],
  });

  const handlePartSelect = (category: keyof CharacterParts, partId: number) => {
    setSelectedParts((prevState: any) => ({
      ...prevState,
      [category]: characterParts[category].find(
        (part: CharacterPartType) => part.id === partId
      )!,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 via-green-300 to-yellow-200 min-h-screen font-sans">
      <div className="max-w-screen-md mx-auto p-4">
        <h1 className="text-5xl font-bangers text-white text-center mb-8">Character Creator</h1>
        <div className="flex flex-wrap justify-center">
          <div className="relative w-96 h-96 bg-white p-2 rounded-lg shadow-lg mr-4 mb-8">
            {Object.keys(selectedParts).map((category) => {
              const part = selectedParts[category as keyof CharacterParts];
              return (
                <Image
                  key={category}
                  src={part.image}
                  alt={part.name}
                  layout="fill"
                  objectFit="contain"
                />
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg">
            {Object.keys(characterParts).map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4 text-purple-800">{category}</h2>
                <CharacterPartSelector
                  parts={characterParts[category as keyof CharacterParts]}
                  selected={selectedParts[category as keyof CharacterParts].id}
                  onSelect={(partId: number) =>
                    handlePartSelect(category as keyof CharacterParts, partId)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Home;
