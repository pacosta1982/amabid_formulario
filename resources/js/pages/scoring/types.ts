// types.ts

export interface ScoringConfig {
  configuracion: Record<string, number>;
  composicionHogar: Record<string, number>;
  edades: Record<string, number>;
  discapacidad: number;
  // Agregá más criterios si luego parametrizás otros
  // ejemplo:
  // escolaridad: Record<string, number>;
}

export interface IntegranteFamiliar {
  nombre: string;
  ci: string;
  edad: number;
  parentesco: string;
  escolaridad: string;
  ocupacion: string;
  discapacidad?: boolean;
}

export interface Formulario {
  configuracion: string;
  postulante_nombre: string;
  postulante: {
    postulante_nombre: string;
    ci: string;
    fechaNacimiento: string;
    estadoCivil: string;
    edad: number;
    nacionalidad: string;
    escolaridad: string;
    telefono: string;
    contactoAlternativo: string;
    email: string;
    profesion: string;
    actividad: string;
    ingreso: number;
    rucActivo: boolean;
    id: null | number;
  };
  // podés agregar pareja, inmueble, etc., si querés tipar todo
}
