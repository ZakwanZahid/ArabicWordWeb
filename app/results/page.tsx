// 'use client'

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function Results() {
//     const searchParams = useSearchParams();
//     const query = searchParams.get("query") || "No search term provided"; // Use useSearchParams to access query parameters
//     const [data, setData] = useState<any[]>([]); // Assuming API returns an array of objects

//     const fetchData = async () => {
//         try {
//             const result = await fetch(`http://127.0.0.1:8000/api/words?format=json&search=${query}`);
//             const result_json = await result.json();
//             setData(result_json);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div className="py-20 px-8">
//             <h1 className="text-3xl font-bold mb-4">Search Results for: {query}</h1>
//             <p className="text-gray-600">Here are the results for your search term:</p>
//             <div className="mt-4">
//                 {data.length > 0 ? (
//                     <ul className="list-disc pl-5">
//                         {data.map((item) => (
//                             <li key={item.id} className="mb-2">
//                                 <strong>ID:</strong> {item.id}, <strong>Word:</strong> {item.word}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-red-500">No results found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import cytoscape, { Core } from "cytoscape";

// export default function Results() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "No search term provided"; // Get the search term from the URL
//   const [cy, setCy] = useState<Core | null>(null); // Cytoscape instance
//   const [currentWord, setCurrentWord] = useState<string>(query); // Root word

//   // Initialize Cytoscape on first render
//   useEffect(() => {
//     const cyInstance = cytoscape({
//       container: document.getElementById("cy"), // Graph container
//       style: [
//         {
//           selector: "node",
//           style: {
//             "background-color": "#666",
//             "label": "data(label)",
//             "text-valign": "center",
//             "text-halign": "center",
//             "font-size": "12px",
//             color: "#fff",
//           },
//         },
//         {
//           selector: "edge",
//           style: {
//             width: 2,
//             "line-color": "#ccc",
//             "target-arrow-color": "#ccc",
//             "target-arrow-shape": "triangle",
//             "curve-style": "bezier",
//           },
//         },
//       ],
//       layout: {
//         name: "circle", // Default layout
//       },
//     });

//     setCy(cyInstance); // Save Cytoscape instance
//   }, []);

//   // Fetch graph data whenever `currentWord` changes
//   useEffect(() => {
//     if (cy) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(`http://127.0.0.1:8000/api/graph-data/?word=${currentWord}`);
//           const data = await response.json();

//           // Clear existing graph elements
//           cy.elements().remove();

//           // Add new graph elements
//           cy.add(data);

//           // Apply layout
//           cy.layout({ name: "circle" }).run();
//         } catch (error) {
//           console.error("Error fetching graph data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [cy, currentWord]);

//   // Handle node clicks to regenerate the graph
//   useEffect(() => {
//     if (cy) {
//       cy.on("tap", "node", (evt) => {
//         const clickedWord = evt.target.data("label");
//         setCurrentWord(clickedWord); // Update the root word
//       });
//     }
//   }, [cy]);

//   return (
//     <div>
//       {/* Header Section */}
//       <header className="py-4 px-8 bg-blue-500 text-white">
//         <h1 className="text-3xl font-bold">Dynamic Morphological Graph</h1>
//         <p className="text-sm">Explore word relationships interactively</p>
//       </header>

//       {/* Hero Section */}
//       <div className="hero py-10 px-8 bg-gray-100 text-center">
//         <h2 className="text-xl font-semibold mb-4">
//           Search Results for: <span className="text-blue-600">{query}</span>
//         </h2>
//         <p className="text-gray-600">
//           Click on any node to dynamically regenerate the graph.
//         </p>
//       </div>

//       {/* Graph Section */}
//       <div className="graph-container px-8 py-10">
//         <div
//           id="cy"
//           style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
//         ></div>
//       </div>

//       {/* Footer Section */}
//       <footer className="py-4 px-8 bg-gray-800 text-white text-center">
//         <p className="text-sm">&copy; 2024 Your Project. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


// 'use client';
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import * as d3 from "d3";
// // import { BaseType, DragBehavior } from "d3";


// interface GraphData {
//   nodes: { id: string; [key: string]: any }[];
//   links: { source: string; target: string; [key: string]: any }[];
// }

// export default function Results() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "No search term provided"; // Get the search term from the URL
//   const [currentWord, setCurrentWord] = useState<string>(query); // Root word

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/graph-data/?word=${currentWord}`
//         );
//         const data: GraphData = await response.json();
       
//         renderGraph(data); // Render graph with the fetched data
//       } catch (error) {
//         console.error("Error fetching graph data:", error);
//       }
//     };

//     fetchData();
//   }, [currentWord]);

//   const renderGraph = (data: GraphData) => {
//     // Clear existing SVG elements
//     d3.select("#graph").selectAll("*").remove();

//     const width = 600;
//     const height = 400;
//     console.log(data); 
//     const svg = d3
//       .select("#graph")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height);
//     console.log(svg);
//     const nodes = data.nodes.map((node: any) => ({
//         id: node.id,
//         x: node.x || Math.random() * width, // Initialize position if not provided
//         y: node.y || Math.random() * height, // Initialize position if not provided
//         vx: 0, // Initial velocity
//         vy: 0, // Initial velocity
//       }));
//       console.log("Nodes:", data.nodes);
//       console.log("Links:", data.links);
//     const simulation = d3
//       .forceSimulation(nodes)
//       .force(
//         "link",
//         d3
//           .forceLink(data.links)
//           .id((d: any) => d.id)
//           .distance(150)
//       )
//       .force("charge", d3.forceManyBody().strength(-300))
//       .force("center", d3.forceCenter(width / 2, height / 2));

//     const link = svg
//       .append("g")
//       .selectAll("line")
//       .data(data.links)
//       .join("line")
//       .attr("stroke-width", 2)
//       .attr("stroke", "#ccc");

//     const node = svg
//       .append("g")
//       .selectAll("circle")
//       .data(data.nodes)
//       .join("circle")
//       .attr("r", 10)
//       .attr("fill", (d: any) => (d.id === currentWord ? "#d62728" : "#1f77b4"))
//       .call(
//         d3
//           .drag<SVGCircleElement, any>()
//           .on("start", (event: d3.D3DragEvent<any, any, any>, d: any) => {
//             if (!event.active) simulation.alphaTarget(0.3).restart();
//             d.fx = d.x;
//             d.fy = d.y;
//           })
//           .on("drag", (event: d3.D3DragEvent<any, any, any>, d: any) => {
//             d.fx = event.x;
//             d.fy = event.y;
//           })
//           .on("end", (event: d3.D3DragEvent<any, any, any>, d: any) => {
//             if (!event.active) simulation.alphaTarget(0);
//             d.fx = null;
//             d.fy = null;
//           })
//       )
//       .on("click", (event: MouseEvent, d: any) => {
//         setCurrentWord(d.id); // Update the root word on node click
//       });

//     const label = svg
//       .append("g")
//       .selectAll("text")
//       .data(data.nodes)
//       .join("text")
//       .text((d: any) => d.id)
//       .attr("font-size", 12)
//       .attr("dx", 12)
//       .attr("dy", 4);

//     simulation.on("tick", () => {
//       link
//         .attr("x1", (d: any) => d.source.x)
//         .attr("y1", (d: any) => d.source.y)
//         .attr("x2", (d: any) => d.target.x)
//         .attr("y2", (d: any) => d.target.y);

//       node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

//       label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
//     });
//   };

//   return (
//     <div>
//       {/* Header Section */}
//       <header className="py-4 px-8 bg-blue-500 text-white">
//         <h1 className="text-3xl font-bold">Dynamic Morphological Graph</h1>
//         <p className="text-sm">Explore word relationships interactively</p>
//       </header>

//       {/* Hero Section */}
//       <div className="hero py-10 px-8 bg-gray-100 text-center">
//         <h2 className="text-xl font-semibold mb-4">
//           Search Results for: <span className="text-blue-600">{query}</span>
//         </h2>
//         <p className="text-gray-600">
//           Click on any node to dynamically regenerate the graph.
//         </p>
//       </div>

//       {/* Graph Section */}
//       <div className="graph-container px-8 py-10">
//         <div
//           id="graph"
//           style={{
//             width: "100%",
//             height: "600px",
//             border: "1px solid #ccc",
//           }}
//         ></div>
//       </div>

//       {/* Footer Section */}
//       <footer className="py-4 px-8 bg-gray-800 text-white text-center">
//         <p className="text-sm">&copy; 2024 Your Project. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as d3 from "d3";

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "No search term provided"; // Get the search term from the URL
  const [currentWord, setCurrentWord] = useState<string>(query); // Root word

  // Fetch data and render graph whenever `currentWord` changes
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/graph-data/?word=${currentWord}`);
        const graphData = await response.json();
        // console.log(graphData);
        renderGraph(graphData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, [currentWord]);




  // Function to render the graph with D3.js
  const renderGraph = (data: any) => {
    const width = 800;
    const height = 600;

    // Clear any existing SVG
    d3.select("#graph").select("svg").remove();
    // Create the SVG container
    const svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "5px solid #black");



      const nodes = data.nodes.map((node: any) => node.data);  // Flatten to use direct access to id

      // Transform edges data to make `source` and `target` top-level properties
      const edges = data.edges.map((edge: any) => ({
        source: edge.data.source,
        target: edge.data.target,
      }));
  console.log(edges)


  const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3
      .forceLink(edges) // Use transformed edges
      .id((d: any) => d.id) // Match edges to nodes by id
      .distance(150)
  )
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));



 
    

    const link = svg
      .append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

      console.log(data);
    // Draw the nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("fill", (d: any) => (d.type === "main" ? "#666" : "#9acd32"))
      node.call(
        d3
        .drag<SVGCircleElement, any>() 
          .on("start", (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0.1).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event: any, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );
      
    // Add labels to nodes
    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")  
      .attr("fill", "#000")
      .style("font-size", "12px")
      .text((d: any) => d.label);

    // Update positions on each simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });


    // Add click event to nodes to update the current word
    node.on("click", (event: any, d: any) => {
      setCurrentWord(d.label);
    });
  };

  return (
    <div>
      {/* Header Section */}
      <header className="py-4 px-8 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Dynamic Morphological Graph</h1>
        <p className="text-sm">Explore word relationships interactively</p>
      </header>

      {/* Hero Section */}
      <div className="hero py-10 px-8 bg-gray-100 text-center">
        <h2 className="text-xl font-semibold mb-4">
          Search Results for: <span className="text-blue-600">{query}</span>
        </h2>
        <p className="text-gray-600">
          Click on any node to dynamically regenerate the graph.
        </p>
      </div>

      {/* Graph Section */}
      <div id="graph" className="px-8 py-10" style={{ width: "100%", height: "600px" }}></div>

      {/* Footer Section */}
      <footer className="py-4 px-8 bg-gray-800 text-white text-center">
        <p className="text-sm">&copy; 2024 Your Project. All rights reserved.</p>
      </footer>
    </div>
  );
}
