var express = require('express');
var router = express.Router();

router.post("/", function (req, res) {
    var weight = req.body.weight;
    var parcelType = false;
    var cost = 0;

    console.log(req.body);

    switch (req.body.parcelType) {
        case 'Letters_Stamped':
            parcelType = "Letters Stamped";
            cost = 0.55;
            break;
        case 'Letters_Metered':
            parcelType = "Letters Metered";
            cost = 0.50;
            break;
        case 'Large_Envelopes_Flats':
            parcelType = "Large Envelope (Flats)";
            cost = 1;
            break;
        case 'First-Class_Package_Service_Retail':
            parcelType = "First-Class Package Service - Retail";
            cost = 3.80;
            break
        default:
            throw new Error('Please select a shipping type.');
    }

    res.render('rateDisplay', { title: 'Your Rate!' , pageName: 'rateDisplay', parcelType: req.body.parcelType, cost: cost});
})

module.exports = router;
