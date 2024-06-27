import { Image } from "./image";
import { Lessor } from "./lessor";

export type RentType = 'HOUSE' | 'APARTMENT';

export interface Apartment {
    address: string;
    isPetFriendly: boolean;
    type: RentType
    price: number;
    isSharedRoom: boolean;
    isSharedBathroom: boolean;
    isSharedKitchen: boolean;
    id: string
    lat: number
    lng: number
    rate: number
    images: Image[]
    shortDescription: string
    longDescription: string
    lessor: Lessor,
    rooms: number
    universities: { lat: number, lng: number, id: string }[]
}