import { Award, Coins } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';

type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  image: ImagePlaceholder;
};

const rewards: Reward[] = [
  {
    id: '1',
    title: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with this stylish, reusable bottle.',
    points: 1500,
    image: PlaceHolderImages.find(img => img.id === 'reward-water-bottle')!,
  },
  {
    id: '2',
    title: 'Reusable Shopping Bag',
    description: 'A durable and foldable bag for your groceries.',
    points: 800,
    image: PlaceHolderImages.find(img => img.id === 'reward-shopping-bag')!,
  },
  {
    id: '3',
    title: '$10 Gift Card',
    description: 'A gift card for your favorite online store.',
    points: 5000,
    image: PlaceHolderImages.find(img => img.id === 'reward-gift-card')!,
  },
  {
    id: '4',
    title: 'Potted Succulent',
    description: 'Brighten up your space with a low-maintenance plant.',
    points: 2000,
    image: PlaceHolderImages.find(img => img.id === 'reward-plant')!,
  },
  {
    id: '5',
    title: 'Recycled Paper Notebook',
    description: 'Jot down your thoughts in this eco-conscious notebook.',
    points: 1200,
    image: PlaceHolderImages.find(img => img.id === 'reward-notebook')!,
  },
  {
    id: '6',
    title: 'Reusable Coffee Cup',
    description: 'Enjoy your coffee on the go, guilt-free.',
    points: 1800,
    image: PlaceHolderImages.find(img => img.id === 'reward-coffee-cup')!,
  },
];

export default function RewardsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Card className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Award className="h-10 w-10" />
            <div>
              <CardTitle className="text-2xl">Your Rewards</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Redeem your points for amazing eco-friendly rewards.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Your current balance</p>
          <div className="flex items-center">
            <Coins className="h-8 w-8 mr-2 text-accent" />
            <p className="text-4xl font-bold">8,520 Points</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rewards.map((reward) => (
          <Card key={reward.id} className="flex flex-col overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={reward.image.imageUrl}
                alt={reward.title}
                data-ai-hint={reward.image.imageHint}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader className="flex-1">
              <CardTitle>{reward.title}</CardTitle>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-4">
               <div className="flex items-center font-semibold text-primary">
                  <Coins className="h-5 w-5 mr-2 text-accent" />
                  <span>{reward.points.toLocaleString()} Points</span>
                </div>
              <Button className="w-full">Redeem</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
