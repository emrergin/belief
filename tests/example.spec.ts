import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test("the user can enter the website and solve rounds", async ({ page }) => {
	test.slow();
	// await page.goto("http://localhost:3000");
	await page.goto("https://ekonomideneyleri.com.tr/belief/");
	await page.getByPlaceholder("Ad Soyad").fill("test" + randomUUID());
	await page.getByText("Deneye başla!").click();

	while (true) {
		const startExperiment = page.getByText("Deneye Başla!", { exact: true });
		const nextButton = page.getByText("Sonraki", { exact: true });
		await expect(startExperiment.or(nextButton).first()).toBeVisible();
		if (await startExperiment.isVisible()) {
			await startExperiment.click();
			break;
		}
		await nextButton.click();
	}

	while (true) {
		await page.getByText("Tahmine hazırım!").click({ timeout: 10000 });
		await page.getByText("Karar Verdim").click();
		await page.getByText("Sonraki tur").click();

		if (await page.isVisible("text='Devam'")) {
			break;
		}
	}
});
