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

import { toast } from "sonner"; 
import useDebounce from "@/common/hooks/use-debounce";
import {
  JobOffer,
  JobOfferQueryParams,
  JobOfferStatus,
  JobType,
  UpdateJobOfferDto,
} from "@/job-offer/types/job-offer.types";
import { JobOfferFilter } from "@/job-offer/components/JobOffersFilters";
import useJobOffer from "@/job-offer/hooks/use-job-offer";
// import JobOffersStatsCard from "@/job-offer/components/JobOffersStatsCard";
import JobOffersTable from "@/job-offer/components/JobOffersTable";
import { JobOffersPagination } from "@/job-offer/components/JobOffersPagination";

export default function JobOffersPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>();
  const [typeFilter, setTypeFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  const itemsPerPage = 10;
  const debounceDelay = 500; // 500ms de debounce para la búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  // Construye los parámetros para la query
  const queryParams: JobOfferQueryParams = useMemo(() => {
    const params: JobOfferQueryParams = {
      skip: page * itemsPerPage,
      take: itemsPerPage,
    };
    if (debouncedSearchTerm) params.title = debouncedSearchTerm;
    if (companyFilter) params.location = companyFilter;
    if (typeFilter && typeFilter !== "todos")
      params.jobType = typeFilter as JobType;
    if (statusFilter && statusFilter !== "todos")
      params.status = statusFilter as JobOfferStatus;
    return params;
  }, [
    page,
    debouncedSearchTerm,
    companyFilter,
    typeFilter,
    statusFilter,
    itemsPerPage,
  ]);

  const { getJobOffers, updateJobOffer } = useJobOffer(queryParams);

  const allJobOffers = getJobOffers.data?.data || [];

  const handleEditJobOffer = (jobOffer: JobOffer) => {
    alert(`Editar ${jobOffer.title} no implementado`);
  };

  const handleFeaturedToggle = (jobOffer: JobOffer) => {
    const updatedData: UpdateJobOfferDto = { isFeatured: !jobOffer.isFeatured };
    toast.promise(
      updateJobOffer.mutateAsync({ id: jobOffer.id, data: updatedData }),
      {
        loading: `${
          jobOffer.isFeatured ? "Quitando verificación" : "Verificando"
        } a ${jobOffer.title}...`,
        success: `Estado de verificación de ${jobOffer.title} actualizado.`,
        error: `Error al actualizar verificación de ${jobOffer.title}.`,
      }
    );
  };

  const handleAddJobOffer = () => {
    console.log("Añadir nueva empresa");
    alert("Añadir nueva empresa no implementado");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Ofertas de Trabajo
          </h2>
          <p className="text-muted-foreground">
            Gestiona las ofertas de trabajo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddJobOffer}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Empresa
          </Button>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      {/* <JobOffersStatsCard
        isLoading={getAllJobOffersForAdmin.isLoading}
        totalCount={getAllJobOffersForAdmin.data?.count}
        
      /> */}

      {/* Card Principal con Filtros y Tabla */}
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader>
          <CardTitle>Gestión de Empresas</CardTitle>
          <CardDescription>Administra las empresas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <JobOfferFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            companyFilter={companyFilter || ""}
            setCompanyFilter={setCompanyFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            jobOffersData={allJobOffers || []}
          />
          {/* Tabla de Empresas */}
          <div className="mt-4">
            <JobOffersTable
              jobOffers={allJobOffers}
              isLoading={getJobOffers.isLoading || getJobOffers.isFetching}
              onEdit={handleEditJobOffer}
              onVerifyToggle={handleFeaturedToggle}
            />
          </div>

          {/* Paginación */}
          <JobOffersPagination
            currentPage={page}
            totalCount={allJobOffers?.length ?? 0}
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
