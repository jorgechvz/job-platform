import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company } from "../types/companies.types";

interface CompanyStatsCardsProps {
  companiesData?: Company[]; 
  totalCount?: number;
  isLoading: boolean;
}

export function CompanyStatsCards({
  companiesData = [],
  totalCount = 0,
  isLoading,
}: CompanyStatsCardsProps) {
  const verifiedCount = companiesData.filter((c) => c.isVerified).length;

  // TODO: Reemplazar 'status' hardcodeado con datos reales si vienen de la API
  const activeCount = companiesData.length; // Placeholder
  const pendingCount = 0; // Placeholder
  const inactiveCount = 0; // Placeholder

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white dark:bg-gray-950 animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 w-8 bg-gray-300 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Empresas</CardTitle>
          <Badge>{totalCount}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCount}</div>
          <p className="text-xs text-muted-foreground">Empresas registradas</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Empresas Activas
          </CardTitle>
          <Badge variant="outline" className="text-green-500 border-green-500">
            {activeCount}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCount}</div>
          <p className="text-xs text-muted-foreground">Empresas con acceso</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Empresas Verificadas
          </CardTitle>
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            {" "}
            {/* Ajustado color */}
            {verifiedCount}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{verifiedCount}</div>
          <p className="text-xs text-muted-foreground">Empresas verificadas</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Estado (Placeholder)
          </CardTitle>
          <div className="flex gap-1">
            <Badge
              variant="outline"
              className="text-green-500 border-green-500"
            >
              {activeCount}
            </Badge>
            <Badge
              variant="outline"
              className="text-yellow-500 border-yellow-500"
            >
              {" "}
              {pendingCount}
            </Badge>
            <Badge variant="outline" className="text-red-500 border-red-500">
              {" "}
              {inactiveCount}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{activeCount} activas</span>
            <span>{pendingCount} pendientes</span>
            <span>{inactiveCount} inactivas</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
