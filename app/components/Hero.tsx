// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // For navigation to the results page

// export default function Hero() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search input
//   const [showKeyboard, setShowKeyboard] = useState(false); // State for keyboard visibility
//   const router = useRouter();

//   // Function to handle the Urdu keyboard input
//   const handleUrduInput = (urduWord: string) => {
//     setSearchTerm(urduWord); // Update the search input with the Urdu word
//     setShowKeyboard(false); // Hide the keyboard after input
//   };

//   // Function to handle the search button
//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       router.push(`/results?query=${encodeURIComponent(searchTerm)}`);
//     }
//   };
//   const handleKeyPress = (char: string) => {
//     setSearchTerm((prev) => prev + char); // Append the clicked character to the input
//   };
//   return (
//     <section
//       className="relative bg-cover bg-center py-20 px-8"
//       style={{
//         backgroundImage: "url('/background.jpg')", // Add your background image in the 'public/' folder
//       }}
//     >
//       <div className="bg-white/80 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           Search Here
//         </h1>
//         <p className="text-lg text-gray-600 mb-6">
//           Use the search bar below to find word meanings, translations, or synonyms in Urdu.
//         </p>
//         {/* Search Bar */}
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Type a word here..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
  
//           <button
//             onClick={() => setShowKeyboard(!showKeyboard)}
//             className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
//           >
//             Urdu Keyboard
//           </button>
//           <button
//             onClick={handleSearch}
//             className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
//           >
//             Search
//           </button>
//         </div>
//         {/* Urdu Keyboard */}
//         {showKeyboard && (
//           <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-lg">
//             <div className="grid grid-cols-6 gap-2">
//               {[
//                 "ا",
//                 "ب",
//                 "پ",
//                 "ت",
//                 "ٹ",
//                 "ث",
//                 "ج",
//                 "چ",
//                 "ح",
//                 "خ",
//                 "د",
//                 "ڈ",
//                 "ذ",
//                 "ر",
//                 "ڑ",
//                 "ز",
//                 "ژ",
//                 "س",
//                 "ش",
//                 "ص",
//                 "ض",
//                 "ط",
//                 "ظ",
//                 "ع",
//                 "غ",
//                 "ف",
//                 "ق",
//                 "ک",
//                 "گ",
//                 "ل",
//                 "م",
//                 "ن",
//                 "ں",
//                 "و",
//                 "ہ",
//                 "ھ",
//                 "ء",
//                 "ی",
//               ].map((urduLetter) => (
//                 <button
//                   key={urduLetter}
//                   onClick={() => handleUrduInput(searchTerm + urduLetter)}
//                   className="py-2 px-3 bg-white rounded-md shadow hover:bg-gray-200"
//                 >
//                   {urduLetter}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation to the results page

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // State for keyboard visibility
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/results?query=${searchQuery}`); // Navigate to the results page with the search query
    }
  };

  const handleKeyPress = (char: string) => {
    setSearchQuery((prev) => prev + char); // Append the clicked character to the input
  };

  return (
    <div
      className="relative bg-cover bg-center py-20 px-8 "
      style={{
        backgroundImage: `url('/background.jpg')`, // Replace with your actual image
      }}
    >
      <div className="bg-white/80 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Search for Words</h1>
{/* <p className="text-lg text-gray-600 mb-6">
Use the search bar below to find word meanings, translations, or synonyms in Urdu.
</p> */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a word..."
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Toggle Urdu Keyboard */}
        <button
          className="mt-4 bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300"
          onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
        >
          {isKeyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
        </button>

        {/* Urdu Keyboard */}
        {isKeyboardVisible && (
          <div className="grid grid-cols-6 gap-2">
            {[
              "ا",
              "ب",
              "پ",
              "ت",
              "ٹ",
              "ث",
              "ج",
              "چ",
              "ح",
              "خ",
              "د",
              "ڈ",
              "ذ",
              "ر",
              "ڑ",
              "ز",
              "ژ",
              "س",
              "ش",
              "ص",
              "ض",
              "ط",
              "ظ",
              "ع",
              "غ",
              "ف",
              "ق",
              "ک",
              "گ",
              "ل",
              "م",
              "ن",
              "و",
              "ہ",
              "ء",
              "ی",
            ].map((char) => (
              <button
                key={char}
                className="bg-white px-3 py-2 rounded shadow hover:bg-blue-100"
                onClick={() => handleKeyPress(char)}
              >
                {char}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Hero() {
//   const [searchQuery, setSearchQuery] = useState(""); // State for the search input
//   const [responseMessage, setResponseMessage] = useState(""); // State for the response message
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // State for keyboard visibility
//   const router = useRouter();

//   const handleSendToBackend = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/hello-world/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ word: searchQuery }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch");
//       }

//       const data = await res.json();
//       setResponseMessage(data.message); // Set the response message
//     } catch (error) {
//       console.error(error);
//       setResponseMessage("Error connecting to the backend");
//     }
//   };

//   const handleKeyPress = (char: string) => {
//     setSearchQuery((prev) => prev + char); // Append the clicked character to the input
//   };

//   return (
//     <div
//       className="flex items-center justify-center h-screen bg-cover bg-center"
//       style={{
//         backgroundImage: `url('/your-background-image.jpg')`, // Replace with your actual image
//       }}
//     >
//       <div className="text-center bg-white/70 p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-4">Search for Words</h1>
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Enter a word..."
//             className="border rounded-l px-4 py-2 w-80"
//           />
//           <button
//             onClick={handleSendToBackend}
//             className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>

//         {/* Response from Django */}
//         {responseMessage && (
//           <div className="mt-4 text-green-600 font-semibold">
//             {responseMessage}
//           </div>
//         )}

//         {/* Toggle Urdu Keyboard */}
//         <button
//           className="mt-4 bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300"
//           onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
//         >
//           {isKeyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
//         </button>

//         {/* Urdu Keyboard */}
//         {isKeyboardVisible && (
//           <div className="mt-4 bg-gray-100 p-4 rounded shadow grid grid-cols-8 gap-2">
//             {[
//               "ا",
//               "ب",
//               "پ",
//               "ت",
//               "ٹ",
//               "ث",
//               "ج",
//               "چ",
//               "ح",
//               "خ",
//               "د",
//               "ڈ",
//               "ذ",
//               "ر",
//               "ڑ",
//               "ز",
//               "ژ",
//               "س",
//               "ش",
//               "ص",
//               "ض",
//               "ط",
//               "ظ",
//               "ع",
//               "غ",
//               "ف",
//               "ق",
//               "ک",
//               "گ",
//               "ل",
//               "م",
//               "ن",
//               "و",
//               "ہ",
//               "ء",
//               "ی",
//             ].map((char) => (
//               <button
//                 key={char}
//                 className="bg-white px-3 py-2 rounded shadow hover:bg-blue-100"
//                 onClick={() => handleKeyPress(char)}
//               >
//                 {char}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
