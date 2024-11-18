const express = require('express');
const router = express.Router();

const ctrlFetchProducts = require('../Controller/fetchProducts');


/**
 * @swagger
 *  components:
 *    schemas:
 *        SchemaValidator:
 *                type: object
 *                properties:
 *                    schemaShortCode:
 *                          type: string
 *                    dataJson:
 *                          type: object
 */

/**
 * @swagger
 * /compliance-api/validateSchema:
 *  post:
 *      summary: Used to validate schema against data
 *      description: Validates schema against input data
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#components/schemas/SchemaValidator'
 *      responses:
 *          200:
 *              description: Successful response
 */


router.get('/getProducts', ctrlFetchProducts.getProducts);

// Example route handler
router.get('/example', (req, res) => {
  res.json({
    message: 'This is an example endpoint',
    status: 200,
  });
});

// XML Response Route
router.get('/GetBit', (req, res) => {
  res.type('application/xml');
  res.send(
    `<Zero>
      <First>SEND</First>
      <Second>
        <Third>SEND</Third>
        <Fourth>
          <Fifth>SEND</Fifth>
          <Six>
            <seven>SEND</seven>
          </Six>
        </Fourth>
      </Second>
    </Zero>`
  );
});

// Placeholder for adding future routes
// Example: router.use('/your-api', yourApiController);

module.exports = router;
