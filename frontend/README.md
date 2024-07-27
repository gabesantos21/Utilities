# Simple utility frontend

> A simple frontend that lays out 15 random tasks on page load. Users can export the data in CSV, JSON, or simply print in the console.

### Dependencies Used

- `nuxt` - framework used
- `axios` - for performing http requests

### Get started using

1. Clone this repository
2. Run the command `npm install` to install dependencies
3. Perform command `npm start` (This will build and run the application, make sure port 3000 is not in use).
4. Access [http://localhost:3000](http://localhost:3000)

### Features
*can be applied individually for each random task (CSV, JSON, Console)*
- Action buttons:
    - Download All as CSV
    - Download All as JSON
    - Print All to Console

#### Note
- If no data is showing up, it may mean the api has reached its interval usage. do wait for 15 minutes for it to reset. (According to Bored API Documentation)
