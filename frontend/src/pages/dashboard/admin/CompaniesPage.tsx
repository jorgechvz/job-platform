import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  CompanyQueryParams,
  Company,
  UpdateCompanyDto,
} from "../../../companies/types/companies.types"; // Importa tipos
import { toast } from "sonner"; // Para notificaciones
import useCompany from "@/companies/hooks/use-company";
import { CompanyStatsCards } from "@/companies/components/CompanyStatsCard";
import { CompanyTable } from "@/companies/components/CompanyTable";
import { CompanyFilters } from "@/companies/components/CompanyFilters";
import { CompanyPagination } from "@/companies/components/CompanyPagination";
import useDebounce from "@/common/hooks/use-debounce";

// Componente principal de la página de empresas
export default function CompaniesPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("todas");
  const [statusFilter, setStatusFilter] = useState("todos");

  const itemsPerPage = 10;
  const debounceDelay = 500; // 500ms de debounce para la búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  // Construye los parámetros para la query
  const queryParams: CompanyQueryParams = useMemo(() => {
    const params: CompanyQueryParams = {
      skip: page * itemsPerPage,
      take: itemsPerPage,
    };
    if (debouncedSearchTerm) params.name = debouncedSearchTerm;
    if (locationFilter !== "todas") params.location = locationFilter;
    return params;
  }, [page, debouncedSearchTerm, locationFilter, itemsPerPage]);

  // Usa el hook para obtener datos y mutaciones
  const { getAllCompanies, updateCompany } = useCompany(queryParams);
  console.log("All companies data:", getAllCompanies.data);

  const companiesArray = getAllCompanies.data?.data || [];
  console.log("Companies array:", companiesArray);

  const handleEditCompany = (company: Company) => {
    console.log("Editar:", company);
    alert(`Editar ${company.name} no implementado`);
  };

  const handleVerifyToggle = (company: Company) => {
    // Llama a la mutación de update para cambiar el estado 'isVerified'
    const updatedData: UpdateCompanyDto = { isVerified: !company.isVerified };
    toast.promise(
      updateCompany.mutateAsync({ id: company.id, data: updatedData }),
      {
        loading: `${
          company.isVerified ? "Quitando verificación" : "Verificando"
        } a ${company.name}...`,
        success: `Estado de verificación de ${company.name} actualizado.`,
        error: `Error al actualizar verificación de ${company.name}.`,
      }
    );
  };

  const handleAddCompany = () => {
    // Lógica para abrir un modal o navegar a una página de creación
    console.log("Añadir nueva empresa");
    alert("Añadir nueva empresa no implementado");
    // Ejemplo: setIsModalOpen(true); setEditingCompany(null);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Empresas</h2>
          <p className="text-muted-foreground">
            Gestiona las empresas registradas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddCompany}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Empresa
          </Button>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <CompanyStatsCards
        companiesData={getAllCompanies.data?.data}
        isLoading={getAllCompanies.isLoading}
        totalCount={getAllCompanies.data?.count}
      />

      {/* Card Principal con Filtros y Tabla */}
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader>
          <CardTitle>Gestión de Empresas</CardTitle>
          <CardDescription>Administra las empresas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <CompanyFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            companiesData={getAllCompanies.data?.data || []}
          />
          {/* Tabla de Empresas */}
          <div className="mt-4">
            <CompanyTable
              companies={getAllCompanies.data?.data}
              isLoading={
                getAllCompanies.isLoading || getAllCompanies.isFetching
              }
              onEdit={handleEditCompany}
              onVerifyToggle={handleVerifyToggle}
            />
          </div>

          {/* Paginación */}
          <CompanyPagination
            currentPage={page}
            totalCount={getAllCompanies.data?.data.length ?? 0}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>

      {/* Aquí irían Modales para Crear/Editar Empresa si los usas */}
      {/* <CreateEditCompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} company={editingCompany} /> */}
    </div>
  );
}
