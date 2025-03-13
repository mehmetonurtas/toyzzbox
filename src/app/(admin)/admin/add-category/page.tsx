
import prisma from '@/lib/prisma';
import CategoryForm from './CategoryForm';


async function getCategories() {
    const categories = await prisma.category.findMany();
    return categories; // categories'i döndürüyoruz
}

async function getMedia() {
    const media = await prisma.media.findMany();
    return media;
}

export default async function Page() {
    const categories = await getCategories(); // await ile getCategories çağrısı
    const media = await getMedia(); // Media verilerini al

    return <CategoryForm categories={categories} media={media}/>;
}


