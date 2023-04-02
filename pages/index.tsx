// pages/index.tsx
import type { NextPage } from "next";
import { useState } from "react";
import { characterParts } from "../data";
import CharacterPartSelector from "../components/DogeTraitSelector";
import CharacterPreview from "../components/DogePreview";
import CreatorDetails from "../components/CreatorDetails";
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

  return (
    <div className="bg-gradient-to-r from-blue-300 via-green-300 to-yellow-200 min-h-screen font-sans">
      <div className="max-w-screen-md mx-auto p-4">
        <h1 className="text-5xl font-bangers text-white text-center mb-8">
          Build-A-Doge
        </h1>
        
        <div className="flex flex-wrap justify-center">
          <CharacterPreview selectedParts={selectedParts} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg ml-4">
            {Object.keys(characterParts).map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4 text-purple-800">
                  {category}
                </h2>
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
          <CreatorDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
