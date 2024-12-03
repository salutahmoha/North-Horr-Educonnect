import Sequelize from "sequelize";

// PostgreSQL database connection
const sequelize = new Sequelize("Educonnect", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
