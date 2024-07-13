"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const gerente_controller_1 = require("../src/controllers/gerente.controller");
describe('GerenteController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [gerente_controller_1.GerenteController],
        }).compile();
        controller = module.get(gerente_controller_1.GerenteController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
