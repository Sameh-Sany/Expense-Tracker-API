const Category = require("../models/category");
const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("../validations/category");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({ name });

    const { error } = createCategoryValidation({ name });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await category.save();
    return res.status(201).json({
      message: "Category was created successfully",
      statusCode: 201,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json({
      message: "Categories were fetched successfully",
      statusCode: 200,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json({
      message: "Category was fetched successfully",
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });

    const { error } = updateCategoryValidation({ name });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.update(name);

    return res.json({
      message: "Category was updated successfully",
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();

    return res.json({
      message: "Category was deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
