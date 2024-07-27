<template>
  <div class="container">
    <div class="actions">
      <button @click="saveAllAsCSV">Download All as CSV</button>
      <button @click="saveAllAsJSON">Download All as JSON</button>
      <button @click="printAllToConsole">Print All to Console</button>
    </div>
    <table v-if="data.length">
      <caption>
        Random Tasks
      </caption>
      <thead>
        <tr>
          <th scope="col">Activity</th>
          <th scope="col">Availability</th>
          <th scope="col">Type</th>
          <th scope="col">Participants</th>
          <th scope="col">Price</th>
          <th scope="col">Accessibility</th>
          <th scope="col">Duration</th>
          <th scope="col">Kid Friendly</th>
          <th scope="col">Link</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td data-label="Activity">{{ item.activity }}</td>
          <td data-label="Availability">{{ item.availability }}</td>
          <td data-label="Type">{{ item.type }}</td>
          <td data-label="Participants">{{ item.participants }}</td>
          <td data-label="Price">{{ item.price }}</td>
          <td data-label="Accessibility">{{ item.accessibility }}</td>
          <td data-label="Duration">{{ item.duration }}</td>
          <td data-label="Kid Friendly">
            {{ item.kidFriendly ? 'Yes' : 'No' }}
          </td>
          <td data-label="Link">
            <a :href="item.link" target="_blank" v-if="item.link">Link</a>
            <span v-else>N/A</span>
          </td>
          <td data-label="Actions">
            <button @click="saveAsCSV(item)">CSV</button>
            <button @click="saveAsJSON(item)">JSON</button>
            <button @click="printToConsole(item)">Console</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import axios from 'axios';

const data = ref([]);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const saveAsJSON = (item) => {
  const jsonString = JSON.stringify(item, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `data-${item.key}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const saveAllAsJSON = () => {
  const jsonString = JSON.stringify(data.value, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  a.click();
  URL.revokeObjectURL(url);
};

const saveAllAsCSV = () => {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    data.value
      .map((item) =>
        Object.values(toRaw(item))
          .map((value) => `"${value}"`)
          .join(',')
      )
      .join('\n');
  const encodedUri = encodeURI(csvContent);
  const a = document.createElement('a');
  a.href = encodedUri;
  a.download = 'data.csv';
  a.click();
};

const printAllToConsole = () => {
  console.log(data.value.map(toRaw));
};

const saveAsCSV = (item) => {
  const csvContent = `data:text/csv;charset=utf-8,${Object.keys(item).join(
    ','
  )}\n${Object.values(item).join(',')}`;
  const encodedUri = encodeURI(csvContent);
  const a = document.createElement('a');
  a.href = encodedUri;
  a.download = `data-${item.key}.csv`;
  a.click();
};

const printToConsole = (item) => {
  console.log(toRaw(item));
};
onMounted(async () => {
  for (let i = 0; i < 15; i++) {
    try {
      // Note that the api brewery has a rate limit of 100 api call per 15 minutes
      const response = await axios.get('/api/random');
      data.value.push(response.data);
      await delay(1); // just to make sure that each object is unique fetched from the api
    } catch (err) {
      console.error('Error fetching data:', err);
      break;
    }
  }
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background-color: #100f0f;
  color: #cecdc3;
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: start;
}
.container {
  width: 100%;
  max-width: 1200px;
}
.actions {
  /* border: 1px solid red; */
  display: flex;
  width: 50%;
  margin: 10px auto;
  justify-content: space-evenly;
}
.actions button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #1e90ff;
  color: white;
  cursor: pointer;
}
.actions button:hover {
  background-color: #1c7ed6;
}
table {
  border-collapse: collapse;
  margin: 0;
  padding: 10px;
  width: 100%;
  table-layout: fixed;
}
table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}
table thead {
  background-color: #1a1a1a;
  color: #ffffff;
}
table thead tr {
  border: none;
  height: auto;
  margin: 0;
  overflow: visible;
  padding: 0;
  position: static;
  width: auto;
}
table th,
table td {
  padding: 0.625em;
  text-align: center;
}
table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
tbody tr {
  background-color: #1e1e1e;
}
a {
  color: #1e90ff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
button {
  margin: 5px 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #1e90ff;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #1c7ed6;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }
  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
</style>
