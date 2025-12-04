// Configuración de colores para las etiquetas del grafo
// Cada asignatura tiene un color único para visualización en el grafo

export const tagColors: Record<string, string> = {
  // Análisis Funcional - Azul oscuro
  "analisis-funcional": "#4A90E2",
  
  // Variable Real - Verde azulado
  "variable-real": "#50C878",
  
  // Álgebra Conmutativa - Púrpura
  "algebra-conmutativa": "#9B59B6",
  
  // Teoría Descriptiva de Conjuntos - Naranja oscuro
//   "teoria-descriptiva-de-conjuntos": "#E67E22",
  
  // Variable Compleja - Rosa/Magenta
  "variable-compleja-i": "#E91E63",
  
  // Probabilidad II - Rojo
  "probabilidad-ii": "#E74C3C",
  
  // Geometría Diferencial - Verde lima
  "geometria-diferencial": "#2ECC71",
  
  // Teoría de Galois - Violeta
  "teoria-de-galois": "#8E44AD",
  
  // Modelización - Amarillo dorado
//   "modelizacion": "#F39C12",
  
  // Ecuaciones en Derivadas Parciales - Turquesa
  "ecuaciones-en-derivadas-parciales": "#1ABC9C",
  
  // Productos Finitos de Blaschke - Azul cielo
  "productos-finitos-de-blaschke": "#3498DB",
  
  // Color por defecto para nodos sin etiqueta o con etiquetas no reconocidas
  "default": "#95A5A6",
}

/**
 * Obtiene el color para un nodo basado en sus etiquetas
 * @param tags Array de etiquetas del nodo
 * @returns Color hexadecimal para el nodo
 */
export function getColorForTags(tags: string[]): string {
  if (!tags || tags.length === 0) {
    return tagColors.default
  }
  
  // Buscar la primera etiqueta que coincida con una asignatura conocida
  for (const tag of tags) {
    // Normalizar la etiqueta: remover '#' inicial y obtener la parte antes del '/'
    const normalizedTag = tag.toLowerCase().replace(/^#/, "").split("/")[0]
    
    if (tagColors[normalizedTag]) {
      return tagColors[normalizedTag]
    }
  }
  
  // Si ninguna etiqueta coincide, usar color por defecto
  return tagColors.default
}

/**
 * Obtiene el color para un nodo de etiqueta
 * @param tagName Nombre de la etiqueta (sin el prefijo 'tags/')
 * @returns Color hexadecimal para la etiqueta
 */
export function getColorForTagNode(tagName: string): string {
  // Extraer la asignatura del nombre de la etiqueta
  const normalizedTag = tagName.toLowerCase().split("/")[0]
  
  if (tagColors[normalizedTag]) {
    return tagColors[normalizedTag]
  }
  
  return tagColors.default
}
