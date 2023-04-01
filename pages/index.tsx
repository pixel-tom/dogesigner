// pages/index.tsx
import type { NextPage } from "next";
import { useState, useRef } from "react";
import { characterParts } from "../data";
import CharacterPartSelector from "../components/CharacterPartSelector";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";
import Image from "next/image";
import html2canvas from "html2canvas";

const Home: NextPage = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedCharacterParts>({
    background: characterParts.background[0],
    type: characterParts.type[0],
    hats: characterParts.hats[0],
    clothes: characterParts.clothes[0],
    eyes: characterParts.eyes[0],
    mouth: characterParts.mouth[0],
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePartSelect = (category: keyof CharacterParts, partId: number) => {
    setSelectedParts((prevState: any) => ({
      ...prevState,
      [category]: characterParts[category].find(
        (part: CharacterPartType) => part.id === partId
      )!,
    }));
  };

  const handleDownload = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "character.png";
        link.click();
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 via-green-300 to-yellow-200 min-h-screen font-sans">
      <div className="max-w-screen-md mx-auto p-4">
        <h1 className="text-5xl font-bangers text-white text-center mb-8">Build-A-Doge</h1>
        <div className="flex flex-wrap justify-center">
          <div>
            <div className="relative w-96 h-96 bg-white p-2 rounded-lg shadow-lg mb-4" ref={previewRef}>
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
            <div className="flex justify-center">
              <button
                onClick={handleDownload}
                className="bg-slate-200 border border-gray-100 hover:bg-slate-400 text-gray-600 font-bold py-2 px-4 rounded mt-4 mb-4 mx-auto"
              >
                Download
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg ml-4">
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
