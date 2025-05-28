export type Product = {
    id: number;
    productName: string;
    description: string;
    subDescription: string;
    additionalInformation: string;
    category: string;
    tags: string[];
    discountedPrice: number;
    discountedPercentage: number;
    price: number;
    productImage: string;
    previewImages: string[];
    customerReview: number;
    rate: number;
    colors: string[];
};