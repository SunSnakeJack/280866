const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    
};

exports.findAll = (req, res) => { 
    const title = req.body.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Tutorial.findAll({ where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occerred!"
            })
        })

};

exports.findOne = (req, res) => {
   
}; 

exports.findAllPublihed = (req, res) => {
   
};
exports.update = (req, res) => {
    
} ;

exports.delete = (req, res) => {
 
};

exports.deleteAll = (req, res) => {
   
};

