import { defineEventHandler } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const response = await axios.get('https://bored-api.appbrewery.com/random');
    return response.data;
  } catch (error) {
    return { Error: `Failed to fetch data: ${error}` };
  }
});
