
# Image Processing API

This Project will resize the image based on the height and width provided using sharp npm module.

## Run Locally

Clone the project

```bash
  git clone https://github.com/renurevzranju/image-processing-api.git
```

Go to the project directory

```bash
  cd image-processing-api
```

Install dependencies

```bash
  npm install
```

### Scripts

Start the server

```bash
  npm run start
```

Build script to compile TS to JS

```bash
  npm run build
```

Run Unit Test using Jasmine Library
```bash
  npm run test
```

Format the code
```bash
  npm run prettier
```

Lint the code
```bash
  npm run lint
```

## Usage

Server will be running on port 5000

### Endpoints

Landing page with a form where user can provide the filename, height and width and submit to make the process easier
```bash
  http://localhost:5000
```
Endpoint to resize an image
```bash
  http://localhost:5000/api/images?filename=palmtunnel&width=200&height=200
```

#### Query Parameters to resize the image
-  _filename_ : Image filename that are available in assets/full folder
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_ : number that is greater than 1
- _height_ : number that is greater than 1
you can also choose to ignore the width and height

#### Examples:
```bash
  http://localhost:5000/api/images?filename=palmtunnel
```
Will display the original palmtunnel image from full folder

```bash
  http://localhost:5000/api/images?filename=palmtunnel&width=100

  http://localhost:5000/api/images?filename=palmtunnel&height=100
```
Will display a message as _Provide height and width as parameters to resize image_


