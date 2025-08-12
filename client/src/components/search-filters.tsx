import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchFiltersProps {
  filters: {
    serviceType: string;
    location: string;
    acceptsInsurance: boolean;
    newPatientsWelcome: boolean;
    telehealthAvailable: boolean;
    eveningHours: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // Trigger a re-fetch by updating the filters object reference
    onFiltersChange({ ...filters });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Service Type</Label>
          <Select value={filters.serviceType} onValueChange={(value) => updateFilter("serviceType", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Services</SelectItem>
              <SelectItem value="Acupuncture">Acupuncture</SelectItem>
              <SelectItem value="Naturopathy">Naturopathy</SelectItem>
              <SelectItem value="Massage Therapy">Massage Therapy</SelectItem>
              <SelectItem value="Chiropractic">Chiropractic</SelectItem>
              <SelectItem value="Herbal Medicine">Herbal Medicine</SelectItem>
              <SelectItem value="Reiki">Reiki</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Location</Label>
          <Input 
            type="text" 
            placeholder="City, State or ZIP" 
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Distance</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Within 25 miles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">Within 25 miles</SelectItem>
              <SelectItem value="10">Within 10 miles</SelectItem>
              <SelectItem value="5">Within 5 miles</SelectItem>
              <SelectItem value="1">Within 1 mile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Availability</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="weekend">Weekend only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="acceptsInsurance"
            checked={filters.acceptsInsurance}
            onCheckedChange={(checked) => updateFilter("acceptsInsurance", checked)}
          />
          <Label htmlFor="acceptsInsurance" className="text-sm text-gray-700">Accepts Insurance</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="newPatientsWelcome"
            checked={filters.newPatientsWelcome}
            onCheckedChange={(checked) => updateFilter("newPatientsWelcome", checked)}
          />
          <Label htmlFor="newPatientsWelcome" className="text-sm text-gray-700">New Patients Welcome</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="telehealthAvailable"
            checked={filters.telehealthAvailable}
            onCheckedChange={(checked) => updateFilter("telehealthAvailable", checked)}
          />
          <Label htmlFor="telehealthAvailable" className="text-sm text-gray-700">Telehealth Available</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="eveningHours"
            checked={filters.eveningHours}
            onCheckedChange={(checked) => updateFilter("eveningHours", checked)}
          />
          <Label htmlFor="eveningHours" className="text-sm text-gray-700">Evening Hours</Label>
        </div>
      </div>
      
      <Button onClick={handleSearch} className="bg-primary-custom text-white hover:bg-primary-custom/90">
        <i className="fas fa-search mr-2"></i>Search Providers
      </Button>
    </div>
  );
}
