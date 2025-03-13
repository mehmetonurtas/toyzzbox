
import prisma from '@/lib/prisma';
import ProductForm from './ProductForm';

async function getCategories() {
    const categories = await prisma.category.findMany();
    return categories;
}

async function getBrands() {
    const brands = await prisma.brand.findMany(); // Değişken adını düzelt
    return brands;
}

async function getMedia() {
    const media = await prisma.media.findMany();
    return media;
}


async function getAttributes() {
    const attributes = await prisma.attribute.findMany();
    return attributes;
}

export default async function Page() {
    const categories = await getCategories();
    const brands = await getBrands();
    const media = await getMedia(); // Media verilerini al
    const attributes = await getAttributes();
    return (
        <ProductForm categories={categories} brands={brands} media={media} attributes={attributes}/> // ProductForm kullan ve media verisini ilet
    );
}
