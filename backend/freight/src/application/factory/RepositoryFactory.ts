import ZipcodeRepository from "../repository/ZipcodeRepository";

export default interface RepositoryFactory {
	createZipcodeRepository(): ZipcodeRepository;
}
