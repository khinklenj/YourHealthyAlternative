import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MapPin, Phone, Mail, Globe, Clock, DollarSign, Award, User, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Phone number formatting utility
const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/[^\d]/g, '');
  
  // Limit to 10 digits
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

// Form validation schema
const providerRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  
  // Professional Information
  title: z.string().min(1, "Professional title is required"),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
  yearsExperience: z.string().min(1, "Years of experience is required"),
  licenses: z.string().min(1, "License information is required"),
  
  // Practice Information
  clinicName: z.string().min(1, "Clinic/practice name is required"),
  address: z.string().min(5, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  
  // Services and Pricing
  services: z.array(z.object({
    name: z.string().min(1, "Service name is required"),
    duration: z.string().min(1, "Duration is required"),
    price: z.string().min(1, "Price is required")
  })).min(1, "At least one service is required"),
  
  // Availability
  acceptsInsurance: z.boolean(),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  
  // Bio and additional info
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  
  // Agreements
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
  backgroundCheck: z.boolean().refine(val => val === true, "Background check consent is required")
});

type ProviderRegistrationForm = z.infer<typeof providerRegistrationSchema>;

const specialtyOptions = [
  "Acupuncture", "Naturopathy", "Massage Therapy", "Chiropractic", 
  "Herbal Medicine", "Reiki", "Ayurveda", "Homeopathy", 
  "Reflexology", "Aromatherapy", "Craniosacral Therapy", "Meditation & Mindfulness"
];

const languageOptions = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", 
  "Chinese (Mandarin)", "Chinese (Cantonese)", "Japanese", "Korean", 
  "Arabic", "Hindi", "Russian", "Other"
];

export default function JoinProviderForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [services, setServices] = useState([{ name: "", duration: "", price: "" }]);

  const form = useForm<ProviderRegistrationForm>({
    resolver: zodResolver(providerRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      specialties: [],
      yearsExperience: "",
      licenses: "",
      clinicName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      services: [{ name: "", duration: "", price: "" }],
      acceptsInsurance: false,
      languages: [],
      bio: "",
      termsAccepted: false,
      backgroundCheck: false
    }
  });

  const addSpecialty = (specialty: string) => {
    if (!selectedSpecialties.includes(specialty)) {
      const newSpecialties = [...selectedSpecialties, specialty];
      setSelectedSpecialties(newSpecialties);
      form.setValue("specialties", newSpecialties);
    }
  };

  const removeSpecialty = (specialty: string) => {
    const newSpecialties = selectedSpecialties.filter(s => s !== specialty);
    setSelectedSpecialties(newSpecialties);
    form.setValue("specialties", newSpecialties);
  };

  const addLanguage = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      const newLanguages = [...selectedLanguages, language];
      setSelectedLanguages(newLanguages);
      form.setValue("languages", newLanguages);
    }
  };

  const removeLanguage = (language: string) => {
    const newLanguages = selectedLanguages.filter(l => l !== language);
    setSelectedLanguages(newLanguages);
    form.setValue("languages", newLanguages);
  };

  const addService = () => {
    const newServices = [...services, { name: "", duration: "", price: "" }];
    setServices(newServices);
    form.setValue("services", newServices);
  };

  const removeService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    form.setValue("services", newServices);
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = services.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    );
    setServices(newServices);
    form.setValue("services", newServices);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: ProviderRegistrationForm) => {
    try {
      const response = await fetch('/api/provider-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      console.log("Application submitted successfully:", result);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you within 2-3 business days.",
      });
      
      // Reset form or redirect to success page
      form.reset();
      setCurrentStep(1);
      setSelectedSpecialties([]);
      setSelectedLanguages([]);
      setServices([{ name: "", duration: "", price: "" }]);
      
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-primary-custom text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step}
          </div>
          {step < 4 && (
            <div
              className={`w-16 h-1 ${
                step < currentStep ? "bg-primary-custom" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Tell us about yourself and your professional background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              data-testid="input-firstName"
              {...form.register("firstName")}
            />
            {form.formState.errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              data-testid="input-lastName"
              {...form.register("lastName")}
            />
            {form.formState.errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              data-testid="input-email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(XXX) XXX-XXXX"
              data-testid="input-phone"
              {...form.register("phone")}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                e.target.value = formatted;
                form.setValue("phone", formatted);
              }}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="title">Professional Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Licensed Acupuncturist, Naturopathic Doctor, Certified Massage Therapist"
            data-testid="input-title"
            {...form.register("title")}
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <Label>Specialties *</Label>
          <Select onValueChange={addSpecialty}>
            <SelectTrigger data-testid="select-specialties">
              <SelectValue placeholder="Select your specialties" />
            </SelectTrigger>
            <SelectContent>
              {specialtyOptions.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSpecialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                {specialty}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSpecialty(specialty)}
                />
              </Badge>
            ))}
          </div>
          {form.formState.errors.specialties && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.specialties.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="yearsExperience">Years of Experience *</Label>
            <Select onValueChange={(value) => form.setValue("yearsExperience", value)}>
              <SelectTrigger data-testid="select-experience">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-15">11-15 years</SelectItem>
                <SelectItem value="16-20">16-20 years</SelectItem>
                <SelectItem value="20+">20+ years</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.yearsExperience && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.yearsExperience.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="licenses">License/Certification Numbers *</Label>
            <Input
              id="licenses"
              placeholder="e.g., LAc #12345, NMD #67890"
              data-testid="input-licenses"
              {...form.register("licenses")}
            />
            {form.formState.errors.licenses && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.licenses.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Practice Information
        </CardTitle>
        <CardDescription>
          Tell us about your clinic or practice location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="clinicName">Clinic/Practice Name *</Label>
          <Input
            id="clinicName"
            data-testid="input-clinicName"
            {...form.register("clinicName")}
          />
          {form.formState.errors.clinicName && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.clinicName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            data-testid="input-address"
            {...form.register("address")}
          />
          {form.formState.errors.address && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              data-testid="input-city"
              {...form.register("city")}
            />
            {form.formState.errors.city && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.city.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              data-testid="input-state"
              {...form.register("state")}
            />
            {form.formState.errors.state && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.state.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input
              id="zipCode"
              data-testid="input-zipCode"
              {...form.register("zipCode")}
            />
            {form.formState.errors.zipCode && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.zipCode.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://www.yourpractice.com"
            data-testid="input-website"
            {...form.register("website")}
          />
          {form.formState.errors.website && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.website.message}</p>
          )}
        </div>

        <div>
          <Label>Languages Spoken *</Label>
          <Select onValueChange={addLanguage}>
            <SelectTrigger data-testid="select-languages">
              <SelectValue placeholder="Select languages you speak" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLanguages.map((language) => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeLanguage(language)}
                />
              </Badge>
            ))}
          </div>
          {form.formState.errors.languages && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.languages.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="acceptsInsurance"
            data-testid="checkbox-insurance"
            {...form.register("acceptsInsurance")}
          />
          <Label htmlFor="acceptsInsurance">I accept insurance payments</Label>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Services & Pricing
        </CardTitle>
        <CardDescription>
          List the services you offer and their pricing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Services Offered *</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addService}
              data-testid="button-add-service"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Service
            </Button>
          </div>
          
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Service Name</Label>
                <Input
                  placeholder="e.g., Initial Consultation"
                  value={service.name}
                  onChange={(e) => updateService(index, "name", e.target.value)}
                  data-testid={`input-service-name-${index}`}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  placeholder="e.g., 60 minutes"
                  value={service.duration}
                  onChange={(e) => updateService(index, "duration", e.target.value)}
                  data-testid={`input-service-duration-${index}`}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  placeholder="e.g., $120"
                  value={service.price}
                  onChange={(e) => updateService(index, "price", e.target.value)}
                  data-testid={`input-service-price-${index}`}
                />
              </div>
              <div className="flex items-end">
                {services.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeService(index)}
                    data-testid={`button-remove-service-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {form.formState.errors.services && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.services.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Bio & Final Details
        </CardTitle>
        <CardDescription>
          Tell potential patients about yourself and agree to our terms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="bio">Professional Bio *</Label>
          <Textarea
            id="bio"
            placeholder="Tell patients about your background, approach to treatment, and what makes your practice unique. This will be displayed on your profile."
            className="h-32"
            data-testid="textarea-bio"
            {...form.register("bio")}
          />
          <p className="text-sm text-gray-600 mt-1">Minimum 50 characters</p>
          {form.formState.errors.bio && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.bio.message}</p>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="termsAccepted"
              data-testid="checkbox-terms"
              {...form.register("termsAccepted")}
            />
            <Label htmlFor="termsAccepted" className="text-sm">
              I agree to the <a href="/terms-conditions" target="_blank" className="text-primary-custom underline cursor-pointer">Terms and Conditions</a> and <a href="/privacy-policy" target="_blank" className="text-primary-custom underline cursor-pointer">Privacy Policy</a> *
            </Label>
          </div>
          {form.formState.errors.termsAccepted && (
            <p className="text-sm text-red-600">{form.formState.errors.termsAccepted.message}</p>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="backgroundCheck"
              data-testid="checkbox-background"
              {...form.register("backgroundCheck")}
            />
            <Label htmlFor="backgroundCheck" className="text-sm">
              I consent to a background check and license verification *
            </Label>
          </div>
          {form.formState.errors.backgroundCheck && (
            <p className="text-sm text-red-600">{form.formState.errors.backgroundCheck.message}</p>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We'll review your application within 2-3 business days</li>
            <li>• Background check and license verification process</li>
            <li>• Profile setup and onboarding call</li>
            <li>• Start receiving patient bookings!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Your Healthy Alternative</h1>
        <p className="text-gray-600">Connect with patients seeking natural healing solutions</p>
      </div>

      {renderStepIndicator()}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            data-testid="button-previous"
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              data-testid="button-next"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              data-testid="button-submit"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}