import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { characterParts } from "../data";
import Navbar from "../components/Navbar";

import Image from "next/image";
import CharacterPartSelector from "../components/DogeTraitSelector";
import CharacterPreview from "../components/DogePreview";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";
import React, { useRef } from "react";

const Home: NextPage = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedCharacterParts>({
    background: characterParts.background[0],
    type: characterParts.type[0],
    hats: characterParts.hats[0],
    clothes: characterParts.clothes[0],
    eyes: characterParts.eyes[0],
    mouth: characterParts.mouth[0],
    special: characterParts.special[0],
    vr: characterParts.vr[0],
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
      special: characterParts.special[0],
      vr: characterParts.vr[0],
    };
    setSelectedParts(newSelectedParts);
  };

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center">
      <Navbar />
      <div className="relative w-full">
        <Image src="/vr-banner.gif" alt="Canvas" width={1900} height={250} />
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-b from-transparent to-[#0F0F0F]" />
      </div>
      <div className="max-w-screen-lg w-full px-4 pt-20 -mt-20 sm:-mt-30 md:-mt-40 lg:-mt-60 xl:-mt-96 z-10">
        <div className="p-8 pt-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111111]  border border-gray-600 rounded-lg shadow-lg">
          <div>
            <CharacterPreview
              selectedParts={selectedParts}
              onRandomize={randomizeCharacter}
              previewRef={previewRef} // Pass the previewRef here
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
            {Object.keys(characterParts).map((category) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl mb-2 text-gray-300">{category}</h2>
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
        <div className="h-40"></div>
      </div>
    </div>
  );
};

export default Home;
