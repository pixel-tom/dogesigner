// pages/index.tsx
import type { NextPage } from "next";
import { useState } from "react";
import { characterParts } from "../data";
import Image from "next/image";
import CharacterPartSelector from "../components/DogeTraitSelector";
import CharacterPreview from "../components/DogePreview";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";

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

  const getRandomPart = (category: keyof CharacterParts) => {
    const parts = characterParts[category];
    const randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
  };

  const randomizeCharacter = () => {
    const newSelectedParts: SelectedCharacterParts = {
      background: getRandomPart("background"),
      type: getRandomPart("type"),
      hats: getRandomPart("hats"),
      clothes: getRandomPart("clothes"),
      eyes: getRandomPart("eyes"),
      mouth: getRandomPart("mouth"),
    };
    setSelectedParts(newSelectedParts);
  };

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Image src="/canvas.png" alt="Canvas" width={400} height={200} />
        </div>
        <div className="flex flex-wrap justify-center">
          <CharacterPreview selectedParts={selectedParts} onRandomize={randomizeCharacter} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg">
            {Object.keys(characterParts).map((category) => (
              <div key={category}>
                <h2 className="text-3xl mb-4 text-red-800">{category}</h2>
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
