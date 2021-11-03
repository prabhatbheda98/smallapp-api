const Employee = require("../models/employee");
const Boom = require("boom")

exports.getemployee =async (req, res, next) => {
    try {
        const student = await Employee.find({});
        return res.send(student)
      
    } catch (error) {
        console.log(error)
        return next(Boom.badRequest("data not found", error))
    }
}
exports.createemployee =async (req,res,next) =>{
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.send(employee); 
    } catch (error) {
        console.log(error)
        return next(Boom.badRequest("data not found", error))
    }
}
exports.updateemployee = async (req, res) => {
    try {   
        const id = req.params.id;
        const employee = await Employee
        .findByIdAndUpdate(id, req.body);

        res.send("student update successful");
    } catch (error) {
        console.log(error)
    }
}