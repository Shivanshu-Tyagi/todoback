const todo = require("../model/todos/todos.model")

exports.addTodo = async (req, res) => {

    const { title, description } = req.body

    const newtodo = new todo({
        title,
        description, 
        user : req.params.id
    })

    try {
        await newtodo.save();
        res.status(200).send({
            message: "Todo created successfully",
            data: newtodo,
            status: true
        });
    }catch(error){
        res.status(500).send({
            message: "Error creating todo",
            message: error.message,
            status: 500
        });
    }
}

exports.updateTodos = async (req, res) => {
    const { title, description } = req.body;

    try {
        const updateTodo = await todo.findByIdAndUpdate(req.params.id, {
            title,
            description
        });

        if (!updateTodo) {
            return res.status(404).send({
                message: "Todo not found",
                status: false
            });
        }
        await updateTodo.save();

        res.send({
            message: "Todo updated successfully",
            data: updateTodo,
            status: true
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating todo",
            error: error.message,
            status: false
        });
    }
};


exports.deleteTodos = async (req, res) => {

    try {
        const deleteTodo = await todo.findByIdAndDelete(req.params.id)
        res.send({
            message: "Todo deleted successfully",
            data: deleteTodo,
            status: true
        })
    } catch (error) {
        res.send({
            message: "Error deleting todo",
            message: error.message,
            status: 500
        })
    }
}

exports.todos = async (req, res) => {

    try {
        const alltodo = await todo.find({user : req.params.id})
        res.send({
            message : "All todos",
            data : alltodo
        })
    } catch (error) {
        res.send({
            message : "Something went wrong",
            error
        })
    }
}