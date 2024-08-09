/*
============================================
; Title:  token-routes.js
; Author: gabe purselley
; Date:   6 Aug 24
; Description: file to create API routes
;  for the database
;===========================================
*/

const express = require("express");
const router = express.Router();
const Token = require("../models/token-model");

/**
 * createToken
 * @openapi
 * /api/tokens:
 *   post:
 *     tags:
 *       - Tokens
 *     description: create token automatically
 *     responses:
 *       '200':
 *         description: Token added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/tokens", async (req, res) => {
  try {
    // get the total count of documents in the cluster
    // const tokenCount = await Token.countDocuments();
    // const tokenNumber = parseInt(tokenCount) + 1;
    let tokenNumber = 1;

    while (await Token.findOne({ tokenId: tokenNumber })) {
      tokenNumber++; // Increment the token number if it already exists
    }

    // assign the token data to a variable
    const tokenData = {
      tokenId: tokenNumber,
      tokenAvailable: true,
    };
    // create a token based on the data
    await Token.create(tokenData)
      .then((createdToken) => {
        console.log(createdToken);
        res.json(createdToken);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error}`,
    });
  }
});

/**
 * getTokens
 * @openapi
 * /api/tokens:
 *   get:
 *     tags:
 *       -  Tokens
 *     description: return all tokens
 *     responses:
 *       '200':
 *         description: All Tokens Found
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/tokens", async (req, res) => {
  try {
    Token.find()
      .sort({ tokenId: 1 })
      .select("-_id -__v")
      .then((tokens) => {
        console.log(tokens);
        res.json(tokens);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error}`,
    });
  }
});

/**
 * getToken
 * @openapi
 * /api/tokens/{tokenId}:
 *   get:
 *     tags:
 *       - Tokens
 *     description: return one token
 *     parameters:
 *       - name: tokenId
 *         in: path
 *         required: true
 *         description: tokenId
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Token
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/tokens/:tokenId", async (req, res) => {
  try {
    Token.findOne({ tokenId: req.params.tokenId })
      .then((foundToken) => {
        console.log(foundToken);
        res.json(foundToken);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error}`,
    });
  }
});

/**
 * deleteToken
 * @openapi
 * /api/tokens/{tokenId}:
 *   delete:
 *     tags:
 *       - Tokens
 *     description: delete a token
 *     parameters:
 *       - name: tokenId
 *         in: path
 *         required: true
 *         description: tokenId
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Token
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete("/tokens/:tokenId", async (req, res) => {
  try {
    Token.findOneAndDelete({ tokenId: req.params.tokenId })
      .then((deletedToken) => {
        console.log(deletedToken);
        console.log("-- Token Deleted --");
        res.json(deletedToken);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error}`,
    });
  }
});

/**
 * assignToken
 * @openapi
 * /api/tokens/{tokenId}/assign:
 *   put:
 *     tags:
 *       - Assign
 *     description: assign token to user
 *     parameters:
 *       - name: tokenId
 *         in: path
 *         description: tokenId
 *         schema:
 *           type: number
 *     requestBody:
 *       description: assigned user information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userId
 *               - userOrg
 *             properties:
 *               userId:
 *                 type: string
 *               userOrg:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Token Assigned
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put("/tokens/:tokenId/assign", async (req, res) => {
  try {
    const userData = {
      userId: req.body.userId,
      userOrg: req.body.userOrg,
      dateIssued: new Date().toDateString(),
    };
    await Token.findOneAndUpdate(
      { tokenId: req.params.tokenId },
      { $set: { currentUser: userData, tokenAvailable: false } },
      { new: true }
    )
      .then((updatedToken) => {
        console.log(updatedToken);
        res.json(updatedToken);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error}`,
    });
  }
});

/**
 * returnToken
 * @openapi
 * /api/tokens/{tokenId}/return:
 *   put:
 *     tags:
 *       - Return
 *     description: user returned a token
 *     parameters:
 *       - name: tokenId
 *         in: path
 *         description: tokenId
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Token Assigned
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put("/tokens/:tokenId/return", async (req, res) => {
  try {
    const token = await Token.findOne({ tokenId: req.params.tokenId });

    let currentUser = token.currentUser[0];

    let updateData = {
      userId: currentUser.userId,
      userOrg: currentUser.userOrg,
      dateIssued: currentUser.dateIssued,
      dateReturned: new Date().toDateString(),
    };

    Token.findOneAndUpdate(
      { tokenId: req.params.tokenId },
      {
        $set: {
          previousUser: updateData,
          currentUser: {},
          tokenAvailable: true,
        },
      },
      { new: true }
    )
      .then((updatedToken) => {
        console.log("Token Updated");
        res.json(updatedToken);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error}`,
    });
  }
});

// export the router for the index.js file to read
module.exports = router;
