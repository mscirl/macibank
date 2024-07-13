"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cliente_service_1 = require("../src/services/cliente.service");
describe('ClienteService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [cliente_service_1.ClienteService],
        }).compile();
        service = module.get(cliente_service_1.ClienteService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
