import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface ProductDescriptionProps {
  product: {
    description: string;
  };
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <Tabs defaultValue="description" className="max-w-full">
      <TabsList className="flex flex-wrap justify-center md:grid md:grid-cols-2">
        <TabsTrigger value="account" className="w-full md:w-auto">Ürün Açıklama</TabsTrigger>
        <TabsTrigger value="password" className="w-full md:w-auto">Değerlendirmeler</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Ürün Açıklama</CardTitle>
            <CardDescription>
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-4">
            {/* Bu kısımdaki inputlar gereksiz görünüyor, kaldırabilirsiniz */}
          </CardContent>
          <CardFooter className="md:py-4 py-2">
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Değerlendirmeler</CardTitle>
            <CardDescription>
              {/* Değerlendirmeler için açıklama ekleyin */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-4">
            {/* Değerlendirmeler için içerik ekleyin */}
          </CardContent>
          <CardFooter className="md:py-4 py-2">
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default ProductDescription;
