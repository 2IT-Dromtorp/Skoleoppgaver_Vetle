import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    it("should render the App component", async () => {
        render(<App />);

        await userEvent.click(screen.getByRole("button"));
        await userEvent.click(screen.getByRole("button"));

        screen.debug();
        expect(screen.getByRole("paragraph").innerHTML).toBe("6");
    });
});
