// pages/index.tsx
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { characterParts } from "../data";
import Image from "next/image";
import CharacterPartSelector from "../components/DogeTraitSelector";
import CharacterPreview from "../components/DogePreview";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";
import html2canvas from "html2canvas";
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

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      setUploadedImages(JSON.parse(storedImages));
    }
  }, []);

  const handleUpload = async () => {
    if (previewRef.current) {
      const pixelRatio = window.devicePixelRatio || 1;
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: pixelRatio,
      });

      const dataURL = canvas.toDataURL("image/png");
      setUploadedImages((prevUploadedImages) => {
        let newUploadedImages = [...prevUploadedImages, dataURL];
        if (newUploadedImages.length > 9) {
          newUploadedImages = newUploadedImages.slice(-9);
        }
        localStorage.setItem(
          "uploadedImages",
          JSON.stringify(newUploadedImages)
        );
        return newUploadedImages;
      });
    }
  };

  const handleRemove = (index: number) => {
    setUploadedImages((prevUploadedImages) => {
      const newUploadedImages = prevUploadedImages.filter(
        (_, currentIndex) => currentIndex !== index
      );
      localStorage.setItem("uploadedImages", JSON.stringify(newUploadedImages));
      return newUploadedImages;
    });
  };

  const handleDownloadCollage = async () => {
    const images = uploadedImages.slice(0, 9); // Limit to 9 images
    const canvas = document.createElement("canvas");
    canvas.width = 2400; // 3 images per row, each image is 800x800
    canvas.height = 2400; // 3 rows, each row is 800 pixels tall
    const ctx = canvas.getContext("2d");
    if (ctx) {
      for (let i = 0; i < images.length; i++) {
        const img = new window.Image();
        img.src = images[i];
        await new Promise((resolve) => {
          img.onload = () => {
            if (ctx) {
              const x = (i % 3) * 800;
              const y = Math.floor(i / 3) * 800;
              ctx.drawImage(img, x, y, 800, 800);
              resolve(null);
            }
          };
        });
      }
      const dataURL = canvas.toDataURL("image/png"); // Use PNG format
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "gallery.png";
      link.click();
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 via-slate-200 to-slate-300">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Image src="/canvas.png" alt="Canvas" width={500} height={250} />
        </div>
        <h1 className="flex justify-center text-red-800 text-xl mb-3">
          Recent Creation Gallery
        </h1>
        <div className="flex justify-center mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-8 mt-4 mb-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative h-32 w-32">
                <Image
                  src={image}
                  alt={`Uploaded Image ${index}`}
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white px-1 py-0.5 text-xs rounded-bl"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
          >
            Upload to Gallery
          </button>
          <button
            onClick={handleDownloadCollage}
            className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
          >
            Download Collage
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          <CharacterPreview
            selectedParts={selectedParts}
            onRandomize={randomizeCharacter}
            previewRef={previewRef} // Pass the previewRef here
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg">
            {Object.keys(characterParts).map((category) => (
              <div key={category} className="space-y-4">
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
