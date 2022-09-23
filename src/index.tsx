import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import './index.css';
import MainView from "./components/MainView";

export default function App() {
  return (
    <MainView />
  );
}

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <App />,
);
