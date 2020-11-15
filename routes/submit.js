var express = require('express');
var router = express.Router();
const apiKey = 'EZTKc1441366ff274d4a90dccaa309e9c54cpzLcgUOshB3DqRFq40OYwA';
const EasyPost = require('@easypost/api');

const api = new EasyPost(apiKey);

router.post("/", function (req, res) {

    const fromAddress = new api.Address({
        name: req.body.from_name,
        street1: req.body.from_street1,
        street2: req.body.from_street2,
        city: req.body.from_city,
        state: req.body.from_state,
        zip: req.body.from_zip,
        country: 'US',
        phone: req.body.from_phone
    })

    const toAddress = new api.Address({
        name: req.body.to_name,
        street1: req.body.to_street1,
        street2: req.body.to_street2,
        city: req.body.to_city,
        state: req.body.to_state,
        zip: req.body.to_zip,
        country: 'US',
        phone: req.body.to_phone
    })

    var parcelType = false;
    var cost = 0;

    console.log(req.body);

    switch (req.body.parcelType) {
        case 'Letters_Stamped':
            parcelType = "Letters Stamped";
            break;
        case 'Letters_Metered':
            parcelType = "Letters Metered";
            break;
        case 'Large_Envelopes_Flats':
            parcelType = "Large Envelope (Flats)";
            break;
        case 'First-Class_Package_Service_Retail':
            parcelType = "First-Class Package Service - Retail";
            break
        default:
            throw new Error('Please select a shipping type.');
    }

    var parcel = new api.Parcel({
        weight: req.body.weight,
        width: 1,
        height: 1,
        length: 1
    })

    const shipment = new api.Shipment({
        to_address: toAddress,
        from_address: fromAddress,
        parcel: parcel
    })

    try {
        api.Shipment.retrieve(shipment).then(s => {
            s.regenerateRates().then(
                s => console.dir(s.rates, {
                    depth: null,
                })
            )
        })
    } catch (e) {
        console.log(e);
        throw e;
    }


    res.render('rateDisplay', { title: 'Your Rate!' , pageName: 'rateDisplay', parcelType: req.body.parcelType, cost: cost});
})



/*router.post("/rateDisplay", [


    switch

    body('parcelType', 'Please select a shipping type.').custom(radioValue => {

        req.body.


        switch (radioValue){
            case 'Letters_Stamped':
                break;
            case 'Leters_Metered':
                break;
            case 'Large Envelopes (Flats)':
                break;
            case 'First-Class Package Service - Retail':
                break
            default:
                throw new Error('Please select a shipping type.');
        }

        return true;
    });

    res.render('getRate', { title: 'Express' });
])*/

module.exports = router;
