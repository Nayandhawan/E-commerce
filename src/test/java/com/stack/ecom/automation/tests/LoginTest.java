package com.stack.ecom.automation.tests;

import com.stack.ecom.automation.config.WebDriverManager;
import com.stack.ecom.automation.pages.admin.AdminLoginPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

public class LoginTest {

    static WebDriver driver;
    AdminLoginPage loginPage;

    @BeforeAll
    public static void setUp() {
        driver = WebDriverManager.getDriver("chrome");
        driver.get("http://localhost:4200/login");
    }

    @BeforeEach
    public void initializePageObjects() {
        loginPage = new AdminLoginPage(driver);
    }

    @Test
    public void testValidLogin() {
        loginPage.login();
        Assertions.assertEquals("EcomUI", driver.getTitle());
    }

    @AfterAll
    public static void tearDown() {
        WebDriverManager.quitDriver();
    }
}
