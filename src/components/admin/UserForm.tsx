import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter no mínimo 3 caracteres"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["ADMIN", "USER"]),
  teamRole: z.enum([
    "MECHANIC",
    "ENGINEER",
    "STRATEGIST",
    "DRIVER",
    "TEAM_PRINCIPAL",
    "PIT_CREW",
    "AERODYNAMICIST",
    "DATA_ANALYST",
    "RACE_ENGINEER",
    "TEST_DRIVER"
  ]).optional(),
});

interface UserFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

const UserForm = ({ onSubmit, defaultValues }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      username: "",
      password: "",
      role: "USER",
      teamRole: "MECHANIC",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função no Sistema</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">Usuário</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função na Equipe</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função na equipe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MECHANIC">Mecânico</SelectItem>
                  <SelectItem value="ENGINEER">Engenheiro</SelectItem>
                  <SelectItem value="STRATEGIST">Estrategista</SelectItem>
                  <SelectItem value="DRIVER">Piloto</SelectItem>
                  <SelectItem value="TEAM_PRINCIPAL">Chefe de Equipe</SelectItem>
                  <SelectItem value="PIT_CREW">Equipe de Pit Stop</SelectItem>
                  <SelectItem value="AERODYNAMICIST">Aerodinamicista</SelectItem>
                  <SelectItem value="DATA_ANALYST">Analista de Dados</SelectItem>
                  <SelectItem value="RACE_ENGINEER">Engenheiro de Corrida</SelectItem>
                  <SelectItem value="TEST_DRIVER">Piloto de Testes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;