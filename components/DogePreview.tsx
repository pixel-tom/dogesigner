// components/CharacterPreview.tsx
import React, { useRef, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";

interface Props {
  selectedParts: SelectedCharacterParts;
  onRandomize: (newParts: SelectedCharacterParts) => void;
}

const CharacterPreview: React.FC<Props> = ({ selectedParts, onRandomize }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");

  const handleDownload = async () => {
    if (previewRef.current) {
      const pixelRatio = window.devicePixelRatio || 1;
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: pixelRatio,
      });

      canvas.style.width = `${previewRef.current?.clientWidth}px`;
      canvas.style.height = `${previewRef.current?.clientHeight}px`;
      const dataURL = canvas.toDataURL("image/png");
      setDownloadLink(dataURL);
    }
  };

  const handleRandomize = () => {
    const newSelectedParts: SelectedCharacterParts = {};
    for (const category in characterParts) {
      const parts = characterParts[category as keyof CharacterParts];
      const randomIndex = Math.floor(Math.random() * parts.length);
      newSelectedParts[category as keyof CharacterParts] = parts[randomIndex];
    }
    onRandomize(newSelectedParts);
  };

  return (
    <div>
      <div
        className="relative bg-white p-2 rounded-lg shadow-lg mb-4"
        ref={previewRef}
        style={{ width: "450px", height: "450px" }} // Update width and height values here
      >
        {Object.keys(selectedParts).map((category) => {
          const part = selectedParts[category as keyof SelectedCharacterParts];
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
          onClick={handleRandomize}
          className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Randomize
        </button>
        <button
          onClick={handleDownload}
          className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          <a
            href={downloadLink}
            download="character.png"
            className="no-underline text-gray-600"
          >
            Download
          </a>
        </button>
      </div>
    </div>
  );
  
};

export default CharacterPreview;
