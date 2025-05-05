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
import { JobOffer, JobType } from "../types/job-offer.types";

interface JobOffersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  companyFilter: string;
  setCompanyFilter: (company: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  jobOffersData?: JobOffer[];
}

export function JobOfferFilter({
  searchTerm,
  setSearchTerm,
  companyFilter,
  setCompanyFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  jobOffersData = [],
}: JobOffersFiltersProps) {
  const companies = [
    ...new Set(
      jobOffersData.map((jobOffer) => jobOffer.company.name).filter(Boolean)
    ),
  ] as string[];
  const jobTypeLabels = {
    FULL_TIME: "Tiempo completo",
    PART_TIME: "Medio tiempo",
    INTERNSHIP: "Prácticas",
    FREELANCE: "Freelance",
  };

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
              <p className="text-sm font-medium mb-2">Empresas</p>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company || ""}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-2 w-full">
              <p className="text-sm font-medium mb-2">Tipo de trabajo</p>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {Object.entries(jobTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key as JobType}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-2 w-full">
              <p className="text-sm font-medium mb-2">Estado</p>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="ACTIVE">Activo</SelectItem>
                  <SelectItem value="DRAFT">Borrador</SelectItem>
                  <SelectItem value="PAUSED">Pausado</SelectItem>
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
