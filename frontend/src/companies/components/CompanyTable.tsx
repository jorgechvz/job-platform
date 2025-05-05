import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CompanyActions } from "./CompanyActions"; 
import { Company } from "../types/companies.types";
import { Skeleton } from "@/components/ui/skeleton";

interface CompanyTableProps {
  companies?: Company[];
  isLoading: boolean;
  onEdit: (company: Company) => void; // Pasa las funciones necesarias
  onVerifyToggle: (company: Company) => void;
}

export function CompanyTable({
  companies = [],
  isLoading,
  onEdit,
  onVerifyToggle,
}: CompanyTableProps) {
  const renderSkeleton = () =>
    [...Array(5)].map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[80px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[100px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[100px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[80px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-[60px] rounded-full" />
        </TableCell>
        {/* <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell> */}
        <TableCell className="text-right">
          <Skeleton className="h-8 w-8 rounded-md" />
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Empresa</TableHead>
            <TableHead>Industria</TableHead>
            <TableHead>Ubicación</TableHead>
            {/* <TableHead>Tamaño</TableHead> */}
            <TableHead>Email</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead>Verificada</TableHead>
            {/* <TableHead>Ofertas</TableHead> */}
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeleton()
          ) : companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                {" "}
                {/* Ajustado colSpan */}
                No se encontraron empresas.
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          company.logoUrl ||
                          `/placeholder.svg?text=${company.name.charAt(0)}`
                        }
                        alt={company.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {company.contactEmail || "-"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{company.industry || "-"}</TableCell>
                <TableCell>{company.location || "-"}</TableCell>
                {/* <TableCell>{company.size || "-"} empleados</TableCell> */}
                <TableCell>{company.contactEmail || "-"}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {company.isVerified ? (
                    <Badge
                      variant="outline"
                      className="text-blue-500 border-blue-500"
                    >
                      {" "}
                      Sí
                    </Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </TableCell>
                {/* <TableCell>{company.jobsCount || 0}</TableCell> */}
                <TableCell className="text-right">
                  <CompanyActions
                    company={company}
                    onEdit={onEdit}
                    onVerifyToggle={onVerifyToggle}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
