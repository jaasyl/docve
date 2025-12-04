# API Services & Hooks

This directory contains the API integration logic for the application.

## Structure

- `api.js`: Base Axios instance with interceptors.
- `authService.js`: Authentication related API calls.
- `documentService.js`: Document management API calls.
- `../hooks/useFetch.js`: Generic hook for data fetching.
- `../hooks/useAuth.js`: Auth context and hook.

## Usage Examples

### 1. Authentication

Wrap your application with `AuthProvider` in `App.jsx` (or `main.jsx`).

```jsx
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <YourRoutes />
    </AuthProvider>
  );
}
```

Use `useAuth` in your components:

```jsx
import { useAuth } from '../hooks/useAuth';

const LoginButton = () => {
  const { login, user } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (user) return <div>Welcome!</div>;
  return <button onClick={handleLogin}>Login</button>;
};
```

### 2. Fetching Documents

Use `useFetch` with `documentService`.

```jsx
import useFetch from '../hooks/useFetch';
import documentService from '../services/documentService';

const DocumentList = () => {
  const { data: documents, loading, error } = useFetch(documentService.getAllDocuments);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {documents.map(doc => (
        <li key={doc.id}>{doc.title}</li>
      ))}
    </ul>
  );
};
```

### 3. Direct Service Calls

You can also call services directly if you don't need the hook (e.g., for mutations).

```jsx
import documentService from '../services/documentService';

const handleDelete = async (id) => {
  try {
    await documentService.deleteDocument(id);
    // Refresh list or update state
  } catch (error) {
    console.error('Delete failed', error);
  }
};
```
