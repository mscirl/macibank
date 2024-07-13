"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const gerente_service_1 = require("../src/services/gerente.service");
describe('GerenteService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [gerente_service_1.GerenteService],
        }).compile();
        service = module.get(gerente_service_1.GerenteService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
