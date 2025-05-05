import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JobOffer } from "../types/job-offer.types";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import JobOffersActions from "./JobOffersActions";

interface JobOffersTableProps {
  jobOffers?: JobOffer[];
  isLoading: boolean;
  onEdit: (jobOffer: JobOffer) => void;
  onVerifyToggle: (jobOffer: JobOffer) => void;
}

const JobOffersTable = ({
  jobOffers = [],
  isLoading,
  onEdit,
  onVerifyToggle,
}: JobOffersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Oferta</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Aplicaciones</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            TableSkeleton()
          ) : jobOffers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                {" "}
                No se encontraron ofertas.
              </TableCell>
            </TableRow>
          ) : (
            jobOffers.map((jobOffer) => (
              <TableRow key={jobOffer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">
                        {jobOffer.title} {jobOffer.isFeatured && "⭐"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {jobOffer.salaryMin} - {jobOffer.salaryMax}{" "}
                        {jobOffer.salaryCurrency}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{jobOffer.company.name || "-"}</TableCell>
                <TableCell>{jobOffer.location || "-"}</TableCell>
                <TableCell>{jobOffer.jobType || "-"}</TableCell>
                <TableCell>
                  {new Date(jobOffer.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      jobOffer.status === "ACTIVE"
                        ? "default"
                        : jobOffer.status === "DRAFT"
                        ? "secondary"
                        : jobOffer.status === "PAUSED"
                        ? "destructive"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {jobOffer.status}
                  </Badge>
                </TableCell>
                <TableCell>{jobOffer._count?.applications}</TableCell>
                <TableCell className="text-right">
                  <JobOffersActions
                    jobOffer={jobOffer}
                    onEdit={onEdit}
                    onFeaturedToggle={onVerifyToggle}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobOffersTable;
