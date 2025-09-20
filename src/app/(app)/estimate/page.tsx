'use client';

import { useState } from 'react';
import {
  estimateScrapValueFromPhoto,
  type EstimateScrapValueOutput,
} from '@/ai/flows/estimate-scrap-value-from-photo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import {
  Loader2,
  Upload,
  Camera,
  Package,
  Wrench,
  DollarSign,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';

type Step = 'form' | 'loading' | 'result' | 'schedule' | 'success';

export default function EstimatePage() {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('form');
  const [description, setDescription] = useState('');
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [estimation, setEstimation] = useState<EstimateScrapValueOutput | null>(
    null
  );
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setPhotoDataUri(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoDataUri || !description) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a photo and a description.',
        variant: 'destructive',
      });
      return;
    }

    setStep('loading');

    try {
      const result = await estimateScrapValueFromPhoto({
        photoDataUri,
        description,
      });
      setEstimation(result);
      setStep('result');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Estimation Failed',
        description: 'Could not get an estimate. Please try again.',
        variant: 'destructive',
      });
      setStep('form');
    }
  };
  
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupDate || !pickupTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select a pickup date and time.',
        variant: 'destructive',
      });
      return;
    }
    setStep('loading');
    setTimeout(() => {
        setStep('success');
    }, 1500);
  }

  const handleReset = () => {
    setStep('form');
    setDescription('');
    setPhotoDataUri(null);
    setImagePreview(null);
    setEstimation(null);
    setPickupDate(new Date());
    setPickupTime('');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Card>
              <CardHeader>
                <CardTitle>Get an Instant Estimate</CardTitle>
                <CardDescription>
                  Upload a photo and description of your scrap item to get an
                  AI-powered value estimation.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo of Item</Label>
                    <div className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground relative overflow-hidden">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Scrap item preview"
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : (
                        <div className="text-center space-y-1">
                          <Camera className="mx-auto h-12 w-12" />
                          <p>Click to upload or drag and drop</p>
                        </div>
                      )}
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="e.g., Old copper pipes, approximately 10 feet long"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Get Estimate
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        )}

        {(step === 'loading') && (
          <motion.div
            key="loading"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="mt-4 text-2xl font-semibold">Analyzing...</h2>
            <p className="text-muted-foreground">
              Our AI is estimating the value of your item.
            </p>
          </motion.div>
        )}

        {step === 'result' && estimation && (
          <motion.div
            key="result"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Card>
              <CardHeader>
                <CardTitle>Estimation Complete</CardTitle>
                <CardDescription>
                  Here is our estimated value for your item.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {imagePreview && (
                  <div className="w-full h-64 rounded-lg overflow-hidden relative">
                    <Image
                      src={imagePreview}
                      alt="Scrap item"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated Value</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-primary">${estimation.estimatedValue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Material</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{estimation.materialComposition}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Condition</CardTitle>
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{estimation.condition}</p>
                        </CardContent>
                    </Card>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setStep('schedule')} className="w-full">
                  Schedule Pickup
                </Button>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  Start New Estimate
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
        
        {step === 'schedule' && (
          <motion.div
            key="schedule"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Card>
                <CardHeader>
                    <CardTitle>Schedule a Pickup</CardTitle>
                    <CardDescription>Choose a convenient date and time for us to collect your items.</CardDescription>
                </CardHeader>
                <form onSubmit={handleScheduleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 space-y-2">
                            <Label>Date</Label>
                            <Calendar
                                mode="single"
                                selected={pickupDate}
                                onSelect={setPickupDate}
                                className="rounded-md border"
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                          </div>
                           <div className="flex-1 space-y-2">
                               <Label htmlFor="time">Time Slot</Label>
                                <Select onValueChange={setPickupTime} value={pickupTime}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                                    <SelectItem value="11-13">11:00 AM - 1:00 PM</SelectItem>
                                    <SelectItem value="13-15">1:00 PM - 3:00 PM</SelectItem>
                                    <SelectItem value="15-17">3:00 PM - 5:00 PM</SelectItem>
                                </SelectContent>
                                </Select>
                           </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2">
                        <Button type="submit" className="w-full">Confirm Pickup</Button>
                        <Button variant="ghost" onClick={() => setStep('result')} className="w-full">Back to Estimate</Button>
                    </CardFooter>
                </form>
            </Card>
          </motion.div>
        )}

        {step === 'success' && (
             <motion.div
                key="success"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="flex flex-col items-center justify-center min-h-[50vh] text-center"
             >
                <CheckCircle className="h-24 w-24 text-primary" />
                <h2 className="mt-4 text-3xl font-bold">Pickup Scheduled!</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                    Your pickup is confirmed for {pickupDate?.toLocaleDateString()} between {pickupTime.replace('-',':00 ')+':00'}. Thanks for helping the planet!
                </p>
                <Button onClick={handleReset} className="mt-8">
                    Schedule Another Pickup
                </Button>
             </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
