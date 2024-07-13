"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const conta_controller_1 = require("../src/controllers/conta.controller");
describe('ContaController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [conta_controller_1.ContaController],
        }).compile();
        controller = module.get(conta_controller_1.ContaController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
