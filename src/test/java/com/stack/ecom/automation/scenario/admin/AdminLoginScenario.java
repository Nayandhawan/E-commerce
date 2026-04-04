package com.stack.ecom.automation.scenario.admin;

import com.stack.ecom.automation.config.WebDriverManager;
import com.stack.ecom.automation.pages.admin.AdminLoginPage;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import org.openqa.selenium.WebDriver;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class AdminLoginScenario {

    AdminLoginPage adminLoginPage;
    WebDriver driver;

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

    @Given("I am on the login page")
    public void iAmOnLoginPage() {
        driver = WebDriverManager.getDriver("chrome");
        String loginURL = properties.getProperty("LOGIN_URL");
        driver.get(loginURL);
        adminLoginPage = new AdminLoginPage(driver);
    }


    @When("I enter the username and password")
    public void enterCredentials(){
        adminLoginPage.login();
    }

    @Then("title comes as \"$title\"")
    public void titleName(String title){
        adminLoginPage.titleMatch(title);
    }
}
