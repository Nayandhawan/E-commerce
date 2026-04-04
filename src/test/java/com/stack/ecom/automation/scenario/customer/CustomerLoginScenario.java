package com.stack.ecom.automation.scenario.customer;

import com.stack.ecom.automation.config.WebDriverManager;
import com.stack.ecom.automation.pages.admin.AdminLoginPage;
import com.stack.ecom.automation.pages.customer.CustomerLoginPage;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import org.openqa.selenium.WebDriver;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class CustomerLoginScenario {

    CustomerLoginPage customerLoginPage;
    WebDriver driver;

    private static final Properties properties;

    static {
        try{
            FileInputStream fileInputStream = new FileInputStream("src/main/resources/properties/customer/customerConfig.properties");
            properties = new Properties();
            properties.load(fileInputStream);
        }
        catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("Failed to load config.properties file");
        }
    }

    @Given("I am on the customer login page")
    public void customerLoginPage() {
        driver = WebDriverManager.getDriver("chrome");
        String loginURL = properties.getProperty("LOGIN_URL");
        driver.get(loginURL);
        customerLoginPage = new CustomerLoginPage(driver);
    }


    @When("I enter the username and password")
    public void enterCredentials(){
        customerLoginPage.login();
    }

    @Then("title comes as \"$title\"")
    public void titleName(String title){
        customerLoginPage.titleMatch(title);
    }
}
