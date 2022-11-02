import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import MainView from './components/MainView';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

// In retrospect, I don't really know why I didn't just put MainView in here.
export default function App() {
  // Programatically set the page title.
  document.title = 'Triangle POS'

  // Programmatically set the favicon. I *could* have put it in the HTML,
  // but this is more fun. Ah, JavaScript.
  // Query for a link element with a relationship of 'icon'.
  var link = document.querySelector('link[rel~="icon"]');
  // If it doesn't exist, create it.
  if (!link) {
    link = document.createElement('link');
    // @ts-ignore-next-line - TSC doesn't know that link is... a link. We do, so it's okay to circumvent the type checker.
    link.rel = 'icon';
    // append it to the <head>.
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  // okay, now we know that the <link> tag exists. Set the href to the favicon.
  // @ts-ignore-next-line - as above
  link.href = `favicon.png`;

  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MainView />
      </LocalizationProvider>
    </React.StrictMode>
  );
}

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <App />,
);
