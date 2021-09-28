import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyles } from './Styles/GlobalStyles';
import mixin from './Styles/mixin';

ReactDOM.render(
  <>
    <GlobalStyles />
    <BrowserRouter>
      <ThemeProvider theme={{ ...mixin }}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </>,
  document.getElementById('root'),
);
