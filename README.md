# 📝 Blog-app — Blog App with CI/CD & E2E Testing

A full-stack blog platform with automated CI/CD pipelines, real-time end-to-end testing, Redis caching, AWS S3 integration, and Travis CI support. Built with scalability, performance, and developer productivity in mind.

---

## 🚀 Features

- ✍️ Create, edit, and manage blog posts with rich content
- 🔒 User authentication (local strategy)
- 📸 Image uploads to AWS S3
- ⚡ Caching using Redis for better performance
- 🧪 End-to-End testing using Puppeteer (headless Chrome)
- ✅ Continuous integration with Travis CI
- 🌐 Deployed on Heroku (or your own platform)

---

## 🛠 Tech Stack

| Area            | Tech Used                     |
|-----------------|-------------------------------|
| Backend         | Node.js, Express              |
| Database        | MongoDB, Mongoose             |
| Authentication  | Passport.js                   |
| Caching         | Redis                         |
| File Storage    | AWS S3                        |
| Testing         | Puppeteer, Jest               |
| CI/CD           | Travis CI                     |


---

## 📁 Project Structure

```text
NodeCI/
├── routes/                    # Express routes (upload, auth, blog)
├── models/                    # Mongoose models
├── services/                  # Redis, AWS, and CI logic
├── views/                     # EJS templates
├── public/                    # Static assets
├── tests/                     # Puppeteer end-to-end tests
├── ci/                        # Travis configuration & helpers
├── app.js                     # Main server entry
├── Dockerfile                 # For containerized CI pipeline
├── .travis.yml                # Travis CI config
└── package.json               # Scripts and dependencies

---

## 🧪 Available Scripts

```bash
# Install dependencies
npm install
cd client
npm install

# Start the backend server with nodemon (ignores test files)
npm run server

# Start the React frontend client
npm run client

# Start both client and server concurrently (for development)
npm run dev

# Build the frontend (used by Heroku deployment)
npm run build

# Run test 
npm test
```

---

## 📫 Author
Ahmed Baraa Ali Khattab
📧 ahmedbaraa009@gmail.com
🔗 LinkedIn
🐙 GitHub
