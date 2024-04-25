import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function checkRoles(
    requiredRoles: string[],
    currentRoles: string[]
): boolean {
    return requiredRoles.some((requiredRole) =>
        currentRoles.includes(requiredRole)
    );
}
