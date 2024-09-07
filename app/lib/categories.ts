/**
 * This module provides utility functions and types related to categories.
 * It includes functionality to retrieve category details by ID and to generate
 * URLs for category pages. The categories are sourced from a predefined list
 * imported from constants.
 */
import { CATEGORIES } from "@/app/lib/constants";

export type Category = {
  id: string;
  name: string;
};

/**
 * Retrieves a category object by its unique identifier.
 *
 * @param {string} id - The unique identifier of the category.
 * @returns {Category | undefined} The category object if found; otherwise, undefined.
 */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/**
 * Constructs the URL path for a specific category page.
 *
 * @param {string} id - The unique identifier of the category.
 * @returns {string} The URL path for the category page.
 */
export function getCategoryURL(id: string): string {
  return `/category/${id}`;
}
