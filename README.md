# 🎬 Film Rating App

A web application that allows users to search, sort, and view information about movies using the OMDb API.

---

## 🌟 Features

- 🔍 Search for movies by title
- 📊 Sort by IMDb rating or release year
- 📦 Backend powered by Node.js and Express
- 🌐 Data fetched from the OMDb API
- ⚠️ Handles errors like missing results or API issues
- 🐳 Dockerized and deployed on multiple web servers behind a load balancer

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/film-rating-app.git
cd film-rating-app
2. Setup the Backend
bash
cd backend
npm install
Create a .env file in the backend/ folder:

env
OMDB_API_KEY=your_api_key_here
Then start the backend:

bash
node server.mjs
3. Open the Frontend
Simply open frontend/index.html in your browser.

🐳 Docker Instructions
1. Build Docker Image
From the project root:

bash
docker build -t film-rating-app:v1 .
2. Tag and Push (optional)
bash
docker tag film-rating-app:v1 bayinganasonia/film-rating-app:v1
docker push your-dockerhub-username/film-rating-app:v1
3. Run on Server
SSH into the web server and run:

bash
docker run -d -p 80:80 bayinganasonia/film-rating-app:v1
⚙️ Deployment Architecture
web-01 and web-02: Run the application

lb-01: Acts as a load balancer distributing traffic

Each server maps internal port 80 to different host ports (8080, 8081, etc.)

🛠 Technologies Used
Node.js

Express

HTML, CSS, JavaScript

OMDb API

Docker

⚠️ Error Handling
User-friendly error messages for failed searches

Graceful handling of missing or invalid API responses

🧪 Testing
You can test the app by:

bash
curl http://localhost:8080
curl http://localhost:8081
And for load balancing:

bash

curl http://localhost:8082
🙏 Acknowledgments
Movie data provided by the OMDb API

📽️ Demo Video
(https://youtu.be/rn5rWjq8DkI)
