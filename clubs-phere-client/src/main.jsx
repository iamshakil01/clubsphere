import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import { ThemeProvider } from './Context/ThemeContext/ThemeProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
