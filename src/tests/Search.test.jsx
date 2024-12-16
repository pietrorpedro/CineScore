import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Search from "../pages/search/Search";
import { fetchMovieGenres } from "../services/apiCalls";

import { describe, expect, test, vi } from "vitest";

// mock
vi.mock("../services/apiCalls", () => ({
    fetchMovieGenres: vi.fn(),
    fetchMoviesByGenre: vi.fn(),
    fetchMoviesByTitle: vi.fn(),
}));

describe("Search Page", () => {
    test("deve carregar e exibir os gêneros retornados pela API", async () => {
        const mockGenres = [
            { id: 1, name: "Ação" },
            { id: 2, name: "Comédia" },
        ];

        fetchMovieGenres.mockResolvedValue(mockGenres);

        // Renderiza o componente
        render(
            <Router>
                <Search />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText("Ação")).toBeTruthy();
            expect(screen.getByText("Comédia")).toBeTruthy();
        });
        

        expect(fetchMovieGenres).toHaveBeenCalledTimes(1);
    });
});
