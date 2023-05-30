import DistanceCalculator from "../../domain/entity/DistanceCalculator";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import RepositoryFactory from "../factory/RepositoryFactory";
import ZipcodeRepository from "../repository/ZipcodeRepository";

// Use Case - Application Service
export default class SimulateFreight {
	zipcodeRepository: ZipcodeRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.zipcodeRepository = repositoryFactory.createZipcodeRepository();
	}

	async execute (input: Input): Promise<Output> {
		const output = {
			freight: 0
		};
		for (const item of input.items) {
			if (input.from && input.to) {
				const from = await this.zipcodeRepository.get(input.from);
				const to = await this.zipcodeRepository.get(input.to);
				let distance = 1000;
				if (from && to) {
					distance = DistanceCalculator.calculate(from.coord, to.coord);
				}
				const freight = FreightCalculator.calculate(distance, item.volume, item.density);
				output.freight += freight * item.quantity;
			}
		}
		return output;
	}
}

type Input = {
	items: { volume: number, density: number, quantity: number }[], 
	from?: string, 
	to?: string 
}

type Output = {
	freight: number
}