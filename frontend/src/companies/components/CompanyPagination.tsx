import { Button } from "@/components/ui/button";

interface CompanyPaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function CompanyPagination({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}: CompanyPaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalCount === 0) return null; // No mostrar paginación si no hay datos

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Página <span className="font-medium">{currentPage + 1}</span> de{" "}
        <span className="font-medium">{totalPages}</span> ({totalCount}{" "}
        {totalCount === 1 ? "empresa" : "empresas"})
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!canGoNext}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
