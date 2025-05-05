import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import useCompany from "../hooks/use-company";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Company } from "../types/companies.types";

interface CompanyActionsProps {
  company: Company;
  onEdit: (company: Company) => void;
  onVerifyToggle: (company: Company) => void;
}

export function CompanyActions({
  company,
  onEdit,
  onVerifyToggle,
}: CompanyActionsProps) {
  const { deleteCompany } = useCompany();

  const handleDelete = () => {
    toast.promise(deleteCompany.mutateAsync(company.id), {
      loading: `Eliminando ${company.name}...`,
      success: `${company.name} eliminado correctamente.`,
      error: `Error al eliminar ${company.name}.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* Ajusta la ruta según tu estructura de rutas */}
          <Link
            to={`/admin/empresas/${company.id}`}
            className="flex w-full cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver detalles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onEdit(company)}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editar empresa
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onVerifyToggle(company)}
          className="cursor-pointer"
        >
          {/* Icono podría cambiar según el estado */}
          {company.isVerified ? "Quitar verificación" : "Verificar empresa"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive cursor-pointer"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
