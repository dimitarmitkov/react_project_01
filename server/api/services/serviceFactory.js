module.exports = function serviceFactory(model) {

    function getAll(req, res, next, attributesArray) {

        model.findAll({ attributes: attributesArray })
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
                // where: {
                //     title: {
                //       [Op.like]: 'foo%'
                //     }
                //  },
                offset: offsetData,
                limit: limitData
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    return { getAll, getSingle, getAllPagination };

}
