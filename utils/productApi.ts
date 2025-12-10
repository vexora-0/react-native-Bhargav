const PRODUCT_API_BASE = "http://localhost:5000";

export type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  description?: string;
  stock?: number;
};

export const getProducts = async (category?: string) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`${PRODUCT_API_BASE}/products${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return (await res.json()) as Product[];
};

export { PRODUCT_API_BASE };

