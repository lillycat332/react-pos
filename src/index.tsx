import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import './index.css';
import MainView from "./components/MainView";

// In retrospect, I don't really know why I didn't just put MainView in here.
export default function App() {
  document.title = "Triangle POS"
  return (
    <MainView />
  );
}

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <App />,
);
