# ExpenseWise Frontend (React + React Admin)


This is the frontend UI for ExpenseWise**, a simple personal expense tracking dashboard.
The frontend is built using React, Vite, and React Admin, and provides a clean admin-style interface for managing Users, Categories, and Expenses.

Backend repo: https://github.com/alicengalice/expensewise-backend

## Tech Stack

* **React 18**
* **Vite**
* **TypeScript**
* **React Admin**
* **Material UI**
* **ra-data-simple-rest** (REST data provider)
* **Axios**

## Project Structure

* `App.tsx`: React Admin root configuration
* `main.tsx`: Vite app entry
* `api.ts`: REST data provider + API base URL
* `resources/`: CRUD components for Users, Categories, Expenses
* `dashboard/`: Simple custom dashboard page

```
src/
  api.ts
  App.tsx
  main.tsx
  assets/
  dashboard/
  resources/
```

## Features

* View, create, edit, and delete Users
* Manage Categories
* Manage Expenses
* Auto-generated table and form UI
* Simple Dashboard (placeholder)
* Pagination, sorting, filtering (handled by React Admin)
* Integrates directly with Spring Boot backend

## API Configuration

The frontend communicates with the backend here:

`src/api.ts`

```ts
export const API_URL = "http://localhost:8080/api";
```

Backend should run on:

```
http://localhost:8080
```

## Running the Frontend

### 1. Install dependencies

```
npm install
```

### 2. Start the dev server

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```

## Pages Included

### Users

* UserList
* UserCreate
* UserEdit

### Categories

* CategoryList
* CategoryCreate
* CategoryEdit

### Expenses

* ExpenseList
* ExpenseCreate
* ExpenseEdit

## Demo 

[screenshots updating...]

## Connecting Backend + Frontend

Backend must expose REST endpoints at:

```
GET /api/users
GET /api/categories
GET /api/expenses
```

The frontend reads these automatically using the React Admin REST provider.
