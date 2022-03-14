const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");

const sequelize = new Sequelize(cs.database, cs.username, cs.password, {
    host: cs.host,
    dialect: cs.dialect
});

try {
    sequelize.authenticate()
        .then(res => console.log('Connection has been established successfully.',
            sequelize.getDatabaseName()))
        .catch(err => console.log(err));

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

let deletedAt = '';

const userTasksTable = sequelize.define('userTasksModel', { deletedAt }, { tableName: "UserTasks" });


module.exports = function serviceFactory(model) {

    function getAll(req, res, next, attributesArray) {

        model.findAll(
            {
                attributes: attributesArray,
                where: {
                    deletedAt: null
                }
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function getSingle(req, res, next, attributesArray, id) {

        let idData = req.params.id;

        model.findOne({
            where: { id: idData },
            attributes: attributesArray
        })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function getAllPagination(req, res, next, attributesArray, os, lim) {

        let offsetData = os ? os : req.params.osData;
        let limitData = lim ? lim : req.params.limData;

        model.findAndCountAll(
            {
                attributes: attributesArray,
                where: {
                    deletedAt: null
                },
                offset: offsetData,
                limit: limitData
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function deleteSingle(req, res, next, attributesArray, id) {

        const idData = parseInt(req.params.id);
        const t = new Date(Date.now()).toISOString();

        model.update(
            { deletedAt: t },
            {
                where: { id: idData },
            })
            .then(result => {

                userTasksTable.update(
                    {
                        deletedAt: t,
                    },
                    {
                        where: { userId: idData },
                        attributes: ['id', 'userId', 'taskId', 'deletedAt']
                    })
                    .then(result => {
                        res.send('delete done');
                    })
                    .catch(err => res.send(err));

                // res.send('ok');
            })
            .catch(err => res.send(err));

    }

    return { getAll, getSingle, getAllPagination, deleteSingle };
}
