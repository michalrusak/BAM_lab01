const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/database");
require("dotenv").config();

const router = express.Router();

// Rejestracja
router.post("/register", async (req, res) => {
  const { login, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (login, password) VALUES (?, ?)",
      [login, hashedPassword]
    );
    res.status(201).json({ message: "Użytkownik zarejestrowany!" });
  } catch (error) {
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Logowanie
router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE login = ?", [
      login,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Nie znaleziono użytkownika" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowe hasło" });
    }

    const token = jwt.sign(
      { id: user.id, login: user.login },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Zalogowano!", token });
  } catch (error) {
    res.status(500).json({ error: "Błąd serwera" });
  }
});

module.exports = router;
