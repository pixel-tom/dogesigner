// components/CreatorDetails.tsx
import React from "react";

const CreatorDetails: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center mt-8">
      <h3 className="text-2xl font-semibold mb-2 text-purple-800">
        About Character Creator
      </h3>
      <p className="text-gray-600">
        This character creator was designed and developed by
        <span className="font-semibold"> Your Name</span>.
      </p>
      <p className="text-gray-600 mt-2">
        Feel free to contact me for any questions or suggestions.
      </p>
    </div>
  );
};

export default CreatorDetails;
