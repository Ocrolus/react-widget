import React from 'react';
import { createRoot } from "react-dom/client";
import LibraryApp from "@ocrolus-widget-react/src/examples/Showcase";

const root = createRoot(document.getElementById("app"));

root.render(<LibraryApp />);
