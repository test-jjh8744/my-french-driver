import { useState } from "react";
import haversine from 'haversine-distance';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { BookingSummary } from "./BookingSummary";
import { 
  Calendar, 
  MapPin, 
  Users,
  Car,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Star,
  CreditCard,
  Shield
} from "lucide-react";

export function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [distance, setDistance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const handleInputChange = async (value, field) => {
    if (field === 'pickup') {
      setPickupLocation(value);
    } else {
      setDropoffLocation(value);
    }

    if (value.length > 2) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5`);
        const data = await response.json();
        // Filter results to include more relevant location types
        const filteredData = data.filter((item) =>
          item.display_name &&
          (item.class === 'place' || item.type === 'city' || item.type === 'administrative' || item.class === 'highway')
        );
        setSuggestions(filteredData);
        setActiveField(field);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setActiveField(null);
    }
  };

  const calculatePrice = () => {
    if (pickupLocation && dropoffLocation) {
      const pickupCoords = { latitude: 48.8566, longitude: 2.3522 }; // Dummy coords for Paris
      const dropoffCoords = { latitude: 48.8606, longitude: 2.3267 }; // Dummy coords for Louvre
      const distanceInMeters = haversine(pickupCoords, dropoffCoords);
      const distanceInKm = distanceInMeters / 1000;
      const pricePerKm = 2.5;
      const total = distanceInKm * pricePerKm;

      setDistance(distanceInKm);
      setTotalPrice(total);
    }
  };

  const services = [
    {
      id: 'airport',
      name: 'Airport Transfer',
      description: 'Professional transfers to/from Paris airports',
      icon: <MapPin className="w-6 h-6" />,
      price: 'From €70'
    },
    {
      id: 'hourly',
      name: 'Hourly Service',
      description: 'Flexible hourly bookings with chauffeur',
      icon: <Clock className="w-6 h-6" />,
      price: 'From €80/hour'
    },
    {
      id: 'tour',
      name: 'City Tour',
      description: 'Guided tours of Paris and surroundings',
      icon: <Star className="w-6 h-6" />,
      price: 'From €500'
    },
    {
      id: 'event',
      name: 'Special Event',
      description: 'Wedding, gala, and celebration transport',
      icon: <Calendar className="w-6 h-6" />,
      price: 'From €250'
    }
  ];

  const vehicles = [
    {
      id: 'business',
      name: 'Mercedes E-Class',
      category: 'Business Class',
      passengers: '1-3',
      luggage: '3 bags',
      price: 'From €80/hour',
      features: ['WiFi', 'Climate Control', 'Premium Sound']
    },
    {
      id: 'first',
      name: 'Mercedes S-Class',
      category: 'First Class',
      passengers: '1-3',
      luggage: '4 bags',
      price: 'From €120/hour',
      features: ['Massage Seats', 'Champagne Bar', 'Privacy Glass']
    },
    {
      id: 'group',
      name: 'Mercedes V-Class',
      category: 'Group Travel',
      passengers: '1-7',
      luggage: '8+ bags',
      price: 'From €140/hour',
      features: ['Conference Table', 'Individual Seats', 'Extra Space']
    }
  ];

  const bookingSteps = [
    { step: 1, title: 'Service Type', description: 'Choose your service' },
    { step: 2, title: 'Vehicle Selection', description: 'Select your vehicle' },
    { step: 3, title: 'Trip Details', description: 'Enter trip information' },
    { step: 4, title: 'Personal Details', description: 'Contact information' },
    { step: 5, title: 'Confirmation', description: 'Review and confirm' },
    { step: 6, title: 'Summary', description: 'Booking Summary' }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-3xl mb-6 text-center">Select Your Service Type</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedService === service.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-primary mb-4">{service.icon}</div>
                    <h3 className="text-xl mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <div className="text-lg text-primary">{service.price}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-3xl mb-6 text-center">Choose Your Vehicle</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card 
                  key={vehicle.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedVehicle === vehicle.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <CardContent className="p-6 text-center">
                    <Car className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <Badge variant="outline" className="mb-3">{vehicle.category}</Badge>
                    <h3 className="text-xl mb-2">{vehicle.name}</h3>
                    <div className="text-2xl text-primary mb-4">{vehicle.price}</div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.passengers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{vehicle.luggage}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-3xl mb-6 text-center">Trip Details</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm mb-2">Pickup Location</label>
                    <Input 
                      placeholder="Enter pickup address" 
                      value={pickupLocation}
                      onChange={(e) => handleInputChange(e.target.value, 'pickup')}
                      onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                    />
                    {suggestions.length > 0 && activeField === 'pickup' && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                        {suggestions.map((suggestion) => {
                          const parts = suggestion.display_name.split(', ');
                          const mainLocation = parts[0];
                          const region = parts.slice(1, 3).join(', ');
                          
                          return (
                            <li
                              key={suggestion.place_id}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setPickupLocation(suggestion.display_name);
                                setSuggestions([]);
                                setActiveField(null);
                                calculatePrice();
                              }}
                            >
                              <div className="font-medium">{mainLocation}</div>
                              <div className="text-sm text-gray-500">{region}</div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm mb-2">Destination</label>
                    <Input 
                      placeholder="Enter destination" 
                      value={dropoffLocation}
                      onChange={(e) => handleInputChange(e.target.value, 'dropoff')}
                      onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                    />
                    {suggestions.length > 0 && activeField === 'dropoff' && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                        {suggestions.map((suggestion) => {
                          const parts = suggestion.display_name.split(', ');
                          const mainLocation = parts[0];
                          const region = parts.slice(1, 3).join(', ');
                          
                          return (
                            <li
                              key={suggestion.place_id}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setDropoffLocation(suggestion.display_name);
                                setSuggestions([]);
                                setActiveField(null);
                                calculatePrice();
                              }}
                            >
                              <div className="font-medium">{mainLocation}</div>
                              <div className="text-sm text-gray-500">{region}</div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Pickup Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Pickup Time</label>
                    <Input type="time" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Number of Passengers</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4+ Passengers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Return Journey</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option>One Way</option>
                      <option>Round Trip</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm mb-2">Special Requirements</label>
                  <Textarea 
                    placeholder="Flight details, special requests, or additional information..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-3xl mb-6 text-center">Contact Information</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">First Name</label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Last Name</label>
                    <Input placeholder="Enter last name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone Number</label>
                    <Input placeholder="+33 1 XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Company (Optional)</label>
                    <Input placeholder="Company name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Preferred Contact Method</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option>Email</option>
                      <option>Phone</option>
                      <option>SMS</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm mb-2">Additional Notes</label>
                  <Textarea 
                    placeholder="Any additional information or special requests..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-3xl mb-6 text-center">Booking Confirmation</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Service Type:</span>
                      <span className="text-primary">Airport Transfer</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="text-primary">Mercedes E-Class</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span>March 15, 2025 - 14:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup:</span>
                      <span>CDG Airport Terminal 2E</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span>Hotel Plaza Athénée</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passengers:</span>
                      <span>2 Passengers</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium">
                      <span>Total Price:</span>
                      <span className="text-primary text-lg">€95</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Payment & Confirmation</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Fixed price guarantee</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Flight monitoring included</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Meet & greet service</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Free cancellation 24h before</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm">Secure Payment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your payment information is protected with bank-level encryption.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 6:
        return <BookingSummary />;

      default:
        return null;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Book Your Ride</Badge>
            <h1 className="text-4xl md:text-5xl mb-6">
              Reserve Your Premium Transportation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Simple booking process for luxury chauffeur services. 
              Professional, reliable, and comfortable transportation at your service.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 overflow-x-auto">
            {bookingSteps.map((step) => (
              <div key={step.step} className="flex items-center space-x-2 min-w-fit">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep >= step.step 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.step
                  )}
                </div>
                <div className="text-sm">
                  <div className={currentStep >= step.step ? 'text-primary' : 'text-muted-foreground'}>
                    {step.title}
                  </div>
                </div>
                {step.step < bookingSteps.length && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 6 ? (
                <Button 
                  onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
                  disabled={
                    (currentStep === 1 && !selectedService) || 
                    (currentStep === 2 && !selectedVehicle)
                  }
                >
                  {currentStep === 5 ? 'Review and Confirm' : 'Next Step'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl mb-4">Need Help with Your Booking?</h2>
            <p className="text-muted-foreground mb-6">
              Our booking specialists are available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email booking@myfrenchdriver.com
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}