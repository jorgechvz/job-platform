import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Filter, Search } from "lucide-react";
import { Company } from "../types/companies.types";

interface CompanyFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  locationFilter: string;
  setLocationFilter: (industry: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  companiesData?: Company[];
}

export function CompanyFilters({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  companiesData = [],
}: CompanyFiltersProps) {
  // TODO: Usar un endpoitnt especifico para obtener los locations

  const locations = [
    ...new Set(
      companiesData.map((company) => company.location).filter(Boolean)
    ),
  ] as string[];
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre, email..."
            className="pl-8 w-full md:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 w-full">
              <p className="text-sm font-medium mb-2">Ubicaciones</p>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar industria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="icon"
          onClick={() => alert("Exportar no implementado")}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
