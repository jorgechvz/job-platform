import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JobOffersStatsCardProps {
  totalCount?: number;
  activeOffersCount?: number;
  highlightedOffersCount?: number;
  status?: {
    draft: number;
    active: number;
    paused: number;
    closed: number;
  };
  isPending?: boolean;
}

const JobOffersStatsCard = ({
  totalCount,
  activeOffersCount,
  highlightedOffersCount,
  status,
  isPending,
}: JobOffersStatsCardProps) => {
  if (isPending) {
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
          <CardTitle className="text-sm font-medium">Total Ofertas</CardTitle>
          <Badge className="text-2xl font-bold">{totalCount}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Ofertas registradas</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ofertas Activas</CardTitle>
          <Badge className="text-2xl font-bold">{activeOffersCount}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Ofertas activas</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ofertas Destacadas
          </CardTitle>
          <Badge className="text-2xl font-bold">{highlightedOffersCount}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Ofertas destacadas</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estado</CardTitle>
          <div className="flex gap-1">
            <Badge
              variant="outline"
              className="text-yellow-500 border-yellow-500"
            >
              {" "}
              {status?.draft}
            </Badge>
            <Badge
              variant="outline"
              className="text-green-500 border-green-500"
            >
              {status?.active}
            </Badge>
            <Badge variant="outline" className="text-red-500 border-red-500">
              {" "}
              {status?.paused}
            </Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-500">
              {" "}
              {status?.closed}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{status?.draft} borradores</span>
            <span>{status?.active} activas</span>
            <span>{status?.paused} en pause</span>
            <span>{status?.closed} cerradas</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobOffersStatsCard;
