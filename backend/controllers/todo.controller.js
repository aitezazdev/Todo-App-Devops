import mongoose from "mongoose";
import Todo from "../models/todo.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    return errorHandler(res, error, 500);
  }
};

// create a todo
const createTodo = async (req, res) => {
  try {
    const { todoText, completed } = req.body;

    if (!todoText) {
      return res.status(400).json({
        success: false,
        error: "plz enter somthing to create a todo",
      });
    }

    const createdTodo = await Todo.create({
      todoText,
      completed: completed ?? false,
    });

    return res.status(201).json({
      success: true,
      message: "todo created successfully",
      data: createdTodo,
    });
  } catch (error) {
    return errorHandler(res, error, 500);
  }
};

// delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid todo ID format",
      });
    }

    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).json({
        success: false,
        error: "todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "todo deleted successfully",
      data: deleteTodo,
    });
  } catch (error) {
    return errorHandler(res, error, 500);
  }
};

// update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { todoText, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid todo ID format",
      });
    }

    const oldTodo = await Todo.findById(id);
    if (!oldTodo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    if (!todoText) {
      return res.status(400).json({
        success: false,
        error: "naming conflict or updated todo is empty",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        todoText,
        completed: completed ?? oldTodo.completed,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        error: "todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "todo updated successfully",
      oldData: oldTodo,
      newData: updatedTodo,
    });
  } catch (error) {
    return errorHandler(res, error, 500);
  }
};

export { getAllTodos, createTodo, deleteTodo, updateTodo };
