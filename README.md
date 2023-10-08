# upload-and-view-csv
to upload a CSV file and show the data in it.

## HOW TO SETUP PROJECT
1. run npm i to install following packages
  dotenv
  ejs
  express
  express-ejs-layouts
  mongoose
  multer
  nodemon
  csvtojson
2. set port env variable -> set PORT=<port_number>
3. run script to start -> npm start

## FOLDER STRUCTURE
project
│   README.md
│   index.js
|   package.json    
|   LICENSE    
│
└───models
|   │   csv.js
|
└───views
│   │   _header.ejs
│   │   home.ejs
|   |   layout.ejs
|   |   view_csv.ejs
|
└───controllers
|   │   csv_controller.ejs
|   │   index_controller.ejs
|
└───config
|   │   mongoose.ejs
|   │   multer.ejs
|
└───routes
|   │   csv_router.js
|   │   index_router.js
|
└───assets
│   │   
│   └───css
│   |   │ home.css
│   |   │ home.css.map
│   |   │ layout.css
│   |   │ layout.css.map
│   |   │ view_csv.css
│   |   │ view_csv.css.map
|   |
│   └───scss
│   |   │ home.scss
│   |   │ layout.scss
│   |   │ view_csv.scss
|   |
│   └───js
│       │ add_status.js 
│       │ detail_view.js
│       │ header.js
│       │ update_status.js
│       │ week_view.js

## FURHTER IMPROVEMENTS
1. add google charts