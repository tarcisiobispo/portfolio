import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Skeleton baseado no Shadcn UI
 * https://ui.shadcn.com/docs/components/skeleton
 * 
 * Propriedades adicionais para compatibilidade com react-loading-skeleton:
 * - height: altura em pixels (convertida para className)
 * - width: largura em pixels (convertida para className)
 * - count: número de elementos a serem renderizados
 * - circle: se deve ser renderizado como círculo
 * - borderRadius: raio da borda em pixels (convertido para className)
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
  width?: number | string;
  count?: number;
  circle?: boolean;
  borderRadius?: number;
}

function Skeleton({
  className,
  height,
  width,
  count = 1,
  circle = false,
  borderRadius,
  ...props
}: SkeletonProps) {
  // Converter propriedades para classes Tailwind
  const heightClass = height ? `h-[${height}px]` : '';
  const widthClass = typeof width === 'number' ? `w-[${width}px]` : typeof width === 'string' ? `w-[${width}]` : '';
  const radiusClass = borderRadius ? `rounded-[${borderRadius}px]` : circle ? 'rounded-full' : 'rounded-md';
  
  // Renderizar múltiplos elementos se count > 1
  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse bg-muted",
              radiusClass,
              heightClass,
              widthClass,
              className
            )}
            {...props}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        radiusClass,
        heightClass,
        widthClass,
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
