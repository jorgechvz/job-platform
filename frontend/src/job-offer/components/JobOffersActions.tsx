import { toast } from "sonner";
import useJobOffer from "../hooks/use-job-offer";
import { JobOffer } from "../types/job-offer.types";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface JobOffersActionsProps {
  jobOffer: JobOffer;
  onEdit: (jobOffer: JobOffer) => void;
  onFeaturedToggle: (jobOffer: JobOffer) => void;
}

const JobOffersActions = ({
  jobOffer,
  onEdit,
  onFeaturedToggle,
}: JobOffersActionsProps) => {
  const { deleteJobOffer } = useJobOffer();

  const handleDelete = () => {
    toast.promise(deleteJobOffer.mutateAsync(jobOffer.id), {
      loading: `Eliminando ${jobOffer.title}...`,
      success: `${jobOffer.title} eliminado correctamente.`,
      error: `Error al eliminar ${jobOffer.title}.`,
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
          <Link
            to={`/admin/jobOffer/${jobOffer.id}`}
            className="flex w-full cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver detalles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onEdit(jobOffer)}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editar oferta
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onFeaturedToggle(jobOffer)}
          className="cursor-pointer"
        >
          {jobOffer.isFeatured ? "Quitar Destacado" : "Destacar oferta"}
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
};
export default JobOffersActions;
