const pool = require('../db/db');

// To get all the existing tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user.userId]);
        res.json(tasks.rows);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks" });
    }
};

// To create new task 
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, req.user.userId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};

// To update exiting task using id
const updateTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [title, description, isComplete, req.params.id, req.user.userId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};

// To delete existing task using id
const deleteTask = async (req, res) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
