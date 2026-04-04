package com.stack.ecom.automation.scenario.customer;

import com.stack.ecom.automation.config.WebDriverManager;
import com.stack.ecom.automation.pages.customer.CustomerLoginPage;
import com.stack.ecom.automation.pages.customer.SignupPage;
import org.jbehave.core.annotations.*;
import org.openqa.selenium.WebDriver;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class SignUpScenario {

    private WebDriver driver;
    private SignupPage signupPage;
    private CustomerLoginPage customerLoginPage;

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
        signupPage = new SignupPage(driver);
    }

    @Given("I am on the signup page")
    public void navigateToSignupPage() {
        driver = WebDriverManager.getDriver("chrome");
        String signupUrl = properties.getProperty("SIGNUP_URL");
        driver.get(signupUrl);
        signupPage = new SignupPage(driver);
    }

    @When("I enter name \"$name\"")
    public void enterName(String name) {
        signupPage.enterName(name);
    }

    @When("I enter email \"$email\"")
    public void enterEmail(String email) {
        signupPage.enterEmail(email);
    }

    @When("I enter password \"$password\"")
    public void enterPassword(String password) {
        signupPage.enterPassword(password);
    }

    @When("I confirm password \"$confirmPassword\"")
    public void enterConfirmPassword(String confirmPassword) {
        signupPage.enterConfirmPassword(confirmPassword);
    }

    @When("I click on the signup button")
    public void clickSignup() {
        signupPage.clickSignupButton();
    }

    @Then("I will be able to login successfully with \"$email\" and \"$password\"")
    public void verifySignup(String email, String password) {
        customerLoginPage = new CustomerLoginPage(driver);
        try {
            Thread.sleep(2000); // Wait for 5 seconds before clicking
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        customerLoginPage.verifyLogingin(email,password);
    }

    @AfterScenario
    public void teardown() {
        WebDriverManager.quitDriver();
    }
}
