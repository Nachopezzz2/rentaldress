import { supabase } from "./supabase";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  categoria: string;
  imagen: string | null;
  destacado: boolean;
  disponible: boolean;
}

export function getImageUrl(path: string | null): string | null {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/productos/${path}`;
}

export async function getProductos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("disponible", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function getProductosDestacados(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("disponible", true)
    .eq("destacado", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data) return [];
  return data;
}
