package com.stack.ecom.automation.scenario.admin;

import com.stack.ecom.automation.config.WebDriverManager;
import com.stack.ecom.automation.pages.admin.AddCategoryPage;
import com.stack.ecom.automation.pages.admin.AdminLoginPage;
import org.jbehave.core.annotations.AfterScenario;
import org.jbehave.core.annotations.BeforeScenario;
import org.jbehave.core.annotations.*;
import org.openqa.selenium.WebDriver;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class AddCategoryScenario {

    AdminLoginPage adminLoginPage;
    WebDriver driver;
    AddCategoryPage addCategoryPage;

    private static Properties properties;

    static {
        try{
            FileInputStream fileInputStream = new FileInputStream("src/main/resources/properties/admin/adminConfig.properties");
            properties = new Properties();
            properties.load(fileInputStream);
        }
        catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("Failed to load config.properties file");
        }
    }

    @BeforeScenario
    public void setup() {
        driver = WebDriverManager.getDriver("chrome");
        driver.manage().window().maximize();
        driver.get("http://localhost:4200"); // or read from config.properties
        addCategoryPage = new AddCategoryPage(driver);
    }

    @Given("I am logged in as admin user")
    public void loginAsAdmin(){
        driver = WebDriverManager.getDriver("chrome");
        String loginURL = properties.getProperty("LOGIN_URL");
        driver.get(loginURL);
        adminLoginPage = new AdminLoginPage(driver);
        adminLoginPage.login();
    }

    @When("I click on the Category button")
    public void clickOnCategoryButton(){
        addCategoryPage.clickOnCategoryButton();
    }

    @When("I enter category name \"$categoryName\"")
    public void addCategoryName(String categoryName){
        addCategoryPage.addCategoryName(categoryName);
    }

    @When("I enter category description \"$categoryDescription\"")
    public void addCategoryDescription(String categoryDescription){
        addCategoryPage.addCategoryDescription(categoryDescription);
    }

    @Then("I click on the Add Category button")
    public void addCategoryButton(){
        addCategoryPage.addCategoryButton();
    }

    @AfterScenario
    public void teardown() {
        WebDriverManager.quitDriver();
    }
}
