const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content connot be empty"
        })
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        publiched: req.body.publiched ? req.body.publiched : false
    }

    Tutorial.create(tutorial)
    .then(date => {
        res.send({date})
    })
    .catch(err => {
        res.status(500).send({
            message: "Error 500!"
        })
    });
};

exports.findAll = (req, res) => { 
    const title = req.body.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Tutorial.findAll()
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
    const id = req.params.id;
    Tutorial.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    //message: `Error 404 ${id}`
                    message: "Error 404" + id
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error 500" + id 
            })
        });
}; 

exports.findAllPublihed = (req, res) => {
    Tutorial.findAll({ where: { published: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error 500" 
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, { where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Updated successfully"
                })
            }else{
                res.send({
                    message: "Updated failed!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error update!"
            })
        }) 
} ;

exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Deleted successfilly"
            })
        }else{
            res.send({
                message: "Deleted failed!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error deleted 500"
        })
    })
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({
            message: "Deleted succesfully"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Error 500! "
        })
    });
};

