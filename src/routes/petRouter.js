"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PetController_1 = require("../controller/PetController");
var router = express_1.default.Router();
var petController = new PetController_1.default();
router.post("/", petController.criaPet);
exports.default = router;
