# Simple utility backend

### Dependencies Used

- `yargs` - for defining user inputs
- `csv-writer` - for exporting data as csv file
- `axios` - for performing http requests

### Get started using

1. Clone this repository
2. Run the command `npm install` to install dependencies
3. Perform commands.

### Command Structure

`npm start -- -n <number> -f <console|csv|json>`

_For example:_

`npm start -- -n 10 -f csv`

`npm start -- -n 5 -f console`

`npm start -- -n 3 -f json`

#### Default Values

_If args are not supplied:_

`n` = 1

`f` = console
