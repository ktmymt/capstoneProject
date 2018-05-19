import { Router } from 'express';
import axios from 'axios';
import qs from 'qs';
import multer from 'multer';

import { 
    getImagePath,
    uploadImageForDetection, 
    uploadImageForRecognition,
    start,
    end,
    timeElapsed,
} from '../utils/controller';

import { FACEPP_API_KEY, FACEPP_SECRET_KEY } from '../utils/apiKey';


const router = new Router();


const storage =  multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})

const uploader = multer({ storage })


<<<<<<< HEAD
=======
cloudinary.config({
    cloud_name: 'dyp8nhjhh',
    api_key: 'API_KEY',
    api_secret: 'API_SECRET'
  });

>>>>>>> acd29ed949c73fa57d221250bc96847a381739b9

router.get('/facePlusPlus/detection', function(req, res) {
    res.render('facePlusDetection.ejs', 
    {
        title : 'Face++',
        content: '',
        imageList: '',
    });
})

router.get('/faceplusplus/recognition', function(req, res) {
    res.render('facePlusRecognition.ejs', 
    {
        title : 'Face++',
        content: '',
        sourceImageList: '',
        targetImageList: ''
    });
})



<<<<<<< HEAD
router.post('/faceplusplus/detection', uploader.array('images', 10), function(req, res) {
    
    const files = req.files;
    
    var imageTagList = '';
    var imageName = [];

=======
const API_KEY = 'API_KEY';
const API_SECRET = 'API_SECRET';
>>>>>>> acd29ed949c73fa57d221250bc96847a381739b9

    for (var i = 0; i < files.length; i++) {
        imageName.push(files[i].originalname);
    }


<<<<<<< HEAD
    // start time meseauring
    var startTime = start();


    let promise = new Promise(async (resolve, reject) => {
        var imagePath = getImagePath(files);

        var imageUrl = [];

        console.log('#1', imagePath);
      
            
        let data = await uploadImageForDetection(imagePath);

        console.log('#2', data);

        imageUrl = data[0];    // this is an array
        imageTagList = data[1]

        resolve(imageUrl);  //  resolve them as one of array.
    })
    .then(async (imageUrl) => {

        console.log(imageUrl);

        let result = await requestApi(imageUrl);

        console.log('#3', result);

        return result;
    }) 
    .then((result) => {
        console.log('#4', result);
        var resultTag = '';

        // stop timer
        var endTime = end();
        var runtime = timeElapsed(startTime, endTime);


        console.log(result[0].faces[0].attributes);

=======
router.post('/faceplusplus/detection', uploader.array('images', 10), function(req, res) {
    
    const files = req.files;
    
    var imageTagList = '';

    var imageName = [];

    for (var i = 0; i < files.length; i++) {
        imageName.push(files[i].originalname);
    }


    const ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/detect';


    let promise = new Promise(async (resolve, reject) => {
        var imagePath = getImagePath(files);

        var imageUrl = [];

        console.log('#1', imagePath);
      
            
        let data = await uploadImage(imagePath);

        console.log('#2', data);

        imageUrl = data;    // this is an array

        resolve(imageUrl);  //  resolve them as one of array.
    })
    .then(async (imageUrl) => {

        console.log(imageUrl);

        let result = await requestApi(imageUrl);

        console.log('#3', result);

        return result;
    }) 
    .then((result) => {
        console.log('#4', result);
        var resultTag = '';

        console.log(result[0].faces[0].attributes);

>>>>>>> acd29ed949c73fa57d221250bc96847a381739b9
        for (var i = 0; i < result.length; i++) {
            resultTag += '<p>';
            resultTag += imageName[i];
            resultTag += ', ' + result[i].faces[0].attributes.gender.value;
            resultTag += ', SADNESS: ' + result[i].faces[0].attributes.emotion['sadness'];
            resultTag += ', ANGER: ' + result[i].faces[0].attributes.emotion['anger'];
            resultTag += ', HAPPINESS: ' + result[i].faces[0].attributes.emotion['happiness'];
            resultTag += '</p>';
        }

<<<<<<< HEAD
        resultTag += '<br><p>' + runtime + ' seconds</p>';
=======
>>>>>>> acd29ed949c73fa57d221250bc96847a381739b9
        

        res.render('facePlusDetection.ejs', 
        {
            title : 'Face++',
            content: resultTag,
            imageList: imageTagList,
        });
    })


<<<<<<< HEAD
    const ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/detect';
=======
    function getImagePath(imageFiles) {
        var path = [];

        for (var i = 0; i < imageFiles.length; i++) {
            path.push(imageFiles[i].path);
        }

        return path;
    }

    async function uploadImage(path) {
    
        var imageUrl = [];

        var counter = 0;

        for (var i = 0; i < path.length; i++) {
            await cloudinary.uploader.upload(path[i], function(result) {
                imageUrl.push(result.url);
                imageTagList += '<img class="box" src="' + imageUrl[counter] + '" height=230 width=200>';
                counter++;
            })    
        }

        return imageUrl;
    }
>>>>>>> acd29ed949c73fa57d221250bc96847a381739b9

    async function requestApi(imageUrl) {
        try {
            var result = [];

            for (var i = 0; i < imageUrl.length; i++) {
                var { data } = await axios.post(ENDPOINT, qs.stringify({
<<<<<<< HEAD
                    api_key: FACEPP_API_KEY,
                    api_secret: FACEPP_SECRET_KEY,
=======
                    api_key: API_KEY,
                    api_secret: API_SECRET,
>>>>>>> acd29ed949c73fa57d221250bc96847a381739b9
                    image_url: imageUrl[i],
                    return_attributes: 'gender,emotion',
                }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });    
                result.push(data)
            }
                
            return result;
            
        } catch(e) {
            console.log(e);
        }
    } 
    
})


router.post('/faceplusplus/recognition', uploader.array('images', 10), function(req, res) {

    const files = req.files;

    var sourceImageTagList = '';
    var targetImageTagList = '';

    // start time meseauring
    var startTime = start();


    let promise = new Promise(async (resolve, reject) => {
        var imagePath = getImagePath(files);

        var sourceImagePath = imagePath[0];
        var targetImagePath = imagePath[1];

        var sourceImageUrl = '';
        var targetImageUrl = [];

        console.log('#1 source', sourceImagePath);
        console.log('#1 target', targetImagePath);        
            
        let data = await uploadImageForRecognition(imagePath);

        sourceImageUrl = data[0];
        targetImageUrl = data[1];    // this is an array
        sourceImageTagList = data[2];
        targetImageTagList = data[3];

        resolve([sourceImageUrl, targetImageUrl]);  //  resolve them as one of array.
    })

    promise.then(async (imagePath) => {

        var sourceImageUrl = imagePath[0];
        var targetImageUrl = imagePath[1];

        console.log('#2 source', sourceImageUrl);
        console.log('#2 target', targetImageUrl);

        let result = await requestApi(sourceImageUrl, targetImageUrl);

        console.log('#3', result);

        return result;
    })
    .then(async (result) => {

        // stop timer
        var endTime = end();
        var runtime = timeElapsed(startTime, endTime);

        var resultTag = '';
        for (var i = 0; i < result.length; i++) {
            resultTag += '<p>' + result[i].confidence + '%</p>';
            console.log('#4', result[i].confidence);
        }

        console.log('#5', sourceImageTagList);
        console.log('#5', targetImageTagList);

        resultTag += '<br><p>' + runtime + ' seconds</p>';

        res.render('FacePlusRecognition.ejs', 
        {
            title : 'Face++',
            content: resultTag,
            sourceImageList: sourceImageTagList,
            targetImageList: targetImageTagList
        });
    })


    const ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/compare';

    // post request to face++ api, and return the result 
    // takes 2 arguments, single source url, and array target url. 
    async function requestApi(sourceUrl, targetUrl) {
        try {
            var result = [];

            for (var i = 0; i < targetUrl.length; i++) {
                var { data } = await axios.post(ENDPOINT, qs.stringify({
                    api_key: FACEPP_API_KEY,
                    api_secret: FACEPP_SECRET_KEY,
                    image_url1: sourceUrl,
                    image_url2: targetUrl[i],
                }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });    
                result.push(data)
            }
                
            return result;
            
        } catch(e) {
            console.log(e);
        }
    }   
})


export default router;