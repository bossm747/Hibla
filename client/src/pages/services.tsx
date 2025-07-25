import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star, Scissors } from "lucide-react";
import ServiceModal from "@/components/modals/service-modal";

const categories = [
  { id: "all", name: "All Services", count: 0 },
  { id: "massage", name: "Massage", count: 0 },
  { id: "facial", name: "Facial", count: 0 },
  { id: "body-treatment", name: "Body Treatment", count: 0 },
  { id: "hair", name: "Hair", count: 0 },
  { id: "nail-care", name: "Nail Care", count: 0 },
];

export default function Services() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded w-64"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredServices = services?.filter((service: any) => 
    selectedCategory === "all" || service.category === selectedCategory
  ) || [];

  // Update category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === "all" ? services?.length || 0 : services?.filter((s: any) => s.category === cat.id).length || 0
  }));

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Services</h2>
            <p className="mt-2 text-sm text-slate-600">Manage spa services and pricing</p>
          </div>
          <Button 
            className="mt-4 sm:mt-0"
            onClick={() => setServiceModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoriesWithCounts.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-sm"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Scissors className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No services found</h3>
              <p className="text-slate-500 mb-6">
                {services?.length === 0 
                  ? "Get started by adding your first service"
                  : "No services found in this category"
                }
              </p>
              <Button onClick={() => setServiceModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service: any) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Scissors className="h-16 w-16 text-primary/40" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                    <span className="text-lg font-bold text-primary">${service.price}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                    <span>{service.duration} minutes</span>
                    <Badge variant="secondary">{service.category.replace('-', ' ')}</Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {service.description || "Professional spa service designed to rejuvenate and refresh."}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-600">4.8 (24 reviews)</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ServiceModal 
        open={serviceModalOpen} 
        onOpenChange={setServiceModalOpen} 
      />
    </>
  );
}
