# E-Commerce Platform with DevOps Integration

A full-stack e-commerce platform featuring a React frontend and Express.js API, fully containerized with Docker, CI/CD pipelines, and deployment-ready configurations. Built as a comprehensive DevOps project demonstrating modern software engineering practices.

## 🚀 Features

- **Frontend (React)**: Responsive e-commerce UI with product listings, details, login, and order placement
- **Backend (Express.js)**: RESTful API for products, orders, and authentication
- **Database**: In-memory data store (easily extendable to PostgreSQL/MongoDB)
- **Authentication**: JWT-based user login system
- **Image Handling**: High-quality gadget images from Unsplash with fallbacks
- **Responsive Design**: Mobile-first CSS with modern styling

## 🛠 Tech Stack

- **Frontend**: React 19, React Router, Axios
- **Backend**: Node.js, Express.js, JWT
- **DevOps**: Docker, Docker Compose, GitHub Actions, AWS (EC2, CloudFront)
- **Security**: Helmet, CORS, environment-based secrets
- **Monitoring**: Health checks, structured logging (Morgan)

## 📋 Prerequisites

- Node.js 20.x or higher
- Docker and Docker Compose
- Git
- AWS account (for deployment)
- GitHub account (for CI/CD)

## 🏗 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/daretechie/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Install dependencies**:
   - For API:
     ```bash
     cd api
     npm install
     ```
   - For Frontend:
     ```bash
     cd ../webapp
     npm install
     ```

3. **Environment Variables**:
   - Copy `.env.example` to `.env` in both `api/` and `webapp/` directories
   - Set `JWT_SECRET` in `api/.env` (e.g., `JWT_SECRET=your_secret_key`)
   - For production, set `REACT_APP_API_BASE_URL=/api` in `webapp/.env`

## 🚀 Running Locally

1. **Start the API**:
   ```bash
   cd api
   export JWT_SECRET=dev_secret
   npm start
   # API runs on http://localhost:3001
   ```

2. **Start the Frontend**:
   ```bash
   cd webapp
   npm start
   # Frontend runs on http://localhost:3000 (proxies to API)
   ```

3. **Access the application**:
   - Home: http://localhost:3000
   - Products: http://localhost:3000/products
   - Login: http://localhost:3000/login

## 🐳 Running with Docker (Recommended for DevOps)

1. **Build and run the stack**:
   ```bash
   export JWT_SECRET=your_secret
   docker compose up --build
   ```

2. **Access the application**:
   - Frontend: http://localhost:3000
   - API Health: http://localhost:3000/api/health
   - Direct API: http://localhost:3001/health

## 🚀 Deployment

### Option 1: AWS (EC2 + CloudFront)
Follow the detailed AWS deployment guide in the project documentation or reference the related repo for EC2 pipeline setup.

### Option 2: Automated Deployment
The project includes a GitHub Actions workflow that automatically deploys to AWS EC2 on every push to `main` after successful CI/CD.

### Option 3: Managed Platforms
- **API**: Deploy to Render or Heroku
- **Frontend**: Deploy to Netlify or Vercel
- Configure environment variables and CORS accordingly.

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows for:
- **CI (Pull Requests)**: Install, test, and build on code changes
- **Docker Publish (Main Branch)**: Build and push images to GitHub Container Registry (GHCR)
- **Deploy (Main Branch)**: Automatically deploy to AWS EC2 after successful builds

Workflows are triggered on PRs and pushes to `main` for relevant paths (`api/**`, `webapp/**`).

## 🧪 Testing

- **Frontend**: Run `npm test` in `webapp/` (Jest configured)
- **API**: Run `npm test` in `api/` (placeholder for future tests)
- **Integration**: Use `docker compose` for end-to-end testing

## 🔧 Troubleshooting

### Common Issues

1. **Products Not Loading**:
   - Ensure API is running on port 3001
   - Check `curl http://localhost:3001/products` for data
   - Verify `JWT_SECRET` is set in API environment

2. **Images Not Showing**:
   - Fallback images are set in code; check network tab in browser DevTools
   - Ensure Unsplash URLs are accessible (no CORS issues in production)

3. **Docker Issues**:
   - Run `docker compose logs` to check service logs
   - Ensure ports 3000 and 3001 are free
   - Use `docker system prune` to clean up if needed

4. **CI/CD Failures**:
   - Check GitHub Actions logs for detailed errors
   - Ensure Node.js version matches in workflows
   - Verify secrets are set in GitHub repo settings

5. **Deployment Issues**:
   - For AWS: Check EC2 security groups and instance status
   - For Render/Netlify: Verify build logs and environment variables

### Build and Runtime Issues
- **Port Conflict:** If you get an error that port 3000 or 3001 is already in use, stop the application using it. Find the process with `sudo lsof -i :3000` and kill it with `sudo kill -9 <PID>`.
- **`JWT_SECRET` not set:** Ensure you have exported the `JWT_SECRET` environment variable before running `docker-compose up`. Check with `echo $JWT_SECRET`.
- **Docker Issues:** Run `docker-compose logs -f` for real-time logs. If containers fail to start, check for permission issues or missing dependencies.

### Deployment Issues
- **EC2 Connection Failed:** Verify your EC2 instance is running and security groups allow SSH (port 22) from your IP. Check the instance status in the AWS console.
- **Image Pull Errors:** Ensure the Docker images are successfully pushed to GHCR. Check the Actions tab for any failures in the `docker-publish.yml` workflow.
- **Application Not Accessible:** After deployment, check if the EC2 firewall allows ports 80 and 443. Use `sudo ufw status` and allow if necessary.

### Performance and Network Issues
- **Slow Builds:** The caching in CI/CD should help, but if local builds are slow, ensure you're using Node 20.x and have sufficient RAM.
- **Network Timeouts:** For external API calls (like Unsplash images), check your internet connection. In production, consider using a CDN for static assets.
- **Memory Issues:** Monitor with `docker stats`. If containers use too much memory, optimize your Docker images or upgrade your EC2 instance type.

### CI/CD Failures
- **Workflow Permissions:** Ensure the GitHub token has package read/write permissions for GHCR.
- **Secret Mismatches:** Double-check that secrets in GitHub match your local environment variables.
- **Node Version:** The workflows use Node 20; if you encounter issues, verify your local Node version matches.

For additional help, check the GitHub Actions logs in the repository's Actions tab or open an issue.

## 📸 Evidence & Screenshots

### Screenshots
1. **Home Page**: ![Home Page](screenshots/home.png) - Hero section with gadget images and categories
2. **Products Page**: ![Products Page](screenshots/products.png) - Grid of product cards with images and prices
3. **Product Detail**: ![Product Detail](screenshots/product-detail.png) - Individual product view with image fallback
4. **Login Page**: ![Login Page](screenshots/login.png) - JWT-based authentication form
5. **Docker Compose Running**: ![Docker Compose](screenshots/docker-compose.png) - Both services running locally
6. **CI/CD Workflow**: ![CI Workflow](screenshots/ci-workflow.png) - GitHub Actions build success
7. **AWS Deployment**: ![AWS Deployment](screenshots/aws-deployment.png) - EC2 instance with CloudFront distribution

### Test Results
- Unit Tests: All passing (run `npm test` in each directory)
- Integration Tests: Manual testing via browser and API endpoints
- Load Tests: Basic stress testing with multiple users (placeholder for future)

## 📚 References

- **Related Repo**: [github-actions-ec2-pipeline](https://github.com/daretechie/github-actions-ec2-pipeline) - Reference for AWS EC2 deployment pipeline
- **Docker Documentation**: [Docker Compose](https://docs.docker.com/compose/)
- **GitHub Actions**: [Workflows](https://docs.github.com/en/actions)
- **React Documentation**: [Create React App](https://create-react-app.dev/)
- **Express.js**: [API Reference](https://expressjs.com/)
- **AWS Deployment Guide**: Based on standard AWS EC2 + CloudFront setup

## Git Workflow

- **Feature Branches**: Create branches for new features (e.g., `feature/add-user-auth`)
- **Pull Requests**: Require PR reviews before merging to `main`
- **Main Branch Protection**: Protected branch with required status checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **daretechie** - Initial work and DevOps integration

## 🙏 Acknowledgments

- Unsplash for high-quality gadget images
- React and Express.js communities for excellent documentation
- DevOps community for best practices in containerization and CI/CD

