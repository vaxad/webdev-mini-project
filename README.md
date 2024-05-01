# Gambino - Gaming Profiler

Gambino is a web application developed by [Varad(C172)](https://github.com/vaxad), [Tirath(C165)](https://github.com/Tirath5504) and [Vikas(C181)](https://github.com/codesbyvikas), designed to showcase games from the RAWG database while providing user profiling features to connect players with similar interests. It offers a comprehensive platform for gamers to explore games, analyze their gaming habits, and connect with like-minded players.

## Features

- **Game Showcase**: Gambino displays games from the RAWG database, providing detailed information such as genre, rating, reviews, description, and images.
- **User Profiling**: The application profiles users based on factors like playtime, favorite genres, average rank in games, and favorite games. This profiling enables users to connect with others who share similar interests.
- **Frontend Technologies**: The frontend of Gambino is built using Vite, TailwindCSS, ShadCn UI, and UIBall loaders, with Bootstrap icons for enhanced UI elements.
- **Backend Technologies**: The backend is powered by Node.js, Express.js, MongoDB for data storage, JWT for authentication, bcrypt for password hashing, and Axios for making HTTP requests to the RAWG API.
- **Fuzzy Search**: Gambino implements fuzzy search functionality to enhance the user experience when searching for games.
  
## Getting Started

To get started with Gambino, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/vaxad/webdev-mini-project.git
   ```

2. **Install Dependencies**: 
   ```bash
   cd webdev-mini-project
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set Up Environment Variables**: 
   - Create a `.env` file in the backend and frontend directory.
   - Add your MongoDB connection string, JWT secret, and any other necessary environment variables to this file.

4. **Start the Development Server**: 
   ```bash
   cd backend
   npm run server
   cd ../frontend
   npm run dev
   ```

5. **Access the Application**: 
   Open your browser and navigate to `http://localhost:3000` to access the Gambino application.

## Contributing

Contributions to Gambino are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [RAWG API](https://rawg.io/apidocs)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCn UI](https://shadcn-ui.vercel.app/)
- [UIBall Loaders](https://github.com/ui-ball/loaders)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## Contact

For any inquiries or feedback, feel free to contact us at [vaxad.dev@gmail.com](mailto:vaxad.dev@gmail.com).

---

Feel free to customize this template according to your project's specific details and requirements!

## Website Screenshots 

![Screenshot 2024-05-01 202354](https://github.com/vaxad/webdev-mini-project/assets/111230032/1560c023-0b80-4fd1-b066-1b94ce8e2097)

![Screenshot 2024-05-01 203746](https://github.com/vaxad/webdev-mini-project/assets/111230032/78153b09-70c3-49c9-826e-7daee43684b7)

![Screenshot 2024-05-01 204017](https://github.com/vaxad/webdev-mini-project/assets/111230032/68bd4a6c-4486-49e0-84ee-b2508028ad77)

![Screenshot 2024-05-01 203915](https://github.com/vaxad/webdev-mini-project/assets/111230032/d1e330dd-c380-4e12-8b31-c2486852287f)

![Screenshot 2024-05-01 203832](https://github.com/vaxad/webdev-mini-project/assets/111230032/f19a6393-7a60-433a-9252-b9f79cf025e4)
