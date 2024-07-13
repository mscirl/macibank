"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const conta_service_1 = require("../src/services/conta.service");
describe('ContaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [conta_service_1.ContaService],
        }).compile();
        service = module.get(conta_service_1.ContaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
