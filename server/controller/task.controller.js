import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM task ORDER BY created_at ASC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Something goes wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0) {
      res.status(404).json({ error: "Task not found" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Something goes wrong" });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO task (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.json({
      id: rows.insertId,
      title,
      description,
    });
  } catch (error) {
    res.status(500).json({ error: "Something goes wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE task SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Something goes wrong" });
  }
};

export const deletTask = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM task WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Something goes wrong" });
  }
};
