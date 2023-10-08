# upload-and-view-csv
A web application where users can upload their CSV files on database and view them.

Here the user can: 
-	Display a list of all uploaded csv files
-	View the selected file
-	Search for the file and also the contents in file 
-	Sort column in ascending or descending order 
-	Validation is also provided to prevent from uploading files except CSV


## HOW TO SETUP PROJECT

Follow given steps to run this project on your local machine

1. clone this repository

```$ git clone https://github.com/keshavkumar4699/upload-and-view-csv```

2. Install required dependencies

```$ npm install```

3. Set port env variables

```$ set PORT=<port_number>```

4. Start application

```$ npm start```

5. Open application in browser

```$ http://localhost:<PORT>```

## USAGE

Once you have the application up and running, you can follow these steps: 

- go to ```localhost:<PORT>```
- upload CSV files (only upload CSV files other files will not be uploaded)
- search for the file in search box
- click on delete button to delete file
- click on view button to view CSV your selected CSV file
- when viewing file you can search required field in search box
- click on arrow button to navigate between pages
- to go back to home click home button


## FOLDER STRUCTURE
```
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
```

## FURHTER IMPROVEMENTS
1. add google charts