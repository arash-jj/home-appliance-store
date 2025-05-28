import fs from "fs"
import path from "path"

const dbPath = path.join(process.cwd(),"data", "db.json")

export async function getPaginatedProducts(page:number, perPage: number) {
    const file = fs.readFileSync(dbPath, "utf-8");
    const products = JSON.parse(file);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return {
        products: products.slice(start, end),
        total: products.length,
    };
}