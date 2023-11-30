import { Distributor } from "../interfaces/distributor.interface";
import { DistributorModel } from '../models/distributor.model';

export async function findAllDistributor(): Promise<Distributor[]> {
    try {
        return await DistributorModel.findAll();
    } catch (error) {
        console.error('Error fetching Distributor:', error);
        throw new Error('Unable to fetch Distributor. Please try again later.');
    }
}