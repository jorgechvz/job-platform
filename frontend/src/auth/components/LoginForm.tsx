import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormType } from "../types/auth.types";
import { LoginFormSchema } from "../types/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/use-auth";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

export default function LoginForm() {
  const { loginMutation } = useAuth();

  const { isPending } = loginMutation;

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
     const login = await loginMutation.mutateAsync(data);
      console.log("Login successful", login);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <a
            href="/"
            className="flex flex-col items-center gap-2 font-bold text-xl"
          >
            <div className="h-20 w-48 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zNmDQpejVOt2FltE6N6614WGuiLjs1.png"
                alt="IEST Pedro P. Díaz"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-ppd-red">Bolsa de Trabajo</span>
          </a>
        </div>

        <Card className="border-t-4 border-t-ppd-red">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="email">
                          Correo Electrónico
                        </FormLabel>
                        <Input
                          id="email"
                          placeholder="example@example.com"
                          {...field}
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center justify-between">
                          <FormLabel htmlFor="password">Contraseña</FormLabel>
                          <a
                            href="/recuperar-password"
                            className="text-sm text-primary hover:underline"
                          >
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                        {form.formState.errors.password && (
                          <p className="text-red-500 text-sm">
                            {form.formState.errors.password.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full cursor-pointer"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <a href="/registro" className="text-primary hover:underline">
                Regístrate
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
