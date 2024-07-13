"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cliente_controller_1 = require("../src/controllers/cliente.controller");
describe('ClienteController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [cliente_controller_1.ClienteController],
        }).compile();
        controller = module.get(cliente_controller_1.ClienteController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
