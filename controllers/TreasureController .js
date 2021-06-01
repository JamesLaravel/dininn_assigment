const { validationResult } = require('express-validator')
const Validator = require('fastest-validator')
const validate = new Validator();
const db = require('../models')
const { Op } = require("sequelize");
const treasure = db.Treasure;
const money_value = db.MoneyValue;

const bodyValidate = (req, res)=> {

    const result = validationResult(req);

    const hasErrors = !result.isEmpty();

    if(hasErrors){

        return res.status(422).json({
            statusCode: 0,
            message: 'Invalid body data passed',
            errors: result.array({onlyFirstError: true})
        })
    }
}
exports.treasure_boxes = async(req, res, next) => {

    bodyValidate(req, res);

    const schema = {
       distance: {
            type: "enum",
            values: [1,10]
        },
       
    }

    const check = validate.compile(schema)

   const result = check({
        distance: req.body.distance,
       
    })

    if(result !== true){
       return res.status(422).json({
           error: result
       })
    }


    try {

        const spatial_data = {
            longitude: req.body.longitude,
            latitude: req.body.latitude
        }
        const distance = req.body.distance
        
        const treasure_boxes = await treasure.findAll();

        const found_boxes = treasure_boxes.map(item=> {
            return getDistanceFrom(item,spatial_data, distance) // get the closest distance between the passed spatial data
        })

        const tres = found_boxes.filter(item=> typeof item != 'undefined') // filter to remove the null from the array of object

        if(typeof req.body.price_value !== 'undefined'){

            const range = {
                min : 10,
                max: 30
            }
            const price_value_passed = req.body.price_value

            //check if the array of price value passed is within the specified range and is a whole number
            const checkRange = price_value_passed.every(function(e){
                return e >= this.min && e <= this.max && Number.isInteger(e) == true
            }, range)

          
            if(!checkRange){
                return res.status(400).json({
                    status_code: 0,
                    message: "Price values not allowed"
                })
            }

            console.log(price_value_passed);
            const min_value = Math.min.apply(null, price_value_passed);

            console.log(min_value)
            
            //if price value was passed handle treasure boxes base on price value

            //using sequelize association to get the relationship between the money value and treasure
            const treasure_price_value = await money_value.findAll({
                where:{
                    amt: {
                        [Op.gt]: min_value
                    }
                },
                include: [{ model: treasure}],
                attributes: ['id', 'amt']
            })


            const find_treasure = treasure_price_value.map(item=> {
                return getDistanceFromv2(item, spatial_data, distance)
            })

            const filter_res = find_treasure.filter(item=> typeof item !== 'undefined');

            res.status(200).json({
                message: 'congratulations the following treasured boxes where discovered',
                data: filter_res
            });
            
        }else{

            res.status(200).json({
                message: 'congratulations the following treasured boxes where discovered',
                data: tres
            })
             
        }
        
    } catch (error) {
        
        error.status = 400;
        next(error);

    }
}

/**
 * 
 * @param {* treasure box object} treasure_boxes 
 * @param {* user spatial passed data} user_res 
 * @param {* user passed distance} dis_pass 
 * @returns closest treasure boxes
 * 
 * using Haversine formula 
 */
const getDistanceFrom = (treasure_boxes, user_res, dis_pass) => {

    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(user_res.latitude - treasure_boxes.Latitude);
    let dLon = deg2rad(user_res.longitude - treasure_boxes.Longitude);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(treasure_boxes.Latitude) * Math.cos(deg2rad(user_res.latitude))) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in KM
    
    const res = {};
    if(d <= dis_pass){
       
        res.name = treasure_boxes.Name
        res.id = treasure_boxes.id
        res.longitude = treasure_boxes.Longitude
        res.latitude = treasure_boxes.Latitude
        
        return res;
    }

}

const getDistanceFromv2 = (treasure_boxes, user_res, dis_pass) => {

    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(user_res.latitude - treasure_boxes.Treasure.Latitude);
    let dLon = deg2rad(user_res.longitude - treasure_boxes.Treasure.Longitude);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(treasure_boxes.Treasure.Latitude) * Math.cos(deg2rad(user_res.latitude))) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in KM
    
    const res = {};
    if(d <= dis_pass){
       
        res.name = treasure_boxes.Name
        res.treasure_id = treasure_boxes.Treasure.id
        res.longitude = treasure_boxes.Treasure.Longitude
        res.latitude = treasure_boxes.Treasure.Latitude
        res.amt = treasure_boxes.amt
        res.money_value_id = treasure_boxes.id
        
        return res;
    }

}

const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}




