import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import './index.css';
import MainView from "./components/MainView";

// In retrospect, I don't really know why I didn't just put MainView in here.
export default function App() {
  // Programatically set the page title.
  document.title = "Triangle POS"

  // Programmatically set the favicon. I *could* have put it in the HTML,
  // but this is more fun. JS, baby.
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    // @ts-ignore-next-line - TSC doesn't know that link is... a link. We do, of course.
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  // @ts-ignore-next-line - TSC doesn't know that link is... a link.
  link.href = `${window.location.href}favicon.png`;

  return (
    <React.StrictMode>
      <MainView />
    </React.StrictMode>
  );
}

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <App />,
);
