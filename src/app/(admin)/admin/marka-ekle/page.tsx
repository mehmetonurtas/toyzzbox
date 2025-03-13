
import prisma from '@/lib/prisma';
import BrandForm from './BrandForm';


async function getMedia() {
    const media = await prisma.media.findMany();
    return media;
}

export default async function Page() {

    const media = await getMedia(); // Media verilerini al

    return (
        <BrandForm media={media} /> // ProductForm kullan ve media verisini ilet
    );
}
