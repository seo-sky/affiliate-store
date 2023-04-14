## SeoSky Affiliate Marketing

- This application is designed to allow users to sign up for the SeoSky affiliate program and generate unique referral links to promote SeoSky's products. It is built using ReactJS and utilizes the SeoSky API to fetch product and affiliate data.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


# Installation
- To run this application locally, you will need to have Node.js and npm (or yarn) installed on your machine. Clone the repository to your local machine and run the following command to install the dependencies:

```
npm install
```
or
```
yarn install
```
- Usage: To start the development server, run the following command:

```
npm start
```
or
```
yarn start
```
This will start the application on http://localhost:3000 in your web browser.

# Dev
For Production:

## Step 1 (build app)

  - ``` npm run build ```
## Step 2 (copy result)
  - Copiaza tot din ``` /build ```
## Step 3 (set files for production server-side)
  - Mergi in ``` /server ``` si pune-le in ``` /public ```, ASIGURA-TE CA TOTUL ESTE PUS LA PUNCT PENTRU ``` PRODUCTION ``` (trebuie schimbat unde foloseste express fisierele de la react din ```client```, in ```/public``` dupa ce muti fisierele)
## Step 4 (upload app)
  - Incarca fisierele in server!

# Contributing
If you would like to contribute to this project, please open an issue or submit a pull request on GitHub.

# Credits
This project was created by SeoSky and is licensed under the MIT license. SeoSky API is used under their terms of service.


## What to do next:

- ```Admin panel``` - finish
```

api: EDIT FOR CATEGORY & SUBCATEGORY
api: PRODUCTS (get, add, delete, edit)
api: ADMIN-LOGIN (get, add, delete, edit) - users
api: ADMIN-TOKEN (get, edit)

```
- STATISTICS:
  - ```produse adaugate```
  - ```produse sterse```
  - ```clickuri```
  - ```accesari```

- improve security